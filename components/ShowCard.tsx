'use client';

import Image from 'next/image';
import { Play } from 'lucide-react';
import { usePlayer } from '@/context/PlayerContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface ShowCardProps {
  id: string;
  title: string;
  host: string;
  description: string;
  image?: string;
  schedule: string;
  category?: string;
}

const CATEGORY_IMAGE_MAP: Record<string, string> = {
  Devotions: '/images/shows/daily-devotions.jpg',
  Study: '/images/shows/bible-study-prayer.jpg',
  Youth: '/images/shows/youth-ministry.jpg',
  Women: '/images/shows/womens-fellowship.jpg',
  Testimonies: '/images/shows/testimonies-grace.jpg',
  Prophecy: '/images/shows/end-times-prophecy.jpg',
};

export function ShowCard({ title, host, description, image, schedule, category }: ShowCardProps) {
  const { setIsPlaying, setCurrentTrack } = usePlayer();

  const handlePlay = () => {
    setCurrentTrack({ title, artist: host, duration: 0 });
    setIsPlaying(true);
  };

  const resolvedImage =
    image && !image.includes('drive.google.com') && !image.startsWith('/gradient')
      ? image
      : (category && CATEGORY_IMAGE_MAP[category]) || '/images/shows/daily-devotions.jpg';

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-lg border border-border bg-card transition-all hover:border-primary/40 hover:shadow-md">
      <div className="relative aspect-video w-full overflow-hidden bg-muted">
        <Image
          src={resolvedImage}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        {category && (
          <div className="absolute top-3 left-3">
            <Badge variant="secondary" className="backdrop-blur-md bg-background/85 font-medium shadow-xs">
              {category}
            </Badge>
          </div>
        )}
        <div className="absolute right-3 bottom-3 left-3 flex items-center justify-between text-xs font-semibold tracking-wider text-white uppercase drop-shadow-sm">
          <span>{schedule}</span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-2xl leading-tight font-semibold tracking-tight transition-colors group-hover:text-primary">
          {title}
        </h3>
        <p className="mt-1 text-sm font-semibold text-accent-alt">{host}</p>
        <p className="mt-2.5 line-clamp-3 flex-1 text-sm leading-relaxed text-muted-foreground">{description}</p>
        <Button variant="outline" size="sm" className="mt-5 self-start gap-2" onClick={handlePlay}>
          <Play className="size-3.5 fill-current" />
          Listen
        </Button>
      </div>
    </article>
  );
}
