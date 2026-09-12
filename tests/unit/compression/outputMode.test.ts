import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  applyCavemanOutputMode,
  buildCavemanOutputInstruction,
  CAVEMAN_INSTRUCTION_BY_LANGUAGE,
  placeSystemInstruction,
  shouldBypassCavemanOutputMode,
} from "../../../open-sse/services/compression/outputMode.ts";

describe("Caveman output mode", () => {
  it("injects a system instruction without post-processing output", () => {
    const result = applyCavemanOutputMode(
      { messages: [{ role: "user", content: "Summarize this API response." }] },
      { enabled: true, intensity: "full", autoClarity: true }
    );
    assert.equal(result.applied, true);
    // Trailing placement — never a synthetic system message at messages[0] (#12584).
    assert.equal(result.body.messages?.[0]?.role, "user");
    assert.equal(result.body.messages?.at(-1)?.role, "system");
    assert.match(String(result.body.messages?.at(-1)?.content), /Caveman Output Mode/);
  });

  it("appends to an existing system prompt", () => {
    const result = applyCavemanOutputMode(
      {
        messages: [
          { role: "system", content: "Follow tenant policy." },
          { role: "user", content: "Summarize logs." },
        ],
      },
      { enabled: true, intensity: "lite", autoClarity: true }
    );
    assert.equal(result.applied, true);
    assert.match(String(result.body.messages?.[0]?.content), /Follow tenant policy/);
    assert.match(String(result.body.messages?.[0]?.content), /Drop filler/);
  });

  it("does not inject the Caveman instruction twice", () => {
    const body = {
      messages: [
        { role: "system", content: "Follow tenant policy." },
        { role: "user", content: "Summarize logs." },
      ],
    };
    const once = applyCavemanOutputMode(body, {
      enabled: true,
      intensity: "full",
      autoClarity: true,
    }).body;
    const twice = applyCavemanOutputMode(once, {
      enabled: true,
      intensity: "full",
      autoClarity: true,
    });

    assert.equal(twice.applied, false);
    assert.equal(twice.skippedReason, "already_applied");
    const markerCount = String(twice.body.messages?.[0]?.content).match(
      /OmniRoute Caveman Output Mode/g
    )?.length;
    assert.equal(markerCount, 1);
  });

  it("merges into an Anthropic top-level system field instead of messages[0]", () => {
    const result = applyCavemanOutputMode(
      { system: "You are Claude Code.", messages: [{ role: "user", content: "hi" }] },
      { enabled: true, intensity: "full", autoClarity: true }
    );
    assert.equal(result.applied, true);
    assert.match(String(result.body.system), /Caveman Output Mode/);
    assert.equal(result.body.messages?.length, 1);
    assert.equal(result.body.messages?.[0]?.role, "user");

    const twice = applyCavemanOutputMode(result.body, {
      enabled: true,
      intensity: "full",
      autoClarity: true,
    });
    assert.equal(twice.applied, false);
    assert.equal(twice.skippedReason, "already_applied");
  });

  it("appends a block to an Anthropic block-array system and does not re-apply", () => {
    const result = applyCavemanOutputMode(
      {
        system: [{ type: "text", text: "You are Claude Code." }],
        messages: [{ role: "user", content: "hi" }],
      },
      { enabled: true, intensity: "full", autoClarity: true }
    );
    assert.equal(result.applied, true);
    const blocks = result.body.system as Array<{ type: string; text: string }>;
    assert.ok(Array.isArray(blocks));
    assert.equal(blocks.length, 2);
    assert.equal(blocks[0]?.text, "You are Claude Code.");
    assert.match(String(blocks[1]?.text), /Caveman Output Mode/);
    assert.equal(result.body.messages?.length, 1);
    assert.equal(result.body.messages?.[0]?.role, "user");

    const twice = applyCavemanOutputMode(result.body, {
      enabled: true,
      intensity: "full",
      autoClarity: true,
    });
    assert.equal(twice.applied, false);
    assert.equal(twice.skippedReason, "already_applied");
    assert.equal((twice.body.system as unknown[]).length, 2);
  });

  it("does not modify user content", () => {
    const body = { messages: [{ role: "user", content: "Please explain this response." }] };
    const result = applyCavemanOutputMode(body, {
      enabled: true,
      intensity: "full",
      autoClarity: true,
    });
    assert.equal(result.body.messages?.[0]?.content, body.messages[0].content);
  });

  it("uses Responses instructions when input has no messages", () => {
    const result = applyCavemanOutputMode(
      { input: [{ type: "message", role: "user", content: "Summarize logs." }] },
      { enabled: true, intensity: "full", autoClarity: true }
    );

    assert.equal(result.applied, true);
    assert.match(String(result.body.instructions), /Caveman Output Mode/);
    assert.ok(!("messages" in result.body));
  });

  it("bypasses security, destructive, clarification, and order-sensitive prompts", () => {
    const cases = [
      "Explain this security vulnerability in detail.",
      "Delete all rows after backup confirmation.",
      "Can you clarify what this means?",
      "First backup then drop table during migration.",
    ];
    for (const content of cases) {
      assert.ok(shouldBypassCavemanOutputMode([{ role: "user", content }]), content);
    }
  });

  it("skips injection when disabled", () => {
    const result = applyCavemanOutputMode(
      { messages: [{ role: "user", content: "Tell me a joke." }] },
      { enabled: false, intensity: "full", autoClarity: true }
    );
    assert.equal(result.applied, false);
    assert.equal(result.skippedReason, "disabled");
    assert.equal(result.body.messages?.[0]?.role, "user");
    assert.equal(result.body.messages?.[0]?.content, "Tell me a joke.");
  });

  it("builds intensity-specific instructions", () => {
    assert.match(
      buildCavemanOutputInstruction({ enabled: true, intensity: "ultra", autoClarity: true }),
      /ultra terse/i
    );
  });
});

