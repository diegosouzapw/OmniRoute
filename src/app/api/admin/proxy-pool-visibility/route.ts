import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { createErrorResponse } from "@/lib/api/errorResponse";
import { getProxyById, getScopePoolEgressRows, getScopeRotationStrategy } from "@/lib/db/proxies";
import { isScopeIdMissing } from "@/lib/db/proxies/mappers";
import { rankPoolCandidates } from "@/lib/db/proxies/rotation";
import { isProxySkipRecentlyFailedEnabled } from "@/shared/utils/featureFlags";
import {
  isProxyAvoided,
  proxyEgressKey,
  snapshotProxySetAside,
} from "@omniroute/open-sse/utils/proxyRefusalMemory.ts";

// Read-only pool visibility: per-member set-aside state (motive, start, expected
// end, repeat count) plus the current preference order computed by the same
// rankPoolCandidates the selector uses. Never probes, never writes: only the
// in-process refusal memory and the registry are read.
//
//   GET ?scope=global|provider|account|combo|key&scopeId=
//     -> { scope, strategy, rankedBy, processMemory, members: [...] }
//   GET ?proxyId=
//     -> same shape for a single registry entry (unknown id -> opaque member)
//
// Masking: member rows may carry redacted credentials (includeSecrets: false),
// egress keys are server-side only, clients only see scheme://host:port plus a
// masked user marker. Opaque entries (relays, unusable rows) report opaque:true.

type MemberRow = Record<string, unknown>;

function normalizeScopeAlias(scope: string): string {
  return scope === "key" ? "account" : scope;
}

function textField(value: unknown): string {
  return typeof value === "string" ? value : "";
}

function displayEndpoint(row: MemberRow): string | null {
  const host = textField(row.host).trim();
  if (!host) return null;
  const type = textField(row.type || "http").toLowerCase() || "http";
  const port = Number(row.port);
  const portSuffix = Number.isInteger(port) && port >= 1 && port <= 65535 ? `:${port}` : "";
  const bracketed = host.includes(":") && !host.startsWith("[") ? `[${host}]` : host;
  return `${type}://${bracketed}${portSuffix}`;
}

function toMemberView(row: MemberRow, rank: number) {
  const key = proxyEgressKey(row);
  const snapshot = snapshotProxySetAside(key);
  const display = displayEndpoint(row);
  const username = textField(row.username);
  return {
    id: typeof row.id === "string" ? row.id : null,
    name: typeof row.name === "string" ? row.name : null,
    display,
    userMasked: username ? "***" : null,
    opaque: display === null || key === null,
    rank,
    signal: key !== null && isProxyAvoided(key) ? "set-aside" : "position",
    setAside: snapshot
      ? {
          kind: snapshot.kind,
          since: new Date(snapshot.setAsideAt).toISOString(),
          endsAt: new Date(snapshot.endsAt).toISOString(),
          streak: snapshot.streak,
        }
      : null,
  };
}

function rankRows(rows: MemberRow[]): { ordered: MemberRow[]; rankedBy: "health" | "position" } {
  if (rows.length < 2 || !isProxySkipRecentlyFailedEnabled()) {
    return { ordered: rows, rankedBy: "position" };
  }
  return { ordered: rankPoolCandidates(rows), rankedBy: "health" };
}

export async function GET(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;
  try {
    const { searchParams } = new URL(request.url);
    const proxyId = searchParams.get("proxyId");
    if (proxyId?.trim()) {
      // Single-entry view for accounts bound to one proxy. Unknown ids answer
      // the same opaque shape (no enumeration oracle).
      const entry = await getProxyById(proxyId.trim(), { includeSecrets: false });
      const row = (entry ?? {}) as MemberRow;
      const { ordered, rankedBy } = rankRows(entry ? [row] : []);
      return NextResponse.json({
        scope: null,
        strategy: null,
        rankedBy,
        processMemory: true,
        members: ordered.length > 0 ? [toMemberView(ordered[0], 1)] : [toMemberView({}, 1)],
        total: 1,
      });
    }

    const rawScope = searchParams.get("scope");
    if (!rawScope) {
      return createErrorResponse({
        status: 400,
        message: "scope is required",
        type: "invalid_request",
      });
    }
    const scope = normalizeScopeAlias(rawScope);
    const scopeId = searchParams.get("scopeId");
    if (isScopeIdMissing(scope, scopeId)) {
      return createErrorResponse({
        status: 400,
        message: "scopeId is required for provider/account/combo/key scope",
        type: "invalid_request",
      });
    }
    const normalizedScopeId = scope === "global" ? null : scopeId;
    const [rows, strategy] = await Promise.all([
      getScopePoolEgressRows(scope, normalizedScopeId),
      getScopeRotationStrategy(scope, normalizedScopeId),
    ]);
    const { ordered, rankedBy } = rankRows(rows as MemberRow[]);
    return NextResponse.json({
      scope,
      strategy,
      rankedBy,
      processMemory: true,
      members: ordered.map((row, index) => {
        try {
          return toMemberView(row, index + 1);
        } catch {
          return toMemberView({}, index + 1);
        }
      }),
      total: ordered.length,
    });
  } catch {
    return createErrorResponse({
      status: 500,
      message: "Failed to load pool visibility",
      type: "server_error",
    });
  }
}
