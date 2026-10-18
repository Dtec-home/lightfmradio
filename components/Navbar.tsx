'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, X, Sun, Moon, ChevronDown, Radio } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { usePlayer } from '@/context/PlayerContext';
import { cn } from '@/lib/utils';

const navLink =
  'font-display text-[0.9375rem] font-semibold uppercase tracking-[0.06em] text-foreground/80 transition-colors hover:text-foreground';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const { setIsPlaying } = usePlayer();
  const router = useRouter();
  const pathname = usePathname();

  const startListening = () => {
    setIsPlaying(true);
    router.push('/');
  };

  const navItems = [
    { label: 'About', href: '/about' },
    { label: 'Get Involved', href: '/get-involved' },
    { label: 'Contact', href: '/contact' },
  ];

  const teachingsTestimonies = [
    { label: 'Teachings', href: '/shows' },
    { label: 'Testimonies', href: '/news' },
  ];

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <nav className="fixed top-0 right-0 left-0 z-50 border-b border-border bg-background">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-6">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="Light FM"
              width={160}
              height={48}
              priority
              className="h-11 w-auto object-contain"
            />
            <span className="hidden border-l border-border pl-3 text-sm text-muted-foreground italic lg:block">
              Edifying with the truth
            </span>
          </Link>

          <div className="hidden items-center gap-7 md:flex">
            <DropdownMenu>
              <DropdownMenuTrigger className={cn(navLink, 'flex items-center gap-1 outline-none')}>
                Teachings &amp; Testimonies
                <ChevronDown className="size-3.5" aria-hidden />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuGroup>
                  {teachingsTestimonies.map((item) => (
                    <DropdownMenuItem key={item.href} asChild>
                      <Link href={item.href}>{item.label}</Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>

            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(navLink, isActive(item.href) && 'text-primary hover:text-primary')}
                aria-current={isActive(item.href) ? 'page' : undefined}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-1">
            <Button size="sm" onClick={startListening} className="hidden sm:inline-flex">
              <Radio data-icon="inline-start" />
              Listen live
            </Button>

            {mounted && (
              <Button
                onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
                aria-label={resolvedTheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                variant="ghost"
                size="icon"
              >
                {resolvedTheme === 'dark' ? <Sun /> : <Moon />}
              </Button>
            )}

            <Button
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
              aria-controls="mobile-nav-menu"
              variant="ghost"
              size="icon"
              className="md:hidden"
            >
              {isOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>

        {isOpen && (
          <div
            id="mobile-nav-menu"
            className="flex animate-in flex-col gap-1 border-t border-border py-4 duration-200 fade-in slide-in-from-top-1 md:hidden"
          >
            <Button
              size="lg"
              className="mb-3 w-full"
              onClick={() => {
                startListening();
                setIsOpen(false);
              }}
            >
              <Radio data-icon="inline-start" />
              Listen live
            </Button>
            {[...teachingsTestimonies, ...navItems].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(navLink, 'rounded-md px-3 py-2.5 text-lg hover:bg-accent')}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
