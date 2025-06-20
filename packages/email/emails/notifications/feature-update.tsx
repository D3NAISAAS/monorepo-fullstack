import FeatureUpdateEmail from "../../src/templates/notifications/feature-update";

export default function FeatureUpdatePreview() {
	return (
		<FeatureUpdateEmail
			featureName="Tableaux de bord adaptatifs"
			description="Créez des vues personnalisées qui s'adaptent automatiquement à votre workflow et vos données."
			benefits={[
				"Interface drag-and-drop ultra-intuitive",
				"Widgets intelligents qui apprennent vos préférences",
				"Synchronisation en temps réel multi-appareils",
				"Thèmes personnalisables et mode sombre",
			]}
			screenshots={[
				{
					url: "https://via.placeholder.com/500x300/6366f1/ffffff?text=Dashboard+Builder",
					alt: "Dashboard Builder Interface",
					caption: "Nouvelle interface de création de tableaux de bord",
				},
				{
					url: "https://via.placeholder.com/500x300/10b981/ffffff?text=Widget+Gallery",
					alt: "Widget Gallery",
					caption: "Galerie de widgets avec +50 composants",
				},
			]}
			learnMoreUrl="https://stellar-saas.com/features/adaptive-dashboards"
			changelogUrl="https://stellar-saas.com/changelog/v2.5.0"
			version="v2.5.0"
		/>
	);
}
