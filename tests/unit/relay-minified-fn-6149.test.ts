// Regression guard for #6149 — relay worker throws
// `ReferenceError: resolveRelayTarget is not defined` on minified standalone
// (SWC) Docker builds.
//
// Root cause: both the Vercel and Deno relay generators embed the shared SSRF
// guard as a BARE function declaration via `${resolveRelayTarget.toString()}`,
// but the worker body CALLS the hardcoded string literal `resolveRelayTarget(...)`.
// In the SWC-minified standalone build the SOURCE identifier gets mangled, so
// `.toString()` emits `function <mangled>(...)` — the worker defines `<mangled>`
// while the template still calls `resolveRelayTarget` → ReferenceError at runtime.
// Unminified source tests never catch this because the source name is intact.
//
// The fix embeds the guard under a NAME-STABLE binding —
// `const resolveRelayTarget = ${resolveRelayTarget.toString()};` — so the const
// name is a literal in the template (immune to minification) and resolves the
// hardcoded call regardless of the mangled inner function name.
//
// This test reproduces the defect WITHOUT a real build: it simulates the
// minifier by renaming ONLY the embedded guard function's own declared name
// (located precisely via `resolveRelayTarget.toString()`), then eval-runs the
// emitted worker in a `node:vm` sandbox and asserts the handler still resolves
// the guard instead of throwing ReferenceError. A structural assertion (stable
// `const resolveRelayTarget =` binding) backs it up.
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import vm from "node:vm";
import { resolveRelayTarget } from "../../src/app/api/settings/proxy/deno-deploy/route";
import { __buildRelayFunctionForTest } from "../../src/app/api/settings/proxy/vercel-deploy/route";
import { __buildRelayWorkerForTest } from "../../src/app/api/settings/proxy/deno-deploy/route";

const RELAY_AUTH = "testrelayauth";
const TARGET = "https://api.anthropic.com";
const PATH = "/v1/messages";

// Minimal WHATWG-ish stubs so the generated worker can run under node:vm.
class FakeHeaders {
  m: Map<string, string>;
  constructor(init?: FakeHeaders) {
    this.m = new Map();
    if (init && init.m) for (const [k, v] of init.m) this.m.set(k, v);
  }
  get(k: string): string | null {
    const key = k.toLowerCase();
    return this.m.has(key) ? (this.m.get(key) as string) : null;
  }
  set(k: string, v: string): void {
    this.m.set(k.toLowerCase(), v);
  }
  delete(k: string): void {
    this.m.delete(k.toLowerCase());
  }
  forEach(fn: (v: string, k: string) => void): void {
    this.m.forEach((v, k) => fn(v, k));
  }
}

class FakeResponse {
  body: unknown;
  status: number;
  headers: unknown;
  constructor(body: unknown, init?: { status?: number; headers?: unknown }) {
    this.body = body;
    this.status = init?.status ?? 200;
    this.headers = init?.headers;
  }
}

function buildRequest(): { method: string; body: string; headers: FakeHeaders } {
  const headers = new FakeHeaders();
  headers.set("x-relay-auth", RELAY_AUTH);
  headers.set("x-relay-target", TARGET);
  headers.set("x-relay-path", PATH);
  return { method: "POST", body: "payload", headers };
}

/**
 * Simulate the SWC minifier: rename ONLY the embedded guard's declared function
 * name (the source `resolveRelayTarget` identifier that gets mangled), leaving
 * the hardcoded string-literal call sites in the template untouched — exactly
 * what happens in the standalone build.
 */
function minify(worker: string): string {
  const guardSrc = resolveRelayTarget.toString();
  // First occurrence inside the guard source is its own declaration name.
  const mangledGuard = guardSrc.replace("resolveRelayTarget", "m0mangled0m");
  return worker.replace(guardSrc, mangledGuard);
}

async function runWorker(
  worker: string,
  kind: "vercel" | "deno"
): Promise<FakeResponse> {
  const ctx: Record<string, unknown> = {
    URL,
    Headers: FakeHeaders,
    Response: FakeResponse,
    console,
    fetch: async () => ({ body: "ok", status: 200, headers: new FakeHeaders() }),
  };
  let captured: ((req: unknown) => Promise<FakeResponse>) | undefined;
  ctx.Deno = { serve: (h: (req: unknown) => Promise<FakeResponse>) => (captured = h) };
  vm.createContext(ctx);

  let code = worker;
  if (kind === "vercel") {
    code = code
      .replace(/export const config[^\n]*\n/, "")
      .replace("export default async function handler", "__vercelHandler = async function handler");
  }
  vm.runInContext(code, ctx);
  if (kind === "vercel") {
    captured = ctx.__vercelHandler as (req: unknown) => Promise<FakeResponse>;
  }
  assert.ok(captured, `${kind} worker did not register a handler`);
  return captured(buildRequest());
}

describe("#6149 relay worker binds SSRF guard to a stable name", () => {
  it("Vercel worker: emitted source embeds a stable `const resolveRelayTarget =` binding", () => {
    const worker = __buildRelayFunctionForTest(RELAY_AUTH);
    assert.match(
      worker,
      /const\s+resolveRelayTarget\s*=/,
      "worker must bind the guard to a literal const name so minification cannot dangle the call"
    );
  });

  it("Deno worker: emitted source embeds a stable `const resolveRelayTarget =` binding", () => {
    const worker = __buildRelayWorkerForTest(RELAY_AUTH);
    assert.match(worker, /const\s+resolveRelayTarget\s*=/);
  });

  it("Vercel worker: resolves the guard after minification mangles the source fn name", async () => {
    const worker = minify(__buildRelayFunctionForTest(RELAY_AUTH));
    const res = await runWorker(worker, "vercel");
    assert.equal(res.status, 200, "handler must reach the upstream fetch, not throw ReferenceError");
  });

  it("Deno worker: resolves the guard after minification mangles the source fn name", async () => {
    const worker = minify(__buildRelayWorkerForTest(RELAY_AUTH));
    const res = await runWorker(worker, "deno");
    assert.equal(res.status, 200);
  });
});
