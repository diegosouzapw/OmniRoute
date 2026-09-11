/**
 * A combo step with connectionId and no allowedConnectionIds is a pin, not a
 * hint. After that account 502/429s, dropping forcedConnectionId must NOT
 * scan the rest of the provider pool (offical-fable 20X -> sibling Pro).
 *
 * Implicit allowlist = [connectionId] when the step omitted one.
 */
import test from "node:test";
import assert from "node:assert/strict";

const { resolveComboTargets } = await import("../../open-sse/services/combo/comboStructure.ts");
const { handleComboChat } = await import("../../open-sse/services/combo.ts");
const { expandTargetsByFingerprints } = await import(
  "../../open-sse/services/combo/fingerprintExpansion.ts"
);
const { comboModelStepInputSchema } = await import("../../src/shared/validation/schemas/combo.ts");

function createLog() {
  return { info() {}, warn() {}, debug() {}, error() {} };
}

function okResponse(content: string) {
  return new Response(JSON.stringify({ choices: [{ message: { content } }] }), {
    status: 200,
    headers: { "content-type": "application/json" },
  });
}

test("resolveComboTargets treats a pin-only step as implicit allowlist [connectionId]", () => {
  const targets = resolveComboTargets(
    {
      name: "offical-fable",
      strategy: "priority",
      models: [
        {
          kind: "model",
          model: "claude/claude-code",
          connectionId: "20x-account",
        },
      ],
    },
    null
  );
  assert.equal(targets.length, 1);
  assert.equal(targets[0].connectionId, "20x-account");
  assert.deepEqual(targets[0].allowedConnectionIds, ["20x-account"]);
});

test("resolveComboTargets treats an empty allowlist plus a pin as [connectionId]", () => {
  const targets = resolveComboTargets(
    {
      name: "empty-list-pin",
      strategy: "priority",
      models: [
        {
          kind: "model",
          model: "claude/claude-code",
          connectionId: "20x-account",
          allowedConnectionIds: [],
        },
      ],
    },
    null
  );
  assert.deepEqual(targets[0].allowedConnectionIds, ["20x-account"]);
});

test("resolveComboTargets keeps an explicit allowlist even when a pin is also set", () => {
  const targets = resolveComboTargets(
    {
      name: "multi",
      strategy: "priority",
      models: [
        {
          kind: "model",
          model: "claude/claude-code",
          connectionId: "primary",
          allowedConnectionIds: ["primary", "secondary"],
        },
      ],
    },
    null
  );
  assert.equal(targets[0].connectionId, "primary");
  assert.deepEqual(targets[0].allowedConnectionIds, ["primary", "secondary"]);
});

test("resolveComboTargets does not invent an allowlist for an unpinned step", () => {
  const targets = resolveComboTargets(
    {
      name: "open-pool",
      strategy: "round-robin",
      models: [{ kind: "model", model: "claude/claude-code" }],
    },
    null
  );
  assert.equal(targets[0].connectionId, null);
  assert.equal(targets[0].allowedConnectionIds, undefined);
});

test("handleComboChat passes the implicit pin allowlist into handleSingleModel", async () => {
  let captured: string[] | null | undefined = undefined;
  const response = await handleComboChat({
    body: { model: "rr", messages: [{ role: "user", content: "hi" }] },
    combo: {
      name: "rr",
      strategy: "priority",
      models: [
        {
          kind: "model",
          model: "openai/gpt-4o-mini",
          connectionId: "pinned-20x",
        },
      ],
    },
    handleSingleModel: async (
      _body: unknown,
      modelStr: string,
      target: { allowedConnectionIds?: unknown }
    ) => {
      captured = Array.isArray(target?.allowedConnectionIds)
        ? target.allowedConnectionIds
        : null;
      return okResponse(modelStr);
    },
    log: createLog(),
  });
  assert.equal(response.status, 200);
  assert.deepEqual(captured, ["pinned-20x"]);
});

