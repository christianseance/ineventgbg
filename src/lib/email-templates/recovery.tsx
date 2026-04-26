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

interface RecoveryEmailProps {
  siteName: string
  confirmationUrl: string
}

export const RecoveryEmail = ({
  siteName,
  confirmationUrl,
}: RecoveryEmailProps) => (
  <Html lang="sv" dir="ltr">
    <Head />
    <Preview>Återställ ditt lösenord för {siteName}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={header}>
          <Img src={LOGO_URL} alt="Inevent" style={logo} />
        </Section>
        <Section style={body}>
          <Text style={eyebrow}>Lösenord</Text>
          <Heading style={h1}>Återställ ditt lösenord</Heading>
          <Text style={text}>
            Vi har tagit emot en begäran om att återställa lösenordet för ditt
            konto hos {siteName}. Klicka på knappen nedan för att välja ett nytt
            lösenord.
          </Text>
          <Button style={button} href={confirmationUrl}>
            Återställ lösenord
          </Button>
          <div style={divider} />
          <Text style={footerStrong}>Inevent</Text>
          <Text style={footer}>
            Om du inte begärde detta kan du ignorera mailet — ditt lösenord
            ändras inte.
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
)

export default RecoveryEmail
