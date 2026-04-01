import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { BlogForm } from "@/components/blog/blog-form";

type Params = {
  params: Promise<{ id: string }>;
};

export const dynamic = "force-dynamic";

export default async function EditBlogPage({ params }: Params) {
  const { id } = await params;
  const blog = await db.blog.findUnique({
    where: { id },
    include: {
      category: true,
      tags: {
        include: {
          tag: true,
        },
      },
    },
  });

  if (!blog) {
    notFound();
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Edit Blog</h1>
      <BlogForm
        mode="edit"
        blogId={blog.id}
        initialData={{
          title: blog.title,
          slug: blog.slug,
          thumbnail: blog.thumbnail || "",
          excerpt: blog.excerpt || "",
          content: blog.content,
          tags: blog.tags.map((item: { tag: { slug: string } }) => item.tag.slug).join(", "),
          category: blog.category?.name || "",
          status: blog.status,
        }}
      />
    </div>
  );
}
