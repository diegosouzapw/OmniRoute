import { getSupervisor } from "@/lib/services/registry";
import { createErrorResponse } from "@/lib/api/errorResponse";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error";

const TOOL = "cliproxy";

export async function POST(): Promise<Response> {
  try {
    const sup = getSupervisor(TOOL);
    if (!sup) {
      return Response.json({ tool: TOOL, state: "stopped" });
    }
    const status = await sup.stop();
    return Response.json(status);
  } catch (err) {
    const msg = sanitizeErrorMessage(err instanceof Error ? err.message : String(err));
    return createErrorResponse({ status: 500, message: msg });
  }
}
