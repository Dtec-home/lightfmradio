import { Skeleton } from '@/components/ui/skeleton';

export default function ContactLoading() {
  return (
    <main className="mx-auto max-w-6xl px-4 pb-24 pt-28 sm:px-6 lg:px-8">
      <Skeleton className="h-14 w-2/3" />
      <div className="mt-16 grid grid-cols-1 gap-14 lg:grid-cols-12">
        <Skeleton className="h-56 lg:col-span-4" />
        <Skeleton className="h-[34rem] lg:col-span-7 lg:col-start-6" />
      </div>
    </main>
  );
}
