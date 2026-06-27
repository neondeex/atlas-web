"use client";

import React, { useEffect, useState } from 'react';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LayoutGrid } from 'lucide-react';

const Key = ({ label, id, className = "", icon = null, isActive }: { label: string, id: string, className?: string, icon?: React.ReactNode, isActive?: boolean }) => {
  return (
    <div 
      className={`flex items-center justify-center rounded-lg border-b-4 border border-white/10 transition-all duration-150 ${className} ${
        isActive 
          ? 'bg-white text-black border-b-0 translate-y-1 shadow-[0_0_20px_rgba(255,255,255,0.4)]' 
          : 'bg-secondary/40 text-muted-foreground shadow-sm'
      }`}
    >
      {icon || <span className="font-semibold text-sm">{label}</span>}
    </div>
  );
};

export function KeyboardShortcuts() {
  const [activeKeys, setActiveKeys] = useState<string[]>([]);
  
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    // Animate section entrance
    gsap.fromTo(".kb-title", 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, scrollTrigger: { trigger: ".kb-section", start: "top 75%" } }
    );
    
    gsap.fromTo(".kb-board", 
      { opacity: 0, rotationX: 20, y: 50 },
      { opacity: 1, rotationX: 0, y: 0, duration: 1.2, ease: "power3.out", scrollTrigger: { trigger: ".kb-section", start: "top 65%" } }
    );

    const cycle = async () => {
      while (true) {
        await new Promise(r => setTimeout(r, 2000));
        setActiveKeys(['space']);
        await new Promise(r => setTimeout(r, 400));
        setActiveKeys([]);
        
        await new Promise(r => setTimeout(r, 2000));
        setActiveKeys(['ctrl']);
        await new Promise(r => setTimeout(r, 200));
        setActiveKeys(['ctrl', 't']);
        await new Promise(r => setTimeout(r, 400));
        setActiveKeys([]);
      }
    };
    
    cycle();
  }, []);
  return (
    <section id="shortcuts" className="kb-section py-32 px-6 md:px-12 flex flex-col items-center justify-center bg-background overflow-hidden [perspective:1000px]">
      <div className="kb-title text-center mb-20 max-w-3xl">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-foreground">
          Master your files without touching the mouse.
        </h2>
        <p className="text-xl text-muted-foreground">
          Everything is just a keystroke away. Rename, tag, preview, and move files instantly.
        </p>
      </div>

      <div className="kb-board w-full max-w-4xl p-4 md:p-8 rounded-3xl bg-secondary/10 border border-white/5 backdrop-blur-md shadow-2xl relative">
        {/* Minimalist glow behind keyboard */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/2 bg-white/5 blur-[100px] rounded-full -z-10" />
        
        {/* Simplified Keyboard Grid - Windows Layout */}
        <div className="grid grid-cols-12 gap-2 md:gap-4 w-full aspect-[2.5/1]">
          {/* Row 1 */}
          <Key id="tab" isActive={activeKeys.includes("tab")} label="Tab" className="col-span-2" activeKeys={activeKeys} />
          <Key id="q" isActive={activeKeys.includes("q")} label="Q" className="col-span-1" activeKeys={activeKeys} />
          <Key id="w" isActive={activeKeys.includes("w")} label="W" className="col-span-1" activeKeys={activeKeys} />
          <Key id="e" isActive={activeKeys.includes("e")} label="E" className="col-span-1" activeKeys={activeKeys} />
          <Key id="r" isActive={activeKeys.includes("r")} label="R" className="col-span-1" activeKeys={activeKeys} />
          <Key id="t" isActive={activeKeys.includes("t")} label="T" className="col-span-1" activeKeys={activeKeys} />
          <Key id="y" isActive={activeKeys.includes("y")} label="Y" className="col-span-1" activeKeys={activeKeys} />
          <Key id="u" isActive={activeKeys.includes("u")} label="U" className="col-span-1" activeKeys={activeKeys} />
          <Key id="i" isActive={activeKeys.includes("i")} label="I" className="col-span-1" activeKeys={activeKeys} />
          <Key id="o" isActive={activeKeys.includes("o")} label="O" className="col-span-1" activeKeys={activeKeys} />
          <Key id="p" isActive={activeKeys.includes("p")} label="P" className="col-span-1" activeKeys={activeKeys} />

          {/* Row 2 */}
          <Key id="caps" isActive={activeKeys.includes("caps")} label="Caps" className="col-span-2 md:col-span-2" activeKeys={activeKeys} />
          <Key id="a" isActive={activeKeys.includes("a")} label="A" className="col-span-1" activeKeys={activeKeys} />
          <Key id="s" isActive={activeKeys.includes("s")} label="S" className="col-span-1" activeKeys={activeKeys} />
          <Key id="d" isActive={activeKeys.includes("d")} label="D" className="col-span-1" activeKeys={activeKeys} />
          <Key id="f" isActive={activeKeys.includes("f")} label="F" className="col-span-1" activeKeys={activeKeys} />
          <Key id="g" isActive={activeKeys.includes("g")} label="G" className="col-span-1" activeKeys={activeKeys} />
          <Key id="h" isActive={activeKeys.includes("h")} label="H" className="col-span-1" activeKeys={activeKeys} />
          <Key id="j" isActive={activeKeys.includes("j")} label="J" className="col-span-1" activeKeys={activeKeys} />
          <Key id="k" isActive={activeKeys.includes("k")} label="K" className="col-span-1" activeKeys={activeKeys} />
          <Key id="l" isActive={activeKeys.includes("l")} label="L" className="col-span-1" activeKeys={activeKeys} />
          <Key id="enter" isActive={activeKeys.includes("enter")} label="Enter" className="col-span-1 md:col-span-1" activeKeys={activeKeys} />

          {/* Row 3 */}
          <Key id="shift" isActive={activeKeys.includes("shift")} label="Shift" className="col-span-3" activeKeys={activeKeys} />
          <Key id="z" isActive={activeKeys.includes("z")} label="Z" className="col-span-1" activeKeys={activeKeys} />
          <Key id="x" isActive={activeKeys.includes("x")} label="X" className="col-span-1" activeKeys={activeKeys} />
          <Key id="c" isActive={activeKeys.includes("c")} label="C" className="col-span-1" activeKeys={activeKeys} />
          <Key id="v" isActive={activeKeys.includes("v")} label="V" className="col-span-1" activeKeys={activeKeys} />
          <Key id="b" isActive={activeKeys.includes("b")} label="B" className="col-span-1" activeKeys={activeKeys} />
          <Key id="n" isActive={activeKeys.includes("n")} label="N" className="col-span-1" activeKeys={activeKeys} />
          <Key id="m" isActive={activeKeys.includes("m")} label="M" className="col-span-1" activeKeys={activeKeys} />
          <Key id="shift-r" isActive={activeKeys.includes("shift-r")} label="Shift" className="col-span-2" activeKeys={activeKeys} />

          {/* Row 4 (Windows Bottom Row Layout) */}
          <Key id="ctrl" isActive={activeKeys.includes("ctrl")} label="Ctrl" className="col-span-1" activeKeys={activeKeys} />
          <Key id="win" isActive={activeKeys.includes("win")} label="" className="col-span-1" icon={<LayoutGrid className="w-4 h-4 opacity-70" />} activeKeys={activeKeys} />
          <Key id="alt" isActive={activeKeys.includes("alt")} label="Alt" className="col-span-2" activeKeys={activeKeys} />
          <Key id="space" isActive={activeKeys.includes("space")} label="Space" className="col-span-4" activeKeys={activeKeys} />
          <Key id="alt-r" isActive={activeKeys.includes("alt-r")} label="Alt" className="col-span-2" activeKeys={activeKeys} />
          <Key id="win-r" isActive={activeKeys.includes("win-r")} label="" className="col-span-1" icon={<LayoutGrid className="w-4 h-4 opacity-70" />} activeKeys={activeKeys} />
          <Key id="ctrl-r" isActive={activeKeys.includes("ctrl-r")} label="Ctrl" className="col-span-1" activeKeys={activeKeys} />
        </div>
      </div>
    </section>
  );
}
