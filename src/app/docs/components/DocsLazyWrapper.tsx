import { Suspense } from "react";

export function DocsLazyWrapper({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<DocsSkeleton />}>{children}</Suspense>;
}

function DocsSkeleton() {
  return (
    <div className="animate-pulse space-y-6" aria-label="Loading documentation" role="status">
      <div className="h-8 bg-bg-subtle rounded w-3/4" />
      <div className="h-4 bg-bg-subtle rounded w-1/4 mt-2" />
      <div className="space-y-3 mt-6">
        <div className="h-4 bg-bg-subtle rounded w-full" />
        <div className="h-4 bg-bg-subtle rounded w-5/6" />
        <div className="h-4 bg-bg-subtle rounded w-4/6" />
      </div>
      <div className="h-32 bg-bg-subtle rounded w-full mt-4" />
      <div className="space-y-3 mt-4">
        <div className="h-4 bg-bg-subtle rounded w-full" />
        <div className="h-4 bg-bg-subtle rounded w-3/4" />
      </div>
    </div>
  );
}
