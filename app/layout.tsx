import type { Metadata } from "next";
import { Manrope, Playfair_Display } from "next/font/google";
import { MotionController } from "@/components/site/motion-controller";
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
  title: "Gustavo Videomaker",
  description:
    "Gustavo Videomaker — filmagens com drone e captação terrestre para eventos, publicidade e imóveis na Baixada Santista e em todo o estado de São Paulo.",
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
  manifest: "/site.webmanifest",
  openGraph: {
    title: "Gustavo Videomaker",
    description:
      "Gustavo Videomaker — filmagens aéreas e terrestres para eventos, publicidade e imóveis em todo o estado de São Paulo.",
    url: "/",
    siteName: "Gustavo Videomaker",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "/images/favicon-gf.png",
        width: 1254,
        height: 1254,
        alt: "Logo circular GF — Gustavo Videomaker",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Gustavo Videomaker",
    description:
      "Gustavo Videomaker — filmagens aéreas e terrestres para eventos, publicidade e imóveis em todo o estado de São Paulo.",
    images: ["/images/favicon-gf.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: "/images/favicon-gf-16.png", sizes: "16x16", type: "image/png" },
      { url: "/images/favicon-gf-32.png", sizes: "32x32", type: "image/png" },
      { url: "/images/favicon-gf-192.png", sizes: "192x192", type: "image/png" },
      { url: "/images/favicon-gf-512.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: "/images/favicon-gf-32.png",
    apple: [{ url: "/images/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Gustavo Videomaker",
  url: "https://dosky-drone-sp.freitasdossantos128.chatgpt.site",
  logo: "https://dosky-drone-sp.freitasdossantos128.chatgpt.site/images/favicon-gf.png",
  image: "https://dosky-drone-sp.freitasdossantos128.chatgpt.site/hero-baixada.webp",
  telephone: "+55 13 98119-7505",
  slogan: "Vídeos que valorizam os momentos.",
  description:
    "Filmagens aéreas com drone e filmagens terrestres para eventos, publicidade e imóveis.",
  areaServed: {
    "@type": "State",
    name: "São Paulo",
  },
  sameAs: ["https://www.instagram.com/gustavofmaker"],
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
        <MotionController />
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </body>
    </html>
  );
}
