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

interface PaymentSuccessProps {
	customerName: string;
	amount: number;
	currency: string;
	invoiceNumber: string;
	paymentDate: Date;
	paymentMethod: string;
	nextBillingDate?: Date;
	downloadUrl: string;
	dashboardUrl: string;
}

export const PaymentSuccessEmail = ({
	customerName = "Marie Dubois",
	amount = 299.99,
	currency = "EUR",
	invoiceNumber = "INV-2025-001",
	paymentDate = new Date(),
	paymentMethod = "Carte •••• 4242",
	nextBillingDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
	downloadUrl = "https://example.com/download",
	dashboardUrl = "https://example.com/dashboard",
}: PaymentSuccessProps) => {
	const formatCurrency = (value: number) =>
		new Intl.NumberFormat("fr-FR", { style: "currency", currency }).format(
			value
		);

	return (
		<Html>
			<Head />
			<Preview>
				✅ Paiement confirmé - {formatCurrency(amount)} reçu avec succès
			</Preview>
			<Body style={paymentBodyStyle}>
				<Container style={paymentContainerStyle}>
					{/* Success Header */}
					<Section style={successHeaderStyle}>
						<div style={checkmarkContainerStyle}>
							<div style={checkmarkCircleStyle}>
								<Text style={checkmarkStyle}>✓</Text>
							</div>
							<div style={successRingStyle} />
						</div>
						<Text style={successTitleStyle}>Paiement confirmé !</Text>
						<Text style={successSubtitleStyle}>
							Merci {customerName}, votre paiement a été traité avec succès
						</Text>
					</Section>

					{/* Payment Summary Card */}
					<Section style={summaryStyle}>
						<div style={summaryCardStyle}>
							<Text style={summaryTitleStyle}>
								💳 Récapitulatif du paiement
							</Text>

							{/* Amount Display */}
							<div style={amountDisplayStyle}>
								<Text style={amountStyle}>{formatCurrency(amount)}</Text>
								<Text style={amountLabelStyle}>Montant payé</Text>
							</div>

							{/* Payment Details Grid */}
							<div style={detailsGridStyle}>
								<Row style={detailRowStyle}>
									<Column style={detailLabelColStyle}>
										<Text style={detailLabelStyle}>Facture</Text>
									</Column>
									<Column style={detailValueColStyle}>
										<Text style={detailValueStyle}>#{invoiceNumber}</Text>
									</Column>
								</Row>

								<Row style={detailRowStyle}>
									<Column style={detailLabelColStyle}>
										<Text style={detailLabelStyle}>Date</Text>
									</Column>
									<Column style={detailValueColStyle}>
										<Text style={detailValueStyle}>
											{paymentDate.toLocaleDateString("fr-FR")}
										</Text>
									</Column>
								</Row>

								<Row style={detailRowStyle}>
									<Column style={detailLabelColStyle}>
										<Text style={detailLabelStyle}>Méthode</Text>
									</Column>
									<Column style={detailValueColStyle}>
										<Text style={detailValueStyle}>{paymentMethod}</Text>
									</Column>
								</Row>

								{nextBillingDate && (
									<Row style={detailRowStyle}>
										<Column style={detailLabelColStyle}>
											<Text style={detailLabelStyle}>
												Prochaine facturation
											</Text>
										</Column>
										<Column style={detailValueColStyle}>
											<Text style={detailValueStyle}>
												{nextBillingDate.toLocaleDateString("fr-FR")}
											</Text>
										</Column>
									</Row>
								)}
							</div>
						</div>
					</Section>

					{/* Action Buttons */}
					<Section style={actionsStyle}>
						<Text style={actionsTitleStyle}>📄 Actions disponibles</Text>
						<Row>
							<Column style={actionColStyle}>
								<Button href={downloadUrl} style={downloadButtonStyle}>
									<span style={buttonIconStyle}>⬇️</span>
									Télécharger la facture
								</Button>
							</Column>
							<Column style={actionColStyle}>
								<Button href={dashboardUrl} style={dashboardButtonStyle}>
									<span style={buttonIconStyle}>📊</span>
									Voir le dashboard
								</Button>
							</Column>
						</Row>
					</Section>

					{/* Next Steps */}
					<Section style={nextStepsStyle}>
						<div style={nextStepsCardStyle}>
							<Text style={nextStepsTitleStyle}>🚀 Et maintenant ?</Text>
							<div style={stepListStyle}>
								<div style={stepItemStyle}>
									<Text style={stepNumberStyle}>1</Text>
									<Text style={stepTextStyle}>
										Votre service reste actif et toutes les fonctionnalités sont
										disponibles
									</Text>
								</div>
								<div style={stepItemStyle}>
									<Text style={stepNumberStyle}>2</Text>
									<Text style={stepTextStyle}>
										Vous recevrez un rappel avant le prochain renouvellement
									</Text>
								</div>
								<div style={stepItemStyle}>
									<Text style={stepNumberStyle}>3</Text>
									<Text style={stepTextStyle}>
										Consultez vos statistiques d'usage dans votre dashboard
									</Text>
								</div>
							</div>
						</div>
					</Section>

					{/* Support */}
					<Hr style={paymentSeparatorStyle} />
					<Section style={supportStyle}>
						<Text style={supportTitleStyle}>💬 Besoin d'aide ?</Text>
						<Text style={supportTextStyle}>
							Notre équipe support est disponible 24/7 pour répondre à vos
							questions.
						</Text>
						<Row>
							<Column style={supportColStyle}>
								<Text style={supportMethodStyle}>📧 support@example.com</Text>
							</Column>
							<Column style={supportColStyle}>
								<Text style={supportMethodStyle}>💬 Chat en direct</Text>
							</Column>
						</Row>
					</Section>
				</Container>
			</Body>
		</Html>
	);
};

