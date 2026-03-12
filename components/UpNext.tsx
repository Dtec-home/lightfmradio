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
          <p className="font-semibold text-lg truncate">{playingNext.title}</p>
          <p className="text-muted-foreground truncate">{playingNext.artist}</p>
          {playingNext.album && (
            <p className="text-sm text-muted-foreground truncate mt-1">{playingNext.album}</p>
          )}
          {playingNext.playlist && (
            <p className="text-xs text-muted-foreground mt-2">
              From playlist: <span className="font-medium">{playingNext.playlist}</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
