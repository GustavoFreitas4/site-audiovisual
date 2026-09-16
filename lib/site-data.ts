import { Building2, Megaphone, PartyPopper } from "lucide-react";

export const WHATSAPP_URL =
  "https://wa.me/13981197505?text=Ol%C3%A1%21%20Vim%20pelo%20site%20da%20DOSKY%20e%20gostaria%20de%20solicitar%20um%20or%C3%A7amento.";

export const SERVICES = [
  {
    title: "Eventos",
    description:
      "Registros aéreos e terrestres que transformam celebrações em filmes cheios de emoção, movimento e memória.",
    tags: ["Casamentos", "Pré-wedding", "Chá revelação", "Aniversários"],
    icon: PartyPopper,
  },
  {
    title: "Publicidade",
    description:
      "Conteúdo visual para buffets, salões e fornecedores mostrarem seus espaços, serviços e experiências por novos ângulos.",
    tags: ["Espaços de festa", "Buffets", "Fornecedores", "Redes sociais"],
    icon: Megaphone,
  },
  {
    title: "Imóveis",
    description:
      "Imagens que revelam localização, escala e detalhes de propriedades para gerar mais interesse em cada anúncio.",
    tags: ["Casas", "Condomínios", "Terrenos", "Imobiliárias"],
    icon: Building2,
  },
] as const;
