/**
 * chatCore request endpoint/format resolvers (Quality Gate v2 / Fase 9 — chatCore god-file
 * decomposition, #3501).
 *
 * Pure slice of handleChatCore's request-setup phase: derives the wire-format facts of an inbound
 * request from its endpoint, body, provider, and user-agent — the source format, whether it targets
 * the Responses endpoint, native-Codex passthrough eligibility, Droid CLI / Copilot detection, and
 * the effective client response format (an OpenAI Responses shape off a non-/responses, non-Droid
 * endpoint collapses back to plain OpenAI). Side-effect-free; behaviour is byte-identical to the
 * previous inline block. Sits alongside resolveChatCoreRequestSetup as the request-setup phase grows.
 */

import { detectFormatFromEndpoint } from "../../services/provider.ts";
import { shouldUseNativeCodexPassthrough } from "./passthroughHelpers.ts";
import { FORMATS } from "../../translator/formats.ts";

/** True when the request originates from a Copilot client (matched by user-agent or any header). */
function isCopilotClient(
  headers: Headers | Record<string, unknown> | null | undefined,
  userAgent?: string | null
) {
  const isMatch = (value: unknown) =>
    typeof value === "string" && value.toLowerCase().includes("copilot");

  if (isMatch(userAgent)) return true;

  if (headers instanceof Headers) {
    for (const [key, value] of headers as unknown as Iterable<[string, string]>) {
      if (isMatch(key) || isMatch(value)) return true;
    }
  } else if (headers && typeof headers === "object") {
    for (const [key, value] of Object.entries(headers)) {
      if (isMatch(key) || isMatch(value)) return true;
    }
  }

  return false;
}

function isOpencodeClient(
  headers: Headers | Record<string, unknown> | null | undefined,
  userAgent?: string | null
): boolean {
  const matchesUserAgent = (value: unknown) =>
    typeof value === "string" && value.toLowerCase().includes("opencode");
  const matchesHeaderKey = (key: string) => key.toLowerCase().startsWith("x-opencode-");

  if (matchesUserAgent(userAgent)) return true;

  if (headers instanceof Headers) {
    for (const [key, value] of headers as unknown as Iterable<[string, string]>) {
      if (matchesHeaderKey(key) || (key.toLowerCase() === "user-agent" && matchesUserAgent(value))) {
        return true;
      }
    }
  } else if (headers && typeof headers === "object") {
    for (const [key, value] of Object.entries(headers)) {
      if (matchesHeaderKey(key) || (key.toLowerCase() === "user-agent" && matchesUserAgent(value))) {
        return true;
      }
    }
  }

  return false;
}

/**
 * Resolve the per-request endpoint/format facts at the top of handleChatCore. Pure: a function of
 * the inbound endpoint, the (possibly already-mutated) body, the resolved provider, and the
 * user-agent.
 */
export function resolveChatCoreRequestFormat(opts: {
  clientRawRequest:
    | { endpoint?: unknown; headers?: Headers | Record<string, unknown> | null }
    | null
    | undefined;
  body: unknown;
  provider: string | null | undefined;
  userAgent: string | null | undefined;
}) {
  const { clientRawRequest, body, provider, userAgent } = opts;
  const endpointPath = String(clientRawRequest?.endpoint || "");
  const sourceFormat = detectFormatFromEndpoint(body, endpointPath);
  const isResponsesEndpoint =
    /\/responses(?=\/|$)/i.test(endpointPath) || /^responses(?=\/|$)/i.test(endpointPath);
  const nativeCodexPassthrough = shouldUseNativeCodexPassthrough({
    provider,
    sourceFormat,
    endpointPath,
  });
  const isDroidCLI =
    userAgent?.toLowerCase().includes("droid") || userAgent?.toLowerCase().includes("codex-cli");
  const copilotCompatibleReasoning = isCopilotClient(clientRawRequest?.headers, userAgent);
  const isOpencodeClientRequest = isOpencodeClient(clientRawRequest?.headers, userAgent);
  const clientResponseFormat =
    sourceFormat === FORMATS.OPENAI_RESPONSES && !isResponsesEndpoint && !isDroidCLI
      ? FORMATS.OPENAI
      : sourceFormat;
  return {
    endpointPath,
    sourceFormat,
    isResponsesEndpoint,
    nativeCodexPassthrough,
    isDroidCLI,
    copilotCompatibleReasoning,
    isOpencodeClient: isOpencodeClientRequest,
    clientResponseFormat,
  };
}

export type ChatCoreRequestFormat = ReturnType<typeof resolveChatCoreRequestFormat>;
