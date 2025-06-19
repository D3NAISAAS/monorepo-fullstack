import React from "react";
import { Html, Text, Container, Section, Row, Column } from "@react-email/components";
import { Markdown } from "@react-email/components";

interface MarkdownEmailProps {
  preview?: string;
  markdown: string;
}

export default function MarkdownEmail({ preview, markdown }: MarkdownEmailProps) {
  return (
    <Html>
      <Text style={{ display: "none" }}>{preview}</Text>
      <Container>
        <Section>
          <Row>
            <Column>
              <Markdown>{markdown}</Markdown>
            </Column>
          </Row>
        </Section>
      </Container>
    </Html>
  );
}
