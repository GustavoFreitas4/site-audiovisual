"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import { ArrowUpRight, Play } from "lucide-react";
import { SERVICES, WHATSAPP_URL } from "@/lib/site-data";

const STATS = [
  { value: 150, prefix: "+", suffix: "", label: "eventos filmados" },
  { value: 40, prefix: "+", suffix: "", label: "imóveis divulgados" },
  { value: 98, prefix: "", suffix: "%", label: "de satisfação" },
] as const;

type Service = (typeof SERVICES)[number];

type CursorPosition = {
  x: number;
  y: number;
  visible: boolean;
};

function hasFinePointer() {
  return typeof window !== "undefined" && window.matchMedia?.("(hover: hover) and (pointer: fine)")?.matches === true;
}

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const Icon = service.icon;
  const cardRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoState, setVideoState] = useState<"idle" | "ready" | "error">("idle");
  const [cursor, setCursor] = useState<CursorPosition>({ x: 0, y: 0, visible: false });

  const handleMouseEnter = () => {
    if (videoState === "error" || !hasFinePointer()) return;

    setCursor((current) => ({ ...current, visible: true }));
    const video = videoRef.current;
    if (!video) return;

    video.currentTime = 0;
    const playPromise = video.play();
    playPromise?.catch(() => {
      // Browsers can reject playback until the source is available; the card hover still works.
    });
  };

  const handleMouseMove = (event: MouseEvent<HTMLElement>) => {
    if (videoState === "error" || !hasFinePointer()) return;

    const card = cardRef.current;
    if (!card) return;
    const bounds = card.getBoundingClientRect();
    setCursor({
      x: event.clientX - bounds.left,
      y: event.clientY - bounds.top,
      visible: true,
    });
  };

  const handleMouseLeave = () => {
    setCursor((current) => ({ ...current, visible: false }));
    const video = videoRef.current;
    if (!video) return;

    video.pause();
    video.currentTime = 0;
  };

  return (
    <article
      ref={cardRef}
      data-video={service.video}
      className={`service-row group relative grid gap-5 overflow-hidden py-8 sm:grid-cols-[4rem_1fr_auto] sm:items-start sm:gap-7 sm:py-10 ${videoState === "ready" ? "service-row--video-ready" : ""}`}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <video
        ref={videoRef}
        className="service-video pointer-events-none absolute inset-0 h-full w-full object-cover"
        src={service.video}
        muted
        loop
        playsInline
        preload="none"
        aria-hidden="true"
        tabIndex={-1}
        onLoadedData={() => setVideoState("ready")}
        onError={() => {
          setVideoState("error");
          setCursor((current) => ({ ...current, visible: false }));
        }}
      />
      <div aria-hidden="true" className="service-video-overlay pointer-events-none absolute inset-0" />

      <span className="relative z-[2] origin-left text-sm font-semibold tracking-[.16em] text-[#ff2b2f]/60 transition duration-300 group-hover:scale-105 group-hover:text-[#ff2b2f] group-hover:opacity-100">
        0{index + 1}
      </span>
      <div className="relative z-[2]">
        <div className="mb-4 flex items-center gap-3 sm:hidden">
          <Icon aria-hidden="true" size={22} strokeWidth={1.7} className="text-white/70" />
        </div>
        <h3 className="text-3xl font-semibold tracking-[-.035em] sm:text-4xl">{service.title}</h3>
        <p className="mt-3 max-w-xl text-base leading-7 text-white/52">{service.description}</p>
        <ul className="mt-5 flex flex-wrap gap-2" aria-label={`Tipos de ${service.title.toLowerCase()}`}>
          {service.tags.map((tag) => (
            <li
              key={tag}
              title={tag}
              className="rounded-full border border-white/12 px-3 py-1.5 text-xs font-medium text-white/48 transition duration-200 hover:-translate-y-0.5 hover:border-[#ef4444]/55 hover:bg-[#ef4444]/15 hover:text-white"
            >
              {tag}
            </li>
          ))}
        </ul>
      </div>
      <div className="relative z-[2] hidden size-14 place-items-center rounded-full border border-white/12 text-white/50 transition duration-300 group-hover:scale-110 group-hover:rotate-[7deg] group-hover:border-[#ff2b2f]/70 group-hover:bg-[#ff2b2f] group-hover:text-white sm:grid">
        <Icon aria-hidden="true" size={23} strokeWidth={1.6} />
      </div>

      <div
        aria-hidden="true"
        className={`service-cursor pointer-events-none absolute z-20 size-[4.5rem] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full bg-[#ef4444] text-white shadow-[0_10px_30px_rgba(239,68,68,.35)] transition duration-200 ${cursor.visible ? "scale-100 opacity-100" : "scale-90 opacity-0"}`}
        style={{ left: cursor.x, top: cursor.y }}
      >
        <Play size={13} fill="currentColor" strokeWidth={1.5} />
        <span className="mt-0.5 text-[.55rem] font-bold uppercase tracking-[.12em]">Assistir</span>
      </div>
    </article>
  );
}

