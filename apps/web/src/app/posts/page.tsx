import { db } from "@/lib/prisma";
import Link from "next/link";

export default async function Posts() {
	const posts = await db.post.findMany({
		include: {
			author: true,
		},
	});

	return (
		<div>
			<h1 className="mb-8 font-[family-name:var(--font-geist-sans)] font-bold text-4xl text-[#333333]">
				Posts
			</h1>
			<ul className="max-w-2xl space-y-4 font-[family-name:var(--font-geist-sans)]">
				{posts.map((post) => (
					<li key={post.id}>
						<span className="font-semibold">{post.title}</span>
						<span className="ml-2 text-gray-600 text-sm">
							by {post.author.name}
						</span>
					</li>
				))}
			</ul>
			<Link href="/posts/new">Add New Post</Link>
		</div>
	);
}
