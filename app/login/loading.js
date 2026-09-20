import Spinner from "@/app/_ui/Spinner";

export default function Loading() {
  return (
    <div className="flex flex-col gap-3 min-h-[calc(100vh-72px)] items-center justify-center">
      <Spinner size="size-8" />
      <p className="text-xl">Loading...</p>
    </div>
  );
}
