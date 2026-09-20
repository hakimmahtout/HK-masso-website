export default function WorkersSkeleton() {
  return (
    <div className="grid gap-3">
      {[1, 2, 3].map((index) => (
        <div
          key={index}
          className="grid grid-cols-[auto_1fr_auto] items-center gap-4 rounded-md border border-border p-4 animate-pulse"
        >
          <div className="size-12 rounded-full bg-muted" />
          <div className="space-y-2">
            <div className="h-4 w-32 rounded bg-muted" />
            <div className="h-3 w-20 rounded bg-muted" />
          </div>
          <div className="h-4 w-12 rounded bg-muted" />
        </div>
      ))}
    </div>
  );
}
