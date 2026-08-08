/**
 * GET/POST /api/services/dario/admin/import-from-omniroute
 *
 * Imports an existing OmniRoute `claude` provider connection's OAuth tokens
 * directly into Dario's account store, skipping the interactive browser OAuth
 * flow entirely. This works because OmniRoute's native `claude` provider and
 * Dario both authenticate against the identical public Claude Code OAuth
 * client (client_id 9d1c250a-e61b-44d9-88ed-5944d1962f5e,
 * platform.claude.com/v1/oauth/token) — a refresh token minted for that
 * client_id is valid for either tool interchangeably.
 *
 * GET returns eligible source connections (metadata only — id/name/email/org
 * tier, never tokens) so the UI can offer a picker when more than one Claude
 * connection exists.
 *
 * POST writes `${DATA_DIR}/services/dario/home/.dario/accounts/<alias>.json`
 * directly, in Dario's own account-file shape (see @askalf/dario's
 * src/accounts.ts: `{alias, accessToken, refreshToken, expiresAt, scopes,
 * deviceId, accountUuid}`, a plain unencrypted JSON file dario itself
 * round-trips via JSON.stringify/parse) — far lower-risk than reimplementing
 * PKCE/token-exchange ourselves, since OmniRoute's own decrypt() already
 * hands us a live, valid access+refresh token pair for this exact client_id.
 *
 * Dario has no live filesystem watch on ~/.dario/accounts (confirmed against
 * its source — the running proxy only re-reads that directory on its own
 * boot, or via an admin login-start+complete round trip). So after writing
 * the file we stop+start the OmniRoute-managed supervisor to force a clean
 * pickup, rather than relying on any undocumented hot-reload behavior.
 */

import { z } from "zod";
import { NextResponse } from "next/server";
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { requireAdminAuth } from "../_lib";
import { getOrInitSupervisor } from "../../_lib";
import { getProviderConnections, getProviderConnectionById } from "@/lib/db/providers";
import { getDarioHomeDir } from "@/lib/services/installers/dario";
import { createErrorResponse } from "@/lib/api/errorResponse";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error";

const ImportBodySchema = z.object({
  connectionId: z.string().trim().min(1).optional(),
  alias: z.string().trim().min(1).optional(),
});

const ALIAS_PATTERN = /^[A-Za-z0-9][A-Za-z0-9_\-.]{0,63}$/;

function safeAliasFromSource(email: string | null | undefined, connectionId: string): string {
  const base = (email || connectionId || "omniroute").toLowerCase();
  const cleaned = base.replace(/[^a-z0-9_.-]/g, "-").replace(/^[^a-z0-9]+/, "");
  const alias = cleaned || "omniroute";
  return `omniroute-${alias}`.slice(0, 64);
}

export async function GET(request: Request): Promise<Response> {
  const authResponse = await requireAdminAuth(request);
  if (authResponse) return authResponse;

  try {
    const connections = await getProviderConnections({ provider: "claude" });
    const eligible = connections
      .filter(
        (c: Record<string, unknown>) =>
          c.authType === "oauth" && c.accessToken && c.refreshToken && c.isActive !== false
      )
      .map((c: Record<string, unknown>) => {
        const psd = (c.providerSpecificData as Record<string, unknown>) || {};
        return {
          id: c.id,
          name: c.name || c.email || c.id,
          email: c.email || null,
          organizationType: psd.organizationType || null,
          organizationRateLimitTier: psd.organizationRateLimitTier || null,
        };
      });
    return NextResponse.json({ connections: eligible });
  } catch (err) {
    return createErrorResponse({
      status: 500,
      message: sanitizeErrorMessage(err instanceof Error ? err.message : String(err)),
    });
  }
}

export async function POST(request: Request): Promise<Response> {
  const authResponse = await requireAdminAuth(request);
  if (authResponse) return authResponse;

  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return createErrorResponse({ status: 400, message: "Invalid JSON body" });
  }

  const parsed = ImportBodySchema.safeParse(raw ?? {});
  const b = parsed.success ? parsed.data : {};
  const connectionId = b.connectionId ?? null;
  if (!connectionId) {
    return createErrorResponse({ status: 400, message: "connectionId is required" });
  }

  const conn = (await getProviderConnectionById(connectionId)) as Record<string, unknown> | null;
  if (!conn) {
    return createErrorResponse({ status: 404, message: "Connection not found" });
  }
  if (conn.provider !== "claude" || conn.authType !== "oauth") {
    return createErrorResponse({
      status: 400,
      message: "Only OAuth 'claude' provider connections can be imported into Dario",
    });
  }
  if (!conn.accessToken || !conn.refreshToken) {
    return createErrorResponse({
      status: 400,
      message: "Connection is missing an access or refresh token",
    });
  }

  let alias = b.alias || safeAliasFromSource(conn.email as string | null, connectionId);
  if (!ALIAS_PATTERN.test(alias)) {
    alias = safeAliasFromSource(conn.email as string | null, connectionId);
  }

  const expiresAtMs = (() => {
    const raw = conn.expiresAt as string | number | undefined;
    const t = raw ? new Date(raw).getTime() : NaN;
    return Number.isFinite(t) ? t : Date.now() + 3600_000;
  })();

  const scope = conn.scope as string | undefined;
  const scopes =
    typeof scope === "string" && scope.trim() ? scope.trim().split(/\s+/).filter(Boolean) : [];

  const psd = (conn.providerSpecificData as Record<string, unknown>) || {};

  const creds = {
    alias,
    accessToken: conn.accessToken,
    refreshToken: conn.refreshToken,
    expiresAt: expiresAtMs,
    scopes,
    deviceId: typeof psd.deviceId === "string" && psd.deviceId ? psd.deviceId : crypto.randomUUID(),
    accountUuid:
      typeof psd.accountUUID === "string" && psd.accountUUID
        ? psd.accountUUID
        : typeof psd.accountUuid === "string" && psd.accountUuid
          ? psd.accountUuid
          : crypto.randomUUID(),
  };

  try {
    const darioHome = getDarioHomeDir();
    const accountsDir = path.join(darioHome, ".dario", "accounts");
    fs.mkdirSync(accountsDir, { recursive: true, mode: 0o700 });
    const filePath = path.join(accountsDir, `${alias}.json`);
    fs.writeFileSync(filePath, JSON.stringify(creds, null, 2), { encoding: "utf8", mode: 0o600 });

    // Force Dario to re-read its accounts directory with a clean stop+start
    // rather than relying on any undocumented hot-reload of a directly-
    // written file — its one documented hot-reload path is specifically the
    // admin login-start/complete round trip, not a filesystem watch.
    const sup = await getOrInitSupervisor();
    try {
      await sup.stop();
    } catch {
      /* may already be stopped */
    }
    await sup.start();

    return NextResponse.json({
      alias,
      imported: true,
      sourceConnectionId: connectionId,
      sourceEmail: (conn.email as string | null) || null,
    });
  } catch (err) {
    return createErrorResponse({
      status: 500,
      message: sanitizeErrorMessage(err instanceof Error ? err.message : String(err)),
    });
  }
}
