import { env } from "@/env";
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
	baseURL: env.NEXT_PUBLIC_API_URL,
	plugins: [],
});
export const {
	signIn,
	signOut,
	signUp,
	useSession,
	forgetPassword,
	resetPassword,
} = authClient;

// *********************
// import type { auth } from "@/lib/auth";
// import { adminClient, customSessionClient, inferAdditionalFields, magicLinkClient, organizationClient } from "better-auth/client/plugins";
// import { createAuthClient } from "better-auth/react";
// import { ac, roles } from "./auth-permissions";

// export const authClient = createAuthClient({
//   baseURL: env.NEXT_PUBLIC_API_URL,
//   plugins: [
//     inferAdditionalFields<typeof auth>(),
//     adminClient({ ac, roles }),
//     customSessionClient<typeof auth>(),
//     magicLinkClient(),
//     organizationClient()
//   ]
// });

// export const { signIn, signOut, signUp, useSession, forgetPassword, resetPassword, admin, sendVerificationEmail, updateUser, changePassword, organization } = authClient;
