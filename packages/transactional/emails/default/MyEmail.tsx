import { Body, Button, Head, Html } from "@react-email/components";

export const MyEmail = () => {
  return (
    <Html>
      <Head />
      <Body>
        <Button
          href="https://example.com"
          style={{ background: "#000", color: "#fff", padding: "12px 20px" }}
        >
          Click me
        </Button>
      </Body>
    </Html>
  );
}

export default MyEmail;