import test from "node:test";
import assert from "node:assert/strict";

import {
  describeComboStepTestResult,
  getComboStepTestKey,
  getComboStepTestSnapshot,
  mapComboStepTestResponse,
  resetComboStepTests,
  resolveComboStepTestTarget,
  runComboStepTest,
  subscribeComboStepTests,
} from "../../../src/app/(dashboard)/dashboard/combos/comboStepTest.ts";

test("resolves a pinned model step to the probe body of /api/models/test", () => {
  assert.deepEqual(
    resolveComboStepTestTarget({
      kind: "model",
      providerId: "openai",
      model: "openai/gpt-4o",
      connectionId: "c1",
    }),
    { providerId: "openai", modelId: "gpt-4o", connectionId: "c1" }
  );
});

test("keeps the canonical providerId when the routing prefix is an alias", () => {
  assert.deepEqual(
    resolveComboStepTestTarget({ kind: "model", providerId: "claude", model: "cc/claude-x" }),
    { providerId: "claude", modelId: "claude-x" }
  );
});

test("resolves the alias of a legacy string entry", () => {
  assert.deepEqual(resolveComboStepTestTarget("cc/claude-x"), {
    providerId: "claude",
    modelId: "claude-x",
  });
  assert.deepEqual(resolveComboStepTestTarget({ model: "openai/gpt-4o" }), {
    providerId: "openai",
    modelId: "gpt-4o",
  });
});

test("sends the qualified model when the model id itself contains a slash", () => {
  // The probe treats a modelId containing "/" as an already-qualified model string, so the
  // bare "meta-llama/llama-3" would be routed to a "meta-llama" provider.
  assert.deepEqual(
    resolveComboStepTestTarget({
      kind: "model",
      providerId: "openrouter",
      model: "openrouter/meta-llama/llama-3",
    }),
    { providerId: "openrouter", modelId: "openrouter/meta-llama/llama-3" }
  );
});

test("combo-ref, provider-wildcard and malformed steps are not testable", () => {
  assert.equal(resolveComboStepTestTarget({ kind: "combo-ref", comboName: "child" }), null);
  assert.equal(
    resolveComboStepTestTarget({
      kind: "provider-wildcard",
      providerId: "openai",
      modelPattern: "*",
    }),
    null
  );
  assert.equal(resolveComboStepTestTarget("no-slash"), null);
  assert.equal(resolveComboStepTestTarget({ kind: "model", model: "" }), null);
  assert.equal(resolveComboStepTestTarget(null), null);
});

test("the result key follows the target, not the row position", () => {
  const pinned = getComboStepTestKey({
    providerId: "openai",
    modelId: "gpt-4o",
    connectionId: "c1",
  });
  const dynamic = getComboStepTestKey({ providerId: "openai", modelId: "gpt-4o" });
  assert.notEqual(pinned, dynamic);
  assert.equal(
    pinned,
    getComboStepTestKey({ providerId: "openai", modelId: "gpt-4o", connectionId: "c1" })
  );
});

test("maps a successful probe to ok with its latency", () => {
  assert.deepEqual(mapComboStepTestResponse(200, { status: "ok", latencyMs: 120 }), {
    state: "ok",
    latencyMs: 120,
    error: null,
  });
  assert.equal(describeComboStepTestResult({ state: "ok", latencyMs: 120, error: null }), "120ms");
});

test("maps the hidePaidModels 403 to its readable error", () => {
  const result = mapComboStepTestResponse(403, {
    status: "error",
    error: "Paid model blocked while hidePaidModels is enabled",
  });
  assert.equal(result.state, "error");
  assert.equal(result.error, "Paid model blocked while hidePaidModels is enabled");
  assert.equal(describeComboStepTestResult(result), result.error);
});

test("never surfaces an object or an empty error", () => {
  const nested = mapComboStepTestResponse(500, { status: "error", error: { message: "boom" } });
  assert.equal(nested.error, "boom");
  const nonJson = mapComboStepTestResponse(502, null);
  assert.equal(nonJson.state, "error");
  assert.equal(typeof nonJson.error, "string");
  assert.match(nonJson.error ?? "", /502/);
  const objectError = mapComboStepTestResponse(500, { status: "error", error: { code: 1 } });
  assert.equal(typeof objectError.error, "string");
  // A 200 whose body does not say "ok" is still a failure.
  assert.equal(mapComboStepTestResponse(200, { status: "error", error: "bad" }).state, "error");
});

test("truncates long upstream errors", () => {
  const result = mapComboStepTestResponse(500, { status: "error", error: "x".repeat(1000) });
  assert.ok((result.error ?? "").length <= 240);
});

test("runComboStepTest posts the target and stores running then the result", async () => {
  resetComboStepTests();
  const target = { providerId: "openai", modelId: "gpt-4o", connectionId: "c1" };
  const key = getComboStepTestKey(target);
  const seen: string[] = [];
  const unsubscribe = subscribeComboStepTests(() => {
    seen.push(getComboStepTestSnapshot(key)?.state ?? "none");
  });
  let sentBody: unknown = null;
  const fakeFetch = async (url: string, init: { body: string }) => {
    assert.equal(url, "/api/models/test");
    sentBody = JSON.parse(init.body);
    return { status: 200, json: async () => ({ status: "ok", latencyMs: 42 }) };
  };
  await runComboStepTest(target, fakeFetch);
  unsubscribe();
  assert.deepEqual(sentBody, target);
  assert.deepEqual(seen, ["running", "ok"]);
  assert.deepEqual(getComboStepTestSnapshot(key), { state: "ok", latencyMs: 42, error: null });
});

test("runComboStepTest turns a network failure into a string error", async () => {
  resetComboStepTests();
  const target = { providerId: "openai", modelId: "gpt-4o" };
  await runComboStepTest(target, async () => {
    throw new TypeError("fetch failed");
  });
  const snapshot = getComboStepTestSnapshot(getComboStepTestKey(target));
  assert.equal(snapshot?.state, "error");
  assert.equal(typeof (snapshot && "error" in snapshot ? snapshot.error : null), "string");
});

test("runComboStepTest ignores a second click while the probe is running", async () => {
  resetComboStepTests();
  const target = { providerId: "openai", modelId: "gpt-4o" };
  let calls = 0;
  let release: () => void = () => {};
  const gate = new Promise<void>((resolve) => {
    release = resolve;
  });
  const slowFetch = async () => {
    calls += 1;
    await gate;
    return { status: 200, json: async () => ({ status: "ok", latencyMs: 1 }) };
  };
  const first = runComboStepTest(target, slowFetch);
  await runComboStepTest(target, slowFetch);
  release();
  await first;
  assert.equal(calls, 1);
});
