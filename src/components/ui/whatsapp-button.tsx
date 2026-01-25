// src/components/ui/whatsapp-button.tsx

"use client";

import { trackEvent } from "@/lib/analytics/trackEvent";
import { generateWhatsappLink } from "@/lib/utils/whatsapp";

type Props = {
  carTitle: string;
  showroomName: string; // ⬅️ WAJIB STRING
  source: string;
};

export function WhatsappButton({
  carTitle,
  showroomName,
  source,
}: Props) {
  const message = `Halo, saya tertarik dengan ${carTitle} di showroom ${showroomName}.`;

  const handleClick = () => {
    trackEvent("whatsapp_click", {
      source,
      car_title: carTitle,
      showroom: showroomName,
    });
  };

  return (
    <a
      href={generateWhatsappLink(message)}
      onClick={handleClick}
      target="_blank"
      rel="noopener noreferrer"
      className="
        block w-full text-center
        bg-green-600 hover:bg-green-700
        text-white py-3 rounded-xl
        font-semibold transition
      "
    >
      Chat via WhatsApp
    </a>
  );
}
