import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components'
import type { TemplateEntry } from './registry'

const SITE_NAME = 'Inevent'

interface LeadConfirmationProps {
  name?: string
  event_type?: string
  event_date?: string
  guest_count?: string
  location?: string
  inquiry_type?: string
  company?: string
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

const LeadConfirmationEmail = ({
  name,
  event_type,
  event_date,
  guest_count,
  location,
  inquiry_type,
  company,
}: LeadConfirmationProps) => {
  const greeting = name ? `Tack ${name}!` : 'Tack för din förfrågan!'
  const formattedDate = formatDate(event_date)

  const summaryRows: Array<{ label: string; value: string }> = []
  if (inquiry_type) summaryRows.push({ label: 'Typ av ärende', value: inquiry_type })
  if (event_type) summaryRows.push({ label: 'Eventtyp', value: event_type })
  if (formattedDate) summaryRows.push({ label: 'Datum', value: formattedDate })
  if (guest_count) summaryRows.push({ label: 'Antal gäster', value: guest_count })
  if (location) summaryRows.push({ label: 'Plats', value: location })
  if (company) summaryRows.push({ label: 'Företag / org.', value: company })

  return (
    <Html lang="sv" dir="ltr">
      <Head />
      <Preview>Vi har tagit emot din förfrågan till {SITE_NAME} — vi återkommer inom kort.</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={brandSection}>
            <Text style={brandText}>INEVENT</Text>
          </Section>

          <Heading style={h1}>{greeting}</Heading>

          <Text style={lead}>
            Vi har tagit emot din förfrågan och återkommer normalt inom 1–2 arbetsdagar
            med svar eller en första prisindikation.
          </Text>

          {summaryRows.length > 0 && (
            <Section style={summaryBox}>
              <Text style={summaryHeading}>Sammanfattning av din förfrågan</Text>
              {summaryRows.map((row) => (
                <Text key={row.label} style={summaryRow}>
                  <span style={summaryLabel}>{row.label}:</span>{' '}
                  <span style={summaryValue}>{row.value}</span>
                </Text>
              ))}
            </Section>
          )}

          <Text style={text}>
            Behöver du nå oss tidigare är du välkommen att svara direkt på det här mejlet,
            ringa eller skicka ett meddelande via vår kontaktsida.
          </Text>

          <Hr style={hr} />

          <Text style={footer}>
            Vänliga hälsningar,
            <br />
            Teamet på {SITE_NAME}
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

export const template = {
  component: LeadConfirmationEmail,
  subject: 'Tack för din förfrågan — vi återkommer inom kort',
  displayName: 'Bekräftelse till kund (lead)',
  previewData: {
    name: 'Anna',
    event_type: 'Bröllop',
    event_date: '2026-08-15',
    guest_count: '120',
    location: 'Göteborg',
    inquiry_type: 'Offertförfrågan',
    company: 'Exempel AB',
  },
} satisfies TemplateEntry

// Styles — white body background, brand crimson accents
const main = {
  backgroundColor: '#ffffff',
  fontFamily: '"Barlow", Arial, sans-serif',
  margin: 0,
  padding: 0,
}

const container = {
  maxWidth: '560px',
  margin: '0 auto',
  padding: '32px 28px',
}

const brandSection = {
  borderBottom: '3px solid #e63946',
  paddingBottom: '12px',
  marginBottom: '28px',
}

const brandText = {
  fontFamily: '"Bebas Neue", Impact, sans-serif',
  fontSize: '24px',
  letterSpacing: '0.18em',
  color: '#0a0a0a',
  margin: 0,
}

const h1 = {
  fontSize: '26px',
  fontWeight: 700,
  color: '#0a0a0a',
  margin: '0 0 16px',
  lineHeight: 1.2,
}

const lead = {
  fontSize: '15px',
  color: '#3a3a3a',
  lineHeight: 1.6,
  margin: '0 0 24px',
}

const text = {
  fontSize: '14px',
  color: '#3a3a3a',
  lineHeight: 1.6,
  margin: '0 0 12px',
}

const summaryBox = {
  backgroundColor: '#f7f5f0',
  border: '1px solid #e5e1d8',
  padding: '18px 20px',
  margin: '0 0 24px',
}

const summaryHeading = {
  fontSize: '12px',
  fontWeight: 700,
  textTransform: 'uppercase' as const,
  letterSpacing: '0.12em',
  color: '#e63946',
  margin: '0 0 12px',
}

const summaryRow = {
  fontSize: '14px',
  color: '#1a1a1a',
  margin: '0 0 6px',
  lineHeight: 1.5,
}

const summaryLabel = {
  color: '#6a6a6a',
}

const summaryValue = {
  fontWeight: 600,
  color: '#1a1a1a',
}

const hr = {
  borderColor: '#e5e1d8',
  margin: '28px 0 20px',
}

const footer = {
  fontSize: '13px',
  color: '#6a6a6a',
  margin: 0,
  lineHeight: 1.6,
}
