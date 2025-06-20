// apps/web/src/app/hybrid-example/page.tsx

import { UserComponent } from "@/features/user/components/user-component";
import { HydrateClient, trpc } from "@/trpc/server";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { ClientGreeting } from "./client-greeting";
export default async function HybridPage() {
	// Données récupérées côté serveur
	// const serverGreeting = await trpc.home.query();
	// #void trpc.users.getUser.prefetch();
	void trpc.users.getUser.prefetch();
	return (
		<HydrateClient>
			<div className="container mx-auto max-w-3xl p-4">
				<h1 className="mb-4 font-bold text-2xl">
					Exemple hybride Server/Client
				</h1>

				<div className="mb-4 rounded border p-4">
					<h2 className="mb-2 font-semibold text-lg">Données du serveur</h2>
					{/* <p>{serverGreeting.greeting}</p> */}
				</div>
			</div>
			<ErrorBoundary fallback={<div>Something went wrong</div>}>
				<Suspense fallback={<div>Loading...</div>}>
					{/* Component client qui utilise tRPC côté client */}
					<ClientGreeting />
					<UserComponent />
				</Suspense>
			</ErrorBoundary>
		</HydrateClient>
	);
}
