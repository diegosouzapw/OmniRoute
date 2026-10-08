import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

import {
  buildAssistantMessageCacheKey,
  cacheReasoning,
  cacheReasoningByKey,
  cacheReasoningFromAssistantMessage,
  clearReasoningCacheAll,
  getReasoningCacheServiceStats,
  lookupReasoning,
} from "../../open-sse/services/reasoningCache.ts";
import { FORMATS } from "../../open-sse/translator/formats.ts";
import { translateRequest } from "../../open-sse/translator/index.ts";

process.env.DATA_DIR = mkdtempSync(join(tmpdir(), "omniroute-video-reasoning-"));
process.env.API_KEY_SECRET ||= "reasoning-cache-video-test-secret";

describe("Reasoning Replay Cache — video transcript retention", () => {
  it("never caches reasoning echoed by a transcript-observed response", () => {
    clearReasoningCacheAll();
    const context = { videoTranscriptSensitive: true };
    const cached = cacheReasoningFromAssistantMessage(
      {
        role: "assistant",
        reasoning_content: "PRIVATE_REASONING_CACHE_TRANSCRIPT_SENTINEL",
        tool_calls: [{ id: "call_private_video_reasoning" }],
      },
      "deepseek",
      "deepseek-reasoner",
      context
    );
    assert.equal(cached, 0);
    assert.equal(lookupReasoning("call_private_video_reasoning"), null);
  });

  it("does not replay a previously cached transcript into observed video requests", () => {
    clearReasoningCacheAll();
    const callId = "call_private_video_replay";
    const cached = "PRIVATE_VIDEO_REPLAY_SENTINEL";
    cacheReasoning(callId, "deepseek", "deepseek-v4-flash", cached);

    const input = {
      messages: [
        { role: "user", content: "describe this video" },
        {
          role: "assistant",
          content: null,
          tool_calls: [
            { id: callId, type: "function", function: { name: "read_file", arguments: "{}" } },
          ],
        },
        { role: "tool", tool_call_id: callId, content: "file data" },
      ],
    };

    for (const target of [FORMATS.OPENAI, FORMATS.OPENAI_RESPONSES]) {
      const result = translateRequest(
        FORMATS.OPENAI,
        target,
        "deepseek-v4-flash",
        structuredClone(input),
        false,
        null,
        "deepseek",
        null,
        { videoTranscriptSensitive: true }
      );
      assert.equal(JSON.stringify(result).includes(cached), false, `${target} should not replay`);
    }

    const claude = translateRequest(
      FORMATS.OPENAI,
      FORMATS.CLAUDE,
      "k3-256k",
      {
        reasoning_effort: "high",
        messages: [
          { role: "user", content: "describe this video" },
          {
            role: "assistant",
            content: [{ type: "tool_use", id: callId, name: "read_file", input: { path: "file" } }],
          },
          { role: "tool", tool_call_id: callId, content: "file data" },
        ],
      },
      false,
      null,
      "kimi-coding-apikey",
      null,
      { videoTranscriptSensitive: true }
    );
    assert.equal(JSON.stringify(claude).includes(cached), false, "Claude should not replay");

    const scope = "api-key:test:video-replay";
    const messages = [
      { role: "user", content: "describe this video" },
      { role: "assistant", content: "A brief scene description" },
      { role: "user", content: "continue" },
    ];
    cacheReasoningByKey(
      buildAssistantMessageCacheKey(scope, messages, 1),
      "deepseek",
      "deepseek-v4-flash",
      cached
    );
    const plain = translateRequest(
      FORMATS.OPENAI,
      FORMATS.OPENAI,
      "deepseek-v4-flash",
      { messages },
      false,
      null,
      "deepseek",
      null,
      { reasoningCacheScope: scope, videoTranscriptSensitive: true }
    );
    assert.equal(JSON.stringify(plain).includes(cached), false, "plain turn should not replay");
    assert.equal(getReasoningCacheServiceStats().replays, 0);
  });
});
