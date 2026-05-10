/**
 * Claude Code identity helpers used by the native `claude` provider when
 * authenticating with an OAuth token. Anthropic's user:sessions:claude_code
 * scope expects request shape that matches a real claude-cli session;
 * everything in this module exists to produce that shape.
 *
 * Pinned to a captured claude-cli release. Bump in lockstep when a newer
 * release is captured.
 */

import { createHash, randomBytes, randomUUID } from "node:crypto";

// ---------- Versions ------------------------------------------------------

export const CLAUDE_CODE_VERSION = "2.1.131";
/** Bundled @anthropic-ai/sdk version for the pinned CLI release. */
export const CLAUDE_CODE_STAINLESS_VERSION = "0.81.0";

// ---------- Stainless OS / Arch / Runtime --------------------------------

export function stainlessOS(): string {
  switch (process.platform) {
    case "win32":
      return "Windows";
    case "darwin":
      return "MacOS";
    case "linux":
      return "Linux";
    case "freebsd":
      return "FreeBSD";
    default:
      return "Unknown";
  }
}

export function stainlessArch(): string {
  switch (process.arch) {
    case "x64":
      return "x64";
    case "arm64":
      return "arm64";
    case "ia32":
      return "x32";
    default:
      return process.arch;
  }
}

export function stainlessRuntimeVersion(): string {
  return process.version;
}

// ---------- Bounded-map helper -------------------------------------------

const IDENTITY_CACHE_LIMIT = 10_000;
const BOOTSTRAP_FETCH_TIMEOUT_MS = 10_000;

/** Insert with FIFO eviction once a Map reaches `max`. JS Maps preserve insertion order. */
function setBounded<K, V>(m: Map<K, V>, key: K, value: V, max: number): void {
  if (!m.has(key) && m.size >= max) {
    const oldest = m.keys().next().value as K | undefined;
    if (oldest !== undefined) m.delete(oldest);
  }
  m.set(key, value);
}

// ---------- Upstream session-id passthrough ------------------------------

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export function passthroughUpstreamSessionId(
  clientHeaders: Record<string, string | undefined> | null | undefined
): string | null {
  if (!clientHeaders) return null;
  const raw =
    clientHeaders["x-claude-code-session-id"] ?? clientHeaders["X-Claude-Code-Session-Id"];
  if (typeof raw !== "string") return null;
  const v = raw.trim();
  return UUID_RE.test(v) ? v : null;
}

// ---------- Session ID (per OAuth account, process lifetime) -------------

const sessionCache = new Map<string, string>();

/** Same value MUST be emitted as both X-Claude-Code-Session-Id and metadata.user_id.session_id. */
export function getSessionId(seed: string): string {
  let id = sessionCache.get(seed);
  if (id) return id;
  id = randomUUID();
  setBounded(sessionCache, seed, id, IDENTITY_CACHE_LIMIT);
  return id;
}

// ---------- Device ID (cliUserID) ----------------------------------------

/** Real CLI uses crypto.randomBytes(32).toString("hex"), persisted to ~/.claude.json. */
export function generateCliUserID(): string {
  return randomBytes(32).toString("hex");
}

const lazyCliUserIDCache = new Map<string, string>();

const HEX64_RE = /^[a-f0-9]{64}$/i;

/**
 * Resolve the cliUserID for an account, in priority order:
 *   1. providerSpecificData.cliUserID — persisted at OAuth provisioning.
 *   2. providerSpecificData.userID — alt key (matches real CLI's own).
 *   3. lazy-random — fresh randomBytes(32), cached for the process lifetime.
 *
 * Never deterministic from the access token.
 */
export function resolveCliUserID(
  providerSpecificData: Record<string, unknown> | undefined,
  seed: string
): string {
  const cli = providerSpecificData?.cliUserID;
  if (typeof cli === "string" && HEX64_RE.test(cli)) return cli;
  const alt = providerSpecificData?.userID;
  if (typeof alt === "string" && HEX64_RE.test(alt)) return alt;
  let cached = lazyCliUserIDCache.get(seed);
  if (cached) return cached;
  cached = generateCliUserID();
  setBounded(lazyCliUserIDCache, seed, cached, IDENTITY_CACHE_LIMIT);
  return cached;
}

// ---------- Account UUID -------------------------------------------------

