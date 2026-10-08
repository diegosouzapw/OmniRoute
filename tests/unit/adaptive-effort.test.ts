// Adaptive effort tests — mirrors the Hermes contract (hermes-agent#109044):
// trivial→low, heavy→high, mid→medium; explicit client effort wins; the
// stateless per-turn pin ignores post-last-user tool traffic.
import { test } from "node:test";
import assert from "node:assert/strict";
import {
  resolveAdaptiveEffort,
  applyAdaptiveEffort,
  isAdaptiveEffort,
  hasExplicitReasoningField,
} from "@omniroute/open-sse/services/adaptiveEffort.ts";

function msg(
  role: string,
  content: string | unknown[]
): { role: string; content: string | unknown[] } {
  return { role, content };
}

test("trivial ask resolves low", () => {
  const level = resolveAdaptiveEffort([msg("user", "list the files")]);
  assert.equal(level, "low");
});

test("heavy context resolves high", () => {
  const level = resolveAdaptiveEffort([
    msg("user", "long enough"),
    msg("assistant", "x".repeat(40)),
    msg("user", "continue " + "deep work ".repeat(400)),
  ]);
  assert.equal(level, "high");
});

test("trivial ask inside big prior context is NOT low", () => {
  const level = resolveAdaptiveEffort([
    msg("user", "first ask that is long enough to not be trivial itself " + "pad ".repeat(60)),
    msg("assistant", "answer " + "y".repeat(30000)),
    msg("user", "short follow-up"),
  ]);
  assert.equal(level, "medium");
});

test("stateless pin: mid-tool-loop request resolves same as turn start", () => {
  const userTurn = [msg("user", "fix the failing test")];
  const turnStart = resolveAdaptiveEffort(userTurn);
  const midLoop = resolveAdaptiveEffort([
    ...userTurn,
    msg("assistant", "checking"),
    msg("tool", "z".repeat(5000)),
    msg("assistant", "checking more"),
    msg("tool", "z".repeat(5000)),
  ]);
  // Mid-loop: same turn → same level (pin), even though raw context grew.
  assert.equal(midLoop, turnStart);
});

test("explicit effort wins over auto", () => {
  const body = { messages: [msg("user", "hello there")], reasoning_effort: "high" };
  const out = applyAdaptiveEffort(body, { headerEffort: "auto", modelDefaultEffort: "auto" });
  assert.equal(out.reasoning_effort, "high");
  assert.equal(hasExplicitReasoningField(body), true);
});

test("header auto on trivial ask injects low", () => {
  const body: Record<string, unknown> = { messages: [msg("user", "hi")] };
  const out = applyAdaptiveEffort(body, { headerEffort: "auto" });
  assert.equal(out.reasoning_effort, "low");
});

test("model default auto injects resolved level", () => {
  const out = applyAdaptiveEffort({ messages: [msg("user", "hello")] } as Record<string, unknown>, {
    modelDefaultEffort: "auto",
  });
  assert.equal(out.reasoning_effort, "low");
  assert.equal(isAdaptiveEffort("auto"), true);
  assert.equal(isAdaptiveEffort("AUTO "), true);
});

test("no auto opt-in → unchanged reference", () => {
  const body = { messages: [msg("user", "hello")] };
  const out = applyAdaptiveEffort(body, {});
  assert.equal(out, body);
});

test("empty messages resolves medium (safe default)", () => {
  assert.equal(resolveAdaptiveEffort([]), "medium");
  assert.equal(resolveAdaptiveEffort(undefined), "medium");
  assert.equal(resolveAdaptiveEffort(null), "medium");
});
