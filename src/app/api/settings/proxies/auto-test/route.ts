import { deleteProxyById, listProxies, updateProxy } from "@/lib/localDb";
import { createErrorResponseFromUnknown } from "@/lib/api/errorResponse";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { createProxyDispatcher } from "@omniroute/open-sse/utils/proxyDispatcher";
import { fetch as undiciFetch } from "undici";

const TEST_TIMEOUT_MS = 5000;
const TEST_URL = "https://httpbin.org/ip";
const CONCURRENCY = 10;

interface TestResult {
  proxyId: string;
  host: string;
  port: number;
  alive: boolean;
  latencyMs: number | null;
  error?: string;
}

async function testSingleProxy(proxy: { id: string; type: string; host: string; port: number }): Promise<TestResult> {
  const proxyUrl = `${proxy.type}://${proxy.host}:${proxy.port}`;
  const start = Date.now();

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), TEST_TIMEOUT_MS);
    const dispatcher = createProxyDispatcher(proxyUrl);
    const resp = await undiciFetch(TEST_URL, {
      method: "HEAD",
      signal: controller.signal,
      dispatcher,
      headers: { "User-Agent": "OmniRoute/1.0" },
    });
    clearTimeout(timeout);
    const latencyMs = Date.now() - start;
    await updateProxy(proxy.id, { status: alive ? "active" : "inactive" }).catch(() => {});
    return { proxyId: proxy.id, host: proxy.host, port: proxy.port, alive, latencyMs };
  } catch (err) {
    const latencyMs = Date.now() - start;
    await updateProxy(proxy.id, { status: "inactive" }).catch(() => {});
    return {
      proxyId: proxy.id,
      host: proxy.host,
      port: proxy.port,
      alive: false,
      latencyMs,
      error: err instanceof Error ? err.message : "Connection failed",
    };
  }
}

/**
 * POST /api/settings/proxies/auto-test
 * Body: { ids?: string[], autoRemove?: boolean }
 *
 * Tests proxy reachability. If autoRemove is true, removes dead proxies.
 */
export async function POST(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  let rawBody: unknown;
  try {
    rawBody = await request.json();
  } catch {
    rawBody = {};
  }

  const body = (rawBody || {}) as { ids?: unknown; autoRemove?: unknown };
  const specificIds = Array.isArray(body.ids)
    ? body.ids.filter((id): id is string => typeof id === "string")
    : null;
  const autoRemove = body.autoRemove === true;

  try {
    const allProxies = await listProxies({ includeSecrets: false });
    const proxiesToTest = specificIds
      ? allProxies.filter((p) => specificIds.includes(p.id))
      : allProxies;

    if (proxiesToTest.length === 0) {
      return Response.json({ results: [], removed: [] });
    }

    const results: TestResult[] = [];
    for (let i = 0; i < proxiesToTest.length; i += CONCURRENCY) {
      const batch = proxiesToTest.slice(i, i + CONCURRENCY);
      const batchResults = await Promise.allSettled(batch.map((proxy) => testSingleProxy(proxy)));
      for (const result of batchResults) {
        if (result.status === "fulfilled") results.push(result.value);
      }
    }

    const removed: string[] = [];
    if (autoRemove) {
      for (const r of results) {
        if (!r.alive) {
          try {
            if (await deleteProxyById(r.proxyId, { force: true })) removed.push(r.proxyId);
          } catch { /* skip */ }
        }
      }
    }

    return Response.json({
      tested: results.length,
      alive: results.filter((r) => r.alive).length,
      dead: results.filter((r) => !r.alive).length,
      removed: removed.length,
      results,
    });
  } catch (error) {
    return createErrorResponseFromUnknown(error, "Failed to auto-test proxies");
  }
}
