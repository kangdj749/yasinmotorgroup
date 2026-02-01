import { cache } from "react";
import { getSheetsClient } from "./google-sheet-client";

/* ================= ENV ================= */
const DEFAULT_SHEET_ID = process.env.GOOGLE_SHEET_CARS_ID!;

/* ================= WRITE ================= */
/**
 * Append data ke sheet (existing)
 */
export async function appendOrder(row: (string | number)[]) {
  const sheets = getSheetsClient();

  await sheets.spreadsheets.values.append({
    spreadsheetId: DEFAULT_SHEET_ID,
    range: "cars!A:N",
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [row],
    },
  });
}


/* ================= HELPERS ================= */
function parseValue(value: string) {
  if (value === "") return "";

  const lower = value.toLowerCase();

  // BOOLEAN
  if (lower === "true") return true;
  if (lower === "false") return false;

  // NUMBER
  if (!isNaN(Number(value))) return Number(value);

  // ARRAY (comma separated)
  if (value.includes(",")) {
    return value.split(",").map((v) => v.trim());
  }

  return value;
}

/* ================= READ (CACHED) ================= */
export const getSheetRows = cache(
  async <T = Record<string, any>>(
    sheetName: string,
    spreadsheetId: string = DEFAULT_SHEET_ID
  ): Promise<T[]> => {
    const sheets = getSheetsClient();

    const res = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: `${sheetName}!A:Z`, // ✅ FIX UTAMA
    });

    const rows = res.data.values;
    if (!rows || rows.length < 2) return [];

    const headers = rows[0];

    return rows.slice(1).map((row) => {
      const obj: Record<string, any> = {};

      headers.forEach((header, index) => {
        obj[header] = parseValue(row[index] ?? "");
      });

      return obj as T;
    });
  }
);

/* ================= ALIAS ================= */
export async function getSheet<T = Record<string, any>>(
  sheetName: string,
  spreadsheetId?: string
): Promise<T[]> {
  return getSheetRows<T>(sheetName, spreadsheetId);
}
