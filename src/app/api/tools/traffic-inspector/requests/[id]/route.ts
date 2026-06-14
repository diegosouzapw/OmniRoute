/**
 * GET /api/tools/traffic-inspector/requests/[id] — fetch a single intercepted request
 *
 * LOCAL_ONLY enforced by routeGuard.
 */

import { buildErrorBody } from "@omniroute/open-sse/utils/error.ts";
import { globalTrafficBuffer } from "@/mitm/inspector/buffer";

interface Params {
  params: Promise<{ id: string }>;
}

export async function GET(_request: Request, { params }: Params): Promise<Response> {
  const { id } = await params;
  const entry = globalTrafficBuffer.get(id);
  if (!entry) {
    return new Response(JSON.stringify(buildErrorBody(404, "Request not found")), {
      status: 404,
      headers: { "content-type": "application/json" },
    });
  }
  return Response.json(entry);
}
