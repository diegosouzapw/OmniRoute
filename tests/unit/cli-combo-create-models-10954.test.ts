// Regression for #10954: `omniroute combo create` did not accept any way to
// specify models — `bin/cli/commands/combo.mjs` only ever registered
// `--strategy`, and both the HTTP body (POST /api/combos) and the local-db
// fallback (db.combos.createCombo) hardcoded `models: []`. Every combo
// created via the CLI came out empty.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import type { Command } from "commander";

type CapturedOpts = Record<string, unknown>;

interface MockFetchInit {
  method?: string;
  body?: string;
}

const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
const ORIGINAL_FETCH = globalThis.fetch;

function createTempDataDir() {
  return fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-cli-combo-models-"));
}

async function withComboEnv(fn: (dataDir: string) => Promise<void>) {
  const dataDir = createTempDataDir();
  process.env.DATA_DIR = dataDir;
  // Mock fetch → simulates server offline so withRuntime falls back to DB.
  globalThis.fetch = (async () => {
    throw new Error("server offline");
  }) as typeof fetch;

  const originalLog = console.log;
  console.log = () => {};

  try {
    await fn(dataDir);
  } finally {
    console.log = originalLog;
    globalThis.fetch = ORIGINAL_FETCH;
    fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });

    if (ORIGINAL_DATA_DIR === undefined) delete process.env.DATA_DIR;
    else process.env.DATA_DIR = ORIGINAL_DATA_DIR;
  }
}

function makeHealthAndComboFetch(capture: { body: CapturedOpts | null }) {
  return (async (url: string, opts?: MockFetchInit) => {
    if (String(url).includes("/api/health")) {
      return {
        ok: true,
        status: 200,
        json: async () => ({ status: "ok" }),
        text: async () => "{}",
        headers: new Headers(),
      };
    }
    if (String(url).includes("/api/combos") && opts?.method === "POST") {
      capture.body = opts?.body ? JSON.parse(opts.body) : null;
      return {
        ok: true,
        status: 201,
        json: async () => ({ id: "combo-1", ...capture.body }),
        text: async () => JSON.stringify(capture.body),
        headers: new Headers(),
      };
    }
    throw new Error(`unexpected fetch: ${url}`);
  }) as unknown as typeof fetch;
}

// RED (on untouched code): `combo create` only registers `--strategy` — an
// unrecognized `--models` option makes Commander (in strict `exitOverride`
// mode) throw "unknown option '--models'" instead of parsing.
test("combo create — parses --models without throwing (Commander option registered)", async () => {
  const { registerCombo } = await import("../../bin/cli/commands/combo.mjs");
  const { Command } = await import("commander");

  const prog = new Command().exitOverride();
  registerCombo(prog);
  const comboCmd = prog.commands.find((c: Command) => c.name() === "combo") as Command;
  const createCmd = comboCmd.commands.find((c: Command) => c.name() === "create") as Command;

  let capturedOpts: CapturedOpts | null = null;
  createCmd.action((_name: string, opts: CapturedOpts) => {
    capturedOpts = opts;
  });

  await prog.parseAsync(
    [
      "node",
      "x",
      "combo",
      "create",
      "my-combo",
      "--models",
      "openai/gpt-4o,anthropic/claude-3-opus",
    ],
    { from: "node" }
  );

  assert.ok(capturedOpts, "action should have been called");
  assert.equal(capturedOpts.models, "openai/gpt-4o,anthropic/claude-3-opus");
});

test("combo create — repeatable --model is registered and collected", async () => {
  const { registerCombo } = await import("../../bin/cli/commands/combo.mjs");
  const { Command } = await import("commander");

  const prog = new Command().exitOverride();
  registerCombo(prog);
  const comboCmd = prog.commands.find((c: Command) => c.name() === "combo") as Command;
  const createCmd = comboCmd.commands.find((c: Command) => c.name() === "create") as Command;

  let capturedOpts: CapturedOpts | null = null;
  createCmd.action((_name: string, opts: CapturedOpts) => {
    capturedOpts = opts;
  });

  await prog.parseAsync(
    [
      "node",
      "x",
      "combo",
      "create",
      "my-combo",
      "--model",
      "openai/gpt-4o",
      "--model",
      "anthropic/claude-3-opus",
    ],
    { from: "node" }
  );

  assert.deepEqual(capturedOpts.model, ["openai/gpt-4o", "anthropic/claude-3-opus"]);
});

test("comboModels.resolveComboModels — parses CSV provider/model tokens", async () => {
  const { resolveComboModels } = await import("../../bin/cli/commands/comboModels.mjs");
  const models = resolveComboModels({ models: "openai/gpt-4o, anthropic/claude-3-opus" });
  assert.deepEqual(models, ["openai/gpt-4o", "anthropic/claude-3-opus"]);
});

