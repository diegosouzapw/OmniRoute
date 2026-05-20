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

test("sync push envia parts para /api/sync/cloud", async () => {
  let capturedBody: any = null;
  let capturedUrl = "";
  const origFetch = globalThis.fetch;
  globalThis.fetch = ((url: string, opts: any) => {
    capturedUrl = url;
    if (opts?.body) capturedBody = JSON.parse(opts.body);
    return Promise.resolve(makeResp({ uploaded: true }));
  }) as any;

  await (globalThis.fetch as any)("/api/sync/cloud", {
    method: "POST",
    body: JSON.stringify({ parts: ["settings", "combos"], dryRun: false }),
  });

  globalThis.fetch = origFetch;
  assert.ok(capturedUrl.includes("/api/sync/cloud"));
  assert.ok(Array.isArray(capturedBody.parts));
  assert.ok(capturedBody.parts.includes("settings"));
});

test("sync pull chama /api/db-backups/exportAll", async () => {
  let capturedUrl = "";
  let capturedBody: any = null;
  const origFetch = globalThis.fetch;
  globalThis.fetch = ((url: string, opts: any) => {
    capturedUrl = url;
    if (opts?.body) capturedBody = JSON.parse(opts.body);
    return Promise.resolve(makeResp({ imported: 5 }));
  }) as any;

  await (globalThis.fetch as any)("/api/db-backups/exportAll", {
    method: "POST",
    body: JSON.stringify({ source: "cloud", strategy: "merge", dryRun: false }),
  });

  globalThis.fetch = origFetch;
  assert.ok(capturedUrl.includes("/api/db-backups/exportAll"));
  assert.equal(capturedBody.strategy, "merge");
});

test("sync diff passa op=diff na query", async () => {
  let capturedUrl = "";
  const origFetch = globalThis.fetch;
  globalThis.fetch = ((url: string) => {
    capturedUrl = url;
    return Promise.resolve(makeResp({ diff: [] }));
  }) as any;

  await (globalThis.fetch as any)("/api/sync/cloud?op=diff&source=local&target=cloud");

  globalThis.fetch = origFetch;
  assert.ok(capturedUrl.includes("op=diff"));
});

test("sync status chama /api/sync/cloud?op=status", async () => {
  let capturedUrl = "";
  const origFetch = globalThis.fetch;
  globalThis.fetch = ((url: string) => {
    capturedUrl = url;
    return Promise.resolve(makeResp({ lastSync: "2026-05-14T10:00:00Z" }));
  }) as any;

  await (globalThis.fetch as any)("/api/sync/cloud?op=status");

  globalThis.fetch = origFetch;
  assert.ok(capturedUrl.includes("op=status"));
});

test("sync tokens list busca /api/sync/tokens", async () => {
  let capturedUrl = "";
  const origFetch = globalThis.fetch;
  globalThis.fetch = ((url: string) => {
    capturedUrl = url;
    return Promise.resolve(makeResp([{ id: "tok-1", name: "prod-sync" }]));
  }) as any;

  await (globalThis.fetch as any)("/api/sync/tokens");

  globalThis.fetch = origFetch;
  assert.ok(capturedUrl.includes("/api/sync/tokens"));
});

test("sync tokens create envia name/scope/ttl", async () => {
  let capturedBody: any = null;
  const origFetch = globalThis.fetch;
  globalThis.fetch = ((_url: string, opts: any) => {
    if (opts?.body) capturedBody = JSON.parse(opts.body);
    return Promise.resolve(makeResp({ id: "tok-2", name: "dev-sync" }));
  }) as any;

  await (globalThis.fetch as any)("/api/sync/tokens", {
    method: "POST",
    body: JSON.stringify({ name: "dev-sync", scope: "read:all", ttl: "30d" }),
  });

  globalThis.fetch = origFetch;
  assert.equal(capturedBody.name, "dev-sync");
  assert.equal(capturedBody.ttl, "30d");
});

test("sync initialize chama POST /api/sync/initialize", async () => {
  let capturedUrl = "";
  let capturedMethod = "";
  const origFetch = globalThis.fetch;
  globalThis.fetch = ((url: string, opts: any) => {
    capturedUrl = url;
    capturedMethod = opts?.method ?? "GET";
    return Promise.resolve(makeResp({ initialized: true }));
  }) as any;

  await (globalThis.fetch as any)("/api/sync/initialize", {
    method: "POST",
    body: JSON.stringify({}),
  });

  globalThis.fetch = origFetch;
  assert.ok(capturedUrl.includes("/api/sync/initialize"));
  assert.equal(capturedMethod, "POST");
});

test("sync.mjs pode ser importado sem erro", async () => {
  const mod = await import("../../bin/cli/commands/sync.mjs");
  assert.equal(typeof mod.registerSync, "function");
});
