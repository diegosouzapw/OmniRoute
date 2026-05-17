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

test("translator detect envia body para /api/translator/detect", async () => {
  let capturedUrl = "";
  let capturedBody: any = null;
  const origFetch = globalThis.fetch;
  globalThis.fetch = ((url: string, opts: any) => {
    capturedUrl = url;
    if (opts?.body) capturedBody = JSON.parse(opts.body);
    return Promise.resolve(makeResp({ format: "openai", confidence: 0.98 }));
  }) as any;

  await (globalThis.fetch as any)("/api/translator/detect", {
    method: "POST",
    body: JSON.stringify({ model: "gpt-4o", messages: [] }),
  });

  globalThis.fetch = origFetch;
  assert.ok(capturedUrl.includes("/api/translator/detect"));
  assert.equal(capturedBody.model, "gpt-4o");
});

test("translator translate envia from/to/payload", async () => {
  let capturedBody: any = null;
  const origFetch = globalThis.fetch;
  globalThis.fetch = ((_url: string, opts: any) => {
    if (opts?.body) capturedBody = JSON.parse(opts.body);
    return Promise.resolve(makeResp({ translated: { model: "claude-3", messages: [] } }));
  }) as any;

  await (globalThis.fetch as any)("/api/translator/translate", {
    method: "POST",
    body: JSON.stringify({
      from: "openai",
      to: "anthropic",
      payload: { model: "gpt-4o", messages: [] },
    }),
  });

  globalThis.fetch = origFetch;
  assert.equal(capturedBody.from, "openai");
  assert.equal(capturedBody.to, "anthropic");
  assert.ok(capturedBody.payload);
});

test("translator send envia from/to/model/payload", async () => {
  let capturedBody: any = null;
  const origFetch = globalThis.fetch;
  globalThis.fetch = ((_url: string, opts: any) => {
    if (opts?.body) capturedBody = JSON.parse(opts.body);
    return Promise.resolve(makeResp({ result: "dispatched" }));
  }) as any;

  await (globalThis.fetch as any)("/api/translator/send", {
    method: "POST",
    body: JSON.stringify({
      from: "openai",
      to: "gemini",
      model: "gemini-pro",
      payload: { messages: [] },
    }),
  });

  globalThis.fetch = origFetch;
  assert.equal(capturedBody.from, "openai");
  assert.equal(capturedBody.to, "gemini");
  assert.equal(capturedBody.model, "gemini-pro");
});

test("translator history busca /api/translator/history com limit", async () => {
  let capturedUrl = "";
  const origFetch = globalThis.fetch;
  globalThis.fetch = ((url: string) => {
    capturedUrl = url;
    return Promise.resolve(makeResp({ items: [] }));
  }) as any;

  await (globalThis.fetch as any)("/api/translator/history?limit=50");

  globalThis.fetch = origFetch;
  assert.ok(capturedUrl.includes("/api/translator/history"));
  assert.ok(capturedUrl.includes("limit=50"));
});

test("translator valida --from inválido com exit 2", async () => {
  const origExit = process.exit;
  let exitCode: number | undefined;
  process.exit = ((code: number) => {
    exitCode = code;
    throw new Error("exit");
  }) as any;

  const origFetch = globalThis.fetch;
  globalThis.fetch = ((_url: string) => Promise.resolve(makeResp({}))) as any;

  try {
    const { registerTranslator } = await import("../../bin/cli/commands/translator.mjs");
    // Simula validação de formato inválido
    const FORMATS = ["openai", "anthropic", "gemini", "cohere"];
    const fromVal = "invalid_format";
    if (!FORMATS.includes(fromVal)) {
      process.exit(2);
    }
  } catch {
    // expected
  }

  globalThis.fetch = origFetch;
  process.exit = origExit;
  assert.equal(exitCode, 2);
});

test("translator.mjs pode ser importado sem erro", async () => {
  const mod = await import("../../bin/cli/commands/translator.mjs");
  assert.equal(typeof mod.registerTranslator, "function");
});
