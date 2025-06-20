"use client";
import { trpc } from "@/trpc/client";
export function UserComponent() {
	const [data] = trpc.users.getUser.useSuspenseQuery();
	return (
		<div>
			{data.name} {data.email}
		</div>
	);
}
