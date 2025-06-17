// apps/web/src/app/server-example/page.tsx
import React from "react";
import { trpc } from "@/trpc/server";

export default async function ServerExamplePage() {
  // // Récupération de données avec le healthCheck
  // const healthStatus = await trpc.home.healthCheck.query();

  // // Récupération de données avec hello
  // const greeting = await trpc.home.hello.query({ text: "from Server Component" });

  const user = await trpc.users.getUser();

  return (
    <div className="container mx-auto max-w-3xl p-4">
      <h1 className="text-2xl font-bold mb-4">Exemple de Server Component avec tRPC</h1>

      <div className="p-4 border rounded mb-4">
        <h2 className="text-lg font-semibold mb-2">État du serveur</h2>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-green-500" />
          {/* <p>Status: {healthStatus}</p> */}
        </div>
      </div>

      <div className="p-4 border rounded">
        <h2 className="text-lg font-semibold mb-2">Message de salutation</h2>
        <p className="font-medium">{user.name}</p>
      </div>
    </div>
  );
}