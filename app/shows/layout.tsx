import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Teachings',
  description:
    'Browse the Light FM teachings library — devotionals, verse-by-verse Bible study, and Bible prophecy shows hosted by our ministry team, all in one place.',
};

export default function ShowsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
