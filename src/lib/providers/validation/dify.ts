/**
 * Dify key check. Dify (multi-app LLM "LLMOps" platform) does NOT expose an
 * OpenAI-compatible HTTP API. Its native completion endpoint is
 * `POST {base}/v1/chat-messages` (body `inputs`/`query`/`response_mode`/`user`
 * — no `model`/`messages` envelope). There is no `/v1/models` listing, so the
 * generic OpenAI-like probe (GET /v1/models → POST /v1/chat/completions)
 * always 404s and every real Dify app key is misreported as
 * "Provider validation endpoint not supported" (#11002).
 *
 * Dify itself returns a clean 401 {"code":"unauthorized"} for a bad app key on
 * `/v1/chat-messages`, and 200 for a valid key, so a single POST there is the
 * correct auth probe.
 */
import { getRegistryEntry } from "@omniroute/open-sse/config/providerRegistry.ts";
import { normalizeBaseUrl } from "./urlHelpers";
import { toValidationErrorResult, validationWrite } from "./transport";

/**
 * Shape a provider/connection base URL into the Dify native completion route.
 * Accepts the cloud root (`https://api.dify.ai`), a `/v1` root, or a full
 * `/v1/chat-messages` URL (e.g. a self-hosted instance) and always returns
 * `{base}/v1/chat-messages`.
 */
export function resolveDifyChatMessagesUrl(baseUrl: string) {
  const normalized = normalizeBaseUrl(baseUrl);
  if (!normalized) return "";
  const cleaned = normalized.replace(/\/chat-messages$/, "").replace(/\/v1$/, "");
  return `${cleaned}/v1/chat-messages`;
}

/** Pure status→verdict mapping, unit-testable without network. */
export function difyValidationResultFromStatus(status: number) {
  if (status === 401 || status === 403) {
    return { valid: false, error: "Invalid API key" };
  }
  if (status >= 200 && status < 300) {
    return { valid: true, error: null };
  }
  return { valid: false, error: `Dify validation failed (${status})` };
}

export async function validateDifyProvider({
  apiKey,
  providerSpecificData = {},
  fetchImpl = validationWrite,
}: {
  apiKey?: unknown;
  providerSpecificData?: Record<string, unknown>;
  fetchImpl?: typeof validationWrite;
}) {
  const key = typeof apiKey === "string" ? apiKey.trim() : "";
  if (!key) {
    return { valid: false, error: "API key required" };
  }

  const specificBase =
    typeof providerSpecificData?.baseUrl === "string" ? providerSpecificData.baseUrl.trim() : "";
  const entryBase = (getRegistryEntry("dify")?.baseUrl as string) || "";
  const probeUrl = resolveDifyChatMessagesUrl(specificBase || entryBase);
  if (!probeUrl) {
    return { valid: false, error: "Dify requires a Base URL" };
  }

  try {
    const response = await fetchImpl(
      probeUrl,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${key}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs: {},
          query: "ping",
          response_mode: "blocking",
          user: "omniroute-key-check",
        }),
      },
      false
    );
    return difyValidationResultFromStatus(response.status);
  } catch (error) {
    return toValidationErrorResult(error);
  }
}