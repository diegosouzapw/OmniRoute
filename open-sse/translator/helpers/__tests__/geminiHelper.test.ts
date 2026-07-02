/**
 * Unit tests for geminiHelper.ts
 *
 * geminiHelper.ts is the pure-function core used by the Gemini/Antigravity
 * translation pipeline. It has zero runtime side effects (no HTTP, no DB,
 * no globals mutated) and is composed of small format-conversion helpers
 * plus the large `cleanJSONSchemaForAntigravity` schema rewriter that
 * prepares JSON Schema payloads for the Antigravity (Gemini-shaped)
 * upstream.
 *
 * Coverage targets (file: open-sse/translator/helpers/geminiHelper.ts):
 *   - GEMINI_UNSUPPORTED_SCHEMA_KEYS
 *   - UNSUPPORTED_SCHEMA_CONSTRAINTS
 *   - DEFAULT_SAFETY_SETTINGS
 *   - convertOpenAIContentToParts
 *   - extractTextContent
 *   - tryParseJSON
 *   - generateRequestId
 *   - generateSessionId
 *   - cleanJSONSchemaForAntigravity
 */
import { describe, it, expect } from "vitest";

import {
  GEMINI_UNSUPPORTED_SCHEMA_KEYS,
  UNSUPPORTED_SCHEMA_CONSTRAINTS,
  DEFAULT_SAFETY_SETTINGS,
  convertOpenAIContentToParts,
  extractTextContent,
  tryParseJSON,
  generateRequestId,
  generateSessionId,
  cleanJSONSchemaForAntigravity,
} from "../geminiHelper.ts";

// ──────────────────────────────────────────────────────────────────────────────
// Module-level constants
// ──────────────────────────────────────────────────────────────────────────────

describe("GEMINI_UNSUPPORTED_SCHEMA_KEYS", () => {
  it("is a Set", () => {
    expect(GEMINI_UNSUPPORTED_SCHEMA_KEYS).toBeInstanceOf(Set);
  });

  it("includes the JSON Schema keywords Gemini rejects", () => {
    // Spot-check a representative cross-section of the entries.
    expect(GEMINI_UNSUPPORTED_SCHEMA_KEYS.has("minLength")).toBe(true);
    expect(GEMINI_UNSUPPORTED_SCHEMA_KEYS.has("maxLength")).toBe(true);
    expect(GEMINI_UNSUPPORTED_SCHEMA_KEYS.has("$ref")).toBe(true);
    expect(GEMINI_UNSUPPORTED_SCHEMA_KEYS.has("definitions")).toBe(true);
    expect(GEMINI_UNSUPPORTED_SCHEMA_KEYS.has("additionalProperties")).toBe(false); // handled separately
  });

  it("includes UI/Cursor-injected non-schema fields", () => {
    expect(GEMINI_UNSUPPORTED_SCHEMA_KEYS.has("cornerRadius")).toBe(true);
    expect(GEMINI_UNSUPPORTED_SCHEMA_KEYS.has("fontFamily")).toBe(true);
  });

  it("is exposed as a frozen snapshot via UNSUPPORTED_SCHEMA_CONSTRAINTS", () => {
    expect(Array.isArray(UNSUPPORTED_SCHEMA_CONSTRAINTS)).toBe(true);
    // Mirrors the Set contents — the array is a stable, JSON-safe copy.
    expect(new Set(UNSUPPORTED_SCHEMA_CONSTRAINTS)).toEqual(GEMINI_UNSUPPORTED_SCHEMA_KEYS);
    // Mutating the returned array does not leak into the underlying Set.
    const snapshotLength = UNSUPPORTED_SCHEMA_CONSTRAINTS.length;
    UNSUPPORTED_SCHEMA_CONSTRAINTS.push("__test_only__");
    expect(GEMINI_UNSUPPORTED_SCHEMA_KEYS.size).toBeGreaterThan(0);
    expect(UNSUPPORTED_SCHEMA_CONSTRAINTS.length).toBe(snapshotLength + 1);
  });
});

