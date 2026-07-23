import type { NextRequest } from "next/server";
import { runAuthzPipeline } from "./server/authz/pipeline";

export async function proxy(request: NextRequest) {
  return runAuthzPipeline(request, { enforce: true });
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
    "/v1beta/:path*",
    "/v1beta",
    "/chat/:path*",
    "/responses/:path*",
    "/responses",
    "/codex/:path*",
    "/codex",
    "/models",
  ],
};
