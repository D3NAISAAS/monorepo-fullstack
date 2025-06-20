import { db } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import Form from "next/form";
import { redirect } from "next/navigation";

export default function NewPost() {
	async function createPost(formData: FormData) {
		"use server";

		const title = formData.get("title") as string;
		const content = formData.get("content") as string;

		await db.post.create({
			data: {
				title,
				content,
				authorId: 1,
			},
		});

		revalidatePath("/posts");
		redirect("/posts");
	}

	return (
		<div className="mx-auto max-w-2xl p-4">
			<h1 className="mb-6 font-bold text-2xl">Create New Post</h1>
			<Form action={createPost} className="space-y-6">
				<div>
					<label htmlFor="title" className="mb-2 block text-lg">
						Title
					</label>
					<input
						type="text"
						id="title"
						name="title"
						placeholder="Enter your post title"
						className="w-full rounded-lg border px-4 py-2"
					/>
				</div>
				<div>
					<label htmlFor="content" className="mb-2 block text-lg">
						Content
					</label>
					<textarea
						id="content"
						name="content"
						placeholder="Write your post content here..."
						rows={6}
						className="w-full rounded-lg border px-4 py-2"
					/>
				</div>
				<button
					type="submit"
					className="w-full rounded-lg bg-blue-500 py-3 text-white hover:bg-blue-600"
				>
					Create Post
				</button>
			</Form>
		</div>
	);
}
