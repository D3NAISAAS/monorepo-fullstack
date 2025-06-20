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

interface PaymentFailedProps {
	username?: string;
	invoiceNumber?: string;
	invoiceAmount?: string;
	invoiceDate?: string;
	paymentMethod?: string;
	errorMessage?: string;
	retryUrl?: string;
	companyName?: string;
}

export default function PaymentFailedEmail({
	username = "Utilisateur",
	invoiceNumber = "INV-2025-001",
	invoiceAmount = "99,99 €",
	invoiceDate = "20/06/2025",
	paymentMethod = "Carte bancaire",
	errorMessage = "Transaction refusée par votre banque",
	retryUrl = "https://example.com/retry-payment",
	companyName = "Mon SaaS",
}: PaymentFailedProps) {
	return (
		<Html>
			<Head />
			<Preview>Échec de paiement pour {companyName}</Preview>
			<Body style={main}>
				<Container style={container}>
					<Heading style={heading}>Échec de paiement</Heading>
					<Section>
						<Text style={text}>Bonjour {username},</Text>
						<Text style={text}>
							Nous n'avons pas pu traiter votre paiement récent. Voici les
							détails :
						</Text>
						<Text style={text}>
							<strong>Numéro de facture :</strong> {invoiceNumber}
							<br />
							<strong>Montant :</strong> {invoiceAmount}
							<br />
							<strong>Date :</strong> {invoiceDate}
							<br />
							<strong>Méthode de paiement :</strong> {paymentMethod}
							<br />
							<strong>Raison de l'échec :</strong> {errorMessage}
						</Text>
						<Button style={button} href={retryUrl}>
							Réessayer le paiement
						</Button>
						<Text style={text}>
							Si vous continuez à rencontrer des problèmes, n'hésitez pas à
							contacter notre service client.
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

const footer = {
	color: "#666",
	fontSize: "14px",
	marginTop: "32px",
};
