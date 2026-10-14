import type { GalleryVideo } from "../data/video-galleries";
import { VideoGallery } from "./VideoGallery";

export type ServiceGalleryPageProps = {
  title: string;
  videos: readonly GalleryVideo[];
  backHref?: string;
};

export function ServiceGalleryPage({
  title,
  videos,
  backHref = "/#servicos",
}: ServiceGalleryPageProps) {
  return (
    <main className="min-h-screen overflow-hidden bg-[#080809] px-5 py-16 text-white sm:px-8 sm:py-20 lg:px-14 lg:py-24 xl:px-20">
      <div className="mx-auto max-w-[1440px]">
        <VideoGallery title={title} videos={videos} backHref={backHref} />
      </div>
    </main>
  );
}
