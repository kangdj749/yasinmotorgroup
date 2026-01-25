// src/lib/analytics/trackEvent.ts

export function trackEvent(
  event: string,
  payload: Record<string, any> = {}
) {
  if (typeof window === "undefined") return;

  // Google Analytics 4
  if (typeof window.gtag === "function") {
    window.gtag("event", event, payload);
  }

  // 🔮 future: Meta Pixel / TikTok Pixel
}
