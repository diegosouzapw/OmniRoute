import test from "node:test";
import assert from "node:assert/strict";

const { openaiToAntigravityRequest } =
  await import("../../../open-sse/translator/request/openai-to-gemini.ts");
const { ANTIGRAVITY_DEFAULT_SYSTEM } = await import("../../../open-sse/config/constants.ts");

type PartsArray = Array<{ text?: string; functionCall?: unknown; functionResponse?: unknown }>;

/**
 * #9030 — Hermes + Antigravity system messages cause 429s
 *
 * Root cause: openai-to-gemini.ts's wrapInCloudCodeEnvelope prepends
 * ANTIGRAVITY_DEFAULT_SYSTEM to systemInstruction.parts that already contain
 * the client's system message. This doubles the systemInstruction size well
 * beyond what the upstream Antigravity/Google Cloud Code endpoint accepts,
 * causing a 429 RESOURCE_EXHAUSTED.
 *
 * Fix: move client system content to the first user message and keep only the
 * default system in systemInstruction.
 *
 * This repro test asserts that the fix is in place — after translation, the
 * systemInstruction contains ONLY ANTIGRAVITY_DEFAULT_SYSTEM, and the client's
 * system text is in contents[0].
 */
test("OpenAI -> Antigravity: client system message must NOT be in systemInstruction with default (#9030)", () => {
  const result = openaiToAntigravityRequest(
    "gemini-2.5-flash",
    {
      messages: [
        { role: "system", content: "You are a helpful assistant specialized in coding tasks." },
        { role: "user", content: "Write a function to sort an array." },
      ],
    },
    false
  );

  // systemInstruction must contain ONLY the ANTIGRAVITY_DEFAULT_SYSTEM
  assert.ok(result.request.systemInstruction, "systemInstruction must exist");
  assert.equal(
    result.request.systemInstruction.parts.length,
    1,
    "systemInstruction must have exactly 1 part (only ANTIGRAVITY_DEFAULT_SYSTEM)"
  );
  assert.equal(
    result.request.systemInstruction.parts[0].text,
    ANTIGRAVITY_DEFAULT_SYSTEM,
    "systemInstruction must contain only ANTIGRAVITY_DEFAULT_SYSTEM"
  );

  // The client system message must be moved to the first user content
  const parts = result.request.contents[0]?.parts as PartsArray | undefined;
  assert.ok(parts, "contents[0] must exist");
  const firstUserText = parts.map((p) => p.text ?? "").join("");
  assert.ok(
    firstUserText.includes("You are a helpful assistant specialized in coding tasks."),
    "client system text must be in first user message contents[0]"
  );
  assert.ok(
    firstUserText.includes("Write a function to sort an array."),
    "user message must also be in contents[0]"
  );
});

test("OpenAI -> Antigravity: systemInstruction with only ANTIGRAVITY_DEFAULT_SYSTEM when no client system (#9030)", () => {
  const result = openaiToAntigravityRequest(
    "gemini-2.5-flash",
    {
      messages: [
        { role: "user", content: "Hello, how are you?" },
      ],
    },
    false
  );

  // systemInstruction must still have only the ANTIGRAVITY_DEFAULT_SYSTEM
  assert.ok(result.request.systemInstruction, "systemInstruction must exist");
  assert.equal(
    result.request.systemInstruction.parts.length,
    1,
    "systemInstruction must have exactly 1 part"
  );
  assert.equal(
    result.request.systemInstruction.parts[0].text,
    ANTIGRAVITY_DEFAULT_SYSTEM,
    "systemInstruction must contain ANTIGRAVITY_DEFAULT_SYSTEM"
  );
});

test("OpenAI -> Antigravity: multiple system messages all moved to first user content (#9030)", () => {
  const result = openaiToAntigravityRequest(
    "gemini-2.5-flash",
    {
      messages: [
        { role: "system", content: "Rule one: be concise." },
        { role: "system", content: "Rule two: use TypeScript." },
        { role: "user", content: "Write code." },
      ],
    },
    false
  );

  // systemInstruction must contain ONLY ANTIGRAVITY_DEFAULT_SYSTEM
  assert.equal(
    result.request.systemInstruction.parts.length,
    1,
    "systemInstruction must have exactly 1 part"
  );
  assert.equal(
    result.request.systemInstruction.parts[0].text,
    ANTIGRAVITY_DEFAULT_SYSTEM,
    "systemInstruction must contain only ANTIGRAVITY_DEFAULT_SYSTEM"
  );

  // The combined system messages + user message must be in contents[0]
  const parts = result.request.contents[0]?.parts as PartsArray | undefined;
  assert.ok(parts, "contents[0] must exist");
  const firstUserText = parts.map((p) => p.text ?? "").join("");
  assert.ok(
    firstUserText.includes("Rule one: be concise."),
    "first system text must be in contents[0]"
  );
  assert.ok(
    firstUserText.includes("Rule two: use TypeScript."),
    "second system text must be in contents[0]"
  );
  assert.ok(
    firstUserText.includes("Write code."),
    "user message must be in contents[0]"
  );
});
