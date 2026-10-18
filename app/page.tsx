'use client';

import { Navbar } from '@/components/Navbar';
import { Player } from '@/components/Player';
import { Footer } from '@/components/Footer';
import { ShowCard } from '@/components/ShowCard';
import { NewsCard } from '@/components/NewsCard';
import { RecentlyPlayed } from '@/components/RecentlyPlayed';
import { OnAirPanel } from '@/components/OnAirPanel';
import { SectionHeader } from '@/components/PageHeader';
import Link from 'next/link';
import Image from 'next/image';
import { Radio, Sparkles } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '@/components/ui/carousel';
import { usePlayer } from '@/context/PlayerContext';
import { MINISTRY } from '@/lib/content';

export default function Home() {
  const [shows, setShows] = useState<any[]>([]);
  const [featuredArticles, setFeaturedArticles] = useState<any[]>([]);
  const { setIsPlaying, songHistory } = usePlayer();

  useEffect(() => {
    fetch('/api/shows')
      .then(res => res.json())
      .then(data => Array.isArray(data) && setShows(data.slice(0, 3)))
      .catch(() => {});
    fetch('/api/articles')
      .then(res => res.json())
      .then(data => {
        if (!Array.isArray(data)) return;
        const featured = data.filter((a: any) => a.featured);
        setFeaturedArticles((featured.length > 0 ? featured : data).slice(0, 8));
      })
      .catch(() => {});
  }, []);

  return (
    <>
      <Navbar />
      <Player />

      <main className="pt-16">
        {/* Hero */}
        <section className="relative isolate overflow-hidden border-b border-border bg-background">
          {/* Photographic Studio Background */}
          <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
            <Image
              src="/images/hero/christian-radio-studio.jpg"
              alt="Light FM Broadcasting Studio"
              fill
              priority
              className="object-cover object-right opacity-70 dark:opacity-60 filter contrast-105"
            />
            {/* Scrim: solid background on left for 100% text readability, fading to reveal studio photo on right */}
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent dark:from-background dark:via-background/85 dark:to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent h-24 bottom-0 top-auto" />
          </div>
          <div className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-4 py-16 sm:px-6 md:py-24 lg:grid-cols-12 lg:px-8">
            <div className="animate-rise lg:col-span-7">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1 text-xs font-semibold tracking-wider text-primary uppercase">
                <span className="size-2 rounded-full bg-primary animate-pulse" />
                Christian Radio Ministry
              </div>
              <h1 className="mt-4 font-display text-6xl leading-[0.9] font-bold uppercase sm:text-7xl lg:text-8xl">
                Listen, read &amp; <span className="text-primary">witness</span>
              </h1>
              <p className="mt-6 text-2xl text-accent-alt italic">Christ&rsquo;s love illuminate your life</p>
              <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted-foreground">
                A beacon of hope through media — shining the light of Christ across nations and preparing hearts for His soon return.
              </p>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <Button size="lg" className="h-12 px-7 gap-2 shadow-sm" onClick={() => setIsPlaying(true)}>
                  <Radio data-icon="inline-start" className="size-5" />
                  Listen live
                </Button>
                <Button asChild variant="outline" size="lg" className="h-12 px-7">
                  <Link href="/get-involved">Support the mission</Link>
                </Button>
              </div>

              {/* Visual Christian Ministry Highlights with crisp photos */}
              <div className="mt-10 grid grid-cols-2 gap-4 border-t border-border pt-6 sm:grid-cols-3">
                <div className="flex items-center gap-3">
                  <div className="relative size-12 shrink-0 overflow-hidden rounded-lg border border-border bg-muted shadow-xs">
                    <Image
                      src="/images/hero/open-bible-dawn.jpg"
                      alt="Scripture"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="font-display text-xs font-semibold uppercase tracking-wider text-foreground truncate">Bible Truth</p>
                    <p className="text-[11px] text-muted-foreground truncate">Prophecy &amp; Faith</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="relative size-12 shrink-0 overflow-hidden rounded-lg border border-border bg-muted shadow-xs">
                    <Image
                      src="/images/banners/mission-worship.jpg"
                      alt="Worship"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="font-display text-xs font-semibold uppercase tracking-wider text-foreground truncate">SDA Choirs</p>
                    <p className="text-[11px] text-muted-foreground truncate">Sacred Hymns</p>
                  </div>
                </div>

                <div className="col-span-2 flex items-center gap-3 sm:col-span-1">
                  <div className="relative size-12 shrink-0 overflow-hidden rounded-lg border border-border bg-muted shadow-xs">
                    <Image
                      src="/images/shows/daily-devotions.jpg"
                      alt="Prayer"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="font-display text-xs font-semibold uppercase tracking-wider text-foreground truncate">Daily Prayer</p>
                    <p className="text-[11px] text-muted-foreground truncate">Morning Devotions</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="animate-rise [animation-delay:120ms] lg:col-span-5">
              <OnAirPanel />
            </div>
          </div>
        </section>

        {/* Featured teachings */}
        {shows.length > 0 && (
          <section className="py-20 md:py-28">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
              <SectionHeader
                title="Featured teachings"
                description="Deepen your faith with biblical instruction and spiritual growth."
                action={{ label: 'All teachings', href: '/shows' }}
              />
              <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                {shows.map((show: any) => (
                  <ShowCard key={show.id} {...show} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Scripture Spotlight Banner */}
        <section className="relative overflow-hidden border-y border-border py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-8 md:p-12 shadow-sm">
              <div className="absolute top-0 right-0 bottom-0 w-full md:w-1/2 opacity-22 dark:opacity-18 pointer-events-none">
                <Image
                  src="/images/hero/open-bible-dawn.jpg"
                  alt="Open Bible in morning dawn"
                  fill
                  className="object-cover object-right"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-card via-card/60 to-transparent" />
              </div>
              <div className="relative z-10 max-w-2xl">
                <div className="flex items-center gap-2 text-primary font-display text-xs font-semibold tracking-wider uppercase">
                  <Sparkles className="size-4" />
                  <span>Verse of the Day</span>
                </div>
                <blockquote className="mt-4 font-display text-2xl font-semibold leading-snug md:text-3xl text-foreground">
                  &ldquo;Your word is a lamp to my feet and a light to my path.&rdquo;
                </blockquote>
                <p className="mt-3 text-sm font-semibold text-accent-alt">— Psalm 119:105</p>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  Let Scripture guide your steps today. Tune in daily to Light FM for biblical devotionals, corporate prayer, and Christ-centered worship.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Biblical truth & testimonies */}
        {featuredArticles.length > 0 && (
          <section className="border-b border-border py-20 md:py-28">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
              <SectionHeader
                title="Biblical truth & testimonies"
                description="Scripture, revival stories, and testimonies of God's transforming grace."
                action={{ label: 'All articles', href: '/news' }}
              />
              <Carousel opts={{ align: 'start' }} className="w-full">
                <CarouselContent className="-ml-6">
                  {featuredArticles.map((article: any) => (
                    <CarouselItem key={article.id} className="pl-6 sm:basis-1/2 lg:basis-1/3">
                      <NewsCard
                        {...article}
                        featured={false}
                        date={new Date(article.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <div className="mt-8 flex justify-end gap-2">
                  <CarouselPrevious className="static translate-y-0" />
                  <CarouselNext className="static translate-y-0" />
                </div>
              </Carousel>
            </div>
          </section>
        )}

        {/* Mission, vision, method */}
        <section className="py-20 md:py-28">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <SectionHeader title="Why Light FM" />
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-7">
                <p className="font-display text-3xl leading-tight font-medium md:text-4xl text-foreground">
                  {MINISTRY.vision}
                </p>
                <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2">
                  <div>
                    <h3 className="font-display text-xl font-semibold tracking-[0.08em] text-primary uppercase">Our mission</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{MINISTRY.mission}</p>
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-semibold tracking-[0.08em] text-primary uppercase">Our method</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{MINISTRY.method}</p>
                  </div>
                </div>
              </div>
              <div className="relative aspect-square lg:aspect-[4/5] w-full overflow-hidden rounded-xl border border-border shadow-md lg:col-span-5">
                <Image
                  src="/images/banners/mission-worship.jpg"
                  alt="Christian fellowship and worship"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <p className="font-display text-xl font-semibold">Proclaiming the Everlasting Gospel</p>
                  <p className="mt-1.5 text-xs text-white/80">Connecting believers across communities through faith, truth, and prayer.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* On air today */}
        {songHistory.length > 0 && (
          <section className="border-t border-border py-20 md:py-28">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
              <SectionHeader title="Recently on air" description="What's been playing on the stream." />
              <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
                <div className="lg:col-span-7">
                  <RecentlyPlayed />
                </div>
                <div className="lg:col-span-4 lg:col-start-9">
                  <h3 className="font-display text-3xl font-semibold uppercase">Join the family</h3>
                  <p className="mt-3 leading-relaxed text-muted-foreground">
                    Be part of our growing community of believers edifying each other in truth.
                  </p>
                  <Button asChild variant="outline" className="mt-6">
                    <Link href="/get-involved#fellowship">Connect with us</Link>
                  </Button>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Gospel call */}
        <section className="relative overflow-hidden py-24 text-white md:py-32">
          <Image
            src="/images/banners/gospel-call-sunrise.jpg"
            alt="Sunrise and cross on a hill"
            fill
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/80 to-black/60 backdrop-blur-[1px]" />
          <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <span className="font-display text-xs font-semibold tracking-widest text-primary-foreground/90 uppercase">
              The Everlasting Gospel
            </span>
            <h2 className="mt-3 max-w-3xl font-display text-5xl leading-[0.95] font-bold uppercase md:text-7xl">
              Are you ready for Jesus?
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-200">
              Christ is coming again. Don&rsquo;t be left behind. Give your life to Jesus today and experience the peace, purpose, and eternal salvation only He can provide.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="h-12 px-8 text-base shadow-lg">
                <Link href="/contact">Accept Jesus now</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-12 border-white/30 bg-white/10 px-8 text-base text-white backdrop-blur-sm hover:bg-white/20 hover:text-white">
                <Link href="/shows">Listen to teachings</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
