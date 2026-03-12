import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
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
      <main className="min-h-screen pt-32 pb-24 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/shows"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-accent mb-8 transition-colors"
          >
            <ArrowLeft size={20} />
            Back to Teachings
          </Link>

          <article className="bg-card border border-border rounded-2xl p-8 md:p-12 shadow-sm">
            <header className="mb-12 border-b border-border pb-8">
              <span className="text-sm font-semibold text-accent bg-accent/10 px-4 py-2 rounded-full mb-6 inline-block">
                {show.category}
              </span>
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6 leading-tight">
                {show.title}
              </h1>
              <div className="flex flex-wrap items-center gap-6 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <User size={18} />
                  <span>{show.host}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={18} />
                  <span>{show.schedule}</span>
                </div>
              </div>
            </header>

            <div className="prose prose-lg dark:prose-invert max-w-none">
              {/* Show descriptions can be plain text, rendering them cleanly here */}
              <p className="text-lg leading-relaxed text-foreground/90 whitespace-pre-wrap">
                {show.description}
              </p>
            </div>
          </article>
        </div>
      </main>
      <Footer />
    </>
  );
}
