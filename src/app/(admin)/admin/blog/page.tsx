import { db } from "@/lib/db";
import { BlogTable } from "@/components/dashboard/blog-table";

export const dynamic = "force-dynamic";

export default async function AdminBlogPage() {
  const blogs = await db.blog.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      title: true,
      status: true,
      createdAt: true,
    },
  });

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Blog Management</h1>
      <BlogTable blogs={blogs} />
    </div>
  );
}
