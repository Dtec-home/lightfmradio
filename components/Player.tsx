'use client';

import { usePlayer } from '@/context/PlayerContext';
import { motion } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

export function Player() {
  const { isPlaying, setIsPlaying, volume, setVolume, currentTrack, isLive, liveInfo } = usePlayer();

  return (
    <motion.div
      className="fixed bottom-6 left-1/2 w-[95%] max-w-4xl rounded-2xl bg-background/80 backdrop-blur-xl border border-border/50 shadow-2xl z-50"
      initial={{ y: 100, x: "-50%" }}
      animate={{ y: 0, x: "-50%" }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Now Playing Info */}
          <div className="flex items-center gap-3 flex-1 min-w-0">
            {currentTrack?.art && (
              <img src={currentTrack.art} alt="Album art" className="w-12 h-12 rounded object-cover" />
            )}
            <div className="flex-1 min-w-0">
              {currentTrack ? (
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-foreground truncate">
                      {currentTrack.title}
                    </p>
                    {isLive && (
                      <span className="px-2 py-0.5 bg-red-500 text-white text-xs rounded-full animate-pulse">
                        LIVE
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground truncate">
                    {isLive && liveInfo?.streamer_name
                      ? `${liveInfo.streamer_name} • ${currentTrack.artist}`
                      : currentTrack.artist
                    }
                  </p>
                  {currentTrack.playlist && !isLive && (
                    <p className="text-xs text-muted-foreground/70 truncate">
                      {currentTrack.playlist}
                    </p>
                  )}
                </div>
              ) : (
                <div>
                  <p className="text-sm font-medium text-foreground">Light FM Radio</p>
                  <p className="text-xs text-muted-foreground">Click play to listen</p>
                </div>
              )}
            </div>
          </div>

          {/* Player Controls */}
          <div className="flex items-center gap-2">
            <motion.button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-3 bg-accent rounded-lg hover:bg-accent/90 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {isPlaying ? (
                <Pause size={20} className="text-accent-foreground fill-accent-foreground" />
              ) : (
                <Play size={20} className="text-accent-foreground fill-accent-foreground" />
              )}
            </motion.button>
          </div>

          {/* Volume Control */}
          <div className="flex items-center gap-2 w-32">
            <button onClick={() => setVolume(volume === 0 ? 80 : 0)}>
              {volume === 0 ? (
                <VolumeX size={18} className="text-foreground" />
              ) : (
                <Volume2 size={18} className="text-foreground" />
              )}
            </button>
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              className="w-full h-1 bg-primary rounded-lg appearance-none cursor-pointer accent-accent"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
