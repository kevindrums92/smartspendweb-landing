import { Header } from "@/components/header";
import { Hero } from "@/components/sections/hero";
import { AIBatchEntry } from "@/components/sections/ai-batch-entry";
import { Features } from "@/components/sections/features";
import { Privacy } from "@/components/sections/privacy";
import { Footer } from "@/components/sections/footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <section id="ai-batch-entry">
        <AIBatchEntry />
      </section>
      <section id="features">
        <Features />
      </section>
      <section id="privacy">
        <Privacy />
      </section>
      <Footer />
    </main>
  );
}
