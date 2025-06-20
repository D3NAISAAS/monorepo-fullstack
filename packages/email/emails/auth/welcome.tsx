import { WelcomeEmail } from "../../src/templates/auth/welcome";

export default function WelcomePreview() {
	return (
		<WelcomeEmail
			userName="Alex Chen"
			activationUrl="https://stellar-saas.com/activate?token=abc123xyz789"
			companyName="Stellar SaaS"
			companyLogo="https://via.placeholder.com/120x40/6366f1/ffffff?text=STELLAR"
			userAvatar="https://via.placeholder.com/80x80/f3f4f6/6b7280?text=AC"
		/>
	);
}
