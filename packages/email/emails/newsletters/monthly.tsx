import { MonthlyNewsletterEmail } from "../../src/templates/newsletters/monthly";

export default function MonthlyNewsletterPreview() {
	return (
		<MonthlyNewsletterEmail
			month="Janvier"
			year={2025}
			articles={[
				{
					title: "Révolution UX : Notre nouvelle interface dévoilée",
					summary:
						"Découvrez en exclusivité notre design system repensé pour une expérience utilisateur encore plus fluide et intuitive.",
					imageUrl:
						"https://via.placeholder.com/400x250/6366f1/ffffff?text=New+UI+Design",
					readUrl: "https://stellar-saas.com/blog/nouvelle-interface-2025",
					category: "Produit",
					readTime: "4 min",
				},
				{
					title:
						"Performance boostée de +40% grâce à notre nouvelle architecture",
					summary:
						"Nos ingénieurs ont reconstruit notre infrastructure pour des temps de réponse record et une fiabilité maximale.",
					imageUrl:
						"https://via.placeholder.com/400x250/10b981/ffffff?text=Performance+Boost",
					readUrl: "https://stellar-saas.com/blog/architecture-performance",
					category: "Tech",
					readTime: "6 min",
				},
				{
					title: "IA intégrée : L'assistant intelligent arrive bientôt",
					summary:
						"Préparez-vous à découvrir notre assistant IA qui va révolutionner votre façon de travailler avec Stellar SaaS.",
					imageUrl:
						"https://via.placeholder.com/400x250/8b5cf6/ffffff?text=AI+Assistant",
					readUrl: "https://stellar-saas.com/blog/assistant-ia-preview",
					category: "Innovation",
					readTime: "5 min",
				},
			]}
			stats={{
				newUsers: 2847,
				newFeatures: 12,
				bugsFixed: 34,
			}}
			companyName="Stellar SaaS"
			unsubscribeUrl="https://stellar-saas.com/unsubscribe?token=abc123"
		/>
	);
}
