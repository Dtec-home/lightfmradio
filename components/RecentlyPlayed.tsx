'use client';

import { usePlayer } from '@/context/PlayerContext';
import { Music } from 'lucide-react';
import Image from 'next/image';
import { getSafeImageSource } from '@/lib/images';

export function RecentlyPlayed() {
  const { songHistory } = usePlayer();

  if (!songHistory || songHistory.length === 0) return null;

  return (
    <ol className="flex flex-col">
      {songHistory.map((item) => {
        const art = getSafeImageSource(item.song.art);

        return (
          <li
            key={`${item.played_at}-${item.song.title}`}
            className="flex items-center gap-4 border-b border-border py-3 last:border-0"
          >
          <time className="w-14 shrink-0 font-display text-sm tracking-[0.04em] text-muted-foreground tabular-nums">
            {new Date(item.played_at * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </time>
          {art ? (
            <Image src={art} alt="" width={40} height={40} className="size-10 shrink-0 rounded-sm object-cover" />
          ) : (
            <div className="flex size-10 shrink-0 items-center justify-center rounded-sm bg-muted">
              <Music className="size-4 text-muted-foreground" aria-hidden />
            </div>
          )}
          <div className="min-w-0 flex-1">
            <p className="truncate font-semibold">{item.song.title || 'Inspirational Message'}</p>
            <p className="truncate text-sm text-muted-foreground">
              {item.song.artist === 'Unknown Artist' || !item.song.artist ? 'Light FM Ministry' : item.song.artist}
            </p>
          </div>
          </li>
        );
      })}
    </ol>
  );
}
