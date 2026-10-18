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

const linkClass = 'text-muted-foreground transition-colors hover:text-foreground';
const socialClass =
  'flex size-10 items-center justify-center rounded-md border border-border text-foreground/80 transition-colors hover:border-foreground hover:text-foreground';
const headingClass = 'mb-4 font-display text-sm font-semibold uppercase tracking-[0.12em] text-foreground';

export function Footer() {
  return (
    <footer className="border-t border-border bg-background pt-16 pb-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <Image src="/logo.png" alt="Light FM" width={160} height={48} className="h-14 w-auto object-contain" />
            <p className="mt-4 max-w-sm text-muted-foreground">
              Welcome to the no. 1 leading online family christian radio station in east africa.
            </p>
            <p className="mt-6 font-display text-2xl font-semibold uppercase text-accent-alt">
              Jesus is coming again. Be ready.
            </p>
          </div>

          <div className="md:col-span-2">
            <h4 className={headingClass}>Navigate</h4>
            <ul className="flex flex-col gap-2">
              {[
                { label: 'Home', href: '/' },
                { label: 'Teachings', href: '/shows' },
                { label: 'Testimonies', href: '/news' },
                { label: 'About', href: '/about' },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={linkClass}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className={headingClass}>Ministry</h4>
            <ul className="flex flex-col gap-2">
              <li>
                <Link href="/contact" className={linkClass}>
                  Accept Jesus
                </Link>
              </li>
              <li>
                <Link href="/get-involved#prayer-request" className={linkClass}>
                  Prayer request
                </Link>
              </li>
              <li>
                <Link href="/get-involved#give" className={linkClass}>
                  Giving &amp; support
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <h4 className={headingClass}>Follow us</h4>
            <div className="flex flex-wrap gap-2">
              <a href="https://www.facebook.com/lightfmkenya" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className={socialClass}>
                <Facebook size={18} />
              </a>
              <a href="https://x.com/LightFmKenya" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)" className={socialClass}>
                <Twitter size={18} />
              </a>
              <a href="https://www.instagram.com/lightfmkenya/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className={socialClass}>
                <Instagram size={18} />
              </a>
              <a href="https://www.youtube.com/@lcmstudiosKe/videos" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className={socialClass}>
                <Youtube size={18} />
              </a>
              <Link href="/get-involved#fellowship" aria-label="WhatsApp fellowship" className={socialClass}>
                <WhatsAppIcon size={18} />
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-border pt-6 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} The Loud Cry Ministries–Kenya. <span className="italic">&ldquo;I am the light of the world.&rdquo; John 8:12</span>
          </p>
          <p className="flex flex-wrap gap-x-4 gap-y-1">
            <Link href="/privacy-policy" className={linkClass}>
              Privacy policy
            </Link>
            <span>
              Powered by grace through{' '}
              <a href="https://www.allons-ysuite.com/" target="_blank" rel="noopener noreferrer" className={linkClass}>
                Allons-y Ministry
              </a>
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