describe("caveman instruction language map", () => {
  it("covers it/ru/zh with three bounded levels", () => {
    for (const lang of ["it", "ru", "zh"] as const) {
      const entry = CAVEMAN_INSTRUCTION_BY_LANGUAGE[lang];
      assert.ok(entry, `missing ${lang}`);
      for (const level of ["lite", "full", "ultra"] as const) {
        assert.ok(entry[level].length > 0, `${lang}.${level} empty`);
        assert.ok(entry[level].includes("Code blocks"), `${lang}.${level} missing boundaries`);
      }
    }
  });
});

describe("placeSystemInstruction", () => {
  it("routes to `system` instead of messages[0] when messages is empty (#12584)", () => {
    const result = placeSystemInstruction([], undefined, "be terse");
    assert.equal(result.system, "be terse");
    assert.equal(result.messages, undefined);
  });

  it("merges into a system message at index >= 1 and leaves messages[0] untouched", () => {
    const messages = [
      { role: "user", content: "hi" },
      { role: "system", content: "You are terse." },
      { role: "assistant", content: "ok" },
    ];
    const result = placeSystemInstruction(messages, undefined, "be terse");
    assert.equal(result.system, undefined);
    assert.equal(result.messages?.length, 3);
    assert.equal(result.messages?.[0]?.content, "hi");
    assert.equal(result.messages?.[1]?.role, "system");
    assert.equal(result.messages?.[1]?.content, "You are terse.\n\nbe terse");
    assert.equal(result.messages?.[2]?.content, "ok");
    // input array and its members are not mutated
    assert.notEqual(result.messages, messages);
    assert.equal(messages[1]?.content, "You are terse.");
  });

  it("skips a block-content system message and merges into the next string system message", () => {
    const result = placeSystemInstruction(
      [
        { role: "system", content: [{ type: "text", text: "blocks" }] },
        { role: "system", content: "You are terse." },
      ],
      undefined,
      "be terse"
    );
    assert.equal(result.system, undefined);
    assert.equal(result.messages?.length, 2);
    assert.deepEqual(result.messages?.[0]?.content, [{ type: "text", text: "blocks" }]);
    assert.equal(result.messages?.[1]?.content, "You are terse.\n\nbe terse");
  });

  it("appends a trailing system message when there is no system field or system message", () => {
    const messages = [
      { role: "user", content: "hi" },
      { role: "assistant", content: "ok" },
    ];
    const result = placeSystemInstruction(messages, undefined, "be terse");
    assert.equal(result.system, undefined);
    assert.equal(result.messages?.length, 3);
    assert.equal(result.messages?.[0]?.role, "user");
    assert.equal(result.messages?.[1]?.role, "assistant");
    assert.equal(result.messages?.[2]?.role, "system");
    assert.equal(result.messages?.[2]?.content, "be terse");
    // instruction is appended, never prepended as a new messages[0]
    assert.equal(messages.length, 2);
  });
});
