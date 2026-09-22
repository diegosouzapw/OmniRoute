// Regression: CCR must not replace content with retrieve markers for callers
// that cannot resolve them.
//
// `omniroute_ccr_retrieve` is only exposed through OmniRoute's own MCP server.
// A plain OpenAI-compatible / Anthropic-shaped request (GLM provider, OpenCode,
// Claude Code in openai-compatible mode, ...) carries no such tool, so every
// `[CCR retrieve hash=... chars=N]` marker is permanently unreachable from the
// model's point of view. With the stacked pipeline (session-dedup → ccr → lite)
// the model received a context of markers and preambles and answered
// "в вашем сообщении нет задачи" (empty-context report).
//
// Contract (supersedes the #7746 200-char preamble band-aid): the CCR engine
// only replaces blocks when the caller advertises the retrieve tool; otherwise
// the body passes through unchanged.
//
// Run: node --import tsx/esm --test tests/unit/compression/ccr-non-mcp-caller-no-markers.test.ts
import { describe, it, before } from "node:test";
import assert from "node:assert/strict";
import {
  ccrEngine,
  resetCcrStore,
} from "../../../open-sse/services/compression/engines/ccr/index.ts";
import { sessionDedupEngine } from "../../../open-sse/services/compression/engines/session-dedup/index.ts";

const BIG_PROMPT = `${"Context padding line.\n".repeat(50)}Проверь, что у нас с адаптивами под разные мобильные устройства`;
const RETRIEVE_TOOL = { type: "function", function: { name: "omniroute_ccr_retrieve" } };

function makeBody(withTool: boolean) {
  const body: Record<string, unknown> = {
    model: "glm-5.3-flash",
    messages: [
      { role: "system", content: "You are Claude Code.\n".repeat(60) },
      { role: "user", content: BIG_PROMPT },
    ],
    stream: true,
  };
  if (withTool) body.tools = [RETRIEVE_TOOL];
  return body;
}

describe("CCR — no replacement for callers that cannot resolve markers", () => {
  before(() => {
    resetCcrStore();
  });

  it("leaves the body untouched when the retrieve tool is not advertised", () => {
    resetCcrStore();
    const body = makeBody(false);
    const result = ccrEngine.apply(body, { stepConfig: {} });

    assert.equal(result.compressed, false, "non-MCP caller must not be marker-compressed");
    const messages = result.body.messages as Array<{ role: string; content: string }>;
    assert.equal(messages[1].content, BIG_PROMPT, "user content must survive verbatim");
    assert.equal(
      JSON.stringify(result.body).includes("[CCR retrieve hash="),
      false,
      "no marker may reach a caller without the retrieve tool"
    );
  });

  it("still replaces blocks when the caller advertises omniroute_ccr_retrieve", () => {
    resetCcrStore();
    const body = makeBody(true);
    const result = ccrEngine.apply(body, { stepConfig: {} });

    assert.equal(result.compressed, true, "MCP-capable caller keeps the CCR savings");
    const messages = result.body.messages as Array<{ role: string; content: string }>;
    const userContent = messages.find((m) => m.role === "user")?.content ?? "";
    assert.match(userContent, /\[CCR retrieve hash=[0-9a-f]{24} chars=\d+\]/);
  });

  it("session-dedup fuzzy pass does not emit bare markers for non-MCP callers", () => {
    resetCcrStore();
    const body: Record<string, unknown> = {
      model: "glm-5.3-flash",
      messages: [
        { role: "user", content: BIG_PROMPT },
        { role: "user", content: `${BIG_PROMPT} (retried)` },
      ],
    };
    const result = sessionDedupEngine.apply(body, {
      stepConfig: { fuzzy: { enabled: true } },
    });

    const messages = result.body.messages as Array<{ role: string; content: string }>;
    const markerReachedModel = messages.some(
      (m) => typeof m.content === "string" && m.content.includes("[CCR retrieve hash=")
    );
    assert.equal(
      markerReachedModel,
      false,
      "fuzzy pass must not leave CCR markers for a caller without the retrieve tool"
    );
  });
});
