import { Hero } from "@/components/site/hero";
import { Services } from "@/components/site/services";
import { FloatingWhatsApp } from "@/components/site/floating-whatsapp";
import { Header } from "@/components/site/site-header";
import { Footer } from "@/components/site/site-footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="min-h-screen overflow-hidden bg-background text-foreground">
        <Hero />
        <Services />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
