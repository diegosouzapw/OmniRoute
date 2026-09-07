import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
import {
  canonicalJson,
  canonicalJsonSha256,
  deriveToolRequestIdentity,
} from "../../../src/lib/skills/stableJson.ts";

test("canonicalJson sorts nested object keys and preserves array order", () => {
  const a = { z: [{ b: 2, a: 1 }], a: true };
  const b = { a: true, z: [{ a: 1, b: 2 }] };
  assert.equal(canonicalJson(a), canonicalJson(b));
  assert.equal(canonicalJsonSha256(a), canonicalJsonSha256(b));
  assert.notEqual(canonicalJsonSha256({ a: [1, 2] }), canonicalJsonSha256({ a: [2, 1] }));
  assert.equal(
    deriveToolRequestIdentity({
      apiKeyId: "key-a",
      stableClientRequestId: "req-a",
      skillRequestId: "internal-1",
      postInjectionBody: a,
    }),
    deriveToolRequestIdentity({
      apiKeyId: "key-a",
      stableClientRequestId: "req-a",
      skillRequestId: "internal-2",
      postInjectionBody: b,
    })
  );
});

test("canonicalJson rejects values that cannot form an execution identity", () => {
  const cyclic: Record<string, unknown> = {};
  cyclic.self = cyclic;
  for (const value of [undefined, 1n, Number.NaN, Number.POSITIVE_INFINITY, cyclic]) {
    assert.throws(() => canonicalJson(value), /canonical JSON/i);
  }
  assert.throws(() => canonicalJson({ bad: () => 1 }), /canonical JSON/i);
  assert.throws(() => canonicalJson({ bad: Symbol("x") }), /canonical JSON/i);
});

test("canonicalJson sorts keys by Unicode code point, not UTF-16 code unit", () => {
  // \uE000 (BMP private-use, code point 57344) vs "a" (code point 97)
  // Code-point sort: a=97 < \uE000=57344
  const withBmp = { "\uE000": 1, a: 2 };
  const withAstral = { "\u{10000}": 1, a: 2 };
  const sorted1 = canonicalJson(withBmp);
  const sorted2 = canonicalJson(withAstral);
  // a < \uE000 in code-point order
  const bmpKey = "\uE000";
  assert.ok(
    sorted1.indexOf('"a"') < sorted1.indexOf(bmpKey),
    `expected "a" before BMP key in: ${sorted1}`
  );
  // a < \u{10000} in code-point order; astral is encoded as surrogate pair
  const astralKey = "\u{10000}";
  assert.ok(
    sorted2.indexOf('"a"') < sorted2.indexOf(astralKey),
    `expected "a" before astral key in: ${sorted2}`
  );
});

test("canonicalJson normalizes -0 to 0", () => {
  assert.equal(canonicalJson({ val: -0 }), '{"val":0}');
  assert.equal(canonicalJson({ val: 0 }), '{"val":0}');
  assert.equal(canonicalJsonSha256({ val: -0 }), canonicalJsonSha256({ val: 0 }));
});

test("canonicalJson rejects sparse arrays", () => {
  const sparse = [1, , 3];
  assert.throws(() => canonicalJson(sparse), /canonical JSON/i);
});

test("canonicalJson rejects objects with getters/accessors", () => {
  const obj: Record<string, unknown> = {};
  Object.defineProperty(obj, "hidden", {
    get() {
      return 42;
    },
    enumerable: true,
  });
  assert.throws(() => canonicalJson(obj), /canonical JSON/i);
});

test("canonicalJson rejects non-plain objects (Date, Map, Set, class instances)", () => {
  assert.throws(() => canonicalJson(new Date()), /canonical JSON/i);
  assert.throws(() => canonicalJson(new Map()), /canonical JSON/i);
  assert.throws(() => canonicalJson(new Set()), /canonical JSON/i);
  class Custom {}
  assert.throws(() => canonicalJson(new Custom()), /canonical JSON/i);
});

test("deriveToolRequestIdentity uses stableClientRequestId when present", () => {
  const body = { a: 1, b: 2 };
  const withStable = deriveToolRequestIdentity({
    apiKeyId: "key-1",
    stableClientRequestId: "idempotent-req-1",
    skillRequestId: "uuid-internal",
    postInjectionBody: body,
  });
  const withDifferentInternal = deriveToolRequestIdentity({
    apiKeyId: "key-1",
    stableClientRequestId: "idempotent-req-1",
    skillRequestId: "different-uuid",
    postInjectionBody: body,
  });
  // stable key present => internal UUID ignored
  assert.equal(withStable, withDifferentInternal);
});

