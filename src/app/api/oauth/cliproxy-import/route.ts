import os from "os";
import path from "path";
import { NextResponse } from "next/server";

import { createProviderConnection } from "@/models";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error";
import {
  scanCliProxyAuthDir,
  toConnectionPayload,
} from "@/lib/oauth/utils/cliProxyAuthImport";

/**
 * #1934: import OAuth credentials saved by CLIProxyAPI (~/.cli-proxy-api/) so users
 * don't have to re-login every account individually.
 *
 *   GET  → preview the importable accounts (provider/email/type only — never tokens).
 *   POST → import them as OmniRoute connections (upsert via createProviderConnection).
 */

function cliProxyConfigDir(): string {
  return process.env.CLIPROXYAPI_CONFIG_DIR || path.join(os.homedir(), ".cli-proxy-api");
}

async function requireImportAuth(request: Request) {
  // GHSA-mg76: importing a provider connection is a state-mutating admin action;
  // require management scope (or a dashboard session), not any valid client key.
  return requireManagementAuth(request, { invalidApiKeyStatus: 401 });
}

export async function GET(request: Request) {
  const authResponse = await requireImportAuth(request);
  if (authResponse) return authResponse;
  try {
    const { candidates, skipped, scanned } = await scanCliProxyAuthDir(cliProxyConfigDir(), Date.now());
    // Sanitize: never return access/refresh tokens to the client.
    const accounts = candidates.map((c) => ({
      provider: c.provider,
      type: c.type,
      email: c.email,
    }));
    return NextResponse.json({ dir: cliProxyConfigDir(), scanned, skipped, accounts });
  } catch (error) {
    return NextResponse.json(
      { error: sanitizeErrorMessage(error instanceof Error ? error.message : String(error)) },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const authResponse = await requireImportAuth(request);
  if (authResponse) return authResponse;
  try {
    const { candidates, skipped, scanned } = await scanCliProxyAuthDir(cliProxyConfigDir(), Date.now());
    let imported = 0;
    const results: Array<{ provider: string; email: string | null; ok: boolean; error?: string }> =
      [];
    for (const candidate of candidates) {
      try {
        await createProviderConnection(toConnectionPayload(candidate));
        imported++;
        results.push({ provider: candidate.provider, email: candidate.email, ok: true });
      } catch (err) {
        results.push({
          provider: candidate.provider,
          email: candidate.email,
          ok: false,
          error: sanitizeErrorMessage(err instanceof Error ? err.message : String(err)),
        });
      }
    }
    return NextResponse.json({ scanned, skipped, imported, results });
  } catch (error) {
    return NextResponse.json(
      { error: sanitizeErrorMessage(error instanceof Error ? error.message : String(error)) },
      { status: 500 }
    );
  }
}
