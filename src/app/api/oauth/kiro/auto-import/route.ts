import { NextResponse } from "next/server";
import { homedir } from "os";
import { join } from "path";
import { isAuthRequired, isAuthenticated } from "@/shared/utils/apiAuth";
import {
  createProviderConnection,
  getProviderConnections,
  updateProviderConnection,
  isCloudEnabled,
  resolveProxyForProvider,
} from "@/models";
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
    triedPaths: [...(sqliteResult.triedPaths ?? []), cacheResult.triedPath].filter(Boolean),
  });
}

// ── kiro-cli SQLite reader ────────────────────────────────────────────────────

async function tryKiroCliSqlite(): Promise<{
  found: boolean;
  triedPaths?: string[];
  refreshToken?: string;
  accessToken?: string;
  expiresAt?: string;
  clientId?: string;
  clientSecret?: string;
  region?: string;
  profileArn?: string;
  source?: string;
}> {
  // Build list of candidate DB paths to probe in order.
  const candidatePaths: string[] = [join(homedir(), ".local/share/kiro-cli/data.sqlite3")];
  if (process.env.APPDATA) {
    candidatePaths.push(join(process.env.APPDATA, "kiro", "storage.db"));
  }

  let Database: any;
  try {
    Database = (await import("better-sqlite3")).default;
  } catch {
    return { found: false, triedPaths: candidatePaths };
  }

  for (const dbPath of candidatePaths) {
    let db: any;
    try {
      db = new Database(dbPath, { readonly: true, fileMustExist: true });
    } catch {
      // File does not exist or cannot be opened — try next candidate.
      continue;
    }

    try {
      // Read OIDC token (access + refresh token).
      // Try auth_kv table first (kiro-cli Linux/macOS schema), then fallback
      // key-value tables used by the Kiro IDE on Windows (VS Code-style storage).
      // "kiro:auth:token" is the key Kiro IDE writes in its VS Code Extension Storage
      // API-backed SQLite (ItemTable / storage tables) — confirmed from #3363 reporter's
      // %APPDATA%\kiro\storage.db dump where the token starts with "aorAAAAAG".
      const tokenKeys = ["kirocli:odic:token", "kirocli:oidc:token", "kiro:auth:token"];
      let tokenData: any = null;

      for (const key of tokenKeys) {
        for (const table of ["auth_kv", "ItemTable", "storage"]) {
          try {
            const row = db.prepare(`SELECT value FROM ${table} WHERE key = ?`).get(key) as
              | { value: string }
              | undefined;
            if (row?.value) {
              try {
                tokenData = JSON.parse(row.value);
                if (tokenData?.refresh_token) break;
              } catch {
                // continue
              }
            }
          } catch {
            // no such table — skip gracefully
          }
        }
        if (tokenData?.refresh_token) break;
      }

      if (!tokenData?.refresh_token) {
        continue;
      }

      // Read device registration (client_id + client_secret).
      const regKeys = ["kirocli:odic:device-registration", "kirocli:oidc:device-registration"];
      let regData: any = null;
      for (const key of regKeys) {
        for (const table of ["auth_kv", "ItemTable", "storage"]) {
          try {
            const row = db.prepare(`SELECT value FROM ${table} WHERE key = ?`).get(key) as
              | { value: string }
              | undefined;
            if (row?.value) {
              try {
                regData = JSON.parse(row.value);
                if (regData?.client_id) break;
              } catch {
                // continue
              }
            }
          } catch {
            // no such table — skip gracefully
          }
        }
        if (regData?.client_id) break;
      }

      // Read profileArn (enterprise SSO / IDC). The kiro-cli Linux schema stores this
      // in the `state` table; the Windows Kiro IDE schema may store it in `ItemTable`
      // or `storage` with the same key. Probe all three so IDC users on Windows also
      // get a valid profileArn and are not silently downgraded to the Builder ID path.
      let profileArn: string | undefined;
      const profileKey = "api.codewhisperer.profile";
      for (const table of ["state", "ItemTable", "storage"]) {
        try {
          const profileRow = db
            .prepare(`SELECT value FROM ${table} WHERE key = ?`)
            .get(profileKey) as { value: string } | undefined;
          if (profileRow?.value) {
            const profileData = JSON.parse(profileRow.value);
            profileArn = profileData.arn || profileData.profileArn;
            if (profileArn) break;
          }
        } catch {
          // table may not exist — skip gracefully
        }
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
      try {
        db.close();
      } catch {
        // ignore close errors
      }
    }
  }

  return { found: false, triedPaths: candidatePaths };
}

// ── ~/.aws/sso/cache fallback ─────────────────────────────────────────────────

async function tryAwsSsoCache(targetProvider: string): Promise<{
  found: boolean;
  triedPath?: string;
  refreshToken?: string;
  source?: string;
  clientId?: string | null;
  clientSecret?: string | null;
  region?: string | null;
  authMethod?: string | null;
  profileArn?: string | null;
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
        const region: string | null = data.region || null;
        const authMethod: string | null = data.authMethod || null;

        // For IDC/organization tokens, resolve clientId and clientSecret from
        // the linked client registration file (referenced by clientIdHash).
        let clientId: string | null = null;
        let clientSecret: string | null = null;
        if (data.clientIdHash) {
          const clientFile = `${data.clientIdHash}.json`;
          try {
            const clientContent = await readFile(join(cachePath, clientFile), "utf-8");
            const clientData = JSON.parse(clientContent);
            if (clientData.clientId && clientData.clientSecret) {
              clientId = clientData.clientId;
              clientSecret = clientData.clientSecret;
            }
          } catch {
            // Client registration file not found — continue without it
          }
        }

        // Read profileArn from Kiro IDE's profile.json.
        // Kiro IDC (Identity Center) accounts can live in regions other than
        // us-east-1. #2059 forced every ARN's region segment to us-east-1,
        // which 403s the runtime gateway for non-us-east-1 IDC accounts. The
        // OAuth device-code path (src/lib/oauth/providers/kiro.ts) already
        // discovers the correct region-matched ARN; mirror that here by
        // preserving the profile's ARN region verbatim instead of rewriting
        // it.
        let profileArn: string | null = null;
        const kiroProfilePaths = [
          join(
            process.env.APPDATA || join(homedir(), "AppData", "Roaming"),
            "Kiro",
            "User",
            "globalStorage",
            "kiro.kiroagent",
            "profile.json"
          ),
          join(
            homedir(),
            ".config",
            "Kiro",
            "User",
            "globalStorage",
            "kiro.kiroagent",
            "profile.json"
          ),
        ];
        for (const profilePath of kiroProfilePaths) {
          try {
            const profileContent = await readFile(profilePath, "utf-8");
            const profileData = JSON.parse(profileContent);
            if (profileData.arn) {
              profileArn = profileData.arn;
              break;
            }
          } catch {
            continue;
          }
        }

        return {
          found: true,
          refreshToken: data.refreshToken,
          source: file,
          clientId,
          clientSecret,
          region,
          authMethod,
          profileArn,
        };
      }
    } catch {
      // skip
    }
  }

  return { found: false, triedPath: cachePath };
}

