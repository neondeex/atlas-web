"use client";

import React, { useEffect, useRef } from 'react';
import { Sparkles } from 'lucide-react';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function AIShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Title
      gsap.fromTo(".ai-title",
        { opacity: 0, y: 30, filter: "blur(8px)" },
        { 
          opacity: 1, y: 0, filter: "blur(0px)", duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" }
        }
      );

      // Main window reveal
      gsap.fromTo(".ai-window",
        { opacity: 0, scale: 0.95, y: 50, filter: "blur(15px)" },
        { 
          opacity: 1, scale: 1, y: 0, filter: "blur(0px)", duration: 1.2, ease: "expo.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 65%" }
        }
      );

      // Chat bubbles staggered reveal
      gsap.fromTo(".chat-bubble",
        { opacity: 0, y: 20, scale: 0.9, transformOrigin: "bottom left" },
        { 
          opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.4, ease: "back.out(1.5)",
          scrollTrigger: { trigger: ".ai-window", start: "top 50%" }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-32 px-6 md:px-12 flex flex-col items-center justify-center bg-background text-foreground overflow-hidden">
      <div className="ai-title max-w-4xl w-full text-center mb-16">
        <div className="flex justify-center items-center gap-3 mb-6">
          <Sparkles className="w-10 h-10 text-primary" />
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Your files just got smarter.</h2>
        </div>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Experience AI directly from your file manager. No manual sorting, just instant organization.
        </p>
      </div>

      <div className="ai-window w-full max-w-4xl rounded-2xl border border-border bg-secondary/10 p-2 md:p-4 shadow-[0_0_80px_rgba(255,255,255,0.05)] backdrop-blur-md">
        <div className="rounded-xl border border-white/10 bg-black/80 shadow-2xl overflow-hidden flex flex-col h-[500px]">
          {/* Header */}
          <div className="h-12 border-b border-white/10 flex items-center px-4 gap-2 bg-white/5">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <div className="ml-4 text-xs font-medium text-white/50 flex-1 text-center uppercase tracking-widest">Atlas AI</div>
          </div>
          
          {/* Chat Interface Body */}
          <div className="flex-1 p-6 flex flex-col gap-6 overflow-y-auto">
            {/* User Message */}
            <div className="chat-bubble flex justify-end">
              <div className="bg-white/10 text-white px-5 py-3 rounded-2xl rounded-tr-sm max-w-[80%] border border-white/5">
                <p>Organize my Downloads folder by file type and move all PDFs to Documents/Invoices.</p>
              </div>
            </div>
            
            {/* AI Response */}
            <div className="chat-bubble flex justify-start">
              <div className="bg-background text-foreground px-5 py-4 rounded-2xl rounded-tl-sm max-w-[80%] border border-white/10 shadow-lg">
                <div className="flex items-center gap-2 mb-3 text-primary">
                  <Sparkles className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-wider">Atlas AI</span>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground mb-4">
                  I've analyzed your Downloads folder. Found 142 files.
                  <br /><br />
                  I'm ready to organize them into 4 new folders: <strong>Images</strong>, <strong>Documents</strong>, <strong>Installers</strong>, and <strong>Archives</strong>.
                  <br /><br />
                  Additionally, I found 14 PDFs that look like invoices and will move them directly to your <code>Documents/Invoices</code> folder.
                  <br /><br />
                  Would you like me to proceed with these changes?
                </p>
                <div className="flex gap-2">
                  <button className="text-xs px-3 py-1.5 rounded-lg bg-primary text-primary-foreground border border-primary hover:opacity-90 transition-colors font-medium">Proceed</button>
                  <button className="text-xs px-3 py-1.5 rounded-lg bg-secondary/50 border border-white/5 hover:bg-secondary transition-colors text-white/70">Cancel</button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Input Area */}
          <div className="p-4 border-t border-white/5 bg-black/50">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Ask AI to organize..." 
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-4 pr-10 py-3 focus:outline-none focus:ring-1 focus:ring-primary/50 text-sm text-white/80"
                readOnly
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 bg-primary/20 text-primary rounded-lg border border-primary/30">
                <Sparkles className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AIShowcase;
