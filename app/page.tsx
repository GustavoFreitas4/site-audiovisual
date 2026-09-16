import { Hero } from "@/components/site/hero";
import { Services } from "@/components/site/services";
import { FloatingWhatsApp } from "@/components/site/floating-whatsapp";

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      <Hero />
      <Services />
      <FloatingWhatsApp />
    </main>
  );
}
