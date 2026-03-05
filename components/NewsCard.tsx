'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

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
    <motion.div
      className={`group ${
        featured
          ? 'md:col-span-2 bg-gradient-to-br from-accent/10 to-accent-alt/10'
          : 'bg-card'
      } border border-border rounded-lg overflow-hidden hover:border-accent transition-all`}
      whileHover={{ borderColor: '#F5A623' }}
      transition={{ duration: 0.3 }}
    >
      <Link href={`/news/${id}`}>
        <div className="p-6 sm:p-8 h-full flex flex-col justify-between">
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
        </div>
      </Link>
    </motion.div>
  );
}
