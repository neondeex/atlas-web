"use client";

import { Check, Key, ArrowRight, X, Clock, Sparkles } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { PolarEmbedCheckout } from "@polar-sh/checkout/embed";
import { BorderBeam } from "./ui/border-beam";

export default function EarlyBeta() {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener('open-early-beta', handleOpen);
    return () => window.removeEventListener('open-early-beta', handleOpen);
  }, []);

  const onClose = () => setIsOpen(false);

  // Discount timer logic
  // Target date is 30 days from 2026-06-26T17:46:29-06:00 -> 2026-07-26T17:46:29-06:00
  const [timeLeft, setTimeLeft] = useState<{ d: number; h: number; m: number; s: number } | null>(null);
  const [isDiscountActive, setIsDiscountActive] = useState(true);

  useEffect(() => {
    const targetDate = new Date("2026-07-26T17:46:29-06:00").getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance <= 0) {
        setIsDiscountActive(false);
        setTimeLeft(null);
      } else {
        setTimeLeft({
          d: Math.floor(distance / (1000 * 60 * 60 * 24)),
          h: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          m: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          s: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  // Generate the checkout URL from our Next.js API
  useEffect(() => {
    if (checkoutUrl) {
      PolarEmbedCheckout.init();
    }
  }, [checkoutUrl]);

  useEffect(() => {
    if (!isOpen || checkoutUrl) return;
    
    setIsLoading(true);
    fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId: '8d10e900-4577-40cb-8bd7-1f148501c49b' })
    })
      .then(res => res.json())
      .then(data => {
        if (data.url) setCheckoutUrl(data.url);
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, [isOpen, checkoutUrl]);

  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = "hidden";
    
    const ctx = gsap.context(() => {
      gsap.fromTo(overlayRef.current, 
        { opacity: 0, backdropFilter: "blur(0px)" }, 
        { opacity: 1, backdropFilter: "blur(8px)", duration: 0.4 }
      );
      
      gsap.fromTo(".beta-anim", 
        { y: 30, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.5, stagger: 0.05, ease: "back.out(1.2)" }
      );
    }, containerRef);

    return () => {
      document.body.style.overflow = "unset";
      ctx.revert();
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const benefits = [
    "Permanent License",
    "Early Bird - 50% Off",
    "Influence on the Roadmap",
    "Immediate Access",
    "Private Discord Community",
    "Final License Included",
    "Priority Support & Exclusive Updates"
  ];

  return (
    <div ref={containerRef} className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div 
        ref={overlayRef}
        className="absolute inset-0 bg-background/90 cursor-pointer"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-5xl bg-secondary/30 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl overflow-hidden max-h-[95vh] overflow-y-auto">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/10 transition-colors z-20 text-muted-foreground hover:text-white"
        >
          <X size={24} />
        </button>

        {/* Background glow - Ultra minimalist white */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[120px] pointer-events-none bg-white/5" />
        
        <div className="relative z-10">
          <div className="text-center space-y-4 mb-10 mt-4">
            <h2 className="beta-anim text-4xl sm:text-5xl font-extrabold tracking-tight">
              Join the Early Beta Test
            </h2>
            <p className="beta-anim text-lg text-muted-foreground max-w-xl mx-auto">
              Become a founding user of Atlas. Secure your spot, shape the future of the app, and get exclusive lifetime benefits.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="beta-anim text-2xl font-bold">Beta Tester Benefits</h3>
                <p className="beta-anim text-muted-foreground">Unlock these perks permanently.</p>
              </div>
              
              <ul className="space-y-4">
                {benefits.map((benefit, i) => (
                  <li key={i} className="beta-anim flex items-center gap-4">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center bg-white/10 text-white">
                      <Check size={14} strokeWidth={3} />
                    </div>
                    <span className={`font-medium sm:text-lg ${benefit.includes("50% Off") && isDiscountActive ? 'text-white font-bold' : 'text-foreground/90'}`}>
                      {benefit}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="beta-anim flex flex-col items-center justify-center bg-black/40 border border-white/5 rounded-3xl p-8 sm:p-10 text-center space-y-6 relative overflow-hidden shadow-2xl">
              {isDiscountActive && <BorderBeam size={300} duration={8} delay={0} colorFrom="#ffffff" colorTo="#a1a1aa" />}
              
              <div className="absolute inset-0 bg-white/[0.02] to-transparent opacity-30" />
              
              {isDiscountActive && (
                <div className="absolute top-0 inset-x-0 w-full bg-white text-black text-xs font-bold py-1.5 uppercase tracking-widest flex items-center justify-center gap-2">
                  <Sparkles size={12} className="text-zinc-600" /> Early Bird Special <Sparkles size={12} className="text-zinc-600" />
                </div>
              )}
              
              {/* Minimalist Logo + Key Combination (White/Gray) */}
              <div className="flex items-center justify-center mt-6 relative z-10">
                <div className="relative flex items-center justify-center">
                  <img src="/images/logo.png" alt="Atlas Logo" className="w-16 h-16 object-contain opacity-90 grayscale transition-all duration-300" />
                  <Key className="absolute -bottom-1 -right-2 text-zinc-300 drop-shadow-md w-6 h-6 -rotate-12" />
                </div>
              </div>
              
              <div className="space-y-1 relative z-10">
                <h4 className="text-xl font-bold">Get Your License Key</h4>
                <p className="text-muted-foreground text-sm">Secure checkout via Stripe</p>
              </div>

              <div className="relative z-10 flex flex-col items-center gap-4 w-full">
                {isDiscountActive && timeLeft ? (
                  <div className="flex flex-col items-center gap-2">
                    <div className="flex items-center justify-center gap-4">
                      <div className="flex flex-col items-end">
                        <span className="text-2xl text-muted-foreground/50 line-through decoration-white/20 font-medium">
                          $19.99
                        </span>
                      </div>
                      <div className="flex flex-col items-start">
                        <span className="text-6xl font-black text-white tracking-tighter drop-shadow-md">
                          $9.99
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 text-zinc-300 px-4 py-1.5 rounded-full border border-white/20 bg-white/5 text-sm font-semibold mt-2">
                      <Clock size={14} />
                      <span>
                        Offer ends in: {timeLeft.d}d {timeLeft.h}h {timeLeft.m}m {timeLeft.s}s
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="text-6xl font-black text-white tracking-tighter">
                    $19.99
                  </div>
                )}
                <span className="text-sm text-muted-foreground font-medium">One-time payment • Lifetime access</span>
              </div>

              {isLoading ? (
                <button disabled className="relative z-10 w-full py-4 bg-foreground/50 text-background font-bold rounded-xl flex items-center justify-center gap-2 text-base">
                  Loading checkout...
                </button>
              ) : checkoutUrl ? (
                <a 
                  href={checkoutUrl} 
                  data-polar-checkout 
                  data-polar-checkout-theme="dark"
                  className="relative z-10 w-full py-4 bg-white hover:bg-zinc-200 text-black font-bold rounded-xl transition-all flex items-center justify-center gap-2 group text-base"
                >
                  Buy Early Access
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </a>
              ) : (
                <button disabled className="relative z-10 w-full py-4 bg-zinc-800 text-zinc-400 font-bold rounded-xl flex items-center justify-center gap-2 text-base">
                  Checkout Unavailable
                </button>
              )}
              
              <p className="text-xs text-muted-foreground relative z-10">
                License key will be delivered instantly to your email after payment.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
