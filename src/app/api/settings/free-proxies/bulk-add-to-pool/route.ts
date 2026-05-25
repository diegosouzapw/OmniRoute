import { request as undiciRequest } from "undici";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { createErrorResponse, createErrorResponseFromUnknown } from "@/lib/api/errorResponse";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";
import { freeProxyBulkAddSchema } from "@/shared/validation/freeProxySchemas";
import { getFreeProxyById, markFreeProxyInPool, createProxy } from "@/lib/localDb";
import {
  createProxyDispatcher,
  proxyConfigToUrl,
} from "@omniroute/open-sse/utils/proxyDispatcher.ts";

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
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);
  try {
    const res = await undiciRequest("https://api64.ipify.org?format=json", {
      method: "GET",
      dispatcher,
      signal: controller.signal,
      headersTimeout: 5000,
      bodyTimeout: 5000,
    });
    await res.body.dump();
    return { ok: res.statusCode === 200, latencyMs: Date.now() - start };
  } catch {
    return { ok: false, latencyMs: Date.now() - start };
  } finally {
    clearTimeout(timeout);
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

      const poolProxy = await createProxy({
        name: `[${freeProxy.source}] ${freeProxy.host}:${freeProxy.port}`,
        type: freeProxy.type,
        host: freeProxy.host,
        port: freeProxy.port,
        source: freeProxy.source,
      });

      if (!poolProxy) {
        results.push({ id, success: false, error: "Failed to create registry entry" });
        continue;
      }

      await markFreeProxyInPool(id, poolProxy.id);
      results.push({ id, success: true, poolProxyId: poolProxy.id });
    }

    const succeeded = results.filter((r) => r.success).length;
    const failed = results.filter((r) => !r.success).length;
    return Response.json({ succeeded, failed, results });
  } catch (error) {
    return createErrorResponseFromUnknown(error, "Bulk add failed");
  }
}
