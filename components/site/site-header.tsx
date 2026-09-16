import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { WHATSAPP_URL } from "@/lib/site-data";

export function Header() {
  return (
    <header className="absolute inset-x-0 top-0 z-20">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between border-b border-white/16 px-5 py-4 sm:px-8 lg:px-14 xl:px-20">
        <a href="#inicio" aria-label="DOSKY Drone — início" className="flex items-center gap-3 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
          <span className="relative size-12 overflow-hidden rounded-full border border-white/20 bg-white shadow-[0_6px_24px_rgba(0,0,0,.25)] sm:size-14">
            <Image src="/dosky-logo.png" alt="" fill sizes="56px" className="object-cover" />
          </span>
          <span className="hidden sm:block">
            <span className="block text-[1rem] font-extrabold uppercase leading-none tracking-[.18em] text-white">Dosky</span>
            <span className="mt-1 block text-[.62rem] font-medium uppercase tracking-[.27em] text-white/50">Drone filmes</span>
          </span>
        </a>

        <nav aria-label="Navegação principal" className="hidden items-center gap-8 text-sm font-medium text-white/65 md:flex">
          <a className="transition hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white" href="#inicio">Início</a>
          <a className="transition hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white" href="#servicos">Serviços</a>
        </nav>

        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noreferrer"
          className="group inline-flex min-h-11 items-center gap-2 rounded-full border border-white/25 bg-black/20 px-4 text-sm font-semibold text-white backdrop-blur-md transition hover:border-white/50 hover:bg-white hover:text-black focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:px-5"
        >
          <span className="sm:hidden">Orçamento</span>
          <span className="hidden sm:inline">Fale com a DOSKY</span>
          <ArrowUpRight aria-hidden="true" size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </div>
    </header>
  );
}
