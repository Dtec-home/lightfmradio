'use client';

import { PlayerProvider } from '@/context/PlayerContext';

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <PlayerProvider>
      {children}
    </PlayerProvider>
  );
}
