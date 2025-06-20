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
		<div className="mx-auto flex w-1/2 flex-col items-center justify-center gap-4 p-4">
			<h1>Dashboard</h1>
			<p>Welcome {session?.user.name}</p>
			{/* <p>privateData: {privateData.data?.message}</p> */}
			<Button variant="destructive" onClick={() => authClient.signOut()}>
				Sign out
			</Button>
			<pre className="overflow-x-auto whitespace-pre-wrap bg-accent p-2 text-muted-foreground text-xs">
				session : {JSON.stringify(session, null, 2)}
			</pre>
			<pre className="overflow-x-auto whitespace-pre-wrap bg-accent p-2 text-muted-foreground text-xs">
				isPending : {JSON.stringify(isPending, null, 2)}
			</pre>
		</div>
	);
}
