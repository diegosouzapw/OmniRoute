import { FORMATS } from "../../translator/formats.ts";
import { sanitizeKiroTools } from "../../utils/kiroSanitizer.ts";
import { normalizeClaudeToolsForDispatch } from "./claudeToolDefaults.ts";
import { buildClaudePassthroughToolNameMap } from "./passthroughToolNames.ts";
import { applyResponsesPreviousResponseIdPolicy } from "../../utils/responsesStatePolicy.ts";

import { extractRequestToolMetadata, resolveResponseToolNameMap } from "./requestToolIdentity.ts";

export async function finalizeTranslatedRequest(input: { translatedBody: Record<string, any>; targetFormat: string; provider?: string | null; effectiveModel: unknown; isClaudePassthrough: boolean; credentials?: Record<string, unknown> | null; body: Record<string, unknown>; settings: Record<string, any>; alias?: string | null; sourceFormat: string; }) {
  const { targetFormat, provider, effectiveModel, isClaudePassthrough, credentials, body, settings, alias, sourceFormat } = input;
  let translatedBody = input.translatedBody;
  let finalModelToUpstream = effectiveModel;
    const { requestToolIdentityMap, toolNameAliasMap } = extractRequestToolMetadata(translatedBody);

  // Kiro: sanitize tool schemas before dispatch. Kiro returns 400 "Improperly
  // formed request" for unsupported JSON-Schema keywords (anyOf/$ref/if-then,
  // etc.) and tool names >64 chars. Strip those keys and hash-truncate long
  // names; merge the truncated→original nameMap into the existing
  // `_toolNameMap` so kiro-to-openai maps streamed tool-call names back (#1375).
  if (targetFormat === FORMATS.KIRO) {
    const kiroTools =
      translatedBody?.conversationState?.currentMessage?.userInputMessage?.userInputMessageContext
        ?.tools;
    if (kiroTools) {
      const { tools: sanitizedKiroTools, nameMap: kiroNameMap } = sanitizeKiroTools(kiroTools);
      translatedBody.conversationState.currentMessage.userInputMessage.userInputMessageContext.tools =
        sanitizedKiroTools;
      if (kiroNameMap.size > 0) {
        const existing =
          translatedBody._toolNameMap instanceof Map
            ? translatedBody._toolNameMap
            : new Map<string, string>();
        kiroNameMap.forEach((original: string, truncated: string) => existing.set(truncated, original));
        translatedBody._toolNameMap = existing;
      }
    }
  }

  // Claude: strict Anthropic-compatible gateways (e.g. MiniMax) reject tool
  // definitions that omit the required `type` discriminator with HTTP 400. Default
  // a missing `type` to "custom" before dispatch, mirroring Anthropic's own
  // inference, so legacy Claude-format tool payloads survive strict gateways (#2195).
  // AgentRouter is the opposite quirk: its Rust deserializer only accepts versioned
  // tool types and 400s on `type: "custom"` — there the discriminator is stripped
  // instead (see claudeToolDefaults.ts).
  if (targetFormat === FORMATS.CLAUDE && Array.isArray(translatedBody.tools)) {
    translatedBody.tools = normalizeClaudeToolsForDispatch(
      translatedBody.tools,
      provider ?? ""
    ) as typeof translatedBody.tools;
  }

  // Extract toolNameMap for response translation (Claude OAuth)
  const translatedToolNameMap = translatedBody._toolNameMap ?? toolNameAliasMap;
  const nativeClaudeToolNameMap = isClaudePassthrough
    ? buildClaudePassthroughToolNameMap(body)
    : null;
  // A later provider-specific ledger (Kiro above) wins; otherwise use the
  // alias map captured before extraction. Namespace identities are distinct
  // from aliases and cannot restore sanitized Gemini names on their own.
  const toolNameMap = resolveResponseToolNameMap(
    translatedToolNameMap,
    nativeClaudeToolNameMap,
    requestToolIdentityMap
  );
  delete translatedBody._toolNameMap;
  delete translatedBody._disableToolPrefix;

  // Update model in body — use resolved alias so the provider gets the correct model ID (#472)
  // Strip provider/alias prefix if it exactly matches the routing prefix so upstream receives the raw model name (#1261)
  // Defense-in-depth: only string-strip when effectiveModel is actually a string.
  // The API guards `model` via Zod (z.string()), but internal callers could pass a
  // non-string and a bare `.startsWith` would crash with `startsWith is not a
  // function` (same class as #2359 / #2463). Mirrors 9router's `?.startsWith?.()`.
  if (typeof finalModelToUpstream === "string") {
    if (provider && finalModelToUpstream.startsWith(`${provider}/`)) {
      finalModelToUpstream = finalModelToUpstream.slice(provider.length + 1);
    } else if (alias && finalModelToUpstream.startsWith(`${alias}/`)) {
      finalModelToUpstream = finalModelToUpstream.slice(alias.length + 1);
    }
  }
  translatedBody.model = finalModelToUpstream;

  const previousResponseIdPolicy = applyResponsesPreviousResponseIdPolicy(translatedBody, {
    mode: settings.responsesPreviousResponseIdMode,
    provider,
    sourceFormat,
    targetFormat,
    credentials,
  });
  translatedBody = previousResponseIdPolicy.body as typeof translatedBody;

  // #1789: Prevent output_config.effort from overriding effort encoded in model name (Codex)

  return { translatedBody, requestToolIdentityMap, toolNameAliasMap, translatedToolNameMap, nativeClaudeToolNameMap, toolNameMap, finalModelToUpstream };
}
