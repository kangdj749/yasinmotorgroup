// types/car.ts

export type CarStatus =
  | "available"   // siap dijual
  | "booked"      // sudah dibooking
  | "sold"        // sudah terjual
  | "draft";      // belum publish (admin)

export type Car = {
  id: string;
  slug: string;

  title: string;        // Toyota Avanza 2019 AT
  description: string;

  brand: string;        // Toyota

  showroomId: string;   // bandung-1  (RELATION KEY)
  showroomName?: string; // Bandung Barat (DISPLAY / SEO)

  dp: number;           // 25000000
  installment: number; // 3500000
  tenor: string; // 4 tahun

  image: string;        // thumbnail (Cloudinary URL)
  gallery: string[];    // gallery images (Cloudinary)

  status: CarStatus;    // ⬅️ BARU (belum ditampilkan di UI)

  createdAt?: string;
};
