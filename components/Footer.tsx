'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

// lucide-react has no WhatsApp brand icon, so this is a small inline SVG
// matching the sizing/style convention of the other social icons below.
function WhatsAppIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.198.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.148-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.876 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12.001 2.003c-5.523 0-10 4.477-10 10 0 1.766.463 3.492 1.343 5.011L2 22l5.117-1.334A9.958 9.958 0 0 0 12.001 22c5.523 0 10-4.477 10-10s-4.477-9.997-10-9.997zm0 18.166a8.13 8.13 0 0 1-4.148-1.135l-.297-.176-3.037.792.81-2.96-.193-.304a8.14 8.14 0 0 1-1.25-4.354c0-4.508 3.667-8.174 8.175-8.174 2.184 0 4.238.851 5.782 2.396a8.12 8.12 0 0 1 2.393 5.783c-.004 4.508-3.671 8.132-8.235 8.132z" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="bg-muted border-t border-border pt-16 pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div>
            <div className="mb-4 h-12">
              <Image
                src="/logo.png"
                alt="Light FM Logo"
                width={160}
                height={48}
                className="h-full w-auto object-contain"
              />
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
              <a href="https://www.facebook.com/lightfmkenya" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="p-2 bg-secondary rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors">
                <Facebook size={18} />
              </a>
              <a href="https://x.com/LightFmKenya" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="p-2 bg-secondary rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors">
                <Twitter size={18} />
              </a>
              <a href="https://www.instagram.com/lightfmkenya/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="p-2 bg-secondary rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors">
                <Instagram size={18} />
              </a>
              <a href="https://www.youtube.com/@lcmstudiosKe/videos" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="p-2 bg-secondary rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors">
                <Youtube size={18} />
              </a>
              <Link href="/get-involved#fellowship" aria-label="WhatsApp" className="p-2 bg-secondary rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors">
                <WhatsAppIcon size={18} />
              </Link>
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
              <Link href="/privacy-policy" className="hover:text-accent transition-colors">
                Privacy Policy
              </Link>
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
