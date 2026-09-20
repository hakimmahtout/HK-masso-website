import Skeleton from "@/app/_ui/Skeleton";

export default function FilterSkeleton() {
  return (
    <div className="mt-6 flex items-center justify-between">
      <Skeleton className="h-4 w-24" />

      <Skeleton className="h-9 w-36 rounded-md" />
    </div>
  );
}
