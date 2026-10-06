/**
 * AI Horde key check. The OpenAI facade at oai.aihorde.net answers /v1/models
 * with 200 for any Bearer token, so the generic OpenAI-like probe always
 * reports a junk key as valid. Horde's own `GET /v2/find_user` is the
 * documented key lookup and returns 401/404 for unknown keys.
 */
import {
  AI_HORDE_ANONYMOUS_KEY,
  AI_HORDE_API_BASE,
  AI_HORDE_CLIENT_AGENT,
} from "@omniroute/open-sse/services/aihordeImageCatalog.ts";
import { toValidationErrorResult, validationRead } from "./transport";

type HordeFetch = typeof validationRead;

export async function validateAiHordeProvider({
  apiKey,
  fetchImpl = validationRead,
}: {
  apiKey?: unknown;
  fetchImpl?: HordeFetch;
}) {
  const key = typeof apiKey === "string" ? apiKey.trim() : "";
  if (!key) {
    return { valid: true, error: null, method: "aihorde_anonymous" };
  }

  try {
    const response = await fetchImpl(`${AI_HORDE_API_BASE}/v2/find_user`, {
      method: "GET",
      headers: {
        apikey: key,
        Accept: "application/json",
        "Client-Agent": AI_HORDE_CLIENT_AGENT,
      },
    });

    if (response.status === 401 || response.status === 403 || response.status === 404) {
      return { valid: false, error: "Invalid API key" };
    }

    if (!response.ok) {
      return { valid: false, error: `Horde validation failed (${response.status})` };
    }

    const body = await response.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return { valid: false, error: "Horde validation returned an unexpected body" };
    }
    const username = (body as { username?: unknown }).username;
    if (typeof username !== "string" || !username.trim()) {
      return { valid: false, error: "Invalid API key" };
    }

    return {
      valid: true,
      error: null,
      method: key === AI_HORDE_ANONYMOUS_KEY ? "aihorde_anonymous" : "aihorde_find_user",
    };
  } catch (error) {
    return toValidationErrorResult(error);
  }
}
