// src/app/showroom/page.tsx

import Link from "next/link";
import { getShowrooms } from "@/lib/data/getShowrooms";

export default async function ShowroomIndexPage() {
  const showrooms = await getShowrooms();

  return (
    <main className="container py-6 space-y-6">
      <h1 className="text-2xl font-bold">
        Showroom Mobil Bekas
      </h1>

      <ul className="grid grid-cols-2 gap-4">
        {showrooms.map((s) => (
          <li key={s.slug}>
            <Link
              href={`/showroom/${s.slug}`}
              className="block p-4 border rounded-lg hover:border-primary"
            >
              Mobil Bekas {s.name}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
