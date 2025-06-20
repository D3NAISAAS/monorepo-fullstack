// apps/web/src/app/hybrid-example/client-greeting.tsx
"use client";

import { trpc } from "@/trpc/client";

export function ClientGreeting() {
	const { data, isLoading } = trpc.user.createOrGetUser.useQuery();

	return (
		<div className="rounded border p-4">
			<h2 className="mb-2 font-semibold text-lg">
				Données utilisateur (client)
			</h2>
			{isLoading ? (
				<p>Chargement...</p>
			) : (
				<div>
					<pre>{JSON.stringify(data, null, 2)}</pre>
					<p>{data?.name}</p>
					<p>{data?.email}</p>
					<p>{data?.image}</p>
				</div>
			)}
		</div>
	);
}
