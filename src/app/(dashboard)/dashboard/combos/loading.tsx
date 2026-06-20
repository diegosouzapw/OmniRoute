import { CardSkeleton } from "@/shared/components";

export default function Loading() {
  return (
    <div className="space-y-4 p-6">
      <div className="flex items-center justify-between">
        <div className="h-8 w-48 animate-pulse rounded bg-surface" />
        <div className="h-8 w-32 animate-pulse rounded bg-surface" />
      </div>
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
    </div>
  );
}