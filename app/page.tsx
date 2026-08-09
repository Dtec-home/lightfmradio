'use client';

import { Navbar } from '@/components/Navbar';
import { Player } from '@/components/Player';
import { Footer } from '@/components/Footer';
import { LiveIndicator } from '@/components/LiveIndicator';
import { ShowCard } from '@/components/ShowCard';
import { NewsCard } from '@/components/NewsCard';
import { PlayerProvider } from '@/context/PlayerContext';
import { RecentlyPlayed } from '@/components/RecentlyPlayed';
import { ListenerStats } from '@/components/ListenerStats';
import { UpNext } from '@/components/UpNext';
import { LiveActivity } from '@/components/LiveActivity';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Radio, Headphones, Zap, Heart, BookOpen, Users } from 'lucide-react';
import { HeroIllustration } from '@/components/illustrations/HeroIllustration';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '@/components/ui/carousel';
import { usePlayer } from '@/context/PlayerContext';
import { MINISTRY } from '@/lib/content';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: 'easeOut' },
  },
};

export default function Home() {
  const [shows, setShows] = useState([]);
  const [featuredArticles, setFeaturedArticles] = useState([]);
  const { setIsPlaying } = usePlayer();

  useEffect(() => {
    fetch('/api/shows').then(res => res.json()).then(data => setShows(data.slice(0, 3)));
    fetch('/api/articles').then(res => res.json()).then(data => {
      const featured = data.filter((a: any) => a.featured);
      setFeaturedArticles((featured.length > 0 ? featured : data).slice(0, 8));
    });
  }, []);

  return (
    <>
      <Navbar />
      <Player />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-b from-muted via-background to-muted">
          {/* Background Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
              className="absolute top-[-10%] left-[10%] w-[50rem] h-[50rem] bg-accent/10 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen"
              animate={{
                x: [0, 150, -100, 0],
                y: [0, 80, 150, 0],
                scale: [1, 1.25, 0.8, 1]
              }}
              transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute bottom-[-10%] right-[10%] w-[45rem] h-[45rem] bg-accent-alt/10 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen"
              animate={{
                x: [0, -120, 80, 0],
                y: [0, -150, -80, 0],
                scale: [1, 0.85, 1.2, 1]
              }}
              transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {/* Left Content */}
              <motion.div variants={itemVariants} className="space-y-8">
                <div>
                  <motion.div
                    className="inline-block mb-4"
                    whileHover={{ scale: 1.05 }}
                  >
                    <LiveIndicator />
                  </motion.div>
                  <h1 className="text-5xl md:text-7xl font-serif font-bold text-foreground leading-tight mb-4">
                    Listen, Read & <span className="text-accent">Witness</span>
                  </h1>
                  <p className="text-2xl font-serif text-accent mb-6">
                    Christ's love illuminate your life
                  </p>
                  <p className="text-xl text-muted-foreground leading-relaxed">
                    A beacon of hope through media — shining the light of Christ across nations and preparing hearts for His soon return.
                  </p>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={{ duration: 0.15 }}>
                    <Button size="lg" className="w-full sm:w-auto h-auto px-8 py-4 gap-2" onClick={() => setIsPlaying(true)}>
                      <Radio size={20} />
                      Listen Live
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={{ duration: 0.15 }}>
                    <Button
                      asChild
                      variant="outline"
                      size="lg"
                      className="w-full sm:w-auto h-auto px-8 py-4 border-accent-alt text-accent-alt hover:bg-accent-alt/10 hover:text-accent-alt bg-transparent"
                    >
                      <Link href="/get-involved">Support the Mission</Link>
                    </Button>
                  </motion.div>
                </div>
              </motion.div>

              {/* Right Visual */}
              <motion.div
                variants={itemVariants}
                className="relative h-96 md:h-full hidden md:block"
              >
                <HeroIllustration />
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Featured Teachings Section */}
        <section className="py-24 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-serif font-bold text-foreground mb-4">
                Featured Teachings
              </h2>
              <p className="text-muted-foreground">
                Deepen your faith with biblical instruction and spiritual growth
              </p>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {shows.map((show: any) => (
                <motion.div key={show.id} variants={itemVariants}>
                  <ShowCard {...show} />
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              className="mt-12 text-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <Button asChild variant="outline" size="lg" className="h-auto px-6 py-3 border-accent text-accent hover:bg-accent/10 hover:text-accent bg-transparent group">
                <Link href="/shows">
                  View All Teachings
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Biblical Truth & Testimonies Section */}
        <section className="py-24 bg-muted">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-serif font-bold text-foreground mb-4">
                Biblical Truth & Testimonies
              </h2>
              <p className="text-muted-foreground">
                Scripture, revival stories, and testimonies of God's transforming grace
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Carousel opts={{ align: 'start' }} className="w-full">
                <CarouselContent className="-ml-6">
                  {featuredArticles.map((article: any) => (
                    <CarouselItem key={article.id} className="pl-6 sm:basis-1/2 lg:basis-1/3">
                      <NewsCard {...article} date={new Date(article.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <div className="flex justify-end gap-2 mt-6">
                  <CarouselPrevious className="static translate-y-0" />
                  <CarouselNext className="static translate-y-0" />
                </div>
              </Carousel>
            </motion.div>

            <motion.div
              className="mt-12 text-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <Button asChild variant="outline" size="lg" className="h-auto px-6 py-3 border-accent text-accent hover:bg-accent/10 hover:text-accent bg-transparent group">
                <Link href="/news">
                  Read All Articles
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Why Choose Light FM Section */}
        <section className="py-24 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="mb-16 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-serif font-bold text-foreground mb-4">
                Why Choose Light FM?
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                A ministry dedicated to Christ-centered teaching, prayer, and preparing hearts for eternity
              </p>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {[
                {
                  iconPath: "M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z", // Book Open
                  title: 'Our Mission',
                  description: MINISTRY.mission,
                },
                {
                  iconPath: "M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z", // Heart
                  title: 'Our Method',
                  description: MINISTRY.method,
                },
                {
                  iconPath: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2 M9 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8z M22 21v-2a4 4 0 0 0-3-3.87 M16 3.13a4 4 0 0 1 0 7.75", // Users
                  title: 'Our Vision',
                  description: MINISTRY.vision,
                },
              ].map((feature, i) => {
                return (
                  <motion.div key={i} variants={itemVariants}>
                    <Card className="p-8 gap-0 rounded-2xl bg-background/40 backdrop-blur-xl border-border/50 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group">
                      <CardContent className="p-0">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent to-accent-alt p-0.5 mb-6 shadow-md group-hover:scale-110 transition-transform duration-300">
                          <div className="w-full h-full bg-background rounded-[14px] flex items-center justify-center p-2">
                            <img src="/logo.png" alt="Light FM" className="w-full h-full object-contain opacity-80" />
                          </div>
                        </div>
                        <h3 className="text-xl font-serif font-bold text-foreground mb-3">
                          {feature.title}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {feature.description}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* Live Stats & Recently Played Section */}
        <section className="py-24 bg-muted">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-serif font-bold text-foreground mb-4">
                Live on Air
              </h2>
              <p className="text-muted-foreground">
                See what's playing now and who's listening
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="space-y-6"
              >
                <ListenerStats />
                <LiveActivity />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="space-y-6"
              >
                <UpNext />
                <Card className="bg-accent/5 rounded-2xl border-accent/20 h-full gap-0 py-0">
                  <CardContent className="flex flex-col items-center text-center justify-center h-full p-8">
                    <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center mb-4">
                      <Users className="w-6 h-6 text-accent" />
                    </div>
                    <h4 className="font-serif font-bold text-lg mb-2">Join the Family</h4>
                    <p className="text-sm text-muted-foreground mb-4">Be part of our growing community of believers edifying each other in truth.</p>
                    <Link href="/contact" className="text-xs font-bold uppercase tracking-widest text-accent hover:underline">Connect Now</Link>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                className="lg:row-span-1"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <RecentlyPlayed />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Gospel CTA Section */}
        <section className="py-24 bg-gradient-to-r from-accent/10 via-muted to-accent-alt/10">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-serif font-bold text-foreground mb-6">
                Are You Ready for Jesus?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Christ is coming again. Don't be left behind. Give your life to Jesus today and experience the peace, purpose, and eternal salvation only He can provide.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={{ duration: 0.15 }}>
                  <Button
                    asChild
                    size="lg"
                    className="w-full sm:w-auto h-auto px-8 py-4 bg-accent-alt text-accent-alt-foreground hover:bg-accent-alt/90"
                  >
                    <Link href="/contact">Accept Jesus Now</Link>
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={{ duration: 0.15 }}>
                  <Button size="lg" className="w-full sm:w-auto h-auto px-8 py-4">
                    Listen to Teachings
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
