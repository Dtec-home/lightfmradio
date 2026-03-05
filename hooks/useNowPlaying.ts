'use client';

import useSWR from 'swr';

interface AzuraCastNowPlaying {
  song?: {
    title: string;
    artist: string;
    duration: number;
  };
}

interface UseNowPlayingReturn {
  isLive: boolean;
  currentTrack: {
    title: string;
    artist: string;
    duration: number;
  } | null;
  isLoading: boolean;
  isError: boolean;
}

const fetcher = (url: string) => fetch(url).then(res => res.json()).catch(() => null);

export function useNowPlaying(stationUrl: string = 'https://demo.azuracast.com'): UseNowPlayingReturn {
  // Fetch now playing info from AzuraCast API
  // Note: You'll need to set your AzuraCast station URL in environment variables
  const { data, error, isLoading } = useSWR<AzuraCastNowPlaying | null>(
    stationUrl ? `${stationUrl}/api/nowplaying` : null,
    fetcher,
    {
      refreshInterval: 10000, // Poll every 10 seconds
      dedupingInterval: 5000,
      revalidateOnFocus: false,
    }
  );

  const currentTrack = data?.song
    ? {
        title: data.song.title || 'Unknown Track',
        artist: data.song.artist || 'Unknown Artist',
        duration: data.song.duration || 0,
      }
    : null;

  return {
    isLive: !!data,
    currentTrack,
    isLoading,
    isError: !!error,
  };
}
