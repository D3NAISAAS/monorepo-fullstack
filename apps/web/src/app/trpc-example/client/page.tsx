// apps/web/src/app/hybrid-example/page.tsx
"use client";
import { trpc } from "@/trpc/client";

export default function HybridPage() {
  const { data, isLoading } = trpc.users.createOrGetUser.useQuery({
    email: "test@example.com",
    name: "Test User",
  });

  return (
    <div className="p-4 border rounded">
      <h2 className="text-lg font-semibold mb-2">Données utilisateur (client)</h2>
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