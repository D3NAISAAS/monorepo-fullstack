// apps/web/lib/email-config.ts
import type { EmailConfig } from "@d3n/email";

export interface EmailProviderChoice {
	provider: "resend" | "nodemailer";
	environment?: "development" | "staging" | "production";
}

export const getEmailConfig = (choice?: EmailProviderChoice): EmailConfig => {
	// Permet de forcer un provider spécifique
	const provider =
		choice?.provider ||
		(process.env.EMAIL_PROVIDER as "resend" | "nodemailer") ||
		"nodemailer";

	if (provider === "resend") {
		return getResendConfig();
	}
	return getNodemailerConfig();
};

const getResendConfig = (): EmailConfig => {
	const apiKey = process.env.RESEND_API_KEY;
	if (!apiKey) {
		throw new Error("RESEND_API_KEY est requis pour utiliser Resend");
	}

	return {
		provider: "resend",
		resend: {
			apiKey,
			from: process.env.FROM_EMAIL || "noreply@yourdomain.com",
		},
		from: process.env.FROM_EMAIL || "noreply@yourdomain.com",
	};
};

const getNodemailerConfig = (): EmailConfig => {
	return {
		provider: "nodemailer",
		nodemailer: {
			host: process.env.SMTP_HOST || "localhost",
			port: Number.parseInt(process.env.SMTP_PORT || "1025"),
			secure: process.env.SMTP_SECURE === "true",
			auth: process.env.SMTP_USER
				? {
						user: process.env.SMTP_USER,
						pass: process.env.SMTP_PASS || "",
					}
				: undefined,
		},
		from: process.env.FROM_EMAIL || "noreply@localhost",
	};
};

// Configurations prédéfinies pour différents cas d'usage
export const emailConfigs = {
	// Pour les tests unitaires
	test: (): EmailConfig => ({
		provider: "nodemailer",
		nodemailer: {
			host: "localhost",
			port: 1025,
		},
		from: "test@localhost",
	}),

	// Pour le développement avec MailHog
	development: (): EmailConfig => ({
		provider: "nodemailer",
		nodemailer: {
			host: "localhost",
			port: 1025,
		},
		from: "dev@localhost",
	}),

	// Pour utiliser Resend en staging
	staging: (): EmailConfig => getResendConfig(),

	// Pour la production
	production: (): EmailConfig => getResendConfig(),
};
