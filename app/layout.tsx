import type { Metadata } from "next";
import { Manrope, Playfair_Display } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://dosky-drone-sp.freitasdossantos128.chatgpt.site"),
  title: "DOSKY Drone | Filmagens aéreas em São Paulo",
  description:
    "Filmagens com drone e captação terrestre para eventos, publicidade e imóveis na Baixada Santista e em todo o estado de São Paulo.",
  keywords: [
    "filmagem com drone Baixada Santista",
    "drone casamento Santos",
    "filmagem aérea São Paulo",
    "vídeo para imóveis",
    "filmagem de eventos",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "DOSKY Drone | Filmagens aéreas em São Paulo",
    description:
      "Filmagens aéreas e terrestres para eventos, publicidade e imóveis em todo o estado de São Paulo.",
    url: "/",
    siteName: "DOSKY Drone",
    locale: "pt_BR",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/dosky-logo.png",
    shortcut: "/dosky-logo.png",
    apple: "/dosky-logo.png",
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "DOSKY Drone",
  url: "https://dosky-drone-sp.freitasdossantos128.chatgpt.site",
  logo: "https://dosky-drone-sp.freitasdossantos128.chatgpt.site/dosky-logo.png",
  image: "https://dosky-drone-sp.freitasdossantos128.chatgpt.site/hero-baixada.webp",
  telephone: "+55 13 98119-7505",
  slogan: "Vídeos que valorizam os momentos.",
  description:
    "Filmagens aéreas com drone e filmagens terrestres para eventos, publicidade e imóveis.",
  areaServed: {
    "@type": "State",
    name: "São Paulo",
  },
  sameAs: ["https://www.instagram.com/doskydrone/"],
  serviceType: [
    "Filmagem de eventos",
    "Filmagem publicitária",
    "Filmagem aérea de imóveis",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+55 13 98119-7505",
    contactType: "sales",
    availableLanguage: "Portuguese",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${manrope.variable} ${playfair.variable}`}>
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </body>
    </html>
  );
}
