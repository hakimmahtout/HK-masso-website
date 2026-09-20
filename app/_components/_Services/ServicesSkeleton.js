import Skeleton from "@/app/_ui/Skeleton";

export default function ServicesSkeleton({ size = 3 }) {
  return (
    <div className="mt-10 grid gap-5 md:grid-cols-3">
      {Array.from({ length: size }).map((_, index) => (
        <div
          key={index}
          className="overflow-hidden rounded-lg border border-border bg-card"
        >
          {/* Image */}
          <Skeleton className="aspect-4/3 w-full rounded-none" />

          <div className="p-5">
            {/* Category + Rating */}
            <div className="flex items-center justify-between gap-3">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-4 w-20" />
            </div>

            {/* Service name */}
            <Skeleton className="mt-4 h-6 w-3/5" />

            {/* Description */}
            <div className="mt-3 space-y-2">
              <Skeleton className="h-3.5 w-full" />
              <Skeleton className="h-3.5 w-4/5" />
            </div>

            {/* Price + View details */}
            <div className="mt-5 flex items-end justify-between">
              <div>
                <Skeleton className="h-3 w-8" />
                <Skeleton className="mt-2 h-5 w-16" />
              </div>

              <Skeleton className="h-4 w-24" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
