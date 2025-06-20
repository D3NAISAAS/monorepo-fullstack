import { trpc } from "@/trpc/server";
// apps/web/src/app/server-example/page.tsx
import React from "react";

export default async function ServerExamplePage() {
	// // Récupération de données avec le healthCheck
	// const healthStatus = await trpc.home.healthCheck.query();

	// // Récupération de données avec hello
	// const greeting = await trpc.home.hello.query({ text: "from Server Component" });

	const user = await trpc.users.getUser();

	return (
		<div className="container mx-auto max-w-3xl p-4">
			<h1 className="mb-4 font-bold text-2xl">
				Exemple de Server Component avec tRPC
			</h1>

			<div className="mb-4 rounded border p-4">
				<h2 className="mb-2 font-semibold text-lg">État du serveur</h2>
				<div className="flex items-center gap-2">
					<div className="h-3 w-3 rounded-full bg-green-500" />
					{/* <p>Status: {healthStatus}</p> */}
				</div>
			</div>

			<div className="rounded border p-4">
				<h2 className="mb-2 font-semibold text-lg">Message de salutation</h2>
				<p className="font-medium">{user.name}</p>
			</div>
		</div>
	);
}
