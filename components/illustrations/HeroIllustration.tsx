"use client";
import { motion } from "framer-motion";

export function HeroIllustration() {
  return (
    <div className="relative w-full aspect-square max-w-lg mx-auto flex items-center justify-center">
      {/* Background soft glow using the new red branding */}
      <div className="absolute inset-0 bg-accent blur-3xl opacity-20 rounded-full mix-blend-multiply" />

      <motion.div
        className="relative z-10 w-3/4 h-3/4 flex items-center justify-center drop-shadow-2xl"
        initial={{ y: 0 }}
        animate={{ y: [-10, 10, -10] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <img
          src="/logo.png"
          alt="Light FM Radio"
          className="w-full h-full object-contain drop-shadow-xl"
        />

        {/* Floating small shapes around the logo */}
        <motion.div
          className="absolute -top-4 -right-4 w-12 h-12 rounded-full bg-accent-alt/30 backdrop-blur-sm shadow-lg"
          animate={{ y: [-5, 5, -5] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-8 -left-2 w-16 h-16 rounded-xl bg-accent/20 backdrop-blur-sm shadow-lg"
          animate={{ y: [5, -5, 5], rotate: [0, 10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </div>
  );
}
