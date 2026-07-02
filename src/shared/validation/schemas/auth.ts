import { z } from "zod";
import {
  ACCOUNT_FALLBACK_STRATEGY_VALUES,
  ROUTING_STRATEGY_VALUES,
} from "@/shared/constants/routingStrategies";
import { SUPPORTED_BATCH_ENDPOINTS } from "@/shared/constants/batchEndpoints";
import { MAX_REQUEST_BODY_LIMIT_MB, MIN_REQUEST_BODY_LIMIT_MB } from "@/shared/constants/bodySize";
import { COMBO_CONFIG_MODES } from "@/shared/constants/comboConfigMode";
import { providerAllowsOptionalApiKey } from "@/shared/constants/providers";
import { HIDEABLE_SIDEBAR_ITEM_IDS } from "@/shared/constants/sidebarVisibility";
import {
  isForbiddenUpstreamHeaderName,
  isForbiddenCustomHeaderName,
} from "@/shared/constants/upstreamHeaders";
import { MAX_TIMER_TIMEOUT_MS } from "@/shared/utils/runtimeTimeouts";

import { confirmedAccountSchema } from "./misc.ts";

// ──── Codex Import Schema ────

export const importCodexAuthSchema = z.object({
  source: z.discriminatedUnion("kind", [
    z.object({ kind: z.literal("json"), json: z.unknown() }),
    z.object({
      kind: z.literal("text"),
      text: z.string().max(256 * 1024, "Paste content must be under 256 KB"),
    }),
  ]),
  name: z.string().min(1).max(200).optional(),
  email: z.string().email("Must be a valid email").optional(),
  overwriteExisting: z.boolean().optional(),
});

// ──── Codex Import Bulk Schema ────

export const importCodexAuthBulkSchema = z.object({
  entries: z
    .array(
      z.object({
        json: z.unknown(),
        name: z.string().min(1).max(200).optional(),
        email: z.string().email("Must be a valid email").optional(),
      })
    )
    .min(1, "At least one entry is required")
    .max(50, "At most 50 entries per bulk import"),
  overwriteExisting: z.boolean().optional(),
});

// ──── Claude Auth Import Schema ────

export const importClaudeAuthSchema = z.object({
  source: z.discriminatedUnion("kind", [
    z.object({ kind: z.literal("json"), json: z.unknown() }),
    z.object({
      kind: z.literal("text"),
      text: z.string().max(256 * 1024, "Paste content must be under 256 KB"),
    }),
  ]),
  name: z.string().min(1).max(200).optional(),
  email: z.string().email("Must be a valid email").optional(),
  overwriteExisting: z.boolean().optional(),
});

// ──── Claude Auth Import Bulk Schema ────

export const importClaudeAuthBulkSchema = z.object({
  entries: z
    .array(
      z.object({
        json: z.unknown(),
        name: z.string().min(1).max(200).optional(),
        email: z.string().email("Must be a valid email").optional(),
      })
    )
    .min(1, "At least one entry is required")
    .max(50, "At most 50 entries per bulk import"),
  overwriteExisting: z.boolean().optional(),
});

// ──── Antigravity CLI (`agy`) Auth Import Schema ────

export const importAgyAuthSchema = z.object({
  source: z.discriminatedUnion("kind", [
    z.object({ kind: z.literal("json"), json: z.unknown() }),
    z.object({
      kind: z.literal("text"),
      text: z.string().max(256 * 1024, "agy token file content exceeds 256KB"),
    }),
  ]),
  name: z.string().min(1).max(200).optional(),
  email: z.string().email("Must be a valid email").optional(),
  overwriteExisting: z.boolean().optional(),
});

// ──── Antigravity CLI (`agy`) auto-detect local login Schema ────
// No `source`: the route reads the token from the local agy CLI data dir on disk.

export const applyLocalAgyAuthSchema = z.object({
  name: z.string().min(1).max(200).optional(),
  email: z.string().email("Must be a valid email").optional(),
  overwriteExisting: z.boolean().optional(),
});

// ──── Antigravity CLI (`agy`) Auth Import Bulk Schema ────

export const importAgyAuthBulkSchema = z.object({
  entries: z
    .array(
      z.object({
        json: z.unknown(),
        name: z.string().min(1).max(200).optional(),
        email: z.string().email("Must be a valid email").optional(),
      })
    )
    .min(1, "At least one entry is required")
    .max(50, "At most 50 entries per bulk import"),
  overwriteExisting: z.boolean().optional(),
});

export const oauthExchangeSchema = z.object({
  code: z.string().trim().min(1),
  redirectUri: z.string().trim().min(1),
  codeVerifier: z.string().trim().min(1).optional(),
  state: z.string().nullable().optional(),
});

export const oauthPollSchema = z.object({
  deviceCode: z.string().trim().min(1),
  codeVerifier: z.string().optional(),
  extraData: z.unknown().optional(),
});

/** Import a raw API token (e.g. WINDSURF_API_KEY) without going through the browser OAuth flow. */
export const oauthImportTokenSchema = z.object({
  token: z.union([
    z.string().trim().min(1, "Token is required"),
    z.record(z.string(), z.unknown()),
  ]),
  connectionId: z.string().optional(),
});

/**
 * Persist tokens obtained out-of-band by the browser-driven Codex device flow.
 * The browser performs the full device authorization + token exchange against
 * auth.openai.com (the server cannot — its datacenter IP is blocked by Cloudflare),
 * then ships the final tokens here for mapping + persistence. Token fields use the
 * snake_case shape returned by the OAuth token endpoint (consumed directly by
 * each provider's mapTokens).
 */
export const oauthDeviceCompleteSchema = z.object({
  access_token: z.string().trim().min(1, "access_token is required"),
  refresh_token: z.string().trim().optional(),
  id_token: z.string().trim().optional(),
  expires_in: z.number().int().positive().optional(),
  connectionId: z.string().optional(),
});

/**
 * Persist credentials obtained by the local remote-login helper. Google's
 * `firstparty/nativeapp` consent only releases the auth code when the loopback
 * redirect is reachable, which never happens on a remote VPS install — so the
 * helper (`omniroute login antigravity`) runs the OAuth on the user's own machine
 * and emits a single-line credential blob. The dashboard pastes that blob here;
 * the server decodes + finalizes + persists. See src/lib/oauth/credentialBlob.ts.
 */
export const oauthPasteCredentialsSchema = z.object({
  blob: z.string().trim().min(1, "credential blob is required"),
  connectionId: z.string().optional(),
});

export const cursorImportSchema = z.object({
  accessToken: z.string().trim().min(1, "Access token is required"),
  machineId: z.string().trim().optional(),
});

export const traeImportSchema = z.object({
  accessToken: z.string().trim().min(1, "Cloud-IDE-JWT access token is required"),
  webId: z.string().trim().optional(),
  bizUserId: z.string().trim().optional(),
  userUniqueId: z.string().trim().optional(),
  scope: z.string().trim().optional(),
  tenant: z.string().trim().optional(),
  region: z.string().trim().optional(),
});

export const kiroImportSchema = z.object({
  refreshToken: z.string().trim().min(1, "Refresh token is required"),
  region: z.string().trim().default("us-east-1"),
  // IDC (organization) token fields — present when auto-detected from an IDC SSO
  // cache token with a clientIdHash (#2059). Optional for backward compatibility.
  clientId: z.string().optional(),
  clientSecret: z.string().optional(),
  authMethod: z.string().optional(),
  profileArn: z.string().optional(),
});

export const zedImportSchema = z.object({
  confirmedAccounts: z.array(confirmedAccountSchema),
});
