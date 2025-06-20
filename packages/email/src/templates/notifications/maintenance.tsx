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

interface MaintenanceProps {
	username?: string;
	maintenanceDate?: string;
	maintenanceDuration?: string;
	impactedServices?: string[];
	moreInfoUrl?: string;
	companyName?: string;
}

export default function MaintenanceEmail({
	username = "Utilisateur",
	maintenanceDate = "15 juillet 2025 de 2h à 4h (UTC+2)",
	maintenanceDuration = "environ 2 heures",
	impactedServices = ["Authentification", "Paiements", "API"],
	moreInfoUrl = "https://example.com/status",
	companyName = "Mon SaaS",
}: MaintenanceProps) {
	return (
		<Html>
			<Head />
			<Preview>Maintenance planifiée pour {companyName}</Preview>
			<Body style={main}>
				<Container style={container}>
					<Heading style={heading}>Maintenance planifiée</Heading>
					<Section>
						<Text style={text}>Bonjour {username},</Text>
						<Text style={text}>
							Nous vous informons qu'une maintenance planifiée aura lieu le{" "}
							{maintenanceDate}. Cette opération durera {maintenanceDuration} et
							pourrait entraîner une indisponibilité temporaire de certains
							services.
						</Text>
						<Text style={text}>
							<strong>Services impactés :</strong>
						</Text>
						<ul>
							{impactedServices.map((service, index) => (
								<li key={index.toString()} style={text}>
									{service}
								</li>
							))}
						</ul>
						<Text style={text}>
							Nous nous excusons pour la gêne occasionnée et vous remercions de
							votre compréhension.
						</Text>
						<Button style={button} href={moreInfoUrl}>
							Plus d'informations
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
