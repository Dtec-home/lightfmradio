import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Get Involved',
  description:
    'Get involved with Light FM Ministry — submit a prayer request, join our WhatsApp fellowship, support the mission, or volunteer alongside our team.',
};

export default function GetInvolvedLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
