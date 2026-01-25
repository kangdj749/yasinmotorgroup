// src/components/car/car-detail-info.tsx

import { Car } from "@/types";
import { formatRupiah } from "@/lib/formatters/formatRupiah";
import { buildCarWhatsapp } from "@/lib/whatsapp/buildCarWhatsapp";

type Props = {
  car: Car;
};

export default function CarDetailInfo({ car }: Props) {
  const waUrl = buildCarWhatsapp(car);

  return (
    <div className="space-y-4">
      {/* Title */}
      <h1 className="text-xl font-bold leading-tight">
        {car.title}
      </h1>

      {/* Price */}
      <div className="rounded-xl border bg-muted/40 p-4 space-y-2">
        <div>
          <p className="text-sm text-muted-foreground">DP mulai</p>
          <p className="text-2xl font-bold text-primary">
            {formatRupiah(car.dp)}
          </p>
        </div>

        <p className="text-sm">
          Angsuran{" "}
          <span className="font-semibold">
            {formatRupiah(car.installment)}
          </span>{" "}
          / bulan{" "}
          
        </p>
      </div>

      {/* CTA */}
      <a
        href={waUrl}
        target="_blank"
        className="block w-full rounded-xl bg-primary py-4 text-center font-semibold text-white hover:opacity-90"
      >
        Hubungi via WhatsApp
      </a>

      {/* Meta */}
      <div className="text-sm text-muted-foreground flex justify-between">
        <span>{car.brand}</span>
        <span>{car.showroomName}</span>
      </div>
    </div>
  );
}
