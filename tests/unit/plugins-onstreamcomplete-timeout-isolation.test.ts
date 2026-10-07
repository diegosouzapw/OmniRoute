// Regression test — a timed-out onStreamComplete delivery must NOT kill the plugin
// process. #11934 wired onStreamComplete (a fire-and-forget, one-way notification that
// fires once per completed stream) through loader.ts::callHook(), whose timeout path was
// designed for rarely-fired blocking/lifecycle hooks: it SIGTERM→SIGKILLs the child with
// no respawn anywhere. So a single slow delivery (e.g. a plugin posting usage to a slow
// remote sink past DEFAULT_HOOK_TIMEOUT) kills the plugin's child process, rejects every
// other in-flight hook call, and leaves the plugin dead-but-shown-active until a manual
// deactivate/activate. After the fix, a notification-hook timeout only DROPS the pending
// call (promise settles, warning logged) and the child keeps serving subsequent hooks.
// Blocking hooks (onRequest etc.) keep the pre-existing kill-on-timeout semantics.
import test from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, rm, writeFile, readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

import { loadPlugin, type LoadedPlugin } from "../../src/lib/plugins/loader.ts";
import type { PluginManifestWithDefaults } from "../../src/lib/plugins/manifest.ts";
import type { PluginContext, PluginOnStreamCompletePayload } from "../../src/lib/plugins/hooks.ts";

// Short injectable timeout so the test doesn't wait out the 10s production default.
const HOOK_TIMEOUT_MS = 300;
// The slow handler sleeps far past the timeout AND past the production default, so the
// test fails for the documented reason (kill) on the unfixed code too, where the
// injected timeout is ignored and the 10s default applies.
const SLOW_HANDLER_MS = 12_000;

function makeManifest(
  name: string,
  hooks: Partial<PluginManifestWithDefaults["hooks"]>
): PluginManifestWithDefaults {
  return {
    name,
    version: "1.0.0",
    license: "MIT",
    main: "index.mjs",
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
      onStreamComplete: false,
      ...hooks,
    },
    skills: [],
    enabledByDefault: false,
    configSchema: {},
  } as PluginManifestWithDefaults;
}

async function waitFor(pred: () => boolean, timeoutMs: number): Promise<void> {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline && !pred()) {
    await new Promise((r) => setTimeout(r, 25));
  }
}

