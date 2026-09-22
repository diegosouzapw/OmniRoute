import { createHash, randomBytes, randomUUID } from "crypto";
import { setUserAgentHeader } from "../executors/base.ts";
import { generateSessionId } from "../services/sessionManager.ts";
import { getCachedOpencodeCliVersion, refreshOpencodeCliVersion } from "./opencodeCliVersion.ts";

/**
 * Default synthesized User-Agent. The upstream only parses the version, so this literal
 * exists to be recent enough, not to impersonate a build: any `opencode/<>=1.17>` passes.
 * Overridable through the existing OPENCODE_USER_AGENT (or <PROVIDER>_USER_AGENT) knob.
 */
export const DEFAULT_OPENCODE_USER_AGENT = "opencode/1.18.31";

/** Canonical OpenCode session id shape: `ses_` + 12 hex + 14 base62. */
export const OPENCODE_SESSION_PATTERN = /^ses_[0-9a-f]{12}[0-9A-Za-z]{14}$/;
/** Same shape for the request id, which the upstream accepts but does not validate. */
export const OPENCODE_REQUEST_PATTERN = /^msg_[0-9a-f]{12}[0-9A-Za-z]{14}$/;

const MINIMUM_USER_AGENT_MINOR = 17;
const USER_AGENT_VERSION_RE = /opencode\/(?:[a-z]+\/)?v?(\d+)\.(\d+)/i;

/** Whether a User-Agent already satisfies the upstream contract, so it must be kept. */
export function satisfiesOpencodeUserAgentContract(userAgent: string | null | undefined): boolean {
  const match = String(userAgent || "").match(USER_AGENT_VERSION_RE);
  if (!match) return false;
  const major = Number.parseInt(match[1], 10);
  const minor = Number.parseInt(match[2], 10);
  if (!Number.isFinite(major) || !Number.isFinite(minor)) return false;
  return major > 1 || (major === 1 && minor >= MINIMUM_USER_AGENT_MINOR);
}

/**
 * The session id the caller supplied, if any.
 *
 * Only a client-supplied value joins two requests of one conversation: a synthesized one
 * is derived from the body, and the body of a build request and of the title request that
 * follows it differ — including in their tool list, which is the very thing being joined.
 */
export function clientSuppliedOpencodeSession(
  clientHeaders: Record<string, string> | null | undefined
): string | undefined {
  if (!clientHeaders) return undefined;
  const value =
    findHeader(clientHeaders, "x-opencode-session") ?? findHeader(clientHeaders, "x-session-id");
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
}

/**
 * The CLI identity defaults the upstream expects, or `undefined` when synthesis is off.
 *
 * Lives here rather than in the executor because this module already owns the default
 * user-agent and the contract that validates one. `gated` says the free tier will inspect
 * this request: outside the gate a configured user-agent is honoured as-is (the #5997
 * contract, which `opencode-go` and paid models rely on), while on a gated request one
 * that does not satisfy the version rule is replaced — an operator still carrying the
 * previous unversioned default would otherwise be refused.
 */
export function resolveOpencodeCliDefaults(
  providerId: string,
  gated: boolean
): { userAgent: string; client: string; project: string } | undefined {
  if (/^(0|false|no|off)$/i.test(process.env.OPENCODE_SYNTHESIZE_CLI_HEADERS?.trim() ?? "")) {
    return undefined;
  }
  const envUAKey = `${providerId.toUpperCase().replace(/[^A-Z0-9]/g, "_")}_USER_AGENT`;
  const configuredUA = process.env[envUAKey]?.trim() || process.env.OPENCODE_USER_AGENT?.trim();
  // Auto-refresh the live CLI version in the background (coalesced, 6h TTL, never
  // throws); the default below reads the cache synchronously so synthesis never blocks.
  void refreshOpencodeCliVersion();
  return {
    userAgent:
      configuredUA && (!gated || satisfiesOpencodeUserAgentContract(configuredUA))
        ? configuredUA
        : `opencode/${getCachedOpencodeCliVersion()}`,
    client: process.env.OPENCODE_CLIENT?.trim() || "desktop",
    project: process.env.OPENCODE_PROJECT?.trim() || "global",
  };
}

const BASE62 = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

