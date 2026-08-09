'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Menu, X, Sun, Moon, ChevronDown, Radio } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { usePlayer } from '@/context/PlayerContext';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const { setIsPlaying } = usePlayer();
  const router = useRouter();

  const startListening = () => {
    setIsPlaying(true);
    router.push('/');
  };

  const navItems = [
    { label: 'Get Involved', href: '/get-involved' },
    { label: 'Contact', href: '/contact' },
  ];

  const teachingsTestimonies = [
    { label: 'Teachings', href: '/shows' },
    { label: 'Testimonies', href: '/news' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/60 backdrop-blur-xl border-b border-border/40 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="relative h-12 w-auto flex items-center"
            >
              <Image
                src="/logo.png"
                alt="Light FM Logo"
                width={160}
                height={48}
                priority
                className="h-full w-auto object-contain"
              />
            </motion.div>
            <div className="hidden sm:block text-xs text-muted-foreground font-medium">
              Edifying with the truth
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/about"
              className="text-sm font-medium text-foreground hover:text-accent transition-colors"
            >
              About Us
            </Link>

            <button
              onClick={startListening}
              className="flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-accent transition-colors"
            >
              <Radio size={14} />
              Listen Live
            </button>

            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium text-foreground hover:text-accent transition-colors outline-none">
                Teachings &amp; Testimonies
                <ChevronDown size={14} />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center">
                {teachingsTestimonies.map((item) => (
                  <DropdownMenuItem key={item.href} asChild>
                    <Link href={item.href}>{item.label}</Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-foreground hover:text-accent transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            {mounted && (
              <Button
                onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
                aria-label={resolvedTheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                variant="ghost"
                size="icon"
                className="text-foreground"
              >
                {resolvedTheme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              </Button>
            )}

            {/* Mobile Menu Button */}
            <Button
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
              aria-controls="mobile-nav-menu"
              variant="ghost"
              size="icon"
              className="md:hidden text-foreground"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <motion.div
            id="mobile-nav-menu"
            className="md:hidden pb-4 space-y-1"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Link
              href="/about"
              className="block px-3 py-2 rounded-lg text-sm font-medium text-foreground hover:bg-secondary transition-colors"
              onClick={() => setIsOpen(false)}
            >
              About Us
            </Link>

            <button
              onClick={() => {
                startListening();
                setIsOpen(false);
              }}
              className="w-full flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-foreground hover:bg-secondary transition-colors text-left"
            >
              <Radio size={14} />
              Listen Live
            </button>

            <div className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Teachings &amp; Testimonies
            </div>
            {teachingsTestimonies.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block px-6 py-2 rounded-lg text-sm font-medium text-foreground hover:bg-secondary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}

            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block px-3 py-2 rounded-lg text-sm font-medium text-foreground hover:bg-secondary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </motion.div>
        )}
      </div>
    </nav>
  );
}
