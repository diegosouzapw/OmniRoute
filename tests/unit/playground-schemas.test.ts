import test from "node:test";
import assert from "node:assert/strict";
import { ZodError } from "zod";

const {
  PlaygroundPresetRowSchema,
  PlaygroundPresetCreateSchema,
  PlaygroundPresetUpdateSchema,
  PlaygroundPresetListItemSchema,
  ToolDefinitionSchema,
  StructuredOutputSchema,
  StreamMetricsSchema,
} = await import("../../src/shared/schemas/playground.ts");

test("playground schema module keeps runtime schemas exported", () => {
  assert.equal(typeof PlaygroundPresetRowSchema.safeParse, "function");
  assert.equal(typeof PlaygroundPresetCreateSchema.safeParse, "function");
  assert.equal(typeof PlaygroundPresetUpdateSchema.safeParse, "function");
  assert.equal(typeof PlaygroundPresetListItemSchema.safeParse, "function");
  assert.equal(typeof ToolDefinitionSchema.safeParse, "function");
  assert.equal(typeof StructuredOutputSchema.safeParse, "function");
  assert.equal(typeof StreamMetricsSchema.safeParse, "function");
});

// ── PlaygroundPresetRowSchema ──────────────────────────────────────────────────

test("PlaygroundPresetRowSchema: valid row parses correctly", () => {
  const row = {
    id: "123e4567-e89b-12d3-a456-426614174000",
    name: "My Preset",
    endpoint: "chat.completions",
    model: "gpt-4o-mini",
    system: "You are helpful.",
    params_json: '{"temperature":0.7}',
    created_at: "2025-01-01T00:00:00.000Z",
  };
  const result = PlaygroundPresetRowSchema.safeParse(row);
  assert.ok(result.success, "valid row should parse");
  if (result.success) {
    assert.equal(result.data.id, row.id);
    assert.equal(result.data.name, row.name);
    assert.equal(result.data.system, "You are helpful.");
    assert.equal(result.data.params_json, row.params_json);
  }
});

test("PlaygroundPresetRowSchema: null system is valid", () => {
  const row = {
    id: "123e4567-e89b-12d3-a456-426614174000",
    name: "Minimal Preset",
    endpoint: "embeddings",
    model: "text-embedding-3-small",
    system: null,
    params_json: "{}",
    created_at: "2025-01-01T00:00:00.000Z",
  };
  const result = PlaygroundPresetRowSchema.safeParse(row);
  assert.ok(result.success, "null system should be valid");
});

test("PlaygroundPresetRowSchema: invalid — missing required fields", () => {
  const result = PlaygroundPresetRowSchema.safeParse({ id: "not-a-uuid" });
  assert.ok(!result.success, "missing fields should fail");
  if (!result.success) {
    assert.ok(result.error instanceof ZodError);
  }
});

test("PlaygroundPresetRowSchema: invalid — id is not UUID", () => {
  const row = {
    id: "not-a-uuid",
    name: "My Preset",
    endpoint: "chat.completions",
    model: "gpt-4o",
    system: null,
    params_json: "{}",
    created_at: "2025-01-01T00:00:00.000Z",
  };
  const result = PlaygroundPresetRowSchema.safeParse(row);
  assert.ok(!result.success, "non-UUID id should fail");
});

test("PlaygroundPresetRowSchema: invalid — name empty string", () => {
  const row = {
    id: "123e4567-e89b-12d3-a456-426614174000",
    name: "",
    endpoint: "chat.completions",
    model: "gpt-4o",
    system: null,
    params_json: "{}",
    created_at: "2025-01-01T00:00:00.000Z",
  };
  const result = PlaygroundPresetRowSchema.safeParse(row);
  assert.ok(!result.success, "empty name should fail");
});

// ── PlaygroundPresetCreateSchema ──────────────────────────────────────────────

test("PlaygroundPresetCreateSchema: valid payload parses", () => {
  const payload = {
    name: "My new preset",
    endpoint: "chat.completions",
    model: "gpt-4o-mini",
    system: "Be helpful.",
    params: { temperature: 0.7, max_tokens: 1000 },
  };
  const result = PlaygroundPresetCreateSchema.safeParse(payload);
  assert.ok(result.success, "valid create payload should parse");
  if (result.success) {
    assert.deepEqual(result.data.params, { temperature: 0.7, max_tokens: 1000 });
  }
});

test("PlaygroundPresetCreateSchema: params defaults to {}", () => {
  const payload = {
    name: "Minimal preset",
    endpoint: "embeddings",
    model: "text-embedding-3-small",
  };
  const result = PlaygroundPresetCreateSchema.safeParse(payload);
  assert.ok(result.success, "minimal payload should parse");
  if (result.success) {
    assert.deepEqual(result.data.params, {});
  }
});

test("PlaygroundPresetCreateSchema: invalid — name too long", () => {
  const result = PlaygroundPresetCreateSchema.safeParse({
    name: "a".repeat(101),
    endpoint: "chat.completions",
    model: "gpt-4o",
  });
  assert.ok(!result.success, "name >100 chars should fail");
});

// ── PlaygroundPresetUpdateSchema ──────────────────────────────────────────────

test("PlaygroundPresetUpdateSchema: partial update is valid", () => {
  const result = PlaygroundPresetUpdateSchema.safeParse({ name: "Updated name" });
  assert.ok(result.success, "partial update with just name should parse");
});