function ImpactStats() {
  const statsRef = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);
  const [counts, setCounts] = useState(() => STATS.map(() => 0));

  useEffect(() => {
    const stats = statsRef.current;
    if (!stats) return;

    if (!("IntersectionObserver" in window)) {
      setStarted(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setStarted(true);
        observer.disconnect();
      },
      { rootMargin: "0px 0px -15% 0px", threshold: 0.2 },
    );

    observer.observe(stats);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;

    const prefersReducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
    if (prefersReducedMotion) {
      setCounts(STATS.map((stat) => stat.value));
      return;
    }

    const duration = 1800;
    let animationFrame = 0;
    let startedAt = 0;

    const animate = (timestamp: number) => {
      if (!startedAt) startedAt = timestamp;
      const progress = Math.min((timestamp - startedAt) / duration, 1);
      const eased = 1 - (1 - progress) ** 3;
      setCounts(STATS.map((stat) => Math.round(stat.value * eased)));
      if (progress < 1) animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [started]);

  return (
    <div ref={statsRef} className="mt-14 grid gap-8 border-y border-white/10 py-10 sm:mt-20 sm:grid-cols-3 sm:gap-6 sm:py-12">
      {STATS.map((stat, index) => (
        <div key={stat.label}>
          <p className="text-[clamp(2.2rem,6vw,3.8rem)] font-semibold leading-none tracking-[-.065em] text-white">
            {stat.prefix}
            {counts[index].toLocaleString("pt-BR")}
            {stat.suffix}
          </p>
          <p className="mt-2 text-xs font-semibold uppercase tracking-[.18em] text-white/42">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}

export function Services() {
  return (
    <section id="servicos" className="relative bg-[#080809] px-5 py-24 text-white sm:px-8 sm:py-32 lg:px-14 lg:py-40 xl:px-20">
      <div aria-hidden="true" className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      <div className="mx-auto max-w-[1440px]">
        <div className="grid gap-10 lg:grid-cols-[.75fr_1.25fr] lg:gap-16">
          <div className="max-w-lg">
            <p className="mb-5 flex items-center gap-3 text-[.76rem] font-semibold uppercase tracking-[.22em] text-white/45">
              <span className="size-1.5 rounded-full bg-[#ff2b2f]" />
              Serviços
            </p>
            <h2 className="text-balance text-[clamp(2.7rem,9vw,4.8rem)] font-semibold leading-[.95] tracking-[-.055em]">
              Histórias vistas de um jeito <span className="font-serif font-normal italic text-white/58">único.</span>
            </h2>
            <p className="mt-6 max-w-md text-base leading-7 text-white/52 sm:text-lg">
              Do alto ou de perto, cada filmagem é pensada para valorizar o que torna o seu projeto especial.
            </p>
          </div>

          <div className="divide-y divide-white/12 border-y border-white/12">
            {SERVICES.map((service, index) => (
              <ServiceCard key={service.title} service={service} index={index} />
            ))}
          </div>
        </div>

        <ImpactStats />

        <div className="mt-14 flex flex-col gap-5 border-l-2 border-[#ff2b2f] pl-5 sm:mt-20 sm:flex-row sm:items-center sm:justify-between sm:pl-7">
          <div>
            <p className="text-xl font-semibold tracking-[-.02em] sm:text-2xl">Tem uma ideia em mente?</p>
            <p className="mt-1 text-sm text-white/48 sm:text-base">Conte para a gente. O orçamento é rápido e sem compromisso.</p>
          </div>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex min-h-12 w-fit items-center gap-3 rounded-full bg-white px-5 text-sm font-bold text-black transition hover:bg-[#ff2b2f] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            Conversar no WhatsApp
            <ArrowUpRight aria-hidden="true" size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
