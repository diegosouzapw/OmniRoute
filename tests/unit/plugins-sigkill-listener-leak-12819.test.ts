// Regression test for #12819 — loadPlugin() leaked one "exit" listener per hook timeout.
//
// Root cause: on the SIGTERM→SIGKILL escalation path the loader attached a fresh
// `child.once("exit", () => clearTimeout(killTimer))`. `once` only detaches when exit
// actually FIRES, so a plugin that ignores SIGTERM leaves the listener (and its killTimer
// closure) attached on every hook timeout. Node then prints MaxListenersExceededWarning
// once 11 accumulate.
//
// The plugin below traps SIGTERM and keeps running, which is exactly the condition the
// bug needs. We drive several hook timeouts and assert the listener count stays bounded.
import { test, describe, after } from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, writeFileSync, rmSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";

const { loadPlugin } = await import("../../src/lib/plugins/loader.ts");

const dirs: string[] = [];
after(() => {
  for (const d of dirs) rmSync(d, { recursive: true, force: true });
});

/** A plugin that ignores SIGTERM and never answers a hook, forcing the escalation path. */
function writeStubbornPlugin(): string {
  const dir = mkdtempSync(join(tmpdir(), "omniroute-plugin-12819-"));
  dirs.push(dir);
  const entry = join(dir, "index.mjs");
  writeFileSync(
    entry,
    [
      // Trap SIGTERM so the loader has to escalate to SIGKILL.
      'process.on("SIGTERM", () => {});',
      "export default {",
      "  // Never resolves → every call hits the hook timeout.",
      "  onRequest: () => new Promise(() => {}),",
      "};",
      "",
    ].join("\n")
  );
  return entry;
}

describe("plugin loader SIGKILL escalation (#12819)", () => {
  test("does not accumulate an exit listener per hook timeout", async () => {
    const entryPoint = writeStubbornPlugin();
    const loaded = await loadPlugin(
      entryPoint,
      {
        name: "sigkill-listener-leak",
        version: "1.0.0",
        license: "MIT",
        main: "index.mjs",
        source: "local",
        tags: [],
        requires: { permissions: [] },
        hooks: { onRequest: true, onResponse: false, onError: false },
        skills: [],
        enabledByDefault: false,
        configSchema: {},
      } as never,
      { hookTimeoutMs: 120 }
    );

    const onRequest = (
      loaded.plugin as unknown as {
        onRequest?: (ctx: unknown) => Promise<unknown>;
      }
    ).onRequest;
    assert.ok(onRequest, "onRequest hook should be registered");

    // `child` is private to the loader, so observe the leak the way a user does: Node
    // itself emits MaxListenersExceededWarning once an emitter passes 10 listeners.
    const warnings: string[] = [];
    const onWarning = (w: Error) => {
      if (w.name === "MaxListenersExceededWarning") warnings.push(w.message);
    };
    process.on("warning", onWarning);

    try {
      // 12 timeouts: comfortably past Node's default limit of 10, so the pre-fix code
      // trips the warning while the fixed code stays flat.
      for (let i = 0; i < 12; i++) {
        await onRequest({ body: {} }).catch(() => undefined);
      }
      // Warnings are delivered on the next tick; let them land before asserting.
      await new Promise((r) => setTimeout(r, 50));
    } finally {
      process.removeListener("warning", onWarning);
    }

    assert.deepEqual(
      warnings,
      [],
      `hook timeouts must not accumulate exit listeners (#12819): ${warnings[0] ?? ""}`
    );

    loaded.cleanup?.();
  });
});
