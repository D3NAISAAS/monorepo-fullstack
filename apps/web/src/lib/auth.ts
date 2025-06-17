import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
// import { expo } from "@better-auth/expo";
import { env } from "@/env";
import { db } from "@/lib/prisma";

console.log("Creating Better Auth instance...");
console.log("Database instance:", !!db);
console.log("CORS_ORIGIN:", env.CORS_ORIGIN);

export const auth = betterAuth({
  database: prismaAdapter(db, {
    provider: "postgresql",
  }),
  baseURL: env.BETTER_AUTH_URL,
  trustedOrigins: [env.CORS_ORIGIN || "", "turborepo-by-max://"],
  emailAndPassword: {
    enabled: true,
  },
  plugins: [
    // expo(),
  ],
});