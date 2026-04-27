/**
 * Tests for resolveImageAsDataUri helper function.
 */

import test from "node:test";
import assert from "node:assert/strict";
import { resolveImageAsDataUri } from "@/lib/guardrails/visionBridgeHelpers";

test("resolveImageAsDataUri passes through HTTPS URL as-is", () => {
  const url = "https://example.com/image.png";
  const result = resolveImageAsDataUri(url);
  assert.strictEqual(result, url);
});

test("resolveImageAsDataUri passes through HTTP URL as-is", () => {
  const url = "http://example.com/image.png";
  const result = resolveImageAsDataUri(url);
  assert.strictEqual(result, url);
});

test("resolveImageAsDataUri passes through data URI as-is", () => {
  const dataUri =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==";
  const result = resolveImageAsDataUri(dataUri);
  assert.strictEqual(result, dataUri);
});

test("resolveImageAsDataUri converts base64 string to PNG data URI", () => {
  const base64 =
    "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==";
  const result = resolveImageAsDataUri(base64);
  assert.strictEqual(result, `data:image/png;base64,${base64}`);
});

test("resolveImageAsDataUri throws for empty string", () => {
  assert.throws(() => {
    resolveImageAsDataUri("");
  }, /Invalid image URL/);
});

test("resolveImageAsDataUri throws for null", () => {
  assert.throws(() => {
    resolveImageAsDataUri(null as unknown as string);
  }, /Invalid image URL/);
});

test("resolveImageAsDataUri throws for undefined", () => {
  assert.throws(() => {
    resolveImageAsDataUri(undefined as unknown as string);
  }, /Invalid image URL/);
});

test("resolveImageAsDataUri handles data URI with different media types", () => {
  const jpegUri = "data:image/jpeg;base64,/9j/4AAQSkZJRg==";
  const result = resolveImageAsDataUri(jpegUri);
  assert.strictEqual(result, jpegUri);
});

test("resolveImageAsDataUri treats plain base64 with prefix as data URI", () => {
  // If it doesn't start with data: or http, treat as raw base64
  const rawBase64 = "abcdef123456==";
  const result = resolveImageAsDataUri(rawBase64);
  assert.strictEqual(result, "data:image/png;base64,abcdef123456==");
});
