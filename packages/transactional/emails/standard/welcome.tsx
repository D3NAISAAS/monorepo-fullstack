import React from 'react';
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

export interface WelcomeEmailProps {
  name: string;
  actionUrl: string;
}

export default function WelcomeEmail({
  name = 'Utilisateur',
  actionUrl = 'https://example.com/dashboard',
}: WelcomeEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Bienvenue sur notre plateforme !</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Bienvenue, {name} !</Heading>
          <Text style={paragraph}>
            Nous sommes ravis de vous accueillir sur notre plateforme. Votre compte a été créé avec succès.
          </Text>
          <Section style={buttonContainer}>
            <Button style={{...button, paddingTop: '12px', paddingBottom: '12px', paddingLeft: '20px', paddingRight: '20px'}} href={actionUrl}>
              Accéder à votre tableau de bord
            </Button>
          </Section>
          <Hr style={hr} />
          <Text style={footer}>
            Si vous avez des questions, n'hésitez pas à nous contacter.
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
