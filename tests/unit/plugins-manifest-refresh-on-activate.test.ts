// Regression test — activate() must refresh the stored manifest from disk so new
// hook fields reach plugins installed BEFORE the schema learned them.
//
// #11934 added `onStreamComplete` to HooksSchema plus the loader/manager delivery
// wiring, but a plugin activates with the manifest JSON persisted to the DB at
// INSTALL time (insertPlugin({manifest}), re-read in activate() as
// JSON.parse(row.manifest) — src/lib/plugins/manager.ts). Plugins installed before
// that upgrade carry a stored manifest the OLD Zod schema stripped (`hooks` object
// has no `onStreamComplete` key at all), and nothing ever re-reads plugin.json:
// scan() only inserts unknown plugins, upgrade() requires a strictly newer plugin
// version, activate() never re-validates. So loader.ts's `manifestFlag` is falsy,
// no IPC wrapper is built, the hook never registers — while the dashboard still
// shows the plugin active. The #11825 regression test misses this because it
// installs a FRESH plugin, which persists the NEW schema's manifest.
//
// The fix must also be fail-safe: a corrupt/missing/mismatched plugin.json on disk
// falls back to the stored manifest exactly as before — never brick an install.
import { test, describe, beforeEach, after } from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, writeFileSync, mkdirSync, rmSync, existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { randomUUID } from "node:crypto";

const mgr = await import("../../src/lib/plugins/manager.ts");
const db = await import("../../src/lib/db/plugins.ts");
const { getDbInstance, resetDbInstance } = await import("../../src/lib/db/core.ts");
const { runPluginOnStreamCompleteHook } =
  await import("../../open-sse/handlers/chatCore/pluginOnResponse.ts");

// Release the SQLite handle when the file is done — a leaked handle hangs the
// Node test runner (see AGENTS.md → "Database Handles in Tests").
after(() => {
  resetDbInstance();
});

async function waitFor(pred: () => boolean, timeoutMs = 6000): Promise<void> {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline && !pred()) {
    await new Promise((r) => setTimeout(r, 25));
  }
}

/**
 * Exactly what the pre-#11934 code persisted at install time: applyDefaults()
 * output from a schema whose HooksSchema had no `onStreamComplete` field — the
 * flag was stripped by Zod and the old applyDefaults never re-added the key.
 */
function legacyStoredManifest(name: string, hooks: Record<string, boolean>) {
  return {
    name,
    version: "1.0.0",
    license: "MIT",
    main: "index.js",
    source: "local",
    tags: [],
    requires: { permissions: [] },
    hooks: {
      onRequest: false,
      onResponse: false,
      onError: false,
      onInstall: false,
      onActivate: false,
      onDeactivate: false,
      onUninstall: false,
      // deliberately NO onStreamComplete key
      ...hooks,
    },
    skills: [],
    enabledByDefault: false,
    configSchema: {},
  };
}

/** Insert the DB row as a pre-upgrade install would have left it. */
function insertLegacyRow(name: string, pluginDir: string, hooks: Record<string, boolean>) {
  db.insertPlugin({
    id: randomUUID(),
    name,
    version: "1.0.0",
    main: "index.js",
    manifest: legacyStoredManifest(name, hooks),
    hooks: Object.keys(hooks).filter((k) => hooks[k]),
    permissions: [],
    pluginDir,
    enabled: false,
  });
}

function makePluginDir(name: string): { tmp: string; pluginDir: string } {
  const tmp = mkdtempSync(join(tmpdir(), "manifest-refresh-"));
  const pluginDir = join(tmp, name);
  mkdirSync(pluginDir, { recursive: true });
  return { tmp, pluginDir };
}

