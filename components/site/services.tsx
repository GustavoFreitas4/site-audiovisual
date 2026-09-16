import { ArrowUpRight } from "lucide-react";
import { SERVICES, WHATSAPP_URL } from "@/lib/site-data";

export function Services() {
  return (
    <section id="servicos" className="relative bg-[#080809] px-5 py-24 text-white sm:px-8 sm:py-32 lg:px-14 lg:py-40 xl:px-20">
      <div aria-hidden="true" className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      <div className="mx-auto max-w-[1440px]">
        <div className="grid gap-10 lg:grid-cols-[.75fr_1.25fr] lg:gap-16">
          <div className="max-w-lg">
            <p className="mb-5 flex items-center gap-3 text-[.76rem] font-semibold uppercase tracking-[.22em] text-white/45">
              <span className="size-1.5 rounded-full bg-[#ff2b2f]" />
              Serviços
            </p>
            <h2 className="text-balance text-[clamp(2.7rem,9vw,4.8rem)] font-semibold leading-[.95] tracking-[-.055em]">
              Histórias vistas de um jeito <span className="font-serif font-normal italic text-white/58">único.</span>
            </h2>
            <p className="mt-6 max-w-md text-base leading-7 text-white/52 sm:text-lg">
              Do alto ou de perto, cada filmagem é pensada para valorizar o que torna o seu projeto especial.
            </p>
          </div>

          <div className="divide-y divide-white/12 border-y border-white/12">
            {SERVICES.map((service, index) => {
              const Icon = service.icon;
              return (
                <article key={service.title} className="service-row group relative grid gap-5 py-8 sm:grid-cols-[4rem_1fr_auto] sm:items-start sm:gap-7 sm:py-10">
                  <span className="text-sm font-semibold tracking-[.16em] text-[#ff2b2f]">0{index + 1}</span>
                  <div>
                    <div className="mb-4 flex items-center gap-3 sm:hidden">
                      <Icon aria-hidden="true" size={22} strokeWidth={1.7} className="text-white/70" />
                    </div>
                    <h3 className="text-3xl font-semibold tracking-[-.035em] sm:text-4xl">{service.title}</h3>
                    <p className="mt-3 max-w-xl text-base leading-7 text-white/52">{service.description}</p>
                    <ul className="mt-5 flex flex-wrap gap-2" aria-label={`Tipos de ${service.title.toLowerCase()}`}>
                      {service.tags.map((tag) => (
                        <li key={tag} className="rounded-full border border-white/12 px-3 py-1.5 text-xs font-medium text-white/48">{tag}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="hidden size-14 place-items-center rounded-full border border-white/12 text-white/50 transition duration-300 group-hover:border-[#ff2b2f]/70 group-hover:bg-[#ff2b2f] group-hover:text-white sm:grid">
                    <Icon aria-hidden="true" size={23} strokeWidth={1.6} />
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-5 border-l-2 border-[#ff2b2f] pl-5 sm:mt-20 sm:flex-row sm:items-center sm:justify-between sm:pl-7">
          <div>
            <p className="text-xl font-semibold tracking-[-.02em] sm:text-2xl">Tem uma ideia em mente?</p>
            <p className="mt-1 text-sm text-white/48 sm:text-base">Conte para a gente. O orçamento é rápido e sem compromisso.</p>
          </div>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex min-h-12 w-fit items-center gap-3 rounded-full bg-white px-5 text-sm font-bold text-black transition hover:bg-[#ff2b2f] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            Conversar no WhatsApp
            <ArrowUpRight aria-hidden="true" size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
