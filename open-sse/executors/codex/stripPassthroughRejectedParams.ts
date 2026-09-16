// Strip fields Codex /responses rejects with 400 "Unsupported parameter"
// BEFORE native passthrough returns (the Responses allowlist never runs on
// that path). Extracted from CodexExecutor.transformRequest so codex.ts stays
// under its frozen file-size cap.
//
// Client-only (#3317): prompt_cache_retention, safety_identifier, user.
// The chat-completions path already removes these (base.ts prompt_cache_retention
// #1884; openai-responses translator safety_identifier #2770), but the
// responses->responses passthrough skips translation. `user` is always rejected
// by Codex /responses, so it is removed unconditionally (unlike base.ts, which
// only drops it when empty).
//
// Sampling: temperature, top_p — FastAPI `{"detail":"Unsupported parameter:
// temperature"}`. Combo codex-review forwarded client temperature onto
// gpt-5.6-sol-xhigh / gpt-5.6-luna-max.

import { stripUnsupportedParams } from "../../translator/paramSupport.ts";

export function stripCodexPassthroughRejectedParams(
  model: string,
  body: Record<string, unknown>
): void {
  delete body.prompt_cache_retention;
  delete body.safety_identifier;
  delete body.user;
  stripUnsupportedParams("codex", model, body);
}
