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

interface SignupEmailProps {
  siteName: string
  siteUrl: string
  recipient: string
  confirmationUrl: string
}

export const SignupEmail = ({
  siteName,
  siteUrl,
  recipient,
  confirmationUrl,
}: SignupEmailProps) => (
  <Html lang="sv" dir="ltr">
    <Head />
    <Preview>Bekräfta din e-post för {siteName}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={header}>
          <Img src={LOGO_URL} alt="Inevent" style={logo} />
        </Section>
        <Section style={body}>
          <Text style={eyebrow}>Bekräftelse</Text>
          <Heading style={h1}>Verifiera din e-post</Heading>
          <Text style={text}>
            Tack för att du registrerar dig hos{' '}
            <Link href={siteUrl} style={link}>
              <strong>{siteName}</strong>
            </Link>
            . Bekräfta adressen{' '}
            <Link href={`mailto:${recipient}`} style={link}>
              {recipient}
            </Link>{' '}
            genom att klicka på knappen nedan.
          </Text>
          <Button style={button} href={confirmationUrl}>
            Verifiera e-post
          </Button>
          <div style={divider} />
          <Text style={footerStrong}>Inevent</Text>
          <Text style={footer}>
            Om du inte skapade ett konto kan du ignorera detta mail.
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
)

export default SignupEmail
