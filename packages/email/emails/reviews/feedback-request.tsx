import { FeedbackRequestEmail } from "../../src/templates/reviews/feedback-request";

export default function FeedbackRequestPreview() {
	return (
		<FeedbackRequestEmail
			customerName="Sarah Martin"
			productName="Stellar SaaS Premium"
			purchaseDate={new Date(Date.now() - 14 * 24 * 60 * 60 * 1000)}
			reviewUrl="https://stellar-saas.com/review?product=premium"
			incentive={{
				type: "discount",
				value: "15%",
				description: "sur votre prochain renouvellement",
			}}
		/>
	);
}
