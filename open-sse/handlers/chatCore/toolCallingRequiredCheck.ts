// open-sse/handlers/chatCore/toolCallingRequiredCheck.ts
// Extracted from handleChatCore (chatCore god-file decomposition).
//
// Combo requests are protected from ever reaching a tool-incapable target in
// the first place by filterTargetsByRequestCompatibility (comboStructure.ts,
// backed by getResolvedModelCapabilities' toolCalling resolution). But a
// direct/pinned request (isCombo: false) has no other target to fail over
// to — silently stripping `tools` and flattening history there produces a
// 200 response that can never actually call anything (the model narrates a
// fake action instead, live incident: AI Horde/Behemoth-X-123B). A clear,
// explicit error is better than a response that looks successful but
// silently drops the client's intended action.

export interface ToolCallingRequiredCheckResult {
  blocked: boolean;
  message?: string;
}

export function checkToolCallingRequiredButUnsupported(
  body: Record<string, unknown>,
  unsupported: readonly string[],
  isCombo: boolean,
  model: string
): ToolCallingRequiredCheckResult {
  if (isCombo) return { blocked: false };
  if (!unsupported.includes("tools")) return { blocked: false };
  if (!Array.isArray(body.tools) || body.tools.length === 0) return { blocked: false };

  return {
    blocked: true,
    message: `Model "${model}" does not support tool calling. Remove "tools" from the request or choose a different model.`,
  };
}
