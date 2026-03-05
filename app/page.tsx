'use client';

import { Navbar } from '@/components/Navbar';
import { Player } from '@/components/Player';
import { Footer } from '@/components/Footer';
import { LiveIndicator } from '@/components/LiveIndicator';
import { ShowCard } from '@/components/ShowCard';
import { NewsCard } from '@/components/NewsCard';
import { PlayerProvider } from '@/context/PlayerContext';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Radio, Headphones, Zap } from 'lucide-react';

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
  return (
    <PlayerProvider>
      <Navbar />
      <Player />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-b from-primary via-background to-primary">
          {/* Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-20 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 left-10 w-96 h-96 bg-accent-alt/5 rounded-full blur-3xl"></div>
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
                    <LiveIndicator isLive={true} currentShow="Morning Mix with Alex" />
                  </motion.div>
                  <h1 className="text-5xl md:text-7xl font-serif font-bold text-foreground leading-tight mb-4">
                    Light <span className="text-accent">FM</span>
                  </h1>
                  <p className="text-xl text-muted-foreground leading-relaxed">
                    Independent radio station bringing you quality music, engaging shows, and vibrant culture. Stream live or discover our collection.
                  </p>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <motion.button
                    className="px-8 py-4 bg-accent text-accent-foreground rounded-lg font-semibold hover:bg-accent/90 transition-colors flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Radio size={20} />
                    Listen Now
                  </motion.button>
                  <motion.button
                    className="px-8 py-4 border border-accent text-accent rounded-lg font-semibold hover:bg-accent/10 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Schedule
                  </motion.button>
                </div>
              </motion.div>

              {/* Right Visual */}
              <motion.div
                variants={itemVariants}
                className="relative h-96 md:h-full hidden md:block"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-accent-alt/20 rounded-2xl overflow-hidden">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent"
                    animate={{
                      backgroundPosition: ['0% 0%', '0% 100%'],
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      repeatType: 'reverse',
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      className="w-64 h-64 bg-gradient-to-br from-accent to-accent-alt rounded-full opacity-20 blur-3xl"
                      animate={{
                        scale: [1, 1.2, 1],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                      }}
                    />
                  </div>
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    animate={{
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                    }}
                  >
                    <Headphones size={120} className="text-accent/40" />
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Featured Shows Section */}
        <section className="py-24 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-serif font-bold text-foreground mb-4">
                Featured Shows
              </h2>
              <p className="text-muted-foreground">
                Discover our diverse lineup of engaging programs
              </p>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {[
                {
                  id: '1',
                  title: 'Morning Mix',
                  host: 'Alex Chen',
                  description: 'Start your day with curated indie, electronic, and pop hits.',
                  image: '/gradient-1.jpg',
                  schedule: 'Mon-Fri 7am',
                },
                {
                  id: '2',
                  title: 'Jazz Sessions',
                  host: 'Marcus Thompson',
                  description: 'Exploring timeless jazz classics and contemporary interpretations.',
                  image: '/gradient-2.jpg',
                  schedule: 'Sat 8pm',
                },
                {
                  id: '3',
                  title: 'Electronic Nights',
                  host: 'DJ Luna',
                  description: 'Deep electronic beats and cutting-edge experimental sounds.',
                  image: '/gradient-3.jpg',
                  schedule: 'Fri-Sat 10pm',
                },
              ].map((show) => (
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
              <Link
                href="/shows"
                className="inline-flex items-center gap-2 px-6 py-3 border border-accent text-accent rounded-lg font-semibold hover:bg-accent/10 transition-colors group"
              >
                View All Shows
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Latest News Section */}
        <section className="py-24 bg-primary">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-serif font-bold text-foreground mb-4">
                Latest News
              </h2>
              <p className="text-muted-foreground">
                Stay updated with Light FM news and announcements
              </p>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {[
                {
                  id: '1',
                  title: 'New Show Announcement: "Sound Explorers"',
                  excerpt: 'Join us for our latest music documentary series exploring the stories behind your favorite artists.',
                  date: 'Mar 3, 2024',
                  category: 'Shows',
                  featured: true,
                },
                {
                  id: '2',
                  title: 'Light FM Wins Best Independent Radio Award',
                  excerpt: 'Recognition for our commitment to quality programming and community engagement.',
                  date: 'Feb 28, 2024',
                  category: 'Awards',
                },
                {
                  id: '3',
                  title: 'Live Session: Indie Band "The Wavelengths"',
                  excerpt: 'Catch their exclusive acoustic performance on our platform this weekend.',
                  date: 'Feb 25, 2024',
                  category: 'Events',
                },
              ].map((article) => (
                <motion.div key={article.id} variants={itemVariants}>
                  <NewsCard {...article} />
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              className="mt-12 text-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <Link
                href="/news"
                className="inline-flex items-center gap-2 px-6 py-3 border border-accent text-accent rounded-lg font-semibold hover:bg-accent/10 transition-colors group"
              >
                Read All News
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="mb-16 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-serif font-bold text-foreground mb-4">
                Why Light FM?
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Experience radio like never before with our curated selection and community-driven content
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
                  icon: Radio,
                  title: '24/7 Streaming',
                  description: 'Listen anytime, anywhere to your favorite shows and music',
                },
                {
                  icon: Headphones,
                  title: 'Curated Content',
                  description: 'Expert selection of music and shows tailored for you',
                },
                {
                  icon: Zap,
                  title: 'Live Events',
                  description: 'Exclusive sessions and interviews with artists',
                },
              ].map((feature, i) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={i}
                    className="p-8 border border-border rounded-lg bg-primary hover:border-accent transition-colors"
                    variants={itemVariants}
                  >
                    <Icon className="w-12 h-12 text-accent mb-4" />
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-gradient-to-r from-accent/10 via-primary to-accent-alt/10">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-serif font-bold text-foreground mb-6">
                Ready to Listen?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Join thousands of listeners enjoying independent radio at its finest
              </p>
              <motion.button
                className="px-8 py-4 bg-accent text-accent-foreground rounded-lg font-semibold hover:bg-accent/90 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Start Listening
              </motion.button>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </PlayerProvider>
  );
}
