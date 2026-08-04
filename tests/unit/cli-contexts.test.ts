import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, rmSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";

let tmpDir: string;
let origDataDir: string | undefined;

test.before(() => {
  tmpDir = mkdtempSync(join(tmpdir(), "omniroute-ctx-test-"));
  origDataDir = process.env.DATA_DIR;
  process.env.DATA_DIR = tmpDir;
});

test.after(() => {
  if (origDataDir === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = origDataDir;
  try {
    rmSync(tmpDir, { recursive: true, force: true });
  } catch {}
});

test("contexts.mjs pode ser importado sem erro", async () => {
  const mod = await import("../../bin/cli/contexts.mjs");
  assert.equal(typeof mod.loadContexts, "function");
  assert.equal(typeof mod.saveContexts, "function");
  assert.equal(typeof mod.resolveActiveContext, "function");
  assert.equal(typeof mod.configPath, "function");
});

test("loadContexts retorna config padrão quando arquivo não existe", async () => {
  const { loadContexts } = await import("../../bin/cli/contexts.mjs");
  const cfg = loadContexts();
  assert.ok(cfg.contexts);
  assert.ok(cfg.contexts.default);
  assert.equal(typeof cfg.contexts.default.baseUrl, "string");
  assert.equal(cfg.currentContext, "default");
});

test("saveContexts persiste e loadContexts relê", async () => {
  const { loadContexts, saveContexts } = await import("../../bin/cli/contexts.mjs");
  const cfg = loadContexts();
  cfg.contexts.test = { baseUrl: "http://test:9999", apiKey: null };
  cfg.currentContext = "test";
  saveContexts(cfg);
  const cfg2 = loadContexts();
  assert.equal(cfg2.currentContext, "test");
  assert.equal(cfg2.contexts.test?.baseUrl, "http://test:9999");
});

test("resolveActiveContext retorna contexto ativo", async () => {
  const { resolveActiveContext, loadContexts, saveContexts } =
    await import("../../bin/cli/contexts.mjs");
  const cfg = loadContexts();
  cfg.contexts.prod = { baseUrl: "https://prod.example.com", apiKey: "sk-prod" };
  cfg.currentContext = "prod";
  saveContexts(cfg);
  const ctx = resolveActiveContext(undefined);
  assert.equal(ctx.baseUrl, "https://prod.example.com");
});

test("resolveActiveContext aceita override pontual", async () => {
  const { resolveActiveContext, loadContexts, saveContexts } =
    await import("../../bin/cli/contexts.mjs");
  const cfg = loadContexts();
  cfg.contexts.staging = { baseUrl: "http://staging:20128", apiKey: null };
  saveContexts(cfg);
  const ctx = resolveActiveContext("staging");
  assert.equal(ctx.baseUrl, "http://staging:20128");
});

test("contexts.mjs (commands) pode ser importado sem erro", async () => {
  const mod = await import("../../bin/cli/commands/contexts.mjs");
  assert.equal(typeof mod.registerContexts, "function");
});

test("confirm() declines cleanly on non-interactive stdin (no hung await)", async () => {
  // Regression: `contexts remove` without --yes used to prompt even when stdin
  // could not answer (pipe/CI/EOF), leaving the readline question pending and
  // triggering Node's "unsettled top-level await" warning. With a non-TTY stdin
  // confirm() must resolve to false immediately (decline) without touching
  // readline — `--yes` remains the way to proceed non-interactively.
  const { confirm } = await import("../../bin/cli/commands/contexts.mjs");
  const desc = Object.getOwnPropertyDescriptor(process.stdin, "isTTY");
  Object.defineProperty(process.stdin, "isTTY", { value: false, configurable: true });
  try {
    const result = await confirm("Remove context 'x'?");
    assert.equal(result, false);
  } finally {
    if (desc) Object.defineProperty(process.stdin, "isTTY", desc);
    else delete (process.stdin as { isTTY?: boolean }).isTTY;
  }
});

test("registerContexts registers the singular `context` alias", async () => {
  // The connect output and older docs say `omniroute context current` (singular);
  // the command is `contexts`. An alias keeps the singular muscle-memory working.
  const { registerContexts } = await import("../../bin/cli/commands/contexts.mjs");
  let aliasName: string | undefined;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const fakeCtx: any = {
    command() {
      return this;
    },
    alias(a: string) {
      aliasName = a;
      return this;
    },
    description() {
      return this;
    },
    requiredOption() {
      return this;
    },
    option() {
      return this;
    },
    action() {
      return this;
    },
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const fakeProgram: any = {
    command() {
      return fakeCtx;
    },
  };
  registerContexts(fakeProgram);
  assert.equal(aliasName, "context");
});
