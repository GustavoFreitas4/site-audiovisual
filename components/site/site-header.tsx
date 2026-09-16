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
            className="group inline-flex h-11 w-11 items-center justify-center gap-1.5 whitespace-nowrap rounded-full border border-[#e1306c] bg-[#e1306c] p-0 text-[11px] font-semibold text-white shadow-[0_8px_24px_rgba(225,48,108,.22)] transition duration-300 hover:-translate-y-0.5 hover:border-[#c92a61] hover:bg-[#c92a61] hover:shadow-[0_10px_28px_rgba(225,48,108,.32)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white min-[360px]:w-auto min-[360px]:px-2.5 md:gap-2 md:px-4 md:text-sm"
          >
            <img src="/instagram.svg" alt="" aria-hidden="true" className="size-4 shrink-0" />
            <span className="sr-only min-[360px]:not-sr-only">Instagram</span>
          </a>

          <a
            href="https://wa.me/5513981197505"
            target="_blank"
            rel="noreferrer"
            aria-label="WhatsApp da DOSKY"
            title="WhatsApp"
            className="group inline-flex h-11 w-11 items-center justify-center gap-1.5 whitespace-nowrap rounded-full border border-[#25d366] bg-[#25d366] p-0 text-[11px] font-semibold text-white shadow-[0_8px_24px_rgba(37,211,102,.2)] transition duration-300 hover:-translate-y-0.5 hover:border-[#1fbd5a] hover:bg-[#1fbd5a] hover:shadow-[0_10px_28px_rgba(37,211,102,.3)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white min-[360px]:w-auto min-[360px]:px-2.5 md:gap-2 md:px-4 md:text-sm"
          >
            <img src="/whatsapp.svg" alt="" aria-hidden="true" className="size-4 shrink-0" />
            <span className="sr-only min-[360px]:not-sr-only">WhatsApp</span>
          </a>
        </div>
      </div>
    </header>
  );
}
