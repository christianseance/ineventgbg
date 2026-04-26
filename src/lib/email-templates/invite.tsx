import * as React from 'react'

import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components'

import {
  LOGO_URL,
  body,
  button,
  container,
  divider,
  eyebrow,
  footer,
  footerStrong,
  h1,
  header,
  link,
  logo,
  main,
  text,
} from './_shared'

interface InviteEmailProps {
  siteName: string
  siteUrl: string
  confirmationUrl: string
}

export const InviteEmail = ({
  siteName,
  siteUrl,
  confirmationUrl,
}: InviteEmailProps) => (
  <Html lang="sv" dir="ltr">
    <Head />
    <Preview>Du har bjudits in till {siteName}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={header}>
          <Img src={LOGO_URL} alt="Inevent" style={logo} />
        </Section>
        <Section style={body}>
          <Text style={eyebrow}>Inbjudan</Text>
          <Heading style={h1}>Du är inbjuden</Heading>
          <Text style={text}>
            Du har bjudits in att gå med i{' '}
            <Link href={siteUrl} style={link}>
              <strong>{siteName}</strong>
            </Link>
            . Klicka på knappen nedan för att acceptera inbjudan och skapa ditt
            konto.
          </Text>
          <Button style={button} href={confirmationUrl}>
            Acceptera inbjudan
          </Button>
          <div style={divider} />
          <Text style={footerStrong}>Inevent</Text>
          <Text style={footer}>
            Om du inte väntade dig denna inbjudan kan du ignorera mailet.
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
)

export default InviteEmail
