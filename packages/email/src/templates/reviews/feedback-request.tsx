import {
	Body,
	Button,
	Column,
	Container,
	Head,
	Hr,
	Html,
	Preview,
	Row,
	Section,
	Text,
} from "@react-email/components";

interface FeedbackRequestProps {
	customerName: string;
	productName: string;
	purchaseDate: Date;
	reviewUrl: string;
	incentive?: {
		type: "discount" | "points" | "gift";
		value: string;
		description: string;
	};
}

export const FeedbackRequestEmail = ({
	customerName = "Sarah Martin",
	productName = "Premium Dashboard Pro",
	purchaseDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
	reviewUrl = "https://example.com/review",
	incentive = {
		type: "discount",
		value: "10%",
		description: "sur votre prochain achat",
	},
}: FeedbackRequestProps) => (
	<Html>
		<Head />
		<Preview>
			⭐ Votre avis compte ! Partagez votre expérience avec {productName}
		</Preview>
		<Body style={feedbackBodyStyle}>
			<Container style={feedbackContainerStyle}>
				{/* Header with Stars */}
				<Section style={starsHeaderStyle}>
					<div style={starsContainerStyle}>
						{[1, 2, 3, 4, 5].map((star) => (
							<Text key={star} style={starStyle}>
								⭐
							</Text>
						))}
					</div>
					<Text style={starsHeaderTitleStyle}>Votre avis nous intéresse !</Text>
					<Text style={starsHeaderSubtitleStyle}>
						Quelques secondes pour nous aider à nous améliorer
					</Text>
				</Section>

				{/* Personal Message */}
				<Section style={personalStyle}>
					<Text style={personalGreetingStyle}>Bonjour {customerName} ! 👋</Text>
					<Text style={personalMessageStyle}>
						Cela fait maintenant{" "}
						{Math.floor(
							(Date.now() - purchaseDate.getTime()) / (1000 * 60 * 60 * 24)
						)}{" "}
						jours que vous utilisez <strong>{productName}</strong>. Nous
						espérons que votre expérience a été à la hauteur de vos attentes !
					</Text>
				</Section>

				{/* Product Showcase */}
				<Section style={productShowcaseStyle}>
					<div style={productCardStyle}>
						<Row>
							<Column style={productImageColStyle}>
								<div style={productImageStyle}>
									<Text style={productEmojiStyle}>📊</Text>
								</div>
							</Column>
							<Column style={productInfoColStyle}>
								<Text style={productNameStyle}>{productName}</Text>
								<Text style={productDateStyle}>
									Activé le {purchaseDate.toLocaleDateString("fr-FR")}
								</Text>
								<div style={productStatusStyle}>
									<Text style={statusBadgeStyle}>✅ Actif</Text>
								</div>
							</Column>
						</Row>
					</div>
				</Section>

				{/* Quick Rating */}
				<Section style={quickRatingStyle}>
					<Text style={quickRatingTitleStyle}>⚡ Évaluation express</Text>
					<Text style={quickRatingSubStyle}>
						Cliquez sur le nombre d'étoiles qui correspond à votre satisfaction
						:
					</Text>

					<div style={ratingButtonsStyle}>
						{[1, 2, 3, 4, 5].map((rating) => (
							<Button
								key={rating}
								href={`${reviewUrl}?rating=${rating}`}
								style={ratingButtonStyle}
							>
								<div style={ratingButtonContentStyle}>
									<Text style={ratingNumberStyle}>{rating}</Text>
									<Text style={ratingStarsStyle}>{"⭐".repeat(rating)}</Text>
								</div>
							</Button>
						))}
					</div>
				</Section>

				{/* Incentive Section */}
				{incentive && (
					<Section style={incentiveStyle}>
						<div style={incentiveCardStyle}>
							<Text style={incentiveIconStyle}>🎁</Text>
							<Text style={incentiveTitleStyle}>Bonus exclusif !</Text>
							<Text style={incentiveDescStyle}>
								Laissez un avis détaillé et recevez{" "}
								<strong>
									{incentive.value} {incentive.description}
								</strong>
							</Text>
							<Button href={reviewUrl} style={incentiveButtonStyle}>
								Laisser un avis détaillé
							</Button>
						</div>
					</Section>
				)}

				{/* Social Proof */}
				<Section style={socialProofStyle}>
					<Text style={socialProofTitleStyle}>
						💬 Rejoignez nos utilisateurs satisfaits
					</Text>
					<div style={testimonialsStyle}>
						<div style={testimonialStyle}>
							<Text style={testimonialTextStyle}>
								"Interface intuitive et fonctionnalités avancées. Exactement ce
								que je cherchais !"
							</Text>
							<Text style={testimonialAuthorStyle}>— Claire B. ⭐⭐⭐⭐⭐</Text>
						</div>
						<div style={testimonialStyle}>
							<Text style={testimonialTextStyle}>
								"Support client exceptionnel et produit de qualité. Je
								recommande vivement."
							</Text>
							<Text style={testimonialAuthorStyle}>— Marc L. ⭐⭐⭐⭐⭐</Text>
						</div>
					</div>
				</Section>

				{/* Alternative Actions */}
				<Section style={alternativeStyle}>
					<Text style={alternativeTitleStyle}>
						🤔 Pas entièrement satisfait ?
					</Text>
					<Text style={alternativeTextStyle}>
						Votre feedback est précieux. Dites-nous comment nous pouvons nous
						améliorer.
					</Text>
					<Row>
						<Column style={altActionColStyle}>
							<Button
								href="mailto:support@example.com"
								style={supportButtonStyle}
							>
								💬 Contacter le support
							</Button>
						</Column>
						<Column style={altActionColStyle}>
							<Button
								href="https://example.com/suggestions"
								style={suggestButtonStyle}
							>
								💡 Suggérer une amélioration
							</Button>
						</Column>
					</Row>
				</Section>

				{/* Footer */}
				<Hr style={feedbackSeparatorStyle} />
				<Section style={feedbackFooterStyle}>
					<Text style={footerThankStyle}>
						Merci de nous aider à créer la meilleure expérience possible ! 🚀
					</Text>
					<Text style={footerDisclaimerStyle}>
						Cet avis sera public et nous aidera à améliorer nos services pour
						tous.
					</Text>
				</Section>
			</Container>
		</Body>
	</Html>
);

