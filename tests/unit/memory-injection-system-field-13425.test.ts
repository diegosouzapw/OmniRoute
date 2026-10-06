/**
 * Tests for #13425: memory injection unshifts system message at messages[0]
 * despite top-level `system` field, causing Anthropic 400 errors.
 *
 * When a body carries a top-level `system` field (string or block array),
 * injectMemory must merge memory text into that field instead of prepending
 * a `{role:"system"}` at messages[0].
 */

import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { injectMemory } from "../../src/lib/memory/injection.ts";
import type { ChatRequest } from "../../src/lib/memory/injection.ts";
import { MemoryType } from "../../src/lib/memory/types.ts";
import type { Memory } from "../../src/lib/memory/types.ts";

function mem(content: string): Memory {
  return {
    id: `mem-${content}`,
    content,
    type: MemoryType.FACTUAL,
    apiKeyId: "k",
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z",
    importance: 0.5,
  } as unknown as Memory;
}

const MEMORY = [mem("User prefers dark mode")];

describe("memory injection into top-level system field (#13425)", () => {
  it("xiaomi-mimo: merges memory into string system field via injectSystemFirst", () => {
    const request: ChatRequest = {
      model: "test",
      system: "You are a helpful assistant.",
      messages: [{ role: "user", content: "hello" }],
    };
    const result = injectMemory(request, MEMORY, "xiaomi-mimo");

    assert.ok(
      typeof result.system === "string" && result.system.includes("User prefers dark mode"),
      "memory text should be merged into top-level system field"
    );
    assert.ok(
      typeof result.system === "string" && result.system.includes("You are a helpful assistant."),
      "original system text should be preserved"
    );
    assert.notEqual(
      result.messages[0]?.role,
      "system",
      "should not unshift system message at messages[0]"
    );
    assert.equal(result.messages[0]?.content, "hello", "first user turn preserved");
  });

  it("xiaomi-mimo: merges memory into block-array system field", () => {
    const request: ChatRequest = {
      model: "test",
      system: [{ type: "text", text: "You are a helpful assistant." }] as unknown as string,
      messages: [{ role: "user", content: "hello" }],
    };
    const result = injectMemory(request, MEMORY, "xiaomi-mimo");

    assert.ok(Array.isArray(result.system), "system field should remain an array");
    const blocks = result.system as unknown as Array<{ type: string; text: string }>;
    assert.equal(blocks[0].type, "text");
    assert.ok(blocks[0].text.includes("User prefers dark mode"), "memory should be first block");
    assert.ok(
      blocks.some((b) => b.text?.includes("You are a helpful assistant.")),
      "original system text preserved in array"
    );
    assert.notEqual(result.messages[0]?.role, "system");
  });

  it("claude: merges memory into string system field via general path", () => {
    const request: ChatRequest = {
      model: "test",
      system: "You are a helpful assistant.",
      messages: [{ role: "user", content: "hello" }],
    };
    const result = injectMemory(request, MEMORY, "claude");

    assert.ok(
      typeof result.system === "string" && result.system.includes("User prefers dark mode"),
      "memory text should be merged into top-level system field"
    );
    assert.notEqual(result.messages[0]?.role, "system");
    assert.equal(result.messages[0]?.content, "hello");
  });

  it("anthropic: merges memory into block-array system field via general path", () => {
    const request: ChatRequest = {
      model: "test",
      system: [{ type: "text", text: "You are a helpful assistant." }] as unknown as string,
      messages: [{ role: "user", content: "hello" }],
    };
    const result = injectMemory(request, MEMORY, "anthropic");

    assert.ok(Array.isArray(result.system), "system field should remain an array");
    const blocks = result.system as unknown as Array<{ type: string; text: string }>;
    assert.ok(blocks[0].text.includes("User prefers dark mode"), "memory should be first block");
    assert.notEqual(result.messages[0]?.role, "system");
  });

  it("merging into existing system message at messages[0] still works (xiaomi-mimo)", () => {
    const request: ChatRequest = {
      model: "test",
      messages: [
        { role: "system", content: "Original system prompt" },
        { role: "user", content: "hello" },
      ],
    };
    const result = injectMemory(request, MEMORY, "xiaomi-mimo");

    assert.equal(result.messages[0]?.role, "system");
    assert.ok(
      (result.messages[0]?.content as string).includes("User prefers dark mode"),
      "memory should be merged into existing leading system message"
    );
    assert.ok(
      (result.messages[0]?.content as string).includes("Original system prompt"),
      "original system text should be preserved"
    );
  });

  it("falls back to messages prepend when no system field and no system message at [0]", () => {
    const request: ChatRequest = {
      model: "test",
      messages: [{ role: "user", content: "hello" }],
    };
    const result = injectMemory(request, MEMORY, "claude");

    assert.equal(result.messages[0]?.role, "system");
    assert.ok(
      (result.messages[0]?.content as string).includes("User prefers dark mode"),
      "memory should be prepended as system message"
    );
    assert.equal(result.messages[1]?.content, "hello", "original first turn preserved");
  });
});