test("comboModels.resolveComboModels — parses a JSON array of structured entries", async () => {
  const { resolveComboModels } = await import("../../bin/cli/commands/comboModels.mjs");
  const models = resolveComboModels({
    models: JSON.stringify([
      { model: "gpt-4o", providerId: "openai" },
      { kind: "combo-ref", comboName: "fallback-combo" },
    ]),
  });
  assert.deepEqual(models, [
    { model: "gpt-4o", providerId: "openai" },
    { kind: "combo-ref", comboName: "fallback-combo" },
  ]);
});

test("comboModels.resolveComboModels — rejects an invalid JSON entry shape", async () => {
  const { resolveComboModels } = await import("../../bin/cli/commands/comboModels.mjs");
  assert.throws(
    () => resolveComboModels({ models: JSON.stringify([{ providerId: "openai" }]) }),
    /requires a non-empty "model"/
  );
});

test("comboModels.resolveComboModels — merges --models and repeated --model", async () => {
  const { resolveComboModels } = await import("../../bin/cli/commands/comboModels.mjs");
  const models = resolveComboModels({
    models: "openai/gpt-4o",
    model: ["anthropic/claude-3-opus"],
  });
  assert.deepEqual(models, ["openai/gpt-4o", "anthropic/claude-3-opus"]);
});

// GREEN: end-to-end through runComboCreateCommand — local-db fallback path.
test("combo create (db fallback) — stores the parsed --models, no longer creates an empty combo", async () => {
  await withComboEnv(async () => {
    const { runComboCreateCommand } = await import("../../bin/cli/commands/combo.mjs");
    const { resolveComboModels } = await import("../../bin/cli/commands/comboModels.mjs");

    const models = resolveComboModels({ models: "openai/gpt-4o,anthropic/claude-3-opus" });
    const result = await runComboCreateCommand("models-combo", "priority", { models });
    assert.equal(result, 0);

    const { getComboByName } = await import("../../src/lib/db/combos.ts");
    const combo = await getComboByName("models-combo");
    assert.ok(combo);
    // The repository layer (src/lib/db/repositories/sqliteComboRepository.ts)
    // normalizes plain "provider/model" strings into structured ComboStep
    // objects on write — assert on the normalized shape rather than raw
    // string equality, and above all assert the combo is no longer empty
    // (the actual #10954 regression).
    const storedModels = combo.models as Array<Record<string, unknown>>;
    assert.equal(storedModels.length, 2, "combo must not be created empty");
    assert.equal(storedModels[0].model, "openai/gpt-4o");
    assert.equal(storedModels[0].providerId, "openai");
    assert.equal(storedModels[1].model, "anthropic/claude-3-opus");
    assert.equal(storedModels[1].providerId, "anthropic");
  });
});

// GREEN: end-to-end through runComboCreateCommand — HTTP path, verifies the
// POST /api/combos body actually carries the parsed models.
test("combo create (HTTP) — POST /api/combos body carries the parsed models", async () => {
  const dataDir = createTempDataDir();
  process.env.DATA_DIR = dataDir;
  const capture: { body: CapturedOpts | null } = { body: null };
  globalThis.fetch = makeHealthAndComboFetch(capture);
  const originalLog = console.log;
  console.log = () => {};

  try {
    const { runComboCreateCommand } = await import("../../bin/cli/commands/combo.mjs");
    const { resolveComboModels } = await import("../../bin/cli/commands/comboModels.mjs");

    const models = resolveComboModels({ models: "openai/gpt-4o,anthropic/claude-3-opus" });
    const result = await runComboCreateCommand("http-models-combo", "priority", { models });

    assert.equal(result, 0);
    assert.ok(capture.body, "POST /api/combos should have been called");
    assert.deepEqual(capture.body.models, ["openai/gpt-4o", "anthropic/claude-3-opus"]);
  } finally {
    console.log = originalLog;
    globalThis.fetch = ORIGINAL_FETCH;
    fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
    if (ORIGINAL_DATA_DIR === undefined) delete process.env.DATA_DIR;
    else process.env.DATA_DIR = ORIGINAL_DATA_DIR;
  }
});

// Regression for the follow-up of #11011: with --models available, creating
// an empty combo is no longer a legitimate path on either transport.
test("combo create without any model is refused before reaching a transport", async () => {
  await withComboEnv(async () => {
    const errors: string[] = [];
    const originalError = console.error;
    console.error = (msg?: unknown) => {
      errors.push(String(msg));
    };
    try {
      const mod = await import("../../bin/cli/commands/combo.mjs");
      const rc = await mod.runComboCreateCommand("guard-test");
      assert.equal(rc, 1);
    } finally {
      console.error = originalError;
    }
    assert.ok(
      errors.some((m) => m.includes("--models")),
      `stderr should name --models, got: ${errors.join(" | ")}`
    );
  });
});
