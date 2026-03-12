'use client';

import { Navbar } from '@/components/Navbar';
import { Player } from '@/components/Player';
import { Footer } from '@/components/Footer';
import { ShowCard } from '@/components/ShowCard';
import { PlayerProvider } from '@/context/PlayerContext';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

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

interface Show {
  id: string;
  title: string;
  host: string;
  description: string;
  image: string;
  schedule: string;
  category: string;
}

export default function ShowsPage() {
  const [shows, setShows] = useState<Show[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/shows')
      .then(res => res.json())
      .then(data => {
        setShows(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const categories = ['All', ...new Set(shows.map(show => show.category))];
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
                Christian Teachings & Programs
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl">
                Discover our complete lineup of Bible-centered teachings, devotions, and programs designed to draw you closer to Jesus and prepare your heart for His return.
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
                Teaching Schedule & Prayer Coverage
              </h2>
              <p className="text-muted-foreground mb-6">
                Our programs cover every day with biblical teaching and intercession. All times shown; contact us for details in your timezone.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { day: 'Monday - Friday', time: 'Devotions & Study 7am-2pm' },
                  { day: 'Midweek', time: 'Women\'s Ministry & Prayer 2pm-7pm' },
                  { day: 'Saturday', time: 'Youth Programs 10am, Teachings all day' },
                  { day: 'Sunday', time: 'Full Day Teaching & Worship' },
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