// Payment Success Styles
const paymentBodyStyle = {
	backgroundColor: "#ecfdf5",
	fontFamily:
		'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
	padding: "40px 0",
};

const paymentContainerStyle = {
	backgroundColor: "#ffffff",
	margin: "0 auto",
	maxWidth: "600px",
	borderRadius: "20px",
	overflow: "hidden",
	boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.1)",
};

const successHeaderStyle = {
	background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
	padding: "60px 32px 40px",
	textAlign: "center" as const,
	position: "relative" as const,
};

const checkmarkContainerStyle = {
	position: "relative" as const,
	display: "inline-block",
	marginBottom: "24px",
};

const checkmarkCircleStyle = {
	width: "80px",
	height: "80px",
	backgroundColor: "#ffffff",
	borderRadius: "50%",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	margin: "0 auto",
	position: "relative" as const,
	zIndex: 2,
};

const checkmarkStyle = {
	fontSize: "40px",
	color: "#10b981",
	fontWeight: "700",
	margin: "0",
};

const successRingStyle = {
	position: "absolute" as const,
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: "100px",
	height: "100px",
	border: "3px solid rgba(255, 255, 255, 0.3)",
	borderRadius: "50%",
	animation: "pulse 2s infinite",
};

const successTitleStyle = {
	color: "#ffffff",
	fontSize: "32px",
	fontWeight: "800",
	margin: "0 0 12px 0",
};

const successSubtitleStyle = {
	color: "rgba(255, 255, 255, 0.9)",
	fontSize: "16px",
	margin: "0",
	lineHeight: "1.5",
};

const summaryStyle = {
	padding: "40px 32px",
	backgroundColor: "#ffffff",
};

const summaryCardStyle = {
	backgroundColor: "#f8fafc",
	border: "1px solid #e2e8f0",
	borderRadius: "16px",
	padding: "32px",
};

const summaryTitleStyle = {
	fontSize: "20px",
	fontWeight: "700",
	color: "#1e293b",
	margin: "0 0 24px 0",
	textAlign: "center" as const,
};