describe("DEFAULT_SAFETY_SETTINGS", () => {
  it("disables every Gemini harm category", () => {
    expect(DEFAULT_SAFETY_SETTINGS).toHaveLength(5);
    for (const entry of DEFAULT_SAFETY_SETTINGS) {
      expect(entry.threshold).toBe("OFF");
    }
  });

  it("covers the full Gemini harm-category taxonomy", () => {
    const categories = DEFAULT_SAFETY_SETTINGS.map((entry) => entry.category).sort();
    expect(categories).toEqual([
      "HARM_CATEGORY_CIVIC_INTEGRITY",
      "HARM_CATEGORY_DANGEROUS_CONTENT",
      "HARM_CATEGORY_HARASSMENT",
      "HARM_CATEGORY_HATE_SPEECH",
      "HARM_CATEGORY_SEXUALLY_EXPLICIT",
    ]);
  });
});

// ──────────────────────────────────────────────────────────────────────────────
// convertOpenAIContentToParts
// ──────────────────────────────────────────────────────────────────────────────

describe("convertOpenAIContentToParts", () => {
  it("wraps a bare string in a Gemini text part", () => {
    expect(convertOpenAIContentToParts("hello")).toEqual([{ text: "hello" }]);
  });

  it("returns an empty list for null/undefined input", () => {
    expect(convertOpenAIContentToParts(null)).toEqual([]);
    expect(convertOpenAIContentToParts(undefined)).toEqual([]);
  });

  it("emits a single text part for an empty string (preserves intent)", () => {
    // Empty string is still a string → text part with empty payload.
    expect(convertOpenAIContentToParts("")).toEqual([{ text: "" }]);
  });

  it("converts OpenAI text blocks to Gemini text parts", () => {
    const out = convertOpenAIContentToParts([
      { type: "text", text: "alpha" },
      { type: "text", text: "beta" },
    ]);
    expect(out).toEqual([{ text: "alpha" }, { text: "beta" }]);
  });

  it("translates OpenAI image_url data URIs to inlineData", () => {
    const dataUri =
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==";
    const out = convertOpenAIContentToParts([
      { type: "image_url", image_url: { url: dataUri } },
    ]);
    expect(out).toHaveLength(1);
    expect(out[0]).toEqual({
      inlineData: {
        mimeType: "image/png",
        // base64 prefix is stripped before being handed to Gemini.
        data: "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==",
      },
    });
  });

  it("maps a remote https:// image_url to a Gemini fileData part", () => {
    const out = convertOpenAIContentToParts([
      { type: "image_url", image_url: { url: "https://example.com/cat.jpg" } },
    ]);
    expect(out).toEqual([
      { fileData: { fileUri: "https://example.com/cat.jpg", mimeType: "image/*" } },
    ]);
  });

  it("normalizes mp3 input_audio to the canonical audio/mpeg MIME type", () => {
    const out = convertOpenAIContentToParts([
      { type: "input_audio", input_audio: { data: "AAA=", format: "mp3" } },
    ]);
    expect(out).toEqual([{ inlineData: { mimeType: "audio/mpeg", data: "AAA=" } }]);
  });

  it("falls back to audio/<format> for non-mp3 audio input", () => {
    const out = convertOpenAIContentToParts([
      { type: "input_audio", input_audio: { data: "AAA=", format: "wav" } },
    ]);
    expect(out[0]).toEqual({ inlineData: { mimeType: "audio/wav", data: "AAA=" } });
  });

  it("converts an audio_url data URI to inlineData with the inferred MIME type", () => {
    const out = convertOpenAIContentToParts([
      {
        type: "audio_url",
        audio_url: {
          url: "data:audio/ogg;base64,T2dnUw==",
        },
      },
    ]);
    expect(out).toEqual([{ inlineData: { mimeType: "audio/ogg", data: "T2dnUw==" } }]);
  });

  it("translates Claude-style source.base64 PDF blocks to inlineData", () => {
    const out = convertOpenAIContentToParts([
      {
        type: "document",
        source: { type: "base64", media_type: "application/pdf", data: "JVBERi0=" },
      },
    ]);
    expect(out[0]).toEqual({
      inlineData: { mimeType: "application/pdf", data: "JVBERi0=" },
    });
  });

  it("strips a data:<mime>;base64, prefix from inline payloads", () => {
    const out = convertOpenAIContentToParts([
      {
        type: "file",
        file: { mime_type: "application/pdf", data: "data:application/pdf;base64,JVBERi0=" },
      },
    ]);
    expect(out[0]).toEqual({
      inlineData: { mimeType: "application/pdf", data: "JVBERi0=" },
    });
  });

  it("does not mutate the input array", () => {
    const input = [
      { type: "text", text: "hello" },
      { type: "image_url", image_url: { url: "https://example.com/x.png" } },
    ];
    const snapshot = JSON.stringify(input);
    convertOpenAIContentToParts(input);
    expect(JSON.stringify(input)).toBe(snapshot);
  });
});

