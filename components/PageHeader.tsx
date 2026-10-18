import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PageHeaderProps {
  title: string;
  intro?: React.ReactNode;
  className?: string;
}

export function PageHeader({ title, intro, className }: PageHeaderProps) {
  return (
    <header className={cn('border-b border-border', className)}>
      <div className="mx-auto max-w-6xl px-4 pt-16 pb-12 sm:px-6 md:pt-24 md:pb-16 lg:px-8">
        <h1 className="max-w-4xl font-display text-5xl leading-[0.95] font-bold uppercase md:text-7xl">
          {title}
        </h1>
        {intro && (
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            {intro}
          </p>
        )}
      </div>
    </header>
  );
}

interface SectionHeaderProps {
  title: string;
  description?: string;
  action?: { label: string; href: string };
  className?: string;
}

export function SectionHeader({ title, description, action, className }: SectionHeaderProps) {
  return (
    <div
      className={cn(
        'mb-10 flex flex-col gap-4 border-b border-foreground pb-4 sm:flex-row sm:items-end sm:justify-between',
        className,
      )}
    >
      <div>
        <h2 className="font-display text-4xl leading-none font-bold uppercase md:text-5xl">{title}</h2>
        {description && <p className="mt-3 max-w-xl text-muted-foreground">{description}</p>}
      </div>
      {action && (
        <Link
          href={action.href}
          className="group inline-flex shrink-0 items-center gap-2 font-display text-sm font-semibold tracking-[0.08em] text-primary uppercase hover:underline"
        >
          {action.label}
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
        </Link>
      )}
    </div>
  );
}
