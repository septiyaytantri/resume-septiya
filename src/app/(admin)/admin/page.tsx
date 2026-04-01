import { db } from "@/lib/db";
import { StatsCards } from "@/components/dashboard/stats-cards";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const [total, published, draft] = await Promise.all([
    db.blog.count(),
    db.blog.count({ where: { status: "published" } }),
    db.blog.count({ where: { status: "draft" } }),
  ]);

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-semibold">Welcome back, Septiya 👋</h1>
        <p className="text-sm text-zinc-500">Overview statistik blog kamu</p>
      </div>
      <StatsCards total={total} published={published} draft={draft} />
    </div>
  );
}