const ACCOUNT_FETCH_RETRY_MS = 5 * 60 * 1000;
const accountUuidCache = new Map<string, { uuid: string | null; fetchedAt: number }>();
const inflightFetches = new Set<string>();

export type ClaudeBootstrap = {
  account_uuid: string | null;
  account_email: string | null;
  organization_uuid: string | null;
  organization_name: string | null;
  organization_type: string | null;
  organization_rate_limit_tier: string | null;
};

/** GET /api/claude_cli/bootstrap with the same headers real CLI uses. */
export async function fetchClaudeBootstrap(accessToken: string): Promise<ClaudeBootstrap | null> {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), BOOTSTRAP_FETCH_TIMEOUT_MS);
  try {
    const res = await fetch("https://api.anthropic.com/api/claude_cli/bootstrap", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/json",
        "User-Agent": `claude-cli/${CLAUDE_CODE_VERSION} (external, cli)`,
        "anthropic-beta": "oauth-2025-04-20",
      },
      signal: ctrl.signal,
    });
    if (!res.ok) return null;
    const data: any = await res.json().catch(() => null);
    const acct = data?.oauth_account;
    if (!acct || typeof acct !== "object") return null;
    return {
      account_uuid: acct.account_uuid || null,
      account_email: acct.account_email || null,
      organization_uuid: acct.organization_uuid || null,
      organization_name: acct.organization_name || null,
      organization_type: acct.organization_type || null,
      organization_rate_limit_tier: acct.organization_rate_limit_tier || null,
    };
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

async function backgroundFetchAccountUUID(accessToken: string, seed: string): Promise<void> {
  if (inflightFetches.has(seed)) return;
  const cached = accountUuidCache.get(seed);
  if (cached?.uuid) return;
  if (cached && Date.now() - cached.fetchedAt < ACCOUNT_FETCH_RETRY_MS) return;
  inflightFetches.add(seed);
  try {
    const bootstrap = await fetchClaudeBootstrap(accessToken);
    setBounded(
      accountUuidCache,
      seed,
      { uuid: bootstrap?.account_uuid ?? null, fetchedAt: Date.now() },
      IDENTITY_CACHE_LIMIT
    );
  } finally {
    inflightFetches.delete(seed);
  }
}

/** Format-correct UUIDv4 from a 64-hex hash (deterministic fallback shape). */
export function uuidV4FromHash(hex64: string): string {
  return [
    hex64.slice(0, 8),
    hex64.slice(8, 12),
    "4" + hex64.slice(13, 16),
    ((parseInt(hex64.charAt(16), 16) & 0x3) | 0x8).toString(16) + hex64.slice(17, 20),
    hex64.slice(20, 32),
  ].join("-");
}

/**
 * Resolve account_uuid in priority order:
 *   1. providerSpecificData.accountUUID / account_uuid (real, from bootstrap).
 *   2. in-memory cache from a background bootstrap fetch.
 *   3. deterministic UUIDv4 derived from the access token (shape-correct fallback).
 *
 * Triggers a background bootstrap fetch when no real UUID is known yet.
 */
export function resolveAccountUUID(
  providerSpecificData: Record<string, unknown> | undefined,
  seed: string,
  accessToken?: string
): string {
  const camel = providerSpecificData?.accountUUID;
  if (typeof camel === "string" && camel.length >= 32) return camel;
  const snake = providerSpecificData?.account_uuid;
  if (typeof snake === "string" && snake.length >= 32) return snake;

  const cached = accountUuidCache.get(seed);
  if (cached?.uuid) return cached.uuid;

  if (accessToken) void backgroundFetchAccountUUID(accessToken, seed);

  return uuidV4FromHash(
    createHash("sha256")
      .update("account:" + seed)
      .digest("hex")
  );
}

// ---------- metadata.user_id (the JSON-stringified blob) -----------------

/** Real CLI emits this exact key order: device_id, account_uuid, session_id. */
export function buildUserIdJson(opts: {
  deviceId: string;
  accountUUID: string;
  sessionId: string;
}): string {
  return JSON.stringify({
    device_id: opts.deviceId,
    account_uuid: opts.accountUUID,
    session_id: opts.sessionId,
  });
}

