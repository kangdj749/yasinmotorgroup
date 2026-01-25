import { getAllCars } from "@/lib/data/cars";
import Image from "next/image";

export default async function AdminCarsPage() {
  const cars = await getAllCars();

  return (
    <main className="p-4 space-y-4">
      <h1 className="text-xl font-bold">Daftar Mobil</h1>

      {cars.length === 0 && (
        <p className="text-sm text-muted-foreground">
          Belum ada data mobil
        </p>
      )}

      <ul className="space-y-3">
        {cars.map((car) => (
          <li
            key={car.id}
            className="flex gap-3 p-3 border rounded-xl bg-card"
          >
            <Image
              src={car.image}
              alt={car.title}
              width={96}
              height={72}
              className="rounded-lg object-cover"
            />

            <div className="flex-1">
              <p className="font-semibold leading-tight">
                {car.title}
              </p>

              <p className="text-xs text-muted-foreground">
                {car.showroomName ?? car.showroomId}
              </p>

              <p className="text-xs">
                DP: Rp {car.dp.toLocaleString("id-ID")}
              </p>

              <p className="text-[11px] mt-1 inline-block px-2 py-0.5 rounded bg-green-100 text-green-700">
                {car.status ?? "available"}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
