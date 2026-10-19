'use client';

import { notFound } from 'next/navigation';
import { Navbar } from '@/components/Navbar';
import { Player } from '@/components/Player';
import { Footer } from '@/components/Footer';
import { ArrowLeft, Clock, Share2, Copy, Check } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const ARTICLE_CATEGORY_IMAGES: Record<string, string> = {
  Scripture: '/images/articles/category-scripture.jpg',
  Testimonies: '/images/articles/category-testimonies.jpg',
  Gospel: '/images/articles/category-gospel.jpg',
  Prayer: '/images/articles/category-prayer.jpg',
  Faith: '/images/articles/category-faith.jpg',
};
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  TelegramShareButton,
  EmailShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
  TelegramIcon,
  EmailIcon,
} from 'next-share';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';

export default function ArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const [article, setArticle] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchArticle = async () => {
      const { id } = await params;
      const response = await fetch(`/api/articles/${id}`);
      if (response.ok) {
        const data = await response.json();
        setArticle(data);
      }
      setLoading(false);
    };
    fetchArticle();

    // Close share menu when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.relative')) {
        setShowShareMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [params]);

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen pt-16 pb-24">
          <div className="mx-auto flex max-w-3xl flex-col gap-4 px-4 py-24 sm:px-6 lg:px-8">
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-14 w-full" />
            <Skeleton className="h-14 w-2/3" />
            <Skeleton className="mt-8 h-40 w-full" />
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (!article) {
    notFound();
  }

  const formattedDate = new Date(article.date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      const textArea = document.createElement('textarea');
      textArea.value = window.location.href;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <>
      <Navbar />
      <Player />
      <main className="min-h-screen pt-16 pb-24">
        <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
          <Link
            href="/news"
            className="inline-flex items-center gap-2 font-display text-sm font-semibold tracking-[0.08em] text-muted-foreground uppercase transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4" aria-hidden />
            Back to testimonies
          </Link>

          <article className="mt-10">
            <header className="border-b border-border pb-8">
              <div className="flex items-center gap-3">
                <Badge variant="secondary">{article.category}</Badge>
                <time className="flex items-center gap-1.5 text-sm text-muted-foreground tabular-nums">
                  <Clock className="size-3.5" aria-hidden />
                  {formattedDate}
                </time>
              </div>
              <h1 className="mt-5 font-display text-5xl leading-[0.95] font-bold md:text-6xl">{article.title}</h1>
              <p className="mt-6 text-xl leading-relaxed text-muted-foreground italic">{article.excerpt}</p>
            </header>

            <div className="relative mt-8 aspect-video w-full overflow-hidden rounded-xl border border-border bg-muted shadow-sm">
              <Image
                src={
                  article.image && !article.image.includes('drive.google.com') && !article.image.startsWith('/gradient')
                    ? article.image
                    : ARTICLE_CATEGORY_IMAGES[article.category] || '/images/articles/category-scripture.jpg'
                }
                alt={article.title}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 800px"
                className="object-cover"
              />
            </div>

            <div className="mt-10 max-w-prose text-lg leading-relaxed whitespace-pre-wrap text-foreground/90">
              {article.content || article.excerpt}
            </div>

            <div className="mt-12 flex border-t border-border pt-8">
              <div className="relative">
                <Button variant="outline" onClick={() => setShowShareMenu(!showShareMenu)}>
                  <Share2 data-icon="inline-start" />
                  Share article
                </Button>

                {showShareMenu && (
                  <Card className="absolute bottom-full left-0 mb-2 shadow-lg min-w-[280px] gap-0 py-0">
                  <CardContent className="p-4">
                    <div className="text-sm font-medium text-foreground mb-3 text-center">Share this article</div>

                    <div className="flex justify-center gap-2 mb-4">
                      <FacebookShareButton
                        url={typeof window !== 'undefined' ? window.location.href : ''}
                        quote={article.title}
                        hashtag="#LightFM"
                      >
                        <FacebookIcon size={32} round />
                      </FacebookShareButton>

                      <TwitterShareButton
                        url={typeof window !== 'undefined' ? window.location.href : ''}
                        title={article.title}
                        hashtags={['LightFM', 'Faith', 'Testimony']}
                      >
                        <TwitterIcon size={32} round />
                      </TwitterShareButton>

                      <WhatsappShareButton
                        url={typeof window !== 'undefined' ? window.location.href : ''}
                        title={article.title}
                        separator=" - "
                      >
                        <WhatsappIcon size={32} round />
                      </WhatsappShareButton>

                      <TelegramShareButton
                        url={typeof window !== 'undefined' ? window.location.href : ''}
                        title={article.title}
                      >
                        <TelegramIcon size={32} round />
                      </TelegramShareButton>

                      <EmailShareButton
                        url={typeof window !== 'undefined' ? window.location.href : ''}
                        subject={article.title}
                        body={`Check out this inspiring article: ${article.excerpt}`}
                      >
                        <EmailIcon size={32} round />
                      </EmailShareButton>
                    </div>

                    <Button
                      variant="secondary"
                      size="sm"
                      className="w-full gap-2"
                      onClick={copyToClipboard}
                    >
                      {copied ? <Check size={16} /> : <Copy size={16} />}
                      {copied ? 'Copied!' : 'Copy Link'}
                    </Button>
                  </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </article>
        </div>
      </main>
      <Footer />
    </>
  );
}
