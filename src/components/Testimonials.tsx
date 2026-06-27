"use client";

import React, { useEffect, useRef } from 'react';
import { Quote } from 'lucide-react';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SpotlightCard } from '@/components/SpotlightCard';
import { Marquee } from '@/components/ui/marquee';

const testimonials = [
  {
    quote: "Atlas has completely changed how I use my Mac. It's incredibly fast and the extensions ecosystem is unparalleled.",
    author: "Alice Developer",
    handle: "@alicedev",
  },
  {
    quote: "I can't imagine working without Atlas anymore. It combines the best of spotlight, clipboard managers, and window management into one seamless tool.",
    author: "Bob Designer",
    handle: "@bobdesigns",
  },
  {
    quote: "The API is fantastic. Building custom extensions for my team's internal workflows took just a few hours and saved us countless clicks.",
    author: "Charlie Manager",
    handle: "@charliemgr",
  }
];

export function Testimonials() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Title
      gsap.fromTo(".test-title",
        { opacity: 0, scale: 0.9, filter: "blur(10px)" },
        { 
          opacity: 1, scale: 1, filter: "blur(0px)", duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%" }
        }
      );

      // Cards staggered with 3D tilt
      gsap.fromTo(".test-card",
        { opacity: 0, y: 100, rotationY: -15, rotationX: 10, transformOrigin: "center center", filter: "blur(10px)" },
        { 
          opacity: 1, y: 0, rotationY: 0, rotationX: 0, filter: "blur(0px)", 
          duration: 1.2, ease: "expo.out", stagger: 0.2,
          scrollTrigger: { trigger: sectionRef.current, start: "top 60%" }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-32 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto [perspective:1000px]">
      <div className="test-title text-center mb-20">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-white">
          Built for professionals like you.
        </h2>
      </div>

      <div className="relative flex h-[400px] w-full flex-col items-center justify-center overflow-hidden rounded-lg">
        <Marquee pauseOnHover className="[--duration:20s]">
          {testimonials.map((testimonial, index) => (
            <SpotlightCard 
              key={index} 
              className="test-card p-8 bg-secondary/20 border border-white/5 text-foreground flex flex-col justify-between hover:bg-secondary/40 transition-colors duration-500 backdrop-blur-sm w-[350px] mx-2"
              spotlightColor="rgba(255,255,255,0.06)"
            >
              <div>
                <Quote className="w-8 h-8 text-white/20 mb-6" />
                <p className="text-lg leading-relaxed mb-8 text-white/90">
                  &quot;{testimonial.quote}&quot;
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-destructive to-ring opacity-80" />
                <div>
                  <p className="font-semibold text-sm">{testimonial.author}</p>
                  <p className="text-muted-foreground text-xs">{testimonial.handle}</p>
                </div>
              </div>
            </SpotlightCard>
          ))}
        </Marquee>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-background dark:from-background"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-background dark:from-background"></div>
      </div>
    </section>
  );
}
