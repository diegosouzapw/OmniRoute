/**
 * POST /api/tools/agent-bridge/repair
 *
 * Undo orphaned MITM system state (DNS spoof entries, root CA, system proxy)
 * left behind by a crash or SIGKILL. Idempotent — safe to call when state is
 * already clean. LOCAL_ONLY: covered by the "/api/tools/agent-bridge/" prefix
 * in routeGuard.ts (Hard Rules #15 + #17).
 *
 * Gap 7 — the application-layer analogue of ProxyBridge's `--cleanup` flag.
 */
import { z } from "zod";
import { repairMitm, getCachedPassword } from "@/mitm/manager";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error";
import { createErrorResponse } from "@/lib/api/errorResponse";

// Exported for unit testing. Next.js only treats GET/POST/etc. as route
// handlers; additional named exports are ignored by the App Router.
export const RepairBodySchema = z.object({
  sudoPassword: z.string().optional(),
});

export async function POST(request: Request): Promise<Response> {
  const raw = await request.json().catch(() => ({}));
  const parsed = RepairBodySchema.safeParse(raw);
  const sudoPassword =
    (parsed.success ? parsed.data.sudoPassword : undefined) ?? getCachedPassword() ?? "";

  try {
    const result = await repairMitm(sudoPassword);
    return Response.json({ ok: true, repaired: result.repaired });
  } catch (err) {
    const msg = sanitizeErrorMessage(err instanceof Error ? err.message : String(err));
    return createErrorResponse({ status: 500, message: msg });
  }
}
