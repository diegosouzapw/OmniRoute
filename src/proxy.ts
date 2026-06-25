import type { NextRequest } from "next/server";
import { runAuthzPipeline } from "./server/authz/pipeline";
import { endSpan } from "./lib/observability/otel";
import { withProxySpan } from "./lib/observability/proxySpan";

export async function proxy(request: NextRequest) {
  // PR-005b: open a server span for the inbound request so downstream
  // spans (provider calls, DB queries) inherit the trace context. We
  // close the span AFTER authz resolves — failures inside authz record
  // the exception via recordException (called inside the pipeline).
  const span = withProxySpan(request, {
    name: "proxy.request",
    attributes: { "http.method": request.method, "http.path": request.nextUrl.pathname },
  });
  try {
    return await runAuthzPipeline(request, { enforce: true });
  } finally {
    endSpan(span);
  }
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
