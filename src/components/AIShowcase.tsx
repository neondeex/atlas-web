import React from 'react';
import { Sparkles } from 'lucide-react';

export function AIShowcase() {
  return (
    <section className="py-24 px-6 md:px-12 flex flex-col items-center justify-center bg-background text-foreground">
      <div className="max-w-4xl w-full text-center mb-12">
        <div className="flex justify-center items-center gap-3 mb-6">
          <Sparkles className="w-10 h-10 text-primary" />
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Your Mac just got smarter.</h2>
        </div>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Experience AI directly from your desktop. No context switching, just instant answers.
        </p>
      </div>

      <div className="w-full max-w-5xl rounded-xl border border-border bg-secondary/30 p-4 md:p-6 shadow-2xl backdrop-blur-sm">
        <div className="rounded-lg border border-border/50 bg-background shadow-inner overflow-hidden flex flex-col h-[500px]">
          {/* Header */}
          <div className="h-12 border-b border-border flex items-center px-4 gap-2 bg-muted/50">
            <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
            <div className="ml-4 text-sm font-medium text-muted-foreground flex-1 text-center">Raycast AI</div>
          </div>
          
          {/* Chat Interface Body */}
          <div className="flex-1 p-6 flex flex-col gap-6 overflow-y-auto">
            {/* User Message */}
            <div className="flex justify-end">
              <div className="bg-primary text-primary-foreground px-4 py-3 rounded-2xl rounded-tr-sm max-w-[80%]">
                <p>Write a polite email to decline a meeting invitation for next Tuesday.</p>
              </div>
            </div>
            
            {/* AI Response */}
            <div className="flex justify-start">
              <div className="bg-muted text-foreground px-4 py-3 rounded-2xl rounded-tl-sm max-w-[80%] border border-border">
                <div className="flex items-center gap-2 mb-2 text-primary">
                  <Sparkles className="w-4 h-4" />
                  <span className="text-sm font-medium">Raycast AI</span>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground mb-4">
                  Subject: Re: Meeting Invitation - Next Tuesday
                  <br /><br />
                  Hi there,
                  <br /><br />
                  Thank you for reaching out and for the invitation to meet next Tuesday. 
                  Unfortunately, my schedule is currently at capacity, and I won't be able to attend.
                  <br /><br />
                  Could we perhaps look at alternative dates for the following week? Please let me know what works best for you.
                  <br /><br />
                  Best regards,
                </p>
                <div className="flex gap-2">
                  <button className="text-xs px-3 py-1.5 rounded bg-background border border-border hover:bg-secondary/50 transition-colors">Copy</button>
                  <button className="text-xs px-3 py-1.5 rounded bg-background border border-border hover:bg-secondary/50 transition-colors">Regenerate</button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Input Area */}
          <div className="p-4 border-t border-border bg-background">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Ask AI anything..." 
                className="w-full bg-muted/50 border border-border rounded-lg pl-4 pr-10 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                readOnly
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 p-1 bg-primary text-primary-foreground rounded">
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