const amountDisplayStyle = {
	textAlign: "center" as const,
	marginBottom: "32px",
	padding: "24px",
	backgroundColor: "#ffffff",
	borderRadius: "12px",
	border: "2px solid #10b981",
};

const amountStyle = {
	fontSize: "48px",
	fontWeight: "900",
	color: "#10b981",
	margin: "0 0 8px 0",
	display: "block",
};

const amountLabelStyle = {
	fontSize: "14px",
	color: "#64748b",
	fontWeight: "500",
	margin: "0",
};

const detailsGridStyle = {
	backgroundColor: "#ffffff",
	borderRadius: "8px",
	padding: "20px",
};

const detailRowStyle = {
	marginBottom: "12px",
};

const detailLabelColStyle = {
	width: "40%",
};

const detailValueColStyle = {
	width: "60%",
	textAlign: "right" as const,
};

const detailLabelStyle = {
	fontSize: "14px",
	color: "#64748b",
	fontWeight: "500",
	margin: "0",
};

const detailValueStyle = {
	fontSize: "14px",
	color: "#1e293b",
	fontWeight: "600",
	margin: "0",
};

const actionsStyle = {
	padding: "0 32px 32px",
	backgroundColor: "#ffffff",
};

const actionsTitleStyle = {
	fontSize: "18px",
	fontWeight: "600",
	color: "#1e293b",
	margin: "0 0 20px 0",
	textAlign: "center" as const,
};

const actionColStyle = {
	width: "50%",
	padding: "0 8px",
};

const downloadButtonStyle = {
	background: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
	borderRadius: "12px",
	color: "#ffffff",
	fontSize: "14px",
	fontWeight: "600",
	textDecoration: "none",
	padding: "16px 20px",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	gap: "8px",
	width: "100%",
};

const dashboardButtonStyle = {
	backgroundColor: "#ffffff",
	border: "2px solid #e2e8f0",
	borderRadius: "12px",
	color: "#475569",
	fontSize: "14px",
	fontWeight: "600",
	textDecoration: "none",
	padding: "14px 20px",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	gap: "8px",
	width: "100%",
};

const buttonIconStyle = {
	fontSize: "16px",
};

const nextStepsStyle = {
	padding: "0 32px 32px",
	backgroundColor: "#ffffff",
};

const nextStepsCardStyle = {
	backgroundColor: "#f1f5f9",
	border: "1px solid #cbd5e1",
	borderRadius: "12px",
	padding: "24px",
};

const nextStepsTitleStyle = {
	fontSize: "18px",
	fontWeight: "600",
	color: "#334155",
	margin: "0 0 20px 0",
};

const stepListStyle = {
	display: "flex",
	flexDirection: "column" as const,
	gap: "16px",
};

const stepItemStyle = {
	display: "flex",
	alignItems: "flex-start",
	gap: "12px",
};

const stepNumberStyle = {
	width: "24px",
	height: "24px",
	backgroundColor: "#10b981",
	color: "#ffffff",
	borderRadius: "50%",
	fontSize: "12px",
	fontWeight: "700",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	flexShrink: 0,
	margin: "0",
};

const stepTextStyle = {
	fontSize: "14px",
	color: "#475569",
	lineHeight: "1.5",
	margin: "0",
};

const paymentSeparatorStyle = {
	border: "none",
	borderTop: "1px solid #e2e8f0",
	margin: "0",
};

const supportStyle = {
	padding: "32px",
	textAlign: "center" as const,
	backgroundColor: "#f8fafc",
};

const supportTitleStyle = {
	fontSize: "18px",
	fontWeight: "600",
	color: "#1e293b",
	margin: "0 0 12px 0",
};

const supportTextStyle = {
	fontSize: "14px",
	color: "#64748b",
	margin: "0 0 20px 0",
	lineHeight: "1.5",
};

const supportColStyle = {
	width: "50%",
};

const supportMethodStyle = {
	fontSize: "14px",
	color: "#3b82f6",
	fontWeight: "600",
	margin: "0",
};

export default PaymentSuccessEmail;
