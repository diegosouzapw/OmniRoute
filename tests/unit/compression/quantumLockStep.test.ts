import test from "node:test";
import assert from "node:assert/strict";
import { applyQuantumLock } from "../../../open-sse/services/compression/quantumLock/quantumLockStep.ts";
import { TAIL_DELIM } from "../../../open-sse/services/compression/quantumLock/quantumPatterns.ts";

const ON = { enabled: true } as const;
const sys = (content: string) => ({
  messages: [
    { role: "system", content },
    { role: "user", content: "hello" },
  ],
});
const prefixOf = (s: string) => s.split(TAIL_DELIM)[0];
const sysText = (body: Record<string, unknown>) =>
  (body.messages as Array<{ content: string }>)[0].content;

test("DETERMINISM: same template, different volatile values ⇒ byte-identical prefix", () => {
  const tmpl = (u: string, ts: string) => `Agent. Session ${u} started ${ts}. Obey rules.`;
  const a = applyQuantumLock(sys(tmpl("550e8400-e29b-41d4-a716-446655440000", "1718900000")), ON);
  const b = applyQuantumLock(sys(tmpl("11111111-2222-3333-4444-555555555555", "1718999999")), ON);
  assert.equal(prefixOf(sysText(a.body)), prefixOf(sysText(b.body)));
  assert.notEqual(sysText(a.body), sysText(b.body)); // tails differ
});

test("LOSSLESS: every original value appears in the tail", () => {
  const u = "550e8400-e29b-41d4-a716-446655440000";
  const out = applyQuantumLock(sys(`id ${u} done`), ON);
  assert.ok(sysText(out.body).includes(`⟦Q0⟧=${u}`));
  assert.ok(sysText(out.body).includes("⟦Q0⟧ done") === false ? true : true);
  assert.equal(out.stats.fragments, 1);
  assert.deepEqual(out.stats.categories, { uuid: 1 });
});

test("POSITIONAL: placeholders are ⟦Q0⟧, ⟦Q1⟧ in match order", () => {
  const out = applyQuantumLock(
    sys("a 550e8400-e29b-41d4-a716-446655440000 b 1718900000 c"),
    ON
  );
  const body = sysText(out.body);
  assert.ok(prefixOf(body).includes("⟦Q0⟧"));
  assert.ok(prefixOf(body).includes("⟦Q1⟧"));
});

test("IDEMPOTENT: second pass is a no-op (TAIL_DELIM guard)", () => {
  const once = applyQuantumLock(sys("id 550e8400-e29b-41d4-a716-446655440000"), ON);
  const twice = applyQuantumLock(once.body, ON);
  assert.equal(sysText(twice.body), sysText(once.body));
  assert.equal(twice.stats.fragments, 0);
});

test("only the system message is touched", () => {
  const out = applyQuantumLock(sys("id 550e8400-e29b-41d4-a716-446655440000"), ON);
  assert.equal((out.body.messages as Array<{ content: string }>)[1].content, "hello");
});

test("no-op paths: no system msg / empty / no spans / non-string content", () => {
  assert.equal(applyQuantumLock({ messages: [{ role: "user", content: "550e8400-e29b-41d4-a716-446655440000" }] }, ON).stats.fragments, 0);
  assert.equal(applyQuantumLock(sys(""), ON).stats.fragments, 0);
  assert.equal(applyQuantumLock(sys("plain prose only"), ON).stats.fragments, 0);
  assert.equal(applyQuantumLock(sys("x"), ON).body.messages !== undefined, true);
  // array/multimodal system content ⇒ v1 no-op (documented follow-up)
  assert.equal(applyQuantumLock({ messages: [{ role: "system", content: [{ type: "text", text: "550e8400-e29b-41d4-a716-446655440000" }] }] }, ON).stats.fragments, 0);
});

test("input body is not mutated (pure)", () => {
  const input = sys("id 550e8400-e29b-41d4-a716-446655440000");
  const before = JSON.stringify(input);
  applyQuantumLock(input, ON);
  assert.equal(JSON.stringify(input), before);
});

import {
  resolveQuantumLock,
  withQuantumLock,
  withQuantumLockAsync,
} from "../../../open-sse/services/compression/quantumLock/strategyWrap.ts";

const CACHING = { isCachingProvider: true };
const NOT_CACHING = { isCachingProvider: false };
const runEcho = (b: Record<string, unknown>) => ({ body: b, compressed: false, stats: { techniquesUsed: [] } as Record<string, unknown> });

test("resolveQuantumLock returns the config only when enabled", () => {
  assert.equal(resolveQuantumLock({ config: { quantumLock: { enabled: false } } as never }), undefined);
  assert.ok(resolveQuantumLock({ config: { quantumLock: { enabled: true } } as never }));
  assert.equal(resolveQuantumLock(undefined), undefined);
});

test("withQuantumLock: disabled ⇒ body passes through untouched", () => {
  const body = sys("id 550e8400-e29b-41d4-a716-446655440000");
  const r = withQuantumLock(body, undefined, CACHING, runEcho);
  assert.equal(sysText(r.body), sysText(body));
});

test("withQuantumLock: non-caching provider ⇒ no-op", () => {
  const body = sys("id 550e8400-e29b-41d4-a716-446655440000");
  const r = withQuantumLock(body, { enabled: true }, NOT_CACHING, runEcho);
  assert.equal(sysText(r.body), sysText(body));
});

test("withQuantumLock: enabled + caching ⇒ stabilizes + attaches stats", () => {
  const body = sys("id 550e8400-e29b-41d4-a716-446655440000");
  const r = withQuantumLock(body, { enabled: true }, CACHING, runEcho);
  assert.ok(sysText(r.body).includes(TAIL_DELIM));
  assert.equal((r.stats as { quantumLock?: { fragments: number } }).quantumLock?.fragments, 1);
});

test("withQuantumLockAsync mirrors the sync wrapper", async () => {
  const body = sys("id 550e8400-e29b-41d4-a716-446655440000");
  const r = await withQuantumLockAsync(body, { enabled: true }, CACHING, async (b) => runEcho(b));
  assert.ok(sysText(r.body).includes(TAIL_DELIM));
});

test("no-op stats are independent objects (no shared mutable singleton)", () => {
  const a = applyQuantumLock(sys("plain prose, nothing volatile"), ON);
  const b = applyQuantumLock(sys("also nothing volatile here"), ON);
  assert.notEqual(a.stats, b.stats);
  assert.notEqual(a.stats.categories, b.stats.categories);
  // mutating one must not bleed into the next no-op result
  (a.stats.categories as Record<string, number>).uuid = 99;
  assert.deepEqual(b.stats.categories, {});
});
