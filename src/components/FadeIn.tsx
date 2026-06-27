"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function FadeIn({
  children,
  delay = 0,
  y = 50,
  duration = 1.4,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    if (!ref.current) return;
    
    const ctx = gsap.context(() => {
      // Set initial state
      gsap.set(ref.current, {
        opacity: 0,
        y: y,
        scale: 0.96,
        filter: "blur(12px)",
      });

      // Animate
      gsap.to(ref.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
        duration: duration,
        delay: delay,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 85%", 
          toggleActions: "play none none reverse", 
        },
      });
    }, ref);

    return () => ctx.revert();
  }, [delay, y, duration]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
