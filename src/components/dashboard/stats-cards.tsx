import { Card } from "@/components/ui/card";

type StatsCardsProps = {
  total: number;
  published: number;
  draft: number;
};

export function StatsCards({ total, published, draft }: StatsCardsProps) {
  const stats = [
    { label: "Total Blog", value: total },
    { label: "Published", value: published },
    { label: "Draft", value: draft },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {stats.map((item) => (
        <Card key={item.label}>
          <p className="text-sm text-zinc-500">{item.label}</p>
          <p className="mt-2 text-3xl font-semibold text-red-900">{item.value}</p>
        </Card>
      ))}
    </div>
  );
}
