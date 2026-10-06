/**
 * POST /api/tools/agent-bridge/cert/regenerate
 * Regenerates the MITM self-signed certificate. Overwrites the existing one.
 * LOCAL_ONLY: registered in routeGuard.ts
 */
import { generateCert } from "@/mitm/cert/generate";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error";
import { createErrorResponse } from "@/lib/api/errorResponse";

export async function POST(): Promise<Response> {
  try {
    // #10467: generateCert() returns the existing paths untouched when a cert is already
    // on disk, which made this endpoint a no-op — the download still served the old file.
    // This route is the one caller that must always mint a fresh cert.
    const result = await generateCert({ force: true });
    return Response.json({ ok: true, certPath: result.cert, keyPath: result.key });
  } catch (err) {
    const msg = sanitizeErrorMessage(err instanceof Error ? err.message : String(err));
    return createErrorResponse({ status: 500, message: msg });
  }
}
