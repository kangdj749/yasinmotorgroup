// src/app/showroom/page.tsx

import Link from "next/link";
import { getShowrooms } from "@/lib/data/getShowrooms";

export default async function ShowroomIndexPage() {
  const showrooms = await getShowrooms();

  return (
    <main
      className="
        max-w-6xl mx-auto
        px-4 sm:px-6
        py-6 space-y-6
      "
    >
      {/* HEADER */}
      <section className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-bold">
          Showroom Mobil Bekas
        </h1>
        <p className="text-sm text-muted-foreground max-w-xl">
          Pilih showroom resmi dengan unit terbaik & terpercaya.
        </p>
      </section>

      {/* SHOWROOM GRID */}
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {showrooms.map((s) => (
          <li key={s.slug}>
            <Link
              href={`/showroom/${s.slug}`}
              className="
                group block
                aspect-square
                rounded-2xl
                border border-border
                bg-card
                p-4
                shadow-card
                hover:shadow-soft
                transition
              "
            >
              <div className="h-full flex flex-col justify-between">
                <div className="space-y-1">
                  <span className="text-xs text-muted-foreground">
                    Showroom
                  </span>
                  <h2 className="font-semibold text-sm sm:text-base leading-snug line-clamp-2">
                    {s.name}
                  </h2>
                </div>

                <span className="text-xs text-primary font-medium">
                  Lihat Unit →
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
