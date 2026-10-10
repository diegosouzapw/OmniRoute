/**
 * Differential parity: live context estimator + image pruner vs the frozen
 * pre-optimization oracle (tests/helpers/context-estimation-reference.ts).
 *
 * The optimization PR (fused virtual measurement + incremental pruning deltas)
 * must reproduce the oracle's EXACT integers — not approximately. Cases cover
 * every recognized image/document wire shape, text-path values (remote URLs,
 * generic base64), escaping stress, container shapes, aliasing, and a
 * boundary-target sweep around each pruning prefix (target = level ± 1) so the
 * stop condition is exercised at every rounding edge.
 */
import { test } from "node:test";
import assert from "node:assert/strict";

import { estimateTokens, pruneOlderInlineImages } from "../../open-sse/services/contextManager.ts";
import {
  referenceEstimateTokens,
  referencePruneOlderInlineImages,
} from "../helpers/context-estimation-reference.ts";

const originalKeepEnv = process.env.CONTEXT_KEEP_LATEST_IMAGES;
delete process.env.CONTEXT_KEEP_LATEST_IMAGES;
test.after(() => {
  if (originalKeepEnv !== undefined) process.env.CONTEXT_KEEP_LATEST_IMAGES = originalKeepEnv;
});

// ── fixtures ────────────────────────────────────────────────────────────────

const b64 = (n: number) => Buffer.alloc(n, 65).toString("base64");
const IMG = (shape: number): Record<string, unknown> => {
  switch (shape % 6) {
    case 0:
      return { type: "image_url", image_url: { url: `data:image/png;base64,${b64(4_000)}` } };
    case 1:
      return { type: "image_url", image_url: `data:image/jpeg;base64,${b64(4_000)}` };
    case 2:
      return { type: "image", image: `data:image/webp;base64,${b64(4_000)}` };
    case 3:
      return {
        type: "image",
        source: { type: "base64", media_type: "image/png", data: b64(4_000) },
      };
    case 4:
      return { inlineData: { mimeType: "image/png", data: b64(4_000) } };
    default:
      return { inline_data: { data: b64(4_000) } };
  }
};
const DOC = (shape: number): Record<string, unknown> => {
  switch (shape % 3) {
    case 0:
      return {
        type: "file",
        file: { filename: "a.pdf", file_data: `data:application/pdf;base64,${b64(4_000)}` },
      };
    case 1:
      return { type: "input_file", file_data: `data:application/pdf;base64,${b64(4_000)}` };
    default:
      return {
        type: "document",
        source: { type: "base64", media_type: "application/pdf", data: b64(4_000) },
      };
  }
};

const NASTY_STRINGS = [
  "",
  "plain",
  'has "quotes"',
  "back\\slash",
  "new\nline\ttab\r\b\f",
  "\u0000\u001f control",
  "unicode ✓ ñ 中文 اللغة",
  "🙂🎉👨‍👩‍👧‍👦",
  "\ud83d",
  "\udc00",
  "mixed \ud83d text \udc00 more",
  '{"looks":"like json"}',
  "x".repeat(2_001),
];

function lcg(seed: number): () => number {
  let s = seed >>> 0;
  return () => (s = (s * 1664525 + 1013904223) >>> 0) / 0x100000000;
}

/** Small random plain-JSON-ish tree with occasional media blocks. */
function genTree(rnd: () => number, depth: number): unknown {
  const roll = rnd();
  if (depth <= 0 || roll < 0.35) {
    const r = rnd();
    if (r < 0.6) return NASTY_STRINGS[Math.floor(rnd() * NASTY_STRINGS.length)];
    if (r < 0.72) return [0, -2.5, 1e21, NaN, Infinity, -0][Math.floor(rnd() * 6)];
    if (r < 0.82) return rnd() < 0.5;
    if (r < 0.92) return null;
    return undefined;
  }
  if (roll < 0.5) {
    const n = Math.floor(rnd() * 4);
    const out: unknown[] = [];
    for (let i = 0; i < n; i++) {
      const r = rnd();
      if (r < 0.12) out.push(IMG(Math.floor(rnd() * 6)));
      else if (r < 0.18) out.push(DOC(Math.floor(rnd() * 3)));
      else if (r < 0.24)
        out.push({ url: "https://example.com/cat.png" }); // remote → text path
      else out.push(genTree(rnd, depth - 1));
    }
    return out;
  }
  const n = Math.floor(rnd() * 4);
  const out: Record<string, unknown> = {};
  for (let i = 0; i < n; i++) {
    const key = rnd() < 0.3 ? NASTY_STRINGS[Math.floor(rnd() * NASTY_STRINGS.length)] : `k${i}`;
    out[key] = genTree(rnd, depth - 1);
  }
  return out;
}

