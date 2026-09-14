import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { COOLDOWN_MS } from "../../../open-sse/config/errorConfig.ts";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-recovery-policy-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const { onFailure, onStreamThrow } = await import(
  "../../../open-sse/handlers/chatCore/recoveryPolicy.ts"
);

function base(over = {}) {
  return {
    view: { kind: "pipeline" },
    status: 500,
    message: "",
    provider: "openai",
    model: "gpt-5",
    connectionId: "conn-1",
    allowAccountRotation: true,
    allowModelFallback: true,
    isolateProbe: false,
    nextModel: null,
    canRefresh: false,
    ...over,
  };
}

test("onFailure is importable", async () => {
  const mod = await import("../../../open-sse/handlers/chatCore/recoveryPolicy.ts");
  assert.equal(typeof mod.onFailure, "function");
  assert.equal(typeof mod.onStreamThrow, "function");
});

test("404 with a sibling falls back and does not lock", () => {
  const d = onFailure(base({ status: 404, nextModel: "b", model: "a" }));
  assert.deepEqual(d, {
    effects: {},
    dispatch: { action: "fallback-model", nextModel: "b" },
  });
  assert.equal("lockPreviousModel" in d.effects, false);
});

test("404 with no sibling is terminal and does not lock", () => {
  const d = onFailure(base({ status: 404, nextModel: null, model: "a" }));
  assert.deepEqual(d, { effects: {}, dispatch: { action: "terminal" } });
  assert.equal("lockPreviousModel" in d.effects, false);
});

test("Codex 429 with rotation allowed rotates the account", () => {
  const d = onFailure(
    base({ provider: "codex", status: 429, connectionId: "codex-conn" })
  );
  assert.deepEqual(d, {
    effects: {},
    dispatch: { action: "rotate-account", excludeConnectionId: "codex-conn" },
  });
});

test("Codex 429 under probe isolation is terminal", () => {
  const d = onFailure(
    base({ provider: "codex", status: 429, isolateProbe: true })
  );
  assert.equal(d.dispatch.action, "terminal");
});

test("401 with refresh available refreshes credentials", () => {
  const d = onFailure(base({ status: 401, canRefresh: true }));
  assert.deepEqual(d, { effects: {}, dispatch: { action: "refresh-credentials" } });
});

test("403 with refresh available refreshes credentials", () => {
  const d = onFailure(base({ status: 403, canRefresh: true }));
  assert.deepEqual(d, { effects: {}, dispatch: { action: "refresh-credentials" } });
});

test("signature next body on a non-2xx retries the same account", () => {
  const nextBody = { model: "claude", thinking: { type: "enabled" } };
  const d = onFailure(base({ status: 400, signatureNextBody: nextBody }));
  assert.deepEqual(d, {
    effects: {},
    dispatch: { action: "retry-same", nextBody },
  });
});

test("onStreamThrow is always terminal", () => {
  assert.deepEqual(onStreamThrow(), { action: "terminal" });
});

test("antigravity 422 gcp_project_required rotates and cools the row", () => {
  const before = Date.now();
  const d = onFailure(
    base({
      provider: "antigravity",
      status: 422,
      message: "gcp_project_required for this account",
      connectionId: "agy-1",
    })
  );
  assert.equal(d.dispatch.action, "rotate-account");
  assert.equal(d.dispatch.excludeConnectionId, "agy-1");
  assert.equal(d.effects.rateLimitUntil?.connectionId, "agy-1");
  const cooldown = COOLDOWN_MS.gcpProjectRequired ?? 24 * 60 * 60 * 1000;
  const until = d.effects.rateLimitUntil?.untilMs ?? 0;
  const after = Date.now();
  assert.ok(until >= before + cooldown);
  assert.ok(until <= after + cooldown);
});
