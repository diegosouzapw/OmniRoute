import test from "node:test";
import assert from "node:assert/strict";

const { normalizeDeveloperRole, normalizeModelRole, normalizeSystemRole, normalizeRoles } =
  await import("../../open-sse/services/roleNormalizer.ts");

test("normalizeDeveloperRole preserves developer for openai by default", () => {
  const messages = [{ role: "developer", content: "internal policy" }];
  const result = normalizeDeveloperRole(messages, "openai");
  assert.deepEqual(result, messages);
});

test("normalizeDeveloperRole maps developer to system when compatibility mode disables preservation", () => {
  const messages = [{ role: "DeVeloper", content: "internal policy" }];
  const result = normalizeDeveloperRole(messages, "openai", false);

  assert.deepEqual(result, [{ role: "system", content: "internal policy" }]);
});

test("normalizeModelRole maps model to assistant case-insensitively", () => {
  const messages = [{ role: "MoDeL", content: "generated text" }];
  const result = normalizeModelRole(messages);

  assert.deepEqual(result, [{ role: "assistant", content: "generated text" }]);
});

test("normalizeSystemRole leaves supported provider-model pairs untouched", () => {
  const messages = [
    { role: "system", content: "follow policy" },
    { role: "user", content: "say hello" },
  ];

  const result = normalizeSystemRole(messages, "openai", "gpt-5");
  assert.deepEqual(result, messages);
});

test("normalizeSystemRole merges system and developer content into the first user message for unsupported models", () => {
  const messages = [
    { role: "system", content: [{ type: "text", text: "follow policy" }] },
    { role: "developer", content: [{ type: "text", text: "prefer concise answers" }] },
    { role: "user", content: [{ type: "text", text: "say hello" }] },
    { role: "assistant", content: "prior answer" },
  ];

  const result = normalizeSystemRole(messages, "openai", "glm-4.5");

  assert.deepEqual(result, [
    {
      role: "user",
      content:
        "[System Instructions]\nfollow policy\n\nprefer concise answers\n\n[User Message]\nsay hello",
    },
    { role: "assistant", content: "prior answer" },
  ]);
});

test("normalizeSystemRole inserts a user message when no user exists and drops empty system payloads", () => {
  const messages = [
    { role: "system", content: [{ type: "image_url", image_url: { url: "ignored" } }] },
    { role: "developer", content: "plain developer text" },
    { role: "assistant", content: "ready" },
  ];

  const result = normalizeSystemRole(messages, "openai", "ernie-4.0");

  assert.deepEqual(result, [
    { role: "user", content: "[System Instructions]\nplain developer text" },
    { role: "assistant", content: "ready" },
  ]);
});

test("normalizeRoles composes model, developer and system normalization in order", () => {
  const messages = [
    { role: "model", content: "first answer" },
    { role: "developer", content: "internal policy" },
    { role: "user", content: "help me" },
    { role: "", content: "empty role should survive" },
  ];

  const result = normalizeRoles(messages, "openai", "glm-4.7", "openai", false);

  assert.deepEqual(result, [
    { role: "assistant", content: "first answer" },
    {
      role: "user",
      content: "[System Instructions]\ninternal policy\n\n[User Message]\nhelp me",
    },
    { role: "", content: "empty role should survive" },
  ]);
});

test("role normalization returns non-arrays unchanged", () => {
  assert.equal(normalizeDeveloperRole(null, "openai"), null);
  assert.equal(normalizeModelRole("invalid"), "invalid");
  assert.equal(normalizeSystemRole(undefined, "openai", "gpt-5"), undefined);
  assert.equal(normalizeRoles(false, "openai", "gpt-5", "openai"), false);
});
