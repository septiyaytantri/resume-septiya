import { notFound } from "next/navigation";
import Image from "next/image";
import { Metadata } from "next";
import { db } from "@/lib/db";
import { formatDate } from "@/lib/utils";
import { PublicHeader } from "@/components/layout/public-header";

type Params = {
  params: Promise<{ slug: string }>;
};

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const blog = await db.blog.findFirst({
    where: { slug, status: "published" },
    select: { title: true, excerpt: true },
  });

  if (!blog) {
    return {
      title: "Blog not found",
      description: "Blog tidak ditemukan",
    };
  }

  return {
    title: `${blog.title} | Septiya Blog`,
    description: blog.excerpt || "Artikel blog Septiya",
  };
}

export default async function BlogDetailPage({ params }: Params) {
  const { slug } = await params;

  const blog = await db.blog.findFirst({
    where: { slug, status: "published" },
    include: {
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
    <div>
      <PublicHeader />
      <article className="container-width py-12">
        <h1 className="max-w-3xl text-4xl font-semibold leading-tight">{blog.title}</h1>
        <p className="mt-3 text-sm text-zinc-500">Septiya • {formatDate(blog.publishedAt || blog.createdAt)}</p>
        <div className="relative mt-8 h-[320px] overflow-hidden rounded-xl bg-zinc-100">
          <Image
            src={blog.thumbnail || "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1200"}
            alt={blog.title}
            fill
            className="object-cover"
          />
        </div>
        <div className="prose mt-8 max-w-none prose-zinc" dangerouslySetInnerHTML={{ __html: blog.content }} />
        <div className="mt-8 flex flex-wrap gap-2">
          {blog.tags.map((item: { id: string; tag: { slug: string } }) => (
            <span key={item.id} className="rounded-full bg-red-50 px-3 py-1 text-xs text-red-900">
              #{item.tag.slug}
            </span>
          ))}
        </div>
      </article>
    </div>
  );
}
