"use client";

import Link from "next/link";
import { useScrollSpy } from "@/hooks/use-scroll-spy";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

const navItems = [
  { id: "home", label: "Home" },
  { id: "profile", label: "Profile" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "organizational", label: "Organizational" },
  { id: "knowledge", label: "Knowledge" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

export function LandingNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const activeId = useScrollSpy(navItems.map((item) => item.id));

  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 50);
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function scrollToSection(id: string) {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    }
  }

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        isScrolled ? "bg-white border-b border-zinc-200 shadow-sm" : "bg-transparent",
      )}
    >
      <div className="container-width flex h-16 items-center justify-between">
        <button
          onClick={() => scrollToSection("home")}
          className="text-lg font-semibold text-red-900 hover:text-red-800"
        >
          Septiya
        </button>

        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={cn(
                "px-3 py-2 text-sm font-medium transition-colors relative",
                activeId === item.id
                  ? "text-red-900"
                  : "text-zinc-600 hover:text-zinc-900",
              )}
            >
              {item.label}
              {activeId === item.id && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-900" />
              )}
            </button>
          ))}
          <Link
            href="/blog"
            className="ml-2 px-3 py-2 text-sm font-medium text-zinc-600 hover:text-zinc-900"
          >
            Blog
          </Link>
        </nav>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-red-900"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>
      </div>

      {isOpen && (
        <nav className="md:hidden bg-white border-b border-zinc-200">
          <div className="container-width py-2 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={cn(
                  "w-full text-left px-3 py-2 text-sm rounded transition-colors",
                  activeId === item.id
                    ? "bg-red-50 text-red-900"
                    : "text-zinc-600 hover:bg-zinc-50",
                )}
              >
                {item.label}
              </button>
            ))}
            <Link
              href="/blog"
              className="block px-3 py-2 text-sm text-zinc-600 hover:bg-zinc-50 rounded"
            >
              Blog
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