// ── Helpers (exported for unit-testing) ──────────────────────────────────────

/**
 * Derives a human-readable display name for a Kiro/AWS connection when the
 * OAuth token carries no email claim (social-auth / AWS SSO tokens). Falls
 * back through: email → profileArn-based label → provider+region label.
 *
 * Exported for unit tests (#3615).
 */
export function deriveKiroConnectionName(opts: {
  email: string | null | undefined;
  profileArn: string | undefined;
  region: string | undefined;
  targetProvider: string;
}): string {
  const { email, profileArn, region, targetProvider } = opts;
  if (email) return email;
  const r = region || "us-east-1";
  if (profileArn) return `AWS CodeWhisperer (${r})`;
  if (targetProvider === "amazon-q") return `Amazon Q (${r})`;
  return `Kiro (${r})`;
}

type ProviderConnectionLike = {
  id?: unknown;
  providerSpecificData?: unknown;
  [key: string]: unknown;
};

/**
 * Scans a list of existing provider connections and returns the first one
 * whose stored `providerSpecificData.profileArn` matches the given ARN.
 * Returns null when profileArn is undefined/null or no match is found.
 *
 * Exported for unit tests (#3615).
 */
export function findKiroConnectionByProfileArn(
  connections: ProviderConnectionLike[],
  profileArn: string | undefined
): ProviderConnectionLike | null {
  if (!profileArn) return null;
  for (const conn of connections) {
    const psd = conn.providerSpecificData;
    if (psd && typeof psd === "object" && !Array.isArray(psd)) {
      const stored = (psd as Record<string, unknown>).profileArn;
      if (typeof stored === "string" && stored === profileArn) {
        return conn;
      }
    }
  }
  return null;
}

