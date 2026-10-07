import { Building2, Megaphone, PartyPopper } from "lucide-react";

export const WHATSAPP_URL =
  "https://wa.me/13981197505?text=Ol%C3%A1%21%20Vim%20pelo%20site%20do%20Gustavo%20Videomaker%20e%20gostaria%20de%20solicitar%20um%20or%C3%A7amento.";

export const SERVICES = [
  {
    title: "Eventos",
    description:
      "Registros aéreos e terrestres que transformam celebrações em filmes cheios de emoção, movimento e memória.",
    tags: ["Casamentos", "Pré-wedding", "Chá revelação", "Aniversários"],
    icon: PartyPopper,
  },
  {
    title: "Marcas e Negócios",
    description:
      "Produção audiovisual para empresas que querem transformar espaços e produtos em conteúdo que converte.",
    tags: ["Espaços comerciais", "Marcas", "Redes sociais", "Institucional"],
    icon: Megaphone,
  },
  {
    title: "Imóveis",
    description:
      "Do alto ao detalhe: imagens que dão vida a cada cômodo e aceleram a decisão de compra.",
    tags: ["Apartamentos", "Casas de alto padrão", "Condomínios", "Lançamentos"],
    icon: Building2,
  },
] as const;
