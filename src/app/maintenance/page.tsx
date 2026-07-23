import Link from "next/link";

export default function MaintenancePage() {
  return (
    <main className="min-h-screen text-text-main flex items-center justify-center p-6">
      <section className="w-full max-w-xl rounded-2xl border border-border bg-surface p-8 shadow-soft text-center">
        <span className="material-symbols-outlined text-5xl text-primary mb-3" aria-hidden="true">
          construction
        </span>
        <h1 className="text-2xl font-semibold">Scheduled Maintenance</h1>
        <p className="mt-3 text-text-muted leading-relaxed">
          Some services are temporarily unavailable while maintenance is in progress. Core routing
          usually remains online, but management features may be degraded.
        </p>

        <ul className="mt-6 text-sm text-text-muted text-left rounded-xl border border-border bg-bg-alt p-4 space-y-2">
          <li className="flex items-start gap-2">
            <span
              className="material-symbols-outlined text-base text-primary mt-0.5"
              aria-hidden="true"
            >
              info
            </span>
            Retry after a few minutes.
          </li>
          <li className="flex items-start gap-2">
            <span
              className="material-symbols-outlined text-base text-primary mt-0.5"
              aria-hidden="true"
            >
              info
            </span>
            Check current health indicators and provider status before retrying.
          </li>
        </ul>

        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <Link
            href="/status"
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg text-white text-sm font-semibold bg-gradient-to-br from-primary to-primary-hover hover:shadow-elevated transition-all duration-200 motion-reduce:transition-none"
          >
            View System Status
          </Link>
          <Link
            href="/dashboard/health"
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg text-sm font-semibold border border-border hover:bg-bg-alt transition-colors duration-200 motion-reduce:transition-none"
          >
            Open Health Dashboard
          </Link>
        </div>
      </section>
    </main>
  );
}
