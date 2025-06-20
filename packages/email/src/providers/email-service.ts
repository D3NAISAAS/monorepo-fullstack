import { emailRenderer } from "../utils/render";
// src/providers/email-service.ts
import type { EmailConfig, EmailOptions, EmailResult } from "../utils/types";

class EmailService {
	private config: EmailConfig;
	private nodemailerTransporter?: any;

	constructor(config: EmailConfig) {
		this.config = config;

		if (config.provider === "nodemailer") {
			this.nodemailerTransporter = this.createNodemailerTransporter();
		}
	}

	async sendEmail(options: EmailOptions): Promise<EmailResult> {
		const startTime = Date.now();

		try {
			const html = await emailRenderer.renderTemplate({
				template: options.template,
				data: options.data,
			});

			let result: EmailResult;

			if (this.config.provider === "resend") {
				result = await this.sendWithResend(options, html);
			} else {
				result = await this.sendWithNodemailer(options, html);
			}

			result.deliveryTime = Date.now() - startTime;
			return result;
		} catch (error) {
			return {
				success: false,
				error: error instanceof Error ? error.message : "Unknown error",
				provider: this.config.provider,
				deliveryTime: Date.now() - startTime,
			};
		}
	}

	private async sendWithResend(
		options: EmailOptions,
		html: string
	): Promise<EmailResult> {
		if (!this.config.resend) {
			throw new Error("Configuration Resend manquante");
		}

		const { Resend } = await import("resend");
		const resend = new Resend(this.config.resend.apiKey);

		const { data, error } = await resend.emails.send({
			from: this.config.resend.from,
			to: Array.isArray(options.to) ? options.to : [options.to],
			subject: options.subject,
			html,
			attachments: options.attachments,
			replyTo: options.replyTo,
			cc: options.cc,
			bcc: options.bcc,
		});

		if (error) throw new Error(`Resend error: ${error.message}`);

		return {
			success: true,
			messageId: data?.id,
			provider: "resend",
		};
	}

	private async sendWithNodemailer(
		options: EmailOptions,
		html: string
	): Promise<EmailResult> {
		const result = await this.nodemailerTransporter.sendMail({
			from: this.config.from,
			to: Array.isArray(options.to) ? options.to.join(", ") : options.to,
			subject: options.subject,
			html,
			attachments: options.attachments,
			replyTo: options.replyTo,
			cc: options.cc?.join(", "),
			bcc: options.bcc?.join(", "),
		});

		return {
			success: true,
			messageId: result.messageId,
			provider: "nodemailer",
		};
	}

	private createNodemailerTransporter() {
		const nodemailer = require("nodemailer");

		if (!this.config.nodemailer) {
			throw new Error("Configuration Nodemailer manquante");
		}

		return nodemailer.createTransport({
			host: this.config.nodemailer.host,
			port: this.config.nodemailer.port,
			secure: this.config.nodemailer.secure ?? false,
			ignoreTLS: this.config.nodemailer.ignoreTLS ?? false,
			auth: this.config.nodemailer.auth,
		});
	}
}

export const createEmailService = (config: EmailConfig) => {
	return new EmailService(config);
};
