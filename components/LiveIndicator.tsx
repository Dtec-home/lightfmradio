'use client';

import { motion } from 'framer-motion';
import { usePlayer } from '@/context/PlayerContext';

interface LiveIndicatorProps {
  isLive?: boolean;
  currentShow?: string;
}

export function LiveIndicator({ isLive: fallbackIsLive = true, currentShow: fallbackShow }: LiveIndicatorProps) {
  const { isLive: contextIsLive, currentTrack, liveInfo } = usePlayer();

  // If there's a live DJ, show their name. Otherwise show current track title.
  const displayShow = (liveInfo?.is_live && liveInfo?.streamer_name)
    ? liveInfo.streamer_name
    : currentTrack?.title || fallbackShow;

  const displayLive = fallbackIsLive || contextIsLive;

  return (
    <motion.div
      className={`flex items-center gap-2 px-4 py-2 rounded-full ${displayLive
          ? 'bg-accent-alt/20 border border-accent-alt'
          : 'bg-muted border border-border'
        }`}
      initial={{ scale: 0.95 }}
      animate={{ scale: 1 }}
    >
      {displayLive && (
        <motion.div
          className="w-2 h-2 rounded-full bg-accent-alt"
          animate={{ opacity: [1, 0.5, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      )}
      <span className={`text-sm font-semibold ${displayLive ? 'text-accent-alt' : 'text-muted-foreground'
        }`}>
        {displayLive ? 'LIVE' : 'OFFLINE'}
      </span>
      {displayShow && (
        <>
          <span className="text-muted-foreground">•</span>
          <span className="text-sm text-muted-foreground truncate max-w-[250px] sm:max-w-sm" title={displayShow}>
            {displayShow}
          </span>
        </>
      )}
    </motion.div>
  );
}
