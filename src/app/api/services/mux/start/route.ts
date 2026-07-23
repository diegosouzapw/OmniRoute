import { getServiceRow } from "@/lib/db/versionManager";
import { getOrInitSupervisor } from "../_lib";
import { createErrorResponse } from "@/lib/api/errorResponse";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error";

const TOOL = "mux";

export async function POST(): Promise<Response> {
  try {
    const row = await getServiceRow(TOOL);
    if (!row || row.status === "not_installed") {
      return createErrorResponse({ status: 409, message: "Mux não está instalado." });
    }

    const sup = await getOrInitSupervisor();
    const status = await sup.start();
    return Response.json(status);
  } catch (err) {
    const msg = sanitizeErrorMessage(err instanceof Error ? err.message : String(err));
    return createErrorResponse({ status: 503, message: msg });
  }
}