// ── Save to OmniRoute DB ──────────────────────────────────────────────────────

type SaveAndRespondResult = Awaited<ReturnType<typeof tryKiroCliSqlite>> & {
  // Fields added by tryAwsSsoCache for IDC tokens (#2059)
  authMethod?: string | null;
};

async function saveAndRespond(
  result: SaveAndRespondResult,
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

    // Determine authMethod: prefer the value from the SSO cache token (e.g. "idc")
    // so that kiroService.refreshToken() takes the correct OIDC path for IDC tokens
    // (#2059). Fall back to "kiro-cli" for the SQLite path and "imported" for plain
    // social SSO cache tokens (no clientIdHash → no IDC client creds).
    const resolvedAuthMethod =
      result.source === "kiro-cli-sqlite"
        ? "kiro-cli"
        : result.clientId
          ? result.authMethod || "idc"
          : "imported";

    const providerSpecificData: Record<string, any> = {
      authMethod: resolvedAuthMethod,
      provider: result.source === "kiro-cli-sqlite" ? "kiro-cli SQLite" : "AWS SSO Cache",
    };

    if (result.clientId) providerSpecificData.clientId = result.clientId;
    if (result.clientSecret) providerSpecificData.clientSecret = result.clientSecret;
    if (result.region) providerSpecificData.region = result.region;
    if (profileArn) providerSpecificData.profileArn = profileArn;

    // For the SSO-cache fallback path the token came from ~/.aws/sso/cache and has no
    // per-connection OIDC client. Register one now so this connection gets an isolated
    // refresh session (#2328). The SQLite path already sets result.clientId.
    if (!result.clientId) {
      try {
        const reg = await runWithProxyContext(proxy, () => kiroService.registerClient());
        providerSpecificData.clientId = reg.clientId;
        providerSpecificData.clientSecret = reg.clientSecret;
        providerSpecificData.region = "us-east-1";
        if (reg.clientSecretExpiresAt) {
          providerSpecificData.clientSecretExpiresAt = reg.clientSecretExpiresAt;
        }
      } catch (err) {
        console.warn(
          "[kiro auto-import] registerClient failed, continuing without isolated client:",
          err
        );
      }
    }

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

    // Derive a descriptive name so the UI never shows a blank "OAuth Account"
    // when the token carries no email claim (Kiro social-auth / AWS SSO).
    const connectionName = deriveKiroConnectionName({
      email,
      profileArn,
      region: result.region,
      targetProvider,
    });

    // Dedup by profileArn: if an existing connection already has the same ARN
    // just refresh its tokens instead of inserting a new row. This prevents the
    // duplicate-row accumulation reported in #3615 (4 rows after 6 days).
    const existingConnections = await getProviderConnections({ provider: targetProvider });
    const existingByArn = findKiroConnectionByProfileArn(existingConnections, profileArn);

    if (existingByArn && typeof existingByArn.id === "string") {
      await updateProviderConnection(existingByArn.id, {
        accessToken,
        refreshToken,
        expiresAt,
        email: email || null,
        name: connectionName,
        providerSpecificData,
        testStatus: "active",
      });
    } else {
      await createProviderConnection({
        provider: targetProvider,
        authType: "oauth",
        accessToken,
        refreshToken,
        expiresAt,
        email: email || null,
        name: connectionName,
        providerSpecificData,
        testStatus: "active",
      } as any);
    }

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
    return NextResponse.json({ found: false, error: "Internal server error" }, { status: 500 });
  }
}
