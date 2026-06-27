"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-[90] flex justify-center p-4 pointer-events-none">
      <nav 
        className={cn(
          "pointer-events-auto flex items-center justify-between overflow-hidden",
          "transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] origin-top",
          scrolled 
            ? "w-[400px] bg-background/60 backdrop-blur-2xl border border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.12)] rounded-full py-2 px-4 translate-y-2"
            : "w-full max-w-7xl bg-transparent border-transparent rounded-none py-4 px-6 translate-y-0"
        )}
      >
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2 group">
            <img 
              src="/images/logo.png" 
              alt="Logo" 
              className={cn(
                "object-contain transition-all duration-700",
                scrolled ? "w-6 h-6 rounded-md" : "w-8 h-8 rounded-lg"
              )} 
            />
            <span className={cn(
              "text-foreground font-semibold tracking-tight transition-all duration-700 overflow-hidden whitespace-nowrap",
              scrolled ? "w-0 opacity-0 hidden" : "w-auto opacity-100 block"
            )}>
              Atlas
            </span>
          </Link>

          <div className="flex items-center gap-4 text-sm font-medium text-muted-foreground">
            <Link href="#features" className="hover:text-foreground transition-colors">Features</Link>
            <Link href="#shortcuts" className="hover:text-foreground transition-colors">Shortcuts</Link>
          </div>
        </div>

        <div className="flex items-center gap-4 text-sm font-medium">
          <Link 
            href="https://discord.gg/aeAvQ27bgG" 
            target="_blank" 
            rel="noopener noreferrer"
            className={cn(
              "text-muted-foreground hover:text-[#5865F2] transition-colors flex items-center justify-center p-2 rounded-full hover:bg-secondary/50",
              scrolled ? "hidden" : "flex"
            )}
            title="Join our Discord"
          >
            <svg width="20" height="20" viewBox="0 0 127.14 96.36" fill="currentColor"><path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.31,60,73.31,53s5-12.74,11.43-12.74S96.2,46,96.12,53,91.08,65.69,84.69,65.69Z"/></svg>
          </Link>
          <button 
            onClick={() => window.dispatchEvent(new CustomEvent('open-early-beta'))}
            className={cn(
              "bg-foreground text-background font-semibold hover:opacity-90 transition-all shadow-sm whitespace-nowrap flex items-center justify-center gap-2",
              scrolled ? "h-8 px-4 rounded-full text-xs" : "h-10 px-5 rounded-lg text-sm"
            )}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M0 3.449L9.75 2.1v9.181H0V3.449zM10.949 1.932L24 0v11.161H10.949V1.932zM0 12.355h9.75v9.181L0 20.203v-7.848zM10.949 12.355H24v11.161l-13.051-1.805v-9.356z"/></svg>
            Pre-order
          </button>
        </div>
      </nav>
    </div>
  );
}
