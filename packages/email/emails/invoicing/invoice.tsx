import { InvoiceEmail } from "../../src/templates/invoicing/invoice";

export default function InvoicePreview() {
	return (
		<InvoiceEmail
			invoiceNumber="INV-2025-001"
			customerName="Entreprise TechCorp SARL"
			amount={599.99}
			currency="EUR"
			dueDate={new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)}
			items={[
				{
					description: "Abonnement Stellar SaaS Pro - Janvier 2025",
					quantity: 1,
					unitPrice: 499.99,
					total: 499.99,
				},
				{
					description: "Support prioritaire 24/7",
					quantity: 1,
					unitPrice: 100.0,
					total: 100.0,
				},
			]}
			companyInfo={{
				name: "Stellar SaaS",
				address: "123 Avenue de l'Innovation, 75008 Paris, France",
				email: "facturation@stellar-saas.com",
				website: "https://stellar-saas.com",
			}}
		/>
	);
}
