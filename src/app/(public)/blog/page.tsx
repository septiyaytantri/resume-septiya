import { Metadata } from "next";
import { db } from "@/lib/db";
import { PublicHeader } from "@/components/layout/public-header";
import { BlogCard } from "@/components/blog/blog-card";

export const metadata: Metadata = {
  title: "Blog | Septiya",
  description: "Kumpulan artikel personal Septiya",
};

export const dynamic = "force-dynamic";

export default async function BlogListPage() {
  const blogs = await db.blog.findMany({
    where: { status: "published" },
    orderBy: { createdAt: "desc" },
    select: {
      slug: true,
      title: true,
      excerpt: true,
      thumbnail: true,
      createdAt: true,
    },
  });

  return (
    <div>
      <PublicHeader />
      <section className="container-width py-12">
        <h1 className="mb-6 text-3xl font-semibold">Blog</h1>
        <div className="grid gap-5 md:grid-cols-3">
          {blogs.map((blog: { slug: string; title: string; excerpt: string | null; thumbnail: string | null; createdAt: Date }) => (
            <BlogCard key={blog.slug} blog={blog} />
          ))}
        </div>
        {blogs.length === 0 ? <p className="text-sm text-zinc-500">Belum ada artikel publish.</p> : null}
      </section>
    </div>
  );
}
