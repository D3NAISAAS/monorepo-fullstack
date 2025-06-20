import {
	Body,
	Button,
	Column,
	Container,
	Head,
	Hr,
	Html,
	Img,
	Preview,
	Row,
	Section,
	Text,
} from "@react-email/components";

interface FeatureUpdateProps {
	featureName: string;
	description: string;
	benefits: string[];
	screenshots: Array<{
		url: string;
		alt: string;
		caption: string;
	}>;
	learnMoreUrl: string;
	changelogUrl: string;
	version: string;
}

export const FeatureUpdateEmail = ({
	featureName = "Tableaux de bord adaptatifs",
	description = "Créez des vues personnalisées qui s'adaptent automatiquement à votre workflow et vos données.",
	benefits = [
		"Interface drag-and-drop intuitive",
		"Widgets intelligents qui apprennent vos préférences",
		"Synchronisation en temps réel",
		"Responsive sur tous vos appareils",
	],
	screenshots = [
		{
			url: "https://via.placeholder.com/400x250/6366f1/ffffff?text=Dashboard+Builder",
			alt: "Dashboard Builder",
			caption: "Créateur de tableaux de bord",
		},
		{
			url: "https://via.placeholder.com/400x250/10b981/ffffff?text=Widget+Library",
			alt: "Widget Library",
			caption: "Bibliothèque de widgets",
		},
	],
	learnMoreUrl = "https://example.com/features/dashboard",
	changelogUrl = "https://example.com/changelog",
	version = "v2.5.0",
}: FeatureUpdateProps) => (
	<Html>
		<Head />
		<Preview>
			🚀 Nouvelle fonctionnalité : {featureName} maintenant disponible !
		</Preview>
		<Body style={updateBodyStyle}>
			<Container style={updateContainerStyle}>
				{/* Launch Header */}
				<Section style={launchHeaderStyle}>
					<div style={rocketContainerStyle}>
						<Text style={rocketIconStyle}>🚀</Text>
						<div style={launchRingStyle} />
					</div>
					<Text style={launchBadgeStyle}>
						NOUVELLE FONCTIONNALITÉ • {version}
					</Text>
					<Text style={launchTitleStyle}>{featureName}</Text>
					<Text style={launchSubtitleStyle}>{description}</Text>
				</Section>

				{/* Feature Showcase */}
				<Section style={showcaseStyle}>
					<Text style={showcaseTitleStyle}>
						✨ Découvrez ce qui vous attend
					</Text>

					{screenshots.map((screenshot, index) => (
						<div key={index.toString()} style={screenshotCardStyle}>
							<Img
								src={screenshot.url}
								alt={screenshot.alt}
								style={screenshotImageStyle}
							/>
							<Text style={screenshotCaptionStyle}>{screenshot.caption}</Text>
						</div>
					))}
				</Section>

				{/* Benefits Grid */}
				<Section style={benefitsStyle}>
					<Text style={benefitsSectionTitleStyle}>
						🎯 Vos nouveaux super-pouvoirs
					</Text>
					<div style={benefitsGridStyle}>
						{benefits.map((benefit, index) => (
							<div key={index.toString()} style={benefitItemStyle}>
								<Text style={benefitNumberStyle}>{index + 1}</Text>
								<Text style={benefitTextStyle}>{benefit}</Text>
							</div>
						))}
					</div>
				</Section>

				{/* How to Access */}
				<Section style={accessStyle}>
					<div style={accessCardStyle}>
						<Text style={accessIconStyle}>🎮</Text>
						<Text style={accessTitleStyle}>Comment y accéder ?</Text>
						<Text style={accessInstructionStyle}>
							La nouvelle fonctionnalité est <strong>déjà active</strong> dans
							votre compte ! Rendez-vous dans votre dashboard et cliquez sur
							"Personnaliser" pour commencer à créer vos vues sur mesure.
						</Text>
						<Button href={learnMoreUrl} style={tryButtonStyle}>
							🎨 Essayer maintenant
						</Button>
					</div>
				</Section>

				{/* User Feedback Preview */}
				<Section style={feedbackPreviewStyle}>
					<Text style={feedbackTitleStyle}>
						💬 Ce que nos utilisateurs en pensent
					</Text>
					<Row>
						<Column style={testimonialColStyle}>
							<div style={testimonialCardStyle}>
								<Text style={testimonialQuoteStyle}>
									"Enfin ! J'attendais cette fonctionnalité depuis des mois.
									C'est exactement ce dont j'avais besoin."
								</Text>
								<Text style={testimonialAuthorStyle}>
									— Sarah M., Product Manager
								</Text>
							</div>
						</Column>
						<Column style={testimonialColStyle}>
							<div style={testimonialCardStyle}>
								<Text style={testimonialQuoteStyle}>
									"L'interface est super intuitive. J'ai créé mon dashboard
									parfait en 5 minutes !"
								</Text>
								<Text style={testimonialAuthorStyle}>
									— Thomas L., Data Analyst
								</Text>
							</div>
						</Column>
					</Row>
				</Section>

				{/* What's Next */}
				<Section style={roadmapStyle}>
					<div style={roadmapCardStyle}>
						<Text style={roadmapIconStyle}>🗺️</Text>
						<Text style={roadmapTitleStyle}>Et ce n'est que le début !</Text>
						<Text style={roadmapContentStyle}>
							Dans les prochaines semaines, nous lançons :<br />
							<br />🤖 <strong>IA intégrée</strong> pour des suggestions
							automatiques
							<br />📊 <strong>Analytics avancés</strong> avec prédictions
							<br />🔗 <strong>Intégrations</strong> avec +50 nouveaux outils
						</Text>
						<Button href={changelogUrl} style={roadmapButtonStyle}>
							📈 Voir la roadmap complète
						</Button>
					</div>
				</Section>

				{/* Footer */}
				<Hr style={updateSeparatorStyle} />
				<Section style={updateFooterStyle}>
					<Text style={updateFooterTitleStyle}>
						Merci de nous faire confiance ! 🙏
					</Text>
					<Text style={updateFooterTextStyle}>
						Votre feedback nous aide à créer les fonctionnalités que vous
						utilisez vraiment. Continuez à nous dire ce qui vous ferait gagner
						du temps !
					</Text>
				</Section>
			</Container>
		</Body>
	</Html>
);

