import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import { KeyboardShortcuts } from "@/components/KeyboardShortcuts";

import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <Features />
      <KeyboardShortcuts />

      <Footer />
    </main>
  );
}
