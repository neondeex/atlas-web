"use client";

import React, { useEffect, useRef } from 'react';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const features = [
  {
    id: "fast-fuzzyfinder",
    title: "Fast Fuzzy Finder",
    description: "Locate any file or folder instantly with our lightning-fast, highly accurate fuzzy search.",
    video: "/videos/fast-fuzzyfinder.mp4",
    span: "md:col-span-1 md:row-span-1",
  },
  {
    id: "millercolumns",
    title: "Miller Columns",
    description: "Navigate deeply nested directories efficiently with a multi-column cascading view.",
    video: "/videos/millercolumns.mp4",
    span: "md:col-span-1 md:row-span-1",
  },
  {
    id: "tabs-and-panes",
    title: "Tabs & Panes",
    description: "Manage multiple directories simultaneously with a flexible tabbed and split-pane interface.",
    video: "/videos/tabs-and-panes.mp4",
    span: "md:col-span-1 md:row-span-1",
  },
  {
    id: "drop-zone",
    title: "Drop Zone",
    description: "Use a dedicated stash area to temporarily hold files, making complex file movements a breeze.",
    video: "/videos/drop-zone.mp4",
    span: "md:col-span-1 md:row-span-1",
  },
  {
    id: "drag-and-drop",
    title: "Drag & Drop",
    description: "Intuitively move, copy, and organize files across directories with seamless mechanics.",
    video: "/videos/drag-and-drop-navigation.mp4",
    span: "md:col-span-1 md:row-span-1",
  },
  {
    id: "cloud",
    title: "Cloud Integration",
    description: "Connect and manage files across different cloud storage providers seamlessly within Atlas.",
    video: "/videos/cloud.mp4",
    span: "md:col-span-1 md:row-span-1",
  },
  {
    id: "change-icons",
    title: "Customize Icons",
    description: "Personalize your workspace by changing folder and file icons to your liking.",
    video: "/videos/change-icons.mp4",
    span: "md:col-span-1 md:row-span-1",
  },
  {
    id: "filter-by-typing",
    title: "Filter by Typing",
    description: "Instantly narrow down directory contents simply by typing what you're looking for.",
    video: "/videos/filter-by-typing.mp4",
    span: "md:col-span-1 md:row-span-1",
  }
];

export default function Features() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!sectionRef.current || !gridRef.current) return;

    const ctx = gsap.context(() => {
      // Title fades in
      gsap.fromTo(".feat-title",
        { opacity: 0, y: 50 },
        { 
          opacity: 1, y: 0, duration: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          }
        }
      );

      // Staggered reveal for bento boxes
      gsap.fromTo(".bento-card",
        { opacity: 0, y: 40, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 85%",
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="features" ref={sectionRef} className="bg-background text-foreground py-32 px-6 lg:px-12 flex flex-col items-center justify-center overflow-hidden">
      <div className="feat-title max-w-4xl w-full text-center mb-20 z-10">
        <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
          Everything you need.
          <br />
          <span className="text-muted-foreground">Nothing you don't.</span>
        </h2>
        <p className="text-lg md:text-xl text-muted-foreground font-medium max-w-2xl mx-auto">
          Atlas File Manager comes packed with powerful features designed to make you faster, more organized, and fully in control of your workflow.
        </p>
      </div>

      <div ref={gridRef} className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 auto-rows-[340px] md:auto-rows-[400px]">
        {features.map((feature) => (
          <div 
            key={feature.id} 
            className={`bento-card relative group rounded-2xl overflow-hidden border border-white/10 bg-black/40 hover:bg-black/80 transition-all duration-500 hover:scale-[1.02] md:hover:scale-[1.15] hover:z-50 hover:shadow-2xl hover:shadow-white/5 ${feature.span}`}
          >
            {/* Video Background */}
            <div className="absolute inset-0 w-full h-full p-4 pb-20 group-hover:p-0 transition-all duration-500 z-0">
              <div className="relative w-full h-full rounded-xl group-hover:rounded-2xl overflow-hidden border border-white/5 group-hover:border-transparent bg-zinc-900/50 shadow-inner transition-all duration-500">
                <video 
                  src={feature.video}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-in-out"
                />
                {/* Gradient overlay to ensure text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent z-10" />
              </div>
            </div>

            {/* Content at bottom */}
            <div className="absolute inset-x-0 bottom-0 p-6 z-20 flex flex-col justify-end translate-y-0 md:translate-y-2 md:group-hover:translate-y-0 transition-transform duration-500">
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent -z-10 h-full" />
              <h3 className="text-xl font-semibold text-white mb-2 tracking-tight flex items-center gap-2">
                {feature.title}
              </h3>
              <p className="text-sm text-zinc-400 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 delay-100 line-clamp-2">
                {feature.description}
              </p>
            </div>
            
            {/* Hover subtle border glow */}
            <div className="absolute inset-0 border-2 border-white/0 group-hover:border-white/10 rounded-2xl transition-colors duration-500 pointer-events-none" />
          </div>
        ))}
      </div>
    </section>
  );
}
