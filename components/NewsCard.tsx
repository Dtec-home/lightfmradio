import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface NewsCardProps {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  image?: string;
  featured?: boolean;
}

const ARTICLE_CATEGORY_IMAGES: Record<string, string> = {
  Scripture: '/images/articles/category-scripture.jpg',
  Testimonies: '/images/articles/category-testimonies.jpg',
  Gospel: '/images/articles/category-gospel.jpg',
  Prayer: '/images/articles/category-prayer.jpg',
  Faith: '/images/articles/category-faith.jpg',
};

export function NewsCard({ id, title, excerpt, date, category, image, featured = false }: NewsCardProps) {
  const resolvedImage =
    image && !image.includes('drive.google.com') && !image.startsWith('/gradient')
      ? image
      : ARTICLE_CATEGORY_IMAGES[category] || '/images/articles/category-scripture.jpg';

  return (
    <article
      className={cn(
        'group relative flex h-full flex-col overflow-hidden rounded-lg border border-border bg-card transition-all hover:border-primary/40 hover:shadow-md',
        featured && 'md:col-span-2'
      )}
    >
      <div className={cn('relative w-full overflow-hidden bg-muted', featured ? 'aspect-[21/9]' : 'aspect-video')}>
        <Image
          src={resolvedImage}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />
        <div className="absolute top-3 left-3">
          <Badge variant="secondary" className="backdrop-blur-md bg-background/85 font-medium shadow-xs">
            {category}
          </Badge>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <time className="text-xs font-semibold tracking-wider text-muted-foreground uppercase tabular-nums">
          {date}
        </time>
        <h3
          className={cn(
            'mt-2.5 font-display leading-tight font-semibold transition-colors group-hover:text-primary',
            featured ? 'text-2xl md:text-3xl' : 'text-xl'
          )}
        >
          <Link href={`/news/${id}`} className="after:absolute after:inset-0">
            {title}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-muted-foreground">{excerpt}</p>
        <span className="mt-4 inline-flex items-center text-sm font-semibold text-primary transition-transform group-hover:translate-x-1">
          Read more &rarr;
        </span>
      </div>
    </article>
  );
}
