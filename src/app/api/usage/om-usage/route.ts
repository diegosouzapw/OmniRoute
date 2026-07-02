import { handleCorsOptions } from "@/shared/utils/cors";
import { handleInternalUsageCommandHttpRequest } from "@/lib/usage/internalUsageCommand";

export async function OPTIONS() {
  return handleCorsOptions();
}

/**
 * GET /api/usage/om-usage
 *
 * Terminal-friendly equivalent of @@om-usage. Authenticates with the same
 * OmniRoute API key used by Claude Code/Codex and requires allowUsageCommand.
 */
export async function GET(request: Request) {
  return handleInternalUsageCommandHttpRequest(request);
}
