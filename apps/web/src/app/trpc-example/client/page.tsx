// apps/web/src/app/hybrid-example/page.tsx
"use client";
import { trpc } from "@/trpc/client";

export default function HybridPage() {
	const { data, isLoading } = trpc.users.createOrGetUser.useQuery({
		email: "test@example.com",
		name: "Test User",
	});

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
