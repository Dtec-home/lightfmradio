import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ArrowLeft, Clock } from 'lucide-react';
import Link from 'next/link';

export default async function ArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const article = await prisma.article.findUnique({
    where: { id }
  });

  if (!article) {
    notFound();
  }

  const formattedDate = new Date(article.date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-32 pb-24 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/news"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-accent mb-8 transition-colors"
          >
            <ArrowLeft size={20} />
            Back to Testimonies
          </Link>

          <article className="bg-card border border-border rounded-2xl p-8 md:p-12 shadow-sm">
            <header className="mb-12 border-b border-border pb-8 text-center">
              <span className="text-sm font-semibold text-accent bg-accent/10 px-4 py-2 rounded-full mb-6 inline-block">
                {article.category}
              </span>
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6 leading-tight">
                {article.title}
              </h1>
              <div className="flex items-center justify-center gap-2 text-muted-foreground">
                <Clock size={18} />
                <span>{formattedDate}</span>
              </div>
            </header>

            <div className="text-xl font-medium text-foreground/80 mb-10 text-center italic border-l-4 border-accent pl-6 bg-accent/5 py-4 rounded-r-lg">
              {article.excerpt}
            </div>

            <div className="prose prose-lg dark:prose-invert max-w-none text-foreground/90 mx-auto whitespace-pre-wrap">
              {article.content || article.excerpt}
            </div>
          </article>
        </div>
      </main>
      <Footer />
    </>
  );
}
