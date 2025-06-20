// apps/web/app/test-email/page.tsx
import { emailService } from "@/lib/email-service";
import { EMAIL_TEMPLATES } from "@d3n/email";

export default function TestEmailPage() {
	async function sendTestEmail(formData: FormData) {
		"use server";

		const email = formData.get("email") as string;
		const template = formData.get("template") as string;

		const result = await emailService().sendEmail({
			to: email,
			subject: "Test Email",
			template,
			data: {
				// Données communes
				username: "Test User",
				companyName: "D3N SaaS",

				// Auth templates
				verificationUrl: "https://example.com/activate",
				loginTime: new Date().toLocaleString(),
				loginLocation: "Paris, France",
				loginDevice: "Chrome sur Windows",
				securityUrl: "https://example.com/security",

				// Notification templates
				maintenanceDate: "25 juillet 2025",
				maintenanceDuration: "2 heures",
				impactedServices: ["Authentification", "API"],
				featureName: "Nouvelle fonctionnalité",
				featureDescription: "Description de la nouvelle fonctionnalité",
				featureUrl: "https://example.com/features/new",

				// Invoicing templates
				invoiceNumber: "INV-2025-001",
				invoiceAmount: "99,99 €",
				invoiceDate: new Date().toLocaleDateString(),
				invoiceUrl: "https://example.com/invoice/123",

				// Newsletter templates
				month: "Juin",
				year: "2025",
				highlights: [
					{
						title: "Nouvelle Interface",
						content:
							"Nous avons complètement redesigné notre interface utilisateur pour une meilleure expérience.",
						imageUrl: "https://via.placeholder.com/300x200",
					},
					{
						title: "Performance Améliorée",
						content:
							"Notre application est maintenant 50% plus rapide grâce à des optimisations majeures.",
						imageUrl: "https://via.placeholder.com/300x200",
					},
				],
				upcomingFeatures: [
					"Intégration avec Google Calendar",
					"Mode hors-ligne",
					"Application mobile native",
				],
				ctaText: "Découvrir les nouveautés",
				ctaUrl: "https://example.com/nouveautes",

				// Product updates
				version: "v2.5.0",
				releaseDate: "20 juin 2025",
				updates: [
					{
						type: "feature",
						title: "Nouveau dashboard",
						description:
							"Un tableau de bord entièrement repensé avec des widgets personnalisables.",
						imageUrl: "https://via.placeholder.com/400x200",
					},
					{
						type: "improvement",
						title: "Temps de chargement",
						description:
							"Amélioration des performances de chargement des pages de 40%.",
					},
					{
						type: "bugfix",
						title: "Correction d'erreurs",
						description:
							"Résolution du problème d'affichage sur les appareils mobiles.",
					},
				],
				documentationUrl: "https://docs.example.com/v2.5",

				// Review templates
				productName: "Notre Produit SaaS",
				productImage: "https://via.placeholder.com/300x300",
				questions: [
					"Comment évaluez-vous la facilité d'utilisation de notre produit ?",
					"Quelles fonctionnalités aimeriez-vous voir ajoutées ?",
					"Recommanderiez-vous notre produit à un collègue ?",
				],
				feedbackUrl: "https://example.com/feedback",
				reviewUrl: "https://example.com/review",
				incentive: "10% de réduction sur votre prochain abonnement",
			},
		});

		console.log("Test email result:", result);
	}

	return (
		<form action={sendTestEmail} className="mx-auto max-w-md space-y-4 p-8">
			<h1 className="font-bold text-2xl">Test Email</h1>

			<div>
				<label htmlFor="email">Email de test :</label>
				<input
					id="email"
					name="email"
					type="email"
					defaultValue="test@example.com"
					className="block w-full rounded border px-3 py-2"
				/>
			</div>

			<div>
				<label htmlFor="template">Template :</label>
				<select
					name="template"
					className="block w-full rounded border px-3 py-2"
				>
					<optgroup label="Authentification">
						<option value={EMAIL_TEMPLATES.auth.welcome}>Welcome</option>
						<option value={EMAIL_TEMPLATES.auth.resetPassword}>
							Reset Password
						</option>
						<option value={EMAIL_TEMPLATES.auth.verifyEmail}>
							Verify Email
						</option>
						<option value={EMAIL_TEMPLATES.auth.loginAlert}>Login Alert</option>
					</optgroup>
					<optgroup label="Notifications">
						<option value={EMAIL_TEMPLATES.notifications.systemAlert}>
							System Alert
						</option>
						<option value={EMAIL_TEMPLATES.notifications.maintenance}>
							Maintenance
						</option>
						<option value={EMAIL_TEMPLATES.notifications.featureUpdate}>
							Feature Update
						</option>
					</optgroup>
					<optgroup label="Facturation">
						<option value={EMAIL_TEMPLATES.invoicing.invoice}>Invoice</option>
						<option value={EMAIL_TEMPLATES.invoicing.paymentSuccess}>
							Payment Success
						</option>
						<option value={EMAIL_TEMPLATES.invoicing.paymentFailed}>
							Payment Failed
						</option>
						<option value={EMAIL_TEMPLATES.invoicing.subscriptionRenewal}>
							Subscription Renewal
						</option>
					</optgroup>
					{/* <optgroup label="Newsletters">
						<option value={EMAIL_TEMPLATES.newsletters.monthly}>
							Monthly Newsletter
						</option>
						<option value={EMAIL_TEMPLATES.newsletters.productUpdates}>
							Product Updates
						</option>
					</optgroup>
					<optgroup label="Reviews">
						<option value={EMAIL_TEMPLATES.reviews.feedbackRequest}>
							Feedback Request
						</option>
						<option value={EMAIL_TEMPLATES.reviews.reviewReminder}>
							Review Reminder
						</option>
					</optgroup> */}
				</select>
			</div>

			<button
				type="submit"
				className="rounded bg-blue-500 px-4 py-2 text-white"
			>
				Envoyer Test
			</button>
		</form>
	);
}
