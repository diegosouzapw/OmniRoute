import test from "node:test";
import assert from "node:assert/strict";
import { applyExecutorProxyToInfo } from "../../src/sse/handlers/chatHelpers.ts";

/**
 * #5217 (secondary) — the egress logger logged `proxy=direct` even when an
 * executor (OpencodeExecutor rotation) pinned a per-account proxy internally,
 * because the pre-resolved `proxyInfo` never learned about it.
 * `applyExecutorProxyToInfo` merges the executor-applied proxy back into proxyInfo
 * so the egress line reflects the real egress.
 */

test("returns proxyInfo unchanged when the executor applied no proxy", () => {
  const proxyInfo = { proxy: null, level: "direct", levelId: null };
  assert.strictEqual(applyExecutorProxyToInfo(proxyInfo, null), proxyInfo);
  assert.strictEqual(applyExecutorProxyToInfo(proxyInfo, undefined), proxyInfo);
});

test("injects the applied proxy and labels a previously-direct level as 'account'", () => {
  const applied = { type: "http", host: "127.0.0.1", port: 9999 };
  const merged = applyExecutorProxyToInfo({ proxy: null, level: "direct", levelId: null }, applied);
  assert.deepEqual(merged?.proxy, applied);
  assert.equal(merged?.level, "account");
});

test("injects the applied proxy even when proxyInfo is null/undefined", () => {
  const applied = { type: "socks5", host: "10.0.0.1", port: 1080 };
  const merged = applyExecutorProxyToInfo(null, applied);
  assert.deepEqual(merged?.proxy, applied);
  assert.equal(merged?.level, "account");
});

test("preserves an existing non-direct level (connection/key/global proxy)", () => {
  const applied = { type: "http", host: "127.0.0.1", port: 8888 };
  const merged = applyExecutorProxyToInfo(
    { proxy: { type: "http", host: "1.2.3.4", port: 1 }, level: "connection", levelId: "conn-1" },
    applied
  );
  assert.deepEqual(merged?.proxy, applied, "proxy is overwritten by the actually-applied one");
  assert.equal(merged?.level, "connection", "a non-direct level must be preserved");
  assert.equal(merged?.levelId, "conn-1");
});