describe("activate() refreshes the stored manifest from disk (pre-#11934 installs)", () => {
  beforeEach(() => {
    getDbInstance(); // ensure the plugins table migration has run
  });

  test("a hook field the old schema stripped registers after activate()", async (t) => {
    const NAME = "sc-manifest-refresh";
    const outFile = join(tmpdir(), `omniroute-manifest-refresh-${process.pid}.json`);
    rmSync(outFile, { force: true });
    const { tmp, pluginDir } = makePluginDir(NAME);

    // On DISK the plugin declares the new hook (its author always shipped it)…
    writeFileSync(
      join(pluginDir, "plugin.json"),
      JSON.stringify({
        name: NAME,
        version: "1.0.0",
        main: "index.js",
        hooks: { onStreamComplete: true },
      })
    );
    writeFileSync(
      join(pluginDir, "index.js"),
      `const fs = require("fs");
const OUT = ${JSON.stringify(outFile)};
module.exports = {
  onStreamComplete: async (payload) => { fs.writeFileSync(OUT, JSON.stringify(payload)); },
};
`
    );

    // …but the DB row was persisted by the OLD schema: the flag is gone.
    try {
      db.deletePlugin(NAME);
    } catch {}
    insertLegacyRow(NAME, pluginDir, {});

    t.after(async () => {
      await mgr.pluginManager.deactivate(NAME).catch(() => {});
      try {
        db.deletePlugin(NAME);
      } catch {}
      rmSync(tmp, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
      rmSync(outFile, { force: true });
    });

    await mgr.pluginManager.activate(NAME);

    // Drive the REAL producer entry point used by chatCore.ts.
    await runPluginOnStreamCompleteHook({
      status: 200,
      usage: { prompt_tokens: 7, completion_tokens: 13 },
      ttft: 80,
      model: "claude-3-opus",
      provider: "anthropic",
      errorCode: undefined,
      startTime: Date.now() - 250,
      requestId: "trace-manifest-refresh",
    });

    await waitFor(() => existsSync(outFile));
    assert.ok(
      existsSync(outFile),
      "onStreamComplete never reached the plugin — activate() used the stale DB manifest " +
        "(hooks.onStreamComplete stripped at install time) instead of re-reading plugin.json"
    );
    const payload = JSON.parse(readFileSync(outFile, "utf-8")) as Record<string, unknown>;
    assert.equal(payload.requestId, "trace-manifest-refresh");

    // The refreshed manifest must also be persisted so the row stays coherent.
    const row = db.getPluginByName(NAME);
    assert.ok(row, "plugin row should exist");
    const storedManifest = JSON.parse(row!.manifest) as {
      hooks: Record<string, boolean | undefined>;
    };
    assert.equal(
      storedManifest.hooks.onStreamComplete,
      true,
      "stored manifest should be refreshed from disk on activate()"
    );
    assert.ok(
      (JSON.parse(row!.hooks) as string[]).includes("onStreamComplete"),
      "stored hooks list should be refreshed alongside the manifest"
    );
  });

  test("a corrupt plugin.json on disk falls back to the stored manifest (never bricks)", async (t) => {
    const NAME = "sc-manifest-fallback";
    const { tmp, pluginDir } = makePluginDir(NAME);

    writeFileSync(join(pluginDir, "plugin.json"), "{ this is not JSON");
    writeFileSync(join(pluginDir, "index.js"), `module.exports = { onRequest: async () => ({}) };`);

    try {
      db.deletePlugin(NAME);
    } catch {}
    insertLegacyRow(NAME, pluginDir, { onRequest: true });
    const before = db.getPluginByName(NAME)!.manifest;

    t.after(async () => {
      await mgr.pluginManager.deactivate(NAME).catch(() => {});
      try {
        db.deletePlugin(NAME);
      } catch {}
      rmSync(tmp, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
    });

    await mgr.pluginManager.activate(NAME);

    assert.ok(
      mgr.pluginManager.getLoaded(NAME),
      "activation must still succeed on the stored manifest when plugin.json is unreadable"
    );
    assert.equal(
      db.getPluginByName(NAME)!.manifest,
      before,
      "a failed disk read must not overwrite the stored manifest"
    );
  });

  test("a disk manifest whose name mismatches the row is ignored", async (t) => {
    const NAME = "sc-manifest-name-guard";
    const { tmp, pluginDir } = makePluginDir(NAME);

    // plugin.json names a DIFFERENT plugin — refreshing from it would corrupt the row.
    writeFileSync(
      join(pluginDir, "plugin.json"),
      JSON.stringify({
        name: "some-other-plugin",
        version: "9.9.9",
        main: "index.js",
        hooks: { onStreamComplete: true },
      })
    );
    writeFileSync(join(pluginDir, "index.js"), `module.exports = { onRequest: async () => ({}) };`);

    try {
      db.deletePlugin(NAME);
    } catch {}
    insertLegacyRow(NAME, pluginDir, { onRequest: true });
    const before = db.getPluginByName(NAME)!.manifest;

    t.after(async () => {
      await mgr.pluginManager.deactivate(NAME).catch(() => {});
      try {
        db.deletePlugin(NAME);
      } catch {}
      rmSync(tmp, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
    });

    await mgr.pluginManager.activate(NAME);

    assert.ok(
      mgr.pluginManager.getLoaded(NAME),
      "activation should proceed on the stored manifest"
    );
    assert.equal(
      db.getPluginByName(NAME)!.manifest,
      before,
      "a name-mismatched disk manifest must never replace the stored one"
    );
  });
});
