import * as React from 'react'

import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Img,
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
  logo,
  main,
  text,
} from './_shared'

interface MagicLinkEmailProps {
  siteName: string
  confirmationUrl: string
}

export const MagicLinkEmail = ({
  siteName,
  confirmationUrl,
}: MagicLinkEmailProps) => (
  <Html lang="sv" dir="ltr">
    <Head />
    <Preview>Din inloggningslänk för {siteName}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={header}>
          <Img src={LOGO_URL} alt="Inevent" style={logo} />
        </Section>
        <Section style={body}>
          <Text style={eyebrow}>Inloggning</Text>
          <Heading style={h1}>Logga in på {siteName}</Heading>
          <Text style={text}>
            Klicka på knappen nedan för att logga in. Länken är giltig en kort
            stund och kan endast användas en gång.
          </Text>
          <Button style={button} href={confirmationUrl}>
            Logga in
          </Button>
          <div style={divider} />
          <Text style={footerStrong}>Inevent</Text>
          <Text style={footer}>
            Om du inte begärde denna länk kan du ignorera detta mail.
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
)

export default MagicLinkEmail
