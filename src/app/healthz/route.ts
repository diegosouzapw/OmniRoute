import { getServerLifecyclePhase } from "@/lib/serverLifecycle";

export const dynamic = "force-dynamic";

const HEALTH_BODIES = {
  ready: "ok\n",
  starting: "starting\n",
  stopping: "stopping\n",
} as const;

function createHealthResponse(method: "GET" | "HEAD"): Response {
  const phase = getServerLifecyclePhase();
  const body = HEALTH_BODIES[phase];

  return new Response(method === "HEAD" ? null : body, {
    status: phase === "ready" ? 200 : 503,
    headers: {
      "Cache-Control": "no-store",
      "Content-Length": String(body.length),
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}

export function GET(): Response {
  return createHealthResponse("GET");
}

export function HEAD(): Response {
  return createHealthResponse("HEAD");
}
