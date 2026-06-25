/**
 * route.ts — GET /api/health (PR-009)
 *
 * Operator-facing liveness/readiness surface for load balancers and
 * Kubernetes probes. Returns a structured `HealthReport`:
 *
 *   {
 *     status: "healthy" | "degraded" | "unhealthy",
 *     version,
 *     uptime_seconds,
 *     started_at,         // ISO-8601, process start
 *     timestamp,          // ISO-8601, when this report was built
 *     checks: {
 *       liveness:   { status, latency_ms, details? },
 *       readiness:  { status, latency_ms, details? },
 *       database:   { ... },  // only with ?deep=1
 *       migrations: { ... },  // only with ?deep=1
 *       cache:      { ... },  // only with ?deep=1
 *       bifrost:    { ... },  // only with ?deep=1 (skipped when env unset)
 *     }
 *   }
 *
 * Query params:
 *   - `?deep=1`  → run every probe (liveness + readiness + deep checks)
 *   - default    → run only liveness + readiness (fast path for k8s probes)
 *
 * HTTP status:
 *   - 200 — healthy or degraded
 *   - 503 — unhealthy
 *
 * No auth required: probes hit this endpoint from anywhere, including
 * unauthenticated load balancers.
 *
 * Stability contract: the check name + status combination is the stable
 * identifier operators depend on for SLO burn-rate calculations. Do NOT
 * rename a probe without coordinated alert migration.
 */

import { NextResponse, type NextRequest } from "next/server";

import { buildReport, httpStatusFor } from "@/lib/health/buildReport";
import {
  DEFAULT_CHECK_TIMEOUT_MS,
  clearProbes,
  listProbes,
  registerProbe,
  runAllProbes,
  unregisterProbe,
} from "@/lib/health/checks";
import {
  DEEP_ONLY_PROBES,
  SHALLOW_PROBES,
  registerDefaultProbes,
  _resetProbeRegistrationForTesting,
} from "@/lib/health/probes";

/** Force dynamic so the handler is never cached at the framework layer. */
export const dynamic = "force-dynamic";
/** Never cache. */
export const revalidate = 0;
/** Node runtime — health probes may touch fs/db. */
export const runtime = "nodejs";

/** Process start timestamp captured at module load. */
const STARTED_AT_ISO = new Date().toISOString();

/**
 * Decide whether the caller asked for deep checks. K8s probes use the
 * shallow path by default; explicit `?deep=1` enables the heavier
 * database / migrations / cache / bifrost probes.
 */
function wantsDeep(request: NextRequest): boolean {
  const raw = request.nextUrl.searchParams.get("deep");
  if (raw === null) return false;
  return raw === "1" || raw === "true";
}

/**
 * Configure the registry for this request. Defaults are registered
 * exactly once; subsequent requests reuse them. Tests that swap probes
 * via `clearProbes()` will have their custom probes preserved.
 */
function configureForRequest(deep: boolean): void {
  if (listProbes().length === 0) {
    registerDefaultProbes();
  }
  if (deep) {
    // Make sure every default probe is present even if a test cleared
    // and re-registered only some of them.
    for (const [name, probe] of [...SHALLOW_PROBES, ...DEEP_ONLY_PROBES]) {
      registerProbe(name, probe);
    }
    return;
  }
  // Shallow path: drop the deep probes so they don't accidentally
  // contribute to the response. Re-register the shallow probes to
  // guard against partial-registration test states.
  for (const [name] of DEEP_ONLY_PROBES) {
    unregisterProbe(name);
  }
  for (const [name, probe] of SHALLOW_PROBES) {
    registerProbe(name, probe);
  }
}

/**
 * GET /api/health[?deep=1]
 */
export async function GET(request: NextRequest): Promise<NextResponse> {
  const deep = wantsDeep(request);
  configureForRequest(deep);

  let checks: Record<string, import("@/lib/health/types").HealthCheck>;
  try {
    checks = await runAllProbes(DEFAULT_CHECK_TIMEOUT_MS);
  } catch (err) {
    // `runAllProbes` is exception-safe — this branch only fires if the
    // runner itself blows up (e.g. invalid timeout). Surface as
    // "unhealthy" with a synthetic check entry.
    const message = err instanceof Error ? err.message : String(err);
    checks = {
      _router: {
        status: "unhealthy",
        latency_ms: 0,
        error: message,
      },
    };
  }

  const report = buildReport({
    checks,
    startedAt: STARTED_AT_ISO,
  });

  const status = httpStatusFor(report);
  return NextResponse.json(report, {
    status,
    headers: {
      "Cache-Control": "no-store, no-cache, must-revalidate",
      "X-Health-Status": report.status,
      "X-Health-Deep": deep ? "1" : "0",
    },
  });
}

/** Test seam — clear the registry so tests start from a known state. */
export function _resetHealthRouteForTesting(): void {
  clearProbes();
  _resetProbeRegistrationForTesting();
}
