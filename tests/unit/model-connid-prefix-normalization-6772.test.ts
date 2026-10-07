/**
 * PROBE for issue #6772 — custom OpenAI-compat <connId>/<listedModelId> 400s when the
 * connection has a user-defined `prefix` and the listed model id (from /api/models)
 * already carries that prefix baked in ("custpfx6772/vova/gpt-5.5").
 *
 * Root cause hypothesis: in src/sse/services/model.ts getModelInfo(), when a client
 * addresses the connection by its raw internal node id (`<connId>/...`), the matching
 * branch finds the node via `node.id === prefixToCheck` but returns `parsed.model`
 * UNSTRIPPED of the node's own `prefix` — so `<connId>/<prefix>/<rawModelId>` resolves
 * to `{ provider: connId, model: "<prefix>/<rawModelId>" }` instead of stripping the
 * redundant prefix down to the actual registered custom model id `<rawModelId>`.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-probe-6772-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const modelsDb = await import("../../src/lib/db/models.ts");
const { getModelInfo } = await import("../../src/sse/services/model.ts");

const CONN_ID = "openai-compatible-chat-97b0e595-probe6772";
const PREFIX = "custpfx6772"; // was "fta"; freetheai (#7602) claimed the "fta" built-in alias, which by design shadows custom-node prefixes
const RAW_MODEL_ID = "vova/gpt-5.5"; // upstream's own model id already has a slash

test.before(async () => {
  await providersDb.createProviderNode({
    id: CONN_ID,
    type: "openai-compatible",
    name: "freetheai (probe)",
    prefix: PREFIX,
    baseUrl: "https://proxy.example.com",
    chatPath: "/v1/chat/completions",
    modelsPath: "/v1/models",
  });
  await modelsDb.addCustomModel(
    CONN_ID,
    RAW_MODEL_ID,
    "vova gpt-5.5",
    "manual",
    "chat-completions",
    ["chat"]
  );
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("#6772 baseline: bare alias form `custpfx6772/vova/gpt-5.5` resolves to the raw model id", async () => {
  const info = (await getModelInfo(`${PREFIX}/${RAW_MODEL_ID}`)) as {
    provider?: string;
    model?: string;
  };
  assert.equal(info.provider, CONN_ID, "must resolve to the custom node via its prefix");
  assert.equal(info.model, RAW_MODEL_ID, "model must be the raw registered custom model id");
});

test("#6772 baseline: `<connId>/vova/gpt-5.5` (no namespace) resolves to the raw model id", async () => {
  const info = (await getModelInfo(`${CONN_ID}/${RAW_MODEL_ID}`)) as {
    provider?: string;
    model?: string;
  };
  assert.equal(info.provider, CONN_ID, "must resolve to the custom node via its internal id");
  assert.equal(info.model, RAW_MODEL_ID, "model must be the raw registered custom model id");
});

test("#6772 RED: `<connId>/<prefix>/<rawModelId>` (naive owned_by+id concat) must normalize to the raw model id, not double-prefix", async () => {
  const info = (await getModelInfo(`${CONN_ID}/${PREFIX}/${RAW_MODEL_ID}`)) as {
    provider?: string;
    model?: string;
  };
  assert.equal(info.provider, CONN_ID, "must resolve to the custom node via its internal id");
  assert.equal(
    info.model,
    RAW_MODEL_ID,
    `model must strip the node's own prefix "${PREFIX}/" so it matches the registered custom model id ` +
      `"${RAW_MODEL_ID}" — got "${info.model}" instead (double-namespaced, will 400 upstream)`
  );
});

// ── shedding redundant routing segments (node prefix AND internal id) ──

const AC_CONN_ID = "anthropic-compatible-a1111111-probeshed";
const AC_PREFIX = "acustpfx";

test.before(async () => {
  await providersDb.createProviderNode({
    id: AC_CONN_ID,
    type: "anthropic-compatible",
    name: "probe shed",
    prefix: AC_PREFIX,
    baseUrl: "https://proxy.example.com",
    chatPath: "/v1/messages",
    modelsPath: "/v1/models",
  });
  await modelsDb.addCustomModel(
    AC_CONN_ID,
    RAW_MODEL_ID,
    "vova gpt-5.5",
    "manual",
    "chat-completions",
    ["chat"]
  );
});

test("shed measured production-log shape: `<connId>/<connId>/<bare>` sheds to `<bare>`", async () => {
  const info = (await getModelInfo(`${CONN_ID}/${CONN_ID}/gpt-oss-20b`)) as {
    provider?: string;
    model?: string;
  };
  assert.equal(info.provider, CONN_ID);
  assert.equal(info.model, "gpt-oss-20b", `got "${info.model}"`);
});

test("shed full logged composite: double connId + namespace keeps the namespace after shed", async () => {
  // Real production log shape: `<connId>/<connId>/openai/gpt-oss-20b:free`.
  // Shedding removes the matched node's OWN identifiers only; the `openai/`
  // namespace is out of scope — this test pins that exact promise.
  const info = (await getModelInfo(`${CONN_ID}/${CONN_ID}/openai/gpt-oss-20b:free`)) as {
    provider?: string;
    model?: string;
  };
  assert.equal(info.provider, CONN_ID);
  assert.equal(info.model, "openai/gpt-oss-20b:free", `got "${info.model}"`);
});

test("shed mixed addressing: `<prefix>/<connId>/<raw>` sheds to `<raw>`", async () => {
  const info = (await getModelInfo(`${PREFIX}/${CONN_ID}/${RAW_MODEL_ID}`)) as {
    provider?: string;
    model?: string;
  };
  assert.equal(info.provider, CONN_ID);
  assert.equal(info.model, RAW_MODEL_ID, `got "${info.model}"`);
});

test("shed #493 guard: legitimate namespace distinct from the node's identifiers stays intact", async () => {
  const info = (await getModelInfo(`${CONN_ID}/zai-org/GLM-5-FP8`)) as {
    provider?: string;
    model?: string;
  };
  assert.equal(info.provider, CONN_ID);
  assert.equal(info.model, "zai-org/GLM-5-FP8", `got "${info.model}"`);
});

test("shed SYNTHETIC triple stack: `<connId>/<prefix>/<connId>/<raw>` sheds to `<raw>`", async () => {
  const info = (await getModelInfo(`${CONN_ID}/${PREFIX}/${CONN_ID}/${RAW_MODEL_ID}`)) as {
    provider?: string;
    model?: string;
  };
  assert.equal(info.provider, CONN_ID);
  assert.equal(info.model, RAW_MODEL_ID, `got "${info.model}"`);
});

test("shed accepted limitation (#6772 precedent): operator prefix equal to a catalog namespace is shed", async () => {
  // An operator naming their prefix like a real upstream namespace sees that
  // namespace shed — indistinguishable without querying the catalog.
  // DOCUMENTARY LOCK: same input as the "bare alias form" baseline above — no
  // new behavioral coverage; pins the accepted limitation as shedding, not refusal.
  const info = (await getModelInfo(`${PREFIX}/${RAW_MODEL_ID}`)) as {
    provider?: string;
    model?: string;
  };
  assert.equal(info.provider, CONN_ID);
  assert.equal(info.model, RAW_MODEL_ID);
});

test("shed anthropic-compatible parity: `<acConnId>/<acPrefix>/<raw>` sheds to `<raw>`", async () => {
  const info = (await getModelInfo(`${AC_CONN_ID}/${AC_PREFIX}/${RAW_MODEL_ID}`)) as {
    provider?: string;
    model?: string;
  };
  assert.equal(info.provider, AC_CONN_ID);
  assert.equal(info.model, RAW_MODEL_ID, `got "${info.model}"`);
});
