import test, { after, beforeEach } from "node:test";
import assert from "node:assert/strict";

// Scope enforcement is captured when server.ts is imported.
const ORIGINAL_ENFORCE_SCOPES = process.env.OMNIROUTE_MCP_ENFORCE_SCOPES;
const ORIGINAL_API_KEY_ID = process.env.OMNIROUTE_API_KEY_ID;
process.env.OMNIROUTE_MCP_ENFORCE_SCOPES = "true";

const { logToolCall } = await import("../../open-sse/mcp-server/audit.ts");
const { withMcpAuditCallerId } = await import("../../open-sse/mcp-server/auditCallerContext.ts");
const { withScopeEnforcement } = await import("../../open-sse/mcp-server/server.ts");

type AuditRow = [
  toolName: string,
  inputHash: string,
  outputSummary: string,
  durationMs: number,
  apiKeyId: string | null,
  success: number,
  errorCode: string | null,
];

const rows: AuditRow[] = [];
const mockAuditDb = {
  open: true,
  prepare: () => ({
    get: () => undefined,
    all: () => [],
    run: (...params: unknown[]) => {
      rows.push(params as AuditRow);
    },
  }),
  pragma: () => undefined,
  close: () => undefined,
};

function callerExtra(apiKeyId: string, scopes: string[]) {
  return {
    authInfo: {
      // token is intentionally present to prove audit attribution only consumes
      // the non-secret clientId and never persists the credential value.
      token: "sk-secret-must-never-be-audited",
      clientId: apiKeyId,
      scopes,
    },
  };
}

function byTool(toolName: string): AuditRow {
  const row = rows.find((entry) => entry[0] === toolName);
  assert.ok(row, `expected an audit row for ${toolName}`);
  return row;
}

beforeEach(() => {
  rows.length = 0;
  process.env.OMNIROUTE_API_KEY_ID = "stdio-env-key-id";
  globalThis.__omnirouteMcpAuditDb =
    mockAuditDb as unknown as typeof globalThis.__omnirouteMcpAuditDb;
});

after(() => {
  globalThis.__omnirouteMcpAuditDb = undefined;
  if (ORIGINAL_ENFORCE_SCOPES === undefined) delete process.env.OMNIROUTE_MCP_ENFORCE_SCOPES;
  else process.env.OMNIROUTE_MCP_ENFORCE_SCOPES = ORIGINAL_ENFORCE_SCOPES;
  if (ORIGINAL_API_KEY_ID === undefined) delete process.env.OMNIROUTE_API_KEY_ID;
  else process.env.OMNIROUTE_API_KEY_ID = ORIGINAL_API_KEY_ID;
});

test("attributes successful and failed tool audits to the authenticated caller id", async () => {
  const success = withScopeEnforcement(
    "test_audit_success",
    async (args) => {
      await Promise.resolve();
      await logToolCall("test_audit_success", args, { ok: true }, 4, true);
      return { content: [{ type: "text" as const, text: "ok" }] };
    },
    ["read:health"]
  );
  const failure = withScopeEnforcement(
    "test_audit_failure",
    async (args) => {
      await Promise.resolve();
      await logToolCall("test_audit_failure", args, null, 7, false, "provider_failed");
      return { content: [{ type: "text" as const, text: "failed" }], isError: true };
    },
    ["read:health"]
  );

  await success({ request: "success" }, callerExtra("db-key-success", ["read:health"]));
  await failure({ request: "failure" }, callerExtra("db-key-failure", ["read:health"]));

  assert.equal(byTool("test_audit_success")[4], "db-key-success");
  assert.equal(byTool("test_audit_success")[5], 1);
  assert.equal(byTool("test_audit_failure")[4], "db-key-failure");
  assert.equal(byTool("test_audit_failure")[5], 0);
  assert.equal(byTool("test_audit_failure")[6], "provider_failed");
  assert.equal(JSON.stringify(rows).includes("sk-secret-must-never-be-audited"), false);
});

test("attributes a scope denial before the tool handler runs", async () => {
  let handlerRan = false;
  const denied = withScopeEnforcement(
    "test_scope_denial",
    async () => {
      handlerRan = true;
      return { content: [{ type: "text" as const, text: "unexpected" }] };
    },
    ["write:config"]
  );

  const result = await denied({}, callerExtra("db-key-denied", ["read:health"]));

  assert.equal(handlerRan, false);
  assert.equal(result.isError, true);
  assert.equal(byTool("test_scope_denial")[4], "db-key-denied");
  assert.equal(byTool("test_scope_denial")[6], "scope_denied:missing_scopes");
  assert.equal(JSON.stringify(rows).includes("sk-secret-must-never-be-audited"), false);
});

test("keeps nested and concurrent async caller contexts isolated", async () => {
  const concurrent = (toolName: string, apiKeyId: string, delayMs: number) =>
    withMcpAuditCallerId(apiKeyId, async () => {
      await new Promise((resolve) => setTimeout(resolve, delayMs));
      await Promise.resolve();
      await logToolCall(toolName, {}, { ok: true }, delayMs, true);
    });

  await Promise.all([
    concurrent("concurrent_a", "db-key-a", 15),
    concurrent("concurrent_b", "db-key-b", 1),
  ]);

  await withMcpAuditCallerId("db-key-outer", async () => {
    await logToolCall("nested_outer_before", {}, {}, 1, true);
    await withMcpAuditCallerId("db-key-inner", async () => {
      await Promise.resolve();
      await logToolCall("nested_inner", {}, {}, 1, true);
    });
    await logToolCall("nested_outer_after", {}, {}, 1, true);
  });

  assert.equal(byTool("concurrent_a")[4], "db-key-a");
  assert.equal(byTool("concurrent_b")[4], "db-key-b");
  assert.equal(byTool("nested_outer_before")[4], "db-key-outer");
  assert.equal(byTool("nested_inner")[4], "db-key-inner");
  assert.equal(byTool("nested_outer_after")[4], "db-key-outer");
});

test("retains the static env fallback for stdio and unscoped callers", async () => {
  const stdio = withScopeEnforcement(
    "test_stdio_fallback",
    async (args) => {
      await logToolCall("test_stdio_fallback", args, { ok: true }, 2, true);
      return { content: [{ type: "text" as const, text: "ok" }] };
    },
    ["read:health"]
  );

  await stdio({}, { _meta: { scopes: ["read:health"] } });
  assert.equal(byTool("test_stdio_fallback")[4], "stdio-env-key-id");
});
