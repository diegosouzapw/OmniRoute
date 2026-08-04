/**
 * prepareClaudeRequest preserve-mode fallback.
 *
 * preserveCacheControl=true must mean "the client manages its own cache
 * markers" — but when the client body carries NO cache_control anywhere,
 * preserving "nothing" would ship a request with zero prompt-cache
 * breakpoints (every token billed uncached on every turn). In that case the
 * standard heuristic must still apply, exactly as if preserveCacheControl
 * were false. When the client DID place markers, they are preserved verbatim
 * and the heuristic must not add any extra ones.
 */
import { describe, test } from "node:test";
import assert from "node:assert/strict";
import { prepareClaudeRequest } from "../../open-sse/translator/helpers/claudeHelper.ts";

type Block = Record<string, unknown>;

function baseBody(): Record<string, unknown> {
  return {
    model: "claude-sonnet-5",
    system: [
      { type: "text", text: "You are a helpful assistant." },
      { type: "text", text: "Project context goes here." },
    ],
    messages: [
      { role: "user", content: [{ type: "text", text: "First question" }] },
      { role: "assistant", content: [{ type: "text", text: "First answer" }] },
      { role: "user", content: [{ type: "text", text: "Second question" }] },
    ],
    max_tokens: 128,
  };
}

function collectCacheControls(body: Record<string, unknown>): Block[] {
  const found: Block[] = [];
  for (const block of (body.system as Block[]) ?? []) {
    if (block.cache_control) found.push(block);
  }
  for (const msg of (body.messages as Array<{ content?: Block[] }>) ?? []) {
    for (const block of msg.content ?? []) {
      if (block.cache_control) found.push(block);
    }
  }
  return found;
}

describe("prepareClaudeRequest preserve-mode fallback", () => {
  test("falls back to the heuristic when the client sent no markers at all (translator opt-in)", () => {
    const body = baseBody();
    const result = prepareClaudeRequest(body, "claude", true, "claude-sonnet-5", {
      fallbackToHeuristicWhenNoMarkers: true,
    });

    const system = result.system as Block[];
    const lastSystem = system[system.length - 1];
    assert.ok(
      lastSystem.cache_control,
      "last system block should carry the heuristic cache_control when the client sent none"
    );
    assert.ok(
      collectCacheControls(result as Record<string, unknown>).length > 0,
      "request must not go upstream with zero cache breakpoints"
    );
  });

  test("without the opt-in flag, preserve-mode never supplements markers (CC relay contract)", () => {
    const body = baseBody();
    const result = prepareClaudeRequest(body, "claude", true, "claude-sonnet-5");
    assert.equal(
      collectCacheControls(result as Record<string, unknown>).length,
      0,
      "the claude-code-compatible relay path keeps its no-supplement contract"
    );
  });

  test("preserves client markers verbatim and adds none (system marker)", () => {
    const body = baseBody();
    (body.system as Block[])[0].cache_control = { type: "ephemeral" };
    const result = prepareClaudeRequest(body, "claude", true, "claude-sonnet-5");

    const system = result.system as Block[];
    assert.deepEqual(
      system[0].cache_control,
      { type: "ephemeral" },
      "client marker must survive untouched"
    );
    assert.equal(
      collectCacheControls(result as Record<string, unknown>).length,
      1,
      "no extra heuristic markers may be added when the client manages its own"
    );
  });

  test("preserves client markers verbatim and adds none (message marker)", () => {
    const body = baseBody();
    const messages = body.messages as Array<{ content: Block[] }>;
    messages[2].content[0].cache_control = { type: "ephemeral" };
    const result = prepareClaudeRequest(body, "claude", true, "claude-sonnet-5");

    const controls = collectCacheControls(result as Record<string, unknown>);
    assert.equal(controls.length, 1, "only the client's own marker may remain");
    const resultMessages = result.messages as Array<{ content: Block[] }>;
    assert.deepEqual(resultMessages[resultMessages.length - 1].content[0].cache_control, {
      type: "ephemeral",
    });
  });

  test("non-preserve mode keeps applying the heuristic (regression)", () => {
    const body = baseBody();
    const result = prepareClaudeRequest(body, "claude", false, "claude-sonnet-5");
    const system = result.system as Block[];
    assert.ok(system[system.length - 1].cache_control, "heuristic marker on last system block");
  });
});
