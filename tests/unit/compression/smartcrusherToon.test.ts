import test from "node:test";
import assert from "node:assert/strict";
import {
  tryCompactJson,
  pickSmallestEncoding,
} from "../../../open-sse/services/compression/engines/headroom/smartcrusher.ts";
import { reconstructHeadroom } from "../../../open-sse/services/compression/engines/headroom/index.ts";
import { TOON_FENCE_OPEN } from "../../../open-sse/services/compression/engines/headroom/toon.ts";
import { GCF_FENCE_OPEN } from "../../../open-sse/services/compression/engines/headroom/tabular.ts";

const toonFavorable = Array.from({ length: 40 }, (_, i) => ({ id: i, ok: true }));

test("best-of-N: usa a fence do encoder menor e nunca regride vs JSON", () => {
  const chosen = pickSmallestEncoding(toonFavorable);
  const json = JSON.stringify(toonFavorable);
  assert.ok(chosen.length < json.length, "deve encolher vs JSON");
  assert.ok(chosen.startsWith(GCF_FENCE_OPEN) || chosen.startsWith(TOON_FENCE_OPEN));
});

test("se TOON vence, tryCompactJson emite fence toon e round-trip restaura", () => {
  const json = JSON.stringify(toonFavorable);
  const compact = tryCompactJson(json, 8);
  assert.notEqual(compact, null);
  const body = { messages: [{ role: "user", content: compact as string }] };
  const restored = reconstructHeadroom(body);
  const text = (restored.messages as Array<{ content: string }>)[0].content;
  assert.deepEqual(JSON.parse(text), toonFavorable);
});

test("empate/GCF-favorável: round-trip lossless via a fence escolhida", () => {
  const gcfFavorable = Array.from({ length: 10 }, (_, i) => ({
    id: i,
    deep: { a: { b: [i, i + 1] }, label: `row-${i}` },
  }));
  const chosen = pickSmallestEncoding(gcfFavorable);
  assert.ok(chosen.startsWith(GCF_FENCE_OPEN) || chosen.startsWith(TOON_FENCE_OPEN));
  const compact = tryCompactJson(JSON.stringify(gcfFavorable), 8);
  if (compact) {
    const body = { messages: [{ role: "user", content: compact }] };
    const restored = reconstructHeadroom(body);
    const text = (restored.messages as Array<{ content: string }>)[0].content;
    assert.deepEqual(JSON.parse(text), gcfFavorable);
  }
});

test("nunca aumenta vs JSON (gate preservado): array < minRows → no-op", () => {
  const tiny = [{ a: 1 }];
  assert.equal(tryCompactJson(JSON.stringify(tiny), 8), null);
});
