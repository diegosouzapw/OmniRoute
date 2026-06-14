/**
 * GET  /api/tools/traffic-inspector/sessions — list all sessions
 * POST /api/tools/traffic-inspector/sessions — start a new recording session
 *
 * LOCAL_ONLY enforced by routeGuard.
 */

import { buildErrorBody, sanitizeErrorMessage } from "@omniroute/open-sse/utils/error.ts";
import { InspectorSessionStartSchema } from "@/shared/schemas/inspector";
import { listSessions, createSession } from "@/lib/db/inspectorSessions";

export async function GET(): Promise<Response> {
  try {
    const sessions = listSessions();
    return Response.json({ sessions });
  } catch (err) {
    const msg = sanitizeErrorMessage(err);
    return new Response(JSON.stringify(buildErrorBody(500, msg || "Failed to list sessions")), {
      status: 500,
      headers: { "content-type": "application/json" },
    });
  }
}

export async function POST(request: Request): Promise<Response> {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    // Empty body is valid — name is optional
    body = {};
  }

  const parsed = InspectorSessionStartSchema.safeParse(body);
  if (!parsed.success) {
    return new Response(
      JSON.stringify(buildErrorBody(400, parsed.error.issues[0]?.message ?? "Validation error")),
      { status: 400, headers: { "content-type": "application/json" } }
    );
  }

  try {
    const session = createSession({ name: parsed.data.name });
    return Response.json(session, { status: 201 });
  } catch (err) {
    const msg = sanitizeErrorMessage(err);
    return new Response(JSON.stringify(buildErrorBody(500, msg || "Failed to create session")), {
      status: 500,
      headers: { "content-type": "application/json" },
    });
  }
}
