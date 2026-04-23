"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Car,
  Building2,
  BookOpen,
  Search,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import SearchAutocomplete from "@/components/SearchAutocomplete";

type NavItem = {
  label: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
};

type CarLite = {
  id: string;
  title: string;
};

const NAV_ITEMS: NavItem[] = [
  { label: "Beranda", href: "/" },
  { label: "Mobil", href: "/mobil", icon: Car },
  { label: "Showroom", href: "/showroom", icon: Building2 },
  { label: "Blog", href: "/blog", icon: BookOpen },
];

export default function Navbar({
  cars = [],
}: {
  cars?: CarLite[];
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [showSearchMobile, setShowSearchMobile] =
    useState(false);

  return (
    <header className="sticky top-0 z-40 bg-background/80 backdrop-blur border-b border-border">
      <div className="max-w-[1020px] mx-auto px-4 h-[56px] flex items-center gap-3">

        {/* LOGO */}
        <Link
          href="/"
          className="flex items-center gap-2 shrink-0"
        >
          <div className="relative w-8 h-8">
            <Image
              src="/logo.png"
              alt="Yasin Motor Group"
              fill
              priority
              sizes="32px"
              className="object-contain"
            />
          </div>

          <span className="text-[14px] font-semibold text-primary tracking-tight">
            Yasin Motor
          </span>
        </Link>

        {/* DESKTOP SEARCH */}
        <div className="hidden md:block flex-1 max-w-md mx-auto">
          <SearchAutocomplete cars={cars} />
        </div>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex items-center gap-5 text-[13px] font-medium text-foreground">
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

        {/* MOBILE ACTIONS */}
        <div className="flex items-center gap-2 ml-auto md:hidden">
          
          {/* SEARCH BUTTON */}
          <button
            onClick={() =>
              setShowSearchMobile((prev) => !prev)
            }
            className="p-2 rounded-lg hover:bg-muted transition"
          >
            <Search className="w-5 h-5 text-primary" />
          </button>

          {/* MENU BUTTON */}
          <button
            aria-label="Toggle Menu"
            onClick={() => setIsOpen((prev) => !prev)}
            className="p-2 rounded-lg hover:bg-muted transition"
          >
            {isOpen ? (
              <X className="w-5 h-5 text-primary" />
            ) : (
              <Menu className="w-5 h-5 text-primary" />
            )}
          </button>
        </div>
      </div>

      {/* MOBILE SEARCH EXPAND */}
      <AnimatePresence>
        {showSearchMobile && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
            className="md:hidden px-4 pb-3"
          >
            <SearchAutocomplete cars={cars} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
            className="md:hidden border-t border-border bg-background"
          >
            <div className="max-w-[1020px] mx-auto px-4 py-4 space-y-1">
              {NAV_ITEMS.map((item) => {
                const Icon = item.icon;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg text-[13px] font-medium hover:bg-muted transition"
                  >
                    {Icon && (
                      <Icon className="w-4 h-4 text-primary" />
                    )}
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}