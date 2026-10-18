'use client';

import { usePlayer } from '@/context/PlayerContext';
import { Play, Pause, Volume2, VolumeX, Radio } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import Image from 'next/image';
import { getSafeImageSource } from '@/lib/images';

export function Player() {
  const { isPlaying, setIsPlaying, volume, setVolume, currentTrack, isLive, liveInfo } = usePlayer();
  const trackArt = getSafeImageSource(currentTrack?.art);

  return (
    <div className="fixed bottom-[calc(1rem+env(safe-area-inset-bottom))] left-1/2 z-50 w-[calc(100%-2rem)] max-w-3xl -translate-x-1/2 animate-rise rounded-lg border border-border bg-card shadow-xl">
      <div className="flex items-center gap-3 p-2.5 sm:gap-4 sm:p-3">
        <Button
          onClick={() => setIsPlaying(!isPlaying)}
          size="icon-lg"
          aria-label={isPlaying ? 'Pause' : 'Play'}
          className="shrink-0"
        >
          {isPlaying ? <Pause className="fill-current" /> : <Play className="fill-current" />}
        </Button>

        {trackArt ? (
          <Image
            src={trackArt}
            alt=""
            width={40}
            height={40}
            className="hidden size-10 shrink-0 rounded-sm object-cover sm:block"
          />
        ) : (
          <div className="hidden size-10 shrink-0 items-center justify-center rounded-sm bg-muted sm:flex">
            <Radio className="size-4 text-muted-foreground" aria-hidden />
          </div>
        )}

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            {isLive && <Badge>Live</Badge>}
            <p className="truncate text-sm font-semibold">{currentTrack?.title ?? 'Light FM Radio'}</p>
          </div>
          <p className="truncate text-xs text-muted-foreground">
            {currentTrack
              ? isLive && liveInfo?.streamer_name
                ? `${liveInfo.streamer_name} · ${currentTrack.artist}`
                : currentTrack.artist
              : 'Press play to listen'}
          </p>
        </div>

        <div className="hidden w-36 items-center gap-2 pr-2 sm:flex">
          <Button
            onClick={() => setVolume(volume === 0 ? 80 : 0)}
            variant="ghost"
            size="icon-sm"
            aria-label={volume === 0 ? 'Unmute' : 'Mute'}
          >
            {volume === 0 ? <VolumeX /> : <Volume2 />}
          </Button>
          <Slider
            value={[volume]}
            max={100}
            step={1}
            onValueChange={([value]) => setVolume(value)}
            aria-label="Volume"
          />
        </div>
      </div>
    </div>
  );
}
