import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import ExtensionHighlights from "@/components/ExtensionHighlights";
import { KeyboardShortcuts } from "@/components/KeyboardShortcuts";
import { UseCases } from "@/components/UseCases";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";
import EarlyBeta from "@/components/EarlyBeta";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <Features />
      <ExtensionHighlights />
      <KeyboardShortcuts />
      <UseCases />
      <FAQ />
      <Footer />
      <EarlyBeta />
    </main>
  );
}
