import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  applyCavemanOutputMode,
  buildCavemanOutputInstruction,
  shouldBypassCavemanOutputMode,
} from "../../../open-sse/services/compression/outputMode.ts";

describe("Caveman output mode", () => {
  it("injects a system instruction without post-processing output", () => {
    const result = applyCavemanOutputMode(
      { messages: [{ role: "user", content: "Summarize this API response." }] },
      { enabled: true, intensity: "full", autoClarity: true }
    );
    assert.equal(result.applied, true);
    assert.equal(result.body.messages?.[0]?.role, "system");
    assert.match(String(result.body.messages?.[0]?.content), /Caveman Output Mode/);
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

  it("does not modify user content", () => {
    const body = { messages: [{ role: "user", content: "Please explain this response." }] };
    const result = applyCavemanOutputMode(body, {
      enabled: true,
      intensity: "full",
      autoClarity: true,
    });
    assert.equal(result.body.messages?.at(-1)?.content, body.messages[0].content);
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

  it("builds intensity-specific instructions", () => {
    assert.match(
      buildCavemanOutputInstruction({ enabled: true, intensity: "ultra", autoClarity: true }),
      /ultra terse/i
    );
  });
});
