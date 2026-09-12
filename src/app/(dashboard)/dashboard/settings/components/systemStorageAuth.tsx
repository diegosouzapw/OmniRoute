"use client";

// #12709: database-settings requests are ALWAYS_PROTECTED (routeGuard.ts) — a guest/anonymous
// session correctly gets a 401 AUTH_001 from /api/settings/database and /api/settings/import-json
// (GHSA-mghq-58h3-qcqj, GHSA-v7g9-7f55-5g46). Do NOT loosen that gate; this module only makes the
// client surface the failure instead of silently rendering a blank section.
import Link from "next/link";

export interface DatabaseSettingsFetchResult {
  data: unknown;
  authRequired: boolean;
}

/**
 * True when a response represents the intentional auth-required rejection
 * (401, optionally carrying the AUTH_001 error code) rather than some other
 * transient failure.
 */
export function isAuthRequiredResponse(status: number, data: unknown): boolean {
  if (status !== 401) return false;
  const code = (data as { error?: { code?: string } } | null)?.error?.code;
  return code === undefined || code === "AUTH_001";
}

export async function fetchDatabaseSettingsData(): Promise<DatabaseSettingsFetchResult> {
  try {
    const res = await fetch("/api/settings/database");
    const body = await res.json().catch(() => null);
    if (res.ok) return { data: body, authRequired: false };
    return { data: null, authRequired: isAuthRequiredResponse(res.status, body) };
  } catch (err) {
    console.error("Failed to load database settings:", err);
    return { data: null, authRequired: false };
  }
}

export function AuthRequiredBanner({ t }: { t: (key: string) => string }) {
  return (
    <div
      role="alert"
      className="mb-4 rounded-xl border border-amber-200 dark:border-amber-500/30 bg-amber-50 dark:bg-amber-500/10 px-5 py-4"
    >
      <h2 className="text-sm font-semibold text-amber-900 dark:text-amber-100">
        {t("databaseSettingsAuthRequiredTitle")}
      </h2>
      <p className="mt-1 text-sm text-amber-900/80 dark:text-amber-200/80">
        {t("databaseSettingsAuthRequiredBody")}
      </p>
      <Link
        href="/login"
        className="mt-3 inline-flex items-center rounded-lg bg-amber-600 px-3.5 py-2 text-sm font-medium text-white hover:bg-amber-700 dark:bg-amber-500 dark:hover:bg-amber-400"
      >
        {t("databaseSettingsAuthRequiredCta")}
      </Link>
    </div>
  );
}
