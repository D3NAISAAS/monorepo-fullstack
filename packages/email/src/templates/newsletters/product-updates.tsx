// src/templates/newsletters/product-updates.tsx
import {
	Body,
	Button,
	Container,
	Head,
	Heading,
	Hr,
	Html,
	Img,
	Preview,
	Section,
	Text,
} from "@react-email/components";

interface ProductUpdatesProps {
	username?: string;
	productName?: string;
	version?: string;
	releaseDate?: string;
	updates?: Array<{
		type: "feature" | "improvement" | "bugfix";
		title: string;
		description: string;
		imageUrl?: string;
	}>;
	docsUrl?: string;
	companyName?: string;
}

export default function ProductUpdatesEmail({
	username = "Utilisateur",
	productName = "Notre Produit",
	version = "2.5.0",
	releaseDate = "20 juin 2025",
	updates = [
		{
			type: "feature",
			title: "Nouvelle fonctionnalité",
			description: "Description détaillée de la nouvelle fonctionnalité",
		},
		{
			type: "improvement",
			title: "Amélioration",
			description: "Description de l'amélioration apportée",
		},
		{
			type: "bugfix",
			title: "Correction de bug",
			description: "Description du bug corrigé",
		},
	],
	docsUrl = "https://example.com/docs",
	companyName = "Mon SaaS",
}: ProductUpdatesProps) {
	// Icônes pour les différents types de mises à jour
	const typeIcons = {
		feature: "✨",
		improvement: "🚀",
		bugfix: "🐛",
	};

	return (
		<Html>
			<Head />
			<Preview>
				{productName} v{version} - Nouvelles mises à jour disponibles
			</Preview>
			<Body style={main}>
				<Container style={container}>
					<Heading style={heading}>
						{productName} v{version}
					</Heading>
					<Text style={subheading}>Nouvelles mises à jour disponibles</Text>
					<Text style={releaseInfo}>Date de sortie : {releaseDate}</Text>

					<Section>
						<Text style={text}>Bonjour {username},</Text>
						<Text style={text}>
							Nous sommes ravis de vous annoncer la sortie de la version{" "}
							<strong>{version}</strong> de {productName}. Cette mise à jour
							apporte plusieurs améliorations et nouvelles fonctionnalités pour
							améliorer votre expérience.
						</Text>

						<Hr style={divider} />

						{updates.map((update) => (
							<Section key={update.title} style={updateSection}>
								<Text style={updateType}>
									{typeIcons[update.type]}{" "}
									{update.type === "feature"
										? "Nouvelle fonctionnalité"
										: update.type === "improvement"
											? "Amélioration"
											: "Correction de bug"}
								</Text>
								<Heading as="h2" style={updateTitle}>
									{update.title}
								</Heading>
								<Text style={text}>{update.description}</Text>
								{update.imageUrl && (
									<Img
										src={update.imageUrl}
										alt={update.title}
										width="100%"
										style={image}
									/>
								)}
							</Section>
						))}

						<Button style={button} href={docsUrl}>
							Consulter la documentation
						</Button>

						<Text style={footer}>
							Nous espérons que ces mises à jour vous seront utiles. N'hésitez
							pas à nous faire part de vos retours !
							<br />
							<br />
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
		'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
};

const container = {
	backgroundColor: "#ffffff",
	margin: "0 auto",
	padding: "20px 0 48px",
	marginBottom: "64px",
	borderRadius: "5px",
	boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
};

const heading = {
	fontSize: "32px",
	lineHeight: "1.3",
	fontWeight: "700",
	color: "#484848",
	padding: "17px 0 0",
	textAlign: "center" as const,
};

const subheading = {
	fontSize: "20px",
	lineHeight: "1.3",
	fontWeight: "500",
	color: "#687087",
	padding: "0",
	margin: "0",
	textAlign: "center" as const,
};

const releaseInfo = {
	fontSize: "16px",
	color: "#687087",
	textAlign: "center" as const,
	marginBottom: "24px",
};

const text = {
	fontSize: "16px",
	lineHeight: "1.4",
	color: "#484848",
	padding: "5px 0",
};

const updateSection = {
	padding: "16px 0",
};

const updateType = {
	fontSize: "14px",
	fontWeight: "bold",
	color: "#687087",
	textTransform: "uppercase" as const,
	letterSpacing: "1px",
};

const updateTitle = {
	fontSize: "20px",
	lineHeight: "1.3",
	fontWeight: "600",
	color: "#484848",
	padding: "8px 0",
	margin: "0",
};

const button = {
	backgroundColor: "#5e6ad2",
	borderRadius: "5px",
	color: "#fff",
	fontSize: "16px",
	fontWeight: "bold",
	textDecoration: "none",
	textAlign: "center" as const,
	display: "block",
	padding: "12px",
	marginTop: "32px",
};

const footer = {
	fontSize: "14px",
	lineHeight: "1.5",
	color: "#9ca299",
	padding: "48px 0 0",
};

const divider = {
	borderTop: "1px solid #e6ebf1",
	margin: "24px 0",
};

const image = {
	borderRadius: "4px",
	marginTop: "16px",
	marginBottom: "16px",
};
