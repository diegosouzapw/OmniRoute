// #14363: setup-claude (and the profile auto-sync that shares
// syncClaudeProfilesFromModels) wrote one profile per catalog model, including
// models of `isLocalCli` providers (zcode, auggie, ...) whose binary is not on
// the host, so the profiles failed on first use with `spawn zcode ENOENT`.
import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import {
  buildLocalCliPrefixMap,
  formatUnavailableSummary,
  syncClaudeProfilesFromModels,
} from "../../../bin/cli/commands/setup-claude.mjs";
import { loadAvailableProviders } from "../../../bin/cli/provider-catalog.mjs";
import {
  detectLocalCliProvider,
  findExecutable,
} from "../../../bin/cli/utils/localCliAvailability.mjs";

// Same stdout hygiene as setup-claude.test.ts (#5959).
const _console = { log: console.log, info: console.info, warn: console.warn };
before(() => {
  console.log = () => {};
  console.info = () => {};
  console.warn = () => {};
});
after(() => {
  console.log = _console.log;
  console.info = _console.info;
  console.warn = _console.warn;
});

const text = (id: string) => ({ id, output_modalities: ["text"] });
const CATALOG = [text("zc/x"), text("aug/x"), text("glm/glm-5.2")];
const noBinaries = (providerId: string) => ({
  available: false,
  reason: `binary not found (${providerId})`,
});

async function withClaudeHome(fn: (claudeHome: string) => Promise<void>) {
  const claudeHome = await fs.mkdtemp(path.join(os.tmpdir(), "omniroute-claude-gate-"));
  try {
    await fn(claudeHome);
  } finally {
    await fs.rm(claudeHome, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  }
}

test("CLI provider catalog carries isLocalCli for the local-CLI providers", () => {
  const prefixes = buildLocalCliPrefixMap(loadAvailableProviders());
  assert.equal(prefixes.get("zc"), "zcode");
  assert.equal(prefixes.get("aug"), "auggie");
  assert.equal(prefixes.get("dva"), "devin-cli-agentic");
  assert.equal(prefixes.get("cxa"), "codex-app-server");
  assert.equal(prefixes.has("glm"), false);
});

test("no local binaries: only the glm profile is written, skips are reported", async () => {
  await withClaudeHome(async (claudeHome) => {
    const result = await syncClaudeProfilesFromModels(CATALOG, {
      claudeHome,
      baseUrl: "http://localhost:20128",
      detectLocalProvider: noBinaries,
    });
    assert.deepEqual(
      result.profiles.map((p) => p.name),
      ["glm52"]
    );
    assert.equal(result.written, 1);
    assert.equal(result.skipped, 2);
    assert.deepEqual(
      result.unavailable.map((u) => [u.provider, u.models]),
      [
        ["zcode", ["zc/x"]],
        ["auggie", ["aug/x"]],
      ]
    );
    assert.match(formatUnavailableSummary(result.unavailable), /zcode: binary not found/);
    const dirs = await fs.readdir(path.join(claudeHome, "profiles"));
    assert.deepEqual(dirs, ["glm52"]);
  });
});

test("includeLocal writes all three profiles and never probes the host", async () => {
  await withClaudeHome(async (claudeHome) => {
    const result = await syncClaudeProfilesFromModels(CATALOG, {
      claudeHome,
      baseUrl: "http://localhost:20128",
      includeLocal: true,
      detectLocalProvider: () => {
        throw new Error("detector must not run with includeLocal");
      },
    });
    assert.equal(result.written, 3);
    assert.deepEqual(result.unavailable, []);
  });
});

test("a detected local provider keeps its profile; the probe runs once per provider", async () => {
  await withClaudeHome(async (claudeHome) => {
    const calls: string[] = [];
    const result = await syncClaudeProfilesFromModels([text("zc/x"), text("zc/y"), text("aug/x")], {
      claudeHome,
      baseUrl: "http://localhost:20128",
      detectLocalProvider: (id: string) => {
        calls.push(id);
        return id === "zcode" ? { available: true } : noBinaries(id);
      },
    });
    assert.deepEqual(
      result.profiles.map((p) => p.model),
      ["zc/x", "zc/y"]
    );
    assert.deepEqual(calls, ["zcode", "auggie"]);
  });
});

test("default detector: zcode/auggie absent with an empty PATH, present when on PATH", async () => {
  const home = await fs.mkdtemp(path.join(os.tmpdir(), "omniroute-gate-home-"));
  const binDir = await fs.mkdtemp(path.join(os.tmpdir(), "omniroute-gate-bin-"));
  try {
    const platform = process.platform;
    const empty = { env: { PATH: "" }, homedir: home, platform };
    assert.equal(detectLocalCliProvider("zcode", empty).available, false);
    assert.equal(detectLocalCliProvider("auggie", empty).available, false);
    // No host check exists yet for these two: fail closed.
    assert.equal(detectLocalCliProvider("devin-cli-agentic", empty).available, false);
    assert.equal(detectLocalCliProvider("codex-app-server", empty).available, false);

    const ext = platform === "win32" ? ".cmd" : "";
    await fs.writeFile(path.join(binDir, `zcode${ext}`), "");
    const withBin = {
      env: { PATH: binDir, PATHEXT: ".CMD;.EXE" },
      homedir: home,
      platform,
    };
    assert.equal(detectLocalCliProvider("zcode", withBin).available, true);
    assert.equal(detectLocalCliProvider("auggie", withBin).available, false);
    assert.ok(findExecutable("zcode", withBin));
  } finally {
    await fs.rm(home, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
    await fs.rm(binDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  }
});