// Feature Update Styles
const updateBodyStyle = {
	backgroundColor: "#0f172a",
	fontFamily:
		'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
	padding: "40px 0",
};

const updateContainerStyle = {
	backgroundColor: "#ffffff",
	margin: "0 auto",
	maxWidth: "700px",
	borderRadius: "24px",
	overflow: "hidden",
	boxShadow: "0 25px 50px rgba(0, 0, 0, 0.25)",
};

const launchHeaderStyle = {
	background: "linear-gradient(135deg, #6366f1 0%, #3b82f6 50%, #06b6d4 100%)",
	padding: "60px 32px 50px",
	textAlign: "center" as const,
	color: "#ffffff",
	position: "relative" as const,
};

const rocketContainerStyle = {
	position: "relative" as const,
	display: "inline-block",
	marginBottom: "20px",
};

const rocketIconStyle = {
	fontSize: "64px",
	margin: "0",
	display: "block",
	position: "relative" as const,
	zIndex: 2,
};

const launchRingStyle = {
	position: "absolute" as const,
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: "120px",
	height: "120px",
	border: "3px solid rgba(255, 255, 255, 0.2)",
	borderRadius: "50%",
	animation: "pulse 3s infinite",
};

const launchBadgeStyle = {
	fontSize: "12px",
	fontWeight: "700",
	letterSpacing: "1px",
	backgroundColor: "rgba(255, 255, 255, 0.2)",
	backdropFilter: "blur(10px)",
	borderRadius: "20px",
	padding: "8px 16px",
	display: "inline-block",
	margin: "0 0 16px 0",
};

const launchTitleStyle = {
	fontSize: "36px",
	fontWeight: "900",
	margin: "0 0 16px 0",
	textShadow: "0 2px 4px rgba(0,0,0,0.1)",
};

const launchSubtitleStyle = {
	fontSize: "18px",
	opacity: 0.95,
	lineHeight: "1.5",
	margin: "0",
	maxWidth: "500px",
	marginLeft: "auto",
	marginRight: "auto",
};

const showcaseStyle = {
	padding: "50px 32px",
	backgroundColor: "#ffffff",
};

const showcaseTitleStyle = {
	fontSize: "24px",
	fontWeight: "700",
	color: "#111827",
	textAlign: "center" as const,
	margin: "0 0 40px 0",
};

const screenshotCardStyle = {
	marginBottom: "32px",
	textAlign: "center" as const,
};

const screenshotImageStyle = {
	width: "100%",
	maxWidth: "500px",
	height: "auto",
	borderRadius: "16px",
	boxShadow: "0 20px 25px rgba(0, 0, 0, 0.1)",
	border: "1px solid #e5e7eb",
};

const screenshotCaptionStyle = {
	fontSize: "14px",
	color: "#6b7280",
	fontWeight: "500",
	margin: "12px 0 0 0",
};

