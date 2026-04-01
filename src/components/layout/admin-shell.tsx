"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const menus = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/blog", label: "Blog" },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  async function onLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
  }

  return (
    <div className="min-h-screen bg-zinc-50">
      <div className="grid min-h-screen w-full grid-cols-1 md:grid-cols-[240px_minmax(0,1fr)]">
        <aside className="border-r border-zinc-200 bg-white p-5">
          <p className="mb-6 text-lg font-semibold text-red-900">Admin Panel</p>
          <nav className="space-y-2">
            {menus.map((menu) => (
              <Link
                key={menu.href}
                href={menu.href}
                className={cn(
                  "block rounded-md px-3 py-2 text-sm",
                  pathname === menu.href ? "bg-red-50 text-red-900" : "text-zinc-700 hover:bg-zinc-100",
                )}
              >
                {menu.label}
              </Link>
            ))}
          </nav>
          <Button variant="outline" onClick={onLogout} className="mt-6 w-full">
            Logout
          </Button>
        </aside>
        <main className="min-w-0">
          <div className="border-b border-zinc-200 bg-white px-6 py-4">
            <p className="text-sm text-zinc-500">Simple CMS</p>
          </div>
          <div className="p-6">{children}</div>
        </main>
      </div>
    </div>
  );
}
