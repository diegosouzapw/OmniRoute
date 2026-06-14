/**
 * POST /api/tools/traffic-inspector/sessions/[id]/requests — persist a live snapshot entry
 *
 * Accepts a JSON-encoded InterceptedRequest payload and appends it to the
 * session request log, atomically incrementing request_count. Returns the
 * assigned seq number so the caller can confirm persistence order.
 *
 * LOCAL_ONLY enforced by routeGuard at the /api/tools/ prefix level.
 *
 * Part of R5-5 (backend half): the frontend hook (F3 / useSessionRecorder.ts)
 * is the corresponding caller that POSTs snapshots here on stop().
 */

import { buildErrorBody, sanitizeErrorMessage } from "@omniroute/open-sse/utils/error.ts";
import { InspectorSessionRequestAppendSchema } from "@/shared/schemas/inspector";
import { getSession, appendSessionRequest } from "@/lib/db/inspectorSessions";

interface Params {
  params: Promise<{ id: string }>;
}

export async function POST(request: Request, { params }: Params): Promise<Response> {
  const { id } = await params;

  // Verify session exists before attempting to append
  const session = getSession(id);
  if (!session) {
    return new Response(JSON.stringify(buildErrorBody(404, "Session not found")), {
      status: 404,
      headers: { "content-type": "application/json" },
    });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify(buildErrorBody(400, "Invalid JSON body")), {
      status: 400,
      headers: { "content-type": "application/json" },
    });
  }

  const parsed = InspectorSessionRequestAppendSchema.safeParse(body);
  if (!parsed.success) {
    return new Response(
      JSON.stringify(buildErrorBody(400, parsed.error.issues[0]?.message ?? "Validation error")),
      { status: 400, headers: { "content-type": "application/json" } }
    );
  }

  try {
    const seq = appendSessionRequest(id, parsed.data.payload);
    return Response.json({ seq }, { status: 201 });
  } catch (err) {
    const msg = sanitizeErrorMessage(err);
    return new Response(
      JSON.stringify(buildErrorBody(500, msg || "Failed to append session request")),
      { status: 500, headers: { "content-type": "application/json" } }
    );
  }
}
