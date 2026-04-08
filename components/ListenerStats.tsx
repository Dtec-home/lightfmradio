'use client';

import { usePlayer } from '@/context/PlayerContext';
import { Users, Radio, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

export function ListenerStats() {
  const { listeners, isLive, liveInfo } = usePlayer();
  const [likes, setLikes] = useState(1240);
  const [hearts, setHearts] = useState<{ id: number; x: number }[]>([]);

  useEffect(() => {
    // Slowly increment likes
    const interval = setInterval(() => {
      setLikes(prev => prev + Math.floor(Math.random() * 2));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Randomly trigger heart animations
    const triggerHeart = () => {
      const id = Date.now();
      const x = Math.random() * 100 - 50; // Random horizontal offset
      setHearts(prev => [...prev, { id, x }]);
      setTimeout(() => {
        setHearts(prev => prev.filter(h => h.id !== id));
      }, 3000);
    };

    const nextHeart = () => {
      triggerHeart();
      setTimeout(nextHeart, 5000 + Math.random() * 10000);
    };

    const timeout = setTimeout(nextHeart, 3000);
    return () => clearTimeout(timeout);
  }, []);

  if (!listeners) return null;

  return (
    <div className="bg-card rounded-lg p-6 border border-border relative overflow-hidden">
      {/* Heart Animations Layer */}
      <div className="absolute inset-0 pointer-events-none z-10">
        <AnimatePresence>
          {hearts.map(heart => (
            <motion.div
              key={heart.id}
              initial={{ opacity: 0, y: 100, x: heart.x, scale: 0.5 }}
              animate={{ opacity: [0, 1, 0.8, 0], y: -200, scale: [0.5, 1.2, 1] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 3, ease: "easeOut" }}
              className="absolute bottom-0 left-1/2 text-red-500/60"
            >
              <Heart className="w-6 h-6 fill-current" />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-serif font-semibold">Live Listener Stats</h3>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-xs font-medium text-accent">
            <Heart className="w-3.5 h-3.5 fill-current animate-pulse" />
            <span>{likes.toLocaleString()} Likes</span>
          </div>
          {isLive && liveInfo?.streamer_name && (
            <div className="flex items-center gap-2 text-sm bg-accent/10 px-2 py-0.5 rounded-full">
              <Radio className="w-3.5 h-3.5 text-red-500 animate-pulse" />
              <span className="font-medium text-xs">{liveInfo.streamer_name}</span>
            </div>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-2 relative z-0">
        <div className="text-center p-2 rounded-lg bg-accent/5">
          <p className="text-2xl font-bold text-foreground">{listeners.current}</p>
          <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">Live Now</p>
        </div>
        
        <div className="text-center p-2 border-l border-r border-border">
          <p className="text-2xl font-bold text-foreground">{listeners.unique}</p>
          <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">Daily Reach</p>
        </div>
        
        <div className="text-center p-2 rounded-lg bg-accent-alt/5">
          <p className="text-2xl font-bold text-foreground">{listeners.total.toLocaleString()}</p>
          <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">Monthly Impact</p>
        </div>
      </div>
    </div>
  );
}
