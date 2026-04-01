"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";

type BlogTableProps = {
  blogs: Array<{
    id: string;
    title: string;
    status: "draft" | "published";
    createdAt: Date;
  }>;
};

export function BlogTable({ blogs }: BlogTableProps) {
  const router = useRouter();

  async function onDelete(id: string) {
    const ok = window.confirm("Hapus blog ini?");
    if (!ok) {
      return;
    }

    const response = await fetch(`/api/blog/${id}`, { method: "DELETE" });
    if (response.ok) {
      router.refresh();
    }
  }

  return (
    <div className="rounded-xl border border-zinc-200 bg-white shadow-sm">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-zinc-200 text-zinc-500">
            <th className="px-4 py-3 font-medium">Title</th>
            <th className="px-4 py-3 font-medium">Status</th>
            <th className="px-4 py-3 font-medium">Created Date</th>
            <th className="px-4 py-3 font-medium">Action</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map((blog) => (
            <tr key={blog.id} className="border-b border-zinc-100">
              <td className="px-4 py-3 font-medium text-zinc-900">{blog.title}</td>
              <td className="px-4 py-3">
                <span
                  className={
                    blog.status === "published"
                      ? "rounded-full bg-red-50 px-2 py-1 text-xs text-red-900"
                      : "rounded-full bg-zinc-100 px-2 py-1 text-xs text-zinc-600"
                  }
                >
                  {blog.status}
                </span>
              </td>
              <td className="px-4 py-3 text-zinc-600">{formatDate(blog.createdAt)}</td>
              <td className="px-4 py-3">
                <div className="flex gap-2">
                  <Link href={`/admin/blog/edit/${blog.id}`} className="text-red-900 hover:underline">
                    Edit
                  </Link>
                  <button onClick={() => onDelete(blog.id)} className="text-zinc-600 hover:underline" type="button">
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {blogs.length === 0 ? <p className="p-4 text-sm text-zinc-500">Belum ada blog.</p> : null}
      <div className="flex justify-end border-t border-zinc-100 p-4">
        <Link href="/admin/blog/create">
          <Button>Create Blog</Button>
        </Link>
      </div>
    </div>
  );
}
