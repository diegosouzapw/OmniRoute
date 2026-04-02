export default function DashboardLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="space-y-2">
        <div className="h-8 w-56 rounded-xl bg-surface/80" />
        <div className="h-4 w-80 max-w-full rounded-lg bg-surface/60" />
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="rounded-2xl border border-border/60 bg-surface/50 p-5 shadow-sm"
          >
            <div className="mb-4 h-5 w-32 rounded-lg bg-surface/80" />
            <div className="space-y-3">
              <div className="h-4 w-full rounded-lg bg-surface/60" />
              <div className="h-4 w-5/6 rounded-lg bg-surface/60" />
              <div className="h-4 w-2/3 rounded-lg bg-surface/60" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