function base62From(bytes: Buffer, length: number): string {
  return Array.from(bytes.subarray(0, length), (byte) => BASE62[byte % 62]).join("");
}

/**
 * Render an id in the canonical OpenCode shape (`<prefix>` + 12 hex + 14 base62).
 *
 * The upstream checks the shape and not the value: 12 arbitrary hex digits pass, so
 * there is no need to reproduce the client's own id algorithm (timestamp plus counter).
 * With a seed the result is deterministic, which is what keeps a conversation on one
 * upstream session — and therefore keeps prompt caching warm — across requests.
 */
function canonicalId(prefix: "ses_" | "msg_", seed?: string): string {
  const bytes = seed
    ? createHash("sha256").update(`opencode\u0000${prefix}\u0000${seed}`).digest()
    : randomBytes(32);
  return `${prefix}${bytes.subarray(0, 6).toString("hex")}${base62From(bytes.subarray(6), 14)}`;
}

/**
 * Header keys that are forwarded from the client to the upstream provider.
 * Used by both OpencodeExecutor and DefaultExecutor.
 */
const OPENCODE_HEADER_KEYS = [
  "x-opencode-session",
  "x-opencode-request",
  "x-opencode-project",
  "x-opencode-client",
] as const;

/**
 * Common agent-metadata headers used by non-OpenCode clients (custom agents/
 * providers) for upstream request tracking and attribution. Forwarded the same
 * way as the x-opencode-* set: case-insensitive lookup, client value wins.
 * Added for 9router#2413 — these were previously dropped for every client
 * outside the OpenCode allowlist.
 */
const AGENT_METADATA_HEADER_KEYS = ["x-session-id", "x-title"] as const;

/**
 * Case-insensitive lookup for a header in a headers record.
 */
function findHeader(headers: Record<string, string>, name: string): string | undefined {
  return Object.entries(headers).find(([key]) => key.toLowerCase() === name.toLowerCase())?.[1];
}

/**
 * Forward OpenCode client request metadata headers to the upstream provider.
 *
 * Shared logic used by OpencodeExecutor and DefaultExecutor:
 * 1. Forwards User-Agent from clientHeaders via `setUserAgentHeader()`
 * 2. Forwards x-opencode-session, x-opencode-request, x-opencode-project,
 *    x-opencode-client headers (case-insensitive match)
 * 3. Forwards x-session-id, x-title agent-metadata headers (case-insensitive
 *    match) — common conventions used by non-OpenCode agent clients (9router#2413)
 *
 * @param headers - The outbound headers record to mutate
 * @param clientHeaders - The client-provided headers to forward from
 * @param options.synthesizeRequestId - When true (OpencodeExecutor only), maps
 *   x-session-affinity / x-session-id to x-opencode-session when the latter is
 *   missing, and synthesizes a UUID for x-opencode-request if also missing.
 * @param options.cliDefaults - When provided (OpencodeExecutor only), synthesize
 *   the OpenCode CLI identity headers that Cloudflare requires on VPS egress
 *   (User-Agent, x-opencode-client, x-opencode-project) plus fresh request/session
 *   UUIDs, but ONLY for keys the client did not already supply. Client values always
 *   win; these defaults only fill gaps. User-Agent is the one exception: a client UA
 *   that is not already the OpenCode CLI (e.g. curl/8.5.0) is REPLACED with the
 *   synthesized CLI UA, because opencode.ai's free tier rejects generic client UAs
 *   from datacenter IPs with FreeUsageLimitError 429. (#5997, follow-up #10229)
 * @param options.sessionBody - Request body fields used to generate a
 *   conversation-stable session fingerprint (model, system, messages or input, tools).
 *   When provided, x-opencode-session is a deterministic hash instead of a random
 *   UUID, so upstream prompt caching hits across requests in the same conversation.
 */
