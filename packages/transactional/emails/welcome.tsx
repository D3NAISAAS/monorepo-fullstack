import React from "react";
import { Html, Text, Container, Section, Row, Column, Button } from "@react-email/components";

export interface WelcomeProps {
  name: string;
  actionLink: string;
}

export default function WelcomeEmail({ name, actionLink }: WelcomeProps) {
  return (
    <Html>
      <Text style={{ display: "none" }}>Bienvenue !</Text>
      <Container>
        <Section>
          <Row>
            <Column>
              <Text>Bonjour {name},</Text>
              <Text>Nous sommes ravis de vous accueillir sur notre plateforme !</Text>
              <Text>Pour commencer à utiliser toutes les fonctionnalités, cliquez sur le bouton ci-dessous :</Text>
              <Button href={actionLink} style={{ backgroundColor: "#4F46E5", color: "white", padding: "12px 20px" }}>
                Accéder à votre tableau de bord
              </Button>
              <Text>Si vous avez des questions, n'hésitez pas à nous contacter.</Text>
            </Column>
          </Row>
        </Section>
      </Container>
    </Html>
  );
}
