'use client';

import { Navbar } from '@/components/Navbar';
import { Player } from '@/components/Player';
import { Footer } from '@/components/Footer';
import { NewsCard } from '@/components/NewsCard';
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

const articles = [
  {
    id: 'new-show-announcement',
    title: 'New Show Announcement: "Sound Explorers" Documentary Series',
    excerpt: 'Join us for our latest music documentary series exploring the stories behind your favorite artists and genres. Every week we dive deep into the history, culture, and creative process.',
    date: 'Mar 3, 2024',
    category: 'Shows',
    featured: true,
  },
  {
    id: 'awards-recognition',
    title: 'Light FM Wins Best Independent Radio Award',
    excerpt: 'Recognition for our commitment to quality programming and community engagement. We\'re honored to receive this prestigious award.',
    date: 'Feb 28, 2024',
    category: 'Awards',
    featured: true,
  },
  {
    id: 'wavelengths-session',
    title: 'Live Session: Indie Band "The Wavelengths"',
    excerpt: 'Catch their exclusive acoustic performance on our platform this weekend. A must-listen for indie music fans.',
    date: 'Feb 25, 2024',
    category: 'Events',
  },
  {
    id: 'platform-update',
    title: 'New Features: Enhanced Streaming Experience',
    excerpt: 'We\'ve upgraded our platform with improved audio quality, better playlist recommendations, and offline listening capabilities.',
    date: 'Feb 20, 2024',
    category: 'Technology',
  },
  {
    id: 'jazz-festival',
    title: 'Light FM Presents: International Jazz Festival',
    excerpt: 'Celebrate jazz music with live performances from world-renowned musicians. Three days of incredible music and culture.',
    date: 'Feb 15, 2024',
    category: 'Events',
  },
  {
    id: 'artist-interview',
    title: 'Interview: Conversations with Electronic Pioneer Maya K',
    excerpt: 'Maya K shares her journey in electronic music, creative inspirations, and upcoming projects. A fascinating insight into her artistic process.',
    date: 'Feb 10, 2024',
    category: 'Interviews',
  },
  {
    id: 'community-spotlight',
    title: 'Community Spotlight: Supporting Local Musicians',
    excerpt: 'We\'re proud to showcase the incredible talent in our community. Meet three emerging artists breaking boundaries in their genres.',
    date: 'Feb 5, 2024',
    category: 'Community',
  },
  {
    id: 'milestone-celebration',
    title: '1 Million Listeners Milestone Celebration',
    excerpt: 'We\'ve reached an incredible milestone with one million listeners worldwide. Thank you for supporting independent radio.',
    date: 'Jan 30, 2024',
    category: 'Announcements',
  },
  {
    id: 'summer-series',
    title: 'Announcing: Summer Music Series 2024',
    excerpt: 'Get ready for an unforgettable summer with our new curated music series featuring sessions, performances, and exclusive interviews.',
    date: 'Jan 25, 2024',
    category: 'Shows',
  },
];

const categories = ['All', ...new Set(articles.map(article => article.category))];

export default function NewsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredArticles = selectedCategory === 'All'
    ? articles
    : articles.filter(article => article.category === selectedCategory);

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
                News & Updates
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl">
                Stay connected with the latest from Light FM. Discover news, announcements, and stories from our community.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Filter Section */}
        <section className="py-12 bg-background sticky top-16 z-30 border-b border-border">
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

        {/* News Grid */}
        <section className="py-16 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {filteredArticles.map((article) => (
                <motion.div key={article.id} variants={itemVariants}>
                  <NewsCard {...article} />
                </motion.div>
              ))}
            </motion.div>

            {filteredArticles.length === 0 && (
              <motion.div
                className="text-center py-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <p className="text-lg text-muted-foreground">
                  No articles found in this category.
                </p>
              </motion.div>
            )}
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-16 bg-primary">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="bg-card border border-border rounded-lg p-8 md:p-12 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-serif font-bold text-foreground mb-4">
                Subscribe to Our Newsletter
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Get the latest news, show announcements, and exclusive content delivered to your inbox.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 bg-primary border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-accent"
                />
                <motion.button
                  className="px-6 py-3 bg-accent text-accent-foreground rounded-lg font-semibold hover:bg-accent/90 transition-colors whitespace-nowrap"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Subscribe
                </motion.button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </PlayerProvider>
  );
}
