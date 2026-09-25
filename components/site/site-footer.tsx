import Image from "next/image";

export function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-black pb-4 pt-5 sm:pb-5 sm:pt-6">
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/45 to-transparent" />
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-14 xl:px-20">
        <a
          href="#inicio"
          aria-label="Gustavo Freitas — voltar ao início"
          className="block w-[clamp(15rem,38vw,23rem)] transition duration-300 hover:scale-[1.02] hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
        >
          <Image
            src="/gustavo-freitas-videomaker-logo.png"
            alt="Gustavo Freitas Videomaker"
            width={590}
            height={184}
            sizes="(max-width: 639px) 240px, 368px"
            className="h-auto w-full object-contain"
          />
        </a>

        <div className="mt-4 border-t border-white/10 pt-3">
          <p className="text-[.75rem] font-normal leading-relaxed tracking-[.08em] text-white/50 sm:text-[.8rem]">
            © 2026 Gustavo Freitas Videomaker • Todos os direitos reservados
          </p>
        </div>
      </div>
    </footer>
  );
}
