import { ServiceGalleryPage } from "@/components/site/service-gallery-page";
import { IMOVEIS_VIDEOS } from "@/lib/video-galleries";

export default function ImoveisGalleryPage() {
  return <ServiceGalleryPage title="Imóveis" videos={IMOVEIS_VIDEOS} />;
}
