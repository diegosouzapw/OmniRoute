import { getServiceRow } from "@/lib/db/versionManager";
import { createErrorResponse } from "@/lib/api/errorResponse";
import { logAuditEvent } from "@/lib/compliance/index";
import { getOrCreateApiKey } from "@/lib/services/apiKey";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error";

const TOOL = "9router";
const REVEAL_CONFIRM_HEADER = "X-Reveal-Confirm";

function noStore(response: Response): Response {
  response.headers.set("Cache-Control", "no-store");
  response.headers.set("Pragma", "no-cache");
  return response;
}

export async function POST(request: Request): Promise<Response> {
  try {
    const confirmHeader = request.headers.get(REVEAL_CONFIRM_HEADER);
    if (confirmHeader !== "yes") {
      return noStore(
        createErrorResponse({
          status: 403,
          message: `Missing confirmation header. Send ${REVEAL_CONFIRM_HEADER}: yes to reveal the key.`,
        })
      );
    }

    const row = await getServiceRow(TOOL);
    if (!row || row.status === "not_installed") {
      return noStore(
        createErrorResponse({ status: 404, message: "No API key found for 9router." })
      );
    }

    const apiKey = await getOrCreateApiKey(TOOL);

    try {
      logAuditEvent({
        action: "service.reveal_api_key",
        target: TOOL,
        resourceType: "service",
        status: "success",
        details: { tool: TOOL },
      });
    } catch {
      /* best-effort */
    }

    return noStore(Response.json({ apiKeyPlain: apiKey }));
  } catch (err) {
    const msg = sanitizeErrorMessage(err instanceof Error ? err.message : String(err));
    return noStore(createErrorResponse({ status: 500, message: msg }));
  }
}
