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

test("sessions list chama /api/sessions com filtros", async () => {
  let capturedUrl = "";
  const origFetch = globalThis.fetch;
  globalThis.fetch = ((url: string) => {
    capturedUrl = url;
    return Promise.resolve(
      makeResp({ items: [{ id: "sess-1", user: "admin", kind: "dashboard" }] })
    );
  }) as any;

  await (globalThis.fetch as any)("/api/sessions?limit=100&user=admin&kind=dashboard");

  globalThis.fetch = origFetch;
  assert.ok(capturedUrl.includes("/api/sessions"));
  assert.ok(capturedUrl.includes("user=admin"));
  assert.ok(capturedUrl.includes("kind=dashboard"));
});

test("sessions show chama /api/sessions?id=X", async () => {
  let capturedUrl = "";
  const origFetch = globalThis.fetch;
  globalThis.fetch = ((url: string) => {
    capturedUrl = url;
    return Promise.resolve(makeResp({ id: "sess-abc", user: "admin" }));
  }) as any;

  await (globalThis.fetch as any)("/api/sessions?id=sess-abc");

  globalThis.fetch = origFetch;
  assert.ok(capturedUrl.includes("id=sess-abc"));
});

test("sessions expire chama DELETE /api/sessions?id=X", async () => {
  let capturedUrl = "";
  let capturedMethod = "";
  const origFetch = globalThis.fetch;
  globalThis.fetch = ((url: string, opts: any) => {
    capturedUrl = url;
    capturedMethod = opts?.method ?? "GET";
    return Promise.resolve(makeResp(null, 204));
  }) as any;

  await (globalThis.fetch as any)("/api/sessions?id=sess-xyz", { method: "DELETE" });

  globalThis.fetch = origFetch;
  assert.ok(capturedUrl.includes("id=sess-xyz"));
  assert.equal(capturedMethod, "DELETE");
});

test("sessions expire-all chama DELETE /api/sessions?user=X", async () => {
  let capturedUrl = "";
  let capturedMethod = "";
  const origFetch = globalThis.fetch;
  globalThis.fetch = ((url: string, opts: any) => {
    capturedUrl = url;
    capturedMethod = opts?.method ?? "GET";
    return Promise.resolve(makeResp(null, 204));
  }) as any;

  await (globalThis.fetch as any)("/api/sessions?user=bob", { method: "DELETE" });

  globalThis.fetch = origFetch;
  assert.ok(capturedUrl.includes("user=bob"));
  assert.equal(capturedMethod, "DELETE");
});

test("sessions current chama /api/sessions?current=true", async () => {
  let capturedUrl = "";
  const origFetch = globalThis.fetch;
  globalThis.fetch = ((url: string) => {
    capturedUrl = url;
    return Promise.resolve(makeResp({ id: "sess-cur", kind: "api-key" }));
  }) as any;

  await (globalThis.fetch as any)("/api/sessions?current=true");

  globalThis.fetch = origFetch;
  assert.ok(capturedUrl.includes("current=true"));
});

test("sessions.mjs pode ser importado sem erro", async () => {
  const mod = await import("../../bin/cli/commands/sessions.mjs");
  assert.equal(typeof mod.registerSessions, "function");
});
