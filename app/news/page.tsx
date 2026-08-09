'use client';

import { Navbar } from '@/components/Navbar';
import { Player } from '@/components/Player';
import { Footer } from '@/components/Footer';
import { NewsCard } from '@/components/NewsCard';
import { PlayerProvider } from '@/context/PlayerContext';
import { motion } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Toaster } from '@/components/ui/sonner';
import { toast } from 'sonner';
import { AlertCircle } from 'lucide-react';

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

interface Article {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  featured: boolean;
}

export default function NewsPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [email, setEmail] = useState('');

  const fetchArticles = useCallback(() => {
    setLoading(true);
    setError(false);
    fetch('/api/articles')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch articles');
        return res.json();
      })
      .then(data => {
        setArticles(data.map((a: any) => ({
          ...a,
          date: new Date(a.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
        })));
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  const handleSubscribe = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) return;
    toast.success("Thanks — you're on the list!", {
      description: 'Watch your inbox for Scripture reflections and updates.',
    });
    setEmail('');
  };

  const categories = ['All', ...new Set(articles.map(article => article.category))];
  const filteredArticles = selectedCategory === 'All'
    ? articles
    : articles.filter(article => article.category === selectedCategory);

  return (
    <>
      <Navbar />
      <Player />
      <Toaster />

      <main className="pt-24 pb-32">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-b from-muted via-background to-background border-b border-border">
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
            {loading && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <Skeleton key={i} className="h-64 rounded-xl" />
                ))}
              </div>
            )}

            {!loading && error && (
              <div className="flex flex-col items-center text-center py-16 gap-4">
                <AlertCircle className="w-10 h-10 text-destructive" />
                <p className="text-lg text-muted-foreground">
                  Something went wrong loading articles, please try again.
                </p>
                <Button variant="outline" onClick={fetchArticles}>
                  Retry
                </Button>
              </div>
            )}

            {!loading && !error && (
              <>
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
              </>
            )}
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-16 bg-muted">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Card className="gap-0 py-0">
                <CardContent className="p-8 md:p-12 text-center">
                  <h2 className="text-3xl font-serif font-bold text-foreground mb-4">
                    Stay Updated in Your Faith Journey
                  </h2>
                  <p className="text-lg text-muted-foreground mb-8">
                    Subscribe to receive daily Scripture reflections, teaching updates, testimonies, and prayer requests from Light FM Christian Ministry.
                  </p>
                  <form
                    onSubmit={handleSubscribe}
                    className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
                  >
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="flex-1 px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-accent"
                    />
                    <Button type="submit" size="lg" className="h-auto px-6 py-3 whitespace-nowrap">
                      Subscribe
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
