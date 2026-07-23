import test from "node:test";
import assert from "node:assert/strict";

const { normalizeDeveloperRole, normalizeModelRole, normalizeSystemRole, normalizeRoles } =
  await import("../../open-sse/services/roleNormalizer.ts");

test("normalizeDeveloperRole preserves developer for official openai provider by default", () => {
  const messages = [{ role: "developer", content: "internal policy" }];
  const result = normalizeDeveloperRole(messages, "openai", undefined, "openai");
  assert.deepEqual(result, messages);
});

test("normalizeDeveloperRole maps developer to system when compatibility mode disables preservation", () => {
  const messages = [{ role: "DeVeloper", content: "internal policy" }];
  const result = normalizeDeveloperRole(messages, "openai", false);

  assert.deepEqual(result, [{ role: "system", content: "internal policy" }]);
});

test("#2281 normalizeDeveloperRole maps developer to system for non-openai providers by default", () => {
  const messages = [{ role: "developer", content: "internal policy" }];
  // Without explicit preserveDeveloperRole, OpenAI-compatible providers that
  // reject `developer` (DeepSeek, MiniMax, Mimo, GLM, etc.) should default
  // to converting it to `system`.
  for (const provider of ["deepseek", "minimax", "xiaomi-mimo", "glm", "fireworks", "together"]) {
    const result = normalizeDeveloperRole(messages, "openai", undefined, provider);
    assert.deepEqual(
      result,
      [{ role: "system", content: "internal policy" }],
      `expected developer→system for provider ${provider}`
    );
  }
});

test("#2281 normalizeDeveloperRole preserves developer for openai-family providers", () => {
  const messages = [{ role: "developer", content: "internal policy" }];
  for (const provider of ["openai", "azure-openai", "azure", "github", "azure-openai-gov"]) {
    const result = normalizeDeveloperRole(messages, "openai", undefined, provider);
    assert.deepEqual(result, messages, `expected developer preserved for provider ${provider}`);
  }
});

test("#2281 explicit preserveDeveloperRole=true overrides provider default", () => {
  const messages = [{ role: "developer", content: "internal policy" }];
  const result = normalizeDeveloperRole(messages, "openai", true, "deepseek");
  // Operator forced preservation via dashboard "Compatibility" toggle.
  assert.deepEqual(result, messages);
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

test("normalizeSystemRole preserves the system role for GLM > 5.0 (glm-5.1/5.2 support it, #5610)", () => {
  const messages = [
    { role: "system", content: "be helpful" },
    { role: "user", content: "hello" },
  ];
  for (const model of [
    "glm-5.1",
    "glm-5.2",
    "glm-5.1-precision",
    "glm-5.2-high",
    "glm-5.2-max",
    "glm-5p1",
  ]) {
    assert.deepEqual(
      normalizeSystemRole(messages, "glm", model),
      messages,
      `expected system role preserved for ${model}`
    );
  }
});

test("normalizeSystemRole still strips the system role for pre-5.1 GLM and bare glm (#5610 guard)", () => {
  const messages = [
    { role: "system", content: "policy" },
    { role: "user", content: "ok" },
  ];
  const merged = [
    { role: "user", content: "[System Instructions]\npolicy\n\n[User Message]\nok" },
  ];
  for (const model of ["glm", "glm-4.7", "glm-5", "glm-5-turbo", "glm-5.0", "glm-5.0-turbo"]) {
    assert.deepEqual(
      normalizeSystemRole(messages, "openai", model),
      merged,
      `expected system role stripped for ${model}`
    );
  }
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

test("normalizeSystemRole treats ZenMux z-ai/glm models as GLM even with vendor prefix", () => {
  const messages = [
    { role: "system", content: "[Context compressed: earlier messages removed]" },
    {
      role: "assistant",
      content: null,
      tool_calls: [
        {
          id: "call_1",
          type: "function",
          function: { name: "read", arguments: "{}" },
        },
      ],
    },
    { role: "tool", tool_call_id: "call_1", content: "ok" },
  ];

  const result = normalizeSystemRole(messages, "zenmux", "z-ai/glm-5.2");

  assert.deepEqual(result, [
    {
      role: "user",
      content: "[System Instructions]\n[Context compressed: earlier messages removed]",
    },
    messages[1],
    messages[2],
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
