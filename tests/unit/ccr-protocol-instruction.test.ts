/**
 * TDD tests for the CCR retrieve-protocol instruction injection (#8033).
 * Run: node --import tsx/esm --test tests/unit/ccr-protocol-instruction.test.ts
 *
 * The CCR engine replaces large blocks of text with a bare
 * `[CCR retrieve hash=<24hex> chars=N]` marker that the model has never been
 * taught to act on. This suite verifies the injected system-note instruction:
 * present exactly once for MCP-capable callers, absent for plain callers.
 */

import { describe, it, before } from "node:test";
import assert from "node:assert/strict";

import { ccrEngine, resetCcrStore } from "../../open-sse/services/compression/engines/ccr/index.ts";
import {
  CCR_PROTOCOL_MARKER_SENTINEL,
  callerSupportsCcrRetrieve,
  injectCcrProtocolInstruction,
} from "../../open-sse/services/compression/engines/ccr/protocolInstruction.ts";
import {
  registerBuiltinCompressionEngines,
  getCompressionEngine,
} from "../../open-sse/services/compression/index.ts";

// ─── helpers ──────────────────────────────────────────────────────────────────

const LARGE_TEXT = `This is a large block of content that should trigger CCR compression.
It contains multiple lines and substantial text.
The CCR engine compresses large contiguous blocks of text.
Replacing them with a content-addressed retrieve marker.
This allows the model to retrieve the verbatim content on demand.
Using the retrieve MCP tool with the hash from the marker.
The block must be large enough to exceed the minimum threshold.
Default minimum is 600 characters, so this block is crafted accordingly.
We need to be thorough and ensure the block is truly large enough.
This is line ten and still counting to make the block big enough.`;

const SMALL_TEXT = "Short content that should NOT be compressed.";

const RETRIEVE_TOOL_OPENAI = { type: "function", function: { name: "omniroute_ccr_retrieve" } };
const RETRIEVE_TOOL_FLAT = { name: "omniroute_ccr_retrieve" };
const RETRIEVE_TOOL_CLAUDE = { name: "omniroute_ccr_retrieve", input_schema: {} };

type Msg = { role: string; content: string };

function makeBody(messages: Msg[], tools?: unknown[]): Record<string, unknown> {
  const body: Record<string, unknown> = { model: "gpt-4", messages };
  if (tools) body["tools"] = tools;
  return body;
}

// ─── tests ────────────────────────────────────────────────────────────────────

