import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, rmSync, writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";

// Remote-mode core: the CLI must resolve BOTH baseUrl and auth from the active
// context (canonical `contexts`/`currentContext` schema, with legacy
// `profiles`/`activeProfile` fallback). Before this work, getBaseUrl read only
// the legacy `profiles` schema and buildHeaders never read the context's
// credential at all — so `omniroute contexts use <remote>` silently failed to
// route auth to the remote server.

let tmpDir: string;
let origDataDir: string | undefined;
let origBaseUrl: string | undefined;
let origApiKey: string | undefined;
let origContext: string | undefined;

function writeConfig(cfg: unknown): void {
  mkdirSync(tmpDir, { recursive: true });
  writeFileSync(join(tmpDir, "config.json"), JSON.stringify(cfg, null, 2));
}

test.before(() => {
  tmpDir = mkdtempSync(join(tmpdir(), "omniroute-remote-test-"));
  origDataDir = process.env.DATA_DIR;
  origBaseUrl = process.env.OMNIROUTE_BASE_URL;
  origApiKey = process.env.OMNIROUTE_API_KEY;
  origContext = process.env.OMNIROUTE_CONTEXT;
  process.env.DATA_DIR = tmpDir;
  delete process.env.OMNIROUTE_BASE_URL;
  delete process.env.OMNIROUTE_API_KEY;
  delete process.env.OMNIROUTE_CONTEXT;
});

test.after(() => {
  if (origDataDir === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = origDataDir;
  if (origBaseUrl === undefined) delete process.env.OMNIROUTE_BASE_URL;
  else process.env.OMNIROUTE_BASE_URL = origBaseUrl;
  if (origApiKey === undefined) delete process.env.OMNIROUTE_API_KEY;
  else process.env.OMNIROUTE_API_KEY = origApiKey;
  if (origContext === undefined) delete process.env.OMNIROUTE_CONTEXT;
  else process.env.OMNIROUTE_CONTEXT = origContext;
  try {
    rmSync(tmpDir, { recursive: true, force: true });
  } catch {}
});

// ── getBaseUrl ────────────────────────────────────────────────────────────────

test("getBaseUrl reads baseUrl from the active context (canonical schema)", async () => {
  writeConfig({
    version: 1,
    currentContext: "vps",
    contexts: {
      default: { baseUrl: "http://localhost:20128", apiKey: null },
      vps: { baseUrl: "https://vps.example.com:20128", accessToken: "oma_live_x", scope: "write" },
    },
  });
  const { getBaseUrl } = await import("../../bin/cli/api.mjs");
  assert.equal(getBaseUrl(), "https://vps.example.com:20128");
});

test("getBaseUrl honors the --context override", async () => {
  writeConfig({
    version: 1,
    currentContext: "default",
    contexts: {
      default: { baseUrl: "http://localhost:20128", apiKey: null },
      staging: { baseUrl: "http://staging:20128", apiKey: null },
    },
  });
  const { getBaseUrl } = await import("../../bin/cli/api.mjs");
  assert.equal(getBaseUrl({ context: "staging" }), "http://staging:20128");
});

test("getBaseUrl is backward-compatible with the legacy profiles schema", async () => {
  writeConfig({
    version: 1,
    activeProfile: "old",
    profiles: { old: { baseUrl: "http://legacy:20128" } },
  });
  const { getBaseUrl } = await import("../../bin/cli/api.mjs");
  assert.equal(getBaseUrl(), "http://legacy:20128");
});

test("getBaseUrl: opts.baseUrl wins over the active context", async () => {
  writeConfig({
    version: 1,
    currentContext: "vps",
    contexts: { vps: { baseUrl: "https://vps.example.com" } },
  });
  const { getBaseUrl } = await import("../../bin/cli/api.mjs");
  assert.equal(getBaseUrl({ baseUrl: "http://override:1234" }), "http://override:1234");
});

// ── buildHeaders (auth resolution) ─────────────────────────────────────────────

test("buildHeaders injects Bearer from the active context accessToken", async () => {
  writeConfig({
    version: 1,
    currentContext: "vps",
    contexts: { vps: { baseUrl: "https://vps.example.com", accessToken: "oma_live_secret" } },
  });
  const { buildHeaders } = await import("../../bin/cli/api.mjs");
  const headers = await buildHeaders({ cliToken: "" });
  assert.equal(headers.get("authorization"), "Bearer oma_live_secret");
});

test("buildHeaders prefers accessToken over apiKey in the same context", async () => {
  writeConfig({
    version: 1,
    currentContext: "vps",
    contexts: {
      vps: { baseUrl: "https://vps.example.com", accessToken: "oma_token", apiKey: "sk-legacy" },
    },
  });
  const { buildHeaders } = await import("../../bin/cli/api.mjs");
  const headers = await buildHeaders({ cliToken: "" });
  assert.equal(headers.get("authorization"), "Bearer oma_token");
});

test("buildHeaders falls back to the context apiKey when no accessToken", async () => {
  writeConfig({
    version: 1,
    currentContext: "vps",
    contexts: { vps: { baseUrl: "https://vps.example.com", apiKey: "sk-ctx" } },
  });
  const { buildHeaders } = await import("../../bin/cli/api.mjs");
  const headers = await buildHeaders({ cliToken: "" });
  assert.equal(headers.get("authorization"), "Bearer sk-ctx");
});

test("buildHeaders: explicit opts.apiKey wins over the context credential", async () => {
  writeConfig({
    version: 1,
    currentContext: "vps",
    contexts: { vps: { baseUrl: "https://vps.example.com", accessToken: "oma_token" } },
  });
  const { buildHeaders } = await import("../../bin/cli/api.mjs");
  const headers = await buildHeaders({ cliToken: "", apiKey: "sk-explicit" });
  assert.equal(headers.get("authorization"), "Bearer sk-explicit");
});

// ── context current command ─────────────────────────────────────────────────────

test("commands/contexts.mjs registers a `current` subcommand", async () => {
  const { registerContexts } = await import("../../bin/cli/commands/contexts.mjs");
  // Minimal fake commander program to capture subcommand registration.
  const sub: string[] = [];
  const fakeCtx: any = {
    command(name: string) {
      sub.push(name.split(" ")[0]);
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
  const fakeProgram: any = {
    command() {
      return fakeCtx;
    },
  };
  registerContexts(fakeProgram);
  assert.ok(sub.includes("current"), `expected a 'current' subcommand, got: ${sub.join(", ")}`);
});
