'use client';

import { Navbar } from '@/components/Navbar';
import { Player } from '@/components/Player';
import { Footer } from '@/components/Footer';
import { NewsCard } from '@/components/NewsCard';
import { PageHeader } from '@/components/PageHeader';
import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Empty, EmptyDescription, EmptyHeader, EmptyTitle } from '@/components/ui/empty';
import { Field, FieldLabel } from '@/components/ui/field';
import { Toaster } from '@/components/ui/sonner';
import { toast } from 'sonner';
import { AlertCircle } from 'lucide-react';

interface Article {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  featured: boolean;
  image?: string;
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

  const handleSubscribe = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) return;

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        toast.success("Thanks — you're on the list!", {
          description: 'Watch your inbox for Scripture reflections and updates.',
        });
        setEmail('');
      } else {
        toast.error('Something went wrong', {
          description: 'Please check your email address and try again.',
        });
      }
    } catch (err) {
      toast.error('Something went wrong', {
        description: 'Please check your connection and try again.',
      });
    }
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

      <main className="pt-16 pb-24">
        <PageHeader
          title="Biblical truth & testimonies"
          intro="Scripture insights, testimonies of God's grace, and biblical teaching to deepen your faith and prepare your heart for eternity."
        />

        <div className="sticky top-16 z-30 border-b border-border bg-background">
          <div className="mx-auto max-w-6xl overflow-x-auto px-4 py-3 sm:px-6 lg:px-8">
            <ToggleGroup
              type="single"
              variant="outline"
              value={selectedCategory}
              onValueChange={(value) => value && setSelectedCategory(value)}
              aria-label="Filter by category"
            >
              {categories.map((category) => (
                <ToggleGroupItem key={category} value={category} className="px-4">
                  {category}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </div>
        </div>

        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          {loading && (
            <div className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-48" />
              ))}
            </div>
          )}

          {!loading && error && (
            <Alert variant="destructive" className="max-w-xl">
              <AlertCircle />
              <AlertTitle>We couldn&rsquo;t load the articles</AlertTitle>
              <AlertDescription>
                <p>Check your connection and try again.</p>
                <Button variant="outline" size="sm" className="mt-3" onClick={fetchArticles}>
                  Try again
                </Button>
              </AlertDescription>
            </Alert>
          )}

          {!loading && !error && filteredArticles.length > 0 && (
            <div className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
              {filteredArticles.map((article) => (
                <NewsCard key={article.id} {...article} />
              ))}
            </div>
          )}

          {!loading && !error && filteredArticles.length === 0 && (
            <Empty>
              <EmptyHeader>
                <EmptyTitle>No articles here yet</EmptyTitle>
                <EmptyDescription>Try another category, or check back soon.</EmptyDescription>
              </EmptyHeader>
            </Empty>
          )}
        </section>

        <section className="bg-foreground py-16 text-background md:py-24 dark:bg-card dark:text-foreground">
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:items-end lg:px-8">
            <div>
              <h2 className="font-display text-4xl leading-none font-bold uppercase md:text-5xl">
                Stay updated in your faith journey
              </h2>
              <p className="mt-4 max-w-lg text-lg leading-relaxed opacity-80">
                Daily Scripture reflections, teaching updates, testimonies, and prayer requests from Light FM.
              </p>
            </div>
            <form onSubmit={handleSubscribe} className="flex flex-col gap-3 sm:flex-row sm:items-end">
              <Field className="flex-1">
                <FieldLabel htmlFor="newsletter-email" className="sr-only">
                  Email address
                </FieldLabel>
                <Input
                  id="newsletter-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="h-12 bg-background text-foreground"
                />
              </Field>
              <Button type="submit" size="lg" className="h-12 px-7">
                Subscribe
              </Button>
            </form>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
