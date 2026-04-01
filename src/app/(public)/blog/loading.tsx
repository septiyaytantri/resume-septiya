export default function BlogLoading() {
  return (
    <div className="container-width py-12">
      <div className="mb-6 h-8 w-48 animate-pulse rounded bg-zinc-200" />
      <div className="grid gap-5 md:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="h-72 animate-pulse rounded-xl border border-zinc-200 bg-zinc-100" />
        ))}
      </div>
    </div>
  );
}
