import { ServiceGalleryPage } from "@/components/site/service-gallery-page";
import { EVENTOS_VIDEOS } from "@/lib/video-galleries";

export default function EventosGalleryPage() {
  return <ServiceGalleryPage title="Eventos" videos={EVENTOS_VIDEOS} />;
}
