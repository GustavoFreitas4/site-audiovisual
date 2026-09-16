import { MessageCircle } from "lucide-react";
import { WHATSAPP_URL } from "@/lib/site-data";

export function FloatingWhatsApp() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noreferrer"
      aria-label="Solicitar orçamento pelo WhatsApp"
      className="whatsapp-float fixed bottom-5 right-5 z-50 grid size-14 place-items-center rounded-full bg-[#25d366] text-white shadow-[0_10px_35px_rgba(0,0,0,.35)] transition duration-300 hover:-translate-y-1 hover:bg-[#20bd5a] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:bottom-7 sm:right-7 sm:size-16"
    >
      <MessageCircle aria-hidden="true" size={27} strokeWidth={2.1} />
    </a>
  );
}
