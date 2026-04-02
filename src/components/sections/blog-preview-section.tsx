import Link from "next/link";
import { Card } from "@/components/ui/card";
import { db } from "@/lib/db";

type BlogPreviewItem = {
  slug: string;
  title: string;
  excerpt: string | null;
  thumbnail: string | null;
  createdAt: Date;
};

export async function BlogPreviewSection() {
  let blogs: BlogPreviewItem[] = [];
  
  try {
    blogs = await db.blog.findMany({
      where: { status: "published" },
      orderBy: { createdAt: "desc" },
      take: 3,
      select: {
        slug: true,
        title: true,
        excerpt: true,
        thumbnail: true,
        createdAt: true,
      },
    });
  } catch (error) {
    console.error("Failed to fetch blogs:", error);
    // Return empty array if database is not available
  }

  return (
    <section className="py-24 bg-zinc-50">
      <div className="container-width">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-zinc-900 mb-4">Latest Articles</h2>
            <p className="text-zinc-600">Insights and perspectives on IT, tech, and professional growth</p>
          </div>

          {blogs.length > 0 ? (
            <>
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                {blogs.map((blog: BlogPreviewItem) => (
                  <Card key={blog.slug} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="aspect-video bg-gradient-to-br from-red-100 to-red-50 relative overflow-hidden">
                      {blog.thumbnail && (
                        <img
                          src={blog.thumbnail}
                          alt={blog.title}
                          className="w-full h-full object-cover"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    </div>
                    <div className="p-5">
                      <p className="text-xs text-zinc-500 mb-2">
                        {new Intl.DateTimeFormat("id-ID", { dateStyle: "medium" }).format(
                          new Date(blog.createdAt),
                        )}
                      </p>
                      <h3 className="font-semibold text-zinc-900 mb-2 line-clamp-2">{blog.title}</h3>
                      <p className="text-sm text-zinc-600 line-clamp-2 mb-4">{blog.excerpt}</p>
                      <Link
                        href={`/blog/${blog.slug}`}
                        className="text-sm font-medium text-red-900 hover:text-red-800"
                      >
                        Read more →
                      </Link>
                    </div>
                  </Card>
                ))}
              </div>
              <div className="text-center">
                <Link
                  href="/blog"
                  className="inline-flex bg-red-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-red-800 transition-colors"
                >
                  View All Articles
                </Link>
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-zinc-600">Blog posts coming soon...</p>
              <Link href="/blog" className="text-red-900 hover:text-red-800 font-medium mt-2 inline-block">
                Check blog →
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
