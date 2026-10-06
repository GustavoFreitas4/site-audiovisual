export type GalleryVideo = {
  id: string;
  src?: string;
  thumbnail?: string;
  label: string;
};

// Adicione ou substitua os MP4 em public/videos/eventos/ mantendo estes nomes.
// O campo thumbnail é opcional e pode apontar para uma imagem de capa futura.
export const EVENTOS_VIDEOS = [
  { id: "evento-01", src: "/videos/eventos/video-01.mp4?v=2", label: "Evento 01" },
  { id: "evento-02", src: "/videos/eventos/video-02.mp4", label: "Evento 02" },
  { id: "evento-03", src: "/videos/eventos/video-03.mp4", label: "Evento 03" },
  { id: "evento-04", src: "/videos/eventos/video-04.mp4", label: "Evento 04" },
  { id: "evento-05", src: "/videos/eventos/video-05.mp4", label: "Evento 05" },
  { id: "evento-06", src: "/videos/eventos/video-06.mp4", label: "Evento 06" },
] satisfies readonly GalleryVideo[];

// Adicione ou substitua os MP4 em public/videos/marcas/ mantendo estes nomes.
// Enquanto um arquivo não existir, a galeria exibe o placeholder "Vídeo em breve".
export const MARCAS_VIDEOS = [
  { id: "marca-01", src: "/videos/marcas/video-01.mp4", label: "Marca 01" },
  { id: "marca-02", label: "Marca 02" },
  { id: "marca-03", label: "Marca 03" },
  { id: "marca-04", label: "Marca 04" },
  { id: "marca-05", label: "Marca 05" },
  { id: "marca-06", label: "Marca 06" },
] satisfies readonly GalleryVideo[];

// Adicione ou substitua os MP4 em public/videos/imoveis/ mantendo estes nomes.
// Enquanto um arquivo não existir, a galeria exibe o placeholder "Vídeo em breve".
export const IMOVEIS_VIDEOS = [
  { id: "imovel-01", src: "/videos/imoveis/video-01.mp4", label: "Imóvel 01" },
  { id: "imovel-02", src: "/videos/imoveis/video-02.mp4", label: "Imóvel 02" },
  { id: "imovel-03", src: "/videos/imoveis/video-03.mp4", label: "Imóvel 03" },
  { id: "imovel-04", src: "/videos/imoveis/video-04.mp4", label: "Imóvel 04" },
  { id: "imovel-05", src: "/videos/imoveis/video-05.mp4", label: "Imóvel 05" },
  { id: "imovel-06", src: "/videos/imoveis/video-06.mp4", label: "Imóvel 06" },
] satisfies readonly GalleryVideo[];
