import { BlogForm } from "@/components/blog/blog-form";

export default function CreateBlogPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Create Blog</h1>
      <BlogForm mode="create" />
    </div>
  );
}
