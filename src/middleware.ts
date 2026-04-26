import type { NextRequest } from "next/server";
import { runAuthzPipeline } from "./server/authz/pipeline";

export default async function middleware(request: NextRequest) {
  return runAuthzPipeline(request, { enforce: true });
}

export const config = {
  matcher: [
    "/",
    "/dashboard/:path*",
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
