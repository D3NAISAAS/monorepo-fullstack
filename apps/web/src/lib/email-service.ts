// apps/web/lib/email-service.ts
import { type EmailProviderChoice, createEmailService } from "@d3n/email";
import { getEmailConfig } from "./email-config";

// Cache des instances pour éviter les recréations
const serviceCache = new Map<string, ReturnType<typeof createEmailService>>();

export const getEmailService = (choice?: EmailProviderChoice) => {
	const cacheKey = choice
		? `${choice.provider}-${choice.environment}`
		: "default";

	if (!serviceCache.has(cacheKey)) {
		const config = getEmailConfig(choice);
		serviceCache.set(cacheKey, createEmailService(config));
	}

	return serviceCache.get(cacheKey)!;
};

// Exports pour utilisation simple
export const emailService = () => getEmailService();
export const resendService = () => getEmailService({ provider: "resend" });
export const nodemailerService = () =>
	getEmailService({ provider: "nodemailer" });
