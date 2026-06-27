"use client";

import React from 'react';
import { MessageCircle, Globe, Link as LinkIcon } from 'lucide-react';
import Link from 'next/link';

export const Footer = () => {
  return (
    <footer className="bg-background text-foreground py-12 border-t border-border">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* CTA Block */}
        <div className="py-24 text-center border-b border-white/5 mb-16 relative overflow-hidden rounded-3xl bg-secondary/20">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-primary/10" />
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white relative z-10">
            Ready to master your files?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto relative z-10">
            Join thousands of professionals who have completely changed the way they interact with their file system.
          </p>
          <button 
            onClick={() => window.dispatchEvent(new CustomEvent('open-early-beta'))}
            className="relative z-10 px-8 py-4 bg-foreground text-background font-semibold rounded-lg hover:opacity-90 transition-all text-lg flex items-center justify-center gap-2 mx-auto"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M0 3.449L9.75 2.1v9.181H0V3.449zM10.949 1.932L24 0v11.161H10.949V1.932zM0 12.355h9.75v9.181L0 20.203v-7.848zM10.949 12.355H24v11.161l-13.051-1.805v-9.356z"/></svg>
            Pre-order for Windows
          </button>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-12">
          <div className="max-w-sm">
            <h3 className="font-bold text-xl mb-4 text-primary">Atlas</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              The fastest way to manage, organize, and interact with your file system. 
              Join thousands of professionals who have completely changed their workflow.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4 text-primary">Legal</h3>
            <ul className="space-y-2">
              <li><Link href="/privacy-policy" className="text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms-of-service" className="text-muted-foreground hover:text-foreground transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-border">
          <div className="text-sm text-muted-foreground mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Atlas. All rights reserved.
          </div>
          <div className="flex space-x-6">
            <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              <MessageCircle className="h-5 w-5" />
              <span className="sr-only">Twitter</span>
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              <Globe className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              <LinkIcon className="h-5 w-5" />
              <span className="sr-only">LinkedIn</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
