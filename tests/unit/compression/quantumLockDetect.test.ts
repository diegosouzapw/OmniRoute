import test from "node:test";
import assert from "node:assert/strict";
import {
  QUANTUM_PATTERNS,
  TAIL_DELIM,
  placeholderFor,
} from "../../../open-sse/services/compression/quantumLock/quantumPatterns.ts";

test("placeholderFor is positional and value-independent", () => {
  assert.equal(placeholderFor(0), "⟦Q0⟧");
  assert.equal(placeholderFor(7), "⟦Q7⟧");
});

test("TAIL_DELIM is the documented sentinel", () => {
  assert.equal(TAIL_DELIM, "⟦QUANTUMLOCK⟧");
});

test("every pattern is global and the order is fixed (jwt before long_hex)", () => {
  const order = QUANTUM_PATTERNS.map((p) => p.category);
  assert.ok(order.indexOf("jwt") < order.indexOf("long_hex"));
  assert.ok(order.indexOf("api_key_shape") < order.indexOf("uuid"));
  assert.ok(order.lastIndexOf("unix_ts") === order.length - 1, "unix_ts runs last");
  for (const { pattern } of QUANTUM_PATTERNS) assert.ok(pattern.flags.includes("g"));
});

test("patterns are ReDoS-bounded: adversarial input returns promptly", () => {
  const evil = "a".repeat(50_000) + "!".repeat(50_000);
  const start = Date.now();
  for (const { pattern } of QUANTUM_PATTERNS) {
    pattern.lastIndex = 0;
    pattern.test(evil);
  }
  assert.ok(Date.now() - start < 500, "all patterns finish quickly on adversarial input");
});

import { detectVolatileSpans } from "../../../open-sse/services/compression/quantumLock/quantumLock.ts";

const ALL = { enabled: true } as const;
const span = (text: string, s: { start: number; end: number }) => text.slice(s.start, s.end);

test("detects a uuid and its inner hex is NOT also claimed by long_hex", () => {
  const t = "session 550e8400-e29b-41d4-a716-446655440000 ready";
  const spans = detectVolatileSpans(t, ALL);
  assert.equal(spans.length, 1);
  assert.equal(spans[0].category, "uuid");
  assert.equal(span(t, spans[0]), "550e8400-e29b-41d4-a716-446655440000");
});

test("a JWT is captured whole, not split into hex/segments", () => {
  const jwt = "eyJhbGciOiJIUzI1NiwidHlwIjoiSldUIn0.eyJzdWIiOiIxMjM0NTY3ODkwIn0.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
  const spans = detectVolatileSpans(`auth ${jwt} end`, ALL);
  assert.equal(spans.length, 1);
  assert.equal(spans[0].category, "jwt");
});

test("detects unix_ts (13-digit) and api_key_shape and request_id", () => {
  const cats = detectVolatileSpans(
    "ts 1718900000000 key sk-ABCDEFGHIJKLMNOP01 rid req-abc123def456",
    ALL
  ).map((s) => s.category);
  assert.ok(cats.includes("unix_ts"));
  assert.ok(cats.includes("api_key_shape"));
  assert.ok(cats.includes("request_id"));
});

test("category filter restricts what is detected", () => {
  const spans = detectVolatileSpans(
    "550e8400-e29b-41d4-a716-446655440000 and 1718900000",
    { enabled: true, categories: ["unix_ts"] }
  );
  assert.equal(spans.length, 1);
  assert.equal(spans[0].category, "unix_ts");
});

test("no false-positive on prose / dates / short numbers", () => {
  assert.equal(detectVolatileSpans("The meeting is on 2026-06-28 at 10am, room 42.", ALL).length, 0);
});

test("spans are sorted ascending and non-overlapping", () => {
  const t = "a 550e8400-e29b-41d4-a716-446655440000 b req-abcdef123456 c 1718900000";
  const spans = detectVolatileSpans(t, ALL);
  for (let i = 1; i < spans.length; i++) assert.ok(spans[i].start >= spans[i - 1].end);
});

test("empty / non-string is a no-op", () => {
  assert.deepEqual(detectVolatileSpans("", ALL), []);
});

test("a JWT whose signature ends in base64url '-' is still detected (no \\b misfire)", () => {
  // Third segment ends with '-'; a trailing \b would require a following word char and miss it.
  const jwt = "eyJhbGciOiJIUzI1NiwidHlwIjoiSldUIn0.eyJzdWIiOiIxMjM0NTY3ODkwIn0.SflKxwRJSMeKKF2Q-";
  const t = `auth ${jwt} done`;
  const spans = detectVolatileSpans(t, ALL);
  assert.equal(spans.length, 1);
  assert.equal(spans[0].category, "jwt");
  assert.equal(span(t, spans[0]), jwt);
});
