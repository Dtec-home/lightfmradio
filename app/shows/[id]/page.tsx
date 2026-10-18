import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Player } from '@/components/Player';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Calendar, User } from 'lucide-react';
import Link from 'next/link';

export default async function ShowPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const show = await prisma.show.findUnique({
    where: { id }
  });

  if (!show) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <Player />
      <main className="min-h-screen pt-16 pb-24">
        <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
          <Link
            href="/shows"
            className="inline-flex items-center gap-2 font-display text-sm font-semibold tracking-[0.08em] text-muted-foreground uppercase transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4" aria-hidden />
            Back to teachings
          </Link>

          <header className="mt-10 border-b border-border pb-8">
            <Badge variant="secondary">{show.category}</Badge>
            <h1 className="mt-5 font-display text-5xl leading-[0.95] font-bold md:text-6xl">{show.title}</h1>
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-muted-foreground">
              <span className="flex items-center gap-2">
                <User className="size-4" aria-hidden />
                {show.host}
              </span>
              <span className="flex items-center gap-2">
                <Calendar className="size-4" aria-hidden />
                {show.schedule}
              </span>
            </div>
          </header>

          <p className="mt-10 max-w-prose text-lg leading-relaxed whitespace-pre-wrap text-foreground/90">
            {show.description}
          </p>
        </article>
      </main>
      <Footer />
    </>
  );
}
