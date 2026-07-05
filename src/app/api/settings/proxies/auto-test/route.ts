import { z } from "zod";
import { deleteProxyById, listProxies, updateProxy } from "@/lib/localDb";
import { createErrorResponseFromUnknown } from "@/lib/api/errorResponse";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { createProxyDispatcher } from "@omniroute/open-sse/utils/proxyDispatcher";
import { fetch as undiciFetch } from "undici";
import { resolveHealthCheckStatusWrite } from "@/lib/proxyHealth/statusPolicy";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";
import { createErrorResponse } from "@/lib/api/errorResponse";

const TEST_TIMEOUT_MS = 5000;
// Reachability probe target. Configurable so operators can point it at an
// internal/self-hosted endpoint instead of the public default.
const TEST_URL = process.env.PROXY_HEALTH_TEST_URL || "https://httpbin.org/ip";
const CONCURRENCY = 10;

const autoTestSchema = z.object({
  ids: z.array(z.string()).optional(),
  autoRemove: z.boolean().optional().default(false),
});

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
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TEST_TIMEOUT_MS);

  try {
    const dispatcher = createProxyDispatcher(proxyUrl);
    const resp = await undiciFetch(TEST_URL, {
      method: "HEAD",
      signal: controller.signal,
      dispatcher,
      headers: { "User-Agent": "OmniRoute/1.0" },
    });
    const latencyMs = Date.now() - start;
    const alive = resp.status < 500;
    // #6246: "Test All" is a test, not test-and-set. By default an automated probe
    // never mutates a proxy's status (only the operator does). Opt back into the
    // legacy write with PROXY_HEALTH_AUTO_DEACTIVATE=true.
    const statusWrite = resolveHealthCheckStatusWrite(alive);
    if (statusWrite) await updateProxy(proxy.id, { status: statusWrite }).catch(() => {});
    return { proxyId: proxy.id, host: proxy.host, port: proxy.port, alive, latencyMs };
  } catch (err) {
    const latencyMs = Date.now() - start;
    const statusWrite = resolveHealthCheckStatusWrite(false);
    if (statusWrite) await updateProxy(proxy.id, { status: statusWrite }).catch(() => {});
    return {
      proxyId: proxy.id,
      host: proxy.host,
      port: proxy.port,
      alive: false,
      latencyMs,
      error: err instanceof Error ? err.message : "Connection failed",
    };
  } finally {
    clearTimeout(timeout);
  }
}

/**
 * POST /api/settings/proxies/auto-test
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

  const validation = validateBody(autoTestSchema, rawBody);
  if (isValidationFailure(validation)) {
    return createErrorResponse({ status: 400, message: validation.error.message, type: "invalid_request" });
  }

  const { ids: specificIds, autoRemove } = validation.data;

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
