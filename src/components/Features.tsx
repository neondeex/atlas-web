import React from 'react';
import { Command } from 'lucide-react';

export default function Features() {
  return (
    <section className="bg-black text-white py-32 px-6 flex flex-col items-center justify-center">
      <div className="max-w-4xl w-full text-center mb-16">
        <h2 className="text-5xl md:text-6xl font-bold tracking-tighter mb-6">
          Take shortcuts, not detours.
        </h2>
        <p className="text-xl md:text-2xl text-neutral-400 font-medium">
          One interface, everything you need.
        </p>
      </div>

      <div className="w-full max-w-4xl relative">
        <div className="absolute -inset-1 bg-gradient-to-r from-red-500/20 to-purple-500/20 blur-2xl rounded-2xl"></div>
        
        <div className="relative rounded-xl border border-border bg-card/80 backdrop-blur-xl shadow-2xl overflow-hidden aspect-[16/9]">
          <div className="h-12 border-b border-white/5 bg-white/5 flex items-center px-4">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
          </div>

          <div className="p-8 flex items-center justify-center h-[calc(100%-3rem)]">
            <div className="flex flex-col items-center gap-4 text-white/20">
              <Command className="w-16 h-16" />
              <div className="text-lg font-medium tracking-widest uppercase">Mockup Area</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
