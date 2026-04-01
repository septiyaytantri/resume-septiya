import { z } from "zod";
import { db } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { slugify } from "@/lib/utils";

const updateBlogSchema = z.object({
  title: z.string().min(3),
  slug: z.string().min(3),
  content: z.string().min(10),
  excerpt: z.string().optional(),
  thumbnail: z.string().url().optional().or(z.literal("")),
  status: z.enum(["draft", "published"]),
  category: z.string().optional(),
  tags: z.array(z.string()).optional(),
});

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await getSession();

  const blog = await db.blog.findFirst({
    where: {
      OR: [{ id }, { slug: id }],
      ...(session ? {} : { status: "published" }),
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

  if (!blog) {
    return Response.json({ message: "Blog tidak ditemukan" }, { status: 404 });
  }

  return Response.json({
    ...blog,
    tags: blog.tags.map((item: { tag: unknown }) => item.tag),
  });
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json();
  const parsed = updateBlogSchema.safeParse(body);

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

    const blog = await db.blog.update({
      where: { id },
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
          : {
              disconnect: true,
            },
        tags: {
          deleteMany: {},
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
        },
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

    return Response.json({
      ...blog,
      tags: blog.tags.map((item: { tag: unknown }) => item.tag),
    });
  } catch {
    return Response.json({ message: "Gagal mengupdate blog" }, { status: 500 });
  }
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  try {
    await db.blog.delete({
      where: { id },
    });

    return Response.json({ message: "Blog berhasil dihapus" });
  } catch {
    return Response.json({ message: "Gagal menghapus blog" }, { status: 500 });
  }
}
