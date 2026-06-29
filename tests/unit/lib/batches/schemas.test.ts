import { test } from "node:test";
import assert from "node:assert/strict";

const { wizardDestinationSchema, wizardCsvMappingSchema, csvToJsonlInputSchema } =
  await import("../../../../src/lib/batches/schemas.ts");
const { BATCH_SUPPORTED_PROVIDERS } = await import("../../../../src/lib/batches/types.ts");

test("batch types module keeps the supported providers catalog exported", () => {
  assert.deepEqual(BATCH_SUPPORTED_PROVIDERS, ["openai", "anthropic", "gemini"]);
});

// ── wizardDestinationSchema ──────────────────────────────────────────────────

test("wizardDestinationSchema: accepts valid destination (openai / /v1/chat/completions / gpt-4o)", () => {
  const result = wizardDestinationSchema.safeParse({
    provider: "openai",
    endpoint: "/v1/chat/completions",
    model: "gpt-4o",
  });
  assert.ok(result.success, "valid destination should parse successfully");
});

test("wizardDestinationSchema: rejects invalid provider (mistral)", () => {
  const result = wizardDestinationSchema.safeParse({
    provider: "mistral",
    endpoint: "/v1/chat/completions",
    model: "mistral-7b",
  });
  assert.equal(result.success, false, "unknown provider should fail validation");
});

test("wizardDestinationSchema: rejects unsupported endpoint", () => {
  const result = wizardDestinationSchema.safeParse({
    provider: "openai",
    endpoint: "/v1/audio/transcriptions",
    model: "gpt-4o",
  });
  assert.equal(result.success, false, "unsupported endpoint should fail validation");
});

test("wizardDestinationSchema: rejects empty model string", () => {
  const result = wizardDestinationSchema.safeParse({
    provider: "anthropic",
    endpoint: "/v1/chat/completions",
    model: "",
  });
  assert.equal(result.success, false, "empty model should fail validation");
});

// ── wizardCsvMappingSchema ───────────────────────────────────────────────────

test("wizardCsvMappingSchema: accepts valid mapping with custom_id + body.messages[0].content", () => {
  const result = wizardCsvMappingSchema.safeParse({
    id_col: "custom_id",
    prompt_col: "body.messages[0].content",
  });
  assert.ok(result.success, "valid mapping should parse successfully");
});

test("wizardCsvMappingSchema: rejects mapping without custom_id target", () => {
  const result = wizardCsvMappingSchema.safeParse({
    prompt_col: "body.messages[0].content",
  });
  assert.equal(result.success, false, "missing custom_id target should fail");
  if (!result.success) {
    const messages = result.error.issues.map((e) => e.message);
    assert.ok(
      messages.some((m) => m.includes("custom_id")),
      "error should mention custom_id"
    );
  }
});

test("wizardCsvMappingSchema: rejects mapping with custom_id only (no content/input/prompt)", () => {
  const result = wizardCsvMappingSchema.safeParse({
    id_col: "custom_id",
  });
  assert.equal(result.success, false, "mapping without content path should fail");
  if (!result.success) {
    const messages = result.error.issues.map((e) => e.message);
    assert.ok(
      messages.some((m) => m.includes("request body content")),
      "error should mention body content requirement"
    );
  }
});

// ── csvToJsonlInputSchema ────────────────────────────────────────────────────

test("csvToJsonlInputSchema: accepts valid complete input", () => {
  const result = csvToJsonlInputSchema.safeParse({
    csv: "id,prompt\n1,hello",
    mapping: {
      id: "custom_id",
      prompt: "body.messages[0].content",
    },
    defaults: {
      model: "gpt-4o",
      url: "/v1/chat/completions",
    },
  });
  assert.ok(result.success, "valid csv input should parse successfully");
  if (result.success) {
    // Verify method defaults to POST
    assert.equal(result.data.defaults.method, "POST");
    assert.equal(result.data.defaults.model, "gpt-4o");
  }
});

test("csvToJsonlInputSchema: rejects empty csv string", () => {
  const result = csvToJsonlInputSchema.safeParse({
    csv: "",
    mapping: {
      id: "custom_id",
      prompt: "body.messages[0].content",
    },
    defaults: {
      model: "gpt-4o",
      url: "/v1/chat/completions",
    },
  });
  assert.equal(result.success, false, "empty csv should fail min(1) constraint");
});
