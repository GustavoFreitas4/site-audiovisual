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

        <div className="col-start-3 ml-auto flex shrink-0 items-center gap-1.5 sm:gap-2">
          <a
            href="https://www.instagram.com/doskydrone/"
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram da DOSKY"
            title="Instagram"
            className="group inline-flex h-11 w-11 items-center justify-center gap-1.5 whitespace-nowrap rounded-full border border-[#ef2d8e]/70 bg-[radial-gradient(circle_at_30%_115%,#f68c1e_0%,#f36141_32%,#ef2d8e_56%,#c82f92_80%,#553592_100%)] p-0 text-[11px] font-semibold text-white shadow-[0_8px_24px_rgba(239,45,142,.28)] transition duration-300 hover:-translate-y-0.5 hover:brightness-110 hover:shadow-[0_10px_28px_rgba(239,45,142,.4)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white min-[360px]:w-auto min-[360px]:px-2.5 md:gap-2 md:px-4 md:text-sm"
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
            className="group inline-flex h-11 w-11 items-center justify-center gap-1.5 whitespace-nowrap rounded-full border border-[#0dbf43] bg-[#0dbf43] p-0 text-[11px] font-semibold text-white shadow-[0_8px_24px_rgba(13,191,67,.25)] transition duration-300 hover:-translate-y-0.5 hover:border-[#0aa83a] hover:bg-[#0aa83a] hover:shadow-[0_10px_28px_rgba(13,191,67,.38)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white min-[360px]:w-auto min-[360px]:px-2.5 md:gap-2 md:px-4 md:text-sm"
          >
            <img src="/whatsapp.svg" alt="" aria-hidden="true" className="size-4 shrink-0" />
            <span className="sr-only min-[360px]:not-sr-only">WhatsApp</span>
          </a>
        </div>
      </div>
    </header>
  );
}