// ──────────────────────────────────────────────────────────────────────────────
// extractTextContent
// ──────────────────────────────────────────────────────────────────────────────

describe("extractTextContent", () => {
  it("returns the original string when content is a string", () => {
    expect(extractTextContent("plain text")).toBe("plain text");
  });

  it("returns empty string for null/undefined", () => {
    expect(extractTextContent(null)).toBe("");
    expect(extractTextContent(undefined)).toBe("");
  });

  it("returns empty string for a numeric or boolean input", () => {
    expect(extractTextContent(42)).toBe("");
    expect(extractTextContent(true)).toBe("");
  });

  it("joins text blocks in order with no separator", () => {
    expect(
      extractTextContent([
        { type: "text", text: "first " },
        { type: "image_url", image_url: { url: "https://example.com/x.png" } },
        { type: "text", text: "second" },
      ])
    ).toBe("first second");
  });

  it("skips blocks whose text is missing or non-string", () => {
    expect(
      extractTextContent([
        { type: "text" },
        { type: "text", text: 42 },
        { type: "text", text: "kept" },
      ])
    ).toBe("kept");
  });
});

// ──────────────────────────────────────────────────────────────────────────────
// tryParseJSON
// ──────────────────────────────────────────────────────────────────────────────

describe("tryParseJSON", () => {
  it("parses well-formed JSON strings", () => {
    expect(tryParseJSON('{"a":1}')).toEqual({ a: 1 });
    expect(tryParseJSON("[1,2,3]")).toEqual([1, 2, 3]);
    expect(tryParseJSON('"hi"')).toBe("hi");
    expect(tryParseJSON("null")).toBeNull();
    expect(tryParseJSON("true")).toBe(true);
    expect(tryParseJSON("0")).toBe(0);
  });

  it("returns null for malformed JSON strings", () => {
    expect(tryParseJSON("{not json")).toBeNull();
    expect(tryParseJSON("[1,2,]")).toBeNull();
    expect(tryParseJSON("")).toBeNull();
  });

  it("returns the original value when given a non-string", () => {
    // Important contract: non-strings short-circuit (no throw, no coercion).
    expect(tryParseJSON(42)).toBe(42);
    expect(tryParseJSON(null)).toBeNull();
    expect(tryParseJSON(undefined)).toBeUndefined();
    const obj = { a: 1 };
    expect(tryParseJSON(obj)).toBe(obj);
  });
});

// ──────────────────────────────────────────────────────────────────────────────
// generateRequestId / generateSessionId
// ──────────────────────────────────────────────────────────────────────────────

describe("generateRequestId", () => {
  it("returns a string prefixed with 'agent-'", () => {
    expect(generateRequestId()).toMatch(/^agent-/);
  });

  it("produces a fresh UUIDv4 suffix on every call", () => {
    const first = generateRequestId();
    const second = generateRequestId();
    expect(first).not.toBe(second);
    expect(first.length).toBeGreaterThan("agent-".length);
    expect(second.length).toBeGreaterThan("agent-".length);
  });
});

