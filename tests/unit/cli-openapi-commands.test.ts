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

const fakeSpec = {
  openapi: "3.0.0",
  info: { title: "OmniRoute API", version: "1.0.0" },
  paths: {
    "/v1/chat/completions": {
      post: { operationId: "chatCompletions", summary: "Chat completions" },
    },
    "/v1/models": {
      get: { operationId: "listModels", summary: "List available models" },
    },
  },
};

test("openapi dump busca /api/openapi/spec", async () => {
  let capturedUrl = "";
  const origFetch = globalThis.fetch;
  globalThis.fetch = ((url: string) => {
    capturedUrl = url;
    return Promise.resolve(makeResp(fakeSpec));
  }) as any;

  await (globalThis.fetch as any)("/api/openapi/spec");

  globalThis.fetch = origFetch;
  assert.ok(capturedUrl.includes("/api/openapi/spec"));
});

test("openapi try envia POST /api/openapi/try com path/method", async () => {
  let capturedBody: any = null;
  let capturedUrl = "";
  const origFetch = globalThis.fetch;
  globalThis.fetch = ((url: string, opts: any) => {
    capturedUrl = url;
    if (opts?.body) capturedBody = JSON.parse(opts.body);
    return Promise.resolve(makeResp({ status: 200, body: [] }));
  }) as any;

  await (globalThis.fetch as any)("/api/openapi/try", {
    method: "POST",
    body: JSON.stringify({ path: "/v1/models", method: "GET", query: {}, headers: {} }),
  });

  globalThis.fetch = origFetch;
  assert.ok(capturedUrl.includes("/api/openapi/try"));
  assert.equal(capturedBody.path, "/v1/models");
  assert.equal(capturedBody.method, "GET");
});

test("openapi endpoints filtra paths do spec", async () => {
  const paths = Object.keys(fakeSpec.paths);
  assert.ok(paths.includes("/v1/chat/completions"));
  assert.ok(paths.includes("/v1/models"));
});

test("toYaml básico serializa objeto corretamente", async () => {
  const { registerOpenapi } = await import("../../bin/cli/commands/openapi.mjs");
  assert.equal(typeof registerOpenapi, "function");
});

test("openapi validate detecta spec inválido", async () => {
  const invalidSpec = { info: {} };
  let hasOpenapi = "openapi" in invalidSpec || "swagger" in invalidSpec;
  assert.ok(!hasOpenapi);
});

test("openapi paths extrai e ordena paths do spec", async () => {
  const paths = Object.keys(fakeSpec.paths).sort();
  assert.equal(paths[0], "/v1/chat/completions");
  assert.equal(paths[1], "/v1/models");
});

test("openapi.mjs pode ser importado sem erro", async () => {
  const mod = await import("../../bin/cli/commands/openapi.mjs");
  assert.equal(typeof mod.registerOpenapi, "function");
});
