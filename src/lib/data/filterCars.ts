// src/lib/utils/filterCars.ts

import { Car } from "@/types/car";

/* ===============================
   TYPES
================================ */
export type FilterParams = {
  brand?: string;
  model?: string;

  minDp?: number;
  maxDp?: number;

  minInstallment?: number;
  maxInstallment?: number;

  showroom?: string;
  sort?: "dp_asc" | "dp_desc" | "newest";
};

/* ===============================
   TYPE GUARD
================================ */
const isNumber = (val: unknown): val is number => {
  return typeof val === "number" && !isNaN(val);
};

/* ===============================
   SAFE DATE PARSER
================================ */
const toTimestamp = (date?: string): number => {
  if (!date) return 0;
  const t = new Date(date).getTime();
  return isNaN(t) ? 0 : t;
};

/* ===============================
   MAIN FILTER
================================ */
export function filterCars(
  cars: Car[],
  params: FilterParams
): Car[] {
  let result: Car[] = [...cars];

  /* ================= BRAND ================= */
  if (params.brand) {
    const brand = params.brand.toLowerCase();

    result = result.filter(
      (c) => c.brand?.toLowerCase() === brand
    );
  }

  /* ================= MODEL ================= */
  if (params.model) {
    const model = params.model.toLowerCase();

    result = result.filter(
      (c) => c.model?.toLowerCase() === model
    );
  }

  /* ================= DP ================= */
  if (isNumber(params.minDp)) {
    const minDp = params.minDp;

    result = result.filter((c) => c.dp >= minDp);
  }

  if (isNumber(params.maxDp)) {
    const maxDp = params.maxDp;

    result = result.filter((c) => c.dp <= maxDp);
  }

  /* ================= CICILAN ================= */
  if (isNumber(params.minInstallment)) {
    const minInstallment = params.minInstallment;

    result = result.filter(
      (c) => c.installment >= minInstallment
    );
  }

  if (isNumber(params.maxInstallment)) {
    const maxInstallment = params.maxInstallment;

    result = result.filter(
      (c) => c.installment <= maxInstallment
    );
  }

  /* ================= SHOWROOM ================= */
  if (params.showroom) {
    result = result.filter(
      (c) => c.showroomId === params.showroom
    );
  }

  /* ================= SORT ================= */
  switch (params.sort) {
    case "dp_asc":
      result = [...result].sort((a, b) => a.dp - b.dp);
      break;

    case "dp_desc":
      result = [...result].sort((a, b) => b.dp - a.dp);
      break;

    case "newest":
      result = [...result].sort(
        (a, b) =>
          toTimestamp(b.createdAt) -
          toTimestamp(a.createdAt)
      );
      break;
  }

  return result;
}