import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components';

export interface PasswordResetEmailProps {
  name: string;
  resetUrl: string;
  expiryHours?: number;
}

export default function PasswordResetEmail({
  name = 'Utilisateur',
  resetUrl = 'https://example.com/reset-password',
  expiryHours = 24,
}: PasswordResetEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Réinitialisation de votre mot de passe</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Réinitialisation de mot de passe</Heading>
          <Text style={paragraph}>
            Bonjour {name},
          </Text>
          <Text style={paragraph}>
            Nous avons reçu une demande de réinitialisation de mot de passe pour votre compte.
            Cliquez sur le bouton ci-dessous pour créer un nouveau mot de passe.
          </Text>
          <Section style={buttonContainer}>
            <Button style={{...button, paddingTop: '12px', paddingBottom: '12px', paddingLeft: '20px', paddingRight: '20px'}} href={resetUrl}>
              Réinitialiser mon mot de passe
            </Button>
          </Section>
          <Text style={paragraph}>
            Ce lien expirera dans {expiryHours} heures.
          </Text>
          <Text style={paragraph}>
            Si vous n'avez pas demandé de réinitialisation de mot de passe, vous pouvez ignorer cet email.
          </Text>
          <Hr style={hr} />
          <Text style={footer}>
            Pour votre sécurité, ne transmettez jamais ce lien à quiconque.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  backgroundColor: '#f6f9fc',
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif',
};

const container = {
  margin: '0 auto',
  padding: '20px 0 48px',
  maxWidth: '580px',
};

const h1 = {
  color: '#333',
  fontSize: '24px',
  fontWeight: 'bold',
  margin: '40px 0 20px',
};

const paragraph = {
  fontSize: '16px',
  lineHeight: '26px',
  margin: '16px 0',
};

const buttonContainer = {
  margin: '30px 0',
};

const button = {
  backgroundColor: '#5469d4',
  borderRadius: '4px',
  color: '#fff',
  fontSize: '16px',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'block',
};

const hr = {
  borderColor: '#e6ebf1',
  margin: '20px 0',
};

const footer = {
  color: '#8898aa',
  fontSize: '14px',
};
