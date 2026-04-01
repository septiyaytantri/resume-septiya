import Link from "next/link";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Blog", href: "/blog" },
  { label: "Login", href: "/login" },
];

export function PublicHeader() {
  return (
    <header className="border-b border-zinc-200 bg-white">
      <div className="container-width flex h-16 items-center justify-between">
        <Link href="/" className="text-lg font-semibold text-red-900">
          Septiya
        </Link>
        <nav className="flex items-center gap-5 text-sm text-zinc-700">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-red-900">
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
