import { randomUUID } from "crypto";
import { setUserAgentHeader } from "../executors/base.ts";
import { generateSessionId } from "../services/sessionManager.ts";

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
 *   conversation-stable session fingerprint (model, system, messages, tools).
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
      headers["x-opencode-session"] = sessionAffinity;
    } else {
      // 2026-09-06 upstream enforcement: opencode.ai errors on requests missing
      // x-opencode-session. A client that sends no session-ish header at all
      // gets a conversation-stable fingerprint (model, system, first user
      // message, tools) so consecutive agent turns share one session and
      // upstream prompt caching hits; a body-less request falls back to a
      // random UUID (same behavior as the #5997 CLI-identity synth).
      headers["x-opencode-session"] =
        generateSessionId(options.sessionBody ?? null) || randomUUID();
    }
    if (!headers["x-opencode-request"]) {
      headers["x-opencode-request"] = randomUUID();
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
    tools?: Array<{ name?: string; function?: { name?: string } }>;
  }
): void {
  const existingUa = headers["User-Agent"] || headers["user-agent"];
  const clientUaIsCliLike =
    typeof existingUa === "string" && /^opencode-cli\//i.test(existingUa.trim());
  if (!clientUaIsCliLike) {
    setUserAgentHeader(headers, cliDefaults.userAgent);
  }
  headers["x-opencode-client"] ||= cliDefaults.client;
  headers["x-opencode-project"] ||= cliDefaults.project;
  headers["x-opencode-request"] ||= randomUUID();
  headers["x-opencode-session"] ||= generateSessionId(sessionBody ?? null) || randomUUID();
}
