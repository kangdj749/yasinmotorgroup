export function safeJsonParse<T>(
  value: unknown,
  fallback: T
): T {
  if (typeof value !== "string" || value.trim() === "") {
    return fallback;
  }

  try {
    return JSON.parse(value) as T;
  } catch (error) {
    console.error("❌ JSON parse failed:", value);
    return fallback;
  }
}
