/**
 * Plugin test runner — tests all registered hooks with mock context.
 *
 * @module plugins/testRunner
 */

import { loadPlugin, type LoadedPlugin } from "./loader";
import type { PluginManifestWithDefaults } from "./manifest";
import type { PluginContext } from "./hooks";
import { logger } from "../../../open-sse/utils/logger.ts";

const log = logger("PLUGIN_TEST_RUNNER");

export interface PluginTestResult {
  hook: string;
  passed: boolean;
  durationMs: number;
  error?: string;
  output?: unknown;
}

const MOCK_CONTEXT: PluginContext = {
  requestId: "test-req-001",
  body: { model: "gpt-4", messages: [{ role: "user", content: "test" }] },
  model: "gpt-4",
  provider: "openai",
  metadata: { test: true },
};

/**
 * Test all registered hooks for a plugin.
 */
export async function testPlugin(
  entryPoint: string,
  manifest: PluginManifestWithDefaults
): Promise<PluginTestResult[]> {
  const results: PluginTestResult[] = [];
  let loaded: LoadedPlugin | null = null;

  try {
    loaded = await loadPlugin(entryPoint, manifest);

    const hooksToTest: Array<{ name: string; call: () => Promise<unknown> }> = [];

    if (loaded.plugin.onRequest) {
      hooksToTest.push({ name: "onRequest", call: async () => { await loaded!.plugin.onRequest!(MOCK_CONTEXT); } });
    }
    if (loaded.plugin.onResponse) {
      hooksToTest.push({
        name: "onResponse",
        call: () => loaded!.plugin.onResponse!(MOCK_CONTEXT, { choices: [{ message: { content: "test" } }] }),
      });
    }
    if (loaded.plugin.onError) {
      hooksToTest.push({
        name: "onError",
        call: () => loaded!.plugin.onError!(MOCK_CONTEXT, new Error("test error")),
      });
    }

    for (const hook of hooksToTest) {
      const start = performance.now();
      try {
        const output = await hook.call();
        const durationMs = Math.round(performance.now() - start);
        results.push({ hook: hook.name, passed: true, durationMs, output });
      } catch (err: unknown) {
        const durationMs = Math.round(performance.now() - start);
        results.push({
          hook: hook.name,
          passed: false,
          durationMs,
          error: err instanceof Error ? err.message : String(err),
        });
      }
    }
  } catch (err: unknown) {
    results.push({
      hook: "load",
      passed: false,
      durationMs: 0,
      error: err instanceof Error ? err.message : String(err),
    });
  } finally {
    if (loaded) loaded.cleanup();
  }

  log.info("testRunner.result", {
    pluginName: manifest.name,
    passed: results.filter((r) => r.passed).length,
    failed: results.filter((r) => !r.passed).length,
  });

  return results;
}
