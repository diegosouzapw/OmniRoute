/**
 * G-08 — CliproxyModelMappingEditor: parser/validator unit tests.
 *
 * Only exercises the pure `parseMappingJson` function — no React rendering.
 */

import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  parseMappingJson,
  type MappingParseResult,
} from "../../../../../src/app/(dashboard)/dashboard/providers/services/components/CliproxyModelMappingEditor.tsx";

// ── Module shape ──────────────────────────────────────────────────────────────

describe("CliproxyModelMappingEditor — module shape", () => {
  it("exports parseMappingJson as a function", async () => {
    const mod =
      await import("../../../../../src/app/(dashboard)/dashboard/providers/services/components/CliproxyModelMappingEditor.tsx");
    assert.equal(typeof mod.parseMappingJson, "function");
  });

  it("exports CliproxyModelMappingEditor as a function", async () => {
    const mod =
      await import("../../../../../src/app/(dashboard)/dashboard/providers/services/components/CliproxyModelMappingEditor.tsx");
    assert.equal(typeof mod.CliproxyModelMappingEditor, "function");
  });

  it("MappingParseResult ok-variant has value field", () => {
    const result: MappingParseResult = parseMappingJson("{}");
    assert.ok(result.ok);
    if (result.ok) assert.ok("value" in result);
  });

  it("MappingParseResult error-variant has error field", () => {
    const result: MappingParseResult = parseMappingJson("invalid");
    assert.equal(result.ok, false);
    if (!result.ok) assert.ok("error" in result);
  });
});

// ── Valid inputs ───────────────────────────────────────────────────────────────

describe("parseMappingJson — valid inputs", () => {
  it("accepts empty object", () => {
    const result = parseMappingJson("{}");
    assert.ok(result.ok);
    if (result.ok) assert.deepEqual(result.value, {});
  });

  it("accepts single string-to-string entry", () => {
    const result = parseMappingJson('{"gpt-4o": "openai-gpt-4o"}');
    assert.ok(result.ok);
    if (result.ok) assert.deepEqual(result.value, { "gpt-4o": "openai-gpt-4o" });
  });

  it("accepts multiple entries", () => {
    const raw = JSON.stringify({
      "gpt-4o": "openai-gpt-4o",
      "claude-sonnet-4.5": "anthropic-claude-sonnet",
    });
    const result = parseMappingJson(raw);
    assert.ok(result.ok);
    if (result.ok) {
      assert.equal(result.value["gpt-4o"], "openai-gpt-4o");
      assert.equal(result.value["claude-sonnet-4.5"], "anthropic-claude-sonnet");
    }
  });

  it("accepts pretty-printed JSON", () => {
    const raw = `{
  "gpt-4o": "openai-gpt-4o"
}`;
    const result = parseMappingJson(raw);
    assert.ok(result.ok);
  });

  it("accepts empty string values", () => {
    const result = parseMappingJson('{"model-a": ""}');
    assert.ok(result.ok);
    if (result.ok) assert.equal(result.value["model-a"], "");
  });
});

// ── Invalid JSON syntax ────────────────────────────────────────────────────────

describe("parseMappingJson — invalid JSON syntax", () => {
  it("rejects bare text", () => {
    const result = parseMappingJson("not json");
    assert.equal(result.ok, false);
    if (!result.ok) assert.match(result.error, /json|token|unexpected/i);
  });

  it("rejects trailing comma", () => {
    const result = parseMappingJson('{"a": "b",}');
    assert.equal(result.ok, false);
  });

  it("rejects unclosed brace", () => {
    const result = parseMappingJson('{"a": "b"');
    assert.equal(result.ok, false);
  });

  it("rejects empty string", () => {
    const result = parseMappingJson("");
    assert.equal(result.ok, false);
  });
});

// ── Wrong shape ───────────────────────────────────────────────────────────────

describe("parseMappingJson — wrong shape", () => {
  it("rejects JSON array", () => {
    const result = parseMappingJson('["a", "b"]');
    assert.equal(result.ok, false);
    if (!result.ok) assert.match(result.error, /object|array/i);
  });

  it("rejects JSON string primitive", () => {
    const result = parseMappingJson('"hello"');
    assert.equal(result.ok, false);
  });

  it("rejects JSON number", () => {
    const result = parseMappingJson("42");
    assert.equal(result.ok, false);
  });

  it("rejects JSON null", () => {
    const result = parseMappingJson("null");
    assert.equal(result.ok, false);
  });

  it("rejects object with non-string value (number)", () => {
    const result = parseMappingJson('{"model-a": 123}');
    assert.equal(result.ok, false);
    if (!result.ok) assert.match(result.error, /model-a/);
  });

  it("rejects object with non-string value (boolean)", () => {
    const result = parseMappingJson('{"model-a": true}');
    assert.equal(result.ok, false);
    if (!result.ok) assert.match(result.error, /model-a/);
  });

  it("rejects object with non-string value (array)", () => {
    const result = parseMappingJson('{"model-a": ["nested"]}');
    assert.equal(result.ok, false);
    if (!result.ok) assert.match(result.error, /model-a/);
  });

  it("rejects object with non-string value (object)", () => {
    const result = parseMappingJson('{"model-a": {"nested": true}}');
    assert.equal(result.ok, false);
    if (!result.ok) assert.match(result.error, /model-a/);
  });

  it("rejects mixed valid/invalid entries — reports the bad key", () => {
    const result = parseMappingJson('{"gpt-4o": "openai-gpt-4o", "bad": 0}');
    assert.equal(result.ok, false);
    if (!result.ok) assert.match(result.error, /bad/);
  });
});

// ── Round-trip ────────────────────────────────────────────────────────────────

describe("parseMappingJson — round-trip", () => {
  it("re-serializes to identical object", () => {
    const original = { a: "x", b: "y" };
    const raw = JSON.stringify(original);
    const result = parseMappingJson(raw);
    assert.ok(result.ok);
    if (result.ok) assert.deepEqual(result.value, original);
  });
});
