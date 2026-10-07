"use client";

import Image from "next/image";
import { type MouseEvent, useEffect, useState } from "react";

const NAV_ITEMS = [
  { id: "inicio", label: "Início" },
  { id: "servicos", label: "Serviços" },
  { id: "atendimento", label: "Atendimento" },
  { id: "avaliacoes", label: "Avaliações" },
] as const;

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<(typeof NAV_ITEMS)[number]["id"]>("inicio");

  useEffect(() => {
    const updateHeader = () => setIsScrolled(window.scrollY > 20);

    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
    return () => window.removeEventListener("scroll", updateHeader);
  }, []);

  useEffect(() => {
    const sections = NAV_ITEMS.map(({ id }) => document.getElementById(id)).filter((section): section is HTMLElement => Boolean(section));
    let animationFrame = 0;

    const updateActiveSection = () => {
      const headerHeight = document.querySelector<HTMLElement>(".site-header")?.offsetHeight ?? 72;
      const focusLine = headerHeight + Math.min(window.innerHeight * 0.22, 180);
      const atPageEnd = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2;
      let currentSection = sections[0];

      for (const section of sections) {
        if (section.getBoundingClientRect().top <= focusLine) currentSection = section;
      }

      if (atPageEnd) currentSection = sections.at(-1);
      if (currentSection) setActiveSection(currentSection.id as (typeof NAV_ITEMS)[number]["id"]);
    };

    const scheduleActiveSectionUpdate = () => {
      if (animationFrame) return;
      animationFrame = window.requestAnimationFrame(() => {
        updateActiveSection();
        animationFrame = 0;
      });
    };

    const observer = new IntersectionObserver(
      scheduleActiveSectionUpdate,
      { rootMargin: "-15% 0px -65% 0px", threshold: [0, 0.1] },
    );

    sections.forEach((section) => observer.observe(section));
    updateActiveSection();
    window.addEventListener("scroll", scheduleActiveSectionUpdate, { passive: true });
    window.addEventListener("resize", scheduleActiveSectionUpdate);
    window.addEventListener("hashchange", scheduleActiveSectionUpdate);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", scheduleActiveSectionUpdate);
      window.removeEventListener("resize", scheduleActiveSectionUpdate);
      window.removeEventListener("hashchange", scheduleActiveSectionUpdate);
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  const navigateToSection = (event: MouseEvent<HTMLAnchorElement>, id: (typeof NAV_ITEMS)[number]["id"]) => {
    const target = document.getElementById(id);
    if (!target) return;

    event.preventDefault();
    const hash = `#${id}`;
    if (window.location.hash === hash) window.history.replaceState(null, "", hash);
    else window.history.pushState(null, "", hash);
    setActiveSection(id);
    target.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
      block: "start",
    });
  };

  return (
    <header
      className={`site-header fixed inset-x-0 top-0 z-[70] border-b transition-[background-color,border-color,box-shadow,backdrop-filter] duration-300 ${
        isScrolled
          ? "border-white/10 bg-black/80 shadow-[0_12px_40px_rgba(0,0,0,.32)] backdrop-blur-xl"
          : "border-transparent bg-black/20 shadow-none backdrop-blur-[3px]"
      }`}
    >
      <div className="relative mx-auto grid max-w-[1440px] grid-cols-[minmax(0,1fr)_auto] items-center gap-2 px-5 py-2.5 sm:gap-4 sm:px-8 sm:py-3 min-[900px]:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] lg:px-14 xl:px-20">
        <a
          href="#inicio"
          onClick={(event) => navigateToSection(event, "inicio")}
          aria-label="Gustavo Freitas — início"
          className="col-start-1 flex min-w-0 items-center focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
        >
          <span className="block w-[clamp(8rem,24vw,11.5rem)] shrink-0">
            <Image
              src="/gustavo-freitas-logo.png"
              alt="Gustavo Freitas"
              width={2170}
              height={725}
              priority
              sizes="(max-width: 639px) 128px, 184px"
              className="h-auto w-full object-contain"
            />
          </span>
        </a>

        <nav aria-label="Navegação principal" className="col-start-2 hidden items-center gap-6 min-[900px]:flex xl:gap-8">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;

            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(event) => navigateToSection(event, item.id)}
                aria-current={isActive ? "location" : undefined}
                className={`relative py-2 text-xs font-semibold tracking-[.02em] transition-colors duration-300 after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-center after:bg-primary-readable after:transition-transform after:duration-300 ${
                  isActive ? "text-primary-readable after:scale-x-100" : "text-white/62 after:scale-x-0 hover:text-white"
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        <div className="col-start-2 ml-auto flex shrink-0 items-center gap-1.5 sm:gap-2 min-[900px]:col-start-3">
          <a
            href="https://www.instagram.com/gustavofmaker"
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram de Gustavo Freitas — @gustavofmaker"
            title="Instagram"
            className="group inline-flex h-9 w-9 items-center justify-center gap-1 whitespace-nowrap rounded-full border border-[#ef2d8e]/70 bg-[radial-gradient(circle_at_30%_115%,#f68c1e_0%,#f36141_32%,#ef2d8e_56%,#c82f92_80%,#553592_100%)] p-0 text-[10px] font-semibold text-white shadow-[0_8px_24px_rgba(239,45,142,.28)] transition duration-300 hover:-translate-y-0.5 hover:brightness-110 hover:shadow-[0_10px_28px_rgba(239,45,142,.4)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white min-[360px]:w-auto min-[360px]:px-2 md:gap-1.5 md:px-3 md:text-xs"
          >
            <img src="/instagram.svg" alt="" aria-hidden="true" className="size-3.5 shrink-0" />
            <span className="sr-only min-[360px]:not-sr-only">Instagram</span>
          </a>

          <a
            href="https://wa.me/5513981197505"
            target="_blank"
            rel="noreferrer"
            aria-label="WhatsApp de Gustavo Freitas"
            title="WhatsApp"
            className="group inline-flex h-9 w-9 items-center justify-center gap-1 whitespace-nowrap rounded-full border border-[#0dbf43] bg-[#0dbf43] p-0 text-[10px] font-semibold text-white shadow-[0_8px_24px_rgba(13,191,67,.25)] transition duration-300 hover:-translate-y-0.5 hover:border-[#0aa83a] hover:bg-[#0aa83a] hover:shadow-[0_10px_28px_rgba(13,191,67,.38)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white min-[360px]:w-auto min-[360px]:px-2 md:gap-1.5 md:px-3 md:text-xs"
          >
            <img src="/whatsapp.svg" alt="" aria-hidden="true" className="size-3.5 shrink-0" />
            <span className="sr-only min-[360px]:not-sr-only">WhatsApp</span>
          </a>
        </div>
      </div>
    </header>
  );
}
