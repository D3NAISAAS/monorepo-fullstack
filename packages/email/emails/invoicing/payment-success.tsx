import { PaymentSuccessEmail } from "../../src/templates/invoicing/payment-success";

export default function PaymentSuccessPreview() {
	return (
		<PaymentSuccessEmail
			customerName="Marie Dubois"
			amount={599.99}
			currency="EUR"
			invoiceNumber="INV-2025-001"
			paymentDate={new Date()}
			paymentMethod="Visa •••• 4242"
			nextBillingDate={new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)}
			downloadUrl="https://stellar-saas.com/invoices/INV-2025-001/download"
			dashboardUrl="https://stellar-saas.com/dashboard"
		/>
	);
}
