// Regression test for #11825 — the `onStreamComplete` plugin event is emitted
// internally (chatCore.ts → runPluginOnStreamCompleteHook → runOnStreamComplete →
// emitHook) but never DELIVERED to disk-installed plugins, because the plugin-facing
// wiring is missing at three layers:
//   1. src/lib/plugins/manifest.ts   — HooksSchema has no `onStreamComplete` field, so
//      `hooks.onStreamComplete: true` in plugin.json is silently stripped by Zod.
//   2. src/lib/plugins/loader.ts     — loadPlugin() never builds an IPC wrapper for it.
//   3. src/lib/plugins/manager.ts    — activate()'s hardcoded `hookNames` list omits it,
//      so even a wired handler is never registerHook()'d into the registry.
// The pre-existing green tests (tests/unit/chatcore-plugin-onresponse.test.ts) call
// `registerHook("onStreamComplete", ...)` directly — a path real plugins cannot use — so
// they never exercised this delivery gap. This test drives the *real* plugin path:
// install → activate → emit, and asserts a plugin process actually receives the payload.
//
// Secondary gap (#11825): the payload must carry a `requestId` so a consumer can join the
// stream-completion event to the originating request. We assert the plugin sees it.
import { test, describe, beforeEach } from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, writeFileSync, mkdirSync, rmSync, existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";

const { validateManifest } = await import("../../src/lib/plugins/manifest.ts");
const mgr = await import("../../src/lib/plugins/manager.ts");
const db = await import("../../src/lib/db/plugins.ts");
const { getDbInstance } = await import("../../src/lib/db/core.ts");
const { runPluginOnStreamCompleteHook } =
  await import("../../open-sse/handlers/chatCore/pluginOnResponse.ts");

async function waitFor(pred: () => boolean, timeoutMs = 6000): Promise<void> {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline && !pred()) {
    await new Promise((r) => setTimeout(r, 25));
  }
}

// ── Gap 1: manifest schema must preserve the flag ──────────────────────────────

test("#11825 manifest: HooksSchema preserves hooks.onStreamComplete", () => {
  const m = validateManifest({
    name: "sc-manifest",
    version: "1.0.0",
    hooks: { onResponse: true, onStreamComplete: true },
  });
  // On the buggy code Zod strips the unknown key and applyDefaults never sets it, so this
  // is `undefined` instead of `true` — plugin.json can't opt into the event at all.
  assert.equal(
    m.hooks.onStreamComplete,
    true,
    "manifest.hooks.onStreamComplete must survive validation so plugin.json can subscribe"
  );
});

// ── Gaps 2 + 3 + requestId: real end-to-end delivery to a plugin process ────────

describe("#11825 onStreamComplete is delivered to an installed+activated plugin", () => {
  const NAME = "sc-delivery-11825";
  const outFile = join(tmpdir(), `omniroute-onstreamcomplete-11825-${process.pid}.json`);

  beforeEach(() => {
    getDbInstance(); // ensure the plugins table migration has run
    try {
      db.deletePlugin(NAME);
    } catch {}
    try {
      rmSync(outFile, { force: true });
    } catch {}
  });

  test("plugin's onStreamComplete handler fires with usage/timing and a requestId", async (t) => {
    const tmp = mkdtempSync(join(tmpdir(), "sc-11825-"));
    const pluginDir = join(tmp, NAME);
    mkdirSync(pluginDir, { recursive: true });
    writeFileSync(
      join(pluginDir, "plugin.json"),
      JSON.stringify({
        name: NAME,
        version: "1.0.0",
        main: "index.js",
        hooks: { onStreamComplete: true },
      })
    );
    // The plugin runs in an isolated child process, so it reports what it received by
    // writing the payload to a file whose path is baked into its source.
    writeFileSync(
      join(pluginDir, "index.js"),
      `const fs = require("fs");
const OUT = ${JSON.stringify(outFile)};
module.exports = {
  onStreamComplete: async (payload) => { fs.writeFileSync(OUT, JSON.stringify(payload)); },
};
`
    );

    t.after(async () => {
      await mgr.pluginManager.deactivate(NAME).catch(() => {});
      try {
        db.deletePlugin(NAME);
      } catch {}
      rmSync(tmp, { recursive: true, force: true });
      rmSync(outFile, { force: true });
    });

    await mgr.pluginManager.install(pluginDir);
    await mgr.pluginManager.activate(NAME);

    // Sanity: the DB should record the declared hook (also broken on the buggy path).
    const row = db.getPluginByName(NAME);
    assert.ok(row, "plugin should be installed");
    assert.ok(
      (row!.hooks as unknown as string[]).includes("onStreamComplete"),
      `installed plugin should declare onStreamComplete; got ${JSON.stringify(row!.hooks)}`
    );

    // Drive the REAL producer entry point used by chatCore.ts.
    const startTime = Date.now() - 500;
    await runPluginOnStreamCompleteHook({
      status: 200,
      usage: { prompt_tokens: 11, completion_tokens: 22, reasoning_tokens: 3 },
      ttft: 120,
      model: "claude-3-opus",
      provider: "anthropic",
      errorCode: undefined,
      startTime,
      requestId: "trace-11825",
    });

    await waitFor(() => existsSync(outFile));
    assert.ok(
      existsSync(outFile),
      "the plugin's onStreamComplete handler never ran — the event was dropped into an " +
        "empty registry (no manifest/loader/manager wiring reaches disk-installed plugins)"
    );

    const payload = JSON.parse(readFileSync(outFile, "utf-8")) as Record<string, unknown>;
    assert.equal(payload.status, 200);
    assert.equal((payload.usage as Record<string, number>).prompt_tokens, 11);
    assert.equal((payload.usage as Record<string, number>).completion_tokens, 22);
    assert.ok(payload.timing, "timing should be present");
    assert.equal((payload.timing as Record<string, number>).ttft, 120);
    assert.ok((payload.timing as Record<string, number>).latencyMs >= 450);
    assert.equal(payload.model, "claude-3-opus");
    assert.equal(payload.provider, "anthropic");
    // Secondary gap: the event must be correlatable to the originating request.
    assert.equal(
      payload.requestId,
      "trace-11825",
      "onStreamComplete payload must carry requestId so it can be joined to the request"
    );
  });
});