const benefitsStyle = {
	padding: "50px 32px",
	backgroundColor: "#f8fafc",
};

const benefitsSectionTitleStyle = {
	fontSize: "24px",
	fontWeight: "700",
	color: "#111827",
	textAlign: "center" as const,
	margin: "0 0 32px 0",
};

const benefitsGridStyle = {
	display: "grid",
	gap: "20px",
};

const benefitItemStyle = {
	display: "flex",
	alignItems: "flex-start",
	gap: "16px",
	backgroundColor: "#ffffff",
	borderRadius: "12px",
	padding: "20px",
	border: "1px solid #e5e7eb",
};

const benefitNumberStyle = {
	width: "32px",
	height: "32px",
	backgroundColor: "#6366f1",
	color: "#ffffff",
	borderRadius: "50%",
	fontSize: "14px",
	fontWeight: "700",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	flexShrink: 0,
	margin: "0",
};

const benefitTextStyle = {
	fontSize: "16px",
	color: "#374151",
	fontWeight: "500",
	margin: "0",
	lineHeight: "1.5",
};

const accessStyle = {
	padding: "50px 32px",
	backgroundColor: "#ffffff",
};

const accessCardStyle = {
	background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
	borderRadius: "20px",
	padding: "40px",
	textAlign: "center" as const,
	color: "#ffffff",
};

const accessIconStyle = {
	fontSize: "48px",
	margin: "0 0 16px 0",
	display: "block",
};

const accessTitleStyle = {
	fontSize: "24px",
	fontWeight: "700",
	margin: "0 0 16px 0",
};

const accessInstructionStyle = {
	fontSize: "16px",
	lineHeight: "1.6",
	margin: "0 0 24px 0",
	opacity: 0.95,
};

const tryButtonStyle = {
	backgroundColor: "#ffffff",
	color: "#059669",
	fontSize: "16px",
	fontWeight: "700",
	textDecoration: "none",
	padding: "16px 32px",
	borderRadius: "12px",
	display: "inline-block",
	boxShadow: "0 4px 14px rgba(0, 0, 0, 0.1)",
};

const feedbackPreviewStyle = {
	padding: "50px 32px",
	backgroundColor: "#f0fdf4",
};

const feedbackTitleStyle = {
	fontSize: "22px",
	fontWeight: "700",
	color: "#111827",
	textAlign: "center" as const,
	margin: "0 0 32px 0",
};

const testimonialColStyle = {
	width: "50%",
	padding: "0 12px",
};

const testimonialCardStyle = {
	backgroundColor: "#ffffff",
	borderRadius: "12px",
	padding: "20px",
	border: "1px solid #d1fae5",
};

const testimonialQuoteStyle = {
	fontSize: "14px",
	color: "#374151",
	fontStyle: "italic",
	lineHeight: "1.5",
	margin: "0 0 12px 0",
};

const testimonialAuthorStyle = {
	fontSize: "12px",
	color: "#059669",
	fontWeight: "600",
	margin: "0",
};

const roadmapStyle = {
	padding: "50px 32px",
	backgroundColor: "#ffffff",
};

const roadmapCardStyle = {
	backgroundColor: "#fef3c7",
	border: "2px solid #f59e0b",
	borderRadius: "16px",
	padding: "32px",
	textAlign: "center" as const,
};

const roadmapIconStyle = {
	fontSize: "40px",
	margin: "0 0 16px 0",
	display: "block",
};

const roadmapTitleStyle = {
	fontSize: "22px",
	fontWeight: "700",
	color: "#92400e",
	margin: "0 0 16px 0",
};

const roadmapContentStyle = {
	fontSize: "15px",
	color: "#92400e",
	lineHeight: "1.6",
	margin: "0 0 24px 0",
	textAlign: "left" as const,
};

const roadmapButtonStyle = {
	backgroundColor: "#f59e0b",
	color: "#ffffff",
	fontSize: "14px",
	fontWeight: "600",
	textDecoration: "none",
	padding: "12px 24px",
	borderRadius: "8px",
	display: "inline-block",
};

const updateSeparatorStyle = {
	border: "none",
	borderTop: "1px solid #e5e7eb",
	margin: "0",
};

const updateFooterStyle = {
	padding: "40px 32px",
	textAlign: "center" as const,
	backgroundColor: "#f9fafb",
};

const updateFooterTitleStyle = {
	fontSize: "18px",
	fontWeight: "600",
	color: "#111827",
	margin: "0 0 12px 0",
};

const updateFooterTextStyle = {
	fontSize: "14px",
	color: "#6b7280",
	lineHeight: "1.5",
	margin: "0",
};

export default FeatureUpdateEmail;
