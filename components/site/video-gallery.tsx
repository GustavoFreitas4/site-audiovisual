"use client";

import { type CSSProperties, useEffect, useRef, useState } from "react";
import { ArrowLeft, Film, Pause, Play, RotateCcw, RotateCw, Volume2, VolumeX, X } from "lucide-react";
import type { GalleryVideo } from "@/lib/video-galleries";

type VideoGalleryProps = {
  title: string;
  videos: readonly GalleryVideo[];
  onBack?: () => void;
  backHref?: string;
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
const CONTROLS_HIDE_DELAY = 2000;
const MAX_LOAD_RETRIES = 2;

function formatVideoTime(value: number) {
  if (!Number.isFinite(value) || value < 0) return "0:00";

  const totalSeconds = Math.floor(value);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

function GalleryVideoTile({ video, index, isFocused, isDimmed, onFocus, onBlur }: GalleryVideoTileProps) {
  const tileRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isVisibleRef = useRef(false);
  const isFocusedRef = useRef(false);
  const exitTimerRef = useRef<number | null>(null);
  const controlsHideTimerRef = useRef<number | null>(null);
  const loadRetryTimerRef = useRef<number | null>(null);
  const isClosingRef = useRef(false);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isAudioActive, setIsAudioActive] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [controlsVisible, setControlsVisible] = useState(true);
  const [spotlightBox, setSpotlightBox] = useState<SpotlightBox | null>(null);
  const [loadAttempt, setLoadAttempt] = useState(0);
  const hasSource = Boolean(video.src?.trim());
  const loopEndSeconds =
    typeof video.loopEndSeconds === "number" && video.loopEndSeconds > 0
      ? video.loopEndSeconds
      : null;
  const playbackDuration =
    loopEndSeconds === null
      ? duration
      : duration > 0
        ? Math.min(duration, loopEndSeconds)
        : loopEndSeconds;
  const resolvedVideoSource = (() => {
    if (!shouldLoad || !video.src) return undefined;
    if (loadAttempt === 0) return video.src;
    return `${video.src}${video.src.includes("?") ? "&" : "?"}retry=${loadAttempt}`;
  })();

  const clearControlsHideTimer = () => {
    if (controlsHideTimerRef.current !== null) {
      window.clearTimeout(controlsHideTimerRef.current);
      controlsHideTimerRef.current = null;
    }
  };

  const scheduleControlsHide = () => {
    clearControlsHideTimer();
    if (!isFocused) return;

    controlsHideTimerRef.current = window.setTimeout(() => {
      setControlsVisible(false);
      controlsHideTimerRef.current = null;
    }, CONTROLS_HIDE_DELAY);
  };

  const revealControls = () => {
    if (!isFocused) return;
    setControlsVisible(true);
    scheduleControlsHide();
  };

  const holdControlsVisible = () => {
    if (!isFocused) return;
    setControlsVisible(true);
    clearControlsHideTimer();
  };

  const resetAudio = () => {
    const media = videoRef.current;
    if (media) media.muted = true;
    setIsAudioActive(false);
  };

  const closeSpotlight = () => {
    if (!isFocused || isClosingRef.current) return;

    resetAudio();
    videoRef.current?.play().catch(() => {
      // O vídeo volta ao comportamento automático do grid quando o destaque fecha.
    });
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

  useEffect(() => {
    isFocusedRef.current = isFocused;
  }, [isFocused]);

  useEffect(() => {
    clearControlsHideTimer();
    setControlsVisible(true);

    if (!isFocused) return;

    controlsHideTimerRef.current = window.setTimeout(() => {
      setControlsVisible(false);
      controlsHideTimerRef.current = null;
    }, CONTROLS_HIDE_DELAY);

    return clearControlsHideTimer;
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
      { rootMargin: "180px 0px", threshold: 0.06 },
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

    window.addEventListener("resize", centerSpotlight);

    return () => {
      window.cancelAnimationFrame(firstFrame);
      if (secondFrame) window.cancelAnimationFrame(secondFrame);
      window.removeEventListener("resize", centerSpotlight);
    };
  }, [isFocused]);

  useEffect(
    () => () => {
      if (exitTimerRef.current !== null) window.clearTimeout(exitTimerRef.current);
      if (controlsHideTimerRef.current !== null) window.clearTimeout(controlsHideTimerRef.current);
      if (loadRetryTimerRef.current !== null) window.clearTimeout(loadRetryTimerRef.current);

      const media = videoRef.current;
      if (media) {
        media.pause();
        media.muted = true;
        media.removeAttribute("src");
        media.load();
      }
    },
    [],
  );

  const handleVideoError = (media: HTMLVideoElement) => {
    resetAudio();
    setIsReady(false);

    const errorCode = media.error?.code ?? 0;
    const isPermanentSourceError = errorCode === MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED;
    if (!isPermanentSourceError && loadAttempt < MAX_LOAD_RETRIES) {
      if (loadRetryTimerRef.current !== null) window.clearTimeout(loadRetryTimerRef.current);
      loadRetryTimerRef.current = window.setTimeout(() => {
        setHasError(false);
        setLoadAttempt((current) => current + 1);
        loadRetryTimerRef.current = null;
      }, 600 * (loadAttempt + 1));
      return;
    }

    setHasError(true);
  };

  const activateAudio = () => {
    const media = videoRef.current;
    if (!media || hasError) return;

    media.muted = false;
    media
      .play()
      .then(() => setIsAudioActive(true))
      .catch(() => resetAudio());
  };

  const openSpotlight = () => {
    const tile = tileRef.current;
    if (!tile || !hasSource || hasError || isFocused || isClosingRef.current) return;

    resetAudio();
    setShouldLoad(true);
    isClosingRef.current = false;
    const rect = tile.getBoundingClientRect();
    setSpotlightBox({ left: rect.left, top: rect.top, width: rect.width, height: rect.height });
    videoRef.current?.play().catch(() => {
      // Mantém o destaque aberto mesmo se o navegador bloquear a reprodução automática.
    });
    onFocus();
  };

  const handleSoundClick = () => {
    if (!isFocused) return;

    if (isAudioActive) resetAudio();
    else activateAudio();
  };

  const handleTimeUpdate = (media: HTMLVideoElement) => {
    if (loopEndSeconds !== null && media.currentTime >= loopEndSeconds) {
      const wasPlaying = !media.paused;
      media.currentTime = 0;
      setCurrentTime(0);

      if (wasPlaying) {
        media.play().catch(() => {
          // Mantém o estado atual caso o navegador interrompa a retomada automática.
        });
      }
      return;
    }

    setCurrentTime(media.currentTime);
  };

  const showSoundLabel = !isAudioActive;
  const progress = playbackDuration > 0 ? Math.min((currentTime / playbackDuration) * 100, 100) : 0;

  const togglePlayback = () => {
    const media = videoRef.current;
    if (!media || hasError) return;

    if (media.paused) {
      media.play().catch(() => {
        // O estado permanece pausado quando o navegador rejeita a reprodução.
      });
    } else {
      media.pause();
    }
  };

  const seekVideo = (value: number) => {
    const media = videoRef.current;
    if (!media || !Number.isFinite(value)) return;

    media.currentTime = value;
    setCurrentTime(value);
  };

  const skipVideo = (seconds: number) => {
    const media = videoRef.current;
    if (!media || hasError) return;

    const mediaDuration = Number.isFinite(media.duration) && media.duration > 0 ? media.duration : playbackDuration;
    const upperLimit = loopEndSeconds === null
      ? mediaDuration > 0 ? mediaDuration : Number.POSITIVE_INFINITY
      : Math.min(mediaDuration > 0 ? mediaDuration : loopEndSeconds, loopEndSeconds);
    const nextTime = Math.min(Math.max(media.currentTime + seconds, 0), upperLimit);
    media.currentTime = nextTime;
    setCurrentTime(nextTime);
  };

  const controlsVisibilityClass = controlsVisible
    ? "visible opacity-100"
    : "pointer-events-none invisible opacity-0";

  return (
    <article
      ref={tileRef}
      aria-label={video.label}
      className={`relative aspect-[9/16] transition-opacity duration-300 ${isFocused ? "z-[90]" : "z-0"} ${isDimmed ? "pointer-events-none opacity-35" : "opacity-100"}`}
    >
      <div
        data-reveal="card"
        onPointerMove={revealControls}
        onPointerDownCapture={revealControls}
        className={`${isFocused && spotlightBox ? "fixed z-[100]" : "absolute inset-0"} overflow-hidden bg-[#111113] shadow-none transition-[left,top,width,height,box-shadow] duration-300 ease-out ${isFocused ? "shadow-[0_30px_90px_rgba(0,0,0,.78)]" : ""}`}
        style={
          isFocused && spotlightBox
            ? {
                left: spotlightBox.left,
                top: spotlightBox.top,
                width: spotlightBox.width,
                height: spotlightBox.height,
                "--reveal-delay": `${Math.min(index, 5) * 65}ms`,
              } as CSSProperties
            : ({ "--reveal-delay": `${Math.min(index, 5) * 65}ms` } as CSSProperties)
        }
      >
        <div className="absolute inset-0 grid place-items-center bg-[radial-gradient(circle_at_center,rgba(13,92,99,.16),transparent_62%)] text-center">
          <div className="flex flex-col items-center gap-3 text-white/38">
            <span className="grid size-12 place-items-center rounded-full border border-white/12 bg-black/25">
              <Film aria-hidden="true" size={20} strokeWidth={1.5} />
            </span>
            <span className="text-xs font-semibold uppercase tracking-[.16em]">
              {!hasSource || hasError ? "Vídeo em breve" : video.label}
            </span>
          </div>
        </div>

        {hasSource ? (
          <video
            ref={videoRef}
            className={`absolute inset-0 size-full object-cover transition-opacity duration-300 ${isReady && !hasError ? "opacity-100" : "opacity-0"}`}
            src={resolvedVideoSource}
            poster={video.thumbnail}
            preload="metadata"
            autoPlay
            muted={!isAudioActive}
            loop={loopEndSeconds === null}
            playsInline
            aria-hidden="true"
            tabIndex={-1}
            onLoadedMetadata={(event) => {
              const media = event.currentTarget;
              setDuration(Number.isFinite(media.duration) ? media.duration : 0);
              setCurrentTime(media.currentTime);
            }}
            onLoadedData={() => {
              setIsReady(true);
              if (isVisibleRef.current || isFocusedRef.current) {
                videoRef.current?.play().catch(() => {
                  // O vídeo continua mudo e pronto para a próxima tentativa automática.
                });
              }
            }}
            onDurationChange={(event) => setDuration(Number.isFinite(event.currentTarget.duration) ? event.currentTarget.duration : 0)}
            onTimeUpdate={(event) => handleTimeUpdate(event.currentTarget)}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onError={(event) => handleVideoError(event.currentTarget)}
          />
        ) : null}

        <button
          type="button"
          aria-label={`Destacar ${video.label}`}
          disabled={isFocused || !hasSource || hasError}
          tabIndex={isFocused ? -1 : 0}
          onClick={openSpotlight}
          className={`absolute inset-0 z-[1] bg-transparent ${isFocused || !hasSource || hasError ? "cursor-default" : "cursor-pointer"}`}
        />

        <span className="pointer-events-none absolute left-3 top-3 z-[2] grid size-7 place-items-center rounded-full bg-black/55 text-[.65rem] font-semibold text-white/70 backdrop-blur-sm">
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
            className="absolute right-3 top-3 z-10 grid size-10 cursor-pointer place-items-center rounded-full border border-white/20 bg-black/60 text-white/85 backdrop-blur-md transition duration-200 hover:rotate-90 hover:border-primary/70 hover:bg-primary hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            <X aria-hidden="true" size={21} />
          </button>
        ) : null}

        {isFocused && isReady && !hasError ? (
          <div
            className={`absolute left-1/2 top-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 items-center gap-3 transition-opacity duration-300 sm:gap-4 ${controlsVisibilityClass}`}
          >
            <button
              type="button"
              aria-label={`Retroceder 10 segundos em ${video.label}`}
              onPointerDown={holdControlsVisible}
              onPointerUp={scheduleControlsHide}
              onFocus={holdControlsVisible}
              onBlur={scheduleControlsHide}
              onClick={(event) => {
                event.stopPropagation();
                skipVideo(-10);
              }}
              className="relative grid size-11 cursor-pointer place-items-center rounded-full border border-white/20 bg-black/60 text-white shadow-[0_10px_34px_rgba(0,0,0,.4)] backdrop-blur-md transition duration-200 hover:scale-105 hover:border-primary-readable/70 hover:bg-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:size-12"
            >
              <RotateCcw aria-hidden="true" size={27} strokeWidth={1.8} />
              <span aria-hidden="true" className="absolute mt-0.5 text-[.55rem] font-bold tabular-nums">10</span>
            </button>

            <button
              type="button"
              aria-label={isPlaying ? `Pausar ${video.label}` : `Reproduzir ${video.label}`}
              aria-pressed={!isPlaying}
              onPointerDown={holdControlsVisible}
              onPointerUp={scheduleControlsHide}
              onFocus={holdControlsVisible}
              onBlur={scheduleControlsHide}
              onClick={(event) => {
                event.stopPropagation();
                togglePlayback();
              }}
              className="grid size-14 cursor-pointer place-items-center rounded-full border border-white/20 bg-black/60 text-white shadow-[0_10px_34px_rgba(0,0,0,.4)] backdrop-blur-md transition duration-200 hover:scale-105 hover:border-primary-readable/70 hover:bg-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:size-16"
            >
              {isPlaying ? <Pause aria-hidden="true" size={26} fill="currentColor" /> : <Play aria-hidden="true" size={27} fill="currentColor" className="translate-x-0.5" />}
            </button>

            <button
              type="button"
              aria-label={`Avançar 10 segundos em ${video.label}`}
              onPointerDown={holdControlsVisible}
              onPointerUp={scheduleControlsHide}
              onFocus={holdControlsVisible}
              onBlur={scheduleControlsHide}
              onClick={(event) => {
                event.stopPropagation();
                skipVideo(10);
              }}
              className="relative grid size-11 cursor-pointer place-items-center rounded-full border border-white/20 bg-black/60 text-white shadow-[0_10px_34px_rgba(0,0,0,.4)] backdrop-blur-md transition duration-200 hover:scale-105 hover:border-primary-readable/70 hover:bg-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:size-12"
            >
              <RotateCw aria-hidden="true" size={27} strokeWidth={1.8} />
              <span aria-hidden="true" className="absolute mt-0.5 text-[.55rem] font-bold tabular-nums">10</span>
            </button>
          </div>
        ) : null}

        {isFocused && isReady && !hasError ? (
          <button
            type="button"
            aria-label={isAudioActive ? `Desativar som de ${video.label}` : `Ativar som de ${video.label}`}
            aria-pressed={isAudioActive}
            onPointerDown={holdControlsVisible}
            onPointerUp={scheduleControlsHide}
            onFocus={holdControlsVisible}
            onBlur={scheduleControlsHide}
            onClick={(event) => {
              event.stopPropagation();
              handleSoundClick();
            }}
            className={`absolute bottom-20 right-3 z-10 flex h-11 cursor-pointer items-center justify-center overflow-hidden rounded-full border border-primary/50 bg-black/60 text-primary-readable shadow-lg backdrop-blur-md transition-[width,background-color,border-color,opacity] duration-300 hover:border-primary-readable/80 hover:bg-black/80 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-readable ${showSoundLabel ? "w-36 gap-2 px-3" : "w-11 px-2.5"} ${controlsVisibilityClass}`}
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
        ) : null}

        {isFocused && isReady && !hasError ? (
          <div className={`absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black/90 via-black/60 to-transparent px-3 pb-3 pt-8 transition-opacity duration-300 sm:px-4 ${controlsVisibilityClass}`}>
            <input
              type="range"
              min="0"
              max={playbackDuration || 0}
              step="0.01"
              value={playbackDuration > 0 ? Math.min(currentTime, playbackDuration) : 0}
              aria-label={`Progresso de ${video.label}`}
              aria-valuetext={`${formatVideoTime(currentTime)} de ${formatVideoTime(playbackDuration)}`}
              onClick={(event) => event.stopPropagation()}
              onPointerDown={holdControlsVisible}
              onPointerUp={scheduleControlsHide}
              onPointerCancel={scheduleControlsHide}
              onFocus={holdControlsVisible}
              onBlur={scheduleControlsHide}
              onChange={(event) => seekVideo(Number(event.currentTarget.value))}
              className="video-seek-bar block w-full"
              style={{ background: `linear-gradient(to right, var(--primary) 0%, var(--primary) ${progress}%, rgba(255,255,255,.2) ${progress}%, rgba(255,255,255,.2) 100%)` }}
            />
            <div className="mt-2 text-right text-[.68rem] font-medium tabular-nums text-white/75 sm:text-xs">
              {formatVideoTime(currentTime)} / {formatVideoTime(playbackDuration)}
            </div>
          </div>
        ) : null}
      </div>
    </article>
  );
}