test("PlaygroundPresetUpdateSchema: empty object is valid (all fields optional)", () => {
  const result = PlaygroundPresetUpdateSchema.safeParse({});
  assert.ok(result.success, "empty patch should parse");
});

// ── PlaygroundPresetListItemSchema ────────────────────────────────────────────

test("PlaygroundPresetListItemSchema: round-trip", () => {
  const item = {
    id: "123e4567-e89b-12d3-a456-426614174000",
    name: "Test",
    endpoint: "chat.completions",
    model: "gpt-4o",
    system: null,
    params: { temperature: 0.5 },
    created_at: "2025-01-01T00:00:00.000Z",
  };
  const result = PlaygroundPresetListItemSchema.safeParse(item);
  assert.ok(result.success, "list item round-trip");
  if (result.success) {
    assert.deepEqual(result.data.params, { temperature: 0.5 });
  }
});

// ── ToolDefinitionSchema ──────────────────────────────────────────────────────

test("ToolDefinitionSchema: valid tool definition parses", () => {
  const tool = {
    type: "function",
    function: {
      name: "get_weather",
      description: "Get current weather for a location.",
      parameters: {
        type: "object",
        properties: {
          location: { type: "string", description: "City name" },
        },
        required: ["location"],
      },
    },
  };
  const result = ToolDefinitionSchema.safeParse(tool);
  assert.ok(result.success, "valid tool definition should parse");
});

test("ToolDefinitionSchema: invalid — type is not 'function'", () => {
  const tool = {
    type: "other",
    function: {
      name: "my_tool",
      parameters: {},
    },
  };
  const result = ToolDefinitionSchema.safeParse(tool);
  assert.ok(!result.success, "type not 'function' should fail");
});

test("ToolDefinitionSchema: invalid — name empty", () => {
  const tool = {
    type: "function",
    function: {
      name: "",
      parameters: {},
    },
  };
  const result = ToolDefinitionSchema.safeParse(tool);
  assert.ok(!result.success, "empty name should fail");
});

test("ToolDefinitionSchema: invalid — missing function key", () => {
  const tool = { type: "function" };
  const result = ToolDefinitionSchema.safeParse(tool);
  assert.ok(!result.success, "missing function key should fail");
});

// ── StructuredOutputSchema ────────────────────────────────────────────────────

test("StructuredOutputSchema: valid structured output parses", () => {
  const so = {
    type: "json_schema",
    json_schema: {
      name: "my_schema",
      schema: {
        type: "object",
        properties: {
          answer: { type: "string" },
        },
      },
      strict: true,
    },
  };
  const result = StructuredOutputSchema.safeParse(so);
  assert.ok(result.success, "valid structured output should parse");
});

test("StructuredOutputSchema: without strict field (optional)", () => {
  const so = {
    type: "json_schema",
    json_schema: {
      name: "simple",
      schema: { type: "object" },
    },
  };
  const result = StructuredOutputSchema.safeParse(so);
  assert.ok(result.success, "strict field is optional");
});

test("StructuredOutputSchema: invalid — type not 'json_schema'", () => {
  const so = {
    type: "json_object",
    json_schema: { name: "test", schema: {} },
  };
  const result = StructuredOutputSchema.safeParse(so);
  assert.ok(!result.success, "wrong type should fail");
});

test("StructuredOutputSchema: invalid — name empty", () => {
  const so = {
    type: "json_schema",
    json_schema: {
      name: "",
      schema: {},
    },
  };
  const result = StructuredOutputSchema.safeParse(so);
  assert.ok(!result.success, "empty name should fail");
});

// ── StreamMetricsSchema ───────────────────────────────────────────────────────

test("StreamMetricsSchema: valid metrics with all values", () => {
  const metrics = {
    ttftMs: 250,
    totalMs: 3500,
    tokensOut: 150,
    tokensIn: 50,
    tps: 42.8,
    costUsd: 0.00023,
  };
  const result = StreamMetricsSchema.safeParse(metrics);
  assert.ok(result.success, "valid metrics should parse");
  if (result.success) {
    assert.equal(result.data.ttftMs, 250);
    assert.equal(result.data.tps, 42.8);
  }
});

test("StreamMetricsSchema: valid — nullable fields can be null", () => {
  const metrics = {
    ttftMs: null,
    totalMs: null,
    tokensOut: 0,
    tokensIn: 0,
    tps: null,
    costUsd: null,
  };
  const result = StreamMetricsSchema.safeParse(metrics);
  assert.ok(result.success, "null metrics should parse");
});

test("StreamMetricsSchema: invalid — negative tokensOut", () => {
  const metrics = {
    ttftMs: 100,
    totalMs: 500,
    tokensOut: -1,
    tokensIn: 10,
    tps: 2.0,
    costUsd: 0.001,
  };
  const result = StreamMetricsSchema.safeParse(metrics);
  assert.ok(!result.success, "negative tokensOut should fail");
});

test("StreamMetricsSchema: invalid — tokensOut is float (not int)", () => {
  const metrics = {
    ttftMs: 100,
    totalMs: 500,
    tokensOut: 1.5,
    tokensIn: 10,
    tps: 2.0,
    costUsd: 0.001,
  };
  const result = StreamMetricsSchema.safeParse(metrics);
  assert.ok(!result.success, "float tokensOut should fail int check");
});
