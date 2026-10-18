'use client';

import { Navbar } from '@/components/Navbar';
import { Player } from '@/components/Player';
import { Footer } from '@/components/Footer';
import { ShowCard } from '@/components/ShowCard';
import { PageHeader, SectionHeader } from '@/components/PageHeader';
import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Empty, EmptyDescription, EmptyHeader, EmptyTitle } from '@/components/ui/empty';
import { AlertCircle } from 'lucide-react';

interface Show {
  id: string;
  title: string;
  host: string;
  description: string;
  image: string;
  schedule: string;
  category: string;
}

const SCHEDULE = [
  { day: 'Monday – Friday', time: 'Devotions & study, 7am – 2pm' },
  { day: 'Midweek', time: "Women's ministry & prayer, 2pm – 7pm" },
  { day: 'Saturday', time: 'Youth programs 10am, teachings all day' },
  { day: 'Sunday', time: 'Full day of teaching & worship' },
];

export default function ShowsPage() {
  const [shows, setShows] = useState<Show[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchShows = useCallback(() => {
    setLoading(true);
    setError(false);
    fetch('/api/shows')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch shows');
        return res.json();
      })
      .then(data => {
        setShows(data);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    fetchShows();
  }, [fetchShows]);

  const categories = ['All', ...new Set(shows.map(show => show.category))];
  const filteredShows = selectedCategory === 'All'
    ? shows
    : shows.filter(show => show.category === selectedCategory);

  return (
    <>
      <Navbar />
      <Player />

      <main className="pt-16 pb-24">
        <PageHeader
          title="Teachings & programs"
          intro="Bible-centered teachings, devotions, and programs to draw you closer to Jesus and prepare your heart for His return."
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
                <Skeleton key={i} className="h-56" />
              ))}
            </div>
          )}

          {!loading && error && (
            <Alert variant="destructive" className="max-w-xl">
              <AlertCircle />
              <AlertTitle>We couldn&rsquo;t load the teachings</AlertTitle>
              <AlertDescription>
                <p>Check your connection and try again.</p>
                <Button variant="outline" size="sm" className="mt-3" onClick={fetchShows}>
                  Try again
                </Button>
              </AlertDescription>
            </Alert>
          )}

          {!loading && !error && filteredShows.length > 0 && (
            <div className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
              {filteredShows.map((show) => (
                <ShowCard key={show.id} {...show} />
              ))}
            </div>
          )}

          {!loading && !error && filteredShows.length === 0 && (
            <Empty>
              <EmptyHeader>
                <EmptyTitle>No teachings here yet</EmptyTitle>
                <EmptyDescription>Try another category, or check back soon.</EmptyDescription>
              </EmptyHeader>
            </Empty>
          )}
        </section>

        <section className="border-t border-border py-16 md:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <SectionHeader
              title="Weekly schedule"
              description="Our programs cover every day with biblical teaching and intercession. Contact us for times in your timezone."
            />
            <dl className="grid grid-cols-1 md:grid-cols-2 md:gap-x-12">
              {SCHEDULE.map((slot) => (
                <div key={slot.day} className="flex flex-col gap-1 border-b border-border py-4 sm:flex-row sm:items-baseline sm:justify-between">
                  <dt className="font-display text-xl font-semibold uppercase">{slot.day}</dt>
                  <dd className="text-muted-foreground">{slot.time}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
