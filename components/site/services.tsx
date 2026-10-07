"use client";

import { type CSSProperties, useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowUpRight, MousePointerClick } from "lucide-react";
import { SERVICES, WHATSAPP_URL } from "@/lib/site-data";
import { ServiceArea } from "./service-area";
import { Reviews } from "./reviews";
import { WaveBackground } from "./wave-background";

const STATS = [
  { value: 100, prefix: "+", suffix: "", label: "produções entregues" },
] as const;

type Service = (typeof SERVICES)[number];

const SERVICE_GALLERY_LINKS = [
  { id: "eventos", href: "/servicos/eventos" },
  { id: "marcas", href: "/servicos/marcas" },
  { id: "imoveis", href: "/servicos/imoveis" },
] as const;

function ServiceCard({
  service,
  index,
  href,
  galleryId,
}: {
  service: Service;
  index: number;
  href?: string;
  galleryId?: string;
}) {
  const Icon = service.icon;

  return (
    <a
      href={href}
      data-reveal="card"
      data-service-gallery={galleryId}
      aria-label={href ? `Abrir galeria de vídeos de ${service.title}` : undefined}
      className={`service-row group relative grid gap-5 overflow-hidden py-8 text-inherit no-underline sm:grid-cols-[4rem_1fr_auto] sm:items-start sm:gap-7 sm:py-10 ${href ? "cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary" : "pointer-events-none"}`}
      style={{ "--reveal-delay": `${index * 75}ms` } as CSSProperties}
    >
      <span className="relative z-[2] origin-left text-sm font-semibold tracking-[.16em] text-primary-readable/70 transition duration-300 group-hover:scale-105 group-hover:text-primary-readable group-hover:opacity-100">
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
              className="rounded-full border border-white/12 px-3 py-1.5 text-xs font-medium text-white/48 transition duration-200 hover:-translate-y-0.5 hover:border-primary/55 hover:bg-primary/15 hover:text-white"
            >
              {tag}
            </li>
          ))}
        </ul>
      </div>
      <div className="relative z-[2] hidden size-14 place-items-center rounded-full border border-white/12 text-white/50 transition duration-300 group-hover:scale-110 group-hover:rotate-[7deg] group-hover:border-primary/70 group-hover:bg-primary group-hover:text-white sm:grid">
        <Icon aria-hidden="true" size={23} strokeWidth={1.6} />
      </div>

    </a>
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
    <div ref={statsRef} data-reveal="group" className="mx-auto mt-14 grid max-w-sm grid-cols-1 justify-items-center gap-8 border-y border-white/10 py-10 text-center sm:mt-20 sm:py-12">
      {STATS.map((stat, index) => (
        <div key={stat.label}>
          <p className="font-serif text-[clamp(2.2rem,6vw,3.8rem)] font-normal italic leading-none tracking-[-.04em] text-primary-readable">
            <span className="inline-block -skew-x-6 font-serif italic">{stat.prefix}</span>
            {counts[index].toLocaleString("pt-BR")}
            {stat.suffix}
          </p>
          <p className="mt-2 text-xs font-semibold uppercase tracking-[.18em] text-white/42">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}

function FinalCallToAction() {
  return (
    <div
      data-reveal="group"
      className="final-cta relative mt-14 overflow-hidden border-y border-white/10 py-12 sm:mt-20 sm:py-16 lg:grid lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-16 lg:py-20"
    >
      <div className="relative z-[1] max-w-3xl">
        <h2 data-reveal="title" className="text-[clamp(3.1rem,6.4vw,6rem)] font-semibold leading-[.86] tracking-[-.06em] text-white">
          <span className="block">Tem uma</span>
          <span className="block">ideia em</span>
          <span className="services-title-accent block font-serif font-normal italic">mente?</span>
        </h2>

        <p data-reveal="text" className="mt-7 max-w-2xl text-base leading-7 text-white/55 sm:text-lg sm:leading-8 lg:text-xl">
          Conte para a gente. O orçamento é rápido e sem compromisso.
        </p>

        <div data-reveal="control" className="mt-5 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[.035] px-3 py-2 text-xs font-medium tracking-[.02em] text-white/62 backdrop-blur-sm sm:text-sm">
          <span aria-hidden="true" className="final-cta-online-dot relative size-2 rounded-full bg-[#25d366]" />
          Online agora
        </div>
      </div>

      <div data-reveal="control" className="relative z-[1] mt-10 lg:mt-0 lg:justify-self-end">
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noreferrer"
          className="final-cta-whatsapp group inline-flex min-h-14 w-fit items-center gap-3 rounded-full border border-[#58e98e]/45 bg-[#25d366] px-7 text-sm font-bold text-white transition duration-300 hover:-translate-y-0.5 hover:border-[#8cf0b0]/70 hover:bg-[#20bd5a] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:text-base"
        >
          <img src="/whatsapp.svg" alt="" aria-hidden="true" className="final-cta-whatsapp-icon size-5 shrink-0" />
          Conversar no WhatsApp
          <ArrowUpRight aria-hidden="true" size={17} className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
        </a>
      </div>
    </div>
  );
}

export function Services() {
  return (
    <section id="servicos" className="relative isolate overflow-hidden bg-[#080809] px-5 py-24 text-white sm:px-8 sm:py-32 lg:px-14 lg:py-40 xl:px-20">
      <WaveBackground intensity={0.11} glowOpacity={0.055} segments={5} />
      <div aria-hidden="true" data-draw-line className="absolute left-0 top-0 z-[2] h-px w-full origin-left bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      <div className="relative z-[1] mx-auto max-w-[1440px]">
          <div>
            <div className="grid gap-8 sm:gap-10 lg:grid-cols-[.75fr_1.25fr] lg:gap-16">
              <div data-reveal="title" className="max-w-lg">
                <p className="mb-5 flex items-center gap-3 text-[.76rem] font-semibold uppercase tracking-[.22em] text-white/45">
                  <span className="size-1.5 rounded-full bg-primary" />
                  Serviços
                </p>
                <h2 className="text-[clamp(2.7rem,9vw,4.8rem)] font-semibold leading-[.95] tracking-[-.055em]">
                  <span className="block text-[.9em]">Do momento</span>
                  <span className="block text-[.9em]">à imagem.</span>
                  <span className="block whitespace-nowrap text-[.9em]">Do comum ao</span>
                  <span className="services-title-accent block font-serif font-normal italic">extraordinário.</span>
                </h2>
              </div>

              <div>
                <button
                  data-reveal="control"
                  type="button"
                  onClick={() => document.querySelector<HTMLElement>('[data-service-gallery="eventos"]')?.focus({ preventScroll: true })}
                  className="group mb-5 inline-flex cursor-pointer items-center gap-3 rounded-full border border-primary/45 bg-primary/10 px-4 py-2.5 text-sm font-semibold tracking-[.01em] text-white transition duration-300 hover:border-primary-readable/70 hover:bg-primary/20 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-readable sm:mb-6 sm:text-base"
                  aria-label="Ir para os cards e explorar os serviços"
                >
                  <MousePointerClick aria-hidden="true" size={19} className="text-primary-readable transition-transform duration-300 group-hover:scale-110" />
                  Entre e descubra
                  <ArrowDown aria-hidden="true" size={17} className="animate-bounce text-primary-readable" />
                </button>

                <div className="divide-y divide-white/12 border-y border-white/12">
                  {SERVICES.map((service, index) => {
                    const gallery = SERVICE_GALLERY_LINKS[index];

                    return (
                      <ServiceCard
                        key={service.title}
                        service={service}
                        index={index}
                        href={gallery?.href}
                        galleryId={gallery?.id}
                      />
                    );
                  })}
                </div>
              </div>
            </div>

            <ServiceArea />

            <Reviews />

            <ImpactStats />

            <FinalCallToAction />
          </div>
      </div>
    </section>
  );
}
