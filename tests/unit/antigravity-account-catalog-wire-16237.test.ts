import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const dataDir = mkdtempSync(join(tmpdir(), "antigravity-wire-16237-"));
process.env.DATA_DIR = dataDir;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
const { getDbInstance, resetDbInstance } = await import("../../src/lib/db/core.ts");
const { AntigravityExecutor, cleanModelName } =
  await import("../../open-sse/executors/antigravity.ts");
const { seedAntigravityIdeVersionCache, seedAntigravityCliVersionCache } =
  await import("../../open-sse/services/antigravityVersion.ts");
const literal = "gemini-3.7-flash-high";
const tiered = "gemini-3.7-flash-tiered";
const originalFetch = globalThis.fetch;

function seed(connectionId: string, ids: string[], provider = "antigravity") {
  const db = getDbInstance();
  const now = new Date().toISOString();
  db.prepare(
    `INSERT OR REPLACE INTO provider_connections
    (id, provider, is_active, synced_models_at, created_at, updated_at)
    VALUES (?, ?, 1, ?, ?, ?)`
  ).run(connectionId, provider, now, now, now);
  db.prepare("INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES (?, ?, ?)").run(
    "syncedAvailableModels",
    `${provider}:${connectionId}`,
    JSON.stringify(ids.map((id) => ({ id })))
  );
}

async function dispatch(connectionId: string | undefined, model = literal) {
  const wires: Array<{ model: string; project: string; request: unknown }> = [];
  globalThis.fetch = async (url, init) => {
    assert.match(String(url), /\/v1internal:streamGenerateContent\?alt=sse$/);
    assert.equal(init?.method, "POST");
    assert.equal(typeof init.body, "string");
    assert.ok(init.signal instanceof AbortSignal);
    wires.push(JSON.parse(String(init.body)));
    return new Response(
      'data: {"response":{"candidates":[{"content":{"parts":[{"text":"ok"}]},"finishReason":"STOP"}]}}\n\n',
      {
        headers: { "Content-Type": "text/event-stream" },
      }
    );
  };
  try {
    const result = await new AntigravityExecutor().execute({
      model,
      body: { request: { contents: [{ role: "user", parts: [{ text: "hello" }] }] } },
      stream: true,
      credentials: { connectionId, accessToken: "synthetic-token", projectId: "synthetic-project" },
      log: { debug() {}, warn() {} },
    });
    assert.equal(result.response.status, 200);
    assert.match(await result.response.text(), /ok/);
    assert.equal(wires.length, 1);
    assert.equal(wires[0].project, "synthetic-project");
    return wires[0].model;
  } finally {
    globalThis.fetch = originalFetch;
  }
}

test.beforeEach(() => {
  const db = getDbInstance();
  db.prepare("DELETE FROM provider_connections").run();
  db.prepare(
    "DELETE FROM key_value WHERE namespace IN ('syncedAvailableModels', 'mitmAlias')"
  ).run();
  db.prepare(
    "INSERT INTO key_value (namespace, key, value) VALUES ('mitmAlias', 'antigravity', ?)"
  ).run(JSON.stringify({ [literal]: `antigravity/${tiered}` }));
  seedAntigravityIdeVersionCache("2.1.1");
  seedAntigravityCliVersionCache("1.1.5");
});
test.after(() => {
  globalThis.fetch = originalFetch;
  resetDbInstance();
  rmSync(dataDir, { recursive: true, force: true });
});

test("fresh selected account sends its literal 3.7 id before global MITM aliases", async () => {
  seed("literal-account", [literal, tiered]);
  seed("tiered-account", [tiered]);
  assert.equal(await dispatch("literal-account"), literal);
});
test("tiered-only selected account retains tiered wire id despite another account's literal", async () => {
  seed("literal-account", [literal]);
  seed("tiered-account", [tiered]);
  assert.equal(await dispatch("tiered-account"), tiered);
});
test("missing selected account retains the existing MITM/static fallback", async () => {
  seed("other-account", [literal]);
  assert.equal(await dispatch("missing-account"), tiered);
});

for (const tier of ["high", "medium", "low"]) {
  for (const provider of ["antigravity", "agy"]) {
    test(`${provider} ${tier} literal-only catalog wins without MITM`, async () => {
      const id = `gemini-3.7-flash-${tier}`;
      getDbInstance().prepare("DELETE FROM key_value WHERE namespace = 'mitmAlias'").run();
      seed("selected", [id], provider);
      assert.equal(await dispatch("selected", `${provider}/${id}`), id);
    });
  }
}

test("selected-account lookup prevents an unrelated global Pro fallback chain", async () => {
  seed("selected", [literal]);
  getDbInstance()
    .prepare("UPDATE key_value SET value = ? WHERE namespace = 'mitmAlias'")
    .run(JSON.stringify({ [literal]: "antigravity/gemini-3.1-pro-low" }));
  assert.equal(await dispatch("selected"), literal);
});

test("fresh tiered-only evidence also precedes a different global MITM mapping", async () => {
  seed("selected", [tiered]);
  getDbInstance()
    .prepare("UPDATE key_value SET value = ? WHERE namespace = 'mitmAlias'")
    .run(JSON.stringify({ [literal]: "antigravity/old-target" }));
  assert.equal(await dispatch("selected"), tiered);
});

test("successive account selections and catalog replacements never reuse a sibling snapshot", async () => {
  seed("a", [literal]);
  seed("b", [tiered]);
  assert.equal(await dispatch("b"), tiered);
  assert.equal(await dispatch("a"), literal);
  seed("a", [tiered]);
  seed("b", [literal]);
  assert.equal(await dispatch("a"), tiered);
  assert.equal(await dispatch("b"), literal);
});

