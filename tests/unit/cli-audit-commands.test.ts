import test from "node:test";
import assert from "node:assert/strict";

const COMPLIANCE_ENTRIES = [
  {
    id: "c1",
    timestamp: "2026-05-10T10:00:00Z",
    actor: "admin@acme.com",
    action: "user.login",
    resource: "/admin",
    result: "success",
  },
  {
    id: "c2",
    timestamp: "2026-05-10T09:00:00Z",
    actor: "admin@acme.com",
    action: "key.delete",
    resource: "sk-xxx",
    result: "success",
  },
];

const MCP_ENTRIES = [
  {
    id: "m1",
    timestamp: "2026-05-10T11:00:00Z",
    actor: "cli_client",
    action: "omniroute_memory_search",
    resource: null,
    result: "success",
  },
];

const MCP_STATS = {
  period: "7d",
  totalCalls: 150,
  byTool: [{ tool: "omniroute_memory_search", count: 40 }],
  byResult: { success: 140, error: 10 },
};

function makeResp(data: unknown, status = 200) {
  const obj = {
    ok: status < 400,
    status,
    exitCode: status < 400 ? 0 : 1,
    json: () => Promise.resolve(data),
    text: () => Promise.resolve(JSON.stringify(data)),
    headers: new Headers(),
  };
  obj.json = obj.json.bind(obj);
  obj.text = obj.text.bind(obj);
  return obj;
}

function mockFetch(overrides: Record<string, unknown> = {}) {
  return (url: string) => {
    if (url.includes("/api/mcp/audit/stats"))
      return Promise.resolve(makeResp(overrides.stats ?? MCP_STATS));
    if (url.includes("/api/mcp/audit"))
      return Promise.resolve(makeResp({ items: overrides.mcp ?? MCP_ENTRIES }));
    if (url.includes("/api/compliance/audit-log"))
      return Promise.resolve(makeResp({ items: overrides.compliance ?? COMPLIANCE_ENTRIES }));
    return Promise.resolve(makeResp({}, 404));
  };
}

async function captureStdout(fn: () => Promise<void>): Promise<string> {
  const chunks: string[] = [];
  const orig = process.stdout.write.bind(process.stdout);
  process.stdout.write = (c: string | Uint8Array) => {
    chunks.push(typeof c === "string" ? c : c.toString());
    return true;
  };
  try {
    await fn();
  } finally {
    process.stdout.write = orig;
  }
  return chunks.join("");
}

function makeCmd(output = "json") {
  return { optsWithGlobals: () => ({ output, quiet: output !== "table" }) };
}

test("runAuditTail --source all mescla compliance e mcp", async () => {
  const origFetch = globalThis.fetch;
  globalThis.fetch = mockFetch() as any;

  const { runAuditTail } = await import("../../bin/cli/commands/audit.mjs");
  const out = await captureStdout(() =>
    runAuditTail({ source: "all", limit: 50 }, makeCmd() as any)
  );

  globalThis.fetch = origFetch;
  const parsed = JSON.parse(out);
  assert.ok(Array.isArray(parsed));
  assert.ok(parsed.some((e: any) => e.source === "compliance"));
  assert.ok(parsed.some((e: any) => e.source === "mcp"));
});

test("runAuditTail --source compliance retorna apenas compliance", async () => {
  let capturedUrls: string[] = [];
  const origFetch = globalThis.fetch;
  globalThis.fetch = ((url: string) => {
    capturedUrls.push(url);
    return Promise.resolve(makeResp({ items: COMPLIANCE_ENTRIES }));
  }) as any;

  const { runAuditTail } = await import("../../bin/cli/commands/audit.mjs");
  const out = await captureStdout(() =>
    runAuditTail({ source: "compliance", limit: 50 }, makeCmd() as any)
  );

  globalThis.fetch = origFetch;
  assert.ok(capturedUrls.every((u) => u.includes("/api/compliance/audit-log")));
  const parsed = JSON.parse(out);
  assert.ok(parsed.every((e: any) => e.source === "compliance"));
});

test("runAuditSearch envia q e filtros na query", async () => {
  let capturedUrl = "";
  const origFetch = globalThis.fetch;
  globalThis.fetch = ((url: string) => {
    capturedUrl = url;
    return Promise.resolve(makeResp({ items: COMPLIANCE_ENTRIES }));
  }) as any;

  const { runAuditSearch } = await import("../../bin/cli/commands/audit.mjs");
  await captureStdout(() =>
    runAuditSearch(
      "scope_denied",
      { source: "compliance", limit: 100, actor: "admin" },
      makeCmd() as any
    )
  );

  globalThis.fetch = origFetch;
  assert.ok(capturedUrl.includes("q=scope_denied"));
  assert.ok(capturedUrl.includes("actor=admin"));
});

test("runAuditStats consulta endpoint stats do mcp", async () => {
  let capturedUrl = "";
  const origFetch = globalThis.fetch;
  globalThis.fetch = ((url: string) => {
    capturedUrl = url;
    return Promise.resolve(makeResp(MCP_STATS));
  }) as any;

  const { runAuditStats } = await import("../../bin/cli/commands/audit.mjs");
  const out = await captureStdout(() =>
    runAuditStats({ source: "mcp", period: "7d" }, makeCmd() as any)
  );

  globalThis.fetch = origFetch;
  assert.ok(capturedUrl.includes("/api/mcp/audit/stats"));
  assert.ok(capturedUrl.includes("period=7d"));
  const parsed = JSON.parse(out);
  assert.equal(parsed.totalCalls, 150);
});

test("runAuditGet busca entrada por id", async () => {
  let capturedUrl = "";
  const origFetch = globalThis.fetch;
  globalThis.fetch = ((url: string) => {
    capturedUrl = url;
    return Promise.resolve(makeResp(COMPLIANCE_ENTRIES[0]));
  }) as any;

  const { runAuditGet } = await import("../../bin/cli/commands/audit.mjs");
  const out = await captureStdout(() =>
    runAuditGet("c1", { source: "compliance" }, makeCmd() as any)
  );

  globalThis.fetch = origFetch;
  assert.ok(capturedUrl.includes("/api/compliance/audit-log/c1"));
  const parsed = JSON.parse(out);
  assert.equal(parsed.id, "c1");
});

test("runAuditTail mascaramento de actor em output table", async () => {
  const origFetch = globalThis.fetch;
  globalThis.fetch = mockFetch() as any;

  const { runAuditTail } = await import("../../bin/cli/commands/audit.mjs");
  const out = await captureStdout(() =>
    runAuditTail({ source: "compliance", limit: 10 }, makeCmd("table") as any)
  );

  globalThis.fetch = origFetch;
  assert.ok(!out.includes("admin@acme.com") || out.includes("****"));
});