test(
  "onStreamComplete timeout drops the call but keeps the plugin process alive",
  { timeout: 60_000 },
  async (t) => {
    const pluginDir = await mkdtemp(join(tmpdir(), "omniroute-plugin-sc-timeout-"));
    const entryPoint = join(pluginDir, "index.mjs");
    let loaded: LoadedPlugin | undefined;

    t.after(async () => {
      loaded?.cleanup();
      await rm(pluginDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
    });

    // The plugin runs in an isolated child process, so it reports each delivery it
    // receives by writing "<marker>.json" into a directory baked into its source.
    await writeFile(
      entryPoint,
      `
import { writeFileSync } from "node:fs";
import { join } from "node:path";
const OUT_DIR = ${JSON.stringify(pluginDir)};
export async function onStreamComplete(payload) {
  if (payload.sleepMs) {
    await new Promise((r) => setTimeout(r, payload.sleepMs));
  }
  writeFileSync(join(OUT_DIR, payload.marker + ".json"), JSON.stringify(payload));
}
`,
      "utf-8"
    );

    loaded = await loadPlugin(entryPoint, makeManifest("sc-timeout-isolation", {
      onStreamComplete: true,
    }), { hookTimeoutMs: HOOK_TIMEOUT_MS });

    // Capture the loader's warning (logger("PLUGIN_LOADER").warn → console.warn).
    const originalWarn = console.warn;
    let warned = "";
    console.warn = ((...args: unknown[]) => {
      warned += args.map(String).join(" ") + "\n";
      originalWarn(...args);
    }) as typeof console.warn;
    t.after(() => {
      console.warn = originalWarn;
    });

    // 1) One delivery exceeds the hook timeout. The promise must settle (fire-and-forget
    //    semantics — the call is dropped), not wait for the 12s handler.
    const slowStart = Date.now();
    await loaded.plugin.onStreamComplete?.({
      marker: "slow",
      sleepMs: SLOW_HANDLER_MS,
    } as unknown as PluginOnStreamCompletePayload);
    const elapsed = Date.now() - slowStart;

    // Give any (buggy) SIGTERM fired by the timeout path time to actually land, so the
    // next delivery cannot slip in before the child dies and mask the kill.
    await new Promise((r) => setTimeout(r, 750));

    // 2) THE regression: the child must have survived the timed-out notification, so a
    //    subsequent delivery still reaches the plugin. On the unfixed code the timeout
    //    path SIGTERM→SIGKILLs the child (with no respawn), so this file never appears.
    await loaded.plugin.onStreamComplete?.({
      marker: "fast",
    } as unknown as PluginOnStreamCompletePayload);
    const fastFile = join(pluginDir, "fast.json");
    await waitFor(() => existsSync(fastFile), 5_000);
    assert.ok(
      existsSync(fastFile),
      "the plugin child process was killed by a timed-out onStreamComplete notification — " +
        "subsequent deliveries no longer reach the plugin (dead-but-shown-active)"
    );
    const fastPayload = JSON.parse(await readFile(fastFile, "utf-8")) as { marker: string };
    assert.equal(fastPayload.marker, "fast");

    // 3) The timed-out call settled at the configured timeout, not the handler duration —
    //    i.e. the timeout is injectable and the drop is prompt.
    assert.ok(
      elapsed < SLOW_HANDLER_MS - 2_000,
      `timed-out onStreamComplete should settle at ~hookTimeoutMs (${HOOK_TIMEOUT_MS}ms), ` +
        `not wait for the handler; took ${elapsed}ms`
    );

    // 4) The drop is observable: a warning names the plugin and the hook.
    assert.ok(
      warned.includes("sc-timeout-isolation") && warned.includes("onStreamComplete"),
      `expected a warning naming the plugin and hook when a notification delivery is ` +
        `dropped on timeout; captured=${JSON.stringify(warned)}`
    );
  }
);

test(
  "blocking-hook (onRequest) timeout still kills the plugin process (semantics unchanged)",
  { timeout: 30_000 },
  async (t) => {
    const pluginDir = await mkdtemp(join(tmpdir(), "omniroute-plugin-req-timeout-"));
    const entryPoint = join(pluginDir, "index.mjs");
    let loaded: LoadedPlugin | undefined;

    t.after(async () => {
      loaded?.cleanup();
      await rm(pluginDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
    });

    await writeFile(
      entryPoint,
      `
import { writeFileSync } from "node:fs";
import { join } from "node:path";
const OUT_DIR = ${JSON.stringify(pluginDir)};
export async function onRequest(ctx) {
  if (ctx.metadata && ctx.metadata.sleepMs) {
    await new Promise((r) => setTimeout(r, ctx.metadata.sleepMs));
  }
  writeFileSync(join(OUT_DIR, ctx.requestId + ".json"), "{}");
  return {};
}
`,
      "utf-8"
    );

    loaded = await loadPlugin(entryPoint, makeManifest("req-timeout-kill", {
      onRequest: true,
    }), { hookTimeoutMs: HOOK_TIMEOUT_MS });

    // A blocking hook exceeding the timeout: the pre-existing isolation semantics apply —
    // the misbehaving plugin process is killed.
    await loaded.plugin.onRequest?.({
      requestId: "req-slow",
      body: {},
      metadata: { sleepMs: SLOW_HANDLER_MS },
    } as unknown as PluginContext);

    // Let the SIGTERM land before probing.
    await new Promise((r) => setTimeout(r, 750));

    await loaded.plugin.onRequest?.({
      requestId: "req-after-kill",
      body: {},
      metadata: {},
    } as unknown as PluginContext);
    await new Promise((r) => setTimeout(r, 1_200));
    assert.ok(
      !existsSync(join(pluginDir, "req-after-kill.json")),
      "a timed-out BLOCKING hook must still kill the plugin process — the kill-on-timeout " +
        "semantics for onRequest must not be relaxed by the notification-hook fix"
    );
  }
);
