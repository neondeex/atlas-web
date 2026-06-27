"use client";

import Link from "next/link";
import { useEffect, useRef, useState, FormEvent } from "react";
import gsap from "gsap";
import { Turnstile } from '@marsidev/react-turnstile';
import EarlyBeta from "./EarlyBeta";
import { ShimmerButton } from "./ui/shimmer-button";
import { TypingAnimation } from "./ui/typing-animation";
import { BorderBeam } from "./ui/border-beam";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isBetaOpen, setIsBetaOpen] = useState(false);
  
  // Waitlist form state
  const [email, setEmail] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleWaitlistSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (status === "loading" || status === "success") return;
    
    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, honeypot, turnstileToken }),
      });

      const data = await res.json();
      
      if (data.success) {
        setStatus("success");
      } else {
        setStatus("error");
        setErrorMessage(data.error || "Failed to join waitlist");
      }
    } catch (err) {
      setStatus("error");
      setErrorMessage("Network error. Please try again.");
    }
  };

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
        <div className="hero-anim inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs font-medium text-zinc-300">
          <span className="text-[#e57324]">⚡</span> Built with Rust • 0.1ms search latency
        </div>
        <h1 className="hero-anim text-5xl md:text-7xl font-bold tracking-tight text-foreground">
          The ultimate file manager.
        </h1>
        <TypingAnimation 
          className="hero-anim text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed" 
          text="Navigate, organize, and preview your files at the speed of thought. Built for power users." 
          delay={500}
        />
        
        <div className="hero-anim flex flex-col items-center justify-center gap-4 pt-8 w-full max-w-md mx-auto">
          {status === "success" ? (
            <div className="w-full px-4 py-4 rounded-xl border border-green-500/30 bg-green-500/10 text-green-400 font-medium text-center">
              🎉 You're on the list! We'll be in touch soon.
            </div>
          ) : (
            <form className="flex w-full items-center space-x-2 relative" onSubmit={handleWaitlistSubmit}>
              {/* Invisible Honeypot to catch bots */}
              <input 
                type="text" 
                name="name_confirm" 
                className="hidden absolute top-0 left-0" 
                value={honeypot} 
                onChange={(e) => setHoneypot(e.target.value)}
                tabIndex={-1} 
                autoComplete="off" 
              />
              
              <input 
                type="email" 
                placeholder="Enter your email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={status === "loading"}
                className="flex-1 px-4 py-4 rounded-xl border border-white/10 bg-white/5 text-white focus:outline-none focus:ring-2 focus:ring-foreground/50 transition-all placeholder:text-zinc-500 disabled:opacity-50"
                required
              />
              <button 
                type="submit" 
                disabled={status === "loading"}
                className="px-6 py-4 font-semibold text-background bg-foreground rounded-xl hover:opacity-90 transition-all whitespace-nowrap disabled:opacity-50"
              >
                {status === "loading" ? "Joining..." : "Join Waitlist"}
              </button>
            </form>
          )}

          {status === "error" && (
            <div className="text-red-400 text-sm font-medium">{errorMessage}</div>
          )}

          {/* Cloudflare Turnstile Widget - Only renders if NEXT_PUBLIC_TURNSTILE_SITE_KEY is set */}
          {process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY && status !== "success" && (
            <div className="mt-2">
              <Turnstile 
                siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY} 
                onSuccess={(token) => setTurnstileToken(token)}
                options={{ theme: 'dark', size: 'flexible' }}
              />
            </div>
          )}
          
          <div className="flex items-center gap-4 text-xs font-medium text-muted-foreground mt-2">
            <button onClick={() => setIsBetaOpen(true)} className="hover:text-white transition-colors underline underline-offset-4 decoration-white/20">
              Or pre-order v0.0.1 Beta
            </button>
          </div>
        </div>

        <div className="hero-anim flex items-center justify-center gap-2 text-sm text-muted-foreground pt-4">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
          <span className="font-medium">100% Local & Private.</span>
          <span className="opacity-70">Atlas never uploads your files.</span>
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