/** Chat-shaped message history with prunable images in content arrays. */
function genHistory(rnd: () => number, messages: number): Record<string, unknown>[] {
  return Array.from({ length: messages }, (_, i) => {
    const roll = rnd();
    if (roll < 0.25) return { role: "assistant", content: NASTY_STRINGS[Math.floor(rnd() * 6)] };
    const content: unknown[] = [
      { type: "text", text: `turn ${i} ${NASTY_STRINGS[Math.floor(rnd() * 8)]}` },
    ];
    if (rnd() < 0.7) content.push(IMG(Math.floor(rnd() * 6)));
    if (rnd() < 0.25) content.push(DOC(Math.floor(rnd() * 3)));
    if (rnd() < 0.3) content.push({ type: "text", text: `tail ${i}` });
    return { role: i % 2 === 0 ? "user" : "assistant", content };
  });
}

// ── estimate parity ─────────────────────────────────────────────────────────

test("estimateTokens matches the oracle exactly over 2000 seeded structures", () => {
  const rnd = lcg(0x5eed);
  for (let i = 0; i < 2000; i++) {
    const value = genTree(rnd, 4);
    assert.equal(
      estimateTokens(value),
      referenceEstimateTokens(value),
      `case ${i}: estimate mismatch for ${JSON.stringify(value)?.slice(0, 160) ?? String(value)}`
    );
  }
});

test("estimateTokens parity on fixed wire shapes and text-path values", () => {
  const fixed: unknown[] = [
    IMG(0),
    IMG(1),
    IMG(2),
    IMG(3),
    IMG(4),
    IMG(5),
    DOC(0),
    DOC(1),
    DOC(2),
    [IMG(0), IMG(3), IMG(4)],
    [IMG(0), DOC(0), { text: "between" }, IMG(5)],
    { nested: { deeper: [IMG(2)] } },
    { url: "https://example.com/cat.png" },
    `data:text/plain;base64,${b64(2_000)}`, // not image/* → text path
    b64(100_000), // generic base64 text
    "",
    [],
    {},
    [undefined, 1, null, "x"],
    Object.assign(Object.create(null), { a: IMG(1) }),
  ];
  for (let i = 0; i < fixed.length; i++) {
    assert.equal(estimateTokens(fixed[i]), referenceEstimateTokens(fixed[i]), `fixed case ${i}`);
  }
});

test("estimateTokens: aliased subtrees price consistently with the oracle", () => {
  const shared = { role: "user", content: "shared" };
  const aliased = { a: shared, b: shared, list: [shared, shared] };
  assert.equal(estimateTokens(aliased), referenceEstimateTokens(aliased));
  const sharedImg = [IMG(0)];
  const twice = { x: sharedImg, y: sharedImg };
  assert.equal(estimateTokens(twice), referenceEstimateTokens(twice));
});

test("estimateTokens: aliased media blocks at array-item positions keep oracle parity", () => {
  // The old walk priced media items BEFORE consulting its seen set, so an
  // aliased image block is placeholder-priced at EVERY array-item occurrence.
  // A seen-first implementation prices repeats raw and diverges.
  const img = IMG(0);
  const twoArrays = { a: [img], b: [img] };
  assert.equal(estimateTokens(twoArrays), referenceEstimateTokens(twoArrays));
  const mixed = { o: { v: img }, a: [img], b: [img] };
  assert.equal(estimateTokens(mixed), referenceEstimateTokens(mixed));
  const inArrayTwice = [img, img, img];
  assert.equal(estimateTokens(inArrayTwice), referenceEstimateTokens(inArrayTwice));
  // Pruning outcomes must match on aliased histories too (fallback path).
  const history = [
    { role: "user", content: [img] },
    { role: "user", content: [img] },
    { role: "user", content: [img] },
  ];
  const total = referenceEstimateTokens(history);
  for (const target of [total, total - 300, total - 1_500, total - 2_400]) {
    const live = pruneOlderInlineImages(structuredClone(history), {
      keepLatest: 0,
      targetTokens: target,
    });
    const ref = referencePruneOlderInlineImages(structuredClone(history), {
      keepLatest: 0,
      targetTokens: target,
    });
    assert.equal(live.pruned, ref.pruned, `aliased pruning diverged at target=${target}`);
    assert.deepEqual(live.messages, ref.messages, `aliased pruning diverged at target=${target}`);
  }
});

