import * as React from 'react'

import {
  Body,
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
  codeStyle,
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

interface ReauthenticationEmailProps {
  token: string
}

export const ReauthenticationEmail = ({ token }: ReauthenticationEmailProps) => (
  <Html lang="sv" dir="ltr">
    <Head />
    <Preview>Din verifieringskod</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={header}>
          <Img src={LOGO_URL} alt="Inevent" style={logo} />
        </Section>
        <Section style={body}>
          <Text style={eyebrow}>Verifiering</Text>
          <Heading style={h1}>Bekräfta din identitet</Heading>
          <Text style={text}>Använd koden nedan för att fortsätta:</Text>
          <Text style={codeStyle}>{token}</Text>
          <div style={divider} />
          <Text style={footerStrong}>Inevent</Text>
          <Text style={footer}>
            Koden går snart ut. Om du inte begärde detta kan du ignorera mailet.
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
)

export default ReauthenticationEmail
