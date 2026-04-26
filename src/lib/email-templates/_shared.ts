// Shared inline styles for Inevent-branded auth emails.
// Email clients require inline styles and websafe fonts.

export const LOGO_URL =
  'https://zdpnkabkiihixftmchjx.supabase.co/storage/v1/object/public/email-assets/inevent-logo.png'

export const COLORS = {
  ink: '#141414',
  bone: '#f5f3ee',
  crimson: '#e63946',
  crimsonGlow: '#ef4655',
  muted: '#6b6b6b',
  border: '#e5e2db',
}

export const main = {
  backgroundColor: '#ffffff',
  fontFamily: "'Helvetica Neue', Arial, sans-serif",
  margin: 0,
  padding: '40px 0',
}

export const container = {
  maxWidth: '560px',
  margin: '0 auto',
  backgroundColor: '#ffffff',
  border: `1px solid ${COLORS.border}`,
  borderRadius: '4px',
  overflow: 'hidden' as const,
}

export const header = {
  backgroundColor: COLORS.ink,
  padding: '28px 32px',
  textAlign: 'left' as const,
  backgroundImage: `linear-gradient(135deg, ${COLORS.ink} 0%, #1f0a0d 100%)`,
}

export const logo = {
  height: '32px',
  width: 'auto',
  display: 'block',
}

export const body = {
  padding: '40px 32px 32px',
}

export const eyebrow = {
  fontSize: '11px',
  fontWeight: 700 as const,
  letterSpacing: '0.18em',
  textTransform: 'uppercase' as const,
  color: COLORS.crimson,
  margin: '0 0 12px',
}

export const h1 = {
  fontFamily: "'Impact', 'Helvetica Neue', Arial, sans-serif",
  fontSize: '34px',
  fontWeight: 700 as const,
  letterSpacing: '0.01em',
  textTransform: 'uppercase' as const,
  lineHeight: 1.05,
  color: COLORS.ink,
  margin: '0 0 24px',
}

export const text = {
  fontSize: '15px',
  lineHeight: 1.6,
  color: '#2a2a2a',
  margin: '0 0 20px',
}

export const button = {
  display: 'inline-block',
  backgroundColor: COLORS.crimson,
  color: '#ffffff',
  fontSize: '13px',
  fontWeight: 700 as const,
  letterSpacing: '0.12em',
  textTransform: 'uppercase' as const,
  borderRadius: '2px',
  padding: '14px 28px',
  textDecoration: 'none',
  margin: '8px 0 24px',
}

export const link = {
  color: COLORS.crimson,
  textDecoration: 'underline',
}

export const codeStyle = {
  display: 'inline-block',
  fontFamily: "'Courier New', monospace",
  fontSize: '28px',
  fontWeight: 700 as const,
  letterSpacing: '0.3em',
  color: COLORS.ink,
  backgroundColor: COLORS.bone,
  border: `1px solid ${COLORS.border}`,
  padding: '16px 24px',
  borderRadius: '2px',
  margin: '0 0 28px',
}

export const divider = {
  borderTop: `1px solid ${COLORS.border}`,
  margin: '32px 0 20px',
}

export const footer = {
  fontSize: '12px',
  lineHeight: 1.6,
  color: COLORS.muted,
  margin: '0 0 8px',
}

export const footerStrong = {
  fontSize: '12px',
  fontWeight: 700 as const,
  letterSpacing: '0.1em',
  textTransform: 'uppercase' as const,
  color: COLORS.ink,
  margin: '0 0 4px',
}