// Feedback Styles
const feedbackBodyStyle = {
	backgroundColor: "#fef7cd",
	fontFamily:
		'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
	padding: "40px 0",
};

const feedbackContainerStyle = {
	backgroundColor: "#ffffff",
	margin: "0 auto",
	maxWidth: "600px",
	borderRadius: "20px",
	overflow: "hidden",
	boxShadow: "0 20px 25px rgba(251, 191, 36, 0.15)",
};

const starsHeaderStyle = {
	background: "linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)",
	padding: "50px 32px",
	textAlign: "center" as const,
};

const starsContainerStyle = {
	display: "flex",
	justifyContent: "center",
	gap: "4px",
	marginBottom: "20px",
};

const starStyle = {
	fontSize: "28px",
	margin: "0",
	animation: "twinkle 2s infinite alternate",
};

const starsHeaderTitleStyle = {
	color: "#ffffff",
	fontSize: "32px",
	fontWeight: "800",
	margin: "0 0 12px 0",
	textShadow: "0 2px 4px rgba(0,0,0,0.2)",
};

const starsHeaderSubtitleStyle = {
	color: "rgba(255, 255, 255, 0.9)",
	fontSize: "16px",
	margin: "0",
};

const personalStyle = {
	padding: "40px 32px 32px",
	backgroundColor: "#ffffff",
};

const personalGreetingStyle = {
	fontSize: "24px",
	fontWeight: "600",
	color: "#111827",
	margin: "0 0 16px 0",
};

const personalMessageStyle = {
	fontSize: "16px",
	color: "#6b7280",
	lineHeight: "1.6",
	margin: "0",
};

const productShowcaseStyle = {
	padding: "0 32px 32px",
	backgroundColor: "#ffffff",
};

const productCardStyle = {
	backgroundColor: "#f9fafb",
	border: "1px solid #e5e7eb",
	borderRadius: "12px",
	padding: "20px",
};

const productImageColStyle = {
	width: "80px",
	verticalAlign: "middle" as const,
};

const productImageStyle = {
	width: "60px",
	height: "60px",
	backgroundColor: "#fbbf24",
	borderRadius: "12px",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
};

const productEmojiStyle = {
	fontSize: "24px",
	margin: "0",
};

const productInfoColStyle = {
	paddingLeft: "16px",
	verticalAlign: "middle" as const,
};

const productNameStyle = {
	fontSize: "18px",
	fontWeight: "600",
	color: "#111827",
	margin: "0 0 4px 0",
};

const productDateStyle = {
	fontSize: "14px",
	color: "#6b7280",
	margin: "0 0 8px 0",
};

const productStatusStyle = {
	display: "inline-block",
};

const statusBadgeStyle = {
	fontSize: "12px",
	backgroundColor: "#d1fae5",
	color: "#065f46",
	padding: "4px 8px",
	borderRadius: "6px",
	fontWeight: "600",
	margin: "0",
};

const quickRatingStyle = {
	padding: "0 32px 32px",
	backgroundColor: "#ffffff",
};

