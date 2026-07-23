/**
 * POST /api/tools/agent-bridge/upstream-ca/test
 *
 * Validate-only (dry-run) counterpart of POST /api/tools/agent-bridge/upstream-ca:
 * checks the upstream CA file exists and is a parseable PEM certificate, WITHOUT
 * persisting the path or activating it via configureUpstreamCa(). Backs the
 * UpstreamCaField "Test" button, which previously 404'd (#3488).
 *
 * LOCAL_ONLY: covered by the "/api/tools/agent-bridge/" prefix in routeGuard.ts.
 */
import crypto from "crypto";
import fs from "fs";

import { AgentBridgeUpstreamCaPostSchema } from "@/shared/schemas/agentBridge";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error";
import { createErrorResponse } from "@/lib/api/errorResponse";

export async function POST(request: Request): Promise<Response> {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return createErrorResponse({ status: 400, message: "Invalid JSON body" });
  }

  const parsed = AgentBridgeUpstreamCaPostSchema.safeParse(body);
  if (!parsed.success) {
    return createErrorResponse({
      status: 400,
      message: "Invalid request body",
      details: parsed.error.flatten(),
    });
  }

  const { path: caPath } = parsed.data;

  if (!fs.existsSync(caPath)) {
    return createErrorResponse({ status: 400, message: `Upstream CA file not found: ${caPath}` });
  }

  let pem: string;
  try {
    pem = fs.readFileSync(caPath, "utf8");
  } catch (err) {
    const msg = sanitizeErrorMessage(err instanceof Error ? err.message : String(err));
    return createErrorResponse({ status: 400, message: `Unable to read upstream CA file: ${msg}` });
  }

  if (!pem.includes("-----BEGIN CERTIFICATE-----")) {
    return createErrorResponse({
      status: 400,
      message: "File is not a PEM certificate (missing a -----BEGIN CERTIFICATE----- block).",
    });
  }

  try {
    const cert = new crypto.X509Certificate(pem);
    return Response.json({ ok: true, path: caPath, subject: cert.subject, validTo: cert.validTo });
  } catch (err) {
    const msg = sanitizeErrorMessage(err instanceof Error ? err.message : String(err));
    return createErrorResponse({ status: 400, message: `Invalid certificate: ${msg}` });
  }
}
