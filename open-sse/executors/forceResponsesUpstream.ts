import { getOpenAICompatibleType } from "../services/provider.ts";

/**
 * Force OpenAI-compatible upstreams onto the native `/responses` endpoint.
 *
 * A Responses-API-shaped request (`input` / `previous_response_id` /
 * `max_output_tokens` / `reasoning`) that carries MCP (`namespace`) or
 * `tool_search*` tools loses the Codex deferred tool-discovery mechanism when
 * OmniRoute downgrades it to `/chat/completions` — so the MCP namespaces never
 * surface to the model and `apply_patch` is mis-handled (#5483). Detecting that
 * shape lets the executor pass it through natively instead of downgrading.
 */

type CredentialsLike = { providerSpecificData?: Record<string, unknown> | null };

function isRecord(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === "object" && !Array.isArray(value);
}

export function shouldForceResponsesUpstream(
  provider: string,
  body: unknown,
  credentials: CredentialsLike | null
): boolean {
  if (!provider.startsWith("openai-compatible-")) return false;
  if (!isRecord(body)) return false;

  const providerSpecificData = credentials?.providerSpecificData ?? null;
  if (providerSpecificData?._omnirouteForceResponsesUpstream === true) return true;
  if (getOpenAICompatibleType(provider, providerSpecificData) === "responses") return false;

  const hasResponsesShape =
    body.input !== undefined ||
    body.previous_response_id !== undefined ||
    body.max_output_tokens !== undefined ||
    body.reasoning !== undefined;
  if (!hasResponsesShape) return false;

  const tools = Array.isArray(body.tools) ? body.tools : [];
  return tools.some((toolValue) => {
    if (!isRecord(toolValue)) return false;
    const toolType = typeof toolValue.type === "string" ? toolValue.type : "";
    return toolType === "namespace" || /^tool_search/.test(toolType);
  });
}

export function withForcedResponsesUpstream<T extends CredentialsLike>(
  provider: string,
  body: unknown,
  credentials: T
): T {
  if (!shouldForceResponsesUpstream(provider, body, credentials)) return credentials;
  return {
    ...credentials,
    providerSpecificData: {
      ...credentials.providerSpecificData,
      _omnirouteForceResponsesUpstream: true,
    },
  } as T;
}
