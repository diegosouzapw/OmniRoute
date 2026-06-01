/**
 * GET  /api/tools/agent-bridge/cert   — cert status
 * POST /api/tools/agent-bridge/cert   — trust (install) the cert
 * LOCAL_ONLY: registered in routeGuard.ts
 */
import { installCert, checkCertInstalled } from "@/mitm/cert/install";
import { resolveMitmDataDir } from "@/mitm/dataDir";
import { getCachedPassword } from "@/mitm/manager";
import path from "path";
import fs from "fs";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error";
import { createErrorResponse } from "@/lib/api/errorResponse";

function certPath(): string {
  return path.join(resolveMitmDataDir(), "mitm", "server.crt");
}

export async function GET(): Promise<Response> {
  try {
    const crtPath = certPath();
    const exists = fs.existsSync(crtPath);
    const trusted = exists ? await checkCertInstalled(crtPath) : false;
    return Response.json({ exists, trusted, path: exists ? crtPath : null });
  } catch (err) {
    const msg = sanitizeErrorMessage(err instanceof Error ? err.message : String(err));
    return createErrorResponse({ status: 500, message: msg });
  }
}

export async function POST(request: Request): Promise<Response> {
  const raw = await request.json().catch(() => ({})) as Record<string, unknown>;
  const sudoPassword =
    typeof raw.sudoPassword === "string" ? raw.sudoPassword : (getCachedPassword() ?? "");

  try {
    const crtPath = certPath();
    if (!fs.existsSync(crtPath)) {
      return createErrorResponse({
        status: 404,
        message: "Certificate not found. Generate one first.",
      });
    }
    await installCert(sudoPassword, crtPath);
    const trusted = await checkCertInstalled(crtPath);
    return Response.json({ ok: true, trusted });
  } catch (err) {
    const msg = sanitizeErrorMessage(err instanceof Error ? err.message : String(err));
    return createErrorResponse({ status: 500, message: msg });
  }
}
