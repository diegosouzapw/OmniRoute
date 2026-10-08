// Regression guard for audit #15159 M-05: three MCP plugin tools returned the raw
// caught error text to the client.
//
// open-sse/mcp-server/tools/pluginTools.ts catches around pluginManager calls and
// returned `{ success: false, error: msg }` with `msg = err.message` — no
// sanitizing helper involved, so an absolute filesystem path (and anything else
// the thrown error carried) reached the MCP client verbatim.
//
// The G-11 gate change in this same PR is what surfaced these three sites: the
// newly added MCP tool-result sink flags `error:` fields fed from a tainted
// alias. plugin_activate is exercised end-to-end below because
// pluginManager.activate() throws `Plugin directory '<abs path>' does not exist`
// — a real path leak, and one sanitizeErrorMessage provably redacts to `<path>`.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-mcp-plugin-m05-"));
process.env.DATA_DIR = TEST_DATA_DIR;
// The plugin manager resolves its install root from OMNIROUTE_PLUGINS_DIR and falls
// back to ~/.omniroute/plugins — NOT from DATA_DIR (see getDefaultPluginDir() in
// src/lib/plugins/scanner.ts). Without this the test installs into the developer's
// real plugin directory. Must be set before manager.ts is imported, because the
// PluginManager constructor captures the path.
const TEST_PLUGINS_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-plugin-root-"));
process.env.OMNIROUTE_PLUGINS_DIR = TEST_PLUGINS_DIR;

const core = await import("../../src/lib/db/core.ts");
const dbPlugins = await import("../../src/lib/db/plugins.ts");
const { pluginManager } = await import("../../src/lib/plugins/manager.ts");
const { pluginTools } = await import("../../open-sse/mcp-server/tools/pluginTools.ts");

type ToolHandlerResult = { success?: boolean; error?: string; message?: string };
type ToolLike = { name: string; handler: (args: Record<string, unknown>) => Promise<unknown> };

function getTool(name: string): ToolLike {
  const tool = (pluginTools as unknown as ToolLike[]).find((t) => t.name === name);
  assert.ok(tool, `tool ${name} not found`);
  return tool!;
}

const sourceDirs: string[] = [];

function writeTestPlugin(name: string): string {
  const sourceDir = fs.mkdtempSync(path.join(os.tmpdir(), `omniroute-plugin-src-${name}-`));
  const pluginDir = path.join(sourceDir, name);
  fs.mkdirSync(pluginDir, { recursive: true });
  fs.writeFileSync(
    path.join(pluginDir, "plugin.json"),
    JSON.stringify(
      {
        name,
        version: "1.0.0",
        description: "M-05 sanitization fixture",
        author: "test",
        main: "index.js",
        hooks: { onRequest: false, onResponse: false, onError: false },
        enabledByDefault: false,
        requires: { permissions: [] },
        configSchema: {},
      },
      null,
      2
    )
  );
  fs.writeFileSync(path.join(pluginDir, "index.js"), "module.exports = {};");
  sourceDirs.push(sourceDir);
  return sourceDir;
}

function cleanup() {
  for (const dir of sourceDirs) {
    try {
      fs.rmSync(dir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
    } catch {
      /* best effort */
    }
  }
  sourceDirs.length = 0;
}

test.after(() => {
  core.resetDbInstance();
  cleanup();
  for (const dir of [TEST_DATA_DIR, TEST_PLUGINS_DIR]) {
    try {
      fs.rmSync(dir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
    } catch {
      /* best effort */
    }
  }
});

test("M-05: plugin_activate does not leak the plugin's absolute path to the client", async () => {
  const name = "m05-path-leak";
  const sourceDir = writeTestPlugin(name);
  await pluginManager.install(sourceDir);

  // Remove the installed directory so activate() fails with a message that embeds
  // the absolute pluginDir — the realistic shape of this leak.
  const row = dbPlugins.getPluginByName(name);
  assert.ok(row?.pluginDir, "expected an installed plugin row with a pluginDir");
  const pluginDir = row.pluginDir;
  fs.rmSync(pluginDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });

  const result = (await getTool("plugin_activate").handler({ name })) as ToolHandlerResult;

  assert.equal(result.success, false, "expected a failed activation result");
  assert.ok(
    typeof result.error === "string" && result.error.length > 0,
    "expected an error message"
  );
  assert.ok(
    !result.error!.includes(pluginDir),
    `tool result leaked the absolute plugin path: ${result.error}`
  );
  // Windows and POSIX separators both normalize to a single drive/root segment.
  assert.ok(
    !/[A-Za-z]:[\\/]|\\\\|\/(?:home|Users|tmp|var)\//.test(result.error!),
    `tool result leaked a filesystem path: ${result.error}`
  );
  // The message must stay diagnosable: the plugin name survives redaction.
  assert.match(result.error!, /does not exist|not found|plugin/i);
});
