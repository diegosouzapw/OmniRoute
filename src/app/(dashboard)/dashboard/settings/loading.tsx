"use client";

import { Skeleton } from "@/shared/components/Loading";

export default function SettingsLoading() {
  return (
    <div className="space-y-6" role="status" aria-live="polite" aria-busy="true">
      <Skeleton className="h-8 w-36" />
      <div className="space-y-4">
        {[0, 1, 2, 3].map((index) => (
          <div key={index} className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-10 w-full" />
          </div>
        ))}
      </div>
    </div>
  );
}
