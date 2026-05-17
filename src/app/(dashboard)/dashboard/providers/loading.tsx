"use client";

import { CardSkeleton, Skeleton } from "@/shared/components/Loading";

export default function ProvidersLoading() {
  return (
    <div className="space-y-6" role="status" aria-live="polite" aria-busy="true">
      <Skeleton className="h-8 w-48" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[0, 1, 2].map((index) => (
          <CardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
}
