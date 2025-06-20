import {
	Body,
	Button,
	Container,
	Head,
	Heading,
	Html,
	Preview,
	Section,
	Text,
} from "@react-email/components";

interface LoginAlertProps {
	username?: string;
	loginTime?: string;
	loginLocation?: string;
	loginDevice?: string;
	securityUrl?: string;
	companyName?: string;
}

export default function LoginAlertEmail({
	username = "Utilisateur",
	loginTime = "aujourd'hui à 15:30",
	loginLocation = "Paris, France",
	loginDevice = "Chrome sur Windows",
	securityUrl = "https://example.com/account/security",
	companyName = "Mon SaaS",
}: LoginAlertProps) {
	return (
		<Html>
			<Head />
			<Preview>Nouvelle connexion à votre compte {companyName}</Preview>
			<Body style={main}>
				<Container style={container}>
					<Heading style={heading}>Nouvelle connexion à votre compte</Heading>
					<Section>
						<Text style={text}>Bonjour {username},</Text>
						<Text style={text}>
							Nous avons détecté une nouvelle connexion à votre compte{" "}
							{companyName}.
						</Text>
						<Text style={text}>
							<strong>Date et heure :</strong> {loginTime}
							<br />
							<strong>Localisation :</strong> {loginLocation}
							<br />
							<strong>Appareil :</strong> {loginDevice}
						</Text>
						<Text style={text}>
							Si c'est bien vous, vous pouvez ignorer cet email.
						</Text>
						<Text style={text}>
							Si vous ne reconnaissez pas cette activité, nous vous recommandons
							de sécuriser immédiatement votre compte en cliquant sur le bouton
							ci-dessous.
						</Text>
						<Button style={button} href={securityUrl}>
							Sécuriser mon compte
						</Button>
						<Text style={footer}>
							Cordialement,
							<br />
							L'équipe {companyName}
						</Text>
					</Section>
				</Container>
			</Body>
		</Html>
	);
}

const main = {
	backgroundColor: "#f6f9fc",
	fontFamily:
		'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif',
};

const container = {
	backgroundColor: "#ffffff",
	margin: "0 auto",
	padding: "20px",
	maxWidth: "600px",
	borderRadius: "4px",
	border: "1px solid #eee",
};

const heading = {
	fontSize: "24px",
	fontWeight: "bold",
	marginTop: "20px",
	color: "#333",
};

const text = {
	fontSize: "16px",
	color: "#333",
	lineHeight: "24px",
	marginBottom: "16px",
};

const button = {
	backgroundColor: "#d45454",
	borderRadius: "4px",
	color: "#fff",
	fontSize: "16px",
	textDecoration: "none",
	textAlign: "center" as const,
	display: "block",
	padding: "12px 16px",
	margin: "24px auto",
	maxWidth: "240px",
};

const footer = {
	color: "#666",
	fontSize: "14px",
	marginTop: "32px",
};
