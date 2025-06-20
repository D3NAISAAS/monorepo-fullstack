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
		RESEND_API_KEY: z.string().min(1, "RESEND_API_KEY cannot be empty"),
		RESEND_AUDIENCE_ID: z.string().min(1, "RESEND_AUDIENCE_ID cannot be empty"),
		RESEND_EMAIL_FROM: z
			.string()
			.email("RESEND_EMAIL_FROM must be a valid email")
			.min(1, "RESEND_EMAIL_FROM cannot be empty"),
	},
	client: {
		NEXT_PUBLIC_API_URL: z
			.string()
			.url("NEXT_PUBLIC_API_URL must be a valid url")
			.min(1, "NEXT_PUBLIC_API_URL cannot be empty"),
	},
	// If you're using Next.js < 13.4.4, you'll need to specify the runtimeEnv manually
	// runtimeEnv: {
	//   DATABASE_URL: process.env.DATABASE_URL,
	//   // NEXT_PUBLIC_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_PUBLISHABLE_KEY,
	// },
	// For Next.js >= 13.4.4, you only need to destructure client variables:
	experimental__runtimeEnv: {
		NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
	},
});
