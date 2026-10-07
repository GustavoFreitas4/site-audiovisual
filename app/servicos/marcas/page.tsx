import { ServiceGalleryPage } from "@/components/site/service-gallery-page";
import { MARCAS_VIDEOS } from "@/lib/video-galleries";

export default function MarcasGalleryPage() {
  return <ServiceGalleryPage title="Marcas e Negócios" videos={MARCAS_VIDEOS} />;
}
