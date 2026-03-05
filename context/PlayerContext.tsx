'use client';

import React, { createContext, useContext, useState } from 'react';

interface Track {
  title: string;
  artist: string;
  duration: number;
}

interface PlayerContextType {
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
  volume: number;
  setVolume: (volume: number) => void;
  currentTrack: Track | null;
  setCurrentTrack: (track: Track | null) => void;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export function PlayerProvider({ children }: { children: React.ReactNode }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(80);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);

  return (
    <PlayerContext.Provider value={{
      isPlaying,
      setIsPlaying,
      volume,
      setVolume,
      currentTrack,
      setCurrentTrack,
    }}>
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error('usePlayer must be used within PlayerProvider');
  }
  return context;
}
