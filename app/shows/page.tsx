'use client';

import { Navbar } from '@/components/Navbar';
import { Player } from '@/components/Player';
import { Footer } from '@/components/Footer';
import { ShowCard } from '@/components/ShowCard';
import { PlayerProvider } from '@/context/PlayerContext';
import { motion } from 'framer-motion';
import { useState } from 'react';

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
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

const shows = [
  {
    id: '1',
    title: 'Morning Mix with Alex',
    host: 'Alex Chen',
    description: 'Start your day with curated indie, electronic, and pop hits.',
    image: '/gradient-1.jpg',
    schedule: 'Mon-Fri 7am',
    category: 'Music',
  },
  {
    id: '2',
    title: 'Jazz Sessions',
    host: 'Marcus Thompson',
    description: 'Exploring timeless jazz classics and contemporary interpretations.',
    image: '/gradient-2.jpg',
    schedule: 'Sat 8pm',
    category: 'Jazz',
  },
  {
    id: '3',
    title: 'Electronic Nights',
    host: 'DJ Luna',
    description: 'Deep electronic beats and cutting-edge experimental sounds.',
    image: '/gradient-3.jpg',
    schedule: 'Fri-Sat 10pm',
    category: 'Electronic',
  },
  {
    id: '4',
    title: 'Late Night Talk',
    host: 'Jamie Rodriguez',
    description: 'Conversations with artists, creators, and cultural icons.',
    image: '/gradient-4.jpg',
    schedule: 'Wed-Thu 11pm',
    category: 'Talk',
  },
  {
    id: '5',
    title: 'Indie Underground',
    host: 'Sam Williams',
    description: 'Discovering underground indie bands and emerging artists.',
    image: '/gradient-5.jpg',
    schedule: 'Tue 9pm',
    category: 'Indie',
  },
  {
    id: '6',
    title: 'Soul & Funk Express',
    host: 'DJ Melo',
    description: 'Groovy soul, funk, and R&B from classic to contemporary.',
    image: '/gradient-6.jpg',
    schedule: 'Sun 7pm',
    category: 'Soul',
  },
];

const categories = ['All', ...new Set(shows.map(show => show.category))];

export default function ShowsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredShows = selectedCategory === 'All'
    ? shows
    : shows.filter(show => show.category === selectedCategory);

  return (
    <PlayerProvider>
      <Navbar />
      <Player />

      <main className="pt-24 pb-32">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-b from-primary via-background to-background border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-6xl font-serif font-bold text-foreground mb-4">
                All Shows
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl">
                Explore our complete lineup of engaging programs, from morning shows to late-night sessions.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Filter Section */}
        <section className="py-12 bg-background sticky top-16 z-30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <motion.button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full font-medium transition-all ${
                    selectedCategory === category
                      ? 'bg-accent text-accent-foreground'
                      : 'border border-border text-foreground hover:border-accent'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {category}
                </motion.button>
              ))}
            </div>
          </div>
        </section>

        {/* Shows Grid */}
        <section className="py-16 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {filteredShows.map((show) => (
                <motion.div key={show.id} variants={itemVariants}>
                  <ShowCard {...show} />
                </motion.div>
              ))}
            </motion.div>

            {filteredShows.length === 0 && (
              <motion.div
                className="text-center py-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <p className="text-lg text-muted-foreground">
                  No shows found in this category.
                </p>
              </motion.div>
            )}
          </div>
        </section>

        {/* Schedule Info Section */}
        <section className="py-16 bg-primary">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="bg-card border border-border rounded-lg p-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-serif font-bold text-foreground mb-4">
                Broadcasting Schedule
              </h2>
              <p className="text-muted-foreground mb-6">
                All times are in UTC. Check your local timezone for exact broadcast times.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { day: 'Monday - Friday', time: '7:00 AM - 6:00 PM' },
                  { day: 'Saturday', time: '8:00 AM - 11:59 PM' },
                  { day: 'Sunday', time: '7:00 AM - 10:00 PM' },
                  { day: 'Nightly', time: '10:00 PM - 2:00 AM' },
                ].map((slot, i) => (
                  <div key={i} className="flex justify-between items-center py-2 border-b border-border last:border-b-0">
                    <span className="text-foreground font-medium">{slot.day}</span>
                    <span className="text-accent">{slot.time}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </PlayerProvider>
  );
}
