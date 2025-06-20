import LoginAlertEmail from "../../src/templates/auth/login-alert";

export default function LoginAlertPreview() {
	return (
		<LoginAlertEmail
			userName="Alex Chen"
			loginTime={new Date()}
			location="Paris, France"
			device="MacBook Pro - Chrome 120"
			ipAddress="192.168.1.100"
			secureAccountUrl="https://stellar-saas.com/security/review"
		/>
	);
}
