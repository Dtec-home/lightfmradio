import type { Metadata } from 'next';
import { Navbar } from '@/components/Navbar';
import { Player } from '@/components/Player';
import { Footer } from '@/components/Footer';
import { PageHeader } from '@/components/PageHeader';
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

      <main className="pt-16 pb-24">
        <PageHeader
          title="About Light FM"
          intro="A media-based ministry dedicated to Christ-centered teaching, prayer, and preparing hearts for eternity."
        />

        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
          <dl className="flex flex-col">
            {[
              { title: 'Our vision', body: MINISTRY.vision },
              { title: 'Our mission', body: MINISTRY.mission },
              { title: 'Our method', body: MINISTRY.method },
            ].map((item) => (
              <div
                key={item.title}
                className="grid grid-cols-1 gap-3 border-t border-border py-10 first:border-foreground md:grid-cols-12 md:gap-8"
              >
                <dt className="font-display text-2xl font-semibold uppercase md:col-span-4">{item.title}</dt>
                <dd className="max-w-prose text-lg leading-relaxed text-foreground/85 md:col-span-8">{item.body}</dd>
              </div>
            ))}
          </dl>
        </section>
      </main>

      <Footer />
    </>
  );
}
