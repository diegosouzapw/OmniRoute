import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

// Regression guard for #3368: the web-session pool MCP tools
// (open-sse/mcp-server/tools/poolTools.ts) existed in the repo but were never
// imported or registered in open-sse/mcp-server/server.ts, so omniroute_pool_*
// was defined-but-dead. This pins the wiring (import + registration loop +
// reserved-name entry), the scope contract, and the live handler behavior so
// the observability tools cannot silently fall out of the live MCP server again.

const { poolTools } = await import("../../open-sse/mcp-server/tools/poolTools.ts");
const { handlePoolStatus, handlePoolSessions, handlePoolReset, handlePoolWarm } = await import(
  "../../open-sse/mcp-server/tools/poolTools.ts"
);
const { MCP_TOOL_SCOPES, MCP_SCOPE_LIST } = await import(
  "../../src/shared/constants/mcpScopes.ts"
);

const POOL_TOOL_NAMES = [
  "omniroute_pool_status",
  "omniroute_pool_sessions",
  "omniroute_pool_reset",
  "omniroute_pool_warm",
  "omniroute_pool_health",
];

const serverSource = readFileSync(
  new URL("../../open-sse/mcp-server/server.ts", import.meta.url),
  "utf8"
);

// ── Wiring guard (the actual #3368 fix) ───────────────────────────────────
// These assertions fail on the pre-fix tree, where server.ts had no reference
// to poolTools at all.

test("server.ts imports the poolTools collection", () => {
  assert.match(
    serverSource,
    /import\s*\{\s*poolTools\s*\}\s*from\s*"\.\/tools\/poolTools\.ts"/,
    "server.ts must import poolTools so the tools reach the live MCP server"
  );
});

test("server.ts registers poolTools via the standard registration loop", () => {
  assert.match(
    serverSource,
    /Object\.values\(poolTools\)\.forEach/,
    "server.ts must iterate poolTools through server.registerTool like the other collections"
  );
});

test("server.ts reserves the poolTools names", () => {
  assert.match(
    serverSource,
    /\.\.\.Object\.keys\(poolTools\)/,
    "poolTools names must be in RESERVED_MCP_NAMES to avoid collisions"
  );
});

// ── Collection completeness ───────────────────────────────────────────────

test("poolTools exposes exactly the five expected pool tools", () => {
  assert.deepEqual(Object.keys(poolTools).sort(), [...POOL_TOOL_NAMES].sort());
});

// ── Scope contract ────────────────────────────────────────────────────────

test("every poolTools inline scope is a known MCP scope", () => {
  const known = new Set(MCP_SCOPE_LIST as readonly string[]);
  for (const toolDef of Object.values(poolTools) as Array<{ name: string; scopes: string[] }>) {
    assert.ok(
      Array.isArray(toolDef.scopes) && toolDef.scopes.length > 0,
      `${toolDef.name}: scopes must be a non-empty array`
    );
    for (const scope of toolDef.scopes) {
      assert.ok(known.has(scope), `${toolDef.name}: "${scope}" is not in MCP_SCOPE_LIST`);
    }
  }
});

test("inline poolTools scopes match the canonical MCP_TOOL_SCOPES map", () => {
  for (const toolDef of Object.values(poolTools) as Array<{ name: string; scopes: string[] }>) {
    const canonical = (MCP_TOOL_SCOPES as Record<string, readonly string[]>)[toolDef.name];
    assert.ok(canonical, `${toolDef.name}: missing from MCP_TOOL_SCOPES`);
    assert.deepEqual(
      [...toolDef.scopes].sort(),
      [...canonical].sort(),
      `${toolDef.name}: inline scopes must equal MCP_TOOL_SCOPES entry`
    );
  }
});

test("read tools require read:health; lifecycle tools require write:resilience", () => {
  const tools = poolTools as Record<string, { scopes: string[] }>;
  assert.deepEqual(tools.omniroute_pool_status.scopes, ["read:health"]);
  assert.deepEqual(tools.omniroute_pool_sessions.scopes, ["read:health"]);
  assert.deepEqual(tools.omniroute_pool_health.scopes, ["read:health"]);
  assert.deepEqual(tools.omniroute_pool_reset.scopes, ["write:resilience"]);
  assert.deepEqual(tools.omniroute_pool_warm.scopes, ["write:resilience"]);
});

// ── Live handler behavior (against the in-memory PoolRegistry) ─────────────
// No pools are created here, so the registry stays empty: status returns the
// all-pools aggregate shape and per-provider tools return a clear error.

test("handlePoolStatus with no provider returns the aggregate shape", async () => {
  const result = (await handlePoolStatus({})) as {
    totalPools: number;
    providers: string[];
    pools: unknown[];
  };
  assert.equal(typeof result.totalPools, "number");
  assert.ok(Array.isArray(result.providers), "providers must be an array");
  assert.ok(Array.isArray(result.pools), "pools must be an array");
});

test("handlePoolStatus errors clearly for an unknown provider", async () => {
  const result = (await handlePoolStatus({ provider: "no-such-provider-3368" })) as {
    error?: string;
  };
  assert.match(String(result.error), /No pool found for provider 'no-such-provider-3368'/);
});

test("handlePoolSessions errors clearly for an unknown provider", async () => {
  const result = (await handlePoolSessions({ provider: "no-such-provider-3368" })) as {
    error?: string;
  };
  assert.match(String(result.error), /No pool found/);
});

test("handlePoolWarm errors clearly for an unknown provider", async () => {
  const result = (await handlePoolWarm({ provider: "no-such-provider-3368", count: 6 })) as {
    error?: string;
  };
  assert.match(String(result.error), /No pool found/);
});

test("handlePoolReset reports reset:false for an unknown provider", async () => {
  const result = (await handlePoolReset({ provider: "no-such-provider-3368" })) as {
    reset: boolean;
    provider: string;
  };
  assert.equal(result.reset, false);
  assert.equal(result.provider, "no-such-provider-3368");
});
