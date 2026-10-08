/**
 * The single server-to-server hop from an MCP tool to OmniRoute's own HTTP API.
 *
 * #15159 M-06 — this used to exist as three copies:
 *
 *   server.ts:199               omniRouteFetch   env read: lazy
 *   tools/advancedTools.ts:37   apiFetch         env read: module load
 *   tools/pickFastestModel.ts:17 apiFetch        env read: module load
 *
 * Three consequences, all fixed by having one:
 *
 *  1. The two tool-side copies snapshotted `OMNIROUTE_API_KEY` and the base URL at MODULE
 *     LOAD, so a key configured after import — the normal shape for a test, and for any
 *     process that sets its environment late — was silently dropped and the hop went out
 *     unauthenticated instead of failing loudly. Every read here is per-call.
 *
 *  2. The two catalogs reached the hop through `import("./server.ts")`, because the hop
 *     lived in the same file that registers the tools. That dynamic import closed the
 *     `server.ts -> catalog.ts` and `server.ts -> radarCatalog.ts` edges in the dependency
 *     graph (cycles 194 and 195). The hop is now a leaf both can import directly.
 *
 *  3. The copies hardcoded `AbortSignal.timeout(30000)` while server.ts used
 *     `mcpFetchTimeoutSignal("management")`, so the documented OMNIROUTE_MCP_FETCH_TIMEOUT_MS
 *     override silently did not apply to the advanced-tools and pick-fastest tool paths.
 *     Note this narrows that path's default from 30s to MCP_FETCH_TIMEOUT_MS (10s) —
 *     override the env knob if a tool legitimately needs longer.
 *
 * This module is also where M-01's prescribed split puts the hop, so that refactor can
 * move the `handle*` bodies into `tools/canonical/*.ts` without re-introducing a cycle.
 */
import { getMcpHttpAuthHeadersForInternalFetch } from "./httpAuthContext.ts";
import { getInternalServiceAuthHeaders } from "../../src/lib/api/internalServiceAuth.ts";
import { resolveOmniRouteBaseUrl } from "../../src/shared/utils/resolveOmniRouteBaseUrl.ts";
import { mcpFetchTimeoutSignal } from "./fetchTimeout.ts";

/**
 * Read per-call, never at module load: a snapshot taken at import time silently drops a
 * key that is set afterwards.
 */
function getOmniRouteApiKey(): string {
  return process.env.OMNIROUTE_API_KEY || "";
}

export async function omniRouteFetch(path: string, options: RequestInit = {}): Promise<unknown> {
  const url = `${resolveOmniRouteBaseUrl()}${path}`;
  const apiKey = getOmniRouteApiKey();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    // Static env key is only a fallback; the per-caller MCP identity forwarded via
    // withMcpHttpAuthContext must win over it (#5819).
    ...(apiKey ? { Authorization: `Bearer ${apiKey}` } : {}),
    ...getMcpHttpAuthHeadersForInternalFetch(),
    ...((options.headers as Record<string, string>) || {}),
    // Authenticate only the server-to-server hop. This does not replace or
    // weaken the caller identity forwarded above.
    ...getInternalServiceAuthHeaders(),
  };

  const signal = options.signal || mcpFetchTimeoutSignal("management");
  const response = await fetch(url, { ...options, headers, signal });

  if (!response.ok) {
    const errorText = await response.text().catch(() => "Unknown error");
    throw new Error(`OmniRoute API error [${response.status}]: ${errorText}`);
  }

  return response.json();
}
