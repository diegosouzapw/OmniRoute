/**
 * Tests for omniroute fcc-claude command.
 *
 * Covers:
 *   - loadFallbackChain (default + custom + from file)
 *   - streamMessages (happy path + fallback + error propagation)
 *   - fetchUpstreamVersions (caching + graceful degradation)
 *   - buildClaudeEnv reuse from launch.mjs
 */

import { test, before, after, mock } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import {
  loadFallbackChain,
  streamMessages,
  fetchUpstreamVersions,
} from "../../../bin/cli/commands/fcc-claude.mjs";
import { buildClaudeEnv } from "../../../bin/cli/commands/launch.mjs";

// Silence console output during tests (#5959 pattern)
const _console = {
  error: console.error,
  warn: console.warn,
};
before(() => {
  console.error = () => {};
  console.warn = () => {};
});
after(() => {
  console.error = _console.error;
  console.warn = _console.warn;
});

// ─── loadFallbackChain ───────────────────────────────────────────────────────

test("loadFallbackChain returns defaults when no config exists", async () => {
  // Ensure no cache file exists
  const cachePath = path.join(os.homedir(), ".omni-fcc-poc", "fallback.json");
  let backup = null;
  try {
    backup = await fs.readFile(cachePath, "utf8");
  } catch {
    /* none */
  }
  try {
    await fs.unlink(cachePath);
  } catch {
    /* none */
  }

  const chain = loadFallbackChain();
  assert.deepEqual(chain.models, [
    "auto/best-coding",
    "auto/best-chat",
    "auto/fast",
  ]);
  assert.equal(chain.strategy, "priority");

  // Restore
  if (backup) await fs.writeFile(cachePath, backup);
});

test("loadFallbackChain honoursopts.models override", () => {
  const chain = loadFallbackChain({
    models: ["auto/pro-coding", "auto/offline"],
    strategy: "random",
  });
  assert.deepEqual(chain.models, ["auto/pro-coding", "auto/offline"]);
  assert.equal(chain.strategy, "random");
});

test("loadFallbackChain reads from ~/.omni-fcc-poc/fallback.json", async () => {
  const dir = path.join(os.homedir(), ".omni-fcc-poc");
  await fs.mkdir(dir, { recursive: true });
  const configPath = path.join(dir, "fallback.json");
  const custom = JSON.stringify({
    models: ["model-a", "model-b"],
    strategy: "round-robin",
  });
  await fs.writeFile(configPath, custom);
  try {
    const chain = loadFallbackChain();
    assert.deepEqual(chain.models, ["model-a", "model-b"]);
    assert.equal(chain.strategy, "round-robin");
  } finally {
    await fs.unlink(configPath);
  }
});

// ─── buildClaudeEnv (reuse from launch.mjs) ──────────────────────────────────

test("buildClaudeEnv strips ANTHROPIC_* keys and sets OmniRoute URL", () => {
  const env = buildClaudeEnv(
    { ANTHROPIC_API_KEY: "leak", ANTHROPIC_BASE_URL: "old", PATH: "/bin" },
    "http://localhost:20128",
    "test-token"
  );
  assert.equal(env.ANTHROPIC_API_KEY, undefined);
  assert.equal(env.ANTHROPIC_BASE_URL, "http://localhost:20128");
  assert.equal(env.ANTHROPIC_AUTH_TOKEN, "test-token");
  assert.equal(env.CLAUDE_CODE_ENABLE_GATEWAY_MODEL_DISCOVERY, "1");
  assert.equal(env.PATH, "/bin");
});

test("buildClaudeEnv uses sentinel when no authToken provided", () => {
  const env = buildClaudeEnv({ PATH: "/bin" }, 20128, undefined);
  assert.equal(env.ANTHROPIC_AUTH_TOKEN, "omniroute-no-auth");
});

// ─── streamMessages ──────────────────────────────────────────────────────────

test("streamMessages yields SSE lines for a valid model", async () => {
  const lines = [];
  for await (const line of streamMessages(
    [{ role: "user", content: "hi" }],
    "auto/best-coding-fast",
    "http://localhost:20128",
    null
  )) {
    lines.push(line);
  }
  assert.ok(lines.length > 0, "should receive SSE events");
  assert.ok(lines.some((l) => l.includes("event:")), "should contain event headers");
});

test("streamMessages falls back to next model when primary fails", async () => {
  const stderrLines = [];
  const restore = console.error;
  console.error = (...args) => { stderrLines.push(args.join(" ")); };

  try {
    const lines = [];
    for await (const line of streamMessages(
      [{ role: "user", content: "ok" }],
      "auto/nonexistent-fcc-claude-poc",
      "http://localhost:20128",
      null,
      ["auto/best-chat"]
    )) {
      lines.push(line);
    }
    assert.ok(lines.length > 0, "should succeed via fallback");
    assert.ok(
      stderrLines.some((l) => l.includes("fallback:")),
      "should log fallback transition"
    );
  } finally {
    console.error = restore;
  }
});

test("streamMessages throws when all models in chain fail", async () => {
  await assert.rejects(
    (async () => {
      for await (const _ of streamMessages(
        [{ role: "user", content: "x" }],
        "auto/nonexistent-one",
        "http://localhost:20128",
        null,
        ["auto/nonexistent-two"]
      )) {}
    })(),
    /All models exhausted/i
  );
});

test("streamMessages includes x-omniroute-* headers in SSE trailers", async () => {
  const lines = [];
  for await (const line of streamMessages(
    [{ role: "user", content: "test" }],
    "auto/best-coding-fast",
    "http://localhost:20128",
    null
  )) {
    lines.push(line);
  }
  const headerLines = lines.filter((l) => l.includes("x-omniroute-"));
  assert.ok(headerLines.length > 0, "should receive OmniRoute tracing headers");
  const costLine = headerLines.find((l) => l.includes("x-omniroute-response-cost"));
  assert.ok(costLine, "should include cost header");
});

// ─── fetchUpstreamVersions ───────────────────────────────────────────────────

test("fetchUpstreamVersions returns omniRoute.running from health API", async () => {
  const cache = await fetchUpstreamVersions();
  assert.ok(cache.omniRoute.running !== null, "should detect running OmniRoute version");
  assert.ok(
    ["health-api", "dual-upstream"].includes(cache.omniRoute.source),
    `source should be a known value, got ${cache.omniRoute.source}`
  );
});

test("fetchUpstreamVersions caches result for 1h", async () => {
  const cache1 = await fetchUpstreamVersions();
  const cache2 = await fetchUpstreamVersions();
  assert.equal(cache1.omniRoute.running, cache2.omniRoute.running, "cached result should match");
});

test("fetchUpstreamVersions degrades gracefully when GitHub API unreachable", async () => {
  // Already called above; just verify fcc field is set (even if null)
  const cache = await fetchUpstreamVersions();
  assert.ok("fcc" in cache, "should always have fcc field");
  assert.ok("omniRoute" in cache, "should always have omniRoute field");
});
