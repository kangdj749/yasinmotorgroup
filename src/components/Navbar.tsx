"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Search, Car, Building2, BookOpen } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const NAV_ITEMS = [
  { label: "Beranda", href: "/" },
  { label: "Mobil", href: "/mobil", icon: Car },
  { label: "Showroom", href: "/showroom", icon: Building2 },
  { label: "Blog", href: "/blog", icon: BookOpen },
];

export default function Navbar() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!search.trim()) return;

    router.push(`/mobil?q=${encodeURIComponent(search)}`);
    setSearch("");
    setIsOpen(false);
  }

  return (
    <header className="sticky top-0 z-40 bg-background/80 backdrop-blur border-b border-border">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2">
          <div className="relative w-9 h-9">
            <Image
              src="/logo.png"
              alt="Showroom Mobil Bekas"
              fill
              className="object-contain"
              priority
            />
          </div>
          <span className="font-semibold text-primary text-lg">
            Yasin Motor Group
          </span>
        </Link>

        {/* DESKTOP MENU */}
        <nav className="hidden md:flex gap-8 text-sm font-medium">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="hover:text-primary transition"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* RIGHT */}
        <div className="flex items-center gap-3">
          {/* SEARCH */}
          <form
            onSubmit={handleSearch}
            className="hidden md:flex items-center gap-2 bg-card border border-border rounded-full px-4 py-1.5"
          >
            <Search size={16} className="text-muted-foreground" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari mobil…"
              className="bg-transparent text-sm outline-none w-36"
            />
          </form>

          {/* MOBILE MENU */}
          <button
            onClick={() => setIsOpen((p) => !p)}
            className="md:hidden text-primary"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* MOBILE DRAWER */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="md:hidden bg-background border-b border-border"
          >
            <div className="p-5 space-y-5">
              <form
                onSubmit={handleSearch}
                className="flex items-center gap-2 bg-card border border-border rounded-xl px-3 py-2"
              >
                <Search size={16} />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Cari mobil…"
                  className="flex-1 bg-transparent outline-none text-sm"
                />
              </form>

              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="block font-medium hover:text-primary"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
