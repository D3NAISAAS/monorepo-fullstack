import React from "react";
import { Html, Text, Container, Section, Row, Column, Button } from "@react-email/components";

export interface PasswordResetProps {
  userEmail: string;
  resetUrl: string;
}

export default function PasswordResetEmail({ userEmail, resetUrl }: PasswordResetProps) {
  return (
    <Html>
      <Text style={{ display: "none" }}>Réinitialisation de votre mot de passe</Text>
      <Container>
        <Section>
          <Row>
            <Column>
              <Text>Bonjour,</Text>
              <Text>Vous avez demandé la réinitialisation du mot de passe pour votre compte {userEmail}.</Text>
              <Text>Cliquez sur le bouton ci-dessous pour définir un nouveau mot de passe :</Text>
              <Button href={resetUrl} style={{ backgroundColor: "#4F46E5", color: "white", padding: "12px 20px" }}>
                Réinitialiser le mot de passe
              </Button>
              <Text>Si vous n'avez pas demandé cette réinitialisation, vous pouvez ignorer cet email.</Text>
              <Text>Ce lien expirera dans 24 heures.</Text>
            </Column>
          </Row>
        </Section>
      </Container>
    </Html>
  );
}
