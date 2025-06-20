// src/templates/newsletters/monthly-newsletter.tsx
import {
	Body,
	Button,
	Container,
	Head,
	Heading,
	Html,
	Img,
	Preview,
	Section,
	Text,
} from "@react-email/components";

interface MonthlyNewsletterProps {
	username?: string;
	month?: string;
	year?: string;
	highlights?: Array<{
		title: string;
		description: string;
		imageUrl?: string;
	}>;
	upcomingFeatures?: string[];
	ctaUrl?: string;
	companyName?: string;
}

export default function MonthlyNewsletterEmail({
	username = "Utilisateur",
	month = "Juin",
	year = "2025",
	highlights = [
		{
			title: "Nouvelle fonctionnalité",
			description: "Description de la nouvelle fonctionnalité",
			imageUrl: "https://via.placeholder.com/300x150",
		},
	],
	upcomingFeatures = ["Fonctionnalité à venir 1", "Fonctionnalité à venir 2"],
	ctaUrl = "https://example.com/newsletter",
	companyName = "Mon SaaS",
}: MonthlyNewsletterProps) {
	return (
		<Html>
			<Head />
			<Preview>
				Newsletter {month} {year} - {companyName}
			</Preview>
			<Body style={main}>
				<Container style={container}>
					<Heading style={heading}>
						Newsletter {month} {year}
					</Heading>
					<Section>
						<Text style={text}>Bonjour {username},</Text>
						<Text style={text}>
							Voici les dernières actualités et mises à jour de {companyName}{" "}
							pour le mois de {month} {year}.
						</Text>

						{highlights.map((highlight) => (
							<Section key={highlight.title} style={highlightSection}>
								<Heading as="h2" style={subheading}>
									{highlight.title}
								</Heading>
								{highlight.imageUrl && (
									<Img
										src={highlight.imageUrl}
										alt={highlight.title}
										width="100%"
										style={image}
									/>
								)}
								<Text style={text}>{highlight.description}</Text>
							</Section>
						))}

						{upcomingFeatures.length > 0 && (
							<Section>
								<Heading as="h2" style={subheading}>
									À venir prochainement
								</Heading>
								<ul>
									{upcomingFeatures.map((feature) => (
										<li key={feature} style={text}>
											{feature}
										</li>
									))}
								</ul>
							</Section>
						)}

						<Button style={button} href={ctaUrl}>
							En savoir plus
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
	fontSize: "24px",
	lineHeight: "1.3",
	fontWeight: "700",
	color: "#484848",
	padding: "0",
};

const text = {
	fontSize: "16px",
	lineHeight: "1.4",
	color: "#484848",
	padding: "5px 0",
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
	marginTop: "16px",
};

const footer = {
	fontSize: "14px",
	lineHeight: "1.5",
	color: "#9ca299",
	padding: "48px 0 0",
};

const highlightSection = {
	padding: "24px 0",
	borderTop: "1px solid #e6ebf1",
};

const image = {
	borderRadius: "4px",
	marginBottom: "16px",
};
