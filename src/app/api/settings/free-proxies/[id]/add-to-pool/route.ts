import { request as undiciRequest } from "undici";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { createErrorResponse, createErrorResponseFromUnknown } from "@/lib/api/errorResponse";
import { getFreeProxyById, promoteFreeProxyToPool } from "@/lib/localDb";
import {
  createProxyDispatcher,
  proxyConfigToUrl,
} from "@omniroute/open-sse/utils/proxyDispatcher.ts";

type ConnectivityTester = (
  host: string,
  port: number,
  type: string
) => Promise<{ success: boolean; latencyMs: number; publicIp?: string }>;

async function testProxyConnectivity(
  host: string,
  port: number,
  type: string
): Promise<{ success: boolean; latencyMs: number; publicIp?: string }> {
  const proxyUrl = proxyConfigToUrl({ type, host, port });
  if (!proxyUrl) return { success: false, latencyMs: 0 };

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
    const text = await res.body.text();
    let parsed: { ip?: string } = {};
    try {
      parsed = JSON.parse(text) as { ip?: string };
    } catch {}
    return {
      success: res.statusCode === 200,
      latencyMs: Date.now() - start,
      publicIp: parsed.ip,
    };
  } catch {
    return { success: false, latencyMs: Date.now() - start };
  } finally {
    clearTimeout(timeout);
  }
}

let _connectivityTester: ConnectivityTester = testProxyConnectivity;
export function _setConnectivityTesterForTests(fn: ConnectivityTester): void {
  _connectivityTester = fn;
}
export function _resetConnectivityTesterForTests(): void {
  _connectivityTester = testProxyConnectivity;
}

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  const { id } = await params;
  const freeProxy = await getFreeProxyById(id);
  if (!freeProxy) {
    return createErrorResponse({ status: 404, message: "Free proxy not found", type: "not_found" });
  }
  if (freeProxy.inPool) {
    return Response.json({
      success: true,
      alreadyInPool: true,
      poolProxyId: freeProxy.poolProxyId,
    });
  }

  try {
    const testResult = await _connectivityTester(freeProxy.host, freeProxy.port, freeProxy.type);
    if (!testResult.success) {
      // #4878: a failed connectivity probe must surface a non-2xx status so the
      // frontend (which gates on res.ok) does NOT optimistically mark the proxy
      // as "In Pool". 422 = the request was well-formed but the proxy is unusable.
      return Response.json(
        {
          success: false,
          error: "Proxy test failed",
          latencyMs: testResult.latencyMs,
        },
        { status: 422 }
      );
    }

    const newPoolProxyId = await promoteFreeProxyToPool(id, {
      name: `[${freeProxy.source}] ${freeProxy.host}:${freeProxy.port}`,
      type: freeProxy.type,
      host: freeProxy.host,
      port: freeProxy.port,
      source: freeProxy.source,
    });

    if (!newPoolProxyId) {
      return createErrorResponse({
        status: 500,
        message: "Failed to create proxy in registry",
        type: "internal_error",
      });
    }

    return Response.json({
      success: true,
      poolProxyId: newPoolProxyId,
      latencyMs: testResult.latencyMs,
    });
  } catch (error) {
    return createErrorResponseFromUnknown(error, "Failed to add proxy to pool");
  }
}
