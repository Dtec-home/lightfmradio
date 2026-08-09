import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Testimonies',
  description:
    'Read testimonies of changed lives and biblical teaching articles from the Light FM community, shared to encourage your walk with Christ.',
};

export default function NewsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
