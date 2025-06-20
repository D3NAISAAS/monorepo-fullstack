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

interface WelcomeEmailProps {
	userName: string;
	activationUrl: string;
	companyName?: string;
	companyLogo?: string;
	userAvatar?: string;
}

export const WelcomeEmail = ({
	userName = "Alex Chen",
	activationUrl = "https://example.com/activate",
	companyName = "Stellar SaaS",
	companyLogo = "https://via.placeholder.com/120x40/6366f1/ffffff?text=STELLAR",
	userAvatar = "https://via.placeholder.com/80x80/f3f4f6/6b7280?text=AC",
}: WelcomeEmailProps) => (
	<Html>
		<Head />
		<Preview>
			🚀 Bienvenue dans l'aventure {companyName}, {userName}!
		</Preview>
		<Body style={bodyStyle}>
			<Container style={containerStyle}>
				{/* Hero Section with Gradient */}
				<Section style={heroStyle}>
					<div style={gradientOverlayStyle}>
						<Img src={companyLogo} alt={companyName} style={logoStyle} />
						<Text style={heroTitleStyle}>Bienvenue à bord ! 🎉</Text>
						<Text style={heroSubtitleStyle}>
							Votre aventure commence maintenant
						</Text>
					</div>
				</Section>

				{/* Welcome Card */}
				<Section style={cardStyle}>
					<Row>
						<Column style={avatarColumnStyle}>
							<div style={avatarContainerStyle}>
								<Img src={userAvatar} alt={userName} style={avatarStyle} />
								<div style={avatarBadgeStyle}>✨</div>
							</div>
						</Column>
						<Column style={contentColumnStyle}>
							<Text style={welcomeTextStyle}>
								Salut <strong>{userName}</strong> ! 👋
							</Text>
							<Text style={descriptionStyle}>
								Nous sommes <em>absolument ravis</em> de vous accueillir dans la
								communauté {companyName}. Votre compte est presque prêt - il ne
								reste plus qu'à l'activer !
							</Text>
						</Column>
					</Row>
				</Section>

				{/* CTA Section with Modern Button */}
				<Section style={ctaSectionStyle}>
					<div style={ctaCardStyle}>
						<Text style={ctaTitleStyle}>🔓 Activez votre compte</Text>
						<Text style={ctaDescStyle}>
							Un clic et c'est parti ! Débloquez toutes les fonctionnalités
							premium.
						</Text>
						<Button href={activationUrl} style={modernButtonStyle}>
							<span style={buttonTextStyle}>Activer mon compte</span>
							<span style={buttonIconStyle}>→</span>
						</Button>
						<Text style={expiryStyle}>
							⏰ Ce lien expire dans 24h pour votre sécurité
						</Text>
					</div>
				</Section>

				{/* Feature Preview */}
				<Section style={featuresStyle}>
					<Text style={featuresTitleStyle}>Ce qui vous attend :</Text>
					<Row>
						<Column style={featureColumnStyle}>
							<div style={featureItemStyle}>
								<Text style={featureIconStyle}>🚀</Text>
								<Text style={featureTextStyle}>Dashboard intuitif</Text>
							</div>
						</Column>
						<Column style={featureColumnStyle}>
							<div style={featureItemStyle}>
								<Text style={featureIconStyle}>⚡</Text>
								<Text style={featureTextStyle}>Performance ultra-rapide</Text>
							</div>
						</Column>
						<Column style={featureColumnStyle}>
							<div style={featureItemStyle}>
								<Text style={featureIconStyle}>🛡️</Text>
								<Text style={featureTextStyle}>Sécurité renforcée</Text>
							</div>
						</Column>
					</Row>
				</Section>

				{/* Footer */}
				<Hr style={separatorStyle} />
				<Section style={footerStyle}>
					<Text style={footerTextStyle}>
						Besoin d'aide ? Notre équipe est là pour vous accompagner.
					</Text>
					<Text style={disclaimerStyle}>
						Si vous n'avez pas créé ce compte, ignorez simplement cet email.
					</Text>
				</Section>
			</Container>
		</Body>
	</Html>
);

// Styles ultra-modernes
const bodyStyle = {
	backgroundColor: "#f8fafc",
	fontFamily:
		'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
	margin: 0,
	padding: "40px 0",
};

const containerStyle = {
	backgroundColor: "#ffffff",
	margin: "0 auto",
	maxWidth: "600px",
	borderRadius: "16px",
	overflow: "hidden",
	boxShadow:
		"0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
};

