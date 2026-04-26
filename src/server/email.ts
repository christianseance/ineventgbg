import * as React from 'react'
import { render } from '@react-email/components'
import { TEMPLATES } from '@/lib/email-templates/registry'
import { supabaseAdmin } from '@/integrations/supabase/client.server'

const SITE_NAME = 'Inevent'
const SENDER_DOMAIN = 'notify.www.inevent.se'
const FROM_DOMAIN = 'www.inevent.se'

function generateToken(): string {
  const bytes = new Uint8Array(32)
  crypto.getRandomValues(bytes)
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

interface EnqueueParams {
  templateName: string
  recipientEmail: string
  templateData?: Record<string, any>
  idempotencyKey?: string
}

/**
 * Server-side helper to enqueue a transactional email for an unauthenticated
 * trigger (e.g., public contact form). Mirrors the logic of
 * /lovable/email/transactional/send but skips JWT auth — only call from
 * trusted server functions that have already validated the input.
 */
export async function enqueueTransactionalEmail({
  templateName,
  recipientEmail,
  templateData = {},
  idempotencyKey,
}: EnqueueParams): Promise<{ ok: boolean; reason?: string }> {
  const template = TEMPLATES[templateName]
  if (!template) {
    console.error('Template not found in registry', { templateName })
    return { ok: false, reason: 'template_not_found' }
  }

  const effectiveRecipient = template.to || recipientEmail
  if (!effectiveRecipient) {
    return { ok: false, reason: 'recipient_required' }
  }

  const messageId = crypto.randomUUID()
  const idempotency = idempotencyKey || messageId
  const normalizedEmail = effectiveRecipient.toLowerCase()

  // Suppression check (fail-closed)
  const { data: suppressed, error: suppressionError } = await supabaseAdmin
    .from('suppressed_emails' as any)
    .select('id')
    .eq('email', normalizedEmail)
    .maybeSingle()

  if (suppressionError) {
    console.error('Suppression check failed — refusing to send', { error: suppressionError })
    return { ok: false, reason: 'suppression_check_failed' }
  }

  if (suppressed) {
    await supabaseAdmin.from('email_send_log' as any).insert({
      message_id: messageId,
      template_name: templateName,
      recipient_email: effectiveRecipient,
      status: 'suppressed',
    })
    return { ok: false, reason: 'email_suppressed' }
  }

  // Get-or-create unsubscribe token (one per email)
  let unsubscribeToken: string

  const { data: existingTokenRaw } = await supabaseAdmin
    .from('email_unsubscribe_tokens' as any)
    .select('token, used_at')
    .eq('email', normalizedEmail)
    .maybeSingle()
  const existingToken = existingTokenRaw as { token: string; used_at: string | null } | null

  if (existingToken && !existingToken.used_at) {
    unsubscribeToken = existingToken.token
  } else if (!existingToken) {
    const newToken = generateToken()
    const { error: tokenError } = await supabaseAdmin
      .from('email_unsubscribe_tokens' as any)
      .upsert(
        { token: newToken, email: normalizedEmail },
        { onConflict: 'email', ignoreDuplicates: true },
      )
    if (tokenError) {
      console.error('Failed to create unsubscribe token', { error: tokenError })
      return { ok: false, reason: 'token_create_failed' }
    }
    const { data: storedRaw } = await supabaseAdmin
      .from('email_unsubscribe_tokens' as any)
      .select('token')
      .eq('email', normalizedEmail)
      .maybeSingle()
    const stored = storedRaw as { token: string } | null
    if (!stored) {
      return { ok: false, reason: 'token_lookup_failed' }
    }
    unsubscribeToken = stored.token
  } else {
    // Token used but recipient not on suppression list — safety fallback
    return { ok: false, reason: 'email_suppressed' }
  }

  // Render template
  const element = React.createElement(template.component, templateData)
  const html = await render(element)
  const plainText = await render(element, { plainText: true })
  const resolvedSubject =
    typeof template.subject === 'function'
      ? template.subject(templateData)
      : template.subject

  // Log pending before enqueue
  await supabaseAdmin.from('email_send_log' as any).insert({
    message_id: messageId,
    template_name: templateName,
    recipient_email: effectiveRecipient,
    status: 'pending',
  })

  const { error: enqueueError } = await supabaseAdmin.rpc('enqueue_email' as any, {
    queue_name: 'transactional_emails',
    payload: {
      message_id: messageId,
      to: effectiveRecipient,
      from: `${SITE_NAME} <noreply@${FROM_DOMAIN}>`,
      sender_domain: SENDER_DOMAIN,
      subject: resolvedSubject,
      html,
      text: plainText,
      purpose: 'transactional',
      label: templateName,
      idempotency_key: idempotency,
      unsubscribe_token: unsubscribeToken,
      queued_at: new Date().toISOString(),
    },
  })

  if (enqueueError) {
    console.error('Failed to enqueue email', { error: enqueueError, templateName })
    await supabaseAdmin.from('email_send_log' as any).insert({
      message_id: messageId,
      template_name: templateName,
      recipient_email: effectiveRecipient,
      status: 'failed',
      error_message: 'Failed to enqueue email',
    })
    return { ok: false, reason: 'enqueue_failed' }
  }

  return { ok: true }
}
