import React from 'react';
import { Twitter, Github, Linkedin } from 'lucide-react';
import Link from 'next/link';

export const Footer = () => {
  return (
    <footer className="bg-background text-foreground py-12 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Product */}
          <div>
            <h3 className="font-semibold mb-4 text-primary">Product</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">Store</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">Pro</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">Teams</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">Developers</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold mb-4 text-primary">Resources</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">Manual</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">Blog</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">Changelog</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">Community</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-4 text-primary">Company</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">About</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">Careers</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">Wall of Love</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">Brand</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold mb-4 text-primary">Legal</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">Terms of Service</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">Security</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">DPA</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-border">
          <div className="text-sm text-muted-foreground mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Raycast. All rights reserved.
          </div>
          <div className="flex space-x-6">
            <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              <Twitter className="h-5 w-5" />
              <span className="sr-only">Twitter</span>
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              <Linkedin className="h-5 w-5" />
              <span className="sr-only">LinkedIn</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
