export type GalleryVideo = {
  id: string;
  label: string;
  src?: string;
  thumbnail?: string;
  /** Opcional: reinicia o vídeo ao atingir este segundo. */
  loopEndSeconds?: number;
};

export type ServiceGalleryDefinition = {
  id: "eventos" | "marcas" | "imoveis";
  title: string;
  description: string;
  tags: readonly string[];
  href: string;
};

export const serviceGalleries = [
  {
    id: "eventos",
    title: "Eventos",
    description:
      "Registros aéreos e terrestres que transformam celebrações em filmes cheios de emoção, movimento e memória.",
    tags: ["Casamentos", "Pré-wedding", "Chá revelação", "Aniversários"],
    href: "/servicos/eventos",
  },
  {
    id: "marcas",
    title: "Marcas e Negócios",
    description:
      "Produção audiovisual para empresas que querem transformar espaços e produtos em conteúdo que converte.",
    tags: ["Espaços comerciais", "Marcas", "Redes sociais", "Institucional"],
    href: "/servicos/marcas",
  },
  {
    id: "imoveis",
    title: "Imóveis",
    description:
      "Do alto ao detalhe: imagens que dão vida a cada cômodo e aceleram a decisão de compra.",
    tags: ["Apartamentos", "Casas de alto padrão", "Condomínios", "Lançamentos"],
    href: "/servicos/imoveis",
  },
] as const satisfies readonly ServiceGalleryDefinition[];

export const eventosVideos = [
  { id: "evento-01", src: "/videos/eventos/video-01.mp4", label: "Evento 01" },
  { id: "evento-02", src: "/videos/eventos/video-02.mp4", label: "Evento 02" },
  { id: "evento-03", src: "/videos/eventos/video-03.mp4", label: "Evento 03" },
  { id: "evento-04", src: "/videos/eventos/video-04.mp4", label: "Evento 04" },
  { id: "evento-05", src: "/videos/eventos/video-05.mp4", label: "Evento 05" },
  { id: "evento-06", src: "/videos/eventos/video-06.mp4", label: "Evento 06" },
] satisfies readonly GalleryVideo[];

export const marcasVideos = [
  { id: "marca-01", src: "/videos/marcas/video-01.mp4", label: "Marca 01" },
  { id: "marca-02", label: "Marca 02" },
  { id: "marca-03", label: "Marca 03" },
  { id: "marca-04", label: "Marca 04" },
  { id: "marca-05", label: "Marca 05" },
  { id: "marca-06", label: "Marca 06" },
] satisfies readonly GalleryVideo[];

export const imoveisVideos = [
  { id: "imovel-01", src: "/videos/imoveis/video-01.mp4", label: "Imóvel 01" },
  { id: "imovel-02", src: "/videos/imoveis/video-02.mp4", label: "Imóvel 02" },
  { id: "imovel-03", src: "/videos/imoveis/video-03.mp4", label: "Imóvel 03" },
  { id: "imovel-04", src: "/videos/imoveis/video-04.mp4", label: "Imóvel 04", loopEndSeconds: 60 },
  { id: "imovel-05", src: "/videos/imoveis/video-05.mp4", label: "Imóvel 05" },
  { id: "imovel-06", src: "/videos/imoveis/video-06.mp4", label: "Imóvel 06" },
] satisfies readonly GalleryVideo[];
