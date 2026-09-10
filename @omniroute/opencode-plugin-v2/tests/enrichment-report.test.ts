import { describe, it } from "node:test";
import assert from "node:assert/strict";
import type { Logger } from "../src/shared/index.js";
import { createSourceErrorReporter } from "../src/enrichment-report.js";

function collectingLogger(): { log: Logger; warnings: string[] } {
  const warnings: string[] = [];
  const log = {
    error: () => {},
    warn: (m: string) => warnings.push(m),
    info: () => {},
    debug: () => {},
  } as unknown as Logger;
  return { log, warnings };
}

describe("degraded enrichment is reported, not swallowed", () => {
  it("names the endpoint and what the catalog loses", () => {
    const { log, warnings } = collectingLogger();
    createSourceErrorReporter(log, false)("/api/pricing", "HTTP 500");
    assert.equal(warnings.length, 1);
    assert.match(warnings[0] ?? "", /\/api\/pricing/);
    assert.match(warnings[0] ?? "", /HTTP 500/);
    assert.match(warnings[0] ?? "", /pricing are degraded/);
  });

  it("points a 403 at the management token when the inference key stands in", () => {
    const { log, warnings } = collectingLogger();
    createSourceErrorReporter(log, true)("/api/pricing/models", "HTTP 403");
    assert.match(warnings[0] ?? "", /managementReadToken/);
    assert.match(warnings[0] ?? "", /falls back to "apiKey"/);
  });

  it("does not blame the fallback when a management token was configured", () => {
    const { log, warnings } = collectingLogger();
    createSourceErrorReporter(log, false)("/api/pricing/models", "HTTP 403");
    assert.match(warnings[0] ?? "", /was rejected/);
    assert.doesNotMatch(warnings[0] ?? "", /falls back/);
  });

  it("keeps a transport failure free of auth advice", () => {
    const { log, warnings } = collectingLogger();
    createSourceErrorReporter(log, true)("/api/pricing", "connect ECONNREFUSED");
    assert.doesNotMatch(warnings[0] ?? "", /managementReadToken/);
  });

  it("warns once per endpoint so a refresh loop cannot spam the log", () => {
    const { log, warnings } = collectingLogger();
    const report = createSourceErrorReporter(log, true);
    report("/api/pricing", "HTTP 403");
    report("/api/pricing", "HTTP 403");
    report("/api/free-tier/summary", "HTTP 403");
    assert.equal(warnings.length, 2);
  });
});

describe("the library path reports too, not only the plugin", () => {
  it("passes a refused /api/providers up to the caller through publishCatalog", async () => {
    const { publishCatalog } = await import("../src/catalog.js");
    const seen: Array<[string, string]> = [];
    const origFetch = globalThis.fetch;
    globalThis.fetch = (async (url: unknown) => {
      const href = String(url);
      const ok = (body: unknown) => ({
        ok: true,
        status: 200,
        statusText: "OK",
        json: async () => body,
      });
      if (href.includes("/api/providers"))
        return { ok: false, status: 403, statusText: "Forbidden", json: async () => ({}) };
      if (href.includes("/api/pricing") || href.includes("/api/free-tier"))
        return { ok: false, status: 403, statusText: "Forbidden", json: async () => ({}) };
      if (href.includes("/api/combos")) return ok({ combos: [] });
      return ok({ data: [{ id: "m1" }] });
    }) as unknown as typeof fetch;
    const draft = {
      provider: { update: (_id: string, fn: (p: Record<string, unknown>) => void) => fn({}) },
      model: {
        update: (_p: string, _m: string, fn: (x: Record<string, unknown>) => void) => fn({}),
      },
    };
    try {
      await publishCatalog(
        draft as never,
        {
          providerId: "omni",
          baseURL: "https://gw.example.com",
          apiKey: "k",
          timeoutMs: 1000,
          modelCacheTtlMs: 1000,
          usableOnly: true,
        } as never,
        { onSourceError: (endpoint, reason) => seen.push([endpoint, reason]) }
      );
    } finally {
      globalThis.fetch = origFetch;
    }
    const endpoints = seen.map(([e]) => e);
    assert.ok(
      endpoints.includes("/api/providers"),
      `the usable filter must say it was refused, got ${JSON.stringify(endpoints)}`
    );
    assert.ok(endpoints.some((e) => e.startsWith("/api/pricing")));
  });
});
