"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "Is Atlas Open Source?",
    answer: "Atlas is proprietary software, but we are committed to open-sourcing various underlying libraries and tools we've built along the way to give back to the Rust community."
  },
  {
    question: "How much will Atlas cost?",
    answer: "Atlas will be a one-time purchase of $19.99 for a lifetime license (no subscriptions, ever). Right now, you can get Early Access for just $9.99 (50% off) which includes the final license and all future updates."
  },
  {
    question: "Does Atlas collect my data?",
    answer: "Absolutely not. Atlas is designed to be 100% local-first. We do not collect telemetry, usage data, or file metadata. Your files never leave your machine."
  },
  {
    question: "Will it work on macOS and Linux?",
    answer: "Currently, our v0.0.1 Beta is optimized for Windows 10/11 because it's where a better file manager is needed most. macOS and Linux versions are on our roadmap for later this year."
  }
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 px-6 md:px-12 bg-background">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-foreground">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-muted-foreground">
            Everything you need to know about the product and pricing.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="border border-white/10 rounded-2xl bg-secondary/10 overflow-hidden transition-all duration-300"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="flex items-center justify-between w-full p-6 text-left"
              >
                <span className="font-semibold text-lg">{faq.question}</span>
                <ChevronDown 
                  className={`w-5 h-5 text-muted-foreground transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`} 
                />
              </button>
              
              <div 
                className={`px-6 transition-all duration-300 ease-in-out ${
                  openIndex === index 
                    ? "max-h-[500px] opacity-100 pb-6" 
                    : "max-h-0 opacity-0 overflow-hidden"
                }`}
              >
                <p className="text-muted-foreground leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
