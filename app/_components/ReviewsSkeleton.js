import Skeleton from "@/app/_ui/Skeleton";

export default function ReviewsSkeleton() {
  return (
    <div className="mt-10 flex justify-center gap-5">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="w-75 shrink-0 rounded-lg border p-6">
          <div className="flex gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-4 w-4" />
            ))}
          </div>

          <div className="mt-5 space-y-2">
            <Skeleton className="h-4 w-full" />
          </div>

          <Skeleton className="mt-5 h-4 w-28" />
        </div>
      ))}
    </div>
  );
}
