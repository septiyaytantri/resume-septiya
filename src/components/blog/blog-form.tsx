"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { slugify } from "@/lib/utils";

import "react-quill-new/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

type BlogFormProps = {
  mode: "create" | "edit";
  blogId?: string;
  initialData?: {
    title: string;
    slug: string;
    thumbnail: string;
    excerpt: string;
    content: string;
    tags: string;
    category: string;
    status: "draft" | "published";
  };
};

type BlogFormState = {
  title: string;
  slug: string;
  thumbnail: string;
  excerpt: string;
  content: string;
  tags: string;
  category: string;
  status: "draft" | "published";
};

type BlogFieldErrors = Partial<Record<keyof BlogFormState, string[]>>;

const fieldLabels: Partial<Record<keyof BlogFormState, string>> = {
  title: "Title",
  slug: "Slug",
  thumbnail: "Thumbnail URL",
  excerpt: "Excerpt",
  content: "Content",
  tags: "Tags",
  category: "Category",
  status: "Status",
};

export function BlogForm({ mode, blogId, initialData }: BlogFormProps) {
  const router = useRouter();
  const [form, setForm] = useState<BlogFormState>(
    initialData || {
      title: "",
      slug: "",
      thumbnail: "",
      excerpt: "",
      content: "",
      tags: "",
      category: "",
      status: "draft" as "draft" | "published",
    },
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<BlogFieldErrors>({});

  const autoSlug = useMemo(() => slugify(form.title), [form.title]);

  function update<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setFieldErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  async function onSubmit(status: "draft" | "published") {
    setIsSubmitting(true);
    setError("");
    setFieldErrors({});

    const payload = {
      ...form,
      slug: form.slug || autoSlug,
      status,
      tags: form.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
    };

    const response = await fetch(mode === "create" ? "/api/blog" : `/api/blog/${blogId}`, {
      method: mode === "create" ? "POST" : "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    setIsSubmitting(false);

    if (!response.ok) {
      const result = (await response.json()) as { message?: string; errors?: BlogFieldErrors };
      setError(result.message || "Gagal menyimpan blog");
      setFieldErrors(result.errors || {});
      return;
    }

    router.push("/admin/blog");
    router.refresh();
  }

  return (
    <div className="space-y-4 rounded-xl border border-zinc-200 bg-white p-5 shadow-sm">
      <div>
        <label className="mb-1 block text-sm text-zinc-700">Title</label>
        <Input value={form.title} onChange={(event) => update("title", event.target.value)} placeholder="Judul blog" />
      </div>
      <div>
        <label className="mb-1 block text-sm text-zinc-700">Slug</label>
        <Input
          value={form.slug}
          onChange={(event) => update("slug", slugify(event.target.value))}
          placeholder={autoSlug || "slug-blog"}
        />
      </div>
      <div>
        <label className="mb-1 block text-sm text-zinc-700">Thumbnail URL</label>
        <Input
          value={form.thumbnail}
          onChange={(event) => update("thumbnail", event.target.value)}
          placeholder="https://..."
        />
      </div>
      <div>
        <label className="mb-1 block text-sm text-zinc-700">Excerpt</label>
        <textarea
          value={form.excerpt}
          onChange={(event) => update("excerpt", event.target.value)}
          rows={3}
          className="w-full rounded-md border border-zinc-200 p-3 text-sm outline-none ring-red-900/20 focus:ring-2"
        />
      </div>
      <div>
        <label className="mb-1 block text-sm text-zinc-700">Content (HTML/Markdown)</label>
        <div className="rounded-md border border-zinc-200 bg-white">
          <ReactQuill
            theme="snow"
            value={form.content}
            onChange={(value) => update("content", value)}
            className="min-h-[280px] [&_.ql-container]:min-h-[220px] [&_.ql-editor]:min-h-[220px]"
          />
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm text-zinc-700">Tags (comma separated)</label>
          <Input value={form.tags} onChange={(event) => update("tags", event.target.value)} placeholder="nextjs, prisma" />
        </div>
        <div>
          <label className="mb-1 block text-sm text-zinc-700">Category</label>
          <Input
            value={form.category}
            onChange={(event) => update("category", event.target.value)}
            placeholder="Web Development"
          />
        </div>
      </div>
      {error ? <p className="text-sm text-red-700">{error}</p> : null}
      {Object.keys(fieldErrors).length ? (
        <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-800">
          {Object.entries(fieldErrors).map(([field, messages]) => {
            if (!messages || !messages.length) {
              return null;
            }

            return (
              <p key={field}>
                <span className="font-medium">{fieldLabels[field as keyof BlogFormState] || field}:</span>{" "}
                {messages[0]}
              </p>
            );
          })}
        </div>
      ) : null}
      <div className="flex gap-2">
        <Button onClick={() => onSubmit("draft")} disabled={isSubmitting} type="button">
          Save Draft
        </Button>
        <Button variant="outline" onClick={() => onSubmit("published")} disabled={isSubmitting} type="button">
          Publish
        </Button>
      </div>
    </div>
  );
}
