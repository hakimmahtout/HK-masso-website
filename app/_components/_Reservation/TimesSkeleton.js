import Skeleton from "@/app/_ui/Skeleton";

export default function TimesSkeleton() {
  return (
    <div className="w-full">
      {/* Header icon and text skeleton */}
      <div className="flex items-center gap-2">
        <Skeleton className="h-4 w-4 rounded-full" />
        <Skeleton className="h-4 w-48 rounded-md" />
      </div>

      {/* Time slots grid skeleton */}
      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <Skeleton key={index} className="h-11 w-full rounded-lg" />
        ))}
      </div>
    </div>
  );
}
