'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface NewsCardProps {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  featured?: boolean;
}

export function NewsCard({ id, title, excerpt, date, category, featured = false }: NewsCardProps) {
  return (
    <Card
      className={`group h-full gap-0 overflow-hidden py-0 border-border hover:border-accent-alt transition-all ${
        featured ? 'md:col-span-2 bg-gradient-to-br from-accent/10 to-accent-alt/10' : ''
      }`}
    >
      <Link href={`/news/${id}`} className="h-full block">
        <CardContent className="p-6 sm:p-8 h-full flex flex-col justify-between">
          {/* Header */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs font-semibold text-accent bg-accent/10 px-3 py-1 rounded-full">
                {category}
              </span>
              <span className="text-xs text-muted-foreground">{date}</span>
            </div>
            <h3 className={`font-serif font-bold text-foreground mb-3 group-hover:text-accent transition-colors ${
              featured ? 'text-2xl' : 'text-lg'
            }`}>
              {title}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {excerpt}
            </p>
          </div>

          {/* Footer */}
          <div className="mt-6 flex items-center text-accent group-hover:gap-2 transition-all">
            <span className="text-sm font-semibold">Read More</span>
            <ArrowRight size={16} />
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}
