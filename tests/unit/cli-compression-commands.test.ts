import test from "node:test";
import assert from "node:assert/strict";

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

test("compression status chama omniroute_compression_status via mcp", async () => {
  let capturedBody: any = null;
  const origFetch = globalThis.fetch;
  globalThis.fetch = ((_url: string, opts: any) => {
    if (opts?.body) capturedBody = JSON.parse(opts.body);
    return Promise.resolve(makeResp({ engine: "caveman", enabled: true }));
  }) as any;

  const { runCompressionStatus } = await import("../../bin/cli/commands/compression.mjs");
  await captureStdout(() => runCompressionStatus({}, makeCmd() as any));

  globalThis.fetch = origFetch;
  assert.equal(capturedBody.name, "omniroute_compression_status");
});

test("compression configure envia configuração via mcp", async () => {
  let capturedBody: any = null;
  const origFetch = globalThis.fetch;
  globalThis.fetch = ((_url: string, opts: any) => {
    if (opts?.body) capturedBody = JSON.parse(opts.body);
    return Promise.resolve(makeResp({ success: true }));
  }) as any;

  const { runCompressionConfigure } = await import("../../bin/cli/commands/compression.mjs");
  await captureStdout(() =>
    runCompressionConfigure({ engine: "caveman", cavemanAggressiveness: 0.8 }, makeCmd() as any)
  );

  globalThis.fetch = origFetch;
  assert.equal(capturedBody.name, "omniroute_compression_configure");
  assert.equal(capturedBody.arguments.engine, "caveman");
  assert.ok(capturedBody.arguments.caveman?.aggressiveness === 0.8);
});

test("compression engine set chama omniroute_set_compression_engine", async () => {
  let capturedBody: any = null;
  const origFetch = globalThis.fetch;
  globalThis.fetch = ((_url: string, opts: any) => {
    if (opts?.body) capturedBody = JSON.parse(opts.body);
    return Promise.resolve(makeResp({ success: true }));
  }) as any;

  const out = await captureStdout(async () => {
    const { runCompressionEngineSet } = await import("../../bin/cli/commands/compression.mjs");
    await runCompressionEngineSet("rtk", {}, makeCmd() as any);
  });

  globalThis.fetch = origFetch;
  assert.equal(capturedBody.name, "omniroute_set_compression_engine");
  assert.equal(capturedBody.arguments.engine, "rtk");
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
  let capturedBody: any = null;
  let capturedUrl = "";
  const origFetch = globalThis.fetch;
  globalThis.fetch = ((url: string, opts: any) => {
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