test("intentional deltas from the old implementation: __proto__ key measured, toJSON skipped", () => {
  // Own `__proto__` keys ARE reachable from JSON.parse. The old placeholder
  // rebuild assigned them onto a plain object, where the setter swallowed the
  // key and undercounted. The fused walk measures them like any other key,
  // matching JSON.stringify (the basis jsonLength is property-tested against).
  const withProtoString = JSON.parse('{"__proto__":"x","b":2}');
  assert.equal(
    estimateTokens(withProtoString),
    Math.ceil(JSON.stringify(withProtoString).length / 4)
  );
  assert.ok(
    estimateTokens(withProtoString) > referenceEstimateTokens(withProtoString),
    "old reference undercounted own __proto__ keys; live matches JSON.stringify"
  );
  // An own enumerable toJSON function cannot survive JSON.parse; the old path
  // invoked it via JSON.stringify's fallback on the rebuilt copy, the fused
  // walk skips it as an omitted value. Unreachable from request bodies.
  const withToJson = Object.assign({ a: 1 }, { toJSON: () => "z".repeat(400) });
  assert.equal(estimateTokens(withToJson), Math.ceil(JSON.stringify({ a: 1 }).length / 4));
});

test("estimateTokens: circular structures throw in both implementations", () => {
  const circular: Record<string, unknown> = { a: 1 };
  circular.self = circular;
  const liveThrows = (() => {
    try {
      estimateTokens(circular);
      return false;
    } catch {
      return true;
    }
  })();
  const refThrows = (() => {
    try {
      referenceEstimateTokens(circular);
      return false;
    } catch {
      return true;
    }
  })();
  assert.ok(liveThrows, "live estimator must throw on circular input");
  assert.ok(refThrows, "oracle must throw on circular input");
});

// ── pruning parity ──────────────────────────────────────────────────────────

function boundaryTargets(history: Record<string, unknown>[]): Array<number | undefined> {
  const base = referenceEstimateTokens(history);
  const targets: Array<number | undefined> = [undefined, 0, 1, base, base + 1, base - 1];
  for (let j = 1; j <= 4; j++) {
    targets.push(base - j * 1200, base - j * 1200 - 1, base - j * 1200 + 1);
  }
  return targets;
}

test("pruneOlderInlineImages matches the oracle across keepLatest and boundary targets (300 histories)", () => {
  const rnd = lcg(0xc0ffee);
  for (let i = 0; i < 300; i++) {
    const history = genHistory(rnd, 2 + Math.floor(rnd() * 6));
    const snapshot = JSON.parse(JSON.stringify(history));
    for (const keepLatest of [0, 1, 2, undefined]) {
      for (const targetTokens of boundaryTargets(history)) {
        const live = pruneOlderInlineImages(history, { keepLatest, targetTokens });
        const ref = referencePruneOlderInlineImages(history, { keepLatest, targetTokens });
        assert.deepEqual(
          live.pruned,
          ref.pruned,
          `history ${i} keep=${keepLatest} target=${targetTokens}: pruned count diverged`
        );
        assert.deepEqual(
          live.messages,
          ref.messages,
          `history ${i} keep=${keepLatest} target=${targetTokens}: messages diverged`
        );
      }
    }
    assert.deepEqual(history, snapshot, `history ${i}: input must not be mutated`);
  }
});

test("pruneOlderInlineImages: every modulo-4 rounding remainder boundary", () => {
  // Pad text so the serialized length hits each remainder r (len % 4 = r) and
  // sweep targets immediately around the resulting levels.
  for (let pad = 0; pad < 4; pad++) {
    const history = [
      { role: "user", content: [{ type: "text", text: "x".repeat(pad) }, IMG(0), IMG(1), IMG(2)] },
      { role: "user", content: [{ type: "text", text: "y".repeat(3 - pad) }, IMG(3), IMG(4)] },
    ];
    for (const keepLatest of [0, 1, 2]) {
      for (const targetTokens of boundaryTargets(history)) {
        const live = pruneOlderInlineImages(structuredClone(history), { keepLatest, targetTokens });
        const ref = referencePruneOlderInlineImages(structuredClone(history), {
          keepLatest,
          targetTokens,
        });
        assert.equal(
          live.pruned,
          ref.pruned,
          `pad=${pad} keep=${keepLatest} target=${targetTokens}`
        );
        assert.deepEqual(
          live.messages,
          ref.messages,
          `pad=${pad} keep=${keepLatest} target=${targetTokens}`
        );
      }
    }
  }
});

test("pruneOlderInlineImages: documents and remote URLs are never pruned", () => {
  const history = [
    {
      role: "user",
      content: [DOC(0), { type: "image_url", image_url: { url: "https://x.test/i.png" } }],
    },
    { role: "user", content: [DOC(1)] },
    { role: "user", content: [{ type: "text", text: "hi" }, IMG(2)] },
  ];
  const live = pruneOlderInlineImages(structuredClone(history), { keepLatest: 0 });
  const ref = referencePruneOlderInlineImages(structuredClone(history), { keepLatest: 0 });
  assert.equal(live.pruned, ref.pruned);
  assert.deepEqual(live.messages, ref.messages);
  // The only prunable thing was the single inline image in the last message.
  assert.equal(live.pruned, 1);
});
