'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center px-4 text-center">
      <h1 className="font-display text-5xl font-bold uppercase">Something went wrong</h1>
      <p className="mt-4 text-lg text-muted-foreground">Please try again or return to the home page.</p>
      <Button onClick={reset} size="lg" className="mt-8">Try again</Button>
    </main>
  );
}
