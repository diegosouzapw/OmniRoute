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
import {
  isMitmSudoPasswordRequired,
  normalizeMitmSudoPasswordInput,
  resolveMitmSudoPassword,
} from "@/mitm/sudoGate";
import path from "path";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error";
import { createErrorResponse } from "@/lib/api/errorResponse";
import { pickApiKeyForInternalUse } from "@/lib/localDb";

/**
 * Resolve the OmniRoute API key the spawned MITM child (`server.cjs`) uses to
 * authenticate its own outbound calls back to `/v1/chat/completions`
 * (`ROUTER_API_KEY` env — see `src/mitm/manager.ts::startMitmInternal`).
 *
 * Historically this only checked an explicit `apiKey` request field (never
 * sent by the AgentBridge UI — `AgentBridgeServerActionSchema` has no
 * `apiKey` field) and the `ROUTER_API_KEY` process env var (unset unless an
 * operator manually exports it). On a normal install neither is ever set, so
 * `startMitm()` always received `""` and the MITM child exited with
 * "ROUTER_API_KEY required" even though OmniRoute already had a usable key in
 * its own DB (#6403). Falls back to the same DB-backed selector used by the
 * combo-health-check / cloud-sync-verify internal probes.
 */
export async function resolveRouterApiKey(rawApiKey: string): Promise<string> {
  if (rawApiKey) return rawApiKey;
  if (process.env.ROUTER_API_KEY) return process.env.ROUTER_API_KEY;
  const picked = await pickApiKeyForInternalUse("internal-probe");
  return picked ?? "";
}

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
  const sudoPassword = resolveMitmSudoPassword(
    typeof raw.sudoPassword === "string" ? raw.sudoPassword : undefined,
    getCachedPassword()
  );
  const rawApiKey = typeof raw.apiKey === "string" ? raw.apiKey : "";

  try {
    if (action === "start") {
      const suppliedPassword =
        typeof raw.sudoPassword === "string" ? normalizeMitmSudoPasswordInput(raw.sudoPassword) : "";
      if (suppliedPassword) setCachedPassword(suppliedPassword);
      const apiKey = await resolveRouterApiKey(rawApiKey);
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
      const apiKey = await resolveRouterApiKey(rawApiKey);
      const result = await startMitm(apiKey, sudoPassword || pwd);
      return Response.json({ ok: true, ...result });
    }

    if (action === "trust-cert") {
      if (isMitmSudoPasswordRequired(sudoPassword)) {
        return createErrorResponse({ status: 400, message: "Missing sudoPassword" });
      }
      const certPath = path.join(resolveMitmDataDir(), "mitm", "server.crt");
      const result = await installCertResult(sudoPassword, certPath);
      if (result.installed) {
        const suppliedPassword =
          typeof raw.sudoPassword === "string" ? normalizeMitmSudoPasswordInput(raw.sudoPassword) : "";
        if (process.platform !== "win32" && suppliedPassword) {
          setCachedPassword(suppliedPassword);
        }
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
