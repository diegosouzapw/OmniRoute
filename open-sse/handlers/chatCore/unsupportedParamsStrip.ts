// open-sse/handlers/chatCore/unsupportedParamsStrip.ts
// Extracted from handleChatCore (chatCore god-file decomposition) so the
// unsupported-params strip + tool-history flattening can be unit tested
// directly instead of only through the full handleChatCore pipeline.
//
// Live incident: AI Horde (registry unsupportedParams: ["tools", ...]) 500'd
// on real combo traffic even after `tools`/`tool_choice` were correctly
// stripped from the live request, because the conversation HISTORY still
// carried a prior turn's role:"assistant" tool_calls and role:"tool" result
// messages (left over from before the combo failed over from a tool-capable
// model). AI Horde's raw completion backend doesn't understand those message
// shapes at all, regardless of whether live `tools` is present. flattenToolHistory
// already existed, fully unit-tested, for exactly this — it just had zero call
// sites anywhere in the request pipeline.
import { flattenToolHistory } from "../../utils/flattenToolHistory.ts";

export interface UnsupportedParamsStripResult {
  strippedParams: string[];
}

/**
 * Deletes each unsupported param present on `body` (mutates in place, matching
 * the original inline behavior). When "tools" was stripped, also flattens any
 * tool_calls/tool-result messages in `body.messages` into plain assistant
 * prose — leftover history from a target the combo failed over from.
 */
export function stripUnsupportedParams(
  body: Record<string, unknown>,
  unsupported: readonly string[]
): UnsupportedParamsStripResult {
  const strippedParams: string[] = [];
  for (const param of unsupported) {
    if (Object.hasOwn(body, param)) {
      strippedParams.push(param);
      delete body[param];
    }
  }

  if (strippedParams.includes("tools") && Array.isArray(body.messages)) {
    body.messages = flattenToolHistory(body.messages as Record<string, unknown>[]);
  }

  return { strippedParams };
}
