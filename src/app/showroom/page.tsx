// src/app/showroom/page.tsx

import Link from "next/link";
import { MapPin } from "lucide-react";
import { getShowrooms } from "@/lib/data/getShowrooms";

export default async function ShowroomIndexPage() {
  const showrooms = await getShowrooms();

  return (
    <main
      className="
        max-w-[1020px] mx-auto
        px-3 sm:px-5
        py-5 sm:py-7
        space-y-5
      "
    >
      {/* HEADER */}
      <section className="space-y-1">
        <h1
          className="
            text-lg sm:text-xl
            font-bold
            tracking-tight
            leading-tight
          "
        >
          Showroom Mobil Bekas
        </h1>

        <p
          className="
            text-xs sm:text-sm
            text-muted-foreground
            max-w-md
            leading-snug
          "
        >
          Pilih showroom resmi dengan unit terbaik dan terpercaya.
        </p>
      </section>

      {/* SHOWROOM GRID */}
      <ul
        className="
          grid
          grid-cols-2
          sm:grid-cols-3
          lg:grid-cols-4
          gap-2.5 sm:gap-3
        "
      >
        {showrooms.map((s) => (
          <li key={s.slug}>
            <Link
              href={`/showroom/${s.slug}`}
              className="
                group block h-full
                rounded-xl
                border border-border
                bg-card
                px-3 py-3
                transition-all duration-200
                hover:border-primary/40
                hover:shadow-sm
              "
            >
              <div className="flex h-full flex-col justify-between gap-2">
                {/* TOP */}
                <div className="space-y-[2px]">
                  <span
                    className="
                      text-[10px]
                      uppercase
                      tracking-wide
                      text-muted-foreground
                    "
                  >
                    Showroom
                  </span>

                  <h2
                    className="
                      text-[13px] sm:text-sm
                      font-semibold
                      leading-snug
                      line-clamp-2
                    "
                  >
                    {s.name}
                  </h2>

                  {/* CITY */}
                  {s.city && (
                    <div
                      className="
                        flex items-center gap-1
                        text-[11px]
                        text-muted-foreground
                      "
                    >
                      <MapPin className="h-3 w-3 shrink-0" />
                      <span className="line-clamp-1">
                        {s.city}
                      </span>
                    </div>
                  )}
                </div>

                {/* CTA */}
                <span
                  className="
                    text-[11px]
                    font-medium
                    text-primary
                    group-hover:underline
                  "
                >
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