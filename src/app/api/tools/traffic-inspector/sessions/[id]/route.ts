/**
 * GET    /api/tools/traffic-inspector/sessions/[id] — session detail + requests
 * PATCH  /api/tools/traffic-inspector/sessions/[id] — stop or rename
 * DELETE /api/tools/traffic-inspector/sessions/[id] — delete + cascade requests
 *
 * LOCAL_ONLY enforced by routeGuard.
 */

import { buildErrorBody, sanitizeErrorMessage } from "@omniroute/open-sse/utils/error.ts";
import { InspectorSessionPatchSchema } from "@/shared/schemas/inspector";
import {
  getSession,
  getSessionRequests,
  stopSession,
  renameSession,
  deleteSession,
} from "@/lib/db/inspectorSessions";

interface Params {
  params: Promise<{ id: string }>;
}

export async function GET(_request: Request, { params }: Params): Promise<Response> {
  const { id } = await params;

  try {
    const session = getSession(id);
    if (!session) {
      return new Response(JSON.stringify(buildErrorBody(404, "Session not found")), {
        status: 404,
        headers: { "content-type": "application/json" },
      });
    }
    const requests = getSessionRequests(id).map((r) => {
      try {
        return JSON.parse(r.payload) as unknown;
      } catch {
        return r.payload;
      }
    });
    return Response.json({ session, requests });
  } catch (err) {
    const msg = sanitizeErrorMessage(err);
    return new Response(JSON.stringify(buildErrorBody(500, msg || "Failed to get session")), {
      status: 500,
      headers: { "content-type": "application/json" },
    });
  }
}

export async function PATCH(request: Request, { params }: Params): Promise<Response> {
  const { id } = await params;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify(buildErrorBody(400, "Invalid JSON body")), {
      status: 400,
      headers: { "content-type": "application/json" },
    });
  }

  const parsed = InspectorSessionPatchSchema.safeParse(body);
  if (!parsed.success) {
    return new Response(
      JSON.stringify(buildErrorBody(400, parsed.error.issues[0]?.message ?? "Validation error")),
      { status: 400, headers: { "content-type": "application/json" } }
    );
  }

  const session = getSession(id);
  if (!session) {
    return new Response(JSON.stringify(buildErrorBody(404, "Session not found")), {
      status: 404,
      headers: { "content-type": "application/json" },
    });
  }

  try {
    if (parsed.data.action === "stop") {
      stopSession(id);
    } else if (parsed.data.action === "rename") {
      if (!parsed.data.name) {
        return new Response(
          JSON.stringify(buildErrorBody(400, "name is required for rename action")),
          { status: 400, headers: { "content-type": "application/json" } }
        );
      }
      renameSession(id, parsed.data.name);
    }
    return Response.json(getSession(id));
  } catch (err) {
    const msg = sanitizeErrorMessage(err);
    return new Response(JSON.stringify(buildErrorBody(500, msg || "Failed to update session")), {
      status: 500,
      headers: { "content-type": "application/json" },
    });
  }
}

export async function DELETE(_request: Request, { params }: Params): Promise<Response> {
  const { id } = await params;

  const session = getSession(id);
  if (!session) {
    return new Response(JSON.stringify(buildErrorBody(404, "Session not found")), {
      status: 404,
      headers: { "content-type": "application/json" },
    });
  }

  try {
    deleteSession(id);
    return new Response(null, { status: 204 });
  } catch (err) {
    const msg = sanitizeErrorMessage(err);
    return new Response(JSON.stringify(buildErrorBody(500, msg || "Failed to delete session")), {
      status: 500,
      headers: { "content-type": "application/json" },
    });
  }
}
