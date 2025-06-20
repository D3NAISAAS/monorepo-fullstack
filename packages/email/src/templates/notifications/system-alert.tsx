// src/templates/notifications/system-alert.tsx
import {
	Body,
	Button,
	Container,
	Head,
	Html,
	Preview,
	Section,
	Text,
} from "@react-email/components";
import * as React from "react";

export interface SystemAlertProps {
	title: string;
	message: string;
	actionUrl?: string;
	actionText?: string;
	severity: "info" | "warning" | "error" | "success";
	timestamp?: Date;
}

export const SystemAlertEmail = ({
	title,
	message,
	actionUrl,
	actionText,
	severity = "info",
	timestamp = new Date(),
}: SystemAlertProps) => {
	const severityConfig = {
		info: { color: "#3b82f6", emoji: "ℹ️", label: "Information" },
		warning: { color: "#f59e0b", emoji: "⚠️", label: "Attention" },
		error: { color: "#dc2626", emoji: "🚨", label: "Erreur" },
		success: { color: "#10b981", emoji: "✅", label: "Succès" },
	};

	const config = severityConfig[severity];

	return (
		<Html lang="fr">
			<Head />
			<Preview>{title}</Preview>
			<Body style={bodyStyle}>
				<Container style={containerStyle}>
					<Section>
						<div
							style={{
								...alertHeaderStyle,
								backgroundColor: config.color,
							}}
						>
							<Text style={alertLabelStyle}>
								{config.emoji} {config.label}
							</Text>
						</div>

						<div style={contentStyle}>
							<Text style={titleStyle}>{title}</Text>
							<Text style={messageStyle}>{message}</Text>

							{actionUrl && actionText && (
								<Button
									href={actionUrl}
									style={{
										...buttonStyle,
										backgroundColor: config.color,
									}}
								>
									{actionText}
								</Button>
							)}

							<Text style={timestampStyle}>
								🕒 {timestamp.toLocaleString("fr-FR")}
							</Text>
						</div>
					</Section>
				</Container>
			</Body>
		</Html>
	);
};

const bodyStyle = {
	backgroundColor: "#f6f9fc",
	fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif',
};

const containerStyle = {
	backgroundColor: "#ffffff",
	margin: "0 auto",
	padding: "0",
	marginBottom: "64px",
	maxWidth: "580px",
	borderRadius: "8px",
	overflow: "hidden",
	boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
};

const alertHeaderStyle = {
	padding: "16px 20px",
	margin: "0",
};

const alertLabelStyle = {
	color: "#ffffff",
	fontSize: "14px",
	fontWeight: "bold",
	margin: "0",
	textAlign: "center" as const,
};

const contentStyle = {
	padding: "30px 20px",
};

const titleStyle = {
	fontSize: "24px",
	fontWeight: "bold",
	color: "#1f2937",
	margin: "0 0 16px 0",
};

const messageStyle = {
	fontSize: "16px",
	lineHeight: "1.6",
	color: "#4b5563",
	margin: "0 0 24px 0",
};

const buttonStyle = {
	borderRadius: "8px",
	color: "#fff",
	fontSize: "16px",
	fontWeight: "bold",
	textDecoration: "none",
	textAlign: "center" as const,
	display: "block",
	width: "200px",
	padding: "12px 20px",
	margin: "20px auto",
};

const timestampStyle = {
	fontSize: "12px",
	color: "#9ca3af",
	textAlign: "center" as const,
	marginTop: "30px",
	fontStyle: "italic",
};

export default SystemAlertEmail;
