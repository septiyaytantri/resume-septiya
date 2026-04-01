import Image from "next/image";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import { Card } from "@/components/ui/card";

type BlogCardProps = {
  blog: {
    slug: string;
    title: string;
    excerpt: string | null;
    thumbnail: string | null;
    createdAt: Date;
  };
};

export function BlogCard({ blog }: BlogCardProps) {
  return (
    <Card className="overflow-hidden p-0">
      <div className="relative h-48 w-full bg-red-50">
        <Image
          src={blog.thumbnail || "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1200"}
          alt={blog.title}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-5">
        <p className="mb-2 text-xs text-zinc-500">{formatDate(blog.createdAt)}</p>
        <h3 className="mb-2 line-clamp-2 text-lg font-semibold">{blog.title}</h3>
        <p className="mb-4 line-clamp-3 text-sm text-zinc-600">{blog.excerpt || "No excerpt."}</p>
        <Link href={`/blog/${blog.slug}`} className="text-sm font-medium text-red-900 hover:underline">
          Read more
        </Link>
      </div>
    </Card>
  );
}
