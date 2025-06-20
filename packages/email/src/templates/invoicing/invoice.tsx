// src/templates/invoicing/invoice.tsx
import {
	Body,
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
import * as React from "react";

interface InvoiceEmailProps {
	invoiceNumber: string;
	customerName: string;
	amount: number;
	currency: string;
	dueDate: Date;
	items: Array<{
		description: string;
		quantity: number;
		unitPrice: number;
		total: number;
	}>;
	companyInfo: {
		name: string;
		address: string;
		email: string;
		website: string;
	};
}

export const InvoiceEmail = ({
	invoiceNumber,
	customerName,
	amount,
	currency = "EUR",
	dueDate,
	items,
	companyInfo,
}: InvoiceEmailProps) => {
	const formatCurrency = (value: number) =>
		new Intl.NumberFormat("fr-FR", {
			style: "currency",
			currency,
		}).format(value);

	return (
		<Html lang="fr">
			<Head />
			<Preview>
				Facture {invoiceNumber} - {formatCurrency(amount)}
			</Preview>
			<Body style={bodyStyle}>
				<Container style={containerStyle}>
					{/* Header */}
					<Section style={headerStyle}>
						<Row>
							<Column style={companyColumnStyle}>
								<Text style={companyNameStyle}>{companyInfo.name}</Text>
								<Text style={companyDetailsStyle}>
									{companyInfo.address}
									<br />
									{companyInfo.email}
									<br />
									{companyInfo.website}
								</Text>
							</Column>
							<Column style={invoiceColumnStyle}>
								<Text style={invoiceNumberStyle}>FACTURE #{invoiceNumber}</Text>
								<Text style={dueDateStyle}>
									Échéance : {dueDate.toLocaleDateString("fr-FR")}
								</Text>
							</Column>
						</Row>
					</Section>

					<Hr style={hrStyle} />

					{/* Customer */}
					<Section style={customerSectionStyle}>
						<Text style={labelStyle}>Facturé à :</Text>
						<Text style={customerNameStyle}>{customerName}</Text>
					</Section>

					{/* Items */}
					<Section style={itemsSectionStyle}>
						<Text style={itemsHeaderStyle}>Détail de la facturation</Text>

						{/* Table Header */}
						<Row style={tableHeaderStyle}>
							<Column style={descColumnStyle}>
								<Text style={tableHeaderTextStyle}>Description</Text>
							</Column>
							<Column style={qtyColumnStyle}>
								<Text style={tableHeaderTextStyle}>Qté</Text>
							</Column>
							<Column style={priceColumnStyle}>
								<Text style={tableHeaderTextStyle}>Prix unitaire</Text>
							</Column>
							<Column style={totalColumnStyle}>
								<Text style={tableHeaderTextStyle}>Total</Text>
							</Column>
						</Row>

						{/* Items */}
						{items.map((item, index) => (
							<Row key={index.toString()} style={tableRowStyle}>
								<Column style={descColumnStyle}>
									<Text style={itemTextStyle}>{item.description}</Text>
								</Column>
								<Column style={qtyColumnStyle}>
									<Text style={itemTextStyle}>{item.quantity}</Text>
								</Column>
								<Column style={priceColumnStyle}>
									<Text style={itemTextStyle}>
										{formatCurrency(item.unitPrice)}
									</Text>
								</Column>
								<Column style={totalColumnStyle}>
									<Text style={itemTextStyle}>
										{formatCurrency(item.total)}
									</Text>
								</Column>
							</Row>
						))}

						<Hr style={hrStyle} />

						{/* Total */}
						<Row style={totalRowStyle}>
							<Column style={totalLabelColumnStyle}>
								<Text style={totalLabelStyle}>TOTAL :</Text>
							</Column>
							<Column style={totalAmountColumnStyle}>
								<Text style={totalAmountStyle}>{formatCurrency(amount)}</Text>
							</Column>
						</Row>
					</Section>

					{/* Footer */}
					<Section style={footerStyle}>
						<Text style={footerTextStyle}>
							Merci pour votre confiance ! Cette facture est générée
							automatiquement.
						</Text>
					</Section>
				</Container>
			</Body>
		</Html>
	);
};

// Styles pour facture
const bodyStyle = {
	backgroundColor: "#f6f9fc",
	fontFamily: "Arial, sans-serif",
};
const containerStyle = {
	backgroundColor: "#ffffff",
	margin: "0 auto",
	padding: "40px",
	maxWidth: "600px",
};
const headerStyle = { marginBottom: "30px" };
const companyColumnStyle = { width: "60%" };
const invoiceColumnStyle = { width: "40%", textAlign: "right" as const };
const companyNameStyle = {
	fontSize: "24px",
	fontWeight: "bold",
	color: "#1f2937",
	margin: "0 0 10px 0",
};
const companyDetailsStyle = {
	fontSize: "14px",
	color: "#6b7280",
	margin: "0",
	lineHeight: "1.5",
};
const invoiceNumberStyle = {
	fontSize: "20px",
	fontWeight: "bold",
	color: "#dc2626",
	margin: "0",
};
const dueDateStyle = {
	fontSize: "14px",
	color: "#6b7280",
	margin: "10px 0 0 0",
};
const hrStyle = {
	border: "none",
	borderTop: "2px solid #e5e7eb",
	margin: "20px 0",
};
const customerSectionStyle = { marginBottom: "30px" };
const labelStyle = {
	fontSize: "12px",
	color: "#9ca3af",
	fontWeight: "bold",
	margin: "0 0 5px 0",
};
const customerNameStyle = {
	fontSize: "16px",
	color: "#1f2937",
	fontWeight: "bold",
	margin: "0",
};
const itemsSectionStyle = { marginBottom: "30px" };
const itemsHeaderStyle = {
	fontSize: "18px",
	fontWeight: "bold",
	color: "#1f2937",
	margin: "0 0 20px 0",
};
const tableHeaderStyle = { backgroundColor: "#f3f4f6", padding: "10px 0" };
const tableHeaderTextStyle = {
	fontSize: "12px",
	fontWeight: "bold",
	color: "#374151",
	margin: "0",
};
const tableRowStyle = { padding: "10px 0", borderBottom: "1px solid #e5e7eb" };
const itemTextStyle = { fontSize: "14px", color: "#1f2937", margin: "0" };
const descColumnStyle = { width: "40%", paddingRight: "10px" };
const qtyColumnStyle = { width: "15%", textAlign: "center" as const };
const priceColumnStyle = { width: "20%", textAlign: "right" as const };
const totalColumnStyle = { width: "25%", textAlign: "right" as const };
const totalRowStyle = { marginTop: "20px" };
const totalLabelColumnStyle = {
	width: "75%",
	textAlign: "right" as const,
	paddingRight: "20px",
};
const totalAmountColumnStyle = { width: "25%", textAlign: "right" as const };
const totalLabelStyle = {
	fontSize: "16px",
	fontWeight: "bold",
	color: "#1f2937",
	margin: "0",
};
const totalAmountStyle = {
	fontSize: "20px",
	fontWeight: "bold",
	color: "#dc2626",
	margin: "0",
};
const footerStyle = { marginTop: "40px", textAlign: "center" as const };
const footerTextStyle = { fontSize: "12px", color: "#9ca3af", margin: "0" };

export default InvoiceEmail;
