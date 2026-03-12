'use client';

import Link from 'next/link';
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-primary border-t border-border pt-16 pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div>
            <div className="mb-4 h-12">
              <img src="/logo.png" alt="Light FM Logo" className="h-full w-auto object-contain" />
            </div>
            <p className="text-sm text-muted-foreground">
              Welcome to the no. 1 leading online family christian radio station in east africa.
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
              <a href="https://www.facebook.com/lightfmkenya" target="_blank" rel="noopener noreferrer" className="p-2 bg-secondary rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors">
                <Facebook size={18} />
              </a>
              <a href="https://x.com/LightFmKenya" target="_blank" rel="noopener noreferrer" className="p-2 bg-secondary rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors">
                <Twitter size={18} />
              </a>
              <a href="https://www.instagram.com/lightfmkenya/" target="_blank" rel="noopener noreferrer" className="p-2 bg-secondary rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors">
                <Instagram size={18} />
              </a>
              <a href="https://www.youtube.com/@lcmstudiosKe/videos" target="_blank" rel="noopener noreferrer" className="p-2 bg-secondary rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors">
                <Youtube size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between">
          <div className="flex flex-col gap-2">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} The loud cry ministries-Kenya. All rights reserved. "I am the light of the world." - John 8:12
            </p>
            <p className="text-sm text-muted-foreground">
              Powered By Grace Through <a href="https://www.allons-ysuite.com/" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors font-medium">Allons-y Ministry</a>
            </p>
          </div>
          <p className="text-sm text-accent-alt font-semibold mt-4 md:mt-0">
            Jesus is Coming Again! Be Ready.
          </p>
        </div>
      </div>
    </footer>
  );
}
