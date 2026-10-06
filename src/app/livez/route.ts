/**
 * Process-alive probe. Distinct from /healthz (lifecycle readiness).
 * Does not inspect the database, catalog, or providers. Still runs on the
 * main Node event loop — busy ≠ dead; prefer TCP liveness under stall.
 */
export const dynamic = "force-dynamic";

const LIVE_BODY = "ok\n";

function createLiveResponse(method: "GET" | "HEAD"): Response {
  return new Response(method === "HEAD" ? null : LIVE_BODY, {
    status: 200,
    headers: {
      "Cache-Control": "no-store",
      "Content-Length": String(LIVE_BODY.length),
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}

export function GET(): Response {
  return createLiveResponse("GET");
}

export function HEAD(): Response {
  return createLiveResponse("HEAD");
}
