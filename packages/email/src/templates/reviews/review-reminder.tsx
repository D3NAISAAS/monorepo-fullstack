// src/templates/reviews/review-reminder.tsx
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

interface ReviewReminderProps {
	username?: string;
	productName?: string;
	purchaseDate?: string;
	productImage?: string;
	reviewUrl?: string;
	companyName?: string;
	incentive?: string;
}

export default function ReviewReminderEmail({
	username = "Utilisateur",
	productName = "Notre Produit",
	purchaseDate = "15 juin 2025",
	productImage = "https://via.placeholder.com/300x150",
	reviewUrl = "https://example.com/review",
	companyName = "Mon SaaS",
	incentive = "10% de réduction sur votre prochain achat",
}: ReviewReminderProps) {
	return (
		<Html>
			<Head />
			<Preview>Partagez votre expérience avec {productName}</Preview>
			<Body style={main}>
				<Container style={container}>
					<Heading style={heading}>
						Comment trouvez-vous {productName} ?
					</Heading>
					<Section>
						<Text style={text}>Bonjour {username},</Text>
						<Text style={text}>
							Nous avons remarqué que vous utilisez {productName} depuis le{" "}
							{purchaseDate}. Nous espérons que vous en êtes satisfait !
						</Text>

						{productImage && (
							<Img
								src={productImage}
								alt={productName}
								width="100%"
								style={image}
							/>
						)}

						<Text style={text}>
							Votre avis est précieux pour nous et pour les autres utilisateurs.
							Pourriez-vous prendre quelques minutes pour partager votre
							expérience ?
						</Text>

						<Button style={button} href={reviewUrl}>
							Laisser un avis
						</Button>

						{incentive && (
							<>
								<Hr style={divider} />
								<Section style={incentiveSection}>
									<Text style={incentiveText}>
										<strong>Bonus :</strong> {incentive} après avoir laissé
										votre avis !
									</Text>
								</Section>
							</>
						)}

						<Text style={footer}>
							Merci pour votre confiance.
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
	marginTop: "24px",
	marginBottom: "24px",
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

const incentiveSection = {
	backgroundColor: "#f8f9ff",
	borderRadius: "5px",
	padding: "16px",
	border: "1px solid #e6ebf1",
};

const incentiveText = {
	fontSize: "16px",
	lineHeight: "1.4",
	color: "#484848",
	textAlign: "center" as const,
	margin: "0",
};
