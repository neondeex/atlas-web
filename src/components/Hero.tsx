"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import EarlyBeta from "./EarlyBeta";
import { ShimmerButton } from "./ui/shimmer-button";
import { TypingAnimation } from "./ui/typing-animation";
import { BorderBeam } from "./ui/border-beam";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isBetaOpen, setIsBetaOpen] = useState(false);

  useEffect(() => {
    const handleOpenBeta = () => setIsBetaOpen(true);
    window.addEventListener('open-early-beta', handleOpenBeta);
    return () => window.removeEventListener('open-early-beta', handleOpenBeta);
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;
    
    const ctx = gsap.context(() => {
      const elements = gsap.utils.toArray('.hero-anim');
      
      gsap.set(elements, {
        y: 40,
        opacity: 0,
        filter: "blur(10px)",
        scale: 0.98
      });

      gsap.to(elements, {
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        scale: 1,
        duration: 1.2,
        stagger: 0.15,
        ease: "power4.out",
        delay: 0.2
      });
      
      // Giant parallax zoom effect on the mockup card
      gsap.fromTo(".app-screenshot",
        { 
          scale: 0.85, 
          y: 100, 
          rotationX: 15,
          opacity: 0,
          filter: "blur(15px)"
        },
        {
          scale: 1,
          y: 0,
          rotationX: 4,
          rotationY: -2,
          rotationZ: 1,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1.5,
          ease: "expo.out",
          delay: 0.6,
          transformPerspective: 1000
        }
      );

      const screenshot = document.querySelector('.app-screenshot') as HTMLElement;
      if (screenshot) {
        screenshot.addEventListener('mousemove', (e) => {
          const rect = screenshot.getBoundingClientRect();
          const x = (e.clientX - rect.left) / rect.width - 0.5;
          const y = (e.clientY - rect.top) / rect.height - 0.5;
          
          gsap.to(screenshot, {
            rotationY: x * 6 - 2,
            rotationX: -y * 6 + 4,
            rotationZ: 1,
            duration: 0.4,
            ease: "power2.out",
            transformPerspective: 1000
          });
        });
        
        screenshot.addEventListener('mouseleave', () => {
          gsap.to(screenshot, {
            rotationY: -2,
            rotationX: 4,
            rotationZ: 1,
            duration: 0.8,
            ease: "power2.out",
            transformPerspective: 1000
          });
        });
      }

      // Continuous blob animations
      gsap.utils.toArray('.hero-blob').forEach((blob, i) => {
        gsap.to(blob as Element, {
          x: "random(-150, 150)",
          y: "random(-150, 150)",
          rotation: "random(-90, 90)",
          scale: "random(0.8, 1.2)",
          duration: "random(5, 10)",
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          delay: i * -2 // Offset starting times
        });
      });
      
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative min-h-[90vh] flex flex-col items-center justify-center pt-32 pb-20 px-6 overflow-hidden [perspective:1000px]">
      {/* Aceternity-style Grid & Background Animated Blobs */}
      <div className="absolute inset-0 -z-10 bg-background overflow-hidden bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]">
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-background [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        <div className="hero-blob absolute top-[20%] left-[30%] w-[500px] h-[500px] bg-destructive/20 rounded-full blur-[100px] mix-blend-screen" />
        <div className="hero-blob absolute top-[40%] left-[60%] w-[600px] h-[600px] bg-ring/20 rounded-full blur-[120px] mix-blend-screen" />
        <div className="hero-blob absolute top-[10%] left-[50%] w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[90px] mix-blend-screen" />
      </div>

      <div className="max-w-4xl mx-auto text-center space-y-8 z-10">
        <h1 className="hero-anim text-5xl md:text-7xl font-bold tracking-tight text-foreground">
          The ultimate file manager.
        </h1>
        <TypingAnimation 
          className="hero-anim text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed" 
          text="Navigate, organize, and preview your files at the speed of thought. Built for power users." 
          delay={500}
        />
        
        <div className="hero-anim flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
          <ShimmerButton onClick={() => setIsBetaOpen(true)} className="w-full sm:w-auto px-8 py-4 font-semibold text-lg flex items-center justify-center gap-2">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M0 3.449L9.75 2.1v9.181H0V3.449zM10.949 1.932L24 0v11.161H10.949V1.932zM0 12.355h9.75v9.181L0 20.203v-7.848zM10.949 12.355H24v11.161l-13.051-1.805v-9.356z"/></svg>
            Download for Windows
          </ShimmerButton>
        </div>

        <div className="hero-anim flex items-center justify-center gap-4 text-sm text-muted-foreground pt-4">
          <span>v0.0.1 Beta</span>
          <span className="w-1 h-1 rounded-full bg-muted-foreground/50" />
          <span>Windows 10/11</span>
        </div>
      </div>
      
      {/* App Screenshot Reveal */}
      <div className="app-screenshot mt-20 w-full max-w-5xl relative z-10 origin-bottom">
        <div className="absolute -inset-10 bg-gradient-to-r from-destructive/20 to-ring/20 blur-3xl rounded-full opacity-50"></div>
        
        <div className="relative rounded-2xl border border-white/10 shadow-[0_30px_100px_-20px_rgba(0,0,0,0.8)] overflow-hidden bg-black/50 backdrop-blur-sm">
          <img src="/images/app-screenshot.png" alt="Atlas App Interface" className="w-full h-auto object-cover opacity-90" />
          <BorderBeam size={400} duration={12} delay={9} />
        </div>
      </div>
      
      <EarlyBeta isOpen={isBetaOpen} onClose={() => setIsBetaOpen(false)} />
    </section>
  );
}
