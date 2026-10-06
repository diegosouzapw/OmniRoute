import type { NextRequest } from "next/server";
import { runAuthzPipeline } from "./server/authz/pipeline";

// #10627: the proxy runs in its own Next.js runtime and never executes
// instrumentation-node.ts's startup warm-ups, so its FIRST request used to
// trigger a cold `import("@/lib/db/settings")` → native SQLite driver load ON
// the request path. If that addon hangs (see driverFactory's #10627 probe),
// every proxied request stalled indefinitely with 0 bytes and no logs.
// Warm the settings cache here at boot instead: a driver failure now surfaces
// as a logged startup error, and real requests start with a hot cache.
// Fire-and-forget — never blocks proxy initialization, never rejects the
// module (mirrors the `void warmModelCatalogCache()` pattern in
// instrumentation-node.ts).
void import("./lib/db/readCache")
  .then(({ getCachedSettings }) => getCachedSettings())
  .catch((err: unknown) => {
    console.error(
      "[proxy] DB settings warm failed; requests will use default limits:",
      err instanceof Error ? err.message : err
    );
  });

export async function proxy(request: NextRequest) {
  return runAuthzPipeline(request, { enforce: true });
}

// Next compiles the middleware/proxy matcher from `regexp.source` only, dropping
// path-to-regexp's default case-insensitive flag — so a lowercase literal like
// `/v1/:path*` never matches `/V1/...`, while the rewrite matcher (flag kept)
// still routes it to the handler. That skipped the authz pipeline entirely
// (GHSA-jvqc-mp9f-q936). Expressing the case-insensitivity inside a custom
// path-to-regexp group (`([vV]1)`) survives the flag-drop because it needs no
// flag. Keep these in sync with the client-API aliases in
// next.config.mjs rewrites and src/server/authz/classify.ts.
export const config = {
  matcher: [
    "/",
    "/dashboard/:path*",
    "/home",
    "/home/:path*",
    "/api/:path*",
    "/:v1seg([vV]1)/:path*",
    "/:v1seg([vV]1)",
    "/:v1betaseg([vV]1[bB][eE][tT][aA])/:path*",
    "/:v1betaseg([vV]1[bB][eE][tT][aA])",
    "/:chatseg([cC][hH][aA][tT])/:path*",
    "/:respseg([rR][eE][sS][pP][oO][nN][sS][eE][sS])/:path*",
    "/:respseg([rR][eE][sS][pP][oO][nN][sS][eE][sS])",
    "/:codexseg([cC][oO][dD][eE][xX])/:path*",
    "/:codexseg([cC][oO][dD][eE][xX])",
    "/:modelsseg([mM][oO][dD][eE][lL][sS])",
  ],
};
