export type GalleryVideo = {
  id: string;
  src: string;
  thumbnail?: string;
  label: string;
};

// Adicione ou substitua os MP4 em public/videos/eventos/ mantendo estes nomes.
// O campo thumbnail é opcional e pode apontar para uma imagem de capa futura.
export const EVENTOS_VIDEOS = [
  { id: "evento-01", src: "/videos/eventos/video-01.mp4", label: "Evento 01" },
  { id: "evento-02", src: "/videos/eventos/video-02.mp4", label: "Evento 02" },
  { id: "evento-03", src: "/videos/eventos/video-03.mp4", label: "Evento 03" },
  { id: "evento-04", src: "/videos/eventos/video-04.mp4", label: "Evento 04" },
  { id: "evento-05", src: "/videos/eventos/video-05.mp4", label: "Evento 05" },
  { id: "evento-06", src: "/videos/eventos/video-06.mp4", label: "Evento 06" },
] satisfies readonly GalleryVideo[];
