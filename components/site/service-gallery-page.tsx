import type { GalleryVideo } from "@/lib/video-galleries";
import { FloatingWhatsApp } from "./floating-whatsapp";
import { Footer } from "./site-footer";
import { VideoGallery } from "./video-gallery";
import { WaveBackground } from "./wave-background";

type ServiceGalleryPageProps = {
  title: string;
  videos: readonly GalleryVideo[];
};

export function ServiceGalleryPage({ title, videos }: ServiceGalleryPageProps) {
  return (
    <>
      <main className="relative isolate min-h-screen overflow-hidden bg-[#080809] px-5 py-16 text-white sm:px-8 sm:py-20 lg:px-14 lg:py-24 xl:px-20">
        <WaveBackground intensity={0.12} glowOpacity={0.06} segments={2} />
        <div className="relative z-[1] mx-auto max-w-[1440px]">
          <VideoGallery title={title} videos={videos} backHref="/#servicos" />
        </div>
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
