// jsonLength() must equal JSON.stringify().length exactly (#7847).
//
// Every consumer feeds a threshold — an adaptive readiness timeout, a compression trigger, a
// payload-size metric. An approximation would silently shift routing decisions, so "close
// enough" is not acceptable and this is property-tested rather than spot-checked.
import { test } from "node:test";
import assert from "node:assert/strict";

const { jsonLength } = await import("../../../open-sse/utils/jsonSize.ts");

const exact = (value: unknown, label?: string) => {
  const expected = JSON.stringify(value);
  assert.equal(
    jsonLength(value),
    expected === undefined ? 0 : expected.length,
    label ?? `mismatch for ${expected === undefined ? "undefined" : expected.slice(0, 120)}`
  );
};

// ── Deterministic generator (no Math.random: a flaky property test is worthless) ──
function lcg(seed: number): () => number {
  let s = seed >>> 0;
  return () => (s = (s * 1664525 + 1013904223) >>> 0) / 0x100000000;
}

const NASTY_STRINGS = [
  "",
  "plain",
  'has "quotes"',
  "back\\slash",
  "new\nline\ttab\r\b\f",
  "\u0000\u0001\u001f control",
  "unicode ✓ ñ 中文 اللغة",
  "emoji 🙂🎉👨‍👩‍👧‍👦",
  "\ud83d", // lone high surrogate
  "\udc00", // lone low surrogate
  "😀", // well-formed pair
  "mixed \ud83d text \udc00 more",
  '{"looks":"like json"}',
];

const NASTY_NUMBERS = [
  0,
  -0,
  1,
  -1,
  3.14,
  -2.5e-7,
  1e21,
  1e-21,
  Number.MAX_SAFE_INTEGER,
  NaN,
  Infinity,
  -Infinity,
];

function gen(rnd: () => number, depth: number): unknown {
  const roll = rnd();
  if (depth <= 0 || roll < 0.28) {
    const leaf = rnd();
    if (leaf < 0.3) return NASTY_STRINGS[Math.floor(rnd() * NASTY_STRINGS.length)];
    if (leaf < 0.55) return NASTY_NUMBERS[Math.floor(rnd() * NASTY_NUMBERS.length)];
    if (leaf < 0.7) return rnd() < 0.5;
    if (leaf < 0.8) return null;
    if (leaf < 0.87) return undefined;
    if (leaf < 0.93) return () => {};
    return Symbol("s");
  }
  if (roll < 0.64) {
    const n = Math.floor(rnd() * 6);
    return Array.from({ length: n }, () => gen(rnd, depth - 1));
  }
  const n = Math.floor(rnd() * 6);
  const out: Record<string, unknown> = {};
  for (let i = 0; i < n; i++) {
    const key = rnd() < 0.4 ? NASTY_STRINGS[Math.floor(rnd() * NASTY_STRINGS.length)] : `k${i}`;
    out[key] = gen(rnd, depth - 1);
  }
  return out;
}

test("property: jsonLength equals JSON.stringify().length over 4000 generated structures", () => {
  const rnd = lcg(0xc0ffee);
  for (let i = 0; i < 4000; i++) {
    const value = gen(rnd, 4);
    const expected = JSON.stringify(value);
    assert.equal(
      jsonLength(value),
      expected === undefined ? 0 : expected.length,
      `case ${i} mismatch — value: ${expected === undefined ? "undefined" : expected.slice(0, 200)}`
    );
  }
});

test("primitives", () => {
  for (const v of [null, true, false, ...NASTY_NUMBERS, ...NASTY_STRINGS]) exact(v);
  assert.equal(jsonLength(undefined), 0);
  assert.equal(
    jsonLength(() => {}),
    0
  );
  assert.equal(jsonLength(Symbol("x")), 0);
});

test("omitted values: dropped in objects, null in arrays", () => {
  exact({ a: undefined, b: 1, c: () => {}, d: Symbol("s"), e: 2 });
  exact([undefined, 1, () => {}, Symbol("s"), 2]);
  exact({ onlyOmitted: undefined });
  exact([undefined]);
});

test("string escaping matches byte for byte", () => {
  for (const s of NASTY_STRINGS) {
    exact(s);
    exact({ [s]: s });
    exact([s, { nested: s }]);
  }
});

test("non-plain values fall back to JSON.stringify for that subtree only", () => {
  exact({ when: new Date("2026-07-25T00:00:00.000Z") });
  exact({ custom: { toJSON: () => ({ replaced: "yes" }) } });
  exact({ map: new Map([["a", 1]]) });
  exact({ boxed: new String("boxed") });
  exact({ re: /abc/g });
  // The fallback must not disturb siblings on the fast path.
  exact({ when: new Date(0), messages: [{ role: "user", content: "hello" }] });
});

test("a realistic agent request body", () => {
  const body = {
    model: "claude-opus-5",
    stream: true,
    max_tokens: 4096,
    messages: Array.from({ length: 200 }, (_, i) => ({
      role: i % 2 === 0 ? "user" : "assistant",
      content: `message ${i} with "quotes", \\slashes\\ and a newline\n`,
    })),
    tools: Array.from({ length: 40 }, (_, i) => ({
      type: "function",
      function: {
        name: `tool_${i}`,
        description: "does a thing — with an em dash and unicode ✓",
        parameters: { type: "object", properties: { a: { type: "string" } }, required: ["a"] },
      },
    })),
  };
  exact(body, "realistic agent body must match exactly");
});

test("throws on the same inputs JSON.stringify throws on", () => {
  const circular: Record<string, unknown> = { a: 1 };
  circular.self = circular;
  assert.throws(() => jsonLength(circular), /circular/i);
  assert.throws(() => JSON.stringify(circular), /circular/i);

  assert.throws(() => jsonLength({ big: 1n }), /BigInt/i);
  assert.throws(() => JSON.stringify({ big: 1n }), /BigInt/i);
});

test("a value repeated in sibling positions is not mistaken for a cycle", () => {
  const shared = { role: "user", content: "shared" };
  exact({ a: shared, b: shared, list: [shared, shared] });
});

test("does not allocate the serialized string", () => {
  // The whole point: measuring a 4 MiB body must not cost 4 MiB. Compare peak retained heap of
  // jsonLength against JSON.stringify().length on the same value.
  const gcFn = globalThis.gc as (() => void) | undefined;
  if (typeof gcFn !== "function") return; // node:test runs without --expose-gc by default

  const body = {
    messages: Array.from({ length: 2000 }, (_, i) => ({ role: "user", content: "x".repeat(2000) })),
  };
  const settle = () => {
    for (let i = 0; i < 4; i++) gcFn();
  };

  settle();
  const beforeStringify = process.memoryUsage().heapUsed;
  const held = JSON.stringify(body);
  const stringifyCost = process.memoryUsage().heapUsed - beforeStringify;
  assert.ok(held.length > 0);

  settle();
  const beforeWalk = process.memoryUsage().heapUsed;
  const walked = jsonLength(body);
  const walkCost = process.memoryUsage().heapUsed - beforeWalk;

  assert.equal(walked, held.length);
  assert.ok(
    walkCost < stringifyCost / 10,
    `jsonLength allocated ${walkCost} bytes vs stringify ${stringifyCost} — it must not materialize the string`
  );
});
