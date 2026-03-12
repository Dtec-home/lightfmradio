'use client';

import { usePlayer } from '@/context/PlayerContext';
import { Clock, Users } from 'lucide-react';

export function RecentlyPlayed() {
  const { songHistory } = usePlayer();

  if (!songHistory || songHistory.length === 0) return null;

  return (
    <div className="bg-card rounded-lg p-6 border border-border">
      <h3 className="text-xl font-serif font-semibold mb-4">Recently Played</h3>
      <div className="space-y-3">
        {songHistory.map((item, index) => (
          <div key={index} className="flex items-start gap-3 pb-3 border-b border-border last:border-0">
            {item.song.art && (
              <img 
                src={item.song.art} 
                alt={item.song.title}
                className="w-12 h-12 rounded object-cover"
              />
            )}
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate">{item.song.title || 'Unknown Track'}</p>
              <p className="text-sm text-muted-foreground truncate">{item.song.artist || 'Unknown Artist'}</p>
              {item.playlist && (
                <p className="text-xs text-muted-foreground mt-1">From: {item.playlist}</p>
              )}
            </div>
            <div className="text-xs text-muted-foreground flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {new Date(item.played_at * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
