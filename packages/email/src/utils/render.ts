import { render } from "@react-email/render";
// src/utils/render.ts
import React from "react";
import * as AuthTemplates from "../templates/auth";
import * as InvoicingTemplates from "../templates/invoicing";
import * as NewsletterTemplates from "../templates/newsletters";
import * as NotificationTemplates from "../templates/notifications";
import * as ReviewTemplates from "../templates/reviews";

export interface RenderOptions {
	template: string;
	data: Record<string, any>;
	options?: {
		pretty?: boolean;
		plainText?: boolean;
	};
}

export class EmailRenderer {
	private templates = {
		// Auth templates
		"auth/welcome": AuthTemplates.WelcomeEmail,
		"auth/reset-password": AuthTemplates.ResetPasswordEmail,
		"auth/verify-email": AuthTemplates.VerifyEmailEmail,
		"auth/login-alert": AuthTemplates.LoginAlertEmail,

		// Notification templates
		"notifications/system-alert": NotificationTemplates.SystemAlertEmail,
		"notifications/maintenance": NotificationTemplates.MaintenanceEmail,
		"notifications/feature-update": NotificationTemplates.FeatureUpdateEmail,

		// Invoicing templates
		"invoicing/invoice": InvoicingTemplates.InvoiceEmail,
		"invoicing/payment-success": InvoicingTemplates.PaymentSuccessEmail,
		"invoicing/payment-failed": InvoicingTemplates.PaymentFailedEmail,
		"invoicing/subscription-renewal":
			InvoicingTemplates.SubscriptionRenewalEmail,

		// Newsletter templates
		"newsletters/monthly": NewsletterTemplates.MonthlyNewsletterEmail,
		"newsletters/product-updates": NewsletterTemplates.ProductUpdatesEmail,

		// Review templates
		"reviews/feedback-request": ReviewTemplates.FeedbackRequestEmail,
		"reviews/review-reminder": ReviewTemplates.ReviewReminderEmail,
	};

	async renderTemplate({
		template,
		data,
		options = {},
	}: RenderOptions): Promise<string> {
		const TemplateComponent = this.getTemplateComponent(template);

		return await render(React.createElement(TemplateComponent, data), {
			pretty: options.pretty ?? process.env.NODE_ENV === "development",
		});
	}

	async renderPlainText({ template, data }: RenderOptions): Promise<string> {
		const TemplateComponent = this.getTemplateComponent(template);

		return await render(React.createElement(TemplateComponent, data), {
			plainText: true,
		});
	}

	getAvailableTemplates(): string[] {
		return Object.keys(this.templates);
	}

	getTemplatesByTheme(theme: string): string[] {
		return Object.keys(this.templates).filter((template) =>
			template.startsWith(`${theme}/`)
		);
	}

	private getTemplateComponent(template: string) {
		const TemplateComponent =
			this.templates[template as keyof typeof this.templates];

		if (!TemplateComponent) {
			const availableTemplates = this.getAvailableTemplates().join(", ");
			throw new Error(
				`Template "${template}" not found. Available templates: ${availableTemplates}`
			);
		}

		return TemplateComponent;
	}
}

export const emailRenderer = new EmailRenderer();