export function forwardOpencodeClientHeaders(
  headers: Record<string, string>,
  clientHeaders: Record<string, string>,
  options?: {
    synthesizeRequestId?: boolean;
    cliDefaults?: { userAgent: string; client: string; project: string };
    sessionBody?: {
      model?: string;
      system?: unknown;
      messages?: Array<{ role?: string; content?: unknown }>;
      input?: Array<{ role?: string; content?: unknown }>;
      tools?: Array<{ name?: string; function?: { name?: string } }>;
    };
  }
): void {
  // 1. Forward User-Agent
  const clientUA = clientHeaders["User-Agent"] || clientHeaders["user-agent"];
  if (clientUA) {
    setUserAgentHeader(headers, clientUA);
  }

  // 2. Forward x-opencode-* metadata headers
  for (const headerName of OPENCODE_HEADER_KEYS) {
    const value = findHeader(clientHeaders, headerName);
    if (value) {
      headers[headerName] = value;
    }
  }

  // 2b. Forward agent-metadata headers (x-session-id, x-title) — 9router#2413
  for (const headerName of AGENT_METADATA_HEADER_KEYS) {
    const value = findHeader(clientHeaders, headerName);
    if (value) {
      headers[headerName] = value;
    }
  }

  // 3. OpencodeExecutor-only: synthesize session/request id from fallback headers
  if (options?.synthesizeRequestId && !headers["x-opencode-session"]) {
    const sessionAffinity =
      findHeader(clientHeaders, "x-session-affinity") || findHeader(clientHeaders, "x-session-id");
    if (sessionAffinity) {
      // Kept as-is here. When identity synthesis is on, applyCliDefaults renders it in the
      // canonical shape below; with the synthesis opted out this path stays byte-identical
      // to before, since opting out means no fabricated identity at all.
      headers["x-opencode-session"] = sessionAffinity;

      if (!headers["x-opencode-request"]) {
        headers["x-opencode-request"] = randomUUID();
      }
    }
  }

  // 4. OpencodeExecutor-only: synthesize the OpenCode CLI identity Cloudflare expects
  //    on VPS egress, for any key the client did not supply (#5997).
  if (options?.cliDefaults) {
    applyCliDefaults(headers, options.cliDefaults, options.sessionBody);
  }
}

/**
 * Fill the OpenCode CLI identity headers Cloudflare requires on VPS egress. For
 * x-opencode-* headers, client values always win (defaults only fill gaps). The
 * User-Agent is the exception: a non-CLI client UA (curl, python, SDKs) is replaced
 * with the synthesized CLI UA, because opencode.ai's free tier flags generic client
 * UAs from datacenter IPs (FreeUsageLimitError 429). A client UA that already looks
 * like the OpenCode CLI (opencode-cli/...) is preserved so the real CLI's versioned
 * identity stays intact. (#5997, follow-up)
 */
function applyCliDefaults(
  headers: Record<string, string>,
  cliDefaults: { userAgent: string; client: string; project: string },
  sessionBody?: {
    model?: string;
    system?: unknown;
    messages?: Array<{ role?: string; content?: unknown }>;
    input?: Array<{ role?: string; content?: unknown }>;
    tools?: Array<{ name?: string; function?: { name?: string } }>;
  }
): void {
  // A client User-Agent is kept only when it already satisfies the upstream contract.
  // The previous rule kept anything starting with `opencode-cli/`, which carries no
  // parsable version and is refused by the free tier.
  const existingUa = headers["User-Agent"] || headers["user-agent"];
  if (!satisfiesOpencodeUserAgentContract(existingUa)) {
    setUserAgentHeader(headers, cliDefaults.userAgent);
  }
  headers["x-opencode-client"] ||= cliDefaults.client;
  headers["x-opencode-project"] ||= cliDefaults.project;
  // Both ids go out in the canonical shape. A client value already in that shape is kept;
  // anything else (a UUID from a generic client, an opaque conversation key) is translated
  // deterministically, so one client conversation still maps to one upstream session.
  const clientRequestId = headers["x-opencode-request"]?.trim();
  headers["x-opencode-request"] =
    clientRequestId && OPENCODE_REQUEST_PATTERN.test(clientRequestId)
      ? clientRequestId
      : canonicalId("msg_", clientRequestId || undefined);
  const clientSessionId = headers["x-opencode-session"]?.trim();
  headers["x-opencode-session"] = clientSessionId
    ? OPENCODE_SESSION_PATTERN.test(clientSessionId)
      ? clientSessionId
      : canonicalId("ses_", clientSessionId)
    : canonicalId("ses_", generateSessionId(sessionBody ?? null) ?? undefined);
}
