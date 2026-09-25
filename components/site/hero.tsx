import Image from "next/image";
import { ArrowDown, ArrowUpRight, MapPin } from "lucide-react";
import { Header } from "./site-header";
import { WHATSAPP_URL } from "@/lib/site-data";

export function Hero() {
  return (
    <section id="inicio" className="relative isolate min-h-[780px] overflow-hidden bg-black sm:min-h-[840px] lg:min-h-[900px]">
      <Image
        src="/imagens/hero-drone.jpg"
        alt="Pessoa segurando um drone diante de uma escultura vermelha no litoral"
        fill
        priority
        sizes="100vw"
        className="hero-image object-cover object-[62%_center] sm:object-[58%_center] lg:object-[50%_52%]"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,3,4,.38)_0%,rgba(3,3,4,.08)_28%,rgba(3,3,4,.48)_68%,#080809_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,.84)_0%,rgba(0,0,0,.6)_48%,rgba(0,0,0,.18)_100%)] max-sm:bg-[linear-gradient(180deg,rgba(0,0,0,.56)_0%,rgba(0,0,0,.22)_34%,rgba(0,0,0,.78)_70%,rgba(8,8,9,.96)_100%)]" />
      <div aria-hidden="true" className="film-grain absolute inset-0 opacity-[.13]" />

      <Header />

      <div aria-hidden="true" className="absolute right-[13%] top-[30%] hidden h-16 w-16 border-r border-t border-white/50 lg:block" />

      <div className="relative z-10 mx-auto flex min-h-[780px] max-w-[1440px] flex-col justify-end px-5 pb-8 pt-32 sm:min-h-[840px] sm:px-8 sm:pb-10 lg:min-h-[900px] lg:px-14 lg:pb-12 xl:px-20">
        <div className="max-w-[760px] pb-14 sm:pb-16">
          <div className="hero-enter hero-enter-1 mb-5 flex items-center gap-3 text-[.76rem] font-semibold uppercase tracking-[.22em] text-white/70 sm:text-[.8rem]">
            <span className="h-px w-9 bg-primary" />
            Filmagens aéreas e terrestres
          </div>

          <h1 className="hero-enter hero-enter-2 max-w-[13ch] text-balance text-[clamp(3.35rem,12vw,5.7rem)] font-semibold leading-[.9] tracking-[-.065em] text-white lg:text-[clamp(5.7rem,7.4vw,7.4rem)]">
            Vídeos que valorizam os <span className="font-serif font-normal italic tracking-[-.045em] text-white/92">momentos.</span>
          </h1>

          <div className="hero-enter hero-enter-3 mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex min-h-14 items-center gap-4 rounded-full bg-primary px-6 text-[.92rem] font-bold text-white shadow-[0_14px_40px_rgba(13,92,99,.3)] transition duration-300 hover:-translate-y-0.5 hover:bg-primary-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              Solicitar orçamento
              <span className="grid size-8 place-items-center rounded-full bg-black/18 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                <ArrowUpRight aria-hidden="true" size={17} strokeWidth={2.25} />
              </span>
            </a>

            <a
              href="#servicos"
              className="group inline-flex min-h-12 items-center gap-3 px-2 text-sm font-semibold text-white/78 transition hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              Conheça o nosso olhar
              <ArrowDown aria-hidden="true" size={16} className="transition-transform duration-300 group-hover:translate-y-1" />
            </a>
          </div>
        </div>

        <div className="border-t border-white/20 pt-6">
          <div className="flex items-center gap-2 text-base font-semibold text-primary-readable sm:text-lg">
            <MapPin aria-hidden="true" size={16} className="text-primary-readable" />
            Atendimento em todo o estado de São Paulo
          </div>
        </div>
      </div>
    </section>
  );
}
