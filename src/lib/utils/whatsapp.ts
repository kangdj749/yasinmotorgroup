// src/lib/utils/whatsapp.ts

export function generateWhatsappLink(message: string) {
  const phone = process.env.NEXT_PUBLIC_WA_NUMBER;
  const text = encodeURIComponent(message);

  return `https://wa.me/${phone}?text=${text}`;
}
