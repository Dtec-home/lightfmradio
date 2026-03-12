'use client';

import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { Navbar } from '@/components/Navbar';
import { Player } from '@/components/Player';
import { Footer } from '@/components/Footer';
import { ArrowLeft, Clock, Share2, Copy, Check } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
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
        <main className="min-h-screen pt-32 pb-24 bg-background">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="animate-pulse">Loading...</div>
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
      <main className="min-h-screen pt-32 pb-24 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/news"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-accent mb-8 transition-colors"
          >
            <ArrowLeft size={20} />
            Back to Testimonies
          </Link>

          <article className="bg-card border border-border rounded-2xl p-8 md:p-12 shadow-sm">
            <header className="mb-12 border-b border-border pb-8 text-center">
              <span className="text-sm font-semibold text-accent bg-accent/10 px-4 py-2 rounded-full mb-6 inline-block">
                {article.category}
              </span>
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6 leading-tight">
                {article.title}
              </h1>
              <div className="flex items-center justify-center gap-2 text-muted-foreground">
                <Clock size={18} />
                <span>{formattedDate}</span>
              </div>
            </header>

            <div className="text-xl font-medium text-foreground/80 mb-10 text-center italic border-l-4 border-accent pl-6 bg-accent/5 py-4 rounded-r-lg">
              {article.excerpt}
            </div>

            <div className="prose prose-lg dark:prose-invert max-w-none text-foreground/90 mx-auto whitespace-pre-wrap">
              {article.content || article.excerpt}
            </div>

            <div className="mt-12 pt-8 border-t border-border flex justify-center">
              <div className="relative">
                <button
                  onClick={() => setShowShareMenu(!showShareMenu)}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-accent-foreground rounded-lg font-semibold hover:bg-accent/90 transition-colors"
                >
                  <Share2 size={18} />
                  Share Article
                </button>

                {showShareMenu && (
                  <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-card border border-border rounded-lg shadow-lg p-4 min-w-[280px]">
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

                    <button
                      onClick={copyToClipboard}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-muted hover:bg-muted/80 rounded-md transition-colors text-sm"
                    >
                      {copied ? <Check size={16} /> : <Copy size={16} />}
                      {copied ? 'Copied!' : 'Copy Link'}
                    </button>
                  </div>
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
