import test from "node:test";
import assert from "node:assert/strict";
import {
  validateBody,
  translatorDetectSchema,
  translatorSendSchema,
  translatorTranslateSchema,
  cliSettingsEnvSchema,
  v1EmbeddingsSchema,
  providerChatCompletionSchema,
  v1CountTokensSchema,
  pricingSyncRequestSchema,
  updateTaskRoutingSchema,
  taskRoutingActionSchema,
} from "../../src/shared/validation/schemas.ts";

test("translatorDetectSchema rejects empty body object", () => {
  const validation = validateBody(translatorDetectSchema, { body: {} });
  assert.equal(validation.success, false);
});

test("translatorSendSchema rejects empty body object", () => {
  const validation = validateBody(translatorSendSchema, {
    provider: "openai",
    body: {},
  });
  assert.equal(validation.success, false);
});

test("translatorTranslateSchema requires explicit step", () => {
  const validation = validateBody(translatorTranslateSchema, {
    provider: "openai",
    body: { model: "gpt-4o-mini" },
  });
  assert.equal(validation.success, false);
});

test("translatorTranslateSchema requires provider for non-direct step", () => {
  const validation = validateBody(translatorTranslateSchema, {
    step: 2,
    body: { model: "gpt-4o-mini" },
  });
  assert.equal(validation.success, false);
});

test("cliSettingsEnvSchema coerces numeric and boolean values to string", () => {
  const validation = validateBody(cliSettingsEnvSchema, {
    env: {
      API_TIMEOUT_MS: 60000,
      ANTHROPIC_USE_PROXY: true,
    },
  });
  assert.equal(validation.success, true);
  if (validation.success) {
    assert.equal(validation.data.env.API_TIMEOUT_MS, "60000");
    assert.equal(validation.data.env.ANTHROPIC_USE_PROXY, "true");
  }
});

test("cliSettingsEnvSchema rejects invalid key format", () => {
  const validation = validateBody(cliSettingsEnvSchema, {
    env: {
      "anthropic-base-url": "https://example.com/v1",
    },
  });
  assert.equal(validation.success, false);
});

test("v1EmbeddingsSchema accepts string and token-array inputs", () => {
  const withString = validateBody(v1EmbeddingsSchema, {
    model: "openai/text-embedding-3-small",
    input: "hello world",
  });
  assert.equal(withString.success, true);

  const withTokenArray = validateBody(v1EmbeddingsSchema, {
    model: "openai/text-embedding-3-small",
    input: [101, 102, 103],
  });
  assert.equal(withTokenArray.success, true);
});

test("v1EmbeddingsSchema rejects empty embedding input", () => {
  const validation = validateBody(v1EmbeddingsSchema, {
    model: "openai/text-embedding-3-small",
    input: [],
  });
  assert.equal(validation.success, false);
});

test("providerChatCompletionSchema requires model", () => {
  const validation = validateBody(providerChatCompletionSchema, {
    messages: [{ role: "user", content: "hello" }],
  });
  assert.equal(validation.success, false);
});

test("providerChatCompletionSchema requires at least one message/input/prompt field", () => {
  const validation = validateBody(providerChatCompletionSchema, {
    model: "openai/gpt-4o-mini",
  });
  assert.equal(validation.success, false);
});

test("providerChatCompletionSchema accepts valid message payload", () => {
  const validation = validateBody(providerChatCompletionSchema, {
    model: "openai/gpt-4o-mini",
    messages: [{ role: "user", content: "hello" }],
  });
  assert.equal(validation.success, true);
});

test("v1CountTokensSchema rejects empty messages", () => {
  const validation = validateBody(v1CountTokensSchema, {
    messages: [],
  });
  assert.equal(validation.success, false);
});

test("pricingSyncRequestSchema rejects unsupported sources", () => {
  const validation = validateBody(pricingSyncRequestSchema, {
    sources: ["unknown-source"],
  });
  assert.equal(validation.success, false);
});

test("pricingSyncRequestSchema accepts dryRun-only requests", () => {
  const validation = validateBody(pricingSyncRequestSchema, {
    dryRun: true,
  });
  assert.equal(validation.success, true);
});

test("updateTaskRoutingSchema rejects empty payloads", () => {
  const validation = validateBody(updateTaskRoutingSchema, {});
  assert.equal(validation.success, false);
});

test("updateTaskRoutingSchema accepts partial task routing updates", () => {
  const validation = validateBody(updateTaskRoutingSchema, {
    enabled: true,
    taskModelMap: {
      coding: "codex/gpt-5.1-codex",
    },
  });
  assert.equal(validation.success, true);
});

test("taskRoutingActionSchema rejects unknown actions", () => {
  const validation = validateBody(taskRoutingActionSchema, {
    action: "noop",
  });
  assert.equal(validation.success, false);
});

test("taskRoutingActionSchema accepts detect action with object body", () => {
  const validation = validateBody(taskRoutingActionSchema, {
    action: "detect",
    body: {
      messages: [{ role: "user", content: "write code" }],
    },
  });
  assert.equal(validation.success, true);
});
