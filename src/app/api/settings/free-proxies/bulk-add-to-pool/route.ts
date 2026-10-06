import { request as undiciRequest } from "undici";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { createErrorResponse, createErrorResponseFromUnknown } from "@/lib/api/errorResponse";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";
import { freeProxyBulkAddSchema } from "@/shared/validation/freeProxySchemas";
import { getFreeProxyById, promoteFreeProxyToPool } from "@/lib/db/freeProxies";
import {
  createProxyDispatcher,
  proxyConfigToUrl,
} from "@omniroute/open-sse/utils/proxyDispatcher.ts";
import { probeEchoTargets } from "@/lib/proxyEchoTarget";

type QuickTester = (
  host: string,
  port: number,
  type: string
) => Promise<{ ok: boolean; latencyMs: number }>;

async function testProxyQuick(
  host: string,
  port: number,
  type: string
): Promise<{ ok: boolean; latencyMs: number }> {
  const proxyUrl = proxyConfigToUrl({ type, host, port });
  if (!proxyUrl) return { ok: false, latencyMs: 0 };
  const dispatcher = createProxyDispatcher(proxyUrl);
  const start = Date.now();
  try {
    // #9694: try the IPv6-first echo target, then the IPv4-only one, so a proxy
    // with no IPv6 route is not reported dead.
    const { result } = await probeEchoTargets(async (url, timeoutMs) => {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), timeoutMs);
      try {
        const res = await undiciRequest(url, {
          method: "GET",
          dispatcher,
          signal: controller.signal,
          headersTimeout: timeoutMs,
          bodyTimeout: timeoutMs,
        });
        await res.body.dump();
        return res.statusCode;
      } finally {
        clearTimeout(timeout);
      }
    }, 5000);
    return { ok: result === 200, latencyMs: Date.now() - start };
  } catch {
    return { ok: false, latencyMs: Date.now() - start };
  }
}

let _quickTester: QuickTester = testProxyQuick;
export function _setQuickTesterForTests(fn: QuickTester): void {
  _quickTester = fn;
}
export function _resetQuickTesterForTests(): void {
  _quickTester = testProxyQuick;
}

export async function POST(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  let rawBody: unknown = {};
  try {
    rawBody = await request.json();
  } catch {
    return createErrorResponse({
      status: 400,
      message: "Invalid JSON",
      type: "invalid_request",
    });
  }

  const validation = validateBody(freeProxyBulkAddSchema, rawBody);
  if (isValidationFailure(validation)) {
    return createErrorResponse({
      status: 400,
      message: validation.error.message,
      type: "invalid_request",
    });
  }

  try {
    const results: Array<{
      id: string;
      success: boolean;
      poolProxyId?: string;
      error?: string;
    }> = [];

    for (const id of validation.data.ids) {
      const freeProxy = await getFreeProxyById(id);
      if (!freeProxy) {
        results.push({ id, success: false, error: "Not found" });
        continue;
      }
      if (freeProxy.inPool) {
        results.push({
          id,
          success: true,
          poolProxyId: freeProxy.poolProxyId ?? undefined,
        });
        continue;
      }

      const test = await _quickTester(freeProxy.host, freeProxy.port, freeProxy.type);
      if (!test.ok) {
        results.push({ id, success: false, error: "Test failed" });
        continue;
      }

      const newPoolProxyId = await promoteFreeProxyToPool(id, {
        name: `[${freeProxy.source}] ${freeProxy.host}:${freeProxy.port}`,
        type: freeProxy.type,
        host: freeProxy.host,
        port: freeProxy.port,
        source: freeProxy.source,
      });

      if (!newPoolProxyId) {
        results.push({ id, success: false, error: "Failed to create registry entry" });
        continue;
      }

      results.push({ id, success: true, poolProxyId: newPoolProxyId });
    }

    const succeeded = results.filter((r) => r.success).length;
    const failed = results.filter((r) => !r.success).length;
    return Response.json({ succeeded, failed, results });
  } catch (error) {
    return createErrorResponseFromUnknown(error, "Bulk add failed");
  }
}
