// apps/web/src/app/hybrid-example/client-greeting.tsx
"use client";

import { trpc } from "@/trpc/client";

export function ClientGreeting() {
  const { data, isLoading } = trpc.user.createOrGetUser.useQuery();

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