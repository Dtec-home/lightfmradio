import { Skeleton } from '@/components/ui/skeleton';

export default function NewsLoading() {
  return (
    <main className="mx-auto max-w-6xl px-4 pb-24 pt-28 sm:px-6 lg:px-8">
      <Skeleton className="h-14 w-2/3" />
      <Skeleton className="mt-4 h-6 w-full max-w-xl" />
      <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => <Skeleton key={index} className="h-48" />)}
      </div>
    </main>
  );
}
