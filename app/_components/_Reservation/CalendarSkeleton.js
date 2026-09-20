import Skeleton from "@/app/_ui/Skeleton";

export default function CalendarSkeleton() {
  return (
    <div className="w-full max-w-xl space-y-4">
      {/* Header / Caption Navigation */}
      <div className="flex items-center justify-between mb-4">
        {/* Month & Year Title */}
        <Skeleton className="h-6 w-36" />

        {/* Previous / Next Navigation Buttons */}
        <div className="flex items-center gap-1">
          <Skeleton className="h-9 w-9 rounded-lg" />
          <Skeleton className="h-9 w-9 rounded-lg" />
        </div>
      </div>

      {/* Weekdays Row */}
      <div className="grid grid-cols-7 gap-1 text-center mb-2">
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} className="flex justify-center py-2">
            <Skeleton className="h-4 w-8" />
          </div>
        ))}
      </div>

      {/* Days Grid (5 weeks x 7 days) */}
      <div className="space-y-1">
        {Array.from({ length: 5 }).map((_, rowIndex) => (
          <div key={rowIndex} className="grid grid-cols-7 gap-1">
            {Array.from({ length: 7 }).map((_, colIndex) => (
              <Skeleton key={colIndex} className="h-10 w-full rounded-xl" />
            ))}
          </div>
        ))}
      </div>

      {/* Legend Footer Skeleton */}
      <div className="mt-5 flex flex-wrap gap-4 pt-2">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-4 w-24" />
      </div>
    </div>
  );
}
