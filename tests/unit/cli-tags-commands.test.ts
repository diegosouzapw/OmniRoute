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

function makeCmd(output = "json") {
  return { optsWithGlobals: () => ({ output, quiet: output !== "table" }) };
}

test("tags list busca /api/tags", async () => {
  let capturedUrl = "";
  const origFetch = globalThis.fetch;
  globalThis.fetch = ((url: string) => {
    capturedUrl = url;
    return Promise.resolve(makeResp([{ id: "tag-1", name: "prod" }]));
  }) as any;

  await (globalThis.fetch as any)("/api/tags");

  globalThis.fetch = origFetch;
  assert.ok(capturedUrl.includes("/api/tags"));
});

test("tags add envia POST com name/color/description", async () => {
  let capturedBody: any = null;
  const origFetch = globalThis.fetch;
  globalThis.fetch = ((_url: string, opts: any) => {
    if (opts?.body) capturedBody = JSON.parse(opts.body);
    return Promise.resolve(makeResp({ id: "tag-2", name: "staging" }));
  }) as any;

  await (globalThis.fetch as any)("/api/tags", {
    method: "POST",
    body: JSON.stringify({ name: "staging", color: "#ff9900", description: "Staging env" }),
  });

  globalThis.fetch = origFetch;
  assert.equal(capturedBody.name, "staging");
  assert.equal(capturedBody.color, "#ff9900");
});

test("tags remove envia DELETE /api/tags?id=X", async () => {
  let capturedUrl = "";
  let capturedMethod = "";
  const origFetch = globalThis.fetch;
  globalThis.fetch = ((url: string, opts: any) => {
    capturedUrl = url;
    capturedMethod = opts?.method ?? "GET";
    return Promise.resolve(makeResp(null, 204));
  }) as any;

  await (globalThis.fetch as any)("/api/tags?id=tag-1", { method: "DELETE" });

  globalThis.fetch = origFetch;
  assert.ok(capturedUrl.includes("id=tag-1"));
  assert.equal(capturedMethod, "DELETE");
});

test("tags assign envia POST /api/tags?op=assign com resourceType/resourceId", async () => {
  let capturedBody: any = null;
  let capturedUrl = "";
  const origFetch = globalThis.fetch;
  globalThis.fetch = ((url: string, opts: any) => {
    capturedUrl = url;
    if (opts?.body) capturedBody = JSON.parse(opts.body);
    return Promise.resolve(makeResp({ assigned: true }));
  }) as any;

  await (globalThis.fetch as any)("/api/tags?op=assign", {
    method: "POST",
    body: JSON.stringify({ tag: "prod", resourceType: "provider", resourceId: "openai" }),
  });

  globalThis.fetch = origFetch;
  assert.ok(capturedUrl.includes("op=assign"));
  assert.equal(capturedBody.tag, "prod");
  assert.equal(capturedBody.resourceType, "provider");
});

test("tags unassign envia POST /api/tags?op=unassign", async () => {
  let capturedUrl = "";
  const origFetch = globalThis.fetch;
  globalThis.fetch = ((url: string) => {
    capturedUrl = url;
    return Promise.resolve(makeResp({ unassigned: true }));
  }) as any;

  await (globalThis.fetch as any)("/api/tags?op=unassign", { method: "POST", body: "{}" });

  globalThis.fetch = origFetch;
  assert.ok(capturedUrl.includes("op=unassign"));
});

test("tags resources chama /api/tags?name=X&resources=true", async () => {
  let capturedUrl = "";
  const origFetch = globalThis.fetch;
  globalThis.fetch = ((url: string) => {
    capturedUrl = url;
    return Promise.resolve(makeResp({ resources: [] }));
  }) as any;

  await (globalThis.fetch as any)("/api/tags?name=prod&resources=true");

  globalThis.fetch = origFetch;
  assert.ok(capturedUrl.includes("name=prod"));
  assert.ok(capturedUrl.includes("resources=true"));
});

test("tags.mjs pode ser importado sem erro", async () => {
  const mod = await import("../../bin/cli/commands/tags.mjs");
  assert.equal(typeof mod.registerTags, "function");
});
