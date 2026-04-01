import { z } from "zod";
import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { slugify } from "@/lib/utils";

const createBlogSchema = z.object({
  title: z.string().min(3),
  slug: z.string().min(3),
  content: z.string().min(10),
  excerpt: z.string().optional(),
  thumbnail: z.string().url().optional().or(z.literal("")),
  status: z.enum(["draft", "published"]),
  category: z.string().optional(),
  tags: z.array(z.string()).optional(),
});

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const adminMode = searchParams.get("admin") === "1";
  const session = await getSession();

  if (adminMode && !session) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  const blogs = await db.blog.findMany({
    where: adminMode
      ? undefined
      : {
          status: "published",
        },
    include: {
      category: true,
      tags: {
        include: {
          tag: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return Response.json(
    blogs.map((blog: Record<string, unknown> & { tags: Array<{ tag: unknown }> }) => ({
      ...blog,
      tags: blog.tags.map((item: { tag: unknown }) => item.tag),
    })),
  );
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const parsed = createBlogSchema.safeParse(body);

  if (!parsed.success) {
    const fieldErrors = parsed.error.flatten().fieldErrors;
    const firstFieldError = Object.values(fieldErrors).find((messages) => messages && messages.length)?.[0];

    return Response.json(
      {
        message: firstFieldError || "Input tidak valid",
        errors: fieldErrors,
      },
      { status: 400 },
    );
  }

  const normalizedSlug = slugify(parsed.data.slug || parsed.data.title);
  const uniqueTags = Array.from(new Set((parsed.data.tags || []).map((tag) => slugify(tag)).filter(Boolean)));

  try {
    const status = parsed.data.status === "published" ? "published" : "draft";

    const blog = await db.blog.create({
      data: {
        title: parsed.data.title,
        slug: normalizedSlug,
        content: parsed.data.content,
        excerpt: parsed.data.excerpt,
        thumbnail: parsed.data.thumbnail || null,
        status,
        publishedAt: status === "published" ? new Date() : null,
        category: parsed.data.category
          ? {
              connectOrCreate: {
                where: { slug: slugify(parsed.data.category) },
                create: {
                  name: parsed.data.category,
                  slug: slugify(parsed.data.category),
                },
              },
            }
          : undefined,
        tags: uniqueTags.length
          ? {
              create: uniqueTags.map((tagSlug) => ({
                tag: {
                  connectOrCreate: {
                    where: { slug: tagSlug },
                    create: {
                      name: tagSlug.replace(/-/g, " "),
                      slug: tagSlug,
                    },
                  },
                },
              })),
            }
          : undefined,
      },
      include: {
        category: true,
        tags: {
          include: {
            tag: true,
          },
        },
      },
    });

    return Response.json(
      {
        ...blog,
        tags: blog.tags.map((item: { tag: unknown }) => item.tag),
      },
      { status: 201 },
    );
  } catch {
    return Response.json({ message: "Gagal membuat blog" }, { status: 500 });
  }
}
