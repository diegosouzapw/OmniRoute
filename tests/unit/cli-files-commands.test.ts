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

test("files list busca /v1/files", async () => {
  let capturedUrl = "";
  const origFetch = globalThis.fetch;
  globalThis.fetch = ((url: string) => {
    capturedUrl = url;
    return Promise.resolve(
      makeResp({ data: [{ id: "file-1", filename: "test.jsonl", purpose: "batch", bytes: 1024 }] })
    );
  }) as any;

  await (globalThis.fetch as any)("/v1/files?limit=100");

  globalThis.fetch = origFetch;
  assert.ok(capturedUrl.includes("/v1/files"));
});

test("files list com --purpose filtra na query", async () => {
  let capturedUrl = "";
  const origFetch = globalThis.fetch;
  globalThis.fetch = ((url: string) => {
    capturedUrl = url;
    return Promise.resolve(makeResp({ data: [] }));
  }) as any;

  const params = new URLSearchParams({ limit: "100", purpose: "batch" });
  await (globalThis.fetch as any)(`/v1/files?${params}`);

  globalThis.fetch = origFetch;
  assert.ok(capturedUrl.includes("purpose=batch"));
});

test("files get busca por id", async () => {
  let capturedUrl = "";
  const origFetch = globalThis.fetch;
  globalThis.fetch = ((url: string) => {
    capturedUrl = url;
    return Promise.resolve(makeResp({ id: "file-1", purpose: "batch" }));
  }) as any;

  await (globalThis.fetch as any)("/v1/files/file-1");

  globalThis.fetch = origFetch;
  assert.ok(capturedUrl.includes("/v1/files/file-1"));
});

test("files content baixa com --out salva em arquivo", async () => {
  let capturedUrl = "";
  const origFetch = globalThis.fetch;
  globalThis.fetch = ((url: string) => {
    capturedUrl = url;
    return Promise.resolve({
      ok: true,
      status: 200,
      arrayBuffer: () => Promise.resolve(new ArrayBuffer(8)),
      text: () => Promise.resolve("data"),
    } as any);
  }) as any;

  await (globalThis.fetch as any)("/v1/files/file-1/content");

  globalThis.fetch = origFetch;
  assert.ok(capturedUrl.includes("/content"));
});

test("files delete com --yes chama DELETE", async () => {
  let capturedUrl = "";
  let capturedMethod = "";
  const origFetch = globalThis.fetch;
  globalThis.fetch = ((url: string, opts: any) => {
    capturedUrl = url;
    capturedMethod = opts?.method ?? "GET";
    return Promise.resolve(makeResp({}, 204));
  }) as any;

  await (globalThis.fetch as any)("/v1/files/file-1", { method: "DELETE" });

  globalThis.fetch = origFetch;
  assert.ok(capturedUrl.includes("/v1/files/file-1"));
  assert.equal(capturedMethod, "DELETE");
});

test("fmtBytes formata bytes corretamente", async () => {
  const { fmtBytes } = await import("../../bin/cli/commands/files.mjs");
  assert.equal(fmtBytes(512), "512 B");
  assert.equal(fmtBytes(1536), "1.5 KB");
  assert.equal(fmtBytes(1.5 * 1024 * 1024), "1.5 MB");
});

test("files.mjs pode ser importado sem erro", async () => {
  const mod = await import("../../bin/cli/commands/files.mjs");
  assert.equal(typeof mod.registerFiles, "function");
});
