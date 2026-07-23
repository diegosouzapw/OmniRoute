/**
 * Regression test for the JSONC-tolerant config reader used by every
 * cli-tools settings route.
 *
 * Ported from upstream `decolua/9router@6c10edf8`:
 * "fix(cli-tools): tolerate JSONC configs in CLI tool settings routes".
 *
 * Before the fix, `readSettings`/`readConfig` helpers only caught `ENOENT` and
 * re-threw on any other error — so a config file with a single trailing
 * comma (valid JSONC, emitted by tools like opencode) crashed the GET route
 * with a 500 and the dashboard misread the response as "tool not installed".
 *
 * After the fix:
 *  - trailing commas are stripped before parsing (JSONC tolerated);
 *  - any other parse error returns `null` (or the caller's fallback) so the
 *    dashboard renders "installed but not configured".
 */
import test from "node:test";
import assert from "node:assert/strict";
import { promises as fs } from "node:fs";
import os from "node:os";
import path from "node:path";

const { parseJsoncOrNull, readJsoncConfig } = await import(
  "../../src/app/api/cli-tools/_lib/jsoncConfig.ts"
);

test("parseJsoncOrNull tolerates trailing commas in objects", () => {
  const jsonc = `{
    "model": "gpt-5",
    "tools": ["a", "b",],
    "nested": { "x": 1, },
  }`;
  const parsed = parseJsoncOrNull<{ model: string; tools: string[] }>(jsonc);
  assert.ok(parsed, "parser must accept JSONC with trailing commas");
  assert.equal(parsed.model, "gpt-5");
  assert.deepEqual(parsed.tools, ["a", "b"]);
});

test("parseJsoncOrNull returns null on truly malformed JSON", () => {
  assert.equal(parseJsoncOrNull("{ not json at all"), null);
});

test("readJsoncConfig returns fallback when file is missing", async () => {
  const missing = path.join(os.tmpdir(), `cli-tools-jsonc-missing-${Date.now()}.json`);
  assert.equal(await readJsoncConfig(missing), null);
  assert.deepEqual(await readJsoncConfig(missing, {}), {});
});

test("readJsoncConfig parses a JSONC file with trailing commas (regression)", async () => {
  const dir = await fs.mkdtemp(path.join(os.tmpdir(), "cli-tools-jsonc-"));
  const file = path.join(dir, "settings.json");
  await fs.writeFile(
    file,
    `{
  "apiKey": "sk-test",
  "model": "claude-sonnet-4-5",
}
`,
    "utf-8"
  );
  try {
    const parsed = await readJsoncConfig<{ apiKey: string; model: string }>(file);
    assert.ok(parsed, "JSONC file with trailing comma must NOT crash the reader");
    assert.equal(parsed.apiKey, "sk-test");
    assert.equal(parsed.model, "claude-sonnet-4-5");
  } finally {
    await fs.rm(dir, { recursive: true, force: true });
  }
});

test("readJsoncConfig returns fallback on corrupted config instead of throwing", async () => {
  const dir = await fs.mkdtemp(path.join(os.tmpdir(), "cli-tools-jsonc-bad-"));
  const file = path.join(dir, "settings.json");
  await fs.writeFile(file, "{ this is not valid json at all !!! ", "utf-8");
  try {
    // Must NOT throw — the dashboard renders "installed but not configured"
    // when this returns null, instead of "not installed" on a 500.
    assert.equal(await readJsoncConfig(file), null);
    assert.deepEqual(await readJsoncConfig(file, {}), {});
  } finally {
    await fs.rm(dir, { recursive: true, force: true });
  }
});

/**
 * Source-guard: every cli-tools settings route's read helper must go through
 * the JSONC-tolerant reader. A regression to raw `JSON.parse(content)` inside
 * a `readSettings` / `readConfig` helper would re-introduce the original
 * 500-on-JSONC bug, so we assert the routes do not contain that pattern.
 *
 * Same source-guard pattern as `tests/unit/source-guard-*.test.ts`.
 */
test("cli-tools settings routes use the JSONC-tolerant reader (source-guard)", async () => {
  // For each route, look for the GET-read helper region (top of file, up to
  // the first `export async function GET`) and assert it imports + uses the
  // JSONC-tolerant reader instead of raw `JSON.parse(content)`.
  const routes = [
    "claude-settings",
    "cline-settings",
    "droid-settings",
    "kilo-settings",
    "openclaw-settings",
  ];
  const repoRoot = path.resolve(import.meta.dirname ?? ".", "..", "..");
  for (const r of routes) {
    const src = await fs.readFile(
      path.join(repoRoot, "src", "app", "api", "cli-tools", r, "route.ts"),
      "utf-8"
    );
    const getIdx = src.indexOf("export async function GET");
    assert.ok(getIdx > 0, `${r}: expected an exported GET handler`);
    const head = src.slice(0, getIdx);
    assert.ok(
      /from\s+["']\.\.\/_lib\/jsoncConfig["']/.test(src),
      `${r}: must import readJsoncConfig from ../_lib/jsoncConfig`
    );
    assert.ok(
      !/JSON\.parse\(\s*content\s*\)/.test(head),
      `${r}: read helper still calls raw JSON.parse(content) — port the JSONC fix`
    );
    assert.ok(
      /readJsoncConfig\s*[<(]/.test(head),
      `${r}: read helper must invoke readJsoncConfig`
    );
  }
});
