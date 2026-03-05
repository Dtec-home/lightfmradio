'use client';

import { usePlayer } from '@/context/PlayerContext';
import { motion } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, SkipBack, SkipForward } from 'lucide-react';

export function Player() {
  const { isPlaying, setIsPlaying, volume, setVolume, currentTrack } = usePlayer();

  return (
    <motion.div
      className="fixed bottom-0 left-0 right-0 bg-secondary border-t border-accent/30 z-40"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Now Playing Info */}
          <div className="flex-1 min-w-0">
            {currentTrack ? (
              <div>
                <p className="text-sm font-medium text-foreground truncate">
                  {currentTrack.title}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {currentTrack.artist}
                </p>
              </div>
            ) : (
              <div>
                <p className="text-sm font-medium text-foreground">Not playing</p>
                <p className="text-xs text-muted-foreground">Select a show to play</p>
              </div>
            )}
          </div>

          {/* Player Controls */}
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-primary rounded-lg transition-colors">
              <SkipBack size={18} className="text-foreground" />
            </button>

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

            <button className="p-2 hover:bg-primary rounded-lg transition-colors">
              <SkipForward size={18} className="text-foreground" />
            </button>
          </div>

          {/* Volume Control */}
          <div className="flex items-center gap-2 w-32">
            {volume === 0 ? (
              <VolumeX size={18} className="text-foreground" />
            ) : (
              <Volume2 size={18} className="text-foreground" />
            )}
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
