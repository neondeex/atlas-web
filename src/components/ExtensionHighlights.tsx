"use client";

import React, { useEffect, useRef } from 'react';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  // Cloud Drives
  HardDrive, Database, UploadCloud, FolderSync, Server, Cloud,
  // Docs
  FileSpreadsheet, FileSearch, BookOpen, ScrollText, FileText,
  // File Tools
  FileImage, FileVideo, Scissors, Wand2, FileArchive, Wrench,
  // Themes
  Brush, Image as ImageIcon, Sparkles, Pencil, Frame, Palette,
  // Media
  PlayCircle, Music, Video, Radio, Tv, Headphones, PlaySquare
} from 'lucide-react';
import { SpotlightCard } from './SpotlightCard';

const categories = [
  { id: 'active', label: 'All', active: true },
  { id: 'cloud', label: 'Cloud Drives', active: false },
  { id: 'preview', label: 'Document Preview', active: false },
  { id: 'tools', label: 'File Tools', active: false },
  { id: 'themes', label: 'Themes', active: false },
  { id: 'media', label: 'Media', active: false },
];

const DotPattern = () => (
  <svg className="absolute inset-0 w-full h-full opacity-[0.02] z-0 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern id="dotPattern" x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse">
        <circle cx="2" cy="2" r="1.5" fill="#ffffff"></circle>
      </pattern>
    </defs>
    <rect x="0" y="0" width="100%" height="100%" fill="url(#dotPattern)"></rect>
  </svg>
);

const extensions = [
  { 
    id: 1, 
    title: 'Cloud Drives', 
    description: 'Mount SFTP, FTP, Google Drive, and OneDrive instantly without syncing everything.', 
    span: 'col-span-1 md:col-span-2',
    bgIcons: [
      { icon: Cloud, style: { top: '10%', left: '70%', width: '4rem', height: '4rem', transform: 'rotate(12deg)' } },
      { icon: FolderSync, style: { top: '55%', left: '80%', width: '3rem', height: '3rem', transform: 'rotate(-10deg)' } },
      { icon: Server, style: { top: '20%', left: '15%', width: '3.5rem', height: '3.5rem', transform: 'rotate(-25deg)' } },
      { icon: HardDrive, style: { top: '65%', left: '25%', width: '2.5rem', height: '2.5rem', transform: 'rotate(15deg)' } },
      { icon: Database, style: { top: '80%', left: '50%', width: '3.5rem', height: '3.5rem', transform: 'rotate(-5deg)' } },
    ]
  },
  { 
    id: 2, 
    title: 'Document Preview', 
    description: 'Instantly preview PDF, CSV, Word, and PowerPoint files without opening external apps.', 
    span: 'col-span-1',
    bgIcons: [
      { icon: FileText, style: { top: '15%', left: '60%', width: '3.5rem', height: '3.5rem', transform: 'rotate(8deg)' } },
      { icon: FileSpreadsheet, style: { top: '65%', left: '70%', width: '3rem', height: '3rem', transform: 'rotate(-12deg)' } },
      { icon: BookOpen, style: { top: '50%', left: '15%', width: '4rem', height: '4rem', transform: 'rotate(18deg)' } },
      { icon: ScrollText, style: { top: '10%', left: '20%', width: '2.5rem', height: '2.5rem', transform: 'rotate(-8deg)' } },
    ]
  },
  { 
    id: 3, 
    title: 'File Tools', 
    description: 'Convert, compress, and edit PDFs, videos, and images natively from the file view.', 
    span: 'col-span-1 md:col-span-1',
    bgIcons: [
      { icon: FileImage, style: { top: '25%', left: '70%', width: '4rem', height: '4rem', transform: 'rotate(-15deg)' } },
      { icon: FileVideo, style: { top: '65%', left: '60%', width: '3.5rem', height: '3.5rem', transform: 'rotate(10deg)' } },
      { icon: FileArchive, style: { top: '70%', left: '20%', width: '3rem', height: '3rem', transform: 'rotate(-20deg)' } },
      { icon: Scissors, style: { top: '15%', left: '25%', width: '2.5rem', height: '2.5rem', transform: 'rotate(25deg)' } },
      { icon: Wand2, style: { top: '40%', left: '85%', width: '2.5rem', height: '2.5rem', transform: 'rotate(5deg)' } },
    ]
  },
  { 
    id: 4, 
    title: 'Icon Theme Manager', 
    description: 'Download and manage VSCode icon themes to customize your environment.', 
    span: 'col-span-1 md:col-span-2',
    bgIcons: [
      { icon: Palette, style: { top: '15%', left: '75%', width: '4rem', height: '4rem', transform: 'rotate(15deg)' } },
      { icon: Brush, style: { top: '65%', left: '70%', width: '3rem', height: '3rem', transform: 'rotate(-15deg)' } },
      { icon: Sparkles, style: { top: '20%', left: '20%', width: '3.5rem', height: '3.5rem', transform: 'rotate(30deg)' } },
      { icon: Frame, style: { top: '65%', left: '25%', width: '2.5rem', height: '2.5rem', transform: 'rotate(-25deg)' } },
      { icon: Pencil, style: { top: '45%', left: '10%', width: '3rem', height: '3rem', transform: 'rotate(-5deg)' } },
    ]
  },
  { 
    id: 5, 
    title: 'Media', 
    description: 'Rich media playback, galleries, and previews directly inside your workspace.', 
    span: 'col-span-1 md:col-span-3',
    bgIcons: [
      { icon: Headphones, style: { top: '25%', left: '80%', width: '4rem', height: '4rem', transform: 'rotate(10deg)' } },
      { icon: PlayCircle, style: { top: '40%', left: '60%', width: '5rem', height: '5rem', transform: 'rotate(-15deg)' } },
      { icon: Tv, style: { top: '35%', left: '20%', width: '4.5rem', height: '4.5rem', transform: 'rotate(20deg)' } },
      { icon: Music, style: { top: '20%', left: '40%', width: '3.5rem', height: '3.5rem', transform: 'rotate(-10deg)' } },
      { icon: Radio, style: { top: '60%', left: '10%', width: '4rem', height: '4rem', transform: 'rotate(15deg)' } },
      { icon: Video, style: { top: '55%', left: '85%', width: '3.5rem', height: '3.5rem', transform: 'rotate(-5deg)' } },
    ]
  },
];

