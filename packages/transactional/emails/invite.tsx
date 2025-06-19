import React from "react";
import { Html, Text, Container, Section, Row, Column, Button } from "@react-email/components";

export interface InviteProps {
  inviterName: string;
  teamName: string;
  inviteLink: string;
}

export default function InviteEmail({ inviterName, teamName, inviteLink }: InviteProps) {
  return (
    <Html>
      <Text style={{ display: "none" }}>Invitation à rejoindre {teamName}</Text>
      <Container>
        <Section>
          <Row>
            <Column>
              <Text>Bonjour,</Text>
              <Text>{inviterName} vous invite à rejoindre l'équipe {teamName}.</Text>
              <Text>Cliquez sur le bouton ci-dessous pour accepter l'invitation :</Text>
              <Button href={inviteLink} style={{ backgroundColor: "#4F46E5", color: "white", padding: "12px 20px" }}>
                Rejoindre l'équipe
              </Button>
              <Text>Si vous ne connaissez pas cette personne ou cette équipe, vous pouvez ignorer cet email.</Text>
              <Text>Cette invitation expirera dans 7 jours.</Text>
            </Column>
          </Row>
        </Section>
      </Container>
    </Html>
  );
}
