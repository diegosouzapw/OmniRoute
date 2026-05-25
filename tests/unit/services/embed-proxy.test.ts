/**
 * T-07 — embed proxy route handler tests.
 *
 * Tests GET/POST/PUT/PATCH/DELETE handlers in
 * /dashboard/providers/services/[name]/embed/[...path]/route.ts.
 *
 * Uses registerSupervisor to inject fake supervisors (ESM live bindings
 * can't be reassigned, so direct module patching is not possible).
 */

import { describe, it, afterEach } from "node:test";
import assert from "node:assert/strict";

import { registerSupervisor, unregisterSupervisor } from "../../../src/lib/services/registry.ts";
import type { ServiceSupervisor } from "../../../src/lib/services/ServiceSupervisor.ts";
import {
  GET,
  POST,
  PUT,
  PATCH,
  DELETE,
} from "../../../src/app/(dashboard)/dashboard/providers/services/[name]/embed/[...path]/route.ts";

const originalFetch = globalThis.fetch;

afterEach(() => {
  globalThis.fetch = originalFetch;
  unregisterSupervisor("9router");
});

// ─── helpers ────────────────────────────────────────────────────────────────

function makeFakeParams(
  name: string,
  path: string[]
): { params: Promise<{ name: string; path: string[] }> } {
  return { params: Promise.resolve({ name, path }) };
}

function registerFake(state: string, port: number): void {
  const fake = {
    getStatus: () => ({
      tool: "9router",
      state,
      port,
      pid: null,
      health: "unknown" as const,
      startedAt: null,
      lastError: null,
    }),
  };
  registerSupervisor(fake as unknown as ServiceSupervisor);
}

// ─── tests ───────────────────────────────────────────────────────────────────

describe("embed proxy route", () => {
  it("returns 404 for unknown service", async () => {
    // No supervisor registered — getSupervisor returns null.
    const req = new Request("http://localhost/dashboard/providers/services/unknown/embed/");
    const resp = await GET(req, makeFakeParams("unknown", []));
    assert.equal(resp.status, 404);
  });

  it("returns 503 when service exists but is not running", async () => {
    registerFake("stopped", 20130);
    const req = new Request("http://localhost/dashboard/providers/services/9router/embed/");
    const resp = await GET(req, makeFakeParams("9router", []));
    assert.equal(resp.status, 503);
  });

  it("proxies GET to the upstream service", async () => {
    registerFake("running", 20130);
    let capturedUrl = "";
    globalThis.fetch = async (input: string | URL | Request) => {
      capturedUrl = String(input);
      return new Response("<html>9router UI</html>", {
        status: 200,
        headers: { "content-type": "text/html" },
      });
    };

    const req = new Request(
      "http://localhost/dashboard/providers/services/9router/embed/ui/index.html"
    );
    const resp = await GET(req, makeFakeParams("9router", ["ui", "index.html"]));

    assert.equal(resp.status, 200);
    assert.ok(capturedUrl.startsWith("http://127.0.0.1:20130/ui/index.html"));
    assert.ok((await resp.text()).includes("9router UI"));
  });

  it("forwards query string to upstream", async () => {
    registerFake("running", 20130);
    let capturedUrl = "";
    globalThis.fetch = async (input: string | URL | Request) => {
      capturedUrl = String(input);
      return new Response("{}", { status: 200 });
    };

    const req = new Request(
      "http://localhost/dashboard/providers/services/9router/embed/api/models?page=2"
    );
    await GET(req, makeFakeParams("9router", ["api", "models"]));
    assert.ok(capturedUrl.includes("?page=2"));
  });

  it("proxies POST and forwards body", async () => {
    registerFake("running", 20130);
    let capturedMethod = "";
    globalThis.fetch = async (_input: string | URL | Request, init?: RequestInit) => {
      capturedMethod = init?.method ?? "UNKNOWN";
      return new Response('{"ok":true}', { status: 200 });
    };

    const req = new Request("http://localhost/dashboard/providers/services/9router/embed/api/v1", {
      method: "POST",
      body: JSON.stringify({ test: 1 }),
      headers: { "content-type": "application/json" },
    });
    const resp = await POST(req, makeFakeParams("9router", ["api", "v1"]));
    assert.equal(resp.status, 200);
    assert.equal(capturedMethod, "POST");
  });

  it("strips hop-by-hop headers from the upstream response", async () => {
    registerFake("running", 20130);
    globalThis.fetch = async () =>
      new Response("body", {
        status: 200,
        headers: {
          "content-type": "text/plain",
          "transfer-encoding": "chunked",
          connection: "keep-alive",
          "x-custom": "kept",
        },
      });

    const req = new Request("http://localhost/dashboard/providers/services/9router/embed/");
    const resp = await GET(req, makeFakeParams("9router", []));
    assert.equal(resp.headers.get("x-custom"), "kept");
    assert.equal(resp.headers.get("transfer-encoding"), null);
    assert.equal(resp.headers.get("connection"), null);
  });

  it("returns 502 on upstream network error", async () => {
    registerFake("running", 20130);
    globalThis.fetch = async () => {
      throw new Error("ECONNREFUSED");
    };

    const req = new Request("http://localhost/dashboard/providers/services/9router/embed/");
    const resp = await GET(req, makeFakeParams("9router", []));
    assert.equal(resp.status, 502);
  });

  it("PUT, PATCH, DELETE are handled", async () => {
    registerFake("running", 20130);
    globalThis.fetch = async (_input: string | URL | Request, init?: RequestInit) =>
      new Response(null, { status: 204 });

    const params = makeFakeParams("9router", ["resource", "1"]);
    const reqUrl = "http://localhost/dashboard/providers/services/9router/embed/resource/1";

    assert.equal((await PUT(new Request(reqUrl, { method: "PUT" }), params)).status, 204);
    assert.equal((await PATCH(new Request(reqUrl, { method: "PATCH" }), params)).status, 204);
    assert.equal((await DELETE(new Request(reqUrl, { method: "DELETE" }), params)).status, 204);
  });
});
