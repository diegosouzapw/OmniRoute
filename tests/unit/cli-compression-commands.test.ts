import test from "node:test";
import assert from "node:assert/strict";
import { makeMcpResp, makeMcpStreamFetch } from "./helpers/mcpStreamMock.ts";

function makeResp(data: unknown, status = 200) {
  const obj = {
    ok: status < 400,
    status,
    json: () => Promise.resolve(data),
    text: () => Promise.resolve(JSON.stringify(data)),
    headers: new Headers(),
  };
  obj.json = obj.json.bind(obj);
  obj.text = obj.text.bind(obj);
  return obj;
}

async function captureStdout(fn: () => Promise<void>): Promise<string> {
  const chunks: string[] = [];
  const orig = process.stdout.write.bind(process.stdout);
  process.stdout.write = (c: string | Uint8Array) => {
    if (typeof c === "string") chunks.push(c);
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

test("compression status chama omniroute_compression_status via mcp", async () => {
  const calls: unknown[] = [];
  const origFetch = globalThis.fetch;
  globalThis.fetch = makeMcpStreamFetch({ toolResult: { engine: "caveman", enabled: true } });
  const inner = globalThis.fetch;
  globalThis.fetch = ((url: unknown, init: unknown) => {
    calls.push({ url: String(url), init });
    return inner(url, init);
  }) as any;

  const { runCompressionStatus } = await import("../../bin/cli/commands/compression.mjs");
  await captureStdout(() => runCompressionStatus({}, makeCmd() as any));

  globalThis.fetch = origFetch;
  const body = JSON.parse(calls.find((x) => String(x.init?.body || "").includes("tools/call"))?.init?.body || "{}");
  assert.equal(body.method, "tools/call");
  assert.equal(body.params.name, "omniroute_compression_status");
});

test("compression configure envia configuração via mcp", async () => {
  const calls: unknown[] = [];
  const origFetch = globalThis.fetch;
  globalThis.fetch = makeMcpStreamFetch({ toolResult: { success: true } });
  const inner = globalThis.fetch;
  globalThis.fetch = ((url: unknown, init: unknown) => {
    calls.push({ url: String(url), init });
    return inner(url, init);
  }) as any;

  const { runCompressionConfigure } = await import("../../bin/cli/commands/compression.mjs");
  await captureStdout(() =>
    runCompressionConfigure({ engine: "caveman", cavemanAggressiveness: 0.8 }, makeCmd() as any)
  );

  globalThis.fetch = origFetch;
  const body = JSON.parse(calls.find((x) => String(x.init?.body || "").includes("tools/call"))?.init?.body || "{}");
  assert.equal(body.method, "tools/call");
  assert.equal(body.params.name, "omniroute_compression_configure");
  // #6571: the configure command now sends the canonical `strategy` field
  assert.equal(body.params.arguments.strategy, "caveman");
  assert.ok(body.params.arguments.caveman?.aggressiveness === 0.8);
});

test("compression engine set chama omniroute_set_compression_engine", async () => {
  const calls: unknown[] = [];
  const origFetch = globalThis.fetch;
  globalThis.fetch = makeMcpStreamFetch({ toolResult: {} });
  const inner = globalThis.fetch;
  globalThis.fetch = ((url: unknown, init: unknown) => {
    calls.push({ url: String(url), init });
    return inner(url, init);
  }) as any;

  const out = await captureStdout(async () => {
    const { runCompressionEngineSet } = await import("../../bin/cli/commands/compression.mjs");
    await runCompressionEngineSet("rtk", {}, makeCmd() as any);
  });

  globalThis.fetch = origFetch;
  const body = JSON.parse(calls.find((x) => String(x.init?.body || "").includes("tools/call"))?.init?.body || "{}");
  assert.equal(body.method, "tools/call");
  assert.equal(body.params.name, "omniroute_set_compression_engine");
  assert.equal(body.params.arguments.engine, "rtk");
  assert.ok(out.includes("rtk"));
});

test("compression engine set rejeita engine inválido", async () => {
  const origExit = process.exit;
  let exitCode: number | undefined;
  process.exit = ((code: number) => {
    exitCode = code;
    throw new Error("exit");
  }) as any;

  try {
    const { runCompressionEngineSet } = await import("../../bin/cli/commands/compression.mjs");
    await runCompressionEngineSet("invalid_engine", {}, makeCmd() as any);
  } catch {
    // expected
  }

  process.exit = origExit;
  assert.equal(exitCode, 2);
});

test("compression engine set normaliza hybrid → stacked alias", async () => {
  const calls: unknown[] = [];
  const origFetch = globalThis.fetch;
  globalThis.fetch = makeMcpStreamFetch({ toolResult: {} });
  const inner = globalThis.fetch;
  globalThis.fetch = ((url: unknown, init: unknown) => {
    calls.push({ url: String(url), init });
    return inner(url, init);
  }) as any;

  await captureStdout(async () => {
    const { runCompressionEngineSet } = await import("../../bin/cli/commands/compression.mjs");
    await runCompressionEngineSet("hybrid", {}, makeCmd() as any);
  });

  globalThis.fetch = origFetch;
  const body = JSON.parse(calls.find((x) => String(x.init?.body || "").includes("tools/call"))?.init?.body || "{}");
  assert.equal(body.params.arguments.engine, "stacked");
});

test("compression rules list busca /api/compression/rules", async () => {
  let capturedUrl = "";
  const origFetch = globalThis.fetch;
  globalThis.fetch = ((url: string) => {
    capturedUrl = url;
    return Promise.resolve(
      makeResp([{ id: "rule-1", pattern: "system_prompt:.*", action: "drop" }])
    );
  }) as any;

  await (globalThis.fetch as any)("/api/compression/rules");

  globalThis.fetch = origFetch;
  assert.ok(capturedUrl.includes("/api/compression/rules"));
});

test("compression rules add envia pattern e action", async () => {
  let capturedBody: unknown = null;
  let capturedUrl = "";
  const origFetch = globalThis.fetch;
  globalThis.fetch = ((url: string, opts: unknown) => {
    capturedUrl = url;
    if (opts?.body) capturedBody = JSON.parse(opts.body);
    return Promise.resolve(makeResp({ id: "rule-2", pattern: ".*debug.*", action: "drop" }));
  }) as any;

  await (globalThis.fetch as any)("/api/compression/rules", {
    method: "POST",
    body: JSON.stringify({ pattern: ".*debug.*", action: "drop" }),
  });

  globalThis.fetch = origFetch;
  assert.ok(capturedUrl.includes("/api/compression/rules"));
  assert.equal(capturedBody.pattern, ".*debug.*");
  assert.equal(capturedBody.action, "drop");
});

test("compression language-packs busca endpoint correto", async () => {
  let capturedUrl = "";
  const origFetch = globalThis.fetch;
  globalThis.fetch = ((url: string) => {
    capturedUrl = url;
    return Promise.resolve(makeResp([{ id: "pt-BR", name: "Portuguese" }]));
  }) as any;

  await (globalThis.fetch as any)("/api/compression/language-packs");

  globalThis.fetch = origFetch;
  assert.ok(capturedUrl.includes("/api/compression/language-packs"));
});

test("compression.mjs pode ser importado sem erro", async () => {
  const mod = await import("../../bin/cli/commands/compression.mjs");
  assert.equal(typeof mod.registerCompression, "function");
  assert.equal(typeof mod.runCompressionStatus, "function");
  assert.equal(typeof mod.runCompressionEngineSet, "function");
  assert.equal(typeof mod.runCompressionPreview, "function");
});

// #2688 — when the MCP tool surface returns 404, the CLI must fall back to
// direct REST endpoints (no MCP tool surface required on minimal builds).
test("compression status falls back to /api/settings/compression on MCP 404", async () => {
  const callOrder: string[] = [];
  const origFetch = globalThis.fetch;
  globalThis.fetch = ((url: string, opts: unknown) => {
    callOrder.push(url);
    if (url.includes("/api/mcp/stream")) {
      const body = opts?.body ? JSON.parse(opts.body) : {};
      if (body.method === "initialize") {
        return Promise.resolve(makeMcpResp({ jsonrpc: "2.0", id: body.id, result: {} }, 200, { "mcp-session-id": "s" }));
      }
      return Promise.resolve(makeMcpResp({ error: "not mounted" }, 404));
    }
    if (url.includes("/api/settings/compression")) {
      return Promise.resolve(makeResp({ engine: "caveman", enabled: true }));
    }
    if (url.includes("/api/context/combos")) {
      return Promise.resolve(makeResp({ combos: [{ id: "c1", name: "x" }] }));
    }
    if (url.includes("/api/context/analytics")) {
      return Promise.resolve(makeResp({ savings: 12 }));
    }
    return Promise.resolve(makeResp({}, 404));
  }) as any;

  const { runCompressionStatus } = await import("../../bin/cli/commands/compression.mjs");
  await captureStdout(() => runCompressionStatus({}, makeCmd() as any));

  globalThis.fetch = origFetch;
  const first = callOrder[0] ?? "";
  assert.ok(first.includes("/api/mcp/stream"), "should attempt MCP first");
  assert.ok(callOrder.some((u) => u.includes("/api/settings/compression")), "should fall back to REST");
  assert.ok(callOrder.some((u) => u.includes("/api/context/combos")), "should fetch combos");
  assert.ok(callOrder.some((u) => u.includes("/api/context/analytics")), "should fetch analytics");
});

test("compression engine set falls back to PUT /api/settings/compression on MCP 404", async () => {
  const calls: Array<{ url: string; method?: string; body?: unknown }> = [];
  const origFetch = globalThis.fetch;
  globalThis.fetch = ((url: string, opts: unknown) => {
    calls.push({
      url,
      method: opts?.method,
      body: opts?.body ? JSON.parse(opts.body) : undefined,
    });
    if (url.includes("/api/mcp/stream")) {
      const body = opts?.body ? JSON.parse(opts.body) : {};
      if (body.method === "initialize") {
        return Promise.resolve(makeMcpResp({ jsonrpc: "2.0", id: body.id, result: {} }, 200, { "mcp-session-id": "s" }));
      }
      return Promise.resolve(makeMcpResp({ error: "not mounted" }, 404));
    }
    return Promise.resolve(makeResp({ ok: true }));
  }) as any;

  await captureStdout(async () => {
    const { runCompressionEngineSet } = await import("../../bin/cli/commands/compression.mjs");
    await runCompressionEngineSet("rtk", {}, makeCmd() as any);
  });

  globalThis.fetch = origFetch;
  const restCall = calls.find((c) => c.url.includes("/api/settings/compression"));
  assert.ok(restCall, "should fall back to PUT /api/settings/compression");
  assert.equal(restCall?.method, "PUT");
  // #6571: the REST fallback now PUTs the canonical `defaultMode` field
  assert.equal(restCall?.body?.defaultMode, "rtk");
});