export function parseUpstreamMetadataUserId(
  body: Record<string, unknown> | null | undefined
): { device_id: string; account_uuid: string; session_id: string } | null {
  if (!body) return null;
  const md = body.metadata as Record<string, unknown> | undefined;
  const raw = md?.user_id;
  if (typeof raw !== "string" || raw.length === 0) return null;
  let parsed: any;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return null;
  }
  if (!parsed || typeof parsed !== "object") return null;
  const { device_id, account_uuid, session_id } = parsed;
  if (
    typeof device_id !== "string" ||
    !HEX64_RE.test(device_id) ||
    typeof account_uuid !== "string" ||
    !UUID_RE.test(account_uuid) ||
    typeof session_id !== "string" ||
    !UUID_RE.test(session_id)
  ) {
    return null;
  }
  return { device_id, account_uuid, session_id };
}

// ---------- anthropic-beta selector --------------------------------------

/**
 * Pick the anthropic-beta flag set that matches the request shape. Real CLI
 * uses three patterns: minimal probe, structured-output, and full agent.
 * Sending the full set on every shape is itself a fingerprint.
 */
export function selectBetaFlags(body: Record<string, unknown> | null | undefined): string {
  const b = body || {};
  const hasSystem =
    !!b.system &&
    (typeof b.system === "string" || (Array.isArray(b.system) && b.system.length > 0));
  const tools = b.tools as unknown[] | undefined;
  const hasTools = Array.isArray(tools) && tools.length > 0;
  const outputCfg = b.output_config as Record<string, unknown> | undefined;
  const hasStructuredOutput =
    !!(outputCfg && (outputCfg.format as { type?: string } | undefined)?.type === "json_schema") ||
    !!(b.response_format as { type?: string } | undefined)?.type;
  const isFullAgent = hasTools && hasSystem;

  const flags: string[] = [];
  if (isFullAgent) flags.push("claude-code-20250219");
  flags.push("oauth-2025-04-20");
  if (isFullAgent) flags.push("context-1m-2025-08-07");
  flags.push(
    "interleaved-thinking-2025-05-14",
    "redact-thinking-2026-02-12",
    "context-management-2025-06-27",
    "prompt-caching-scope-2026-01-05"
  );
  if (hasStructuredOutput || isFullAgent) flags.push("advisor-tool-2026-03-01");
  if (hasStructuredOutput && !isFullAgent) flags.push("structured-outputs-2025-12-15");
  if (isFullAgent) {
    flags.push(
      "advanced-tool-use-2025-11-20",
      "effort-2025-11-24",
      "extended-cache-ttl-2025-04-11"
    );
  }
  return flags.join(",");
}

// ---------- billing-header build hash ------------------------------------

/**
 * 3-char build hash for the billing header `cc_version=X.Y.Z.HASH`. Stable
 * per (day, version) — Anthropic does not appear to validate the value, so
 * we keep prompt-cache prefix stable within a day for a given version
 * without coupling to any captured value.
 */
export function buildHashFor(version: string, dayStamp: string): string {
  return createHash("sha256").update(`${dayStamp}${version}`).digest("hex").slice(0, 3);
}

// ---------- Tool-name normalisation --------------------------------------

const TOOL_PREFIX = "proxy_";

/** Strip OmniRoute's `proxy_` tool-name prefix; real CLI never sends it. */
export function stripProxyToolPrefix(body: Record<string, unknown>): void {
  const stripName = (n: unknown): string | undefined => {
    if (typeof n !== "string") return undefined;
    return n.startsWith(TOOL_PREFIX) ? n.slice(TOOL_PREFIX.length) : n;
  };

  const tools = body.tools as Array<Record<string, unknown>> | undefined;
  if (Array.isArray(tools)) {
    for (const t of tools) {
      const stripped = stripName(t.name);
      if (stripped !== undefined) t.name = stripped;
    }
  }

  const tc = body.tool_choice as Record<string, unknown> | undefined;
  if (tc && typeof tc.name === "string") {
    const stripped = stripName(tc.name);
    if (stripped !== undefined) tc.name = stripped;
  }

  const messages = body.messages as Array<Record<string, unknown>> | undefined;
  if (Array.isArray(messages)) {
    for (const m of messages) {
      const content = m.content;
      if (!Array.isArray(content)) continue;
      for (const block of content as Array<Record<string, unknown>>) {
        if (block?.type === "tool_use") {
          const stripped = stripName(block.name);
          if (stripped !== undefined) block.name = stripped;
        }
      }
    }
  }
}
