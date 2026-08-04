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
 * the original inline behavior). When "tools" is unsupported for this model —
 * regardless of whether THIS particular request happens to carry a live
 * `tools` array — also flattens any tool_calls/tool-result messages in
 * `body.messages` into plain assistant prose. A model that can't do tool
 * calling can't do it whether or not the current request includes `tools`;
 * gating on "was tools actually present this time" missed the common case of
 * stale tool-call history left over from before a combo failover, with no
 * live `tools` param on the request that inherited it.
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

  if (unsupported.includes("tools") && Array.isArray(body.messages)) {
    body.messages = flattenToolHistory(body.messages as Record<string, unknown>[]);
  }

  return { strippedParams };
}
