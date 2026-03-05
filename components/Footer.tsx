'use client';

import Link from 'next/link';
import { Mail, Instagram, Twitter, Music } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-primary border-t border-border pt-16 pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-serif font-bold text-accent mb-4">🕯️ Light FM Ministry</h3>
            <p className="text-sm text-muted-foreground">
              Proclaiming Jesus Christ and preparing hearts for His return. Biblical teaching, prayer, and Gospel truth.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">Navigate</h4>
            <ul className="space-y-2">
              {[
                { label: 'Home', href: '/' },
                { label: 'Teachings', href: '/shows' },
                { label: 'Testimonies', href: '/news' },
                { label: 'Respond', href: '/contact' },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground hover:text-accent transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">Ministry</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/contact" className="text-sm text-muted-foreground hover:text-accent transition-colors">
                  Accept Jesus
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-muted-foreground hover:text-accent transition-colors">
                  Prayer Request
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-muted-foreground hover:text-accent transition-colors">
                  Giving & Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">Follow Us</h4>
            <div className="flex gap-4">
              <a href="#" className="p-2 bg-secondary rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors">
                <Mail size={18} />
              </a>
              <a href="#" className="p-2 bg-secondary rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" className="p-2 bg-secondary rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors">
                <Twitter size={18} />
              </a>
              <a href="#" className="p-2 bg-secondary rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors">
                <Music size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-sm text-muted-foreground">
            © 2024 Light FM Christian Ministry. All rights reserved. "I am the light of the world." - John 8:12
          </p>
          <p className="text-sm text-accent-alt font-semibold mt-4 md:mt-0">
            Jesus is Coming Again! Be Ready.
          </p>
        </div>
      </div>
    </footer>
  );
}
