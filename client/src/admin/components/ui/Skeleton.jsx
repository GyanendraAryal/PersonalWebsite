export function Skeleton({ className = '' }) {
  return (
    <div
      className={['animate-pulse rounded-2xl bg-zinc-800/80', className].join(' ')}
      aria-hidden
    />
  )
}

export function ImageCardSkeleton() {
  return (
    <div className="admin-glass rounded-3xl overflow-hidden">
      <Skeleton className="h-44 w-full rounded-none" />
      <div className="p-4 space-y-3">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-5 w-16 rounded-lg" />
        <div className="flex gap-2">
          <Skeleton className="h-8 flex-1" />
          <Skeleton className="h-8 flex-1" />
        </div>
      </div>
    </div>
  )
}

export function StatCardSkeleton() {
  return (
    <div className="admin-glass rounded-3xl p-6 space-y-4">
      <Skeleton className="h-10 w-10 rounded-2xl" />
      <Skeleton className="h-8 w-20" />
      <Skeleton className="h-4 w-28" />
    </div>
  )
}
