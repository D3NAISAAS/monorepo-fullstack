// apps/web/src/app/hybrid-example/page.tsx

import { UserComponent } from "@/features/user/components/user-component";
import { HydrateClient, trpc } from "@/trpc/server";
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { ClientGreeting } from "./client-greeting";
export default async function HybridPage() {
  // Données récupérées côté serveur
  // const serverGreeting = await trpc.home.query();
  // #void trpc.users.getUser.prefetch();
  void trpc.users.getUser.prefetch();
  return (
    <HydrateClient>

      <div className="container mx-auto max-w-3xl p-4">
        <h1 className="text-2xl font-bold mb-4">Exemple hybride Server/Client</h1>

        <div className="p-4 border rounded mb-4">
          <h2 className="text-lg font-semibold mb-2">Données du serveur</h2>
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