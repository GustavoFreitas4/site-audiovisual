"use client";

import { type MouseEvent } from "react";
import { Building2, Megaphone, PartyPopper } from "lucide-react";
import { serviceGalleries, type ServiceGalleryDefinition } from "../data/video-galleries";

export type ServiceGalleryCardsProps = {
  services?: readonly ServiceGalleryDefinition[];
  /** Use com router.push/navigate para navegação SPA. Sem esta prop, o link navega normalmente. */
  onNavigate?: (href: string) => void;
};

const serviceIcons = {
  eventos: PartyPopper,
  marcas: Megaphone,
  imoveis: Building2,
} as const;

export function ServiceGalleryCards({
  services = serviceGalleries,
  onNavigate,
}: ServiceGalleryCardsProps) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!onNavigate) return;
    event.preventDefault();
    onNavigate(href);
  };

  return (
    <div className="divide-y divide-white/10 border-y border-white/10 bg-black/20">
      {services.map((service, index) => {
        const Icon = serviceIcons[service.id];

        return (
          <a
            key={service.id}
            href={service.href}
            onClick={(event) => handleClick(event, service.href)}
            className="group grid gap-5 py-8 text-inherit no-underline transition-colors duration-300 hover:bg-[radial-gradient(circle_at_right_center,rgba(13,92,99,.10),transparent_60%)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#43A6AE] sm:grid-cols-[4rem_1fr_auto] sm:items-start sm:gap-7 sm:py-10"
            aria-label={`Abrir galeria de vídeos de ${service.title}`}
          >
            <span className="text-sm font-semibold tracking-[.16em] text-[#43A6AE]/70 transition duration-300 group-hover:text-[#43A6AE]">
              {String(index + 1).padStart(2, "0")}
            </span>

            <div>
              <h3 className="text-3xl font-semibold tracking-[-.035em] text-white sm:text-4xl">
                {service.title}
              </h3>
              <p className="mt-3 max-w-xl text-base leading-7 text-white/55">
                {service.description}
              </p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {service.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full border border-white/12 px-3 py-1.5 text-xs font-medium text-white/50"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </div>

            <span className="hidden size-14 place-items-center rounded-full border border-white/12 text-white/55 transition duration-300 group-hover:border-[#0D5C63]/70 group-hover:bg-[#0D5C63] group-hover:text-white sm:grid">
              <Icon aria-hidden="true" size={22} strokeWidth={1.6} />
            </span>
          </a>
        );
      })}
    </div>
  );
}