const quickRatingTitleStyle = {
	fontSize: "20px",
	fontWeight: "700",
	color: "#111827",
	margin: "0 0 8px 0",
	textAlign: "center" as const,
};

const quickRatingSubStyle = {
	fontSize: "14px",
	color: "#6b7280",
	margin: "0 0 24px 0",
	textAlign: "center" as const,
};

const ratingButtonsStyle = {
	display: "flex",
	justifyContent: "space-between",
	gap: "8px",
};

const ratingButtonStyle = {
	backgroundColor: "#ffffff",
	border: "2px solid #e5e7eb",
	borderRadius: "12px",
	padding: "16px 8px",
	textDecoration: "none",
	flex: 1,
	textAlign: "center" as const,
	transition: "all 0.2s ease",
};

const ratingButtonContentStyle = {
	display: "flex",
	flexDirection: "column" as const,
	alignItems: "center",
	gap: "4px",
};

const ratingNumberStyle = {
	fontSize: "18px",
	fontWeight: "700",
	color: "#374151",
	margin: "0",
};

const ratingStarsStyle = {
	fontSize: "12px",
	margin: "0",
};

const incentiveStyle = {
	padding: "0 32px 32px",
	backgroundColor: "#ffffff",
};

const incentiveCardStyle = {
	background: "linear-gradient(135deg, #a855f7 0%, #7c3aed 100%)",
	borderRadius: "16px",
	padding: "32px",
	textAlign: "center" as const,
	color: "#ffffff",
};

const incentiveIconStyle = {
	fontSize: "48px",
	margin: "0 0 16px 0",
	display: "block",
};

const incentiveTitleStyle = {
	fontSize: "24px",
	fontWeight: "700",
	margin: "0 0 12px 0",
};

const incentiveDescStyle = {
	fontSize: "16px",
	margin: "0 0 24px 0",
	opacity: 0.9,
	lineHeight: "1.5",
};

const incentiveButtonStyle = {
	backgroundColor: "#ffffff",
	color: "#7c3aed",
	fontSize: "16px",
	fontWeight: "600",
	textDecoration: "none",
	padding: "14px 28px",
	borderRadius: "10px",
	display: "inline-block",
};

const socialProofStyle = {
	padding: "0 32px 32px",
	backgroundColor: "#f8fafc",
};

const socialProofTitleStyle = {
	fontSize: "20px",
	fontWeight: "600",
	color: "#111827",
	margin: "0 0 24px 0",
	textAlign: "center" as const,
};

const testimonialsStyle = {
	display: "flex",
	flexDirection: "column" as const,
	gap: "16px",
};

const testimonialStyle = {
	backgroundColor: "#ffffff",
	border: "1px solid #e5e7eb",
	borderRadius: "12px",
	padding: "20px",
};

const testimonialTextStyle = {
	fontSize: "14px",
	color: "#374151",
	fontStyle: "italic",
	lineHeight: "1.5",
	margin: "0 0 12px 0",
};

const testimonialAuthorStyle = {
	fontSize: "12px",
	color: "#6b7280",
	fontWeight: "600",
	margin: "0",
};

const alternativeStyle = {
	padding: "32px",
	backgroundColor: "#f8fafc",
	textAlign: "center" as const,
};

const alternativeTitleStyle = {
	fontSize: "18px",
	fontWeight: "600",
	color: "#111827",
	margin: "0 0 12px 0",
};

const alternativeTextStyle = {
	fontSize: "14px",
	color: "#6b7280",
	margin: "0 0 24px 0",
	lineHeight: "1.5",
};

const altActionColStyle = {
	width: "50%",
	padding: "0 8px",
};

const supportButtonStyle = {
	backgroundColor: "#3b82f6",
	color: "#ffffff",
	fontSize: "14px",
	fontWeight: "600",
	textDecoration: "none",
	padding: "12px 20px",
	borderRadius: "8px",
	display: "inline-block",
	width: "100%",
};

const suggestButtonStyle = {
	backgroundColor: "#ffffff",
	border: "2px solid #e5e7eb",
	color: "#374151",
	fontSize: "14px",
	fontWeight: "600",
	textDecoration: "none",
	padding: "10px 20px",
	borderRadius: "8px",
	display: "inline-block",
	width: "100%",
};

const feedbackSeparatorStyle = {
	border: "none",
	borderTop: "1px solid #e5e7eb",
	margin: "0",
};

const feedbackFooterStyle = {
	padding: "32px",
	textAlign: "center" as const,
	backgroundColor: "#ffffff",
};

const footerThankStyle = {
	fontSize: "16px",
	fontWeight: "600",
	color: "#111827",
	margin: "0 0 12px 0",
};

const footerDisclaimerStyle = {
	fontSize: "12px",
	color: "#9ca3af",
	margin: "0",
};

export default FeedbackRequestEmail;
