import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components'
import type { TemplateEntry } from './registry'

const SITE_NAME = 'Inevent'

interface LeadInternalNotificationProps {
  lead_id?: string
  name?: string
  email?: string
  phone?: string
  event_type?: string
  event_date?: string
  guest_count?: string
  location?: string
  message?: string
  newsletter_opt_in?: boolean
  attachment_name?: string
  attachment_size?: number
  lead_url?: string
  submitted_at?: string
}

const formatDate = (iso?: string) => {
  if (!iso) return undefined
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return iso
  return d.toLocaleDateString('sv-SE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

const formatDateTime = (iso?: string) => {
  if (!iso) return undefined
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return iso
  return d.toLocaleString('sv-SE', {
    dateStyle: 'medium',
    timeStyle: 'short',
  })
}

const formatBytes = (n?: number) => {
  if (!n || n <= 0) return undefined
  if (n < 1024) return `${n} B`
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`
  return `${(n / (1024 * 1024)).toFixed(2)} MB`
}

const LeadInternalNotificationEmail = ({
  lead_id,
  name,
  email,
  phone,
  event_type,
  event_date,
  guest_count,
  location,
  message,
  newsletter_opt_in,
  attachment_name,
  attachment_size,
  lead_url,
  submitted_at,
}: LeadInternalNotificationProps) => {
  const rows: Array<[string, string | undefined]> = [
    ['Namn', name],
    ['E-post', email],
    ['Telefon', phone],
    ['Typ av event', event_type],
    ['Datum', formatDate(event_date)],
    ['Antal gäster', guest_count],
    ['Plats', location],
    [
      'Bilaga',
      attachment_name
        ? `${attachment_name}${formatBytes(attachment_size) ? ` (${formatBytes(attachment_size)})` : ''}`
        : undefined,
    ],
    ['Nyhetsbrev', newsletter_opt_in ? 'Ja' : 'Nej'],
    ['Skickat', formatDateTime(submitted_at)],
    ['Lead-ID', lead_id],
  ]

  return (
    <Html lang="sv" dir="ltr">
      <Head />
      <Preview>
        Nytt lead{name ? ` från ${name}` : ''}
        {event_type ? ` – ${event_type}` : ''}
      </Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Nytt lead inkommit</Heading>
          <Text style={lead}>
            En ny förfrågan har skickats via {SITE_NAME}-formuläret.
          </Text>

          <Section style={card}>
            {rows.map(([label, value]) =>
              value ? (
                <div key={label} style={row}>
                  <Text style={rowLabel}>{label}</Text>
                  <Text style={rowValue}>{value}</Text>
                </div>
              ) : null,
            )}
          </Section>

          {message ? (
            <Section style={messageBox}>
              <Text style={rowLabel}>Meddelande</Text>
              <Text style={messageText}>{message}</Text>
            </Section>
          ) : null}

          {lead_url ? (
            <Section style={{ textAlign: 'center', margin: '28px 0 8px' }}>
              <Button href={lead_url} style={button}>
                Öppna leadet
              </Button>
              <Text style={fallbackLink}>
                Eller kopiera länken:{' '}
                <Link href={lead_url} style={link}>
                  {lead_url}
                </Link>
              </Text>
            </Section>
          ) : null}

          {email ? (
            <Section style={{ margin: '8px 0 0' }}>
              <Text style={text}>
                Svara direkt till kunden:{' '}
                <Link href={`mailto:${email}`} style={link}>
                  {email}
                </Link>
              </Text>
            </Section>
          ) : null}

          <Hr style={hr} />
          <Text style={footer}>
            Internt notifieringsmejl från {SITE_NAME}.
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

export const template = {
  component: LeadInternalNotificationEmail,
  subject: (data: Record<string, any>) => {
    const who = data?.name ? ` – ${data.name}` : ''
    const what = data?.event_type ? ` (${data.event_type})` : ''
    return `Nytt lead${who}${what}`
  },
  displayName: 'Internt: nytt lead',
  to: 'seance@inevent.se',
  previewData: {
    lead_id: '00000000-0000-0000-0000-000000000000',
    name: 'Anna Andersson',
    email: 'anna@example.com',
    phone: '070-123 45 67',
    event_type: 'Bröllop',
    event_date: '2026-06-12',
    guest_count: '120',
    location: 'Göteborg',
    message: 'Vi vill ha ett cirkustält till vårt bröllop i juni.',
    newsletter_opt_in: true,
    attachment_name: 'skiss.pdf',
    attachment_size: 524288,
    lead_url: 'https://www.inevent.se/admin/leads/00000000-0000-0000-0000-000000000000',
    submitted_at: new Date().toISOString(),
  },
} satisfies TemplateEntry

const main = {
  backgroundColor: '#ffffff',
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
}
const container = { padding: '24px 28px', maxWidth: '600px' }
const h1 = {
  fontSize: '22px',
  fontWeight: 700,
  color: '#0f0f0f',
  margin: '0 0 8px',
}
const lead = {
  fontSize: '14px',
  color: '#55575d',
  lineHeight: '1.5',
  margin: '0 0 20px',
}
const card = {
  backgroundColor: '#f7f6f2',
  border: '1px solid #e8e6df',
  borderRadius: '8px',
  padding: '14px 18px',
  margin: '0 0 16px',
}
const row = {
  display: 'flex',
  justifyContent: 'space-between',
  gap: '12px',
  padding: '6px 0',
  borderBottom: '1px solid #ecebe5',
}
const rowLabel = {
  fontSize: '12px',
  color: '#7a7a7a',
  margin: 0,
  textTransform: 'uppercase' as const,
  letterSpacing: '0.04em',
}
const rowValue = {
  fontSize: '14px',
  color: '#0f0f0f',
  margin: '2px 0 0',
  fontWeight: 500,
}
const messageBox = {
  backgroundColor: '#fffaf0',
  border: '1px solid #f0e6cf',
  borderRadius: '8px',
  padding: '14px 18px',
  margin: '0 0 16px',
}
const messageText = {
  fontSize: '14px',
  color: '#0f0f0f',
  whiteSpace: 'pre-wrap' as const,
  margin: '4px 0 0',
  lineHeight: '1.55',
}
const button = {
  backgroundColor: '#0f0f0f',
  color: '#ffffff',
  padding: '12px 22px',
  borderRadius: '6px',
  textDecoration: 'none',
  fontSize: '14px',
  fontWeight: 600,
  display: 'inline-block',
}
const fallbackLink = {
  fontSize: '12px',
  color: '#7a7a7a',
  margin: '10px 0 0',
  wordBreak: 'break-all' as const,
}
const link = { color: '#1a73e8', textDecoration: 'underline' }
const text = { fontSize: '14px', color: '#0f0f0f', margin: 0 }
const hr = { borderColor: '#e8e6df', margin: '24px 0 12px' }
const footer = { fontSize: '11px', color: '#999', margin: 0 }
