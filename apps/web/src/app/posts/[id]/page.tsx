import { db } from "@/lib/prisma";

import { notFound } from "next/navigation";

export default async function Post({
	params,
}: { params: Promise<{ id: string }> }) {
	const { id } = await params;
	const post = await db.post.findUnique({
		where: { id: Number.parseInt(id) },
		include: {
			author: true,
		},
	});

	if (!post) {
		notFound();
	}

	return (
		<div>
			<article className="max-w-2xl space-y-4 font-[family-name:var(--font-geist-sans)]">
				<h1 className="mb-8 font-bold text-4xl text-[#333333]">{post.title}</h1>
				<p className="text-center text-gray-600">by {post.author.name}</p>
				<div className="prose prose-gray mt-8">
					{post.content || "No content available."}
				</div>
			</article>
		</div>
	);
}
