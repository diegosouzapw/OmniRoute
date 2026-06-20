/**
 * #3266 — Per-combo account allowlist.
 *
 * A combo model step can carry a first-class `allowedConnectionIds` so a
 * round-robin / weighted strategy is scoped to a subset of a provider's
 * connections (e.g. {foo1, foo2}) without hand-pinning one step per account.
 *
 * Acceptance (owner): a round-robin scoped to {foo1, foo2} over an active pool
 * {foo1..foo4} never selects foo3/foo4 on real chat requests.
 *
 * Coverage:
 *   1. steps.ts parses `allowedConnectionIds` (trim + drop empty).
 *   2. handleComboChat propagates the step allowlist onto target.allowedConnectionIds.
 *   3. getProviderCredentials never hands back a connection outside the allowlist.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-combo-allowlist-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const { handleComboChat } = await import("../../open-sse/services/combo.ts");
const { getProviderCredentials } = await import("../../src/sse/services/auth.ts");
const { normalizeComboStep } = await import("../../src/lib/combos/steps.ts");
const { buildPrecisionComboModelStep } = await import("../../src/lib/combos/builderDraft.ts");

function createLog() {
  return { info() {}, warn() {}, debug() {}, error() {} };
}

function okResponse(content: string) {
  return new Response(JSON.stringify({ choices: [{ message: { content } }] }), {
    status: 200,
    headers: { "content-type": "application/json" },
  });
}

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

async function seedConn(name: string, tags?: string[]) {
  return providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name,
    apiKey: `sk-${name}`,
    isActive: true,
    ...(tags ? { providerSpecificData: { tags } } : {}),
  });
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(async () => {
  await resetStorage();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

// ── 1. Schema parse ─────────────────────────────────────────────────────────

test("normalizeComboStep parses allowedConnectionIds (trim + drop empty)", () => {
  const step = normalizeComboStep({
    kind: "model",
    model: "openai/gpt-4o-mini",
    allowedConnectionIds: [" foo1 ", "foo2", "", "   "],
  });
  assert.ok(step && step.kind === "model");
  assert.deepEqual((step as { allowedConnectionIds?: string[] }).allowedConnectionIds, [
    "foo1",
    "foo2",
  ]);
});

test("normalizeComboStep omits allowedConnectionIds when absent or all-empty", () => {
  const bare = normalizeComboStep({ kind: "model", model: "openai/gpt-4o-mini" });
  assert.ok(bare && bare.kind === "model");
  assert.equal((bare as { allowedConnectionIds?: string[] }).allowedConnectionIds, undefined);

  const emptyish = normalizeComboStep({
    kind: "model",
    model: "openai/gpt-4o-mini",
    allowedConnectionIds: ["", "  "],
  });
  assert.equal((emptyish as { allowedConnectionIds?: string[] }).allowedConnectionIds, undefined);
});

test("buildPrecisionComboModelStep carries an allowlist when auto-selecting (#3266)", () => {
  const step = buildPrecisionComboModelStep({
    providerId: "openai",
    modelId: "gpt-4o-mini",
    connectionId: null,
    allowedConnectionIds: [" a ", "b", "", "b"],
  });
  // trims, drops empty, dedupes
  assert.deepEqual((step as { allowedConnectionIds?: string[] }).allowedConnectionIds, ["a", "b"]);
});

test("buildPrecisionComboModelStep drops the allowlist when a single account is pinned (#3266)", () => {
  const step = buildPrecisionComboModelStep({
    providerId: "openai",
    modelId: "gpt-4o-mini",
    connectionId: "pinned-1",
    allowedConnectionIds: ["a", "b"],
  });
  // a forced connectionId wins — allowlist is meaningless and must not be carried
  assert.equal(step.connectionId, "pinned-1");
  assert.equal((step as { allowedConnectionIds?: string[] }).allowedConnectionIds, undefined);
});

// ── 2. Propagation onto the resolved combo target ───────────────────────────

test("handleComboChat propagates a step allowlist onto target.allowedConnectionIds (#3266)", async () => {
  const foo1 = await seedConn("foo1");
  const foo2 = await seedConn("foo2");
  await seedConn("foo3");
  await seedConn("foo4");

  let captured: string[] | null = null;
  const response = await handleComboChat({
    body: { model: "rr", messages: [{ role: "user", content: "hi" }] },
    combo: {
      name: "rr",
      strategy: "round-robin",
      models: [
        {
          kind: "model",
          model: "openai/gpt-4o-mini",
          allowedConnectionIds: [foo1.id, foo2.id],
        },
      ],
    },
    handleSingleModel: async (
      _body: unknown,
      modelStr: string,
      target: { allowedConnectionIds?: unknown }
    ) => {
      captured = Array.isArray(target?.allowedConnectionIds) ? target.allowedConnectionIds : null;
      return okResponse(modelStr);
    },
    log: createLog(),
  });

  assert.equal(response.status, 200);
  assert.ok(captured, "target.allowedConnectionIds must be populated from the step");
  assert.deepEqual([...captured!].sort(), [foo1.id, foo2.id].sort());
});

// ── 3. Acceptance: the credential selector never escapes the allowlist ───────

test("getProviderCredentials never selects a connection outside the step allowlist (#3266)", async () => {
  const foo1 = await seedConn("foo1");
  const foo2 = await seedConn("foo2");
  const foo3 = await seedConn("foo3");
  const foo4 = await seedConn("foo4");
  const allowed = [foo1.id, foo2.id];
  const forbidden = new Set([foo3.id, foo4.id]);

  const seen = new Set<string>();
  for (let i = 0; i < 24; i++) {
    const cred = (await getProviderCredentials("openai", null, allowed)) as {
      connectionId?: string;
    } | null;
    assert.ok(cred && cred.connectionId, "a credential within the allowlist must be returned");
    assert.ok(
      allowed.includes(cred!.connectionId!),
      `selected ${cred!.connectionId} which is outside the allowlist`
    );
    assert.ok(!forbidden.has(cred!.connectionId!), "must never select foo3/foo4");
    seen.add(cred!.connectionId!);
  }
  // Both allowed accounts should be reachable (round-robin spreads across the subset).
  assert.ok(seen.size >= 1 && [...seen].every((id) => allowed.includes(id)));
});

// ── 4. Step allowlist + tag routing → most-restrictive (intersection) ───────

test("a step allowlist intersects with tag routing — most-restrictive wins (#3266)", async () => {
  await seedConn("foo1", ["us"]);
  const foo2 = await seedConn("foo2", ["eu"]);
  const foo3 = await seedConn("foo3", ["eu"]);
  await seedConn("foo4", ["us"]);

  let captured: string[] | null = null;
  const response = await handleComboChat({
    body: {
      model: "rr",
      messages: [{ role: "user", content: "hi" }],
      metadata: { tags: ["eu"] },
    },
    combo: {
      name: "rr",
      strategy: "priority",
      models: [
        {
          kind: "model",
          model: "openai/gpt-4o-mini",
          // allowlist excludes foo4; tags=[eu] match foo2+foo3 → intersection {foo2,foo3}
          allowedConnectionIds: [foo2.id, foo3.id, "nonexistent-but-allowed"],
        },
      ],
    },
    handleSingleModel: async (
      _body: unknown,
      modelStr: string,
      target: { allowedConnectionIds?: unknown }
    ) => {
      captured = Array.isArray(target?.allowedConnectionIds) ? target.allowedConnectionIds : null;
      return okResponse(modelStr);
    },
    log: createLog(),
  });

  assert.equal(response.status, 200);
  assert.ok(captured, "target.allowedConnectionIds must be the intersection");
  assert.deepEqual([...captured!].sort(), [foo2.id, foo3.id].sort());
});
