// src/utils/types.ts
export type EmailProviderChoice = "resend" | "nodemailer";

export interface EmailConfig {
	provider: EmailProviderChoice;
	resend?: {
		apiKey: string;
		from: string;
	};
	nodemailer?: {
		host: string;
		port: number;
		secure?: boolean;
		ignoreTLS?: boolean;
		auth?: {
			user: string;
			pass: string;
		};
	};
	from: string;
}

export interface EmailOptions {
	to: string | string[];
	subject: string;
	template: string;
	data: Record<string, any>;
	attachments?: Array<{
		filename: string;
		content: Buffer | string;
		contentType?: string;
	}>;
	replyTo?: string;
	cc?: string[];
	bcc?: string[];
}

export interface EmailResult {
	success: boolean;
	messageId?: string;
	provider: EmailProviderChoice;
	error?: string;
	deliveryTime?: number;
}

// Type pour les templates d'email
export type RenderTemplateOptions = {
	template: string;
	data: Record<string, any>;
};
