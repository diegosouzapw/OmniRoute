import { describe, it } from "node:test";
import assert from "node:assert/strict";

const { OpencodeExecutor } = await import("../../open-sse/executors/opencode.ts");
const { MimocodeExecutor } = await import("../../open-sse/executors/mimocode.ts");

/**
 * Behavioral guards for the three type-only fixes in the TS 7 executor slice
 * (see #8484). Each fix restored a type the code already depended on at runtime;
 * these tests pin the runtime contracts so a future "simplification" of the
 * annotations cannot silently change behavior.
 *
 * The zed-hosted `SseEnqueueTarget` fix is already covered end-to-end by
 * `zed-hosted-think-close-marker.test.ts`, which drives the same TransformStream
 * that failed to type-check — no duplicate added here.
 */

describe("OpencodeExecutor — tools truncation survives the narrowing fix", () => {
  const executor = new OpencodeExecutor("opencode-go");
  const CREDENTIALS = { apiKey: "k" } as Record<string, unknown>;

  const tools = (n: number) =>
    Array.from({ length: n }, (_, i) => ({
      type: "function",
      function: { name: `tool_${i}`, parameters: {} },
    }));

  function bodyWith(toolCount: number) {
    return {
      model: "oc/kimi-k2.6",
      stream: true,
      messages: [{ role: "user", content: "hi" }],
      tools: tools(toolCount),
    };
  }

  it("truncates an over-long tools array to 128 entries", () => {
    const out = executor.transformRequest("oc/kimi-k2.6", bodyWith(200), true, CREDENTIALS) as {
      tools: unknown[];
    };
    assert.equal(out.tools.length, 128, "upstream rejects more than 128 tools");
    assert.deepEqual(
      (out.tools[127] as { function: { name: string } }).function.name,
      "tool_127",
      "truncation keeps the first 128 in order, not an arbitrary slice"
    );
  });

  it("leaves a within-limit tools array untouched", () => {
    const out = executor.transformRequest("oc/kimi-k2.6", bodyWith(10), true, CREDENTIALS) as {
      tools: unknown[];
    };
    assert.equal(out.tools.length, 10);
  });

  it("is a no-op when the body carries no tools", () => {
    const body = {
      model: "oc/kimi-k2.6",
      stream: true,
      messages: [{ role: "user", content: "hi" }],
    };
    const out = executor.transformRequest("oc/kimi-k2.6", body, true, CREDENTIALS) as Record<
      string,
      unknown
    >;
    assert.equal("tools" in out, false);
    assert.ok(Array.isArray(out.messages), "messages preserved");
  });

  it("leaves an array-shaped body alone (pins the !Array.isArray guard)", () => {
    // The pre-fix condition reached `.tools` on any object, arrays included, and
    // relied on `Array.isArray(undefined)` short-circuiting. The explicit
    // !Array.isArray() guard must keep that outcome identical.
    const arrayBody = [{ role: "user", content: "hi" }] as unknown as Record<string, unknown>;
    const out = executor.transformRequest("oc/kimi-k2.6", arrayBody, true, CREDENTIALS);
    assert.ok(Array.isArray(out), "array body must pass through as an array");
    assert.equal((out as unknown[]).length, 1);
  });
});

describe("MimocodeExecutor — AccountState.proxy is always present (#3837/#5521)", () => {
  const FP = "fingerprint-1";

  function accountsOf(exec: unknown): Array<Record<string, unknown>> {
    return (exec as { accounts: Array<Record<string, unknown>> }).accounts;
  }

  function sync(exec: unknown, credentials: unknown): void {
    (exec as { syncAccountsFromCredentials(c: unknown): void }).syncAccountsFromCredentials(
      credentials
    );
  }

  it("defaults proxy to null — not undefined — when no accountProxies are configured", () => {
    const exec = new MimocodeExecutor();
    accountsOf(exec).length = 0;
    accountsOf(exec).push({
      fingerprint: FP,
      jwt: "",
      expiresAt: 0,
      cooldownUntil: 0,
      consecutiveFails: 0,
    });

    sync(exec, { providerSpecificData: {} });

    const account = accountsOf(exec)[0];
    assert.ok("proxy" in account, "every account must expose a proxy key");
    assert.equal(account.proxy, null, "unconfigured proxy is null, never undefined");
  });

  it("resolves a configured proxy onto the matching account", () => {
    const exec = new MimocodeExecutor();
    accountsOf(exec).length = 0;
    accountsOf(exec).push({
      fingerprint: FP,
      jwt: "",
      expiresAt: 0,
      cooldownUntil: 0,
      consecutiveFails: 0,
    });

    const proxy = { type: "http", host: "p1.example.com", port: 1080 };
    sync(exec, { providerSpecificData: { accountProxies: [{ fingerprint: FP, proxy }] } });

    assert.deepEqual(accountsOf(exec)[0].proxy, proxy);
  });

  it("clears a previously-resolved proxy back to null when config drops it", () => {
    const exec = new MimocodeExecutor();
    accountsOf(exec).length = 0;
    accountsOf(exec).push({
      fingerprint: FP,
      jwt: "",
      expiresAt: 0,
      cooldownUntil: 0,
      consecutiveFails: 0,
      proxy: { type: "http", host: "stale.example.com", port: 8080 },
    });

    sync(exec, { providerSpecificData: { accountProxies: [] } });

    assert.equal(accountsOf(exec)[0].proxy, null, "a removed proxy must not linger on the account");
  });
});