test("expandTargetsByFingerprints rewrites a composite pin allowlist to the real row id", () => {
  const realConnectionId = "conn-1";
  const pinnedFingerprint = "fp-aaa";
  const composite = `${realConnectionId}|fp|${pinnedFingerprint}`;
  const result = expandTargetsByFingerprints(
    [
      {
        kind: "model",
        stepId: "step-0",
        executionKey: "step-0",
        modelStr: "opencode/kimi-k2",
        provider: "opencode",
        providerId: null,
        connectionId: composite,
        allowedConnectionIds: [composite],
        weight: 0,
        label: null,
      },
    ],
    new Map([[realConnectionId, { id: realConnectionId, provider: "opencode" }]]),
    (t) => t.provider
  );
  assert.equal(result.length, 1);
  assert.equal(result[0].connectionId, realConnectionId);
  assert.deepEqual(result[0].allowedConnectionIds, [realConnectionId]);
});

test("expandTargetsByFingerprints rewrites sibling composite ids, not only the pin", () => {
  const realConnectionId = "conn-1";
  const otherReal = "conn-2";
  const pinnedFingerprint = "fp-aaa";
  const composite = `${realConnectionId}|fp|${pinnedFingerprint}`;
  const otherComposite = `${otherReal}|fp|fp-bbb`;
  const result = expandTargetsByFingerprints(
    [
      {
        kind: "model",
        stepId: "step-0",
        executionKey: "step-0",
        modelStr: "opencode/kimi-k2",
        provider: "opencode",
        providerId: null,
        connectionId: composite,
        allowedConnectionIds: [composite, otherComposite],
        weight: 0,
        label: null,
      },
    ],
    new Map([
      [realConnectionId, { id: realConnectionId, provider: "opencode" }],
      [otherReal, { id: otherReal, provider: "opencode" }],
    ]),
    (t) => t.provider
  );
  assert.deepEqual(result[0].allowedConnectionIds, [realConnectionId, otherReal]);
});

test("comboModelStepInputSchema keeps allowedConnectionIds on parse", () => {
  const parsed = comboModelStepInputSchema.parse({
    kind: "model",
    model: "claude/claude-code",
    connectionId: "20x-account",
    allowedConnectionIds: ["20x-account"],
  });
  assert.deepEqual(parsed.allowedConnectionIds, ["20x-account"]);
});

test("implicitPinAllowlist treats omitted allowlist as [connectionId]", async () => {
  const { implicitPinAllowlist } = await import("../../src/lib/combos/steps.ts");
  assert.deepEqual(implicitPinAllowlist(" 20x ", undefined), ["20x"]);
  assert.deepEqual(implicitPinAllowlist("20x", null), ["20x"]);
  assert.deepEqual(implicitPinAllowlist("20x", ["a", "b"]), ["a", "b"]);
  assert.deepEqual(implicitPinAllowlist("20x", []), ["20x"]);
  assert.deepEqual(implicitPinAllowlist(null, []), []);
  assert.equal(implicitPinAllowlist(null, undefined), null);
});

test("comboPinAllowlist does not invent an allowlist for header-forced pins", async () => {
  const { comboPinAllowlist } = await import("../../src/lib/combos/steps.ts");
  assert.equal(comboPinAllowlist(false, "header-pin", undefined), null);
  assert.equal(comboPinAllowlist(false, "header-pin", null), null);
  assert.deepEqual(comboPinAllowlist(false, "header-pin", ["a"]), ["a"]);
  assert.deepEqual(comboPinAllowlist(true, "combo-pin", undefined), ["combo-pin"]);
});

test("checkModelAvailable applies comboPinAllowlist before credential preflight", async () => {
  const { readFileSync } = await import("node:fs");
  const { fileURLToPath } = await import("node:url");
  const { resolve } = await import("node:path");
  const repoRoot = resolve(fileURLToPath(new URL("../../", import.meta.url)));
  const src = readFileSync(resolve(repoRoot, "src/sse/handlers/chat.ts"), "utf8");
  const start = src.indexOf("const checkModelAvailable = async");
  const end = src.indexOf("isModelAvailable: checkModelAvailable");
  assert.ok(start >= 0 && end > start, "checkModelAvailable body must be locatable");
  const body = src.slice(start, end);
  assert.match(
    body,
    /comboPinAllowlist/,
    "combo preflight caches credentials; a pin without allowlist must not scan the pool"
  );
  const pinAt = body.search(/comboPinAllowlist\s*\(/);
  const credsAt = body.search(/getProviderCredentialsWithQuotaPreflight\s*\(/);
  assert.ok(pinAt >= 0 && credsAt > pinAt, "pin allowlist must be computed before preflight lookup");
});
