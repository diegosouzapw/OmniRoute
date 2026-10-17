import { NextResponse } from "next/server";

import { foldModelHealth } from "@/domain/modelAvailability";
import { getModelCatalogAuthRejection } from "../catalogRequest";
import { CORS_HEADERS, handleCorsOptions } from "@/shared/utils/cors";
import { buildErrorBody } from "@omniroute/open-sse/utils/error";
import {
  applyHealthKeyScope,
  collectHealthRows,
  loadHealthContext,
  type HealthActiveConnection,
} from "./healthUniverse";

export async function OPTIONS() {
  return handleCorsOptions();
}

export async function HEAD() {
  return new Response(null, { status: 200, headers: { "content-type": "application/json" } });
}

/**
 * GET /v1/models/health — read-only per-model pause state for the caller's key.
 *
 * Additive: leaves `/v1/models` and its cache untouched (no catalog-cache or
 * lockout writes anywhere below). `ok` means "no pause observed by this
 * instance"; connection-level pauses live outside the lockout store read here.
 */
export async function GET(request: Request) {
  let settings: Record<string, unknown> = {};
  try {
    const { getSettings } = await import("@/lib/db/settings");
    settings = (await getSettings()) as Record<string, unknown>;
  } catch {
    settings = {};
  }
  const authRejection = await getModelCatalogAuthRejection(request, settings, {
    ...CORS_HEADERS,
  });
  if (authRejection) return authRejection;

  try {
    const { extractApiKey } = await import("@/sse/services/auth");
    const { isNoAuthProviderKey } = await import("@/shared/utils/noAuthProviders");

    const apiKey = extractApiKey(request);
    const ctx = await loadHealthContext(settings);
    const universe = collectHealthRows(ctx);
    const scoped = await applyHealthKeyScope(universe, apiKey);

    const now = Date.now();
    const requestIds = readRequestedIds(request.url);
    const data = scoped.rows.map((row) => {
      const eligible: HealthActiveConnection[] = ctx.connsFor(row.provider);
      const withNoAuth: HealthActiveConnection[] = [...eligible];
      if (isNoAuthProviderKey(row.provider) && !withNoAuth.some((c) => c.id === "noauth")) {
        withNoAuth.push({ id: "noauth", provider: row.provider });
      }
      const folded = foldModelHealth({
        model: { provider: row.provider, rawModel: row.rawModel },
        connections: withNoAuth.map((c) => ({
          id: c.id,
          providerSpecificData: c.providerSpecificData,
        })),
        now,
      });
      return {
        id: row.id,
        state: folded.state,
        ...(folded.state === "cooling" && folded.retryAfterMs !== null
          ? { retry_after: folded.retryAfterMs }
          : {}),
        observed_at: folded.observedAt,
      };
    });
    appendUnknownIds(data, requestIds, scoped.rows, now);

    return NextResponse.json({ object: "list", data }, { headers: { ...CORS_HEADERS } });
  } catch (error: unknown) {
    return NextResponse.json(
      buildErrorBody(500, error instanceof Error ? error.message : String(error)),
      { status: 500, headers: { ...CORS_HEADERS } }
    );
  }
}

function readRequestedIds(url: string): string[] {
  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return [];
  }
  return parsed.searchParams.getAll("ids").flatMap((value) =>
    value
      .split(",")
      .map((entry) => entry.trim())
      .filter((entry) => entry.length > 0)
  );
}

function appendUnknownIds(
  data: Array<Record<string, unknown>>,
  requestIds: string[],
  rows: Array<{ id: string }>,
  now: number
): void {
  if (requestIds.length === 0) return;
  const known = new Set(rows.map((row) => row.id));
  for (const item of data) known.add(String(item.id));
  const observedAt = new Date(now).toISOString();
  for (const id of requestIds) {
    if (known.has(id)) continue;
    known.add(id);
    data.push({ id, state: "unknown", observed_at: observedAt });
  }
}
