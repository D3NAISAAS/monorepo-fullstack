import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from '@react-email/components';

interface ResetPasswordEmailProps {
  userEmail?: string;
  resetUrl?: string;
}

const ForgotPasswordEmail = (props: ResetPasswordEmailProps) => {
  const { userEmail = 'd3nailabs@gmail.com', resetUrl = 'https://example.com/reset-password' } = props;

  return (
    <Html lang="en" dir="ltr">
      <Head />
      <Preview>Reset your password - Action required</Preview>
      <Tailwind>
        <Body className="bg-gray-100 font-sans py-[40px]">
          <Container className="mx-auto bg-white rounded-[8px] shadow-sm max-w-[580px] px-[40px] py-[40px]">
            {/* Header */}
            <Section className="text-center mb-[32px]">
              <Heading className="text-[28px] font-bold text-gray-900 m-0 mb-[8px]">
                Password Reset Request
              </Heading>
              <Text className="text-[16px] text-gray-600 m-0">
                We received a request to reset your password
              </Text>
            </Section>

            {/* Main Content */}
            <Section className="mb-[32px]">
              <Text className="text-[16px] text-gray-700 leading-[24px] m-0 mb-[16px]">
                Hello,
              </Text>
              <Text className="text-[16px] text-gray-700 leading-[24px] m-0 mb-[16px]">
                We received a request to reset the password for your account associated with <strong>{userEmail}</strong>.
              </Text>
              <Text className="text-[16px] text-gray-700 leading-[24px] m-0 mb-[24px]">
                Click the button below to create a new password. This link will expire in 24 hours for security reasons.
              </Text>
            </Section>

            {/* Reset Button */}
            <Section className="text-center mb-[32px]">
              <Button
                href={resetUrl}
                className="bg-blue-600 text-white px-[32px] py-[16px] rounded-[8px] text-[16px] font-semibold no-underline box-border inline-block"
              >
                Reset Your Password
              </Button>
            </Section>

            {/* Alternative Link */}
            <Section className="mb-[32px]">
              <Text className="text-[14px] text-gray-600 leading-[20px] m-0 mb-[16px]">
                If the button above doesn't work, copy and paste this link into your browser:
              </Text>
              <Text className="text-[14px] text-blue-600 break-all m-0">
                <Link href={resetUrl} className="text-blue-600 underline">
                  {resetUrl}
                </Link>
              </Text>
            </Section>

            {/* Security Notice */}
            <Section className="bg-yellow-50 border border-yellow-200 rounded-[8px] p-[20px] mb-[32px]">
              <Text className="text-[14px] text-yellow-800 m-0 mb-[8px] font-semibold">
                🔒 Security Notice
              </Text>
              <Text className="text-[14px] text-yellow-700 leading-[20px] m-0">
                If you didn't request this password reset, please ignore this email. Your password will remain unchanged. For security, this reset link will expire in 24 hours.
              </Text>
            </Section>

            {/* Help Section */}
            <Section className="mb-[32px]">
              <Text className="text-[14px] text-gray-600 leading-[20px] m-0">
                Need help? Contact our support team at{' '}
                <Link href="mailto:support@example.com" className="text-blue-600 underline">
                  support@example.com
                </Link>
              </Text>
            </Section>

            {/* Footer */}
            <Section className="border-t border-gray-200 pt-[24px]">
              <Text className="text-[12px] text-gray-500 leading-[16px] m-0 mb-[8px]">
                This email was sent to {userEmail}
              </Text>
              <Text className="text-[12px] text-gray-500 leading-[16px] m-0 mb-[8px]">
                Example Company, 123 Business Street, City, State 12345
              </Text>
              <Text className="text-[12px] text-gray-500 leading-[16px] m-0">
                © 2025 Example Company. All rights reserved.{' '}
                <Link href="https://example.com/unsubscribe" className="text-gray-500 underline">
                  Unsubscribe
                </Link>
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

ForgotPasswordEmail.PreviewProps = {
  userEmail: 'd3nailabs@gmail.com',
  resetUrl: 'https://example.com/reset-password?token=abc123xyz789',
};

export default ForgotPasswordEmail;