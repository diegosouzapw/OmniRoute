import { NextResponse } from "next/server";
import { homedir } from "os";
import { join } from "path";
import { isAuthRequired, isAuthenticated } from "@/shared/utils/apiAuth";
import { createProviderConnection, isCloudEnabled, resolveProxyForProvider } from "@/models";
import { syncToCloud } from "@/lib/cloudSync";
import { getConsistentMachineId } from "@/shared/utils/machineId";
import { KiroService } from "@/lib/oauth/services/kiro";
import { runWithProxyContext } from "@omniroute/open-sse/utils/proxyFetch.ts";

/**
 * GET /api/oauth/kiro/auto-import
 *
 * Auto-import Kiro credentials from kiro-cli's SQLite database.
 * Supports both personal Builder ID and enterprise SSO (IDC/profileArn).
 *
 * Falls back to ~/.aws/sso/cache if kiro-cli SQLite is not found.
 *
 * 🔒 Auth-guarded: requires JWT cookie or Bearer API key.
 */
export async function GET(request: Request) {
  if (await isAuthRequired(request)) {
    if (!(await isAuthenticated(request))) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  const { searchParams } = new URL(request.url);
  const targetProvider = searchParams.get("targetProvider") === "amazon-q" ? "amazon-q" : "kiro";

  // Try kiro-cli SQLite first
  const sqliteResult = await tryKiroCliSqlite();
  if (sqliteResult.found) {
    return await saveAndRespond(sqliteResult, targetProvider, request);
  }

  // Fall back to ~/.aws/sso/cache (social auth / manual token)
  const cacheResult = await tryAwsSsoCache(targetProvider);
  if (cacheResult.found) {
    return await saveAndRespond(cacheResult, targetProvider, request);
  }

  return NextResponse.json({
    found: false,
    error:
      "Kiro credentials not found. " +
      "Run `kiro-cli login --use-device-flow` then retry, " +
      "or use the Import Token option in the dashboard.",
    triedPaths: [sqliteResult.triedPath, cacheResult.triedPath].filter(Boolean),
  });
}

// ── kiro-cli SQLite reader ────────────────────────────────────────────────────

async function tryKiroCliSqlite(): Promise<{
  found: boolean;
  triedPath?: string;
  refreshToken?: string;
  accessToken?: string;
  expiresAt?: string;
  clientId?: string;
  clientSecret?: string;
  region?: string;
  profileArn?: string;
  source?: string;
}> {
  const dbPath = join(homedir(), ".local/share/kiro-cli/data.sqlite3");

  let Database: any;
  try {
    Database = (await import("better-sqlite3")).default;
  } catch {
    return { found: false, triedPath: dbPath };
  }

  let db: any;
  try {
    db = new Database(dbPath, { readonly: true, fileMustExist: true });
  } catch {
    return { found: false, triedPath: dbPath };
  }

  try {
    // Read OIDC token (access + refresh token)
    const tokenKeys = ["kirocli:odic:token", "kirocli:oidc:token"];
    let tokenData: any = null;
    for (const key of tokenKeys) {
      const row = db.prepare("SELECT value FROM auth_kv WHERE key = ?").get(key) as
        | { value: string }
        | undefined;
      if (row?.value) {
        try {
          tokenData = JSON.parse(row.value);
          break;
        } catch {
          // continue
        }
      }
    }

    if (!tokenData?.refresh_token) {
      return { found: false, triedPath: dbPath };
    }

    // Read device registration (client_id + client_secret)
    const regKeys = ["kirocli:odic:device-registration", "kirocli:oidc:device-registration"];
    let regData: any = null;
    for (const key of regKeys) {
      const row = db.prepare("SELECT value FROM auth_kv WHERE key = ?").get(key) as
        | { value: string }
        | undefined;
      if (row?.value) {
        try {
          regData = JSON.parse(row.value);
          break;
        } catch {
          // continue
        }
      }
    }

    // Read profileArn from state table (enterprise SSO / IDC)
    let profileArn: string | undefined;
    try {
      const profileRow = db
        .prepare("SELECT value FROM state WHERE key = 'api.codewhisperer.profile'")
        .get() as { value: string } | undefined;
      if (profileRow?.value) {
        const profileData = JSON.parse(profileRow.value);
        profileArn = profileData.arn || profileData.profileArn;
      }
    } catch {
      // state table may not exist for personal Builder ID accounts
    }

    const region = tokenData.region || regData?.region || "us-east-1";
    const expiresAt = tokenData.expires_at
      ? new Date(tokenData.expires_at).toISOString()
      : new Date(Date.now() + 3600 * 1000).toISOString();

    return {
      found: true,
      source: "kiro-cli-sqlite",
      refreshToken: tokenData.refresh_token,
      accessToken: tokenData.access_token,
      expiresAt,
      clientId: regData?.client_id,
      clientSecret: regData?.client_secret,
      region,
      profileArn,
    };
  } finally {
    db.close();
  }
}

// ── ~/.aws/sso/cache fallback ─────────────────────────────────────────────────

async function tryAwsSsoCache(targetProvider: string): Promise<{
  found: boolean;
  triedPath?: string;
  refreshToken?: string;
  source?: string;
}> {
  const { readFile, readdir } = await import("fs/promises");
  const cachePath = join(homedir(), ".aws/sso/cache");
  const preferredFile =
    targetProvider === "amazon-q" ? "amazon-q-auth-token.json" : "kiro-auth-token.json";

  let files: string[];
  try {
    files = await readdir(cachePath);
  } catch {
    return { found: false, triedPath: cachePath };
  }

  // Try preferred file first, then scan all
  const ordered = [
    preferredFile,
    ...files.filter((f) => f !== preferredFile && f.endsWith(".json")),
  ];

  for (const file of ordered) {
    try {
      const content = await readFile(join(cachePath, file), "utf-8");
      const data = JSON.parse(content);
      if (data.refreshToken?.startsWith("aorAAAAAG")) {
        return { found: true, refreshToken: data.refreshToken, source: file };
      }
    } catch {
      // skip
    }
  }

  return { found: false, triedPath: cachePath };
}

// ── Save to OmniRoute DB ──────────────────────────────────────────────────────

async function saveAndRespond(
  result: Awaited<ReturnType<typeof tryKiroCliSqlite>>,
  targetProvider: string,
  request: Request
) {
  try {
    const kiroService = new KiroService();
    const proxy = await resolveProxyForProvider(targetProvider);

    // If we have a refresh token but no valid access token, refresh now
    let accessToken = result.accessToken;
    let refreshToken = result.refreshToken!;
    let expiresAt = result.expiresAt;
    let profileArn = result.profileArn;

    const providerSpecificData: Record<string, any> = {
      authMethod: result.source === "kiro-cli-sqlite" ? "kiro-cli" : "imported",
      provider: result.source === "kiro-cli-sqlite" ? "kiro-cli SQLite" : "AWS SSO Cache",
    };

    if (result.clientId) providerSpecificData.clientId = result.clientId;
    if (result.clientSecret) providerSpecificData.clientSecret = result.clientSecret;
    if (result.region) providerSpecificData.region = result.region;
    if (profileArn) providerSpecificData.profileArn = profileArn;

    // Refresh token to get a fresh access token and confirm it works
    const refreshed = await runWithProxyContext(proxy, () =>
      kiroService.refreshToken(refreshToken, providerSpecificData)
    );

    accessToken = refreshed.accessToken;
    refreshToken = refreshed.refreshToken || refreshToken;
    expiresAt = new Date(Date.now() + (refreshed.expiresIn || 3600) * 1000).toISOString();

    // profileArn may come back from social auth refresh
    if (refreshed.profileArn && !profileArn) {
      profileArn = refreshed.profileArn;
      providerSpecificData.profileArn = profileArn;
    }

    const email = kiroService.extractEmailFromJWT(accessToken);

    await createProviderConnection({
      provider: targetProvider,
      authType: "oauth",
      accessToken,
      refreshToken,
      expiresAt,
      email: email || null,
      providerSpecificData,
      testStatus: "active",
    } as any);

    if (isCloudEnabled()) {
      const machineId = await getConsistentMachineId();
      await syncToCloud(machineId).catch(() => {});
    }

    return NextResponse.json({
      found: true,
      source: result.source,
      email: email || null,
      profileArn: profileArn || null,
      region: result.region || null,
      message: "Kiro credentials imported successfully.",
    });
  } catch (error: any) {
    console.error("[kiro auto-import] save error:", error);
    return NextResponse.json(
      { found: false, error: `Import failed: ${error.message}` },
      { status: 500 }
    );
  }
}
