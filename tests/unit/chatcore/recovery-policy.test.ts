import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import ts from "typescript";
import { COOLDOWN_MS } from "../../../open-sse/config/errorConfig.ts";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-recovery-policy-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const { onFailure, onStreamThrow } =
  await import("../../../open-sse/handlers/chatCore/recoveryPolicy.ts");

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
  const d = onFailure(base({ provider: "codex", status: 429, connectionId: "codex-conn" }));
  assert.deepEqual(d, {
    effects: {},
    dispatch: { action: "rotate-account", excludeConnectionId: "codex-conn" },
  });
});

test("Codex 429 under probe isolation is terminal", () => {
  const d = onFailure(base({ provider: "codex", status: 429, isolateProbe: true }));
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

test("onFailure fallback-model matches isModelUnavailableError", async () => {
  const { isModelUnavailableError } =
    await import("../../../open-sse/services/modelFamilyFallback.ts");
  const d = onFailure(base({ status: 404, nextModel: "b", model: "a", allowModelFallback: true }));
  assert.equal(isModelUnavailableError(404, "", "openai"), true);
  assert.equal(d.dispatch.action, "fallback-model");
  assert.equal(d.dispatch.nextModel, "b");

  const notUnavailable = onFailure(
    base({ status: 429, nextModel: "b", model: "a", allowModelFallback: true, provider: "openai" })
  );
  assert.equal(notUnavailable.dispatch.action === "fallback-model", false);
});

test("streaming-leg onFailure isolateProbe comes from shouldIsolateProbeFailures", () => {
  // The callsite moved out of the barrel when the streaming leg was lifted; the
  // guarantee it encodes -- isolateProbe is resolved at runtime, never hard-coded
  // -- is unchanged.
  //
  // Read through the parser rather than slicing a fixed window of source text.
  // A character budget silently stops covering the property it is meant to check
  // the moment an argument or a line break pushes it past the end, and the test
  // then passes for the wrong reason.
  const url = new URL("../../../open-sse/handlers/chatCore/streamingLeg.ts", import.meta.url);
  const sf = ts.createSourceFile(
    url.pathname,
    fs.readFileSync(url, "utf8"),
    ts.ScriptTarget.ESNext,
    true
  );

  let isolateProbe: ts.Expression | null = null;
  const walk = (node: ts.Node) => {
    if (
      ts.isVariableDeclaration(node) &&
      ts.isIdentifier(node.name) &&
      node.name.text === "familyRecovery" &&
      node.initializer &&
      ts.isCallExpression(node.initializer) &&
      node.initializer.expression.getText() === "onFailure"
    ) {
      const arg = node.initializer.arguments[0];
      if (arg && ts.isObjectLiteralExpression(arg)) {
        for (const prop of arg.properties) {
          if (ts.isPropertyAssignment(prop) && prop.name.getText() === "isolateProbe") {
            isolateProbe = prop.initializer;
          }
        }
      }
    }
    ts.forEachChild(node, walk);
  };
  walk(sf);

  assert.ok(isolateProbe, "familyRecovery callsite must pass isolateProbe");
  const expr = isolateProbe as ts.Expression;
  assert.ok(
    ts.isAwaitExpression(expr) &&
      ts.isCallExpression(expr.expression) &&
      expr.expression.expression.getText() === "shouldIsolateProbeFailures",
    `isolateProbe must be await shouldIsolateProbeFailures(), got: ${expr.getText()}`
  );
});