export const ExtensionHighlights = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Title and categories come from left
      gsap.fromTo(".ext-header", 
        { x: -50, opacity: 0, filter: "blur(10px)" },
        { 
          x: 0, opacity: 1, filter: "blur(0px)", 
          duration: 1, ease: "power3.out", stagger: 0.1,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
          }
        }
      );

      // Cards come staggered from the right
      gsap.fromTo(".ext-card", 
        { x: 100, opacity: 0, scale: 0.9, filter: "blur(15px)" },
        { 
          x: 0, opacity: 1, scale: 1, filter: "blur(0px)", 
          duration: 1.2, ease: "expo.out", stagger: 0.15,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 65%",
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="w-full py-32 bg-background text-white overflow-hidden relative">
      <style>{`
        @keyframes slideBg {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-slide-bg {
          animation: slideBg 20s linear infinite;
        }
        .ext-card:hover .animate-slide-bg {
          animation-play-state: paused;
        }
      `}</style>
      
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-red-900/10 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col items-start gap-8 mb-16">
          <h2 className="ext-header text-5xl md:text-6xl font-bold tracking-tight text-foreground">
            Plugins & Integrations
          </h2>
          <div className="ext-header flex flex-wrap items-center gap-3">
            {categories.map((cat) => (
              <button
                key={cat.id}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 border ${
                  cat.active 
                    ? 'bg-foreground text-background border-foreground shadow-[0_0_20px_rgba(255,255,255,0.1)]' 
                    : 'bg-secondary/30 text-muted-foreground border-border hover:text-foreground hover:bg-secondary/80'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {extensions.map((ext) => (
            <SpotlightCard key={ext.id} className={`ext-card group cursor-pointer border border-white/5 hover:border-white/20 transition-all duration-500 hover:-translate-y-2 shadow-xl bg-secondary/10 ${ext.span}`}>
              
              {/* Dot Pattern Background */}
              <DotPattern />

              {/* Scrolling scattered background icons */}
              <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none opacity-[0.05] group-hover:opacity-30 transition-opacity duration-700">
                <div className="absolute inset-0 flex w-[200%] animate-slide-bg">
                  {/* First Half */}
                  <div className="relative w-1/2 h-full">
                    {ext.bgIcons?.map((IconItem, i) => (
                      <div 
                        key={`h1-${i}`}
                        className="absolute flex items-center justify-center transition-transform duration-700 group-hover:scale-110"
                        style={{
                          ...IconItem.style,
                          filter: `drop-shadow(0 0 10px rgba(255,255,255,0.5))`
                        }}
                      >
                        <IconItem.icon className="w-full h-full text-white" strokeWidth={1} />
                      </div>
                    ))}
                  </div>
                  {/* Second Half (Seamless Loop) */}
                  <div className="relative w-1/2 h-full">
                    {ext.bgIcons?.map((IconItem, i) => (
                      <div 
                        key={`h2-${i}`}
                        className="absolute flex items-center justify-center transition-transform duration-700 group-hover:scale-110"
                        style={{
                          ...IconItem.style,
                          filter: `drop-shadow(0 0 10px rgba(255,255,255,0.5))`
                        }}
                      >
                        <IconItem.icon className="w-full h-full text-white" strokeWidth={1} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-8 flex flex-col justify-end h-full relative z-10 min-h-[240px]">
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                
                <h3 className="text-2xl font-semibold text-foreground mb-3 relative z-10">
                  {ext.title}
                </h3>
                
                <p className="text-muted-foreground text-base leading-relaxed relative z-10 max-w-sm">
                  {ext.description}
                </p>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExtensionHighlights;

