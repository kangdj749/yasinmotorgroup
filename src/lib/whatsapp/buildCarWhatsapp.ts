// src/lib/whatsapp/buildCarWhatsapp.ts

import { Car } from "@/types";
import { formatRupiah } from "@/lib/formatters/formatRupiah";

export function buildCarWhatsapp(car: Car) {
  const message = `
Halo Admin,
Saya tertarik dengan mobil berikut:

🚗 ${car.title}
🏢 Showroom: ${car.showroomId}

💰 DP: ${formatRupiah(car.dp)}
📆 Angsuran: ${formatRupiah(car.installment)} / bulan
⏳ Tenor: ${car.tenor} bulan

Mohon info lengkap & ketersediaannya.
Terima kasih.
  `.trim();

  return `https://wa.me/62XXXXXXXXXX?text=${encodeURIComponent(message)}`;
}
