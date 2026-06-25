import type { NextRequest } from "next/server";
import { runAuthzPipeline } from "./server/authz/pipeline";

export async function proxy(request: NextRequest) {
  // PR-009: Wrap the authz pipeline in an OpenTelemetry span so every
  // authenticated request emits a `proxy.request` span with status_code,
  // route, and matched-path attributes. `withProxySpan` is a no-op when
  // OMNIROUTE_OTEL_ENABLED !== "true".
  const { withProxySpan } = await import("./lib/observability/proxySpan");
  return withProxySpan(request, () => runAuthzPipeline(request, { enforce: true }));
}

export const config = {
  matcher: [
    "/",
    "/dashboard/:path*",
    "/home",
    "/home/:path*",
    "/api/:path*",
    "/v1/:path*",
    "/v1",
    "/chat/:path*",
    "/responses/:path*",
    "/responses",
    "/codex/:path*",
    "/codex",
    "/models",
  ],
};
