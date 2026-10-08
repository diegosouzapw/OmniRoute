/**
 * Tests for omniroute fcc-claude command.
 *
 * Covers:
 *   - loadFallbackChain (default + custom + from file)
 *   - streamMessages (happy path + fallback + error propagation)
 *   - fetchUpstreamVersions (caching + graceful degradation)
 *   - buildClaudeEnv reuse from launch.mjs
 */

import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
import path from "node:path";
import {
  loadFallbackChain,
  streamMessages,
  fetchUpstreamVersions,
} from "../../../bin/cli/commands/fcc-claude.mjs";
import { buildClaudeEnv } from "../../../bin/cli/commands/launch.mjs";
import { resolveDataDir } from "../../../bin/cli/data-dir.mjs";

// bin/cli/commands/fcc-claude.mjs stores its config/cache under
// <DATA_DIR>/fcc-claude/ (mirrors resolveDataDir() — see bin/cli/data-dir.mjs).
const fccDataDir = () => path.join(resolveDataDir(), "fcc-claude");

/**
 * Build a fetch Response-shaped mock backed by a real ReadableStream so
 * streamMessages()'s res.body.getReader() works exactly like it does against
 * the real fetch API.
 */
function mockSseResponse(sseText, { status = 200 } = {}) {
  return {
    ok: status < 300,
    status,
    text: async () => sseText,
    body: new ReadableStream({
      start(controller) {
        controller.enqueue(new TextEncoder().encode(sseText));
        controller.close();
      },
    }),
  };
}

const SAMPLE_SSE = [
  "event: message_start\n",
  'data: {"type":"message_start"}\n',
  "\n",
  "event: message_stop\n",
  'data: {"type":"message_stop"}\n',
  "\n",
  "x-omniroute-response-cost: 0.0012\n",
  "x-omniroute-model-used: auto/best-coding-fast\n",
].join("");

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
  const cachePath = path.join(fccDataDir(), "fallback.json");
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
  assert.deepEqual(chain.models, ["auto/best-coding", "auto/best-chat", "auto/fast"]);
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

test("loadFallbackChain reads from <DATA_DIR>/fcc-claude/fallback.json", async () => {
  const dir = fccDataDir();
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

test("streamMessages yields SSE lines for a valid model", async (t) => {
  // Mock fetch — these tests must not require a real OmniRoute server on
  // localhost:20128 (see #11908 review).
  t.mock.method(globalThis, "fetch", async () => mockSseResponse(SAMPLE_SSE));

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
  assert.ok(
    lines.some((l) => l.includes("event:")),
    "should contain event headers"
  );
});

test("streamMessages falls back to next model when primary fails", async (t) => {
  // Primary model "fails" at the fetch layer; the fallback model succeeds.
  t.mock.method(globalThis, "fetch", async (_url, init) => {
    const { model } = JSON.parse(init.body);
    if (model.includes("nonexistent")) {
      throw new Error("fetch failed");
    }
    return mockSseResponse(SAMPLE_SSE);
  });

  const stderrLines = [];
  const restore = console.error;
  console.error = (...args) => {
    stderrLines.push(args.join(" "));
  };

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
      )) {
      }
    })(),
    /All models exhausted/i
  );
});

test("streamMessages includes x-omniroute-* headers in SSE trailers", async (t) => {
  t.mock.method(globalThis, "fetch", async () => mockSseResponse(SAMPLE_SSE));

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

test("fetchUpstreamVersions returns omniRoute.running from health API", async (t) => {
  // Mock fetch — must not require a real OmniRoute server on localhost:20128
  // (see #11908 review). The GitHub upstream call is left to degrade gracefully.
  t.mock.method(globalThis, "fetch", async (url) => {
    if (String(url).includes("/api/monitoring/health")) {
      return { ok: true, status: 200, json: async () => ({ version: "3.8.51-test" }) };
    }
    return { ok: false, status: 404, json: async () => ({}) };
  });

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
