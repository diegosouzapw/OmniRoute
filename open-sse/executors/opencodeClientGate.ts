import type { ExecutorExecuteResult } from "./base.ts";
import { buildErrorBody } from "../utils/error.ts";

/**
 * Session headers naming the OpenCode client conversation. The live client
 * sends `x-opencode-session` (verified in the shipped `opencode-ai` binary:
 * its upstream header set is exactly `x-opencode-session`, `-request`,
 * `-project`, `-client` — no `-id` suffixed variant exists). The `-id` form
 * is accepted as an alias because the spec names it; the gate reads both.
 */
export const OPENCODE_PASSTHROUGH_SESSION_HEADER = "x-opencode-session";
export const OPENCODE_PASSTHROUGH_SESSION_HEADER_ALIAS = "x-opencode-session-id";

/** User-Agent prefix carried by the OpenCode client, followed by its version. */
const OPENCODE_CLIENT_USER_AGENT_RE = /^opencode\/\S+/i;

type HeaderBag = Record<string, string> | Record<string, unknown> | Headers | null | undefined;

function readHeader(clientHeaders: HeaderBag, name: string): string | null {
  if (!clientHeaders || typeof clientHeaders !== "object") return null;
  if (typeof (clientHeaders as Headers).forEach === "function" && typeof Headers !== "undefined") {
    let found: string | null = null;
    (clientHeaders as Headers).forEach((value, key) => {
      if (found === null && key.toLowerCase() === name.toLowerCase()) found = value;
    });
    return found;
  }
  const wanted = name.toLowerCase();
  for (const [key, value] of Object.entries(clientHeaders)) {
    if (key.toLowerCase() === wanted && typeof value === "string") return value;
  }
  return null;
}

/**
 * Whether the caller presents the OpenCode client identity: a versioned
 * `opencode/<version>` User-Agent AND a non-empty session header (live
 * `x-opencode-session`, or the spec-named `x-opencode-session-id` alias).
 * Both halves are required — either half alone is refused. The signal is
 * falsifiable by design: the gate never fabricates an identity, it only
 * refuses to fabricate one for callers that do not present it.
 */
export function isOpencodePassthroughClient(
  clientHeaders: HeaderBag,
  userAgent?: string | null
): boolean {
  const headerAgent = readHeader(clientHeaders, "user-agent");
  const agent = (headerAgent ?? userAgent ?? "").trim();
  if (!OPENCODE_CLIENT_USER_AGENT_RE.test(agent)) return false;
  const sessionId =
    readHeader(clientHeaders, OPENCODE_PASSTHROUGH_SESSION_HEADER) ??
    readHeader(clientHeaders, OPENCODE_PASSTHROUGH_SESSION_HEADER_ALIAS);
  return typeof sessionId === "string" && sessionId.trim().length > 0;
}

/**
 * Refusal for callers without the OpenCode client identity on the no-auth
 * `oc` provider: a 403 JSON body in the shared error shape, returned before
 * any upstream call or account selection.
 */
export function buildNonClientRefusal(): ExecutorExecuteResult {
  const body = buildErrorBody(
    403,
    "OpenCode's free tier can only be used from within OpenCode " +
      "(opencode/<version> with x-opencode-session-id) — " +
      "requests without an OpenCode client identity are refused " +
      "with 403 and never reach upstream.",
    undefined,
    { type: "FreeTierError", code: "FreeTierError" }
  );
  return {
    response: new Response(JSON.stringify(body), {
      status: 403,
      headers: { "Content-Type": "application/json" },
    }),
    url: "",
    headers: {} as Record<string, string>,
    transformedBody: null,
  };
}
