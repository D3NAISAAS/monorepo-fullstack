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

interface SubscriptionRenewalProps {
	username?: string;
	planName?: string;
	renewalDate?: string;
	renewalAmount?: string;
	paymentMethod?: string;
	accountUrl?: string;
	companyName?: string;
}

export default function SubscriptionRenewalEmail({
	username = "Utilisateur",
	planName = "Plan Premium",
	renewalDate = "20/07/2025",
	renewalAmount = "99,99 €",
	paymentMethod = "Carte bancaire",
	accountUrl = "https://example.com/account",
	companyName = "Mon SaaS",
}: SubscriptionRenewalProps) {
	return (
		<Html>
			<Head />
			<Preview>Renouvellement d'abonnement pour {companyName}</Preview>
			<Body style={main}>
				<Container style={container}>
					<Heading style={heading}>Renouvellement d'abonnement</Heading>
					<Section>
						<Text style={text}>Bonjour {username},</Text>
						<Text style={text}>
							Nous vous informons que votre abonnement {planName} sera
							automatiquement renouvelé le {renewalDate}.
						</Text>
						<Text style={text}>
							<strong>Détails du renouvellement :</strong>
							<br />
							<strong>Plan :</strong> {planName}
							<br />
							<strong>Montant :</strong> {renewalAmount}
							<br />
							<strong>Date de renouvellement :</strong> {renewalDate}
							<br />
							<strong>Méthode de paiement :</strong> {paymentMethod}
						</Text>
						<Text style={text}>
							Si vous souhaitez modifier votre abonnement ou mettre à jour vos
							informations de paiement, veuillez vous rendre sur votre page de
							compte avant la date de renouvellement.
						</Text>
						<Button style={button} href={accountUrl}>
							Gérer mon abonnement
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
