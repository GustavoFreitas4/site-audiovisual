import Image from "next/image";

export function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-black px-5 py-14 sm:px-8 sm:py-16 lg:px-14 xl:px-20">
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/45 to-transparent" />
      <div className="mx-auto flex max-w-[1440px] justify-center">
        <a
          href="#inicio"
          aria-label="Gustavo Freitas — voltar ao início"
          className="block w-[clamp(15rem,38vw,23rem)] transition duration-300 hover:scale-[1.02] hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
        >
          <Image
            src="/gustavo-freitas-logo.png"
            alt="Gustavo Freitas"
            width={2170}
            height={725}
            sizes="(max-width: 639px) 240px, 368px"
            className="h-auto w-full object-contain"
          />
        </a>
      </div>
    </footer>
  );
}
