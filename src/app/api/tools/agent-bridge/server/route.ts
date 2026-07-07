/**
 * POST /api/tools/agent-bridge/server
 * Start / stop / restart MITM server; trust cert; regenerate cert.
 * LOCAL_ONLY + SPAWN_CAPABLE: registered in routeGuard.ts
 *
 * Body: AgentBridgeServerActionSchema
 */
import { AgentBridgeServerActionSchema } from "@/shared/schemas/agentBridge";
import { getCachedPassword, setCachedPassword } from "@/mitm/manager";
import { installCertResult, checkCertInstalled } from "@/mitm/cert/install";
import { generateCert } from "@/mitm/cert/generate";
import { resolveMitmDataDir } from "@/mitm/dataDir";
import path from "path";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error";
import { createErrorResponse } from "@/lib/api/errorResponse";

export async function POST(request: Request): Promise<Response> {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return createErrorResponse({ status: 400, message: "Invalid JSON body" });
  }

  const parsed = AgentBridgeServerActionSchema.safeParse(body);
  if (!parsed.success) {
    return createErrorResponse({
      status: 400,
      message: "Invalid request body",
      details: parsed.error.flatten(),
    });
  }

  const { action } = parsed.data;
  const raw = body as Record<string, unknown>;
  const sudoPassword =
    typeof raw.sudoPassword === "string" ? raw.sudoPassword : (getCachedPassword() ?? "");
  const apiKey = typeof raw.apiKey === "string" ? raw.apiKey : (process.env.ROUTER_API_KEY ?? "");

  try {
    if (action === "start") {
      if (sudoPassword) setCachedPassword(sudoPassword);
      const { startMitm } = await import("@/mitm/manager.runtime");
      const result = await startMitm(apiKey, sudoPassword);
      return Response.json({ ok: true, ...result });
    }

    if (action === "stop") {
      const pwd = sudoPassword || getCachedPassword() || "";
      const { stopMitm } = await import("@/mitm/manager.runtime");
      const result = await stopMitm(pwd);
      return Response.json({ ok: true, ...result });
    }

    if (action === "restart") {
      const pwd = sudoPassword || getCachedPassword() || "";
      const { startMitm, stopMitm, getMitmStatus } = await import("@/mitm/manager.runtime");
      const status = await getMitmStatus();
      if (status.running) {
        await stopMitm(pwd);
      }
      // stopMitm calls clearCachedPassword() internally, so re-cache after stop
      if (sudoPassword || pwd) setCachedPassword(sudoPassword || pwd);
      const result = await startMitm(apiKey, sudoPassword || pwd);
      return Response.json({ ok: true, ...result });
    }

    if (action === "trust-cert") {
      const certPath = path.join(resolveMitmDataDir(), "mitm", "server.crt");
      const pwd = sudoPassword || getCachedPassword() || "";
      const result = await installCertResult(pwd, certPath);
      if (result.installed) {
        const trusted = await checkCertInstalled(certPath);
        return Response.json({ ok: true, trusted });
      }
      if (result.reason === "canceled") {
        return createErrorResponse({ status: 409, message: "User canceled authorization" });
      }
      // Environment failure (container / headless): not an error — return the
      // manual-install guide so the UI can let the operator trust the CA by hand.
      return Response.json({
        ok: false,
        trusted: false,
        skippable: true,
        reason: result.reason,
        message: sanitizeErrorMessage(result.message ?? "Certificate install failed"),
        manualGuide: result.manualGuide,
      });
    }

    if (action === "regenerate-cert") {
      const result = await generateCert();
      return Response.json({ ok: true, certPath: result.cert });
    }

    return createErrorResponse({ status: 400, message: "Unknown action" });
  } catch (err) {
    const msg = sanitizeErrorMessage(err instanceof Error ? err.message : String(err));
    return createErrorResponse({ status: 500, message: msg });
  }
}
