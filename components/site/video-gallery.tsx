"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, Film } from "lucide-react";
import type { GalleryVideo } from "@/lib/video-galleries";

type VideoGalleryProps = {
  title: string;
  videos: readonly GalleryVideo[];
  onBack: () => void;
};

function supportsHoverAudio() {
  return typeof window !== "undefined" && window.matchMedia?.("(hover: hover) and (pointer: fine)")?.matches === true;
}

function GalleryVideoTile({ video, index }: { video: GalleryVideo; index: number }) {
  const tileRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isVisibleRef = useRef(false);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const tile = tileRef.current;
    if (!tile) return;

    if (!("IntersectionObserver" in window)) {
      isVisibleRef.current = true;
      setShouldLoad(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isVisible = entry?.isIntersecting ?? false;
        isVisibleRef.current = isVisible;

        if (isVisible) {
          setShouldLoad(true);
          videoRef.current?.play().catch(() => {
            // O placeholder permanece visível enquanto o arquivo real não estiver disponível.
          });
          return;
        }

        const media = videoRef.current;
        if (media) {
          media.muted = true;
          media.pause();
        }
      },
      { rootMargin: "80px 0px", threshold: 0.08 },
    );

    observer.observe(tile);
    return () => observer.disconnect();
  }, []);

  const enableAudio = () => {
    const media = videoRef.current;
    if (!media || hasError || !supportsHoverAudio()) return;

    media.muted = false;
    media.play().catch(() => {
      media.muted = true;
    });
  };

  const disableAudio = () => {
    const media = videoRef.current;
    if (media) media.muted = true;
  };

  return (
    <article
      ref={tileRef}
      aria-label={video.label}
      className="group relative aspect-square overflow-hidden bg-[#111113]"
      onMouseEnter={enableAudio}
      onMouseLeave={disableAudio}
    >
      <div className="absolute inset-0 grid place-items-center bg-[radial-gradient(circle_at_center,rgba(255,43,47,.12),transparent_62%)] text-center">
        <div className="flex flex-col items-center gap-3 text-white/38">
          <span className="grid size-12 place-items-center rounded-full border border-white/12 bg-black/25">
            <Film aria-hidden="true" size={20} strokeWidth={1.5} />
          </span>
          <span className="text-xs font-semibold uppercase tracking-[.16em]">
            {hasError ? "Vídeo em breve" : video.label}
          </span>
        </div>
      </div>

      <video
        ref={videoRef}
        className={`absolute inset-0 size-full object-cover transition duration-300 group-hover:scale-[1.03] group-hover:brightness-110 ${isReady && !hasError ? "opacity-100" : "opacity-0"}`}
        src={shouldLoad ? video.src : undefined}
        poster={video.thumbnail}
        preload="metadata"
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
        tabIndex={-1}
        onLoadedData={() => {
          setIsReady(true);
          if (isVisibleRef.current) {
            videoRef.current?.play().catch(() => {
              // O vídeo continua mudo e pronto para a próxima tentativa automática.
            });
          }
        }}
        onError={() => {
          setHasError(true);
          setIsReady(false);
        }}
      />

      <span className="pointer-events-none absolute left-3 top-3 grid size-7 place-items-center rounded-full bg-black/55 text-[.65rem] font-semibold text-white/70 backdrop-blur-sm">
        {String(index + 1).padStart(2, "0")}
      </span>
    </article>
  );
}

export function VideoGallery({ title, videos, onBack }: VideoGalleryProps) {
  const backButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    backButtonRef.current?.focus({ preventScroll: true });
  }, []);

  return (
    <section aria-label={`Galeria de vídeos de ${title}`}>
      <div className="mb-8 flex flex-col gap-6 border-b border-white/12 pb-7 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[.22em] text-[#ff2b2f]">Galeria de vídeos</p>
          <h2 className="text-[clamp(2.8rem,8vw,5.5rem)] font-semibold leading-[.9] tracking-[-.06em] text-white">{title}</h2>
        </div>
        <button
          ref={backButtonRef}
          type="button"
          onClick={onBack}
          className="group inline-flex min-h-12 w-fit items-center gap-3 rounded-full border border-white/15 bg-white/[.04] px-5 text-sm font-semibold text-white/78 transition duration-300 hover:-translate-y-0.5 hover:border-[#ff2b2f]/70 hover:bg-[#ff2b2f] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
        >
          <ArrowLeft aria-hidden="true" size={17} className="transition-transform duration-300 group-hover:-translate-x-0.5" />
          Voltar aos serviços
        </button>
      </div>

      {videos.length > 0 ? (
        <div className="grid grid-cols-1 gap-1.5 min-[420px]:grid-cols-2 lg:grid-cols-3 lg:gap-2">
          {videos.map((video, index) => (
            <GalleryVideoTile key={video.id} video={video} index={index} />
          ))}
        </div>
      ) : (
        <div className="grid min-h-64 place-items-center border border-dashed border-white/15 text-sm text-white/42">
          Os vídeos serão adicionados em breve.
        </div>
      )}
    </section>
  );
}
