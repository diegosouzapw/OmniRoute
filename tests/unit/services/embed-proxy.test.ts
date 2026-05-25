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
  HEAD,
  OPTIONS,
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

  // ─── G-05: cookie/auth strip + response header strip + HTML rewrite ──────────

  it("G-05: strips cookie header before forwarding to upstream", async () => {
    registerFake("running", 20130);
    let capturedHeaders: Record<string, string> = {};
    globalThis.fetch = async (_input: string | URL | Request, init?: RequestInit) => {
      for (const [k, v] of new Headers(init?.headers as HeadersInit).entries()) {
        capturedHeaders[k.toLowerCase()] = v;
      }
      return new Response("ok", { status: 200 });
    };

    const req = new Request("http://localhost/dashboard/providers/services/9router/embed/", {
      headers: { cookie: "session=abc123; jwt=secret" },
    });
    await GET(req, makeFakeParams("9router", []));
    assert.equal(capturedHeaders["cookie"], undefined, "cookie must not be forwarded upstream");
  });

  it("G-05: sets Authorization: Bearer on upstream request", async () => {
    registerFake("running", 20130);
    let capturedAuth: string | undefined;
    globalThis.fetch = async (_input: string | URL | Request, init?: RequestInit) => {
      capturedAuth = new Headers(init?.headers as HeadersInit).get("authorization") ?? undefined;
      return new Response("ok", { status: 200 });
    };

    const req = new Request("http://localhost/dashboard/providers/services/9router/embed/");
    await GET(req, makeFakeParams("9router", []));
    assert.ok(capturedAuth, "authorization header must be present");
    assert.ok(capturedAuth!.startsWith("Bearer "), "authorization must be a Bearer token");
  });

  it("G-05: strips client Authorization before forwarding, injects service key instead", async () => {
    registerFake("running", 20130);
    let capturedAuth: string | undefined;
    globalThis.fetch = async (_input: string | URL | Request, init?: RequestInit) => {
      capturedAuth = new Headers(init?.headers as HeadersInit).get("authorization") ?? undefined;
      return new Response("ok", { status: 200 });
    };

    const req = new Request("http://localhost/dashboard/providers/services/9router/embed/", {
      headers: { authorization: "Bearer client-token-should-not-leak" },
    });
    await GET(req, makeFakeParams("9router", []));
    assert.ok(capturedAuth, "authorization header must be set");
    assert.notEqual(
      capturedAuth,
      "Bearer client-token-should-not-leak",
      "client authorization must not be forwarded as-is"
    );
  });

  it("G-05: strips set-cookie from upstream response", async () => {
    registerFake("running", 20130);
    globalThis.fetch = async () =>
      new Response("ok", {
        status: 200,
        headers: { "set-cookie": "session=upstream; Path=/", "content-type": "text/plain" },
      });

    const resp = await GET(
      new Request("http://localhost/dashboard/providers/services/9router/embed/"),
      makeFakeParams("9router", [])
    );
    assert.equal(resp.headers.get("set-cookie"), null, "set-cookie must be stripped from response");
  });

  it("G-05: strips x-frame-options from upstream response", async () => {
    registerFake("running", 20130);
    globalThis.fetch = async () =>
      new Response("ok", {
        status: 200,
        headers: { "x-frame-options": "DENY", "content-type": "text/plain" },
      });

    const resp = await GET(
      new Request("http://localhost/dashboard/providers/services/9router/embed/"),
      makeFakeParams("9router", [])
    );
    assert.equal(resp.headers.get("x-frame-options"), null, "x-frame-options must be stripped");
  });

  it("G-05: strips content-security-policy from upstream response", async () => {
    registerFake("running", 20130);
    globalThis.fetch = async () =>
      new Response("ok", {
        status: 200,
        headers: {
          "content-security-policy": "default-src 'none'",
          "content-type": "text/plain",
        },
      });

    const resp = await GET(
      new Request("http://localhost/dashboard/providers/services/9router/embed/"),
      makeFakeParams("9router", [])
    );
    assert.equal(
      resp.headers.get("content-security-policy"),
      null,
      "content-security-policy must be stripped"
    );
  });

  it("G-05: strips cross-origin-* headers from upstream response", async () => {
    registerFake("running", 20130);
    globalThis.fetch = async () =>
      new Response("ok", {
        status: 200,
        headers: {
          "cross-origin-embedder-policy": "require-corp",
          "cross-origin-opener-policy": "same-origin",
          "cross-origin-resource-policy": "same-site",
          "content-type": "text/plain",
        },
      });

    const resp = await GET(
      new Request("http://localhost/dashboard/providers/services/9router/embed/"),
      makeFakeParams("9router", [])
    );
    assert.equal(
      resp.headers.get("cross-origin-embedder-policy"),
      null,
      "cross-origin-embedder-policy must be stripped"
    );
    assert.equal(
      resp.headers.get("cross-origin-opener-policy"),
      null,
      "cross-origin-opener-policy must be stripped"
    );
    assert.equal(
      resp.headers.get("cross-origin-resource-policy"),
      null,
      "cross-origin-resource-policy must be stripped"
    );
  });

  it("G-05: HTML response is rewritten — contains injected <base href>", async () => {
    registerFake("running", 20130);
    globalThis.fetch = async () =>
      new Response('<html><head></head><body><a href="/dashboard">link</a></body></html>', {
        status: 200,
        headers: { "content-type": "text/html; charset=utf-8" },
      });

    const resp = await GET(
      new Request("http://localhost/dashboard/providers/services/9router/embed/"),
      makeFakeParams("9router", [])
    );
    const body = await resp.text();
    assert.ok(
      body.includes('<base href="/dashboard/providers/services/9router/embed/">'),
      `Expected <base href> in rewritten HTML. Got: ${body.substring(0, 200)}`
    );
  });

  it("G-05: HTML response rewrites path-absolute links to go through proxy", async () => {
    registerFake("running", 20130);
    globalThis.fetch = async () =>
      new Response('<html><head></head><body><a href="/ui/page">x</a></body></html>', {
        status: 200,
        headers: { "content-type": "text/html" },
      });

    const resp = await GET(
      new Request("http://localhost/dashboard/providers/services/9router/embed/"),
      makeFakeParams("9router", [])
    );
    const body = await resp.text();
    assert.ok(
      body.includes('href="/dashboard/providers/services/9router/embed/ui/page"'),
      `Expected rewritten href. Got: ${body.substring(0, 300)}`
    );
  });

  it("G-05: JSON response is NOT rewritten (streaming pass-through)", async () => {
    registerFake("running", 20130);
    const jsonPayload = '{"models":["gpt-4","claude-3"]}';
    globalThis.fetch = async () =>
      new Response(jsonPayload, {
        status: 200,
        headers: { "content-type": "application/json" },
      });

    const resp = await GET(
      new Request("http://localhost/dashboard/providers/services/9router/embed/api/models"),
      makeFakeParams("9router", ["api", "models"])
    );
    const body = await resp.text();
    assert.equal(body, jsonPayload, "JSON response must pass through unchanged");
  });

  it("G-05: HEAD method is handled", async () => {
    registerFake("running", 20130);
    globalThis.fetch = async () =>
      new Response(null, { status: 200, headers: { "content-type": "text/html" } });

    const req = new Request("http://localhost/dashboard/providers/services/9router/embed/", {
      method: "HEAD",
    });
    const resp = await HEAD(req, makeFakeParams("9router", []));
    assert.equal(resp.status, 200);
  });

  it("G-05: OPTIONS method is handled", async () => {
    registerFake("running", 20130);
    globalThis.fetch = async () =>
      new Response(null, {
        status: 204,
        headers: { allow: "GET, HEAD, POST, OPTIONS" },
      });

    const req = new Request("http://localhost/dashboard/providers/services/9router/embed/", {
      method: "OPTIONS",
    });
    const resp = await OPTIONS(req, makeFakeParams("9router", []));
    assert.equal(resp.status, 204);
  });
});
