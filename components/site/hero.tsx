"use client";

import Image from "next/image";
import { ArrowDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const ROTATING_WORDS = ["momentos.", "negócios.", "histórias."] as const;

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [wordIndex, setWordIndex] = useState(0);
  const [isWordVisible, setIsWordVisible] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches) {
      setIsWordVisible(true);
      return;
    }

    let swapTimer: number | undefined;
    const initialTimer = window.setTimeout(() => setIsWordVisible(true), 620);
    const rotationTimer = window.setInterval(() => {
      setIsWordVisible(false);
      swapTimer = window.setTimeout(() => {
        setWordIndex((current) => (current + 1) % ROTATING_WORDS.length);
        setIsWordVisible(true);
      }, 360);
    }, 3200);

    return () => {
      window.clearTimeout(initialTimer);
      window.clearInterval(rotationTimer);
      if (swapTimer !== undefined) window.clearTimeout(swapTimer);
    };
  }, []);

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

      <div className="relative z-10 mx-auto flex min-h-[780px] max-w-[1440px] flex-col justify-end px-5 pb-8 pt-32 sm:min-h-[840px] sm:px-8 sm:pb-10 lg:min-h-[900px] lg:px-14 lg:pb-12 xl:px-20">
        <div ref={contentRef} className="hero-parallax-content max-w-[760px] pb-14 sm:pb-16">
          <div className="hero-enter hero-enter-1 mb-5 flex items-center gap-3 text-[.76rem] font-semibold uppercase tracking-[.22em] text-white/70 sm:text-[.8rem]">
            <span className="h-px w-9 bg-primary" />
            Filmagens aéreas e terrestres
          </div>

          <h1
            aria-label="Vídeos que valorizam momentos, negócios e histórias."
            className="max-w-[13ch] text-balance text-[clamp(3.35rem,12vw,5.7rem)] font-semibold leading-[.9] tracking-[-.065em] text-white lg:text-[clamp(5.7rem,7.4vw,7.4rem)]"
          >
            <span className="hero-title-main block">Vídeos que valorizam os</span>
            <span
              aria-hidden="true"
              className={`hero-rotating-word block font-serif font-normal italic tracking-[-.045em] text-white/92 ${isWordVisible ? "is-visible" : ""}`}
            >
              {ROTATING_WORDS[wordIndex]}
            </span>
          </h1>

          <div className="hero-enter hero-enter-3 mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <a
              href="#servicos"
              className="group inline-flex min-h-14 items-center gap-3 rounded-full bg-primary px-6 text-base font-bold text-white shadow-[0_14px_40px_rgba(13,92,99,.3)] transition duration-300 hover:-translate-y-0.5 hover:bg-primary-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              Conheça o nosso olhar
              <ArrowDown aria-hidden="true" size={18} strokeWidth={2.25} className="transition-transform duration-300 group-hover:translate-y-1" />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