const heroStyle = {
	position: "relative" as const,
	height: "200px",
	background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
};

const gradientOverlayStyle = {
	textAlign: "center" as const,
	position: "relative" as const,
	zIndex: 2,
};

const logoStyle = {
	marginBottom: "20px",
	filter: "brightness(0) invert(1)",
};

const heroTitleStyle = {
	color: "#ffffff",
	fontSize: "32px",
	fontWeight: "700",
	margin: "0 0 8px 0",
	textShadow: "0 2px 4px rgba(0,0,0,0.2)",
};

const heroSubtitleStyle = {
	color: "rgba(255, 255, 255, 0.9)",
	fontSize: "16px",
	margin: "0",
	fontWeight: "400",
};

const cardStyle = {
	padding: "40px 32px",
	backgroundColor: "#ffffff",
};

const avatarColumnStyle = {
	width: "100px",
	verticalAlign: "top" as const,
};

const avatarContainerStyle = {
	position: "relative" as const,
	display: "inline-block",
};

const avatarStyle = {
	width: "72px",
	height: "72px",
	borderRadius: "50%",
	border: "3px solid #e5e7eb",
};

const avatarBadgeStyle = {
	position: "absolute" as const,
	bottom: "-2px",
	right: "-2px",
	backgroundColor: "#fbbf24",
	borderRadius: "50%",
	width: "24px",
	height: "24px",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	fontSize: "12px",
	border: "2px solid #ffffff",
};

const contentColumnStyle = {
	paddingLeft: "24px",
};

const welcomeTextStyle = {
	fontSize: "24px",
	fontWeight: "600",
	color: "#111827",
	margin: "0 0 16px 0",
	lineHeight: "1.3",
};

const descriptionStyle = {
	fontSize: "16px",
	color: "#6b7280",
	lineHeight: "1.6",
	margin: "0",
};

const ctaSectionStyle = {
	padding: "0 32px 40px",
	backgroundColor: "#ffffff",
};

const ctaCardStyle = {
	backgroundColor: "#f8fafc",
	borderRadius: "12px",
	padding: "32px",
	textAlign: "center" as const,
	border: "1px solid #e5e7eb",
};

const ctaTitleStyle = {
	fontSize: "20px",
	fontWeight: "600",
	color: "#111827",
	margin: "0 0 12px 0",
};

const ctaDescStyle = {
	fontSize: "14px",
	color: "#6b7280",
	margin: "0 0 24px 0",
	lineHeight: "1.5",
};

const modernButtonStyle = {
	background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
	borderRadius: "12px",
	color: "#ffffff",
	fontSize: "16px",
	fontWeight: "600",
	textDecoration: "none",
	padding: "16px 32px",
	display: "inline-flex",
	alignItems: "center",
	gap: "8px",
	border: "none",
	boxShadow: "0 4px 14px 0 rgba(99, 102, 241, 0.35)",
	transition: "all 0.2s ease",
};

const buttonTextStyle = {
	color: "#ffffff",
};

const buttonIconStyle = {
	fontSize: "18px",
	marginLeft: "4px",
};

const expiryStyle = {
	fontSize: "12px",
	color: "#9ca3af",
	margin: "16px 0 0 0",
};

const featuresStyle = {
	padding: "32px",
	backgroundColor: "#f9fafb",
};

const featuresTitleStyle = {
	fontSize: "18px",
	fontWeight: "600",
	color: "#111827",
	textAlign: "center" as const,
	margin: "0 0 24px 0",
};

const featureColumnStyle = {
	width: "33.333%",
	textAlign: "center" as const,
};

const featureItemStyle = {
	padding: "16px 8px",
};

const featureIconStyle = {
	fontSize: "32px",
	margin: "0 0 8px 0",
	display: "block",
};

const featureTextStyle = {
	fontSize: "14px",
	color: "#6b7280",
	fontWeight: "500",
	margin: "0",
};

const separatorStyle = {
	border: "none",
	borderTop: "1px solid #e5e7eb",
	margin: "0",
};

const footerStyle = {
	padding: "32px",
	textAlign: "center" as const,
	backgroundColor: "#ffffff",
};

const footerTextStyle = {
	fontSize: "14px",
	color: "#6b7280",
	margin: "0 0 8px 0",
};

const disclaimerStyle = {
	fontSize: "12px",
	color: "#9ca3af",
	margin: "0",
};

export default WelcomeEmail;
