import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
	server: {
		DATABASE_URL: z
			.string()
			.url()
			.refine((str) => str.startsWith("postgresql://"), {
				message: "DATABASE_URL must be a postgresql url connection string",
			}),
		BETTER_AUTH_SECRET: z
			.string()
			.min(1, "BETTER_AUTH_SECRET cannot be empty")
			.refine((str) => str.length >= 32, {
				message: "BETTER_AUTH_SECRET must be at least 32 characters long",
			}),
		BETTER_AUTH_URL: z
			.string()
			.url("BETTER_AUTH_URL must be a valid url")
			.min(1, "BETTER_AUTH_URL cannot be empty"),
		CORS_ORIGIN: z
			.string()
			.url("CORS_ORIGIN must be a valid url")
			.min(1, "CORS_ORIGIN cannot be empty"),
		// RESEND_API_KEY: z.string().min(1, "RESEND_API_KEY cannot be empty"),
		// RESEND_AUDIENCE_ID: z.string().min(1, "RESEND_AUDIENCE_ID cannot be empty"),
		// RESEND_EMAIL_FROM: z
		// 	.string()
		// 	.email("RESEND_EMAIL_FROM must be a valid email")
		// 	.min(1, "RESEND_EMAIL_FROM cannot be empty"),
		EMAIL_PROVIDER: z.enum(["resend", "nodemailer"]).default("nodemailer"),
		FROM_EMAIL: z
			.string()
			.email("FROM_EMAIL doit être un email valide")
			.min(1, "FROM_EMAIL ne peut pas être vide")
			.default("noreply@localhost"),
		COMPANY_NAME: z
			.string()
			.min(1, "COMPANY_NAME cannot be empty")
			.default("Mon SaaS"),
		SMTP_HOST: z
			.string()
			.min(1, "SMTP_HOST cannot be empty")
			.default("localhost"),
		SMTP_PORT: z.string().min(1, "SMTP_PORT cannot be empty").default("1025"),
		SMTP_SECURE: z.boolean().default(false),
		SMTP_IGNORE_TLS: z.boolean().default(true),
		RESEND_API_KEY: z
			.string()
			.min(1, "RESEND_API_KEY cannot be empty")
			.default(""),
		RESEND_AUDIENCE_ID: z
			.string()
			.min(1, "RESEND_AUDIENCE_ID cannot be empty")
			.default(""),
	},
	client: {
		NEXT_PUBLIC_API_URL: z
			.string()
			.url("NEXT_PUBLIC_API_URL must be a valid url")
			.min(1, "NEXT_PUBLIC_API_URL cannot be empty"),
	},
	emptyStringAsUndefined: true,
	experimental__runtimeEnv: {
		NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
	},
});
