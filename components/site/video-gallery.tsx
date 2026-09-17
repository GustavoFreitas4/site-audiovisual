"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, Film, Volume2, VolumeX, X } from "lucide-react";
import type { GalleryVideo } from "@/lib/video-galleries";

type VideoGalleryProps = {
  title: string;
  videos: readonly GalleryVideo[];
  onBack: () => void;
};

type GalleryVideoTileProps = {
  video: GalleryVideo;
  index: number;
  isFocused: boolean;
  isDimmed: boolean;
  onFocus: () => void;
  onBlur: () => void;
};

type SpotlightBox = {
  left: number;
  top: number;
  width: number;
  height: number;
};

const SPOTLIGHT_DURATION = 300;

function GalleryVideoTile({ video, index, isFocused, isDimmed, onFocus, onBlur }: GalleryVideoTileProps) {
  const tileRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isVisibleRef = useRef(false);
  const isFocusedRef = useRef(false);
  const hoverCloseTimerRef = useRef<number | null>(null);
  const exitTimerRef = useRef<number | null>(null);
  const isClosingRef = useRef(false);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isAudioActive, setIsAudioActive] = useState(false);
  const [spotlightBox, setSpotlightBox] = useState<SpotlightBox | null>(null);

  const resetAudio = () => {
    const media = videoRef.current;
    if (media) media.muted = true;
    setIsAudioActive(false);
  };

  const clearHoverClose = () => {
    if (hoverCloseTimerRef.current === null) return;
    window.clearTimeout(hoverCloseTimerRef.current);
    hoverCloseTimerRef.current = null;
  };

  const closeSpotlight = () => {
    if (!isFocused || isClosingRef.current) return;

    clearHoverClose();
    resetAudio();
    isClosingRef.current = true;

    const tile = tileRef.current;
    if (tile) {
      const rect = tile.getBoundingClientRect();
      setSpotlightBox({ left: rect.left, top: rect.top, width: rect.width, height: rect.height });
    }

    if (exitTimerRef.current !== null) window.clearTimeout(exitTimerRef.current);
    exitTimerRef.current = window.setTimeout(() => {
      onBlur();
      setSpotlightBox(null);
      isClosingRef.current = false;
      exitTimerRef.current = null;
    }, SPOTLIGHT_DURATION);
  };

  const scheduleSpotlightClose = () => {
    clearHoverClose();
    hoverCloseTimerRef.current = window.setTimeout(closeSpotlight, 180);
  };

  useEffect(() => {
    isFocusedRef.current = isFocused;
  }, [isFocused]);

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

        if (!isFocusedRef.current) {
          const media = videoRef.current;
          if (media) media.pause();
          resetAudio();
        }
      },
      { rootMargin: "80px 0px", threshold: 0.08 },
    );

    observer.observe(tile);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isFocused) {
      resetAudio();
      if (!isVisibleRef.current) videoRef.current?.pause();
      setSpotlightBox(null);
      isClosingRef.current = false;
      clearHoverClose();
      return;
    }

    const centerSpotlight = () => {
      const tile = tileRef.current;
      if (!tile) return;

      const rect = tile.getBoundingClientRect();
      let width = Math.min(rect.width * 1.18, window.innerWidth * 0.82);
      let height = width * (16 / 9);
      const maxHeight = window.innerHeight * 0.86;

      if (height > maxHeight) {
        height = maxHeight;
        width = height * (9 / 16);
      }

      setSpotlightBox({
        left: (window.innerWidth - width) / 2,
        top: (window.innerHeight - height) / 2,
        width,
        height,
      });
    };

    let secondFrame = 0;
    const firstFrame = window.requestAnimationFrame(() => {
      secondFrame = window.requestAnimationFrame(centerSpotlight);
    });

    const handleScroll = () => {
      const tile = tileRef.current;
      if (!tile) return;
      const rect = tile.getBoundingClientRect();
      const isFarFromGrid = rect.bottom < -window.innerHeight * 0.6 || rect.top > window.innerHeight * 1.6;
      if (isFarFromGrid) closeSpotlight();
    };

    window.addEventListener("resize", centerSpotlight);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.cancelAnimationFrame(firstFrame);
      if (secondFrame) window.cancelAnimationFrame(secondFrame);
      window.removeEventListener("resize", centerSpotlight);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isFocused]);

  useEffect(
    () => () => {
      if (hoverCloseTimerRef.current !== null) window.clearTimeout(hoverCloseTimerRef.current);
      if (exitTimerRef.current !== null) window.clearTimeout(exitTimerRef.current);
    },
    [],
  );

  const toggleAudio = () => {
    const media = videoRef.current;
    if (!media || hasError) return;

    if (isAudioActive) {
      resetAudio();
      return;
    }

    media.muted = false;
    media
      .play()
      .then(() => setIsAudioActive(true))
      .catch(() => resetAudio());
  };

  const focusVideo = () => {
    const tile = tileRef.current;
    if (!tile || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    clearHoverClose();
    isClosingRef.current = false;
    const rect = tile.getBoundingClientRect();
    setSpotlightBox({ left: rect.left, top: rect.top, width: rect.width, height: rect.height });
    onFocus();
  };

  const showSoundLabel = isFocused && !isAudioActive;

  return (
    <article
      ref={tileRef}
      aria-label={video.label}
      className={`group relative aspect-[9/16] transition-opacity duration-300 ${isFocused ? "z-[90]" : "z-0"} ${isDimmed ? "opacity-35" : "opacity-100"}`}
      onMouseEnter={focusVideo}
      onMouseLeave={scheduleSpotlightClose}
    >
      <div
        className={`${isFocused && spotlightBox ? "fixed z-[100]" : "absolute inset-0"} overflow-hidden bg-[#111113] shadow-none transition-[left,top,width,height,box-shadow] duration-300 ease-out ${isFocused ? "shadow-[0_30px_90px_rgba(0,0,0,.78)]" : ""}`}
        style={
          isFocused && spotlightBox
            ? {
                left: spotlightBox.left,
                top: spotlightBox.top,
                width: spotlightBox.width,
                height: spotlightBox.height,
              }
            : undefined
        }
        onMouseEnter={clearHoverClose}
        onMouseLeave={scheduleSpotlightClose}
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
          className={`absolute inset-0 size-full object-cover transition duration-300 group-hover:brightness-110 ${isReady && !hasError ? "opacity-100" : "opacity-0"}`}
          src={shouldLoad ? video.src : undefined}
          poster={video.thumbnail}
          preload="metadata"
          autoPlay
          muted={!isAudioActive}
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
            resetAudio();
            setHasError(true);
            setIsReady(false);
          }}
        />

        <span className="pointer-events-none absolute left-3 top-3 grid size-7 place-items-center rounded-full bg-black/55 text-[.65rem] font-semibold text-white/70 backdrop-blur-sm">
          {String(index + 1).padStart(2, "0")}
        </span>

        {isFocused ? (
          <button
            type="button"
            aria-label={`Fechar destaque de ${video.label}`}
            onClick={(event) => {
              event.stopPropagation();
              closeSpotlight();
            }}
            className="absolute right-3 top-3 z-10 grid size-10 cursor-pointer place-items-center rounded-full border border-white/20 bg-black/60 text-white/85 backdrop-blur-md transition duration-200 hover:rotate-90 hover:border-[#ef4444]/70 hover:bg-[#ef4444] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            <X aria-hidden="true" size={21} />
          </button>
        ) : null}

        <button
          type="button"
          aria-label={isAudioActive ? `Desativar som de ${video.label}` : `Ativar som de ${video.label}`}
          aria-pressed={isAudioActive}
          onClick={(event) => {
            event.stopPropagation();
            toggleAudio();
          }}
          className={`absolute bottom-3 right-3 flex h-11 cursor-pointer items-center justify-center overflow-hidden rounded-full border border-[#ef4444]/35 bg-black/60 text-[#ef4444] shadow-lg backdrop-blur-md transition-[width,background-color,border-color] duration-300 hover:border-[#ef4444]/75 hover:bg-black/80 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ef4444] ${showSoundLabel ? "w-36 gap-2 px-3" : "w-11 px-2.5"}`}
        >
          <span className="relative grid size-6 shrink-0 place-items-center">
            <VolumeX
              aria-hidden="true"
              size={24}
              className={`absolute transition-opacity duration-200 ${isAudioActive ? "opacity-0" : "opacity-100"}`}
            />
            <Volume2
              aria-hidden="true"
              size={24}
              className={`absolute transition-opacity duration-200 ${isAudioActive ? "opacity-100" : "opacity-0"}`}
            />
          </span>
          <span
            className={`whitespace-nowrap text-xs font-semibold text-white/90 transition-[width,opacity] duration-200 ${showSoundLabel ? "w-auto opacity-100" : "pointer-events-none w-0 opacity-0"}`}
          >
            Ativar som
          </span>
        </button>
      </div>
    </article>
  );
}

export function VideoGallery({ title, videos, onBack }: VideoGalleryProps) {
  const backButtonRef = useRef<HTMLButtonElement>(null);
  const [focusedVideoId, setFocusedVideoId] = useState<string | null>(null);

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
        <div className="grid grid-cols-1 gap-x-1.5 gap-y-3 min-[420px]:grid-cols-2 lg:grid-cols-3 lg:gap-x-2">
          {videos.map((video, index) => (
            <GalleryVideoTile
              key={video.id}
              video={video}
              index={index}
              isFocused={focusedVideoId === video.id}
              isDimmed={focusedVideoId !== null && focusedVideoId !== video.id}
              onFocus={() => setFocusedVideoId(video.id)}
              onBlur={() => setFocusedVideoId((current) => (current === video.id ? null : current))}
            />
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
