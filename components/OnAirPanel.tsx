'use client';

import Image from 'next/image';
import { Pause, Play, Radio, Mic2 } from 'lucide-react';
import { usePlayer } from '@/context/PlayerContext';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { getSafeImageSource } from '@/lib/images';

function artistLabel(artist?: string) {
  return !artist || artist === 'Unknown Artist' ? 'Light FM Ministry' : artist;
}

export function OnAirPanel() {
  const { currentTrack, isLive, liveInfo, isPlaying, setIsPlaying, playingNext, listeners } = usePlayer();
  const current = listeners?.current ?? 0;
  const trackArt = getSafeImageSource(currentTrack?.art);

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card text-card-foreground shadow-2xl">
      {/* 100% Crisp Studio Photography Header */}
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-muted">
        <Image
          src="/images/hero/christian-radio-studio.jpg"
          alt="Light FM Broadcasting Studio"
          fill
          priority
          sizes="(max-width: 768px) 100vw, 480px"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/30" />
        
        {/* Top Floating Badges */}
        <div className="absolute top-3.5 left-3.5 flex items-center gap-2 rounded-full bg-black/60 px-3 py-1 text-xs font-semibold tracking-wider text-white uppercase backdrop-blur-md">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-80" />
            <span className="relative inline-flex size-2 rounded-full bg-primary" />
          </span>
          <span>{isLive && liveInfo?.streamer_name ? `Live · ${liveInfo.streamer_name}` : 'Live On Air'}</span>
        </div>

        {current > 0 && (
          <div className="absolute top-3.5 right-3.5 rounded-full bg-black/60 px-3 py-1 text-xs font-semibold tracking-wider text-white uppercase backdrop-blur-md">
            {current.toLocaleString()} listening
          </div>
        )}

        <div className="absolute bottom-3 left-4 right-4 flex items-center gap-2 text-white/90 text-xs font-medium">
          <Mic2 className="size-3.5 text-primary" />
          <span className="truncate">Nairobi Studio &bull; Proclaiming Christ 24/7</span>
        </div>
      </div>

      {/* Now Playing Information */}
      <div className="p-6">
        <div className="flex items-center gap-4">
          {trackArt ? (
            <Image
              src={trackArt}
              alt=""
              width={80}
              height={80}
              className="size-16 shrink-0 rounded-lg object-cover ring-1 ring-border shadow-xs sm:size-20"
            />
          ) : (
            <div className="flex size-16 shrink-0 items-center justify-center rounded-lg bg-muted sm:size-20">
              <Radio className="size-7 opacity-60 text-primary" aria-hidden />
            </div>
          )}
          <div className="min-w-0 flex-1">
            <span className="text-[11px] font-semibold tracking-widest text-primary uppercase">Now Playing</span>
            {currentTrack ? (
              <>
                <p className="font-display text-xl leading-snug font-semibold truncate sm:text-2xl text-foreground">
                  {currentTrack.title}
                </p>
                <p className="mt-0.5 truncate text-sm text-muted-foreground">{artistLabel(currentTrack.artist)}</p>
              </>
            ) : (
              <div className="mt-1 flex flex-col gap-2">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            )}
          </div>
        </div>

        <Button size="lg" className="mt-6 w-full gap-2 shadow-sm font-medium" onClick={() => setIsPlaying(!isPlaying)}>
          {isPlaying ? <Pause className="size-4" /> : <Play className="size-4 fill-current" />}
          {isPlaying ? 'Pause stream' : 'Listen live'}
        </Button>

        {playingNext && (
          <>
            <Separator className="my-4" />
            <p className="text-xs text-muted-foreground truncate">
              <span className="font-semibold uppercase tracking-wider text-foreground">Up next</span>
              <span className="mx-2" aria-hidden>—</span>
              {playingNext.title}
              {playingNext.artist && ` · ${artistLabel(playingNext.artist)}`}
            </p>
          </>
        )}
      </div>
    </div>
  );
}
