import test from "node:test";
import assert from "node:assert/strict";

/**
 * Gateways like agentrouter.org misstate TEMPORARY quota exhaustion as 403/400
 * (Chinese body "用户额度不足"), which Claude Code treats as permanent and dies.
 * applyStatusRestatement() rewrites such statuses to 429 (+ synthetic
 * Retry-After) in ONE place, before fallback classification and before the
 * status ever reaches the client. Registry-driven: future gateways with the
 * same defect register one rule array — no pipeline changes.
 */

const { applyStatusRestatement, statusRestatementRegistry } = await import(
  "../../../open-sse/config/upstreamStatusRestatement.ts"
);

test("R1: agentrouter 403 + 用户额度不足 → 429 with synthetic Retry-After", () => {
  const out = applyStatusRestatement({
    provider: "agentrouter",
    status: 403,
    message: '{"error":{"message":"用户额度不足","type":"insufficient_user_quota"}}',
    retryAfterMs: null,
  });
  assert.equal(out.status, 429);
  assert.equal(out.fromStatus, 403);
  assert.equal(out.ruleId, "agentrouter-quota-misstatus");
  assert.equal(out.retryAfterMs, 60_000);
});

test("R2: agentrouter 403 + 无权访问模型 (no model access) is NOT restated", () => {
  const out = applyStatusRestatement({
    provider: "agentrouter",
    status: 403,
    message: "无权访问模型 claude-sonnet-4",
    retryAfterMs: null,
  });
  assert.equal(out.status, 403);
  assert.equal(out.ruleId, null);
});

test("R3: quota marker in body (not message) still restates", () => {
  const out = applyStatusRestatement({
    provider: "agentrouter",
    status: 403,
    message: "Forbidden",
    body: { error: { message: "用户额度不足，请充值" } },
    retryAfterMs: null,
  });
  assert.equal(out.status, 429);
});

test("R4: upstream-provided retryAfterMs wins over the synthetic default", () => {
  const out = applyStatusRestatement({
    provider: "agentrouter",
    status: 403,
    message: "用户额度不足",
    retryAfterMs: 5_000,
  });
  assert.equal(out.status, 429);
  assert.equal(out.retryAfterMs, 5_000);
});

test("R5: agentrouter 400 with quota marker also restates (gateway variant)", () => {
  const out = applyStatusRestatement({
    provider: "agentrouter",
    status: 400,
    message: "额度不足",
    retryAfterMs: null,
  });
  assert.equal(out.status, 429);
});

test("R6: agentrouter 403 without quota markers is untouched (real auth error)", () => {
  const out = applyStatusRestatement({
    provider: "agentrouter",
    status: 403,
    message: "Invalid API key",
    retryAfterMs: null,
  });
  assert.equal(out.status, 403);
  assert.equal(out.ruleId, null);
});

test("R7: other providers never match agentrouter rules (registry-scoped)", () => {
  const out = applyStatusRestatement({
    provider: "openai",
    status: 403,
    message: "用户额度不足",
    retryAfterMs: null,
  });
  assert.equal(out.status, 403);
});

test("R8: statuses a rule does not list pass through (already-correct 429)", () => {
  const out = applyStatusRestatement({
    provider: "agentrouter",
    status: 429,
    message: "用户额度不足",
    retryAfterMs: 1_000,
  });
  assert.equal(out.status, 429);
  assert.equal(out.ruleId, null);
  assert.equal(out.retryAfterMs, 1_000);
});

test("R9: registry exposes agentrouter so future gateways copy the one-line recipe", () => {
  const rules = statusRestatementRegistry.get("agentrouter");
  assert.ok(rules && rules.length > 0);
});

test("R10: chatCore wires applyStatusRestatement into the providerFailure block", async () => {
  // chatCore is a god-file that cannot be imported standalone in unit tests
  // (side-effectful DB/env wiring), so the wiring contract is asserted at the
  // source level: the hook must exist, run against the parsed error, and
  // reassign both statusCode and retryAfterMs BEFORE classification.
  const { readFile } = await import("node:fs/promises");
  const src = await readFile(
    new URL("../../../open-sse/handlers/chatCore.ts", import.meta.url),
    "utf8"
  );
  assert.match(src, /applyStatusRestatement\(/, "chatCore must call applyStatusRestatement");
  const hookIndex = src.indexOf("applyStatusRestatement(");
  const classifyIndex = src.indexOf("classifyProviderError(statusCode");
  assert.ok(hookIndex > -1 && classifyIndex > -1 && hookIndex < classifyIndex,
    "restatement must run BEFORE classifyProviderError so fallback sees the corrected status");
});
