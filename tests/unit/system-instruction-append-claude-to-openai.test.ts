import test from "node:test";
import assert from "node:assert/strict";

const { claudeToOpenAIRequest } =
  await import("../../open-sse/translator/request/claude-to-openai.ts");

const APPEND_ENV = "OMNIROUTE_SYSTEM_INSTRUCTION_APPEND";
const DIRECTIVE = "TEST-DIRECTIVE-ABC";

function baseBody(withSystem: boolean) {
  const body: Record<string, unknown> = {
    messages: [{ role: "user", content: [{ type: "text", text: "Hello" }] }],
  };
  if (withSystem) body.system = [{ text: "Rule A" }];
  return body;
}

function withEnv(directive: string | undefined, fn: () => void) {
  const prev = process.env[APPEND_ENV];
  if (directive === undefined) delete process.env[APPEND_ENV];
  else process.env[APPEND_ENV] = directive;
  try {
    fn();
  } finally {
    if (prev === undefined) delete process.env[APPEND_ENV];
    else process.env[APPEND_ENV] = prev;
  }
}

test("claude-to-openai appends the directive to an existing string system message (tail recency)", () => {
  withEnv(DIRECTIVE, () => {
    const result = claudeToOpenAIRequest("deepseek-v4", baseBody(true), false);
    const sys = result.messages[0] as { role: string; content: unknown };
    assert.equal(sys.role, "system");
    assert.equal(typeof sys.content, "string");
    const content = sys.content as string;
    assert.ok(content.includes("Rule A"));
    assert.ok(content.includes(DIRECTIVE), "directive must reach the system message");
    assert.ok(
      content.endsWith(DIRECTIVE),
      "directive must be appended at the tail (highest recency)"
    );
  });
});

test("claude-to-openai creates a system message carrying the directive when body has none", () => {
  withEnv(DIRECTIVE, () => {
    const result = claudeToOpenAIRequest("deepseek-v4", baseBody(false), false);
    const sys = result.messages[0] as { role: string; content: unknown };
    assert.equal(sys.role, "system");
    assert.equal(sys.content, DIRECTIVE);
  });
});

test("claude-to-openai appends the directive to array system content as a text block", () => {
  withEnv(DIRECTIVE, () => {
    const result = claudeToOpenAIRequest(
      "deepseek-v4",
      {
        messages: [{ role: "user", content: [{ type: "text", text: "Hello" }] }],
        system: [{ text: "Block A", cache_control: { type: "ephemeral" } }],
      },
      false,
      { _preserveCacheControl: true }
    );
    const sys = result.messages[0] as { role: string; content: unknown };
    assert.equal(sys.role, "system");
    assert.ok(Array.isArray(sys.content), "array system content must stay an array");
    const blocks = sys.content as Array<{ type: string; text: string }>;
    const lastBlock = blocks[blocks.length - 1];
    assert.equal(lastBlock.type, "text");
    assert.ok(lastBlock.text.includes(DIRECTIVE), "directive block must be appended last");
  });
});

test("claude-to-openai does not inject when env is unset", () => {
  withEnv(undefined, () => {
    const result = claudeToOpenAIRequest("deepseek-v4", baseBody(true), false);
    const sys = result.messages[0] as { role: string; content: unknown };
    assert.equal(sys.content, "Rule A");
  });
});
