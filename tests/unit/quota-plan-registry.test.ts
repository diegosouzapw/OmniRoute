import { test } from "node:test";
import assert from "node:assert/strict";

import { getKnownPlan, knownProviders } from "../../src/lib/quota/planRegistry";

test("getKnownPlan('codex') returns non-null with 2 dimensions", () => {
  const p = getKnownPlan("codex");
  assert.notEqual(p, null);
  assert.equal(p?.provider, "codex");
  assert.equal(p?.dimensions.length, 2);
});

test("getKnownPlan('codex') first dimension is percent/5h/100", () => {
  const p = getKnownPlan("codex");
  assert.deepEqual(p?.dimensions[0], { unit: "percent", window: "5h", limit: 100 });
});

test("getKnownPlan('codex') second dimension is percent/weekly/100", () => {
  const p = getKnownPlan("codex");
  assert.deepEqual(p?.dimensions[1], { unit: "percent", window: "weekly", limit: 100 });
});

test("getKnownPlan('glm') has 2 dimensions, tokens unit", () => {
  const p = getKnownPlan("glm");
  assert.equal(p?.dimensions.length, 2);
  for (const d of p?.dimensions ?? []) {
    assert.equal(d.unit, "tokens");
  }
});

test("getKnownPlan('minimax') has 2 dimensions", () => {
  const p = getKnownPlan("minimax");
  assert.equal(p?.dimensions.length, 2);
});

test("getKnownPlan('bailian') has 3 dimensions (5h/weekly/monthly)", () => {
  const p = getKnownPlan("bailian");
  assert.equal(p?.dimensions.length, 3);
  const ws = p?.dimensions.map((d) => d.window);
  assert.ok(ws?.includes("5h"));
  assert.ok(ws?.includes("weekly"));
  assert.ok(ws?.includes("monthly"));
});

test("getKnownPlan('kimi') has 1 dimension: requests/hourly/1500", () => {
  const p = getKnownPlan("kimi");
  assert.deepEqual(p?.dimensions, [{ unit: "requests", window: "hourly", limit: 1500 }]);
});

test("getKnownPlan('alibaba') has 1 dimension: requests/monthly/90000", () => {
  const p = getKnownPlan("alibaba");
  assert.deepEqual(p?.dimensions, [{ unit: "requests", window: "monthly", limit: 90_000 }]);
});

test("getKnownPlan('unknown') returns null", () => {
  assert.equal(getKnownPlan("unknown"), null);
});

test("getKnownPlan('openai') returns null (manual obrigatório)", () => {
  assert.equal(getKnownPlan("openai"), null);
});

test("getKnownPlan('') returns null", () => {
  assert.equal(getKnownPlan(""), null);
});

test("knownProviders() returns exactly 11 entries", () => {
  assert.equal(knownProviders().length, 11);
});

test("knownProviders() includes the full registry set", () => {
  const list = knownProviders() as readonly string[];
  for (const p of [
    "codex",
    "claude",
    "glm",
    "minimax",
    "deepseek",
    "bailian",
    "kimi",
    "kimi-coding",
    "xiaomi-mimo",
    "alibaba",
    "grok-cli",
  ]) {
    assert.ok(list.includes(p), `missing ${p}`);
  }
});

test("every provider in knownProviders has a non-null plan", () => {
  for (const provider of knownProviders()) {
    assert.notEqual(getKnownPlan(provider), null, `getKnownPlan('${provider}') null`);
  }
});