describe("ccr protocol instruction (#8033)", () => {
  before(() => {
    resetCcrStore();
    registerBuiltinCompressionEngines();
  });

  it("is registered and retrievable by id", () => {
    const engine = getCompressionEngine("ccr");
    assert.ok(engine, "getCompressionEngine('ccr') must return the engine");
  });

  it("MCP-capable caller + a replaced block → instruction present exactly once as a leading system message", () => {
    resetCcrStore();
    const body = makeBody([{ role: "user", content: LARGE_TEXT }], [RETRIEVE_TOOL_OPENAI]);
    const result = ccrEngine.apply(body);

    assert.equal(result.compressed, true, "large block should compress");
    const messages = result.body["messages"] as Array<{ role: string; content: unknown }>;

    assert.equal(messages[0].role, "system", "instruction must be a leading system message");
    assert.ok(
      typeof messages[0].content === "string" &&
        messages[0].content.startsWith(CCR_PROTOCOL_MARKER_SENTINEL),
      "leading system message must start with the CCR protocol sentinel"
    );

    const occurrences = messages.filter(
      (m) => typeof m.content === "string" && m.content.includes(CCR_PROTOCOL_MARKER_SENTINEL)
    );
    assert.equal(occurrences.length, 1, "instruction must be present exactly once");
  });

  it("plain OpenAI-compatible caller (no tools) → NO instruction at all", () => {
    resetCcrStore();
    const body = makeBody([{ role: "user", content: LARGE_TEXT }]);
    const result = ccrEngine.apply(body);

    assert.equal(result.compressed, true, "large block should still compress");
    const messages = result.body["messages"] as Array<{ role: string; content: unknown }>;

    assert.equal(messages.length, 1, "no system message should be injected");
    assert.ok(
      messages.every(
        (m) => typeof m.content !== "string" || !m.content.includes(CCR_PROTOCOL_MARKER_SENTINEL)
      ),
      "no message may contain the CCR protocol sentinel"
    );
  });

  it("caller with tools[] not advertising the retrieve tool → NO instruction", () => {
    resetCcrStore();
    const otherTool = { type: "function", function: { name: "some_other_tool" } };
    const body = makeBody([{ role: "user", content: LARGE_TEXT }], [otherTool]);
    const result = ccrEngine.apply(body);

    const messages = result.body["messages"] as Array<{ role: string; content: unknown }>;
    assert.equal(messages.length, 1, "no system message should be injected");
  });

  it("replacedCount === 0 → body untouched (no instruction, compressed:false)", () => {
    resetCcrStore();
    const body = makeBody([{ role: "user", content: SMALL_TEXT }], [RETRIEVE_TOOL_OPENAI]);
    const result = ccrEngine.apply(body);

    assert.equal(result.compressed, false, "small text should not compress");
    assert.equal(result.body, body, "body must be returned unchanged when nothing was replaced");
  });

  it("idempotency: a body whose history already carries the sentinel is not injected twice", () => {
    resetCcrStore();
    const alreadyInstructed: Msg = {
      role: "system",
      content: `${CCR_PROTOCOL_MARKER_SENTINEL} already told once`,
    };
    const body = makeBody(
      [alreadyInstructed, { role: "user", content: LARGE_TEXT }],
      [RETRIEVE_TOOL_OPENAI]
    );
    const result = ccrEngine.apply(body);

    const messages = result.body["messages"] as Array<{ role: string; content: unknown }>;
    const occurrences = messages.filter(
      (m) => typeof m.content === "string" && m.content.includes(CCR_PROTOCOL_MARKER_SENTINEL)
    );
    assert.equal(occurrences.length, 1, "sentinel must not be injected a second time");
  });

  it("instruction text contains the tool name, the marker shape, and the verbatim-24-char warning", () => {
    resetCcrStore();
    const body = makeBody([{ role: "user", content: LARGE_TEXT }], [RETRIEVE_TOOL_OPENAI]);
    const result = ccrEngine.apply(body);
    const messages = result.body["messages"] as Array<{ role: string; content: unknown }>;
    const instruction = messages[0].content as string;

    assert.ok(instruction.includes("omniroute_ccr_retrieve"), "must mention the tool name");
    assert.ok(
      instruction.includes("[CCR retrieve hash=<24hex> chars=N]"),
      "must show the marker shape"
    );
    assert.match(
      instruction,
      /verbatim|exact/i,
      "must stress verbatim/exact copying of the hash"
    );
    assert.match(instruction, /24/, "must mention the 24-character length of the hash");
    assert.ok(instruction.includes("dedup:ref"), "must mention the dedup:ref contract");
  });

  it("recognizes all three tools[] shapes: OpenAI nested, flat, Claude", () => {
    assert.equal(callerSupportsCcrRetrieve({ tools: [RETRIEVE_TOOL_OPENAI] }), true, "OpenAI nested shape");
    assert.equal(callerSupportsCcrRetrieve({ tools: [RETRIEVE_TOOL_FLAT] }), true, "flat shape");
    assert.equal(callerSupportsCcrRetrieve({ tools: [RETRIEVE_TOOL_CLAUDE] }), true, "Claude shape");
    assert.equal(callerSupportsCcrRetrieve({ tools: [] }), false, "empty tools array");
    assert.equal(callerSupportsCcrRetrieve({}), false, "absent tools field");
    assert.equal(
      callerSupportsCcrRetrieve({ tools: "not-an-array" }),
      false,
      "non-array tools field"
    );
  });

  it("injectCcrProtocolInstruction is a pure helper usable directly", () => {
    const messages: Msg[] = [{ role: "user", content: "hi" }];
    const withInstruction = injectCcrProtocolInstruction(messages, { tools: [RETRIEVE_TOOL_FLAT] });
    assert.equal(withInstruction.length, 2);
    assert.equal(withInstruction[0].role, "system");

    const withoutInstruction = injectCcrProtocolInstruction(messages, {});
    assert.equal(withoutInstruction, messages, "unchanged reference when caller cannot retrieve");
  });
});
