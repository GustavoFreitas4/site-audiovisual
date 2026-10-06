"use client";

import Image from "next/image";
import { ArrowDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const ROTATING_WORDS = ["momentos.", "detalhes.", "espaços.", "negócios."] as const;

type HeroCard = {
  image: string;
  imagePosition: string;
  imageAlt: string;
};

const HERO_CARDS: readonly HeroCard[] = [
  {
    image: "/images/hero-cards/card-01.jpg",
    imagePosition: "center center",
    imageAlt: "Operador segurando o controle de um drone",
  },
  {
    image: "/images/hero-cards/card-02.jpg",
    imagePosition: "56% 46%",
    imageAlt: "Operador segurando um drone diante de uma escultura vermelha",
  },
  {
    image: "/images/hero-cards/card-03.jpg",
    imagePosition: "center 42%",
    imageAlt: "Profissional registrando um evento com câmera",
  },
] as const;

function RotatingHeroWord() {
  const [wordIndex, setWordIndex] = useState(0);
  const [isWordVisible, setIsWordVisible] = useState(true);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let swapTimer: number | undefined;

    const rotationTimer = window.setInterval(() => {
      if (reducedMotion.matches) {
        setWordIndex((current) => (current + 1) % ROTATING_WORDS.length);
        return;
      }

      setIsWordVisible(false);
      swapTimer = window.setTimeout(() => {
        setWordIndex((current) => (current + 1) % ROTATING_WORDS.length);
        setIsWordVisible(true);
      }, 650);
    }, 2000);

    return () => {
      window.clearInterval(rotationTimer);
      if (swapTimer !== undefined) window.clearTimeout(swapTimer);
    };
  }, []);

  return (
    <span
      aria-hidden="true"
      className={`hero-rotating-word block font-serif font-normal italic tracking-[-.045em] text-white/92 ${isWordVisible ? "is-visible" : ""}`}
    >
      {ROTATING_WORDS[wordIndex]}
    </span>
  );
}

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const showcaseRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const background = backgroundRef.current;
    const content = contentRef.current;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (!section || !background || !content || !finePointer.matches || reducedMotion.matches) return;

    let animationFrame = 0;
    let targetX = 0;
    let targetY = 0;

    const renderParallax = () => {
      background.style.transform = `translate3d(${targetX * 12}px, ${targetY * 8}px, 0)`;
      content.style.transform = `translate3d(${targetX * -7}px, ${targetY * -5}px, 0)`;
      animationFrame = 0;
    };

    const updateParallax = (event: PointerEvent) => {
      const rect = section.getBoundingClientRect();
      targetX = Math.max(-0.5, Math.min(0.5, (event.clientX - rect.left) / rect.width - 0.5));
      targetY = Math.max(-0.5, Math.min(0.5, (event.clientY - rect.top) / rect.height - 0.5));
      if (!animationFrame) animationFrame = window.requestAnimationFrame(renderParallax);
    };

    const resetParallax = () => {
      targetX = 0;
      targetY = 0;
      if (!animationFrame) animationFrame = window.requestAnimationFrame(renderParallax);
    };

    section.addEventListener("pointermove", updateParallax, { passive: true });
    section.addEventListener("pointerleave", resetParallax);

    return () => {
      section.removeEventListener("pointermove", updateParallax);
      section.removeEventListener("pointerleave", resetParallax);
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
      background.style.transform = "";
      content.style.transform = "";
    };
  }, []);

  useEffect(() => {
    const showcase = showcaseRef.current;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (!showcase || !finePointer.matches || reducedMotion.matches) return;

    let animationFrame = 0;
    let rotateX = 0;
    let rotateY = 0;

    const renderTilt = () => {
      showcase.style.setProperty("--hero-showcase-rotate-x", `${rotateX}deg`);
      showcase.style.setProperty("--hero-showcase-rotate-y", `${rotateY}deg`);
      animationFrame = 0;
    };

    const updateTilt = (event: PointerEvent) => {
      const rect = showcase.getBoundingClientRect();
      const pointerX = Math.max(-0.5, Math.min(0.5, (event.clientX - rect.left) / rect.width - 0.5));
      const pointerY = Math.max(-0.5, Math.min(0.5, (event.clientY - rect.top) / rect.height - 0.5));
      rotateX = pointerY * -4;
      rotateY = pointerX * 5;
      if (!animationFrame) animationFrame = window.requestAnimationFrame(renderTilt);
    };

    const resetTilt = () => {
      rotateX = 0;
      rotateY = 0;
      if (!animationFrame) animationFrame = window.requestAnimationFrame(renderTilt);
    };

    showcase.addEventListener("pointermove", updateTilt, { passive: true });
    showcase.addEventListener("pointerleave", resetTilt);

    return () => {
      showcase.removeEventListener("pointermove", updateTilt);
      showcase.removeEventListener("pointerleave", resetTilt);
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
      showcase.style.removeProperty("--hero-showcase-rotate-x");
      showcase.style.removeProperty("--hero-showcase-rotate-y");
    };
  }, []);

  return (
    <section ref={sectionRef} id="inicio" className="relative isolate min-h-[780px] overflow-hidden bg-black sm:min-h-[840px] lg:min-h-[900px]">
      <div ref={backgroundRef} className="hero-parallax-background absolute -inset-4">
        <Image
          src="/images/hero-drone.jpg?v=2"
          alt="Pessoa segurando um drone diante de uma escultura vermelha no litoral"
          fill
          priority
          sizes="100vw"
          className="hero-image object-cover object-[62%_center] sm:object-[58%_center] lg:object-[50%_52%]"
        />
      </div>
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,3,4,.38)_0%,rgba(3,3,4,.08)_28%,rgba(3,3,4,.48)_68%,#080809_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,.84)_0%,rgba(0,0,0,.6)_48%,rgba(0,0,0,.18)_100%)] max-sm:bg-[linear-gradient(180deg,rgba(0,0,0,.56)_0%,rgba(0,0,0,.22)_34%,rgba(0,0,0,.78)_70%,rgba(8,8,9,.96)_100%)]" />
      <div aria-hidden="true" className="film-grain absolute inset-0 opacity-[.13]" />

      <div aria-hidden="true" className="absolute right-[13%] top-[30%] hidden h-16 w-16 border-r border-t border-white/50 lg:block" />

      <div className="relative z-10 mx-auto flex min-h-[780px] max-w-[1440px] flex-col justify-center px-5 py-24 sm:min-h-[840px] sm:px-8 sm:py-28 lg:min-h-[900px] lg:px-14 lg:py-32 xl:px-20">
        <div
          ref={contentRef}
          className="hero-parallax-content grid w-full items-center xl:grid-cols-[minmax(0,1fr)_minmax(430px,500px)] xl:gap-12 2xl:gap-16"
        >
          <div className="w-full max-w-[760px] text-left">
            <div className="hero-enter hero-enter-1 mb-5 flex items-center gap-3 text-[.76rem] font-semibold uppercase tracking-[.22em] text-white/70 sm:text-[.8rem]">
              <span className="h-px w-9 bg-primary" />
              Filmagens aéreas e terrestres
            </div>

            <h1
              aria-label="Vídeos que valorizam momentos, detalhes, espaços e negócios."
              className="max-w-[13ch] text-balance text-[clamp(3.35rem,12vw,5.7rem)] font-semibold leading-[.9] tracking-[-.065em] text-white lg:text-[clamp(5.7rem,7.4vw,7.4rem)] xl:text-[clamp(4.9rem,5.7vw,6.35rem)] 2xl:text-[clamp(5.5rem,6.2vw,7rem)]"
            >
              <span className="block">Vídeos que valorizam os</span>
              <RotatingHeroWord />
            </h1>
          </div>

          <div aria-label="Destaques do portfólio" className="hero-showcase-scene hidden xl:block">
            <div ref={showcaseRef} className="hero-showcase-stage grid grid-cols-2 gap-x-6 gap-y-7">
              {HERO_CARDS.map((card, index) => {
                const isPrimary = index === 0;

                return (
                  <div
                    key={card.image}
                    className={`card-ambient-glow hero-showcase-card-wrap hero-showcase-card-wrap--${index + 1} ${
                      isPrimary ? "col-span-2 aspect-[1.95/1]" : "aspect-[1.12/1]"
                    }`}
                  >
                    <figure className="hero-showcase-card relative z-[1] h-full w-full overflow-hidden rounded-[20px]">
                      <Image
                        src={card.image}
                        alt={card.imageAlt}
                        fill
                        sizes={isPrimary ? "500px" : "245px"}
                        className="object-cover"
                        style={{ objectPosition: card.imagePosition }}
                      />
                    </figure>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <a
        href="#servicos"
        aria-label="Rolar para explorar os serviços"
        className="hero-scroll-indicator absolute bottom-3 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center text-white/58 transition-opacity duration-300 hover:text-white/82 focus-visible:rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-readable sm:bottom-4"
      >
        <span aria-hidden="true" className="hero-scroll-mouse">
          <span className="hero-scroll-wheel" />
        </span>
        <ArrowDown aria-hidden="true" size={12} strokeWidth={1.35} className="hero-scroll-arrow mt-1 text-primary-readable" />
        <span className="mt-1 whitespace-nowrap text-[.6875rem] font-medium uppercase tracking-[.25em]">Role para explorar</span>
        <span aria-hidden="true" className="mt-1.5 h-px w-7 bg-primary/65 shadow-[0_0_8px_rgba(13,92,99,.72)]" />
      </a>
    </section>
  );
}