test("deriveToolRequestIdentity uses skillRequestId when stableClientRequestId is null", () => {
  const body = { a: 1 };
  const r1 = deriveToolRequestIdentity({
    apiKeyId: "key-1",
    stableClientRequestId: null,
    skillRequestId: "uuid-a",
    postInjectionBody: body,
  });
  const r2 = deriveToolRequestIdentity({
    apiKeyId: "key-1",
    stableClientRequestId: null,
    skillRequestId: "uuid-b",
    postInjectionBody: body,
  });
  // Different skillRequestId => different identity
  assert.notEqual(r1, r2);
});

test("deriveToolRequestIdentity includes apiKeyId and body digest", () => {
  const body = { x: 1 };
  const r1 = deriveToolRequestIdentity({
    apiKeyId: "key-1",
    stableClientRequestId: "req",
    skillRequestId: "sr",
    postInjectionBody: body,
  });
  const r2 = deriveToolRequestIdentity({
    apiKeyId: "key-2",
    stableClientRequestId: "req",
    skillRequestId: "sr",
    postInjectionBody: body,
  });
  assert.notEqual(r1, r2);
  // Body change => different identity
  const r3 = deriveToolRequestIdentity({
    apiKeyId: "key-1",
    stableClientRequestId: "req",
    skillRequestId: "sr",
    postInjectionBody: { x: 2 },
  });
  assert.notEqual(r1, r3);
});

test("canonicalJson sorts BMP PUA \uE000 before astral \u{10000} in same object", () => {
  // U+E000 (BMP private-use, code point 57344) vs U+10000 (Linear B, code point 65536)
  // code-point order: E000 < 10000
  // UTF-16 code-unit order: \uD800 (surrogate of 10000) < \uE000 — reversed!
  // So default .sort() would place \u{10000} before \uE000.
  const obj = { "\u{10000}": 1, "\uE000": 2 };
  const serialized = canonicalJson(obj);
  const e000Pos = serialized.indexOf("\uE000");
  const astralPos = serialized.indexOf("\u{10000}");
  assert.ok(
    e000Pos < astralPos,
    `expected \\uE000 (pos ${e000Pos}) before \\u{10000} (pos ${astralPos}) in: ${serialized}`
  );
});

test("canonicalJson rejects objects with getters without invoking the getter", () => {
  let getterCallCount = 0;
  const obj: Record<string, unknown> = {};
  Object.defineProperty(obj, "hidden", {
    get() {
      getterCallCount++;
      return 42;
    },
    enumerable: true,
  });
  assert.throws(() => canonicalJson(obj), /canonical JSON/i);
  assert.equal(
    getterCallCount,
    0,
    "getter must not be invoked when canonicalJson rejects the object"
  );
});

test("termination union in toolLoopTypes.ts source matches expected set", () => {
  const src = fs.readFileSync(
    path.resolve(__dirname, "../../../src/lib/skills/toolLoopTypes.ts"),
    "utf8"
  );

  // Extract the termination union block from ServerOwnedToolLoopResult
  const loopResultStart = src.indexOf("interface ServerOwnedToolLoopResult");
  assert.ok(loopResultStart !== -1, "ServerOwnedToolLoopResult must exist in toolLoopTypes.ts");
  const afterLoopResult = src.slice(loopResultStart);
  const termStart = afterLoopResult.indexOf("termination:");
  assert.ok(termStart !== -1, "termination must exist in ServerOwnedToolLoopResult");
  const afterTerm = afterLoopResult.slice(termStart);
  // Match until the closing brace of the interface
  const closingBrace = afterTerm.indexOf("\n}");
  assert.ok(closingBrace !== -1, "closing brace must follow termination union");
  const unionText = afterTerm.slice(0, closingBrace);

  const actual = new Set<string>();
  for (const m of unionText.matchAll(/"([^"]+)"/g)) {
    actual.add(m[1]);
  }

  const expected = new Set([
    "completed",
    "client_tools",
    "mixed_tools",
    "max_followups",
    "tool_output_budget",
    "deadline",
    "client_abort",
    "provider_error",
    "connection_mismatch",
    "execution_in_progress",
    "execution_unknown",
    "execution_identity_conflict",
    "execution_error",
    "execution_timeout",
  ]);

  // Every expected member must appear in source
  for (const val of expected) {
    assert.ok(actual.has(val), `termination union in source must include "${val}"`);
  }
  // No extra unexpected members
  for (const val of actual) {
    assert.ok(expected.has(val), `unexpected termination member "${val}" in source`);
  }
});
