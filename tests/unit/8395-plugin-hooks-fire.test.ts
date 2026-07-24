// Regression test for #8395 — "registered+active plugin hooks never fire during
// proxying". The IPC dispatch itself works (manager.ts registers loader.ts's real
// callHook-backed callables and emitHookBlocking does invoke them), but
// loader.ts::loadPlugin() spawns the plugin host with
// `stdio: ["ignore", "ignore", "ignore", "ipc"]` — stdout/stderr are discarded at the
// OS level, so a plugin following the SDK's own documented console.log pattern
// produces zero observable output. This test proves the hook body DOES execute and
// its return value DOES come back (disproving the "hooks never fire" framing), while
// pinning the real, narrower bug: the plugin's own stdout/stderr must be observable
// on the parent side after a hook call.
import test from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, rm, writeFile, readFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

import { loadPlugin, type LoadedPlugin } from "../../src/lib/plugins/loader.ts";

test(
  "loadPlugin forwards the plugin child process's stdout to an observable channel",
  { timeout: 10_000 },
  async (t) => {
    const pluginDir = await mkdtemp(join(tmpdir(), "omniroute-plugin-8395-"));
    const entryPoint = join(pluginDir, "index.mjs");
    let loaded: LoadedPlugin | undefined;

    t.after(async () => {
      loaded?.cleanup();
      await rm(pluginDir, { recursive: true, force: true });
    });

    await writeFile(
      entryPoint,
      `
export async function onRequest(ctx) {
  console.log("PLUGIN_FIRED_MARKER_8395", ctx.requestId);
  return {
    metadata: { pluginSawRequestId: ctx.requestId },
  };
}
`,
      "utf-8"
    );

    loaded = await loadPlugin(entryPoint, {
      name: "stdout-forward-test",
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
    });

    // Capture everything written to the parent process's stdout while the hook runs.
    const originalWrite = process.stdout.write.bind(process.stdout);
    let captured = "";
    process.stdout.write = ((chunk: unknown, ...rest: unknown[]) => {
      captured += typeof chunk === "string" ? chunk : String(chunk);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return (originalWrite as any)(chunk, ...rest);
    }) as typeof process.stdout.write;

    let result: unknown;
    try {
      result = await loaded.plugin.onRequest?.({
        requestId: "req-8395-marker",
        body: { model: "gpt-4" },
        model: "gpt-4",
        metadata: {},
      });

      // Give the async stdout "data" event a tick to arrive after the IPC "result"
      // message (they race over two independent channels of the same child process).
      await new Promise((resolve) => setTimeout(resolve, 300));
    } finally {
      process.stdout.write = originalWrite;
    }

    // 1) The IPC round trip itself works: the hook body ran and its return value
    //    came back correctly. This disproves the "hook dispatch is broken" theory.
    assert.deepEqual(result, {
      metadata: { pluginSawRequestId: "req-8395-marker" },
    });

    // 2) The actual #8395 symptom: the plugin's own console.log output must be
    //    observable on the parent side (forwarded from the child's stdout), not
    //    silently discarded by `stdio: ["ignore", "ignore", "ignore", "ipc"]`.
    assert.ok(
      captured.includes("PLUGIN_FIRED_MARKER_8395") && captured.includes("req-8395-marker"),
      `expected the plugin's own stdout output to be forwarded/logged somewhere ` +
        `observable on the parent side; captured=${JSON.stringify(captured)}`
    );
  }
);

test(
  "loadPlugin no longer spawns the plugin host with stdout/stderr fully ignored",
  async () => {
    const source = await readFile(
      join(import.meta.dirname, "../../src/lib/plugins/loader.ts"),
      "utf-8"
    );
    // The original bug: stdio: ["ignore", "ignore", "ignore", "ipc"] discards
    // stdout (fd 1) and stderr (fd 2) at the OS level unconditionally.
    assert.doesNotMatch(
      source,
      /stdio:\s*\[\s*["']ignore["']\s*,\s*["']ignore["']\s*,\s*["']ignore["']\s*,\s*["']ipc["']\s*\]/,
      "loader.ts must not spawn the plugin host with stdout+stderr both set to " +
        "'ignore' — that silently discards all plugin console.log/console.error output"
    );
  }
);

// Secondary #8395 finding: runPluginOnResponseHook was only wired into chatCore.ts's
// STREAMING success path — the non-streaming (stream:false) JSON-return branch
// returned without ever calling it, so onResponse never fired for stream:false
// requests at all. chatCore.ts is a very large, heavily-mocked-provider-dependent
// handler (4800+ lines) — a full handleChatCore() integration harness for this one
// call site would dwarf the fix. Instead, structurally pin that both success
// branches call the hook exactly once, complementing the existing behavioral
// contract test for runPluginOnResponseHook itself
// (tests/unit/chatcore-plugin-onresponse.test.ts).
test("chatCore.ts calls runPluginOnResponseHook from both the non-streaming and streaming success paths", async () => {
  const source = await readFile(
    join(import.meta.dirname, "../../open-sse/handlers/chatCore.ts"),
    "utf-8"
  );

  const nonStreamingReturnIndex = source.indexOf("buildNonStreamingJsonResponse(translatedResponse");
  const hookCallIndex = source.indexOf(
    "await runPluginOnResponseHook({ requestId: traceId, body, model, provider, apiKeyInfo });"
  );
  const secondHookCallIndex = source.indexOf(
    "await runPluginOnResponseHook({ requestId: traceId, body, model, provider, apiKeyInfo });",
    hookCallIndex + 1
  );

  assert.notEqual(hookCallIndex, -1, "expected at least one runPluginOnResponseHook call site");
  assert.notEqual(
    secondHookCallIndex,
    -1,
    "expected TWO runPluginOnResponseHook call sites — one per success branch " +
      "(non-streaming JSON return and streaming SSE return)"
  );
  assert.ok(
    hookCallIndex < nonStreamingReturnIndex,
    "the non-streaming branch must call runPluginOnResponseHook BEFORE returning " +
      "buildNonStreamingJsonResponse(...), not skip it"
  );
});
