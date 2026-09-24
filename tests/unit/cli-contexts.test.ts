import test from "node:test";
import assert from "node:assert/strict";
import {
  lstatSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  statSync,
  symlinkSync,
  writeFileSync,
} from "node:fs";
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
    rmSync(tmpDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
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

test("saveContexts replaces a hostile symlink atomically with a private regular file", async () => {
  const { configPath, saveContexts } = await import("../../bin/cli/contexts.mjs");
  const path = configPath();
  const victim = join(tmpDir, "victim.json");
  rmSync(path, { force: true });
  writeFileSync(victim, "do-not-overwrite");
  symlinkSync(victim, path);

  saveContexts({
    version: 1,
    currentContext: "default",
    contexts: { default: { baseUrl: "http://localhost:20128", apiKey: null } },
  });

  assert.equal(readFileSync(victim, "utf8"), "do-not-overwrite");
  assert.equal(lstatSync(path).isSymbolicLink(), false);
  assert.equal(statSync(path).mode & 0o777, 0o600);
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

test("saveContextsSecure guarda tokens no keychain e resolve pela referência", async () => {
  const {
    loadContexts,
    saveContextsSecure,
    resolveActiveContext,
    setContextKeychainBackendForTests,
  } = await import("../../bin/cli/contexts.mjs");
  const entries = new Map<string, string>();
  const fakeKeychain = {
    async getPassword(_service: string, account: string) {
      return entries.get(account) || null;
    },
    async setPassword(_service: string, account: string, value: string) {
      entries.set(account, value);
    },
    async deletePassword(_service: string, account: string) {
      entries.delete(account);
      return true;
    },
  };
  await setContextKeychainBackendForTests(fakeKeychain);
  const cfg = loadContexts();
  cfg.contexts.secure = {
    baseUrl: "https://secure.example.com",
    accessToken: "oma_test_secret",
    scope: "write",
  };
  await saveContextsSecure(cfg);

  const persisted = JSON.parse(readFileSync(join(tmpDir, "config.json"), "utf8"));
  assert.equal(persisted.contexts.secure.accessToken, undefined);
  assert.match(persisted.contexts.secure.credentialRef, /^omniroute-cli:context:/);
  assert.equal(resolveActiveContext("secure").accessToken, "oma_test_secret");
  assert.ok(entries.size >= 1);

  await setContextKeychainBackendForTests(null);
});

test("contexts.mjs (commands) pode ser importado sem erro", async () => {
  const mod = await import("../../bin/cli/commands/contexts.mjs");
  assert.equal(typeof mod.registerContexts, "function");
});

test("context export redaction covers canonical and legacy profile schemas", async () => {
  const { redactContextSecrets } = await import("../../bin/cli/commands/contexts.mjs");
  const redacted = redactContextSecrets({
    contexts: { remote: { accessToken: "oma-secret", apiKey: "sk-secret" } },
    profiles: { legacy: { accessToken: "legacy-secret", apiKey: "legacy-key" } },
  });
  assert.deepEqual(redacted.contexts.remote, { apiKey: null });
  assert.deepEqual(redacted.profiles.legacy, { apiKey: null });
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

test("context export --no-secrets overrides explicit inclusion through the real command", async () => {
  const { saveContexts } = await import("../../bin/cli/contexts.mjs");
  const { createProgram } = await import("../../bin/cli/program.mjs");
  saveContexts({
    version: 1,
    currentContext: "remote",
    contexts: {
      remote: {
        baseUrl: "https://remote.example.com",
        accessToken: "oma-command-secret",
        apiKey: "sk-command-secret",
      },
    },
  });
  const chunks: string[] = [];
  const originalWrite = process.stdout.write;
  process.stdout.write = ((chunk: string | Uint8Array) => {
    chunks.push(String(chunk));
    return true;
  }) as typeof process.stdout.write;

  try {
    await createProgram().parseAsync([
      "node",
      "omniroute",
      "context",
      "export",
      "--no-secrets",
      "--include-secrets",
    ]);
  } finally {
    process.stdout.write = originalWrite;
  }

  const exported = chunks.join("");
  assert.ok(!exported.includes("oma-command-secret"));
  assert.ok(!exported.includes("sk-command-secret"));
  assert.equal(JSON.parse(exported).contexts.remote.apiKey, null);
});

test("context export --include-secrets resolves keychain-backed credentials", async () => {
  const { loadContexts, saveContextsSecure, setContextKeychainBackendForTests } =
    await import("../../bin/cli/contexts.mjs");
  const { createProgram } = await import("../../bin/cli/program.mjs");
  const entries = new Map<string, string>();
  const fakeKeychain = {
    async getPassword(_service: string, account: string) {
      return entries.get(account) || null;
    },
    async setPassword(_service: string, account: string, value: string) {
      entries.set(account, value);
    },
    async deletePassword(_service: string, account: string) {
      entries.delete(account);
      return true;
    },
  };
  await setContextKeychainBackendForTests(fakeKeychain);
  const cfg = loadContexts();
  cfg.contexts.keychainExport = {
    baseUrl: "https://keychain.example.com",
    accessToken: "oma-keychain-export",
    apiKey: "sk-keychain-export",
  };
  await saveContextsSecure(cfg);

  const chunks: string[] = [];
  const originalWrite = process.stdout.write;
  process.stdout.write = ((chunk: string | Uint8Array) => {
    chunks.push(String(chunk));
    return true;
  }) as typeof process.stdout.write;

  try {
    await createProgram().parseAsync([
      "node",
      "omniroute",
      "context",
      "export",
      "--include-secrets",
    ]);
  } finally {
    process.stdout.write = originalWrite;
    await setContextKeychainBackendForTests(null);
  }

  const exported = JSON.parse(chunks.join(""));
  assert.equal(exported.contexts.keychainExport.accessToken, "oma-keychain-export");
  assert.equal(exported.contexts.keychainExport.apiKey, "sk-keychain-export");
});

test("secret-bearing context export fails closed when a keychain reference is unavailable", async () => {
  const { loadContextsForExport, saveContexts, setContextKeychainBackendForTests } =
    await import("../../bin/cli/contexts.mjs");
  await setContextKeychainBackendForTests(null);
  saveContexts({
    version: 1,
    currentContext: "missingKeychain",
    contexts: {
      missingKeychain: {
        baseUrl: "https://keychain.example.com",
        credentialRef: "omniroute-cli:context:missingKeychain",
      },
    },
  });

  await assert.rejects(
    loadContextsForExport({ includeSecrets: true }),
    /Cannot include keychain credentials for context\(s\): missingKeychain/
  );
});

test("context export defaults to a redacted atomic private output file", async () => {
  const { saveContexts } = await import("../../bin/cli/contexts.mjs");
  const { createProgram } = await import("../../bin/cli/program.mjs");
  saveContexts({
    version: 1,
    currentContext: "remote",
    contexts: {
      remote: {
        baseUrl: "https://remote.example.com",
        accessToken: "oma-file-secret",
        apiKey: "sk-file-secret",
      },
    },
  });
  const victim = join(tmpDir, "export-victim.json");
  const output = join(tmpDir, "contexts-export.json");
  rmSync(output, { force: true });
  writeFileSync(victim, "do-not-overwrite");
  symlinkSync(victim, output);
  const stdout: string[] = [];
  const originalWrite = process.stdout.write;
  process.stdout.write = ((chunk: string | Uint8Array) => {
    stdout.push(String(chunk));
    return true;
  }) as typeof process.stdout.write;

  try {
    await createProgram().parseAsync(["node", "omniroute", "context", "export", "--out", output]);
  } finally {
    process.stdout.write = originalWrite;
  }

  assert.equal(readFileSync(victim, "utf8"), "do-not-overwrite");
  assert.equal(lstatSync(output).isSymbolicLink(), false);
  assert.equal(statSync(output).mode & 0o777, 0o600);
  const exported = readFileSync(output, "utf8");
  assert.ok(!exported.includes("oma-file-secret"));
  assert.ok(!exported.includes("sk-file-secret"));
  assert.match(stdout.join(""), /Exported to/);
});
