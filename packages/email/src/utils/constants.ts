// src/utils/constants.ts
// Constantes pour les providers d'email
export const EMAIL_PROVIDERS = {
	RESEND: "resend",
	NODEMAILER: "nodemailer",
} as const;

// Mode simulation pour les tests sans API key
export const SIMULATION_MODE = {
	ENABLED: true,
	DISABLED: false,
} as const;

// Constantes pour les templates d'email
export const EMAIL_TEMPLATES = {
	auth: {
		welcome: "auth/welcome",
		resetPassword: "auth/reset-password",
		verifyEmail: "auth/verify-email",
		loginAlert: "auth/login-alert",
	},
	notifications: {
		systemAlert: "notifications/system-alert",
		maintenance: "notifications/maintenance",
		featureUpdate: "notifications/feature-update",
	},
	invoicing: {
		invoice: "invoicing/invoice",
		paymentSuccess: "invoicing/payment-success",
		paymentFailed: "invoicing/payment-failed",
		subscriptionRenewal: "invoicing/subscription-renewal",
	},
} as const;

export type EmailTemplate =
	(typeof EMAIL_TEMPLATES)[keyof typeof EMAIL_TEMPLATES];
