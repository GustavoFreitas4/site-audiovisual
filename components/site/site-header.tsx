import Image from "next/image";

export function Header() {
  return (
    <header className="absolute inset-x-0 top-0 z-20">
      <div className="relative mx-auto grid max-w-[1440px] grid-cols-[auto_minmax(0,1fr)_auto] items-center border-b border-white/16 px-5 py-4 sm:px-8 lg:px-14 xl:px-20">
        <a href="#inicio" aria-label="DOSKY Drone — início" className="col-start-1 flex shrink-0 items-center focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
          <span className="relative size-12 overflow-hidden rounded-full border border-white/20 bg-white shadow-[0_6px_24px_rgba(0,0,0,.25)] sm:size-14">
            <Image src="/dosky-logo.png" alt="" fill sizes="56px" className="object-cover" />
          </span>
        </a>

        <nav aria-label="Navegação principal" className="col-start-2 justify-self-center text-xs font-medium text-white/65 md:absolute md:left-1/2 md:-translate-x-1/2 md:text-sm">
          <a className="transition hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white" href="#servicos">Serviços</a>
        </nav>

        <div className="col-start-3 ml-auto flex shrink-0 items-center gap-1.5 sm:gap-2">
          <a
            href="https://www.instagram.com/doskydrone/"
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram da DOSKY"
            title="Instagram"
            className="group inline-flex h-11 w-11 items-center justify-center gap-1.5 whitespace-nowrap rounded-full border border-white/25 bg-black/20 p-0 text-[11px] font-semibold text-white backdrop-blur-md transition duration-300 hover:border-white/50 hover:bg-white hover:text-black focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white min-[360px]:w-auto min-[360px]:px-2.5 md:gap-2 md:px-4 md:text-sm"
          >
            <img src="/instagram.svg" alt="" aria-hidden="true" className="size-4 shrink-0 transition duration-300 group-hover:invert" />
            <span className="sr-only min-[360px]:not-sr-only">Instagram</span>
          </a>

          <a
            href="https://wa.me/5513981197505"
            target="_blank"
            rel="noreferrer"
            aria-label="WhatsApp da DOSKY"
            title="WhatsApp"
            className="group inline-flex h-11 w-11 items-center justify-center gap-1.5 whitespace-nowrap rounded-full border border-[#ff2b2f]/55 bg-[#ff2b2f]/12 p-0 text-[11px] font-semibold text-white backdrop-blur-md transition duration-300 hover:border-[#ff2b2f] hover:bg-[#ff2b2f] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white min-[360px]:w-auto min-[360px]:px-2.5 md:gap-2 md:px-4 md:text-sm"
          >
            <img src="/whatsapp.svg" alt="" aria-hidden="true" className="size-4 shrink-0" />
            <span className="sr-only min-[360px]:not-sr-only">WhatsApp</span>
          </a>
        </div>
      </div>
    </header>
  );
}
