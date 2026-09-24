import test from "node:test";
import assert from "node:assert/strict";

// With PROXY_SKIP_RECENTLY_FAILED on, a pool member is set aside only on a refusal the
// provider really returned through it, and only for a provider inside the refusal scope.
// Locally generated failures carry no upstream outcome and never set a member aside. With
// the flag off (the default) nothing is ever written.

const memory = await import("../../open-sse/utils/proxyRefusalMemory.ts");
const { noteProxyOutcome } = await import("../../src/sse/handlers/proxyOutcomeMemory.ts");
const { egressBucketedLockProviders } = await import("../../open-sse/config/providerErrorRules.ts");

const PROXY = { type: "http", host: "10.4.0.1", port: 8080 };
const KEY = memory.proxyEgressKey(PROXY);

test.beforeEach(() => {
  memory.__resetProxyRefusalMemoryForTesting();
  process.env.PROXY_SKIP_RECENTLY_FAILED = "true";
});

test.after(() => {
  delete process.env.PROXY_SKIP_RECENTLY_FAILED;
});

test("a received refusal from an in-scope provider sets the member aside", () => {
  for (const provider of [...egressBucketedLockProviders(), "OpenCode"]) {
    memory.__resetProxyRefusalMemoryForTesting();
    noteProxyOutcome(provider, { proxy: PROXY, upstreamStatus: 429 });
    assert.equal(memory.isProxyAvoided(KEY), true, provider);
  }
});

test("a refusal from a provider outside the scope writes nothing", () => {
  for (const provider of ["opencode-zen", "openai", null]) {
    noteProxyOutcome(provider, { proxy: PROXY, upstreamStatus: 429 });
  }
  assert.equal(memory.__proxyRefusalMemorySizeForTesting(), 0);
});

test("no received status, no proxy or no proxyInfo writes nothing", () => {
  noteProxyOutcome("opencode", { proxy: PROXY });
  noteProxyOutcome("opencode", { proxy: PROXY, upstreamStatus: null });
  noteProxyOutcome("opencode", { proxy: null, upstreamStatus: 429 });
  noteProxyOutcome("opencode", null);
  noteProxyOutcome("opencode", undefined);
  assert.equal(memory.__proxyRefusalMemorySizeForTesting(), 0);
});

test("a success from an in-scope provider clears the member, other outcomes leave it", () => {
  noteProxyOutcome("opencode", { proxy: PROXY, upstreamStatus: 429 });
  noteProxyOutcome("opencode", { proxy: PROXY, upstreamStatus: 403 });
  noteProxyOutcome("opencode", { proxy: PROXY, upstreamStatus: 500 });
  assert.equal(memory.isProxyAvoided(KEY), true);
  noteProxyOutcome("opencode-go", { proxy: PROXY, upstreamStatus: 200 });
  assert.equal(memory.isProxyAvoided(KEY), false);
});

test("a success from another provider only ends an unreachable period, not a refusal one", () => {
  noteProxyOutcome("opencode", { proxy: PROXY, upstreamStatus: 429 });
  noteProxyOutcome("openai", { proxy: PROXY, upstreamStatus: 200 });
  assert.equal(
    memory.isProxyAvoided(KEY),
    true,
    "a shared pool must not clear another scope's refusal"
  );

  memory.__resetProxyRefusalMemoryForTesting();
  memory.noteProxyRefusal(KEY, "proxy_unreachable");
  noteProxyOutcome("openai", { proxy: PROXY, upstreamStatus: 200 });
  assert.equal(memory.isProxyAvoided(KEY), false);
});

test("an edge relay is ignored: its status is the relay's", () => {
  noteProxyOutcome("opencode", {
    proxy: { type: "vercel", host: "relay.example.vercel.app", port: 443 },
    upstreamStatus: 429,
  });
  noteProxyOutcome("opencode", {
    proxy: { type: "Vercel", host: "relay.example.vercel.app", port: 443 },
    upstreamStatus: 429,
  });
  assert.equal(memory.__proxyRefusalMemorySizeForTesting(), 0);
});

test("a second note while the proxy is already set aside changes nothing", () => {
  const start = Date.now();
  const periodMs = memory.noteProxyRefusal(KEY, "ip_quota_429", start) ?? 0;
  noteProxyOutcome("opencode", { proxy: PROXY, upstreamStatus: 429 });
  assert.equal(memory.__proxyRefusalMemorySizeForTesting(), 1);
  assert.equal(memory.isProxyAvoided(KEY, start + periodMs - 1000), true);
  assert.equal(memory.isProxyAvoided(KEY, start + periodMs + 1000), false);
});

test("with the flag at its default (off) a received refusal writes nothing", () => {
  delete process.env.PROXY_SKIP_RECENTLY_FAILED;
  for (const provider of egressBucketedLockProviders()) {
    noteProxyOutcome(provider, { proxy: PROXY, upstreamStatus: 429 });
  }
  assert.equal(memory.__proxyRefusalMemorySizeForTesting(), 0);
});
