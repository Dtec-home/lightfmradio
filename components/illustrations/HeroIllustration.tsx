"use client";
import { motion } from "framer-motion";

export function HeroIllustration() {
  return (
    <div className="relative w-full aspect-square max-w-lg mx-auto">
      {/* Background soft glow */}
      <div className="absolute inset-0 bg-[#896929] blur-3xl opacity-20 rounded-full mix-blend-multiply" />

      <motion.svg
        viewBox="0 0 400 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full relative z-10 drop-shadow-2xl"
        initial={{ y: 0 }}
        animate={{ y: [-10, 10, -10] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Base rounded plate */}
        <rect x="40" y="40" width="320" height="320" rx="80" fill="url(#grad1)" />
        <rect x="40" y="40" width="320" height="320" rx="80" fill="#fff" fillOpacity="0.1" />

        {/* Main Icon Plate */}
        <circle cx="200" cy="200" r="110" fill="#FFFCF5" opacity="0.95" />

        {/* Radio Tower / Cross Element */}
        <path d="M188 100 h24 v200 h-24 z" fill="#896929" rx="10" />
        <path d="M140 160 h120 v24 h-120 z" fill="#896929" rx="10" />

        {/* Radio Waves Left */}
        <motion.path
          d="M120 200 A70 70 0 0 1 120 144"
          stroke="#896929"
          strokeWidth="12"
          strokeLinecap="round"
          initial={{ opacity: 0.3 }}
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.path
          d="M90 220 A100 100 0 0 1 90 124"
          stroke="#896929"
          strokeWidth="12"
          strokeLinecap="round"
          initial={{ opacity: 0.3 }}
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        />

        {/* Radio Waves Right */}
        <motion.path
          d="M280 144 A70 70 0 0 1 280 200"
          stroke="#896929"
          strokeWidth="12"
          strokeLinecap="round"
          initial={{ opacity: 0.3 }}
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.path
          d="M310 124 A100 100 0 0 1 310 220"
          stroke="#896929"
          strokeWidth="12"
          strokeLinecap="round"
          initial={{ opacity: 0.3 }}
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        />

        {/* Floating small shapes */}
        <motion.circle
          cx="330" cy="70" r="24" fill="#E8D19D"
          animate={{ y: [-5, 5, -5] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.rect
          x="50" y="290" width="40" height="40" rx="12" fill="#2D3748" opacity="0.85"
          animate={{ y: [5, -5, 5], rotate: [0, 10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />

        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#896929" />
            <stop offset="100%" stopColor="#C19B4C" />
          </linearGradient>
        </defs>
      </motion.svg>
    </div>
  );
}
