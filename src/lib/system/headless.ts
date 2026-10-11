/**
 * Headless mode (R0.1, rail 3.8.53) — single source of truth.
 *
 * `OMNIROUTE_HEADLESS=1` (or `omniroute serve --headless`) boots only the proxy
 * engine: `/v1/*`, `/api/monitoring/health` and the auth surface keep working,
 * the optional boot subsystems (`src/instrumentation-node.ts`) are skipped and
 * the dashboard pages answer 404 from the route gate in `src/proxy.ts`.
 *
 * Nothing is removed: every gated init still exists and runs again as soon as
 * the variable is unset. Kept dependency-free (no Node built-ins, no DB) so the
 * Next.js proxy runtime can import it without pulling server-only modules.
 *
 * @see docs/guides/HEADLESS.md
 */

import { parseEnvBoolean } from "@/shared/utils/envBoolean";

export const HEADLESS_DASHBOARD_DISABLED_ERROR = "dashboard disabled (headless)";

type EnvLike = Readonly<Record<string, string | undefined>>;

/** True when headless mode is on. Truthy: 1/true/yes/on; anything else (or unset) is off. */
export function isHeadless(env: EnvLike = process.env): boolean {
  return parseEnvBoolean(env.OMNIROUTE_HEADLESS, false);
}

/** Dashboard pages that headless mode disables: `/dashboard`, `/home` and their sub-paths. */
export function isHeadlessDisabledPath(pathname: string): boolean {
  return (
    pathname === "/dashboard" ||
    pathname.startsWith("/dashboard/") ||
    pathname === "/home" ||
    pathname.startsWith("/home/")
  );
}

/**
 * Route gate used by `src/proxy.ts`: a 404 JSON response for a dashboard path
 * while headless, `null` otherwise (the request continues to the authz pipeline).
 */
export function headlessGateResponse(
  pathname: string,
  env: EnvLike = process.env
): Response | null {
  if (!isHeadless(env) || !isHeadlessDisabledPath(pathname)) return null;
  return Response.json({ error: HEADLESS_DASHBOARD_DISABLED_ERROR }, { status: 404 });
}

/**
 * Boot gate for a serial optional init: returns `true` (and logs the skip) when
 * headless, so the caller can `if (skipInHeadless("name")) …` around the init.
 */
export function skipInHeadless(
  subsystem: string,
  env: EnvLike = process.env,
  log: (line: string) => void = console.log
): boolean {
  if (!isHeadless(env)) return false;
  log(`[STARTUP] Headless mode: skipping ${subsystem}`);
  return true;
}
