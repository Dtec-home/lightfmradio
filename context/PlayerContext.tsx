'use client';

import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

interface Track {
  title: string;
  artist: string;
  duration: number;
  art?: string;
  album?: string;
  playlist?: string;
}

interface Listeners {
  total: number;
  unique: number;
  current: number;
}

interface LiveInfo {
  is_live: boolean;
  streamer_name: string;
  broadcast_start: number | null;
}

interface SongHistory {
  played_at: number;
  song: {
    title: string;
    artist: string;
    art?: string;
    album?: string;
  };
  playlist: string;
}

interface PlayerContextType {
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
  volume: number;
  setVolume: (volume: number) => void;
  currentTrack: Track | null;
  isLive: boolean;
  liveInfo: LiveInfo | null;
  listeners: Listeners | null;
  playingNext: Track | null;
  songHistory: SongHistory[];
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

const STREAM_URL = process.env.NEXT_PUBLIC_STREAM_URL || 'https://app.lightfmradio.org/listen/lightfm/radio.mp3';
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://app.lightfmradio.org/api/nowplaying/lightfm';

export function PlayerProvider({ children }: { children: React.ReactNode }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(80);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isLive, setIsLive] = useState(false);
  const [liveInfo, setLiveInfo] = useState<LiveInfo | null>(null);
  const [listeners, setListeners] = useState<Listeners | null>(null);
  const [playingNext, setPlayingNext] = useState<Track | null>(null);
  const [songHistory, setSongHistory] = useState<SongHistory[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio(STREAM_URL);
    audioRef.current.volume = volume / 100;

    return () => {
      audioRef.current?.pause();
      audioRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(() => setIsPlaying(false));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  useEffect(() => {
    const fetchNowPlaying = async () => {
      try {
        const res = await fetch(API_URL);
        const data = await res.json();
        
        // Current track
        const song = data.now_playing?.song;
        if (song) {
          setCurrentTrack({
            title: song.title || 'Unknown',
            artist: song.artist || 'Unknown Artist',
            duration: data.now_playing?.duration || 0,
            art: song.art,
            album: song.album,
            playlist: data.now_playing?.playlist,
          });
        }
        
        // Live info
        setIsLive(data.live?.is_live || false);
        setLiveInfo(data.live || null);
        
        // Listeners
        setListeners(data.listeners || null);
        
        // Playing next
        if (data.playing_next?.song) {
          const next = data.playing_next.song;
          setPlayingNext({
            title: next.title || 'Unknown',
            artist: next.artist || 'Unknown Artist',
            duration: data.playing_next.duration || 0,
            art: next.art,
            album: next.album,
            playlist: data.playing_next.playlist,
          });
        }
        
        // Song history
        setSongHistory(data.song_history?.slice(0, 5) || []);
        
      } catch (error) {
        console.error('Failed to fetch now playing:', error);
      }
    };

    fetchNowPlaying();
    const interval = setInterval(fetchNowPlaying, 15000);
    return () => clearInterval(interval);
  }, []);

  return (
    <PlayerContext.Provider value={{
      isPlaying,
      setIsPlaying,
      volume,
      setVolume,
      currentTrack,
      isLive,
      liveInfo,
      listeners,
      playingNext,
      songHistory,
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
