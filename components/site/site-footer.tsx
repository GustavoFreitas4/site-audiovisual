import Image from "next/image";

export function Footer() {
  return (
    <footer className="bg-black">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-3 px-5 py-2.5 sm:gap-4 sm:px-8 sm:py-3 lg:px-14 xl:px-20">
        <a
          href="#inicio"
          aria-label="Gustavo Freitas — voltar ao início"
          className="block w-[clamp(9.5rem,28vw,13.5rem)] shrink-0 transition duration-300 hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
        >
          <Image
            src="/gustavo-freitas-videomaker-logo-hd.png"
            alt="Gustavo Freitas Videomaker"
            width={1770}
            height={552}
            sizes="(max-width: 639px) 152px, 216px"
            className="h-auto w-full object-contain"
            unoptimized
          />
        </a>

        <p className="max-w-[19rem] text-right text-[.625rem] font-normal leading-relaxed tracking-[.06em] text-white/55 sm:max-w-none sm:whitespace-nowrap sm:text-[.6875rem]">
          © 2026 Gustavo Freitas Videomaker • Todos os direitos reservados
        </p>
      </div>
    </footer>
  );
}
