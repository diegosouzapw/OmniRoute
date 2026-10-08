/**
 * #13941 pending 2 - MCP audit rows must carry the caller's API-key id.
 *
 * logToolCall used to stamp process.env.OMNIROUTE_API_KEY_ID, which is unset
 * on almost every install. Selecting any dashboard key then dropped every MCP
 * bar. The stamp must come from resolveMcpCallerApiKeyId (HTTP headers first,
 * env-key lookup for stdio).
 */
import test from "node:test";
import assert from "node:assert/strict";

const RUN_ARG_INDEX = 4;

function installMockDb(run: (...args: unknown[]) => unknown) {
  globalThis.__omnirouteMcpAuditDb = {
    prepare: () => ({ run, get: () => undefined, all: () => [] }),
    pragma: () => undefined,
    close: () => undefined,
    open: true,
  };
}

test("logToolCall stamps the resolved caller id, not OMNIROUTE_API_KEY_ID", async (t) => {
  process.env.OMNIROUTE_API_KEY_ID = "env-stale-id";
  const bound: unknown[][] = [];
  installMockDb((...args: unknown[]) => {
    bound.push(args);
  });
  t.after(() => {
    delete process.env.OMNIROUTE_API_KEY_ID;
    globalThis.__omnirouteMcpAuditDb = undefined;
  });

  const audit = await import("../../open-sse/mcp-server/audit.ts");
  audit.__setAuditCallerIdResolverForTests(async () => "key-from-header");
  t.after(() => audit.__setAuditCallerIdResolverForTests(null));

  await audit.logToolCall("omniroute_get_health", {}, {}, 3, true);
  assert.equal(bound.length, 1);
  assert.equal(bound[0][RUN_ARG_INDEX], "key-from-header");
});

test("logToolCall writes null when no caller id resolves and the env id is unset", async (t) => {
  delete process.env.OMNIROUTE_API_KEY_ID;
  const bound: unknown[][] = [];
  installMockDb((...args: unknown[]) => {
    bound.push(args);
  });
  t.after(() => {
    globalThis.__omnirouteMcpAuditDb = undefined;
  });

  const audit = await import("../../open-sse/mcp-server/audit.ts");
  audit.__setAuditCallerIdResolverForTests(async () => undefined);
  t.after(() => audit.__setAuditCallerIdResolverForTests(null));

  await audit.logToolCall("omniroute_get_health", {}, {}, 3, true);
  assert.equal(bound.length, 1);
  assert.equal(bound[0][RUN_ARG_INDEX], null);
});

test("logToolCall writes null when the resolver returns an empty string", async (t) => {
  const bound: unknown[][] = [];
  installMockDb((...args: unknown[]) => {
    bound.push(args);
  });
  t.after(() => {
    globalThis.__omnirouteMcpAuditDb = undefined;
  });

  const audit = await import("../../open-sse/mcp-server/audit.ts");
  audit.__setAuditCallerIdResolverForTests(async () => "");
  t.after(() => audit.__setAuditCallerIdResolverForTests(null));

  await audit.logToolCall("omniroute_get_health", {}, {}, 3, true);
  assert.equal(bound.length, 1);
  assert.equal(bound[0][RUN_ARG_INDEX], null);
});
