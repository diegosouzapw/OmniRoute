// Node.js-only route: uses child_process, fs, path via mitm/manager
// Dynamic imports prevent Turbopack from statically resolving native modules
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { cliMitmStartSchema, cliMitmStopSchema } from "@/shared/validation/schemas";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";
import { resolveApiKey } from "@/shared/services/apiKeyResolver";

// GET - Check MITM status
export async function GET() {
  try {
    const { getMitmStatus, getCachedPassword } = await import("@/mitm/manager");
    const status = await getMitmStatus();
    return NextResponse.json({
      running: status.running,
      pid: status.pid || null,
      dnsConfigured: status.dnsConfigured || false,
      certExists: status.certExists || false,
      hasCachedPassword: !!getCachedPassword(),
    });
  } catch (error) {
    console.log("Error getting MITM status:", error.message);
    return NextResponse.json({ error: "Failed to get MITM status" }, { status: 500 });
  }
}

// POST - Start MITM proxy
export async function POST(request) {
  let rawBody;
  try {
    rawBody = await request.json();
  } catch {
    return NextResponse.json(
      {
        error: {
          message: "Invalid request",
          details: [{ field: "body", message: "Invalid JSON body" }],
        },
      },
      { status: 400 }
    );
  }

  try {
    const validation = validateBody(cliMitmStartSchema, rawBody);
    if (isValidationFailure(validation)) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }
    const { apiKey: rawApiKey, sudoPassword } = validation.data;
    // (#523) Extract keyId BEFORE validation — Zod strips unknown fields!
    const apiKeyId = typeof rawBody?.keyId === "string" ? rawBody.keyId.trim() : null;
    const apiKey = await resolveApiKey(apiKeyId, rawApiKey);
    const { startMitm, getCachedPassword, setCachedPassword } = await import("@/mitm/manager");
    const isWin = process.platform === "win32";
    const pwd = sudoPassword || getCachedPassword() || "";

    if (!apiKey || (!isWin && !pwd)) {
      return NextResponse.json(
        { error: isWin ? "Missing apiKey" : "Missing apiKey or sudoPassword" },
        { status: 400 }
      );
    }

    const result = await startMitm(apiKey, pwd);
    if (!isWin) setCachedPassword(pwd);

    return NextResponse.json({
      success: true,
      running: result.running,
      pid: result.pid,
    });
  } catch (error) {
    console.log("Error starting MITM:", error.message);
    return NextResponse.json(
      { error: error.message || "Failed to start MITM proxy" },
      { status: 500 }
    );
  }
}

// DELETE - Stop MITM proxy
export async function DELETE(request) {
  let rawBody;
  try {
    rawBody = await request.json();
  } catch {
    return NextResponse.json(
      {
        error: {
          message: "Invalid request",
          details: [{ field: "body", message: "Invalid JSON body" }],
        },
      },
      { status: 400 }
    );
  }

  try {
    const validation = validateBody(cliMitmStopSchema, rawBody);
    if (isValidationFailure(validation)) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }
    const { sudoPassword } = validation.data;
    const { stopMitm, getCachedPassword, setCachedPassword } = await import("@/mitm/manager");
    const isWin = process.platform === "win32";
    const pwd = sudoPassword || getCachedPassword() || "";

    if (!isWin && !pwd) {
      return NextResponse.json({ error: "Missing sudoPassword" }, { status: 400 });
    }

    await stopMitm(pwd);
    if (!isWin && sudoPassword) setCachedPassword(sudoPassword);

    return NextResponse.json({ success: true, running: false });
  } catch (error) {
    console.log("Error stopping MITM:", error.message);
    return NextResponse.json(
      { error: error.message || "Failed to stop MITM proxy" },
      { status: 500 }
    );
  }
}
