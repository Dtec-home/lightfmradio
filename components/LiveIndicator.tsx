'use client';

import { motion } from 'framer-motion';

interface LiveIndicatorProps {
  isLive: boolean;
  currentShow?: string;
}

export function LiveIndicator({ isLive, currentShow }: LiveIndicatorProps) {
  return (
    <motion.div
      className={`flex items-center gap-2 px-4 py-2 rounded-full ${
        isLive
          ? 'bg-accent-alt/20 border border-accent-alt'
          : 'bg-muted border border-border'
      }`}
      initial={{ scale: 0.95 }}
      animate={{ scale: 1 }}
    >
      {isLive && (
        <motion.div
          className="w-2 h-2 rounded-full bg-accent-alt"
          animate={{ opacity: [1, 0.5, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      )}
      <span className={`text-sm font-semibold ${
        isLive ? 'text-accent-alt' : 'text-muted-foreground'
      }`}>
        {isLive ? 'LIVE' : 'OFFLINE'}
      </span>
      {currentShow && (
        <>
          <span className="text-muted-foreground">•</span>
          <span className="text-sm text-muted-foreground">{currentShow}</span>
        </>
      )}
    </motion.div>
  );
}
