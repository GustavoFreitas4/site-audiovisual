import { MoreHorizontal, Star } from "lucide-react";

const REVIEWS = [
  {
    name: "Daniel Jhones",
    time: "uma semana atrás",
    text: "Experiência incrível! Equipe super profissional, atenciosa e criativa. As imagens de drone ficaram perfeitas, com ângulos que jamais imaginaríamos. Preço justo e entrega antes do prazo. Nota 1000!",
    rating: 5,
    initials: "DJ",
  },
  {
    name: "Vinicius Lima",
    time: "uma semana atrás",
    text: "Atendimento incrível. Minha festa ficou ainda melhor com as gravações do profissional Gustavo. Super recomendo o trabalho e com toda certeza irei contratá-lo mais vezes.",
    rating: 5,
    initials: "VL",
  },
  {
    name: "Jordan Julio",
    time: "3 semanas atrás",
    text: "Profissionalismo resume essa empresa, impecáveis, pontuais, atenciosos e prestativos. Gustavo faz parecer pilotar um drone a coisa mais fácil do mundo pq ele faz isso com uma naturalidade que você acredita ser fácil, mas não é, ele é excelente no que faz, super recomendo, as imagens do meu aniversário ficaram perfeitas, uma empresa que indico sem pensar duas vezes.",
    rating: 5,
    initials: "JJ",
  },
] as const;

const GOOGLE_BUSINESS_URL = "https://share.google/tCj6ev2uhCmjiiyxj";

function GoogleMark({ className = "size-5" }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={className}>
      <path fill="#4285F4" d="M21.4 12.23c0-.72-.06-1.25-.2-1.81H12v3.51h5.4a4.74 4.74 0 0 1-2 3.05l3.1 2.4c1.82-1.68 2.9-4.15 2.9-7.15Z" />
      <path fill="#34A853" d="M12 21.75c2.6 0 4.78-.85 6.38-2.32l-3.1-2.4c-.86.57-1.96.92-3.28.92-2.5 0-4.62-1.69-5.38-3.96l-3.2 2.47A9.64 9.64 0 0 0 12 21.75Z" />
      <path fill="#FBBC05" d="M6.62 13.99a5.82 5.82 0 0 1 0-3.73l-3.2-2.48a9.77 9.77 0 0 0 0 8.68l3.2-2.47Z" />
      <path fill="#EA4335" d="M12 6.3c1.42 0 2.69.49 3.69 1.44l2.76-2.7A9.25 9.25 0 0 0 12 2.25a9.64 9.64 0 0 0-8.58 5.53l3.2 2.48A5.73 5.73 0 0 1 12 6.3Z" />
    </svg>
  );
}

function RatingStars({ rating, className = "size-5" }: { rating: number; className?: string }) {
  return (
    <div className="flex items-center gap-1" aria-label={`${rating} de 5 estrelas`}>
      {Array.from({ length: 5 }, (_, index) => (
        <Star
          key={index}
          aria-hidden="true"
          className={`${className} ${index < rating ? "fill-[#FABB05] text-[#FABB05]" : "text-white/18"}`}
          strokeWidth={1.7}
        />
      ))}
    </div>
  );
}

export function Reviews() {
  return (
    <section id="avaliacoes" aria-labelledby="reviews-title" className="mt-20 sm:mt-28">
      <header className="text-center">
        <p className="mb-3 text-[.7rem] font-semibold uppercase tracking-[.24em] text-primary-readable">Depoimentos</p>
        <h2 id="reviews-title" className="text-balance text-[clamp(2.2rem,6vw,4.4rem)] font-semibold leading-[.98] tracking-[-.05em]">
          O que nossos clientes dizem
        </h2>
        <p className="mt-3 text-sm text-white/45 sm:text-base">Avaliações no Google</p>
      </header>

      <div className="mx-auto mt-9 flex max-w-4xl flex-col items-center justify-center gap-7 border-y border-white/10 py-7 sm:mt-11 sm:flex-row sm:gap-10 sm:py-8">
        <div className="flex items-center gap-5 sm:gap-7">
          <span className="font-serif text-6xl italic leading-none tracking-[-.05em] text-white sm:text-7xl">5.0</span>
          <div>
            <RatingStars rating={5} className="size-5 sm:size-6" />
            <p className="mt-2 text-xs tracking-wide text-white/42 sm:text-sm">Avaliação média no Google</p>
          </div>
        </div>

        <a
          href={GOOGLE_BUSINESS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex min-h-12 items-center gap-3 rounded-full border border-white/18 bg-white/[.035] px-5 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:border-primary-readable/65 hover:bg-primary/15 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-readable"
          aria-label="Ver avaliações no Google"
        >
          <GoogleMark className="size-5" />
          Ver no Google <span aria-hidden="true" className="text-primary-readable transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
        </a>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3 lg:gap-5">
        {REVIEWS.map((review) => (
          <article
            key={review.name}
            className="group flex min-h-64 flex-col rounded-2xl border border-white/10 bg-white/[.03] p-5 transition duration-300 hover:-translate-y-1 hover:border-primary/60 hover:bg-primary/[.07] hover:shadow-[0_18px_50px_rgba(13,92,99,.13)] sm:p-6"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex min-w-0 items-center gap-3">
                <div aria-hidden="true" className="grid size-11 shrink-0 place-items-center rounded-full border border-primary/45 bg-primary/20 text-xs font-bold tracking-[.08em] text-primary-readable">
                  {review.initials}
                </div>
                <div className="min-w-0">
                  <h3 className="truncate text-sm font-semibold text-white sm:text-base">{review.name}</h3>
                  <p className="mt-0.5 text-xs text-white/38">{review.time}</p>
                </div>
              </div>
              <GoogleMark className="size-5 shrink-0 opacity-90" />
            </div>

            <div className="mt-5">
              <RatingStars rating={review.rating} className="size-4" />
            </div>

            <p className="mt-4 text-sm leading-6 text-white/62">{review.text}</p>

            <MoreHorizontal aria-hidden="true" className="mt-auto self-end pt-5 text-white/28 transition-colors group-hover:text-primary-readable" size={21} />
          </article>
        ))}
      </div>
    </section>
  );
}
