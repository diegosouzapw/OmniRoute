/**
 * Combos-only export/import: a shareable, secret-free JSON file that carries
 * just the combo definitions (no settings, connections, API keys or proxy
 * assignments), plus a non-destructive import (merge by default, explicit
 * replace inside one DB transaction).
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-combos-export-import-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
const ORIGINAL_INITIAL_PASSWORD = process.env.INITIAL_PASSWORD;
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const combosDb = await import("../../src/lib/db/combos.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const exportRoute = await import("../../src/app/api/combos/export/route.ts");
const importRoute = await import("../../src/app/api/combos/import/route.ts");

type JsonRecord = Record<string, unknown>;

function exportRequest() {
  return new Request("http://localhost/api/combos/export");
}

function importRequest(body: unknown) {
  return new Request("http://localhost/api/combos/import", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
}

function fileWith(combos: unknown[]) {
  return { _meta: { version: "omniroute-combos-v1" }, combos };
}

async function comboNames(): Promise<string[]> {
  const combos = await combosDb.getCombos();
  return combos.map((c) => String(c.name)).sort();
}

test.beforeEach(async () => {
  core.resetDbInstance();
  delete process.env.INITIAL_PASSWORD;
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  if (ORIGINAL_DATA_DIR === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = ORIGINAL_DATA_DIR;
  if (ORIGINAL_INITIAL_PASSWORD === undefined) delete process.env.INITIAL_PASSWORD;
  else process.env.INITIAL_PASSWORD = ORIGINAL_INITIAL_PASSWORD;
});

test("export returns only combos with _meta.version and strips ids, connections and secrets", async () => {
  await combosDb.createCombo({
    name: "combo-a",
    strategy: "priority",
    description: "shared",
    models: [
      {
        providerId: "claude",
        model: "claude/claude-sonnet-4-6",
        connectionId: "conn-123",
        allowedConnectionIds: ["conn-123", "conn-456"],
      },
    ],
    config: { maxRetries: 2, nadir: { apiKey: "sk-secret-nadir", baseUrl: "https://n.example" } },
  });
  await combosDb.createCombo({
    name: "hidden-quota",
    strategy: "priority",
    isHidden: true,
    models: [{ providerId: "openai", model: "openai/gpt-4o" }],
  });

  const response = await exportRoute.GET(exportRequest());
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-disposition") || "", /attachment; filename=/);
  const raw = await response.text();
  const body = JSON.parse(raw) as JsonRecord;

  assert.deepEqual(Object.keys(body).sort(), ["_meta", "combos"]);
  assert.equal((body._meta as JsonRecord).version, "omniroute-combos-v1");
  assert.equal(body.apiKeys, undefined);
  assert.equal(body.providerConnections, undefined);
  assert.equal(body.settings, undefined);

  const combos = body.combos as JsonRecord[];
  assert.deepEqual(
    combos.map((c) => c.name),
    ["combo-a"],
    "hidden system-managed combos are not exported"
  );
  const [combo] = combos;
  assert.equal(combo.id, undefined);
  assert.equal(combo.createdAt, undefined);
  assert.equal(combo.updatedAt, undefined);
  assert.equal(combo.sortOrder, undefined);
  assert.equal(combo.description, "shared");
  const [step] = combo.models as JsonRecord[];
  assert.equal(step.connectionId, undefined);
  assert.equal(step.allowedConnectionIds, undefined);
  assert.equal(step.model, "claude/claude-sonnet-4-6");
  const config = combo.config as JsonRecord;
  assert.equal(config.maxRetries, 2);
  assert.equal((config.nadir as JsonRecord).apiKey, undefined);
  assert.equal((config.nadir as JsonRecord).baseUrl, "https://n.example");
  assert.ok(!raw.includes("sk-secret-nadir"), "no secret leaks anywhere in the file");
  assert.ok(!raw.includes("conn-123"), "no connection id leaks anywhere in the file");
});

test("export honors hidePaidModels and drops paid model steps", async () => {
  await combosDb.createCombo({
    name: "base",
    strategy: "priority",
    models: [{ providerId: "claude", model: "claude/claude-sonnet-4-6" }],
  });
  await combosDb.createCombo({
    name: "mixed",
    strategy: "priority",
    models: [
      { providerId: "openai", model: "openai/gpt-4o" },
      { kind: "combo-ref", comboName: "base" },
    ],
  });
  await settingsDb.updateSettings({ hidePaidModels: true });

  const response = await exportRoute.GET(exportRequest());
  const body = (await response.json()) as { combos: JsonRecord[] };
  const mixed = body.combos.find((c) => c.name === "mixed");
  assert.ok(mixed);
  const steps = mixed.models as JsonRecord[];
  assert.equal(steps.length, 1);
  assert.equal(steps[0].kind, "combo-ref");
});

test("import merge (default) keeps existing combos, creates new ones and reports conflicts", async () => {
  await combosDb.createCombo({
    name: "combo-a",
    strategy: "priority",
    models: [{ providerId: "claude", model: "claude/claude-sonnet-4-6" }],
  });

  const response = await importRoute.POST(
    importRequest(
      fileWith([
        {
          name: "combo-a",
          strategy: "round-robin",
          models: [{ providerId: "openai", model: "openai/gpt-4o" }],
        },
        {
          name: "combo-b",
          strategy: "round-robin",
          models: [{ providerId: "openai", model: "openai/gpt-4o", connectionId: "foreign-conn" }],
          config: { nadir: { apiKey: "sk-imported-secret" } },
        },
      ])
    )
  );
  assert.equal(response.status, 200);
  const body = (await response.json()) as JsonRecord;
  assert.equal(body.mode, "merge");
  assert.deepEqual(body.created, ["combo-b"]);
  assert.deepEqual(body.skipped, ["combo-a"]);
  assert.equal(body.removed, 0);

  const comboA = (await combosDb.getComboByName("combo-a")) as JsonRecord;
  assert.equal(comboA.strategy, "priority", "existing combo is untouched");
  const comboB = (await combosDb.getComboByName("combo-b")) as JsonRecord;
  assert.equal(comboB.strategy, "round-robin");
  const [step] = comboB.models as JsonRecord[];
  assert.equal(step.connectionId, undefined, "foreign connection ids are never imported");
  const nadir = ((comboB.config as JsonRecord | undefined)?.nadir ?? {}) as JsonRecord;
  assert.equal(nadir.apiKey, undefined, "credentials are never imported");
});

test("import replace swaps visible combos for the file and keeps hidden system combos", async () => {
  await combosDb.createCombo({
    name: "old-1",
    strategy: "priority",
    models: [{ providerId: "claude", model: "claude/claude-sonnet-4-6" }],
  });
  await combosDb.createCombo({
    name: "hidden-quota",
    strategy: "priority",
    isHidden: true,
    models: [{ providerId: "openai", model: "openai/gpt-4o" }],
  });

  const response = await importRoute.POST(
    importRequest({
      ...fileWith([
        { name: "new-1", models: [{ providerId: "openai", model: "openai/gpt-4o" }] },
        { name: "new-2", models: [{ kind: "combo-ref", comboName: "new-1" }] },
      ]),
      mode: "replace",
    })
  );
  assert.equal(response.status, 200);
  const body = (await response.json()) as JsonRecord;
  assert.equal(body.mode, "replace");
  assert.equal(body.removed, 1);
  assert.deepEqual(body.created, ["new-1", "new-2"]);
  assert.deepEqual(await comboNames(), ["hidden-quota", "new-1", "new-2"]);
});

test("import replace rolls back everything when an entry fails mid-way", async () => {
  await combosDb.createCombo({
    name: "keep-me",
    strategy: "priority",
    models: [{ providerId: "claude", model: "claude/claude-sonnet-4-6" }],
  });

  const response = await importRoute.POST(
    importRequest({
      ...fileWith([
        { name: "fine", models: [{ providerId: "openai", model: "openai/gpt-4o" }] },
        {
          name: "violates-invariant",
          allowedProviders: ["openai"],
          models: [{ providerId: "claude", model: "claude/claude-sonnet-4-6" }],
        },
      ]),
      mode: "replace",
    })
  );
  assert.equal(response.status, 400);
  assert.deepEqual(await comboNames(), ["keep-me"], "transaction rolled back");
});

test("import rejects an invalid entry with 400, sanitized message, and writes nothing", async () => {
  const response = await importRoute.POST(
    importRequest(
      fileWith([
        { name: "valid-one", models: [{ providerId: "openai", model: "openai/gpt-4o" }] },
        { name: "bad-one", strategy: "not-a-strategy", models: ["openai/gpt-4o"] },
      ])
    )
  );
  assert.equal(response.status, 400);
  const body = (await response.json()) as { error: { message: string } };
  assert.match(body.error.message, /bad-one/);
  assert.ok(!body.error.message.includes("at /"), "no stack trace in the error body");
  assert.deepEqual(await comboNames(), []);
});

test("import rejects duplicate names, unknown file versions and empty files", async () => {
  const duplicate = await importRoute.POST(
    importRequest(
      fileWith([
        { name: "dup", models: ["openai/gpt-4o"] },
        { name: "dup", models: ["openai/gpt-4o"] },
      ])
    )
  );
  assert.equal(duplicate.status, 400);

  const wrongVersion = await importRoute.POST(
    importRequest({
      _meta: { version: "omniroute-v3-legacy-export" },
      combos: [{ name: "x", models: ["openai/gpt-4o"] }],
    })
  );
  assert.equal(wrongVersion.status, 400);

  const empty = await importRoute.POST(importRequest(fileWith([])));
  assert.equal(empty.status, 400);
  assert.deepEqual(await comboNames(), []);
});

test("export and import require management auth", async () => {
  process.env.INITIAL_PASSWORD = "bootstrap-password";
  await settingsDb.updateSettings({ requireLogin: true, password: "" });

  const exported = await exportRoute.GET(exportRequest());
  assert.equal(exported.status, 401);

  const imported = await importRoute.POST(
    importRequest(fileWith([{ name: "nope", models: ["openai/gpt-4o"] }]))
  );
  assert.equal(imported.status, 401);
  delete process.env.INITIAL_PASSWORD;
  await settingsDb.updateSettings({ requireLogin: false });
  assert.deepEqual(await comboNames(), []);
});

test("export → import round trip preserves wildcard and combo-ref steps and warns on unknown providers", async () => {
  await combosDb.createCombo({
    name: "leaf",
    strategy: "priority",
    models: [{ model: "openai/*", connectionId: "conn-wild" }],
  });
  await combosDb.createCombo({
    name: "root",
    strategy: "priority",
    models: [{ kind: "combo-ref", comboName: "leaf" }],
  });
  const exported = (await (await exportRoute.GET(exportRequest())).json()) as {
    combos: JsonRecord[];
  };

  const response = await importRoute.POST(importRequest({ ...exported, mode: "replace" }));
  assert.equal(response.status, 200);
  const body = (await response.json()) as { created: string[]; warnings: string[] };
  assert.deepEqual([...body.created].sort(), ["leaf", "root"]);
  assert.ok(
    body.warnings.some((w) => w.includes('"openai"')),
    "provider without a configured connection is reported as a warning"
  );

  const leaf = (await combosDb.getComboByName("leaf")) as JsonRecord;
  const [wildcard] = leaf.models as JsonRecord[];
  assert.equal(wildcard.kind, "provider-wildcard");
  assert.equal(wildcard.providerId, "openai");
  assert.equal(wildcard.connectionId, undefined);
  const root = (await combosDb.getComboByName("root")) as JsonRecord;
  const [ref] = root.models as JsonRecord[];
  assert.equal(ref.kind, "combo-ref");
  assert.equal(ref.comboName, "leaf");
});
