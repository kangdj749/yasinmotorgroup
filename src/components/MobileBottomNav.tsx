"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Car, MapPin, BookOpen } from "lucide-react";
import clsx from "clsx";
import { useMemo } from "react";

/* ❌ Halaman yang TIDAK perlu bottom nav */
const HIDDEN_PATHS = [
  "/checkout",
  "/payment",
  "/success",
  "/admin",
];

export default function MobileBottomNav() {
  const pathname = usePathname();

  const isHidden = useMemo(
    () =>
      HIDDEN_PATHS.some(
        (path) => pathname === path || pathname.startsWith(`${path}/`)
      ),
    [pathname]
  );

  if (isHidden) return null;

  const nav = [
    { label: "Beranda", href: "/", icon: Home },
    { label: "Mobil", href: "/mobil", icon: Car },
    { label: "Showroom", href: "/showroom", icon: MapPin },
    { label: "Blog", href: "/blog", icon: BookOpen },
  ];

  return (
    <nav
      className="
        fixed bottom-3 left-1/2 -translate-x-1/2
        z-50 md:hidden
        w-[92%]
        bg-card/95 backdrop-blur-xl
        border border-border
        rounded-2xl
        shadow-xl
        px-2
        pb-[env(safe-area-inset-bottom)]
      "
    >
      <ul className="flex items-center justify-between">
        {nav.map(({ label, href, icon: Icon }) => {
          const active =
            pathname === href || pathname.startsWith(`${href}/`);

          return (
            <li key={href} className="flex-1">
              <Link
                href={href}
                className={clsx(
                  `
                  flex flex-col items-center gap-1
                  py-2
                  text-xs font-medium
                  transition
                `,
                  active
                    ? "text-primary"
                    : "text-foreground/60 hover:text-foreground"
                )}
              >
                <div
                  className={clsx(
                    `
                    flex items-center justify-center
                    w-10 h-10 rounded-xl
                    transition
                  `,
                    active
                      ? "bg-primary/15"
                      : "hover:bg-muted"
                  )}
                >
                  <Icon size={20} />
                </div>

                <span>{label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
