import { NextResponse } from "next/server";
import { z } from "zod";
import { finalizeTokens } from "@/lib/oauth/providers";
import { persistOAuthConnection } from "@/lib/oauth/connectionPersistence";
import { PASTE_CREDENTIAL_PROVIDERS } from "@/lib/oauth/pasteCredentials";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { normalizeImportRecord } from "@/lib/oauth/accountExport";
import { ANTIGRAVITY_CONFIG } from "@/lib/oauth/constants/oauth";

/**
 * Access tokens in third-party manager exports are usually stale — Google
 * access tokens live ~1h, and an export can sit on disk for days. finalizeTokens'
 * postExchange (Cloud Code project discovery for Antigravity) authenticates with
 * the access token, so a stale one fails discovery and persists a degraded
 * connection even though the REFRESH token is perfectly valid.
 *
 * Fix: before finalizing, proactively exchange the refresh token for a fresh
 * access token using the provider's own OAuth client. Google's refresh tokens
 * for native/desktop clients are non-rotating, so the export's refresh_token
 * stays authoritative. A failed refresh is NOT fatal — fall back to the
 * exported access_token (it might still be warm).
 */
async function refreshAntigravityAccessToken(refreshToken: string): Promise<{
  access_token?: string;
  expires_in?: number;
  id_token?: string;
} | null> {
  try {
    const body = new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
      client_id: ANTIGRAVITY_CONFIG.clientId,
    });
    if (ANTIGRAVITY_CONFIG.clientSecret) {
      body.set("client_secret", ANTIGRAVITY_CONFIG.clientSecret);
    }
    const response = await fetch(ANTIGRAVITY_CONFIG.tokenUrl, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded", Accept: "application/json" },
      body,
      signal: AbortSignal.timeout(15_000),
    });
    if (!response.ok) return null;
    const data = (await response.json()) as {
      access_token?: string;
      expires_in?: number;
      id_token?: string;
    };
    return typeof data.access_token === "string" && data.access_token ? data : null;
  } catch {
    return null;
  }
}

/**
 * POST /api/oauth/[provider]/import-export
 *
 * Bulk-import OAuth accounts directly from third-party account-manager export
 * files (e.g. Antigravity Manager's `cloud-accounts-export-*.json`), without
 * the one-blob-per-account manual paste dance of `/paste-credentials`.
 *
 * Body: the export document itself — `{ accounts: [...] }` (a bare top-level
 * array is also accepted). Each record may carry its tokens under `token`
 * (the Antigravity Manager shape) or flat at the top level; both snake_case
 * and camelCase token field names are normalized.
 *
 * Each record flows through the SAME persistence path as a pasted blob:
 * `finalizeTokens` (runs the provider's postExchange — Cloud Code project
 * discovery for Antigravity) then `persistOAuthConnection` (dedups by email /
 * connectionId, so re-importing refreshes in place instead of duplicating).
 *
 * Like /api/oauth/codex/import this is a state-mutating admin action, so it
 * requires management auth (a manage-scoped API key or a dashboard session)
 * and returns a per-record summary so partial successes surface to the UI.
 *
 * This lives in its own static route segment (not the dynamic `[action]`
 * route) so Next.js routes `/import-export` here; static segments win over
 * `[action]`.
 */

const accountSchema = z.record(z.string(), z.unknown());

export async function POST(
  request: Request,
  { params }: { params: Promise<{ provider: string }> }
) {
  const authResponse = await requireManagementAuth(request, { invalidApiKeyStatus: 401 });
  if (authResponse) return authResponse;

  const { provider } = await params;
  if (!PASTE_CREDENTIAL_PROVIDERS.has(provider)) {
    return NextResponse.json(
      {
        error:
          `import-export not supported for provider: ${provider}. ` +
          `Supported: ${[...PASTE_CREDENTIAL_PROVIDERS].join(", ")}`,
      },
      { status: 400 }
    );
  }

  let rawBody: unknown;
  try {
    rawBody = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid or empty JSON body" }, { status: 400 });
  }

  // Accept the raw export document (its own shape), a bare array, or a
  // pre-wrapped `{ accounts: ... }` payload.
  let candidate: unknown = rawBody;
  if (rawBody && typeof rawBody === "object" && !Array.isArray(rawBody)) {
    const maybeAccounts = (rawBody as Record<string, unknown>).accounts;
    if (maybeAccounts !== undefined) candidate = maybeAccounts;
  }

  const accounts = z
    .union([z.array(accountSchema).max(100), accountSchema])
    .transform((v: unknown) =>
      Array.isArray(v) ? (v as Record<string, unknown>[]) : [v as Record<string, unknown>]
    )
    .safeParse(candidate);
  if (!accounts.success) {
    return NextResponse.json(
      { error: accounts.error.issues[0]?.message ?? "Invalid request body" },
      { status: 400 }
    );
  }
  if (accounts.data.length === 0) {
    return NextResponse.json({ error: "No accounts found in payload" }, { status: 400 });
  }

  const results: Array<
    | { index: number; email?: string; ok: true; connectionId: string; connectionEmail: string }
    | { index: number; email?: string; ok: false; error: string }
  > = [];
  let imported = 0;
  let failed = 0;

  for (let i = 0; i < accounts.data.length; i++) {
    const record = accounts.data[i] as Record<string, unknown>;
    const accountEmail = typeof record.email === "string" ? record.email : undefined;

    const norm = normalizeImportRecord(record, provider);
    if (!norm) {
      failed += 1;
      results.push({
        index: i,
        email: accountEmail,
        ok: false,
        error: "No usable access_token found on this record",
      });
      continue;
    }

    try {
      // Proactively refresh stale access tokens before finalizing — see the
      // refreshAntigravityAccessToken docblock for why this matters (export
      // access tokens are usually already expired; the refresh token is not).
      const refreshToken =
        typeof norm.tokens.refresh_token === "string" ? norm.tokens.refresh_token : "";
      if (PASTE_CREDENTIAL_PROVIDERS.has(provider) && refreshToken) {
        const refreshed = await refreshAntigravityAccessToken(refreshToken);
        if (refreshed) {
          norm.tokens.access_token = refreshed.access_token;
          if (typeof refreshed.expires_in === "number")
            norm.tokens.expires_in = refreshed.expires_in;
          if (refreshed.id_token) norm.tokens.id_token = refreshed.id_token;
        }
      }

      // Runs the provider postExchange (Cloud Code project discovery for
      // Antigravity) — the same finalize path as paste-credentials.
      const tokenData: any = await finalizeTokens(provider, norm.tokens);

      // postExchange fetches userinfo live, but an export record's declared
      // email/name are the reliable fallback when that fetch fails — and
      // persistOAuthConnection's dedup match depends on email being present.
      if (!tokenData.email && norm.email) tokenData.email = norm.email;
      if (!tokenData.name && norm.name) tokenData.name = norm.name;

      const connection = await persistOAuthConnection(provider, tokenData);
      imported += 1;
      results.push({
        index: i,
        email: accountEmail,
        ok: true,
        connectionId: String(connection.id),
        connectionEmail: String(connection.email ?? norm.email ?? ""),
      });
    } catch {
      failed += 1;
      results.push({
        index: i,
        email: accountEmail,
        ok: false,
        error: "Failed to import account. Check credentials and provider availability.",
      });
    }
  }

  return NextResponse.json({
    success: failed === 0,
    imported,
    failed,
    total: accounts.data.length,
    results,
  });
}
