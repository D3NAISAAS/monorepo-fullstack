import VerifyEmail from "../../src/templates/auth/verify-email";

export default function VerifyEmailPreview() {
	return (
		<VerifyEmail
			username="Alex Chen"
			verificationUrl="https://stellar-saas.com/verify?code=742851"
			companyName="Stellar SaaS"
		/>
	);
}
