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
    id: 'signs-of-times',
    title: 'Signs of the Times: Jesus is Coming Soon',
    excerpt: 'Biblical prophecy fulfilled and end-times events unfolding before our eyes. Discover what Scripture reveals about Christ\'s imminent return and the importance of spiritual readiness.',
    date: 'Mar 3, 2024',
    category: 'Scripture',
    featured: true,
  },
  {
    id: 'testimony-darkness-light',
    title: 'Testimony: From Darkness to Light - A Life Transformed',
    excerpt: 'Hear the powerful story of how one man encountered Jesus Christ and experienced complete spiritual transformation. His journey from despair to hope will inspire your faith.',
    date: 'Feb 28, 2024',
    category: 'Testimonies',
    featured: true,
  },
  {
    id: 'gospel-message',
    title: 'The Gospel Message: Jesus Saves - Understanding Salvation',
    excerpt: 'Explore the foundational truth of salvation through Christ\'s sacrifice. Learn why surrendering your life to Jesus is the most important decision you\'ll ever make.',
    date: 'Feb 25, 2024',
    category: 'Gospel',
  },
  {
    id: 'revival-prayer',
    title: 'Revival is Coming: The Power of Corporate Prayer',
    excerpt: 'God\'s desire for His people is spiritual awakening. Join us as we explore how united, believing prayer releases God\'s power for revival in our churches and nations.',
    date: 'Feb 20, 2024',
    category: 'Prayer',
  },
  {
    id: 'testimony-freedom',
    title: 'Freedom in Christ: Breaking Chains of Addiction',
    excerpt: 'A gripping testimony of deliverance from addiction through Christ\'s power. Discover how Jesus broke the chains and set a captive free through the Gospel.',
    date: 'Feb 15, 2024',
    category: 'Testimonies',
  },
  {
    id: 'biblical-truth-identity',
    title: 'Who Am I in Christ? Understanding Your Identity in Jesus',
    excerpt: 'Explore the biblical truth of your identity as a child of God. Learn how understanding your position in Christ brings confidence, purpose, and transformational change.',
    date: 'Feb 10, 2024',
    category: 'Scripture',
  },
  {
    id: 'community-outreach',
    title: 'Light FM Community: Serving Jesus in Our City',
    excerpt: 'See how our church family is reaching souls with the Gospel, caring for the poor, and sharing Christ\'s love throughout our community with compassion and truth.',
    date: 'Feb 5, 2024',
    category: 'Community',
  },
  {
    id: 'discernment-deception',
    title: 'Spiritual Discernment in a Deceived World',
    excerpt: 'False doctrines and spiritual deception abound. Discover biblical discernment tools to test all things against God\'s Word and remain rooted in Christ.',
    date: 'Jan 30, 2024',
    category: 'Scripture',
  },
  {
    id: 'answered-prayer-story',
    title: 'Testimonies of Prayer: How God Answers the Cries of His People',
    excerpt: 'Real stories of answered prayer that reveal God\'s faithfulness, power, and care. These testimonies will strengthen your faith and encourage persistent intercession.',
    date: 'Jan 25, 2024',
    category: 'Prayer',
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
                Biblical Truth & Testimonies
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl">
                Scripture insights, life-changing testimonies of God's grace, and biblical teaching to deepen your faith and prepare your heart for eternity.
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
                Stay Updated in Your Faith Journey
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Subscribe to receive daily Scripture reflections, teaching updates, testimonies, and prayer requests from Light FM Christian Ministry.
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
