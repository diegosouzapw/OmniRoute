/**
 * GET /api/tools/traffic-inspector/sessions/[id]/export.har
 *
 * Export all requests of a specific session as HAR v1.2.
 * Secrets are always masked — see `toHar`.
 *
 * LOCAL_ONLY enforced by routeGuard.
 */

import { buildErrorBody, sanitizeErrorMessage } from "@omniroute/open-sse/utils/error.ts";
import { getSession, getSessionRequests } from "@/lib/db/inspectorSessions";
import { toHar } from "@/lib/inspector/harExport";
import type { InterceptedRequest } from "@/mitm/inspector/types";

interface Params {
  params: Promise<{ id: string }>;
}

export async function GET(_request: Request, { params }: Params): Promise<Response> {
  const { id } = await params;

  const session = getSession(id);
  if (!session) {
    return new Response(JSON.stringify(buildErrorBody(404, "Session not found")), {
      status: 404,
      headers: { "content-type": "application/json" },
    });
  }

  try {
    const rows = getSessionRequests(id);
    const requests: InterceptedRequest[] = rows
      .map((r) => {
        try {
          return JSON.parse(r.payload) as InterceptedRequest;
        } catch {
          return null;
        }
      })
      .filter((r): r is InterceptedRequest => r !== null);

    const har = toHar(requests);
    const sessionName = (session.name ?? `session-${id}`).replace(/[^a-z0-9_-]/gi, "_");
    const filename = `${sessionName}.har`;

    return new Response(JSON.stringify(har, null, 2), {
      status: 200,
      headers: {
        "content-type": "application/json",
        "content-disposition": `attachment; filename="${filename}"`,
        "cache-control": "no-store",
      },
    });
  } catch (err) {
    const msg = sanitizeErrorMessage(err);
    return new Response(JSON.stringify(buildErrorBody(500, msg || "HAR export failed")), {
      status: 500,
      headers: { "content-type": "application/json" },
    });
  }
}
