import { NextResponse } from "next/server";
import { getAllCars } from "@/lib/data/cars";

export async function GET() {
  try {
    const cars = await getAllCars();

    return NextResponse.json(cars);
  } catch (error) {
    console.error("ADMIN LIST ERROR:", error);
    return NextResponse.json(
      { error: "Gagal mengambil data mobil" },
      { status: 500 }
    );
  }
}
