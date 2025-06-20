import { ResetPasswordEmail } from "../../src/templates/auth/reset-password";

export default function ResetPasswordPreview() {
	return (
		<ResetPasswordEmail
			userName="Alex Chen"
			resetUrl="https://stellar-saas.com/reset-password?token=secure123"
			expiryTime="30 minutes"
			ipAddress="192.168.1.100"
			userAgent="Chrome 120 on macOS Sonoma"
		/>
	);
}
