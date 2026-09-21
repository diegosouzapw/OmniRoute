import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  FORWARDABLE_CLIENT_BETAS,
  mergeClientAnthropicBeta,
} from "../../open-sse/config/anthropicHeaders.ts";
import { selectBetaFlags } from "../../open-sse/executors/claudeIdentity.ts";

describe("Claude inline-tools-2026-09-15 beta forwarding", () => {
  it("includes inline-tools-2026-09-15 in FORWARDABLE_CLIENT_BETAS", () => {
    assert.ok(FORWARDABLE_CLIENT_BETAS.includes("inline-tools-2026-09-15"));
  });

  it("mergeClientAnthropicBeta forwards inline-tools-2026-09-15 when client negotiates it", () => {
    const merged = mergeClientAnthropicBeta("oauth-2025-04-20", "inline-tools-2026-09-15");
    assert.ok(merged.includes("inline-tools-2026-09-15"));
  });

  it("selectBetaFlags adds inline-tools-2026-09-15 when messages contain tool_removal block", () => {
    const flags = selectBetaFlags({
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: "hello" },
            { type: "tool_removal", tool_name: "test_tool" },
          ],
        },
      ],
    });
    assert.ok(flags.includes("inline-tools-2026-09-15"));
  });

  // Live 400 from Anthropic (2026-09-21, key "Ebrahim Claude"):
  //   messages.1.content.1: `tool_addition` blocks require anthropic-beta: inline-tools-2026-09-15
  // Claude Code emits tool_addition as well as tool_removal; detecting only the
  // latter left tool_addition-only requests without the beta.
  it("selectBetaFlags adds inline-tools-2026-09-15 when messages contain tool_addition block", () => {
    const flags = selectBetaFlags({
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: "hello" },
            { type: "tool_addition", tool_name: "test_tool" },
          ],
        },
      ],
    });
    assert.ok(flags.includes("inline-tools-2026-09-15"));
  });

  it("selectBetaFlags adds the beta for a tool_addition block in any message position", () => {
    const flags = selectBetaFlags({
      messages: [
        { role: "user", content: [{ type: "text", text: "first" }] },
        {
          role: "assistant",
          content: [{ type: "tool_addition", tool_name: "late_tool" }],
        },
      ],
    });
    assert.ok(flags.includes("inline-tools-2026-09-15"));
  });

  it("selectBetaFlags omits inline-tools-2026-09-15 when no inline-tool block is present", () => {
    const flags = selectBetaFlags({
      messages: [{ role: "user", content: [{ type: "text", text: "plain" }] }],
    });
    assert.ok(!flags.includes("inline-tools-2026-09-15"));
  });

  it("selectBetaFlags preserves inline-tools-2026-09-15 from clientBeta", () => {
    const flags = selectBetaFlags({}, "claude-opus-5", "inline-tools-2026-09-15");
    assert.ok(flags.includes("inline-tools-2026-09-15"));
  });
});