export function VideoGallery({ title, videos, onBack, backHref }: VideoGalleryProps) {
  const [focusedVideoId, setFocusedVideoId] = useState<string | null>(null);

  const leaveGallery = () => {
    setFocusedVideoId(null);
    onBack?.();
  };

  const backControlClassName =
    "group inline-flex min-h-12 w-fit items-center gap-3 rounded-full border border-white/15 bg-white/[.04] px-5 text-sm font-semibold text-white/78 transition duration-300 hover:-translate-y-0.5 hover:border-primary/70 hover:bg-primary hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white";

  const backControlContent = (
    <>
      <ArrowLeft aria-hidden="true" size={17} className="transition-transform duration-300 group-hover:-translate-x-0.5" />
      Voltar aos serviços
    </>
  );

  return (
    <section aria-label={`Galeria de vídeos de ${title}`}>
      <div data-reveal="title" className="mb-8 flex flex-col gap-6 border-b border-white/12 pb-7 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[.22em] text-primary-readable">Galeria de vídeos</p>
          <h2 className="text-[clamp(2.8rem,8vw,5.5rem)] font-semibold leading-[.9] tracking-[-.06em] text-white">{title}</h2>
        </div>
        {backHref ? (
          <a href={backHref} onClick={() => setFocusedVideoId(null)} className={backControlClassName}>
            {backControlContent}
          </a>
        ) : (
          <button type="button" onClick={leaveGallery} className={backControlClassName}>
            {backControlContent}
          </button>
        )}
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
