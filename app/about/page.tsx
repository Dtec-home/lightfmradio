import type { Metadata } from 'next';
import { Navbar } from '@/components/Navbar';
import { Player } from '@/components/Player';
import { Footer } from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { MINISTRY } from '@/lib/content';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Learn about Light FM Radio\'s vision and mission as a Christian media ministry proclaiming the everlasting gospel across East Africa.',
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <Player />

      <main className="pt-24 pb-32 bg-background">
        <section className="py-16 bg-gradient-to-b from-muted via-background to-background border-b border-border">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">About Light FM</h1>
            <p className="text-muted-foreground text-lg max-w-2xl">
              A media-based ministry dedicated to Christ-centered teaching, prayer, and preparing hearts for eternity.
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <Card className="p-8 gap-0 rounded-2xl">
              <CardContent className="p-0">
                <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Our Vision</h2>
                <p className="text-muted-foreground leading-relaxed">{MINISTRY.vision}</p>
              </CardContent>
            </Card>

            <Card className="p-8 gap-0 rounded-2xl">
              <CardContent className="p-0">
                <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Our Mission</h2>
                <p className="text-muted-foreground leading-relaxed">{MINISTRY.mission}</p>
              </CardContent>
            </Card>

            <Card className="p-8 gap-0 rounded-2xl">
              <CardContent className="p-0">
                <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Our Method</h2>
                <p className="text-muted-foreground leading-relaxed">{MINISTRY.method}</p>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
