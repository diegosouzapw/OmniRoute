/**
 * PUT /api/tools/traffic-inspector/requests/[id]/annotation
 *
 * Attaches or replaces a free-text annotation on a buffered entry.
 * Mutations are broadcast to all WS subscribers via `buffer.update`.
 *
 * LOCAL_ONLY enforced by routeGuard.
 */

import { buildErrorBody, sanitizeErrorMessage } from "@omniroute/open-sse/utils/error.ts";
import { InspectorAnnotationPutSchema } from "@/shared/schemas/inspector";
import { globalTrafficBuffer } from "@/mitm/inspector/buffer";

interface Params {
  params: Promise<{ id: string }>;
}

export async function PUT(request: Request, { params }: Params): Promise<Response> {
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

  const parsed = InspectorAnnotationPutSchema.safeParse(body);
  if (!parsed.success) {
    return new Response(
      JSON.stringify(
        buildErrorBody(400, parsed.error.issues[0]?.message ?? "Validation error")
      ),
      { status: 400, headers: { "content-type": "application/json" } }
    );
  }

  const entry = globalTrafficBuffer.get(id);
  if (!entry) {
    return new Response(JSON.stringify(buildErrorBody(404, "Request not found")), {
      status: 404,
      headers: { "content-type": "application/json" },
    });
  }

  try {
    const updated = { ...entry, annotation: parsed.data.annotation };
    globalTrafficBuffer.update(id, updated);
    return Response.json(updated);
  } catch (err) {
    const msg = sanitizeErrorMessage(err);
    return new Response(JSON.stringify(buildErrorBody(500, msg || "Failed to update annotation")), {
      status: 500,
      headers: { "content-type": "application/json" },
    });
  }
}
