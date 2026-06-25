/**
 * POST /api/internal/tenant-quota
 *
 * Internal management endpoint that records a tenant's quota
 * consumption as a ratio gauge. Used by the daily quota refresh
 * job (PR-008 wires the cron call site) and the dashboard's "Reset
 * quota" button.
 *
 * Auth: same shared-secret pattern as `/api/internal/tenant-cost` —
 * `requireManagementAuth` for dashboard / API-key callers, plus the
 * `OMNIROUTE_INTERNAL_TOKEN` shared secret for server-to-server callers.
 */

import { NextResponse } from "next/server";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { setTenantQuota } from "@/lib/observability/tenantMetrics";
import { currentTraceId } from "@/lib/observability/otel";

const INTERNAL_TOKEN_HEADER = "x-omniroute-internal-token";

function isInternalTokenValid(request: Request): boolean {
  const expected = process.env.OMNIROUTE_INTERNAL_TOKEN;
  if (!expected) return false;
  const provided = request.headers.get(INTERNAL_TOKEN_HEADER);
  if (!provided) return false;
  if (provided.length !== expected.length) return false;
  let mismatch = 0;
  for (let i = 0; i < expected.length; i++) {
    mismatch |= expected.charCodeAt(i) ^ provided.charCodeAt(i);
  }
  return mismatch === 0;
}

export async function POST(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError && !isInternalTokenValid(request)) return authError;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }
  const b = body as Record<string, unknown>;

  const tenantId = b.tenantId;
  const resource = typeof b.resource === "string" ? b.resource : null;
  const limit = typeof b.limit === "number" ? b.limit : NaN;
  const used = typeof b.used === "number" ? b.used : NaN;

  if (resource === null) {
    return NextResponse.json({ error: "missing_resource" }, { status: 400 });
  }
  if (!Number.isFinite(limit) || !Number.isFinite(used)) {
    return NextResponse.json({ error: "missing_or_invalid_limit_or_used" }, { status: 400 });
  }

  setTenantQuota({ tenantId, resource, limit, used });

  return NextResponse.json({
    recorded: true,
    ratio: limit > 0 ? used / limit : 0,
    traceId: currentTraceId() ?? null,
  });
}