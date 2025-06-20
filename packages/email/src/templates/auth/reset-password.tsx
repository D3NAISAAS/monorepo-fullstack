import {
	Body,
	Button,
	Column,
	Container,
	Head,
	Html,
	Preview,
	Row,
	Section,
	Text,
} from "@react-email/components";

interface ResetPasswordProps {
	userName: string;
	resetUrl: string;
	expiryTime?: string;
	ipAddress?: string;
	userAgent?: string;
}

export const ResetPasswordEmail = ({
	userName = "Alex",
	resetUrl = "https://example.com/reset",
	expiryTime = "30 minutes",
	ipAddress = "192.168.1.100",
	userAgent = "Chrome on macOS",
}: ResetPasswordProps) => (
	<Html>
		<Head />
		<Preview>🔐 Demande de réinitialisation de mot de passe</Preview>
		<Body style={resetBodyStyle}>
			<Container style={resetContainerStyle}>
				{/* Security Header */}
				<Section style={securityHeaderStyle}>
					<div style={lockIconStyle}>🔐</div>
					<Text style={securityTitleStyle}>Réinitialisation sécurisée</Text>
					<Text style={securitySubtitleStyle}>
						Votre sécurité est notre priorité
					</Text>
				</Section>

				{/* Request Details */}
				<Section style={requestDetailsStyle}>
					<Text style={greetingStyle}>Bonjour {userName},</Text>
					<Text style={requestMessageStyle}>
						Nous avons reçu une demande de réinitialisation de votre mot de
						passe. Si c'était vous, cliquez sur le bouton sécurisé ci-dessous.
					</Text>

					{/* Security Info Card */}
					<div style={securityCardStyle}>
						<Text style={securityCardTitleStyle}>📋 Détails de la demande</Text>
						<Row style={detailRowSecurityStyle}>
							<Column style={detailLabelColSecurityStyle}>
								<Text style={detailLabelSecurityStyle}>🕐 Heure</Text>
							</Column>
							<Column style={detailValueColSecurityStyle}>
								<Text style={detailValueSecurityStyle}>
									{new Date().toLocaleString("fr-FR")}
								</Text>
							</Column>
						</Row>
						<Row style={detailRowSecurityStyle}>
							<Column style={detailLabelColSecurityStyle}>
								<Text style={detailLabelSecurityStyle}>🌐 IP</Text>
							</Column>
							<Column style={detailValueColSecurityStyle}>
								<Text style={detailValueSecurityStyle}>{ipAddress}</Text>
							</Column>
						</Row>
						<Row style={detailRowSecurityStyle}>
							<Column style={detailLabelColSecurityStyle}>
								<Text style={detailLabelSecurityStyle}>💻 Appareil</Text>
							</Column>
							<Column style={detailValueColSecurityStyle}>
								<Text style={detailValueSecurityStyle}>{userAgent}</Text>
							</Column>
						</Row>
					</div>
				</Section>

				{/* Reset Button */}
				<Section style={resetButtonSectionStyle}>
					<Text style={resetInstructionStyle}>
						Cliquez sur ce bouton pour créer un nouveau mot de passe :
					</Text>
					<Button href={resetUrl} style={resetButtonStyle}>
						🔒 Réinitialiser mon mot de passe
					</Button>
					<Text style={expiryWarningStyle}>
						⏰ Ce lien expire dans {expiryTime} pour votre sécurité
					</Text>
				</Section>

				{/* Security Tips */}
				<Section style={tipsSecurityStyle}>
					<div style={tipsCardStyle}>
						<Text style={tipsIconStyle}>💡</Text>
						<Text style={tipsTitleSecurityStyle}>
							Conseils pour un mot de passe sécurisé :
						</Text>
						<Text style={tipsListStyle}>
							✅ Au moins 12 caractères
							<br />✅ Mélange de lettres, chiffres et symboles
							<br />✅ Unique pour chaque service
							<br />✅ Évitez les informations personnelles
						</Text>
					</div>
				</Section>

				{/* Warning */}
				<Section style={warningStyle}>
					<div style={warningCardStyle}>
						<Text style={warningIconStyle}>⚠️</Text>
						<Text style={warningTitleStyle}>Important !</Text>
						<Text style={warningTextStyle}>
							Si vous n'avez pas demandé cette réinitialisation, ignorez cet
							email. Votre mot de passe actuel reste inchangé et votre compte
							est sécurisé.
						</Text>
					</div>
				</Section>
			</Container>
		</Body>
	</Html>
);

