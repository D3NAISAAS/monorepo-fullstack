import {
	Body,
	Button,
	Container,
	Head,
	Heading,
	Html,
	Link,
	Preview,
	Section,
	Text,
} from "@react-email/components";

interface VerifyEmailProps {
	username?: string;
	verificationUrl?: string;
	companyName?: string;
}

export default function VerifyEmail({
	username = "Utilisateur",
	verificationUrl = "https://example.com/verify-email?token=123456789",
	companyName = "Mon SaaS",
}: VerifyEmailProps) {
	return (
		<Html>
			<Head />
			<Preview>Vérifiez votre adresse email pour {companyName}</Preview>
			<Body style={main}>
				<Container style={container}>
					<Heading style={heading}>Vérification de votre adresse email</Heading>
					<Section>
						<Text style={text}>Bonjour {username},</Text>
						<Text style={text}>
							Merci de vous être inscrit sur {companyName}. Pour finaliser votre
							inscription, veuillez vérifier votre adresse email en cliquant sur
							le bouton ci-dessous.
						</Text>
						<Button style={button} href={verificationUrl}>
							Vérifier mon email
						</Button>
						<Text style={text}>
							Si vous n'avez pas demandé cette vérification, vous pouvez ignorer
							cet email.
						</Text>
						<Text style={text}>
							Si le bouton ne fonctionne pas, vous pouvez également copier et
							coller le lien suivant dans votre navigateur :
						</Text>
						<Text style={link}>
							<Link href={verificationUrl}>{verificationUrl}</Link>
						</Text>
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
	backgroundColor: "#5469d4",
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

const link = {
	fontSize: "14px",
	color: "#333",
	wordBreak: "break-all" as const,
};

const footer = {
	color: "#666",
	fontSize: "14px",
	marginTop: "32px",
};
