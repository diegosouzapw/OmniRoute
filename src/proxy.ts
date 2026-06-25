import type { NextRequest } from "next/server";
import { runAuthzPipeline } from "./server/authz/pipeline";
import { withProxySpan } from "@/lib/observability/proxySpan";

async function proxyHandler(request: NextRequest) {
  return runAuthzPipeline(request, { enforce: true });
}

export const proxy = withProxySpan(proxyHandler);

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
