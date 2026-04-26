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

interface EmailChangeEmailProps {
  siteName: string
  email: string
  newEmail: string
  confirmationUrl: string
}

export const EmailChangeEmail = ({
  siteName,
  email,
  newEmail,
  confirmationUrl,
}: EmailChangeEmailProps) => (
  <Html lang="sv" dir="ltr">
    <Head />
    <Preview>Bekräfta byte av e-post för {siteName}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={header}>
          <Img src={LOGO_URL} alt="Inevent" style={logo} />
        </Section>
        <Section style={body}>
          <Text style={eyebrow}>E-postbyte</Text>
          <Heading style={h1}>Bekräfta din nya e-post</Heading>
          <Text style={text}>
            Du har begärt att ändra e-postadressen för ditt konto hos {siteName}{' '}
            från{' '}
            <Link href={`mailto:${email}`} style={link}>
              {email}
            </Link>{' '}
            till{' '}
            <Link href={`mailto:${newEmail}`} style={link}>
              {newEmail}
            </Link>
            .
          </Text>
          <Button style={button} href={confirmationUrl}>
            Bekräfta byte
          </Button>
          <div style={divider} />
          <Text style={footerStrong}>Inevent</Text>
          <Text style={footer}>
            Om du inte begärde detta — säkra ditt konto omedelbart.
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
)

export default EmailChangeEmail
