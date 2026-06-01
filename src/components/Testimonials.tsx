import React from 'react';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    quote: "Raycast has completely changed how I use my Mac. It's incredibly fast and the extensions ecosystem is unparalleled.",
    author: "Alice Developer",
    handle: "@alicedev",
  },
  {
    quote: "I can't imagine working without Raycast anymore. It combines the best of spotlight, clipboard managers, and window management into one seamless tool.",
    author: "Bob Designer",
    handle: "@bobdesigns",
  },
  {
    quote: "The API is fantastic. Building custom extensions for my team's internal workflows took just a few hours and saved us countless clicks.",
    author: "Charlie Manager",
    handle: "@charliemgr",
  }
];

export function Testimonials() {
  return (
    <section className="py-24 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-white">
          Built for professionals like you.
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((testimonial, index) => (
          <div 
            key={index} 
            className="p-8 rounded-2xl bg-[#1A1A1A] border border-[#2A2A2A] text-[#EBEBEB] flex flex-col justify-between"
          >
            <div>
              <Quote className="w-8 h-8 text-[#808080] mb-6" />
              <p className="text-lg leading-relaxed mb-8">
                "{testimonial.quote}"
              </p>
            </div>
            <div>
              <p className="font-semibold">{testimonial.author}</p>
              <p className="text-[#808080] text-sm">{testimonial.handle}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
