'use client';

import { usePlayer } from '@/context/PlayerContext';
import { Users, Radio } from 'lucide-react';

export function ListenerStats() {
  const { listeners, isLive, liveInfo } = usePlayer();

  if (!listeners) return null;

  return (
    <div className="bg-card rounded-lg p-6 border border-border">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-serif font-semibold">Listener Stats</h3>
        {isLive && liveInfo?.streamer_name && (
          <div className="flex items-center gap-2 text-sm">
            <Radio className="w-4 h-4 text-red-500 animate-pulse" />
            <span className="font-medium">{liveInfo.streamer_name}</span>
          </div>
        )}
      </div>
      
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-1">
            <Users className="w-5 h-5 text-muted-foreground" />
          </div>
          <p className="text-2xl font-bold">{listeners.current}</p>
          <p className="text-xs text-muted-foreground">Current</p>
        </div>
        
        <div className="text-center border-l border-r border-border">
          <div className="flex items-center justify-center gap-2 mb-1">
            <Users className="w-5 h-5 text-muted-foreground" />
          </div>
          <p className="text-2xl font-bold">{listeners.unique}</p>
          <p className="text-xs text-muted-foreground">Unique</p>
        </div>
        
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-1">
            <Users className="w-5 h-5 text-muted-foreground" />
          </div>
          <p className="text-2xl font-bold">{listeners.total}</p>
          <p className="text-xs text-muted-foreground">Total</p>
        </div>
      </div>
    </div>
  );
}
