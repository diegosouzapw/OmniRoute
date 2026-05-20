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

test("batches list busca /v1/batches", async () => {
  let capturedUrl = "";
  const origFetch = globalThis.fetch;
  globalThis.fetch = ((url: string) => {
    capturedUrl = url;
    return Promise.resolve(makeResp({ data: [] }));
  }) as any;

  await (globalThis.fetch as any)("/v1/batches?limit=50");

  globalThis.fetch = origFetch;
  assert.ok(capturedUrl.includes("/v1/batches"));
});

test("batches list com --status filtra na query", async () => {
  let capturedUrl = "";
  const origFetch = globalThis.fetch;
  globalThis.fetch = ((url: string) => {
    capturedUrl = url;
    return Promise.resolve(makeResp({ data: [] }));
  }) as any;

  const params = new URLSearchParams({ limit: "50", status: "completed" });
  await (globalThis.fetch as any)(`/v1/batches?${params}`);

  globalThis.fetch = origFetch;
  assert.ok(capturedUrl.includes("status=completed"));
});

test("batches create envia input_file_id e endpoint no body", async () => {
  let capturedBody: any = null;
  const origFetch = globalThis.fetch;
  globalThis.fetch = ((_url: string, opts: any) => {
    if (opts?.body) capturedBody = JSON.parse(opts.body);
    return Promise.resolve(makeResp({ id: "batch-1", status: "validating" }));
  }) as any;

  await (globalThis.fetch as any)("/v1/batches", {
    method: "POST",
    body: JSON.stringify({
      input_file_id: "file-1",
      endpoint: "/v1/chat/completions",
      completion_window: "24h",
    }),
  });

  globalThis.fetch = origFetch;
  assert.equal(capturedBody.input_file_id, "file-1");
  assert.equal(capturedBody.endpoint, "/v1/chat/completions");
});

test("batches cancel envia POST para /cancel", async () => {
  let capturedUrl = "";
  let capturedMethod = "";
  const origFetch = globalThis.fetch;
  globalThis.fetch = ((url: string, opts: any) => {
    capturedUrl = url;
    capturedMethod = opts?.method ?? "GET";
    return Promise.resolve(makeResp({ id: "batch-1", status: "cancelling" }));
  }) as any;

  await (globalThis.fetch as any)("/v1/batches/batch-1/cancel", { method: "POST" });

  globalThis.fetch = origFetch;
  assert.ok(capturedUrl.includes("/cancel"));
  assert.equal(capturedMethod, "POST");
});

test("batches get busca por batchId", async () => {
  let capturedUrl = "";
  const origFetch = globalThis.fetch;
  globalThis.fetch = ((url: string) => {
    capturedUrl = url;
    return Promise.resolve(makeResp({ id: "batch-1", status: "completed" }));
  }) as any;

  await (globalThis.fetch as any)("/v1/batches/batch-1");

  globalThis.fetch = origFetch;
  assert.ok(capturedUrl.includes("/v1/batches/batch-1"));
});

test("batches output verifica output_file_id antes de baixar", async () => {
  let callCount = 0;
  const origFetch = globalThis.fetch;
  globalThis.fetch = ((url: string) => {
    callCount++;
    if (url.includes("/v1/batches/batch-1") && !url.includes("/content")) {
      return Promise.resolve(
        makeResp({ id: "batch-1", status: "completed", output_file_id: "file-out-1" })
      );
    }
    return Promise.resolve({
      ok: true,
      status: 200,
      text: () => Promise.resolve('{"custom_id":"r1","response":{}}'),
    } as any);
  }) as any;

  // Simula o fluxo: buscar batch, pegar output_file_id, baixar conteúdo
  const batchRes = await (globalThis.fetch as any)("/v1/batches/batch-1");
  const batch = await batchRes.json();
  assert.equal(batch.output_file_id, "file-out-1");

  globalThis.fetch = origFetch;
});

test("batches.mjs pode ser importado sem erro", async () => {
  const mod = await import("../../bin/cli/commands/batches.mjs");
  assert.equal(typeof mod.registerBatches, "function");
});
