export type GalleryVideo = {
  id: string;
  src: string;
  thumbnail?: string;
  label: string;
};

// Adicione os MP4 reais em public/videos/ e atualize ou expanda esta lista.
// O campo thumbnail é opcional e pode apontar para uma imagem de capa futura.
export const EVENTOS_VIDEOS = [
  { id: "evento-01", src: "/videos/evento1.mp4", label: "Evento 01" },
  { id: "evento-02", src: "/videos/evento2.mp4", label: "Evento 02" },
  { id: "evento-03", src: "/videos/evento3.mp4", label: "Evento 03" },
  { id: "evento-04", src: "/videos/evento4.mp4", label: "Evento 04" },
  { id: "evento-05", src: "/videos/evento5.mp4", label: "Evento 05" },
  { id: "evento-06", src: "/videos/evento6.mp4", label: "Evento 06" },
] satisfies readonly GalleryVideo[];