describe("generateSessionId", () => {
  it("returns a string prefixed with '-' (negative-style id)", () => {
    expect(generateSessionId().startsWith("-")).toBe(true);
  });

  it("yields distinct session ids across calls", () => {
    const ids = new Set(Array.from({ length: 8 }, () => generateSessionId()));
    expect(ids.size).toBe(8);
  });

  it("only emits numeric digits after the leading dash", () => {
    // BigUint64 % 9e18 is always a non-negative integer, so the rest is digits.
    const id = generateSessionId();
    const body = id.slice(1);
    expect(body).toMatch(/^\d+$/);
    // And the body fits in a 19-digit unsigned 64-bit ceiling.
    expect(body.length).toBeLessThanOrEqual(19);
  });
});

// ──────────────────────────────────────────────────────────────────────────────
// cleanJSONSchemaForAntigravity
// ──────────────────────────────────────────────────────────────────────────────

describe("cleanJSONSchemaForAntigravity", () => {
  it("returns falsy and non-object input unchanged", () => {
    expect(cleanJSONSchemaForAntigravity(null)).toBeNull();
    expect(cleanJSONSchemaForAntigravity(undefined)).toBeUndefined();
    expect(cleanJSONSchemaForAntigravity("schema" as unknown)).toBe("schema");
    expect(cleanJSONSchemaForAntigravity(42 as unknown)).toBe(42);
  });

  it("does not mutate the input object (deep clone contract)", () => {
    const input = {
      type: "object",
      properties: { foo: { type: "string", minLength: 1, pattern: "^a" } },
      additionalProperties: false,
      default: "should-be-stripped",
    };
    const snapshot = JSON.stringify(input);
    const out = cleanJSONSchemaForAntigravity(input);
    expect(JSON.stringify(input)).toBe(snapshot);
    expect(out).not.toBe(input);
  });

  it("strips unsupported constraint keywords", () => {
    const out = cleanJSONSchemaForAntigravity({
      type: "object",
      properties: {
        // minLength/maxLength ARE in GEMINI_UNSUPPORTED_SCHEMA_KEYS — must go.
        // pattern is INTENTIONALLY kept (Antigravity accepts it).
        name: { type: "string", minLength: 3, maxLength: 10, pattern: "^[a-z]+$" },
        // exclusiveMinimum/exclusiveMaximum ARE in the unsupported list.
        age: { type: "integer", exclusiveMinimum: 0, exclusiveMaximum: 120 },
        // minItems/maxItems ARE in the unsupported list.
        tags: { type: "array", minItems: 1, maxItems: 5 },
      },
      required: ["name"],
    }) as Record<string, unknown>;

    const properties = out.properties as Record<string, Record<string, unknown>>;
    expect(properties.name).not.toHaveProperty("minLength");
    expect(properties.name).not.toHaveProperty("maxLength");
    expect(properties.age).not.toHaveProperty("exclusiveMinimum");
    expect(properties.age).not.toHaveProperty("exclusiveMaximum");
    expect(properties.tags).not.toHaveProperty("minItems");
    expect(properties.tags).not.toHaveProperty("maxItems");
    expect(properties.name.type).toBe("string");
    expect(properties.age.type).toBe("integer");
  });

  it("removes `additionalProperties` regardless of value", () => {
    const out = cleanJSONSchemaForAntigravity({
      type: "object",
      properties: { a: { type: "string" } },
      additionalProperties: false,
    }) as Record<string, unknown>;
    expect(out).not.toHaveProperty("additionalProperties");
  });

  it("flattens oneOf/anyOf by selecting the best non-null branch", () => {
    const out = cleanJSONSchemaForAntigravity({
      type: "object",
      properties: {
        payload: {
          anyOf: [
            { type: "string" },
            { type: "object", properties: { ok: { type: "boolean" } } },
            { type: "null" },
          ],
        },
      },
    }) as Record<string, Record<string, Record<string, unknown>>>;
    const payload = out.properties.payload;
    expect(payload).not.toHaveProperty("anyOf");
    expect(payload.type).toBe("object");
    expect(payload.properties).toEqual({ ok: { type: "boolean" } });
  });

  it("collapses a type: ['string','null'] array to a single primitive type", () => {
    const out = cleanJSONSchemaForAntigravity({
      type: ["string", "null"],
    }) as Record<string, unknown>;
    expect(out.type).toBe("string");
  });

  it("falls back to 'string' when a type array contains only 'null'", () => {
    const out = cleanJSONSchemaForAntigravity({
      type: ["null"],
    }) as Record<string, unknown>;
    expect(out.type).toBe("string");
  });

  it("merges allOf branches into the parent (properties + required)", () => {
    const out = cleanJSONSchemaForAntigravity({
      allOf: [
        { properties: { a: { type: "string" } }, required: ["a"] },
        { properties: { b: { type: "integer" } }, required: ["b"] },
      ],
    }) as Record<string, unknown>;
    expect(out).not.toHaveProperty("allOf");
    expect(out.properties).toEqual({
      a: { type: "string" },
      b: { type: "integer" },
    });
    expect((out.required as string[]).sort()).toEqual(["a", "b"]);
  });

  it("converts const to a single-element enum", () => {
    const out = cleanJSONSchemaForAntigravity({
      type: "object",
      properties: { mode: { const: "fast" } },
    }) as Record<string, Record<string, Record<string, unknown>>>;
    expect(out.properties.mode).not.toHaveProperty("const");
    expect(out.properties.mode.enum).toEqual(["fast"]);
  });

  it("removes enum entirely when the parent type is integer/number", () => {
    const out = cleanJSONSchemaForAntigravity({
      type: "object",
      properties: { score: { type: "integer", enum: [1, 2, 3] } },
    }) as Record<string, Record<string, Record<string, unknown>>>;
    expect(out.properties.score).not.toHaveProperty("enum");
    expect(out.properties.score.type).toBe("integer");
  });

  it("stringifies string-type enum values and defaults type to 'string'", () => {
    const out = cleanJSONSchemaForAntigravity({
      type: "object",
      properties: { color: { enum: ["red", 1, true] } },
    }) as Record<string, Record<string, Record<string, unknown>>>;
    expect(out.properties.color.enum).toEqual(["red", "1", "true"]);
    expect(out.properties.color.type).toBe("string");
  });

  it("drops required entries that are not declared in properties", () => {
    const out = cleanJSONSchemaForAntigravity({
      type: "object",
      properties: { keep: { type: "string" } },
      required: ["keep", "missing"],
    }) as Record<string, unknown>;
    expect(out.required).toEqual(["keep"]);
  });

  it("adds a 'reason' placeholder for empty object schemas (Antigravity requirement)", () => {
    const out = cleanJSONSchemaForAntigravity({
      type: "object",
      properties: { empty: { type: "object" } },
    }) as Record<string, Record<string, Record<string, unknown>>>;
    expect(out.properties.empty.type).toBe("object");
    expect(out.properties.empty.properties).toEqual({
      reason: {
        type: "string",
        description: "Brief explanation of why you are calling this tool",
      },
    });
    expect(out.properties.empty.required).toEqual(["reason"]);
  });

  it("inlines local $ref pointers pointing at $defs", () => {
    const out = cleanJSONSchemaForAntigravity({
      type: "object",
      $defs: {
        Address: {
          type: "object",
          properties: { city: { type: "string" } },
        },
      },
      properties: {
        home: { $ref: "#/$defs/Address" },
        work: { $ref: "#/$defs/Address" },
      },
    }) as Record<string, Record<string, Record<string, unknown>>>;
    expect(out).not.toHaveProperty("$defs");
    // Both references inlined with the same shape.
    expect(out.properties.home.type).toBe("object");
    expect(out.properties.home.properties).toEqual({ city: { type: "string" } });
    expect(out.properties.work.type).toBe("object");
    expect(out.properties.work.properties).toEqual({ city: { type: "string" } });
  });

  it("strips x-* extension fields at every level", () => {
    const out = cleanJSONSchemaForAntigravity({
      type: "object",
      "x-prompt-cache": true,
      properties: {
        inner: { type: "string", "x-private": "value" },
      },
    }) as Record<string, unknown>;
    expect(out).not.toHaveProperty("x-prompt-cache");
    const props = out.properties as Record<string, Record<string, unknown>>;
    expect(props.inner).not.toHaveProperty("x-private");
  });

  it("strips unsupported constraint keywords", () => {
    const out = cleanJSONSchemaForAntigravity({
      type: "object",
      properties: {
        // minLength/maxLength ARE in GEMINI_UNSUPPORTED_SCHEMA_KEYS — must go.
        // pattern is INTENTIONALLY kept (Antigravity accepts it).
        name: { type: "string", minLength: 3, maxLength: 10, pattern: "^[a-z]+$" },
        // exclusiveMinimum/exclusiveMaximum ARE in the unsupported list.
        age: { type: "integer", exclusiveMinimum: 0, exclusiveMaximum: 120 },
        // minItems/maxItems ARE in the unsupported list.
        tags: { type: "array", minItems: 1, maxItems: 5 },
      },
      required: ["name"],
    }) as Record<string, unknown>;

    const properties = out.properties as Record<string, Record<string, unknown>>;
    expect(properties.name).not.toHaveProperty("minLength");
    expect(properties.name).not.toHaveProperty("maxLength");
    expect(properties.age).not.toHaveProperty("exclusiveMinimum");
    expect(properties.age).not.toHaveProperty("exclusiveMaximum");
    expect(properties.tags).not.toHaveProperty("minItems");
    expect(properties.tags).not.toHaveProperty("maxItems");
    expect(properties.name.type).toBe("string");
    expect(properties.age.type).toBe("integer");
  });

  it("does not delete property names that match unsupported keywords (#1368)", () => {
    // 'pattern' is a property NAME on a glob tool — it must NOT be stripped.
    // (pattern is no longer in GEMINI_UNSUPPORTED_SCHEMA_KEYS — Antigravity accepts it.)
    const out = cleanJSONSchemaForAntigravity({
      type: "object",
      properties: {
        pattern: { type: "string", minLength: 1 },
        // 'exclusiveMinimum' is in the unsupported keyword set — must be stripped.
        enum: { type: "integer", exclusiveMinimum: 0 },
      },
      required: ["pattern", "enum"],
    }) as Record<string, Record<string, Record<string, unknown>>>;
    // Property names survive.
    expect(out.properties.pattern).toBeDefined();
    expect(out.properties.enum).toBeDefined();
    expect((out.required as unknown as string[]).sort()).toEqual(["enum", "pattern"]);
    // But the *inner schema* still loses its unsupported keywords.
    expect(out.properties.pattern).not.toHaveProperty("minLength");
    expect(out.properties.enum).not.toHaveProperty("exclusiveMinimum");
  });

  it("handles an Anthropic Messages-API-style tool schema end-to-end", () => {
    // Realistic tool schema pulled from a Claude Code tool definition.
    const claudeTool = {
      name: "search",
      description: "Search the web",
      input_schema: {
        type: "object",
        $defs: {
          Query: {
            type: "object",
            properties: { q: { type: "string", minLength: 1 } },
            required: ["q"],
          },
        },
        properties: {
          query: { $ref: "#/$defs/Query" },
          top_k: { type: "integer", minimum: 1, maximum: 50, default: 10 },
          filters: {
            type: "object",
            additionalProperties: { type: "string" },
          },
          mode: { const: "fast" },
        },
        required: ["query"],
      },
    };

    const cleaned = cleanJSONSchemaForAntigravity(claudeTool.input_schema) as Record<
      string,
      unknown
    >;

    // $defs inlined.
    expect(cleaned).not.toHaveProperty("$defs");
    const props = cleaned.properties as Record<string, Record<string, unknown>>;
    expect(props.query.type).toBe("object");
    expect(props.query.properties).toEqual({ q: { type: "string" } });

    // exclusiveMinimum/exclusiveMaximum are stripped (they're in the unsupported set);
    // `default` is also removed (it's in GEMINI_UNSUPPORTED_SCHEMA_KEYS).
    expect(props.top_k).not.toHaveProperty("exclusiveMinimum");
    expect(props.top_k).not.toHaveProperty("exclusiveMaximum");
    expect(props.top_k).not.toHaveProperty("default");

    // additionalProperties removed.
    expect(props.filters).not.toHaveProperty("additionalProperties");

    // const → enum.
    expect(props.mode.enum).toEqual(["fast"]);
  });
});