import { NextResponse } from "next/server";
import slugify from "slugify";
import { nanoid } from "nanoid";
import { getSheetsClient } from "@/lib/google/sheets";

export const runtime = "nodejs";

const CARS_SHEET_ID = process.env.GOOGLE_SHEET_CARS_ID!;
const RANGE = "cars!A:N";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      title,
      description,
      brand,
      showroomId,
      showroomName,
      dp,
      installment,
      tenor,
      image,
      gallery,
      status,
    } = body;

    if (!title || !image) {
      return NextResponse.json(
        { error: "Title & image wajib" },
        { status: 400 }
      );
    }

    const id = nanoid(10);
    const slug = slugify(title, { lower: true, strict: true });
    const createdAt = new Date().toISOString();

    const row: (string | number)[] = [
      id,
      slug,
      title,
      description ?? "",
      brand ?? "",
      showroomId ?? "",
      showroomName ?? "",
      dp ?? 0,
      installment ?? 0,
      tenor ?? "",
      image,
      JSON.stringify(gallery ?? []),
      status ?? "available",
      createdAt,
    ];

    const sheets = getSheetsClient();

    await sheets.spreadsheets.values.append({
      spreadsheetId: CARS_SHEET_ID,
      range: RANGE,
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [row],
      },
    });

    return NextResponse.json({
      success: true,
      data: {
        id,
        slug,
      },
    });
  } catch (error) {
    console.error("CREATE CAR ERROR:", error);
    return NextResponse.json(
      { error: "Gagal simpan mobil" },
      { status: 500 }
    );
  }
}
