"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth/auth-client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Dashboard() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  // const privateData = useQuery(trpc.privateData.queryOptions());
  // console.log(privateData.data);

  // useEffect(() => {
  //   if (!session && !isPending) {
  //     router.push("/login");
  //   }
  // }, [session, isPending]);

  if (isPending) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col gap-4 w-1/2 mx-auto p-4 items-center justify-center">
      <h1>Dashboard</h1>
      <p>Welcome {session?.user.name}</p>
      {/* <p>privateData: {privateData.data?.message}</p> */}
      <Button variant="destructive" onClick={() => authClient.signOut()}>Sign out</Button>
      <pre className="text-xs text-muted-foreground overflow-x-auto whitespace-pre-wrap bg-accent p-2">session : {JSON.stringify(session, null, 2)}</pre>
      <pre className="text-xs text-muted-foreground overflow-x-auto whitespace-pre-wrap bg-accent p-2">isPending : {JSON.stringify(isPending, null, 2)}</pre>
    </div>
  );
}