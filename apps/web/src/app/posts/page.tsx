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
      <h1 className="text-4xl font-bold mb-8 font-[family-name:var(--font-geist-sans)] text-[#333333]">
        Posts
      </h1>
      <ul className="font-[family-name:var(--font-geist-sans)] max-w-2xl space-y-4">
        {posts.map((post) => (
          <li key={post.id}>
            <span className="font-semibold">{post.title}</span>
            <span className="text-sm text-gray-600 ml-2">
              by {post.author.name}
            </span>
          </li>
        ))}
      </ul>
      <Link href="/posts/new">Add New Post</Link>
    </div>
  );
}