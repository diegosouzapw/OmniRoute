/**
 * GET /api/tools/traffic-inspector/export.har
 *
 * Exports the entire (optionally filtered) traffic buffer as a HAR v1.2 file.
 * The Content-Disposition header triggers a browser download.
 *
 * Secrets are always masked in the export — see `toHar` implementation.
 *
 * LOCAL_ONLY enforced by routeGuard.
 */

import { buildErrorBody, sanitizeErrorMessage } from "@omniroute/open-sse/utils/error.ts";
import { InspectorListQuerySchema } from "@/shared/schemas/inspector";
import { globalTrafficBuffer } from "@/mitm/inspector/buffer";
import { toHar } from "@/lib/inspector/harExport";
import type { ListFilters } from "@/mitm/inspector/types";

export async function GET(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const rawQuery: Record<string, string> = {};
  url.searchParams.forEach((value, key) => {
    rawQuery[key] = value;
  });

  const parsed = InspectorListQuerySchema.safeParse(rawQuery);
  if (!parsed.success) {
    return new Response(
      JSON.stringify(buildErrorBody(400, parsed.error.issues[0]?.message ?? "Invalid query")),
      { status: 400, headers: { "content-type": "application/json" } }
    );
  }

  const filters: ListFilters = {
    profile: parsed.data.profile,
    host: parsed.data.host,
    agent: parsed.data.agent as ListFilters["agent"],
    status: parsed.data.status,
    source: parsed.data.source,
    sessionId: parsed.data.sessionId,
  };

  try {
    const requests = globalTrafficBuffer.list(filters);
    const har = toHar(requests);
    const json = JSON.stringify(har, null, 2);

    return new Response(json, {
      status: 200,
      headers: {
        "content-type": "application/json",
        "content-disposition": 'attachment; filename="traffic.har"',
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
