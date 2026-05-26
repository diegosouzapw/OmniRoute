/**
 * GET /api/services/9router/models
 *
 * Returns the model list for the 9router embedded service.
 *
 * Query params:
 *   ?refresh=true  — force a live sync from the running service before returning.
 *
 * Response shape:
 *   { data: ServiceModel[] }
 *
 * All model ids are prefixed with "9router/" (e.g. "9router/cx/gpt-5-mini").
 */

import { getServiceModels } from "@/lib/db/serviceModels";
import { syncServiceModels } from "@/lib/services/modelSync";
import { getSupervisor } from "@/lib/services/registry";
import { getOrCreateApiKey } from "@/lib/services/apiKey";
import { createErrorResponse } from "@/lib/api/errorResponse";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error";

const TOOL = "9router";
const DEFAULT_PORT = parseInt(process.env.NINEROUTER_PORT ?? "20130", 10);

export async function GET(request: Request): Promise<Response> {
  try {
    const { searchParams } = new URL(request.url);
    const refresh = searchParams.get("refresh") === "true";

    if (refresh) {
      // Determine the running port from the supervisor, falling back to default.
      const sup = getSupervisor(TOOL);
      const status = sup?.getStatus();
      const port = status?.port ?? DEFAULT_PORT;
      const baseUrl = `http://127.0.0.1:${port}`;

      let apiKey: string;
      try {
        apiKey = await getOrCreateApiKey(TOOL);
      } catch (err) {
        const msg = sanitizeErrorMessage(err instanceof Error ? err.message : String(err));
        return createErrorResponse({ status: 500, message: `Failed to resolve API key: ${msg}` });
      }

      await syncServiceModels(TOOL, baseUrl, apiKey);
    }

    const models = getServiceModels(TOOL);
    return Response.json({ data: models });
  } catch (err) {
    const msg = sanitizeErrorMessage(err instanceof Error ? err.message : String(err));
    return createErrorResponse({ status: 500, message: msg });
  }
}
