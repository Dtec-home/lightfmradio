import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center px-4 text-center">
      <p className="font-display text-sm font-semibold tracking-[0.12em] text-primary uppercase">404</p>
      <h1 className="mt-3 font-display text-5xl font-bold uppercase">Page not found</h1>
      <p className="mt-4 max-w-md text-lg leading-relaxed text-muted-foreground">
        The page you requested has moved or does not exist.
      </p>
      <Button asChild size="lg" className="mt-8">
        <Link href="/">Return home</Link>
      </Button>
    </main>
  );
}
