import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  readLifecycleEngine,
  extractInvocations,
  findSupersededReadCallIds,
} from "../../../open-sse/services/compression/engines/readLifecycle/index.ts";

// T08/H7 — read-lifecycle: collapse superseded file-Read tool results (opt-in, lossy).

const STUB_MARK = "read superseded";

function run(messages: unknown[], enabled = true) {
  return readLifecycleEngine.apply({ messages }, { stepConfig: { enabled } });
}

// ── Anthropic fixtures ──
const anthropicRead = (id: string, path: string) => ({
  role: "assistant",
  content: [{ type: "tool_use", id, name: "Read", input: { file_path: path } }],
});
const anthropicWrite = (id: string, path: string) => ({
  role: "assistant",
  content: [{ type: "tool_use", id, name: "Edit", input: { file_path: path } }],
});
const anthropicResult = (id: string, text: string) => ({
  role: "user",
  content: [{ type: "tool_result", tool_use_id: id, content: text }],
});
function anthropicResultText(msg: unknown, id: string): string | undefined {
  const blocks = (msg as { content?: unknown[] }).content;
  const b = Array.isArray(blocks)
    ? (blocks.find((x) => (x as { tool_use_id?: string }).tool_use_id === id) as
        { content?: string } | undefined)
    : undefined;
  return b?.content;
}

// ── OpenAI fixtures ──
const openaiRead = (id: string, path: string) => ({
  role: "assistant",
  tool_calls: [
    {
      id,
      type: "function",
      function: { name: "read_file", arguments: JSON.stringify({ file_path: path }) },
    },
  ],
});
const openaiResult = (id: string, text: string) => ({
  role: "tool",
  tool_call_id: id,
  content: text,
});

describe("read-lifecycle — pure analysis", () => {
  it("extracts invocations from both shapes", () => {
    const { invocations, readPathByCallId } = extractInvocations([
      anthropicRead("c1", "/a.ts"),
      openaiRead("c2", "/b.ts"),
    ]);
    assert.equal(invocations.length, 2);
    assert.equal(invocations[0].kind, "read");
    assert.equal(invocations[0].path, "/a.ts");
    assert.equal(readPathByCallId.get("c1"), "/a.ts");
    assert.equal(readPathByCallId.get("c2"), "/b.ts");
  });

  it("marks a read superseded by a later read of the same path", () => {
    const { invocations } = extractInvocations([
      anthropicRead("c1", "/a.ts"),
      anthropicRead("c2", "/a.ts"),
    ]);
    const s = findSupersededReadCallIds(invocations);
    assert.equal(s.has("c1"), true);
    assert.equal(s.has("c2"), false);
  });

  it("marks a read superseded by a later write of the same path", () => {
    const { invocations } = extractInvocations([
      anthropicRead("c1", "/a.ts"),
      anthropicWrite("w1", "/a.ts"),
    ]);
    const s = findSupersededReadCallIds(invocations);
    assert.equal(s.has("c1"), true);
    assert.equal(s.has("w1"), false); // writes are never collapsed
  });

  it("does not supersede reads of different paths", () => {
    const { invocations } = extractInvocations([
      anthropicRead("c1", "/a.ts"),
      anthropicRead("c2", "/b.ts"),
    ]);
    const s = findSupersededReadCallIds(invocations);
    assert.equal(s.size, 0);
  });
});

describe("read-lifecycle — engine integration", () => {
  it("collapses an earlier Anthropic read, keeping the latest intact", () => {
    const out = run([
      anthropicRead("c1", "/a.ts"),
      anthropicResult("c1", "OLD content of a.ts"),
      anthropicRead("c2", "/a.ts"),
      anthropicResult("c2", "NEW content of a.ts"),
    ]);
    assert.equal(out.compressed, true);
    const msgs = (out.body as { messages: unknown[] }).messages;
    assert.match(anthropicResultText(msgs[1], "c1") ?? "", new RegExp(STUB_MARK));
    assert.equal(anthropicResultText(msgs[3], "c2"), "NEW content of a.ts");
  });

  it("collapses a read superseded by a later write", () => {
    const out = run([
      anthropicRead("c1", "/a.ts"),
      anthropicResult("c1", "OLD"),
      anthropicWrite("w1", "/a.ts"),
      anthropicResult("w1", "edit applied"),
    ]);
    assert.equal(out.compressed, true);
    const msgs = (out.body as { messages: unknown[] }).messages;
    assert.match(anthropicResultText(msgs[1], "c1") ?? "", new RegExp(STUB_MARK));
    assert.equal(anthropicResultText(msgs[3], "w1"), "edit applied"); // write result untouched
  });

  it("collapses an earlier OpenAI read (role:tool message)", () => {
    const out = run([
      openaiRead("c1", "/a.ts"),
      openaiResult("c1", "OLD"),
      openaiRead("c2", "/a.ts"),
      openaiResult("c2", "NEW"),
    ]);
    assert.equal(out.compressed, true);
    const msgs = (out.body as { messages: Array<{ content?: string }> }).messages;
    assert.match(msgs[1].content ?? "", new RegExp(STUB_MARK));
    assert.equal(msgs[3].content, "NEW");
  });

  it("no-ops for a single read of a path", () => {
    const out = run([anthropicRead("c1", "/a.ts"), anthropicResult("c1", "only read")]);
    assert.equal(out.compressed, false);
  });

  it("is a pass-through when disabled (default)", () => {
    const messages = [
      anthropicRead("c1", "/a.ts"),
      anthropicResult("c1", "OLD"),
      anthropicRead("c2", "/a.ts"),
      anthropicResult("c2", "NEW"),
    ];
    const out = run(messages, false);
    assert.equal(out.compressed, false);
    assert.equal(
      anthropicResultText((out.body as { messages: unknown[] }).messages[1], "c1"),
      "OLD"
    );
  });

  it("schema defaults enabled to false (opt-in)", () => {
    const field = readLifecycleEngine.getConfigSchema!().find((f) => f.key === "enabled");
    assert.equal(field?.defaultValue, false);
  });
});
