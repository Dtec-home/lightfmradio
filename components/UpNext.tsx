'use client';

import { usePlayer } from '@/context/PlayerContext';
import { Clock, Music } from 'lucide-react';

export function UpNext() {
  const { playingNext } = usePlayer();

  if (!playingNext) return null;

  return (
    <div className="bg-card rounded-lg p-6 border border-border">
      <div className="flex items-center gap-2 mb-4">
        <Clock className="w-5 h-5 text-muted-foreground" />
        <h3 className="text-xl font-serif font-semibold">Up Next</h3>
      </div>
      
      <div className="flex items-start gap-4">
        {playingNext.art ? (
          <img 
            src={playingNext.art} 
            alt={playingNext.title}
            className="w-20 h-20 rounded-lg object-cover"
          />
        ) : (
          <div className="w-20 h-20 rounded-lg bg-muted flex items-center justify-center">
            <Music className="w-8 h-8 text-muted-foreground" />
          </div>
        )}
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="px-1.5 py-0.5 rounded bg-accent/20 text-accent text-[8px] font-bold uppercase tracking-wider">Up Next</span>
            {playingNext.playlist && (
              <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-tighter tabular-nums opacity-60">
                {playingNext.playlist === 'default' ? 'Global Stream' : playingNext.playlist}
              </span>
            )}
          </div>
          <p className="font-bold text-lg truncate leading-tight mb-0.5">{playingNext.title || 'Inspirational Message'}</p>
          <p className="text-accent-alt text-sm font-medium truncate">{playingNext.artist === 'Unknown Artist' || !playingNext.artist ? 'Light FM Ministry' : playingNext.artist}</p>
          {playingNext.album && (
            <p className="text-[10px] text-muted-foreground truncate italic mt-1">{playingNext.album}</p>
          )}
        </div>
      </div>
    </div>
  );
}