// Reset Password Styles
const resetBodyStyle = {
	backgroundColor: "#1e293b",
	fontFamily:
		'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
	padding: "40px 0",
};

const resetContainerStyle = {
	backgroundColor: "#ffffff",
	margin: "0 auto",
	maxWidth: "600px",
	borderRadius: "16px",
	overflow: "hidden",
	boxShadow: "0 25px 50px rgba(0, 0, 0, 0.25)",
};

const securityHeaderStyle = {
	background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
	padding: "50px 32px",
	textAlign: "center" as const,
	color: "#ffffff",
};

const lockIconStyle = {
	fontSize: "56px",
	margin: "0 0 20px 0",
	display: "block",
	filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.3))",
};

const securityTitleStyle = {
	fontSize: "32px",
	fontWeight: "800",
	margin: "0 0 8px 0",
};

const securitySubtitleStyle = {
	fontSize: "16px",
	opacity: 0.9,
	margin: "0",
};

const requestDetailsStyle = {
	padding: "40px 32px 32px",
};

const greetingStyle = {
	fontSize: "24px",
	fontWeight: "600",
	color: "#111827",
	margin: "0 0 16px 0",
};

const requestMessageStyle = {
	fontSize: "16px",
	color: "#6b7280",
	lineHeight: "1.6",
	margin: "0 0 24px 0",
};

const securityCardStyle = {
	backgroundColor: "#f8fafc",
	border: "1px solid #e2e8f0",
	borderRadius: "12px",
	padding: "20px",
};

const securityCardTitleStyle = {
	fontSize: "16px",
	fontWeight: "600",
	color: "#334155",
	margin: "0 0 16px 0",
};

const detailRowSecurityStyle = {
	marginBottom: "8px",
};

const detailLabelColSecurityStyle = {
	width: "30%",
};

const detailValueColSecurityStyle = {
	width: "70%",
};

const detailLabelSecurityStyle = {
	fontSize: "14px",
	color: "#64748b",
	margin: "0",
};

const detailValueSecurityStyle = {
	fontSize: "14px",
	color: "#1e293b",
	fontWeight: "500",
	margin: "0",
};

const resetButtonSectionStyle = {
	padding: "0 32px 32px",
	textAlign: "center" as const,
};

const resetInstructionStyle = {
	fontSize: "16px",
	color: "#374151",
	margin: "0 0 24px 0",
};

const resetButtonStyle = {
	background: "linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)",
	borderRadius: "12px",
	color: "#ffffff",
	fontSize: "18px",
	fontWeight: "700",
	textDecoration: "none",
	padding: "18px 36px",
	display: "inline-block",
	boxShadow: "0 8px 25px rgba(220, 38, 38, 0.4)",
	border: "none",
};

const expiryWarningStyle = {
	fontSize: "14px",
	color: "#dc2626",
	margin: "20px 0 0 0",
	fontWeight: "500",
};

const tipsSecurityStyle = {
	padding: "0 32px 32px",
};

const tipsCardStyle = {
	backgroundColor: "#ecfdf5",
	border: "1px solid #a7f3d0",
	borderRadius: "12px",
	padding: "24px",
	textAlign: "center" as const,
};

const tipsIconStyle = {
	fontSize: "32px",
	margin: "0 0 12px 0",
	display: "block",
};

const tipsTitleSecurityStyle = {
	fontSize: "16px",
	fontWeight: "600",
	color: "#065f46",
	margin: "0 0 12px 0",
};

const tipsListStyle = {
	fontSize: "14px",
	color: "#047857",
	lineHeight: "1.6",
	margin: "0",
	textAlign: "left" as const,
};

const warningStyle = {
	padding: "32px",
	backgroundColor: "#fef2f2",
};

const warningCardStyle = {
	backgroundColor: "#fef2f2",
	border: "2px solid #fecaca",
	borderRadius: "12px",
	padding: "20px",
	textAlign: "center" as const,
};

const warningIconStyle = {
	fontSize: "28px",
	margin: "0 0 12px 0",
	display: "block",
};

const warningTitleStyle = {
	fontSize: "18px",
	fontWeight: "700",
	color: "#dc2626",
	margin: "0 0 12px 0",
};

const warningTextStyle = {
	fontSize: "14px",
	color: "#991b1b",
	lineHeight: "1.5",
	margin: "0",
};

export default ResetPasswordEmail;