for (const [label, timestamp] of [
  ["missing", null],
  ["invalid", "not-a-date"],
  ["expired", new Date(Date.now() - 31 * 86400000).toISOString()],
]) {
  test(`${label} timestamp cannot borrow freshness from another account`, async () => {
    seed("selected", [literal]);
    seed("other", [literal]);
    getDbInstance()
      .prepare("UPDATE provider_connections SET synced_models_at = ? WHERE id = ?")
      .run(timestamp, "selected");
    assert.equal(await dispatch("selected"), tiered);
  });
}
for (const [label, content] of [
  ["empty", "[]"],
  ["malformed JSON", "{"],
  ["wrong shape", "{}"],
  ["invalid entries", '[null,{"id":5}]'],
  ["unrelated models", '[{"id":"other"}]'],
]) {
  test(`${label} catalog keeps existing fallback`, async () => {
    seed("selected", [literal]);
    getDbInstance()
      .prepare("UPDATE key_value SET value = ? WHERE namespace = 'syncedAvailableModels'")
      .run(content);
    assert.equal(await dispatch("selected"), tiered);
  });
}

test("inactive connection cannot authorize its literal", async () => {
  seed("selected", [literal]);
  getDbInstance()
    .prepare("UPDATE provider_connections SET is_active = 0 WHERE id = ?")
    .run("selected");
  assert.equal(await dispatch("selected"), tiered);
});

test("another provider's connection cannot authorize an Antigravity literal", async () => {
  seed("selected", [literal], "openai");
  assert.equal(await dispatch("selected"), tiered);
});

test("catalog key must match the stored provider identity as well as connection id", async () => {
  seed("selected", [literal], "agy");
  getDbInstance()
    .prepare("UPDATE key_value SET key = ? WHERE namespace = 'syncedAvailableModels'")
    .run("antigravity:selected");
  assert.equal(await dispatch("selected"), tiered);
});

test("provider-wide custom models are not account evidence", async () => {
  seed("selected", []);
  getDbInstance()
    .prepare(
      "INSERT OR REPLACE INTO key_value (namespace,key,value) VALUES ('customModels','antigravity',?)"
    )
    .run(JSON.stringify([{ id: literal }]));
  assert.equal(await dispatch("selected"), tiered);
});

test("omitted connection preserves the public legacy helper and executor contract", async () => {
  seed("selected", [literal]);
  assert.equal(await cleanModelName(`antigravity/${literal}`), tiered);
  assert.equal(await dispatch(undefined), tiered);
});

test("explicit override still wins over fresh account and MITM", async () => {
  seed("selected", [literal]);
  const result = await new AntigravityExecutor().transformRequest(
    literal,
    { request: { contents: [] } },
    true,
    { connectionId: "selected", projectId: "synthetic-project" },
    "antigravity/forced-wire-id"
  );
  assert.ok(!(result instanceof Response));
  assert.equal(result.model, "forced-wire-id");
});

for (const [requested, expected] of [
  ["gemini-3.7-flash", tiered],
  ["gemini-3.1-pro-high", "gemini-pro-agent"],
  ["gemini-3.8-flash-high", "gemini-3.8-flash-high"],
  ["claude-sonnet-4-6", "claude-sonnet-4-6"],
  ["unknown-model", "unknown-model"],
]) {
  test(`${requested} retains its established family mapping`, async () => {
    seed("selected", [requested]);
    assert.equal(await dispatch("selected", requested), expected);
  });
}

for (const [label, ttl, age, expected] of [
  ["default boundary", undefined, 30 * 86400000, literal],
  ["default expired", undefined, 30 * 86400000 + 1, tiered],
  ["override boundary", "1000", 1000, literal],
  ["override expired", "1000", 1001, tiered],
  ["invalid override uses default", "invalid", 86400000, literal],
  ["nonpositive override uses default", "0", 86400000, literal],
] as const) {
  test(`freshness parity: ${label}`, async () => {
    const now = Date.now();
    const previousNow = Date.now;
    const previousTtl = process.env.OMNIROUTE_SYNCED_CATALOG_STALE_AFTER_MS;
    if (ttl === undefined) delete process.env.OMNIROUTE_SYNCED_CATALOG_STALE_AFTER_MS;
    else process.env.OMNIROUTE_SYNCED_CATALOG_STALE_AFTER_MS = ttl;
    Date.now = () => now;
    try {
      seed("selected", [literal]);
      getDbInstance()
        .prepare("UPDATE provider_connections SET synced_models_at = ? WHERE id = ?")
        .run(new Date(now - age).toISOString(), "selected");
      assert.equal(await dispatch("selected"), expected);
    } finally {
      Date.now = previousNow;
      if (previousTtl === undefined) delete process.env.OMNIROUTE_SYNCED_CATALOG_STALE_AFTER_MS;
      else process.env.OMNIROUTE_SYNCED_CATALOG_STALE_AFTER_MS = previousTtl;
    }
  });
}

for (const credentials of [undefined, null, {}]) {
  const label = credentials === undefined ? "undefined" : credentials === null ? "null" : "empty";
  test(`transformRequest preserves body project with ${label} credentials`, async () => {
    const body = {
      project: "synthetic-project",
      request: { contents: [{ role: "user", parts: [{ text: "hello" }] }] },
    };
    const result = await new AntigravityExecutor().transformRequest(
      literal,
      body,
      true,
      credentials
    );
    assert.equal(result.project, "synthetic-project");
    assert.equal(result.model, tiered);
    assert.equal(result.request.contents[0].parts[0].text, "hello");
  });
}
