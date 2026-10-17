import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import plugin from "../src/index.js";

// Guard around the provider publish: fetcher-level fail-open covers fetch
// rejections, but a mapper throw or a host throw in `editor.add` would reject
// the setup (unhandled rejection). The guard must warn + resolve instead.
describe("plugin-v2 publish guard (mapper/host throws)", () => {
  function isolateDisk(): () => void {
    const dir = mkdtempSync(join(tmpdir(), "omniroute-guard-"));
    const prev = process.env.OPENCODE_DATA_DIR;
    process.env.OPENCODE_DATA_DIR = dir;
    return () => {
      if (prev === undefined) delete process.env.OPENCODE_DATA_DIR;
      else process.env.OPENCODE_DATA_DIR = prev;
    };
  }
  function setupCtx(add: (input: unknown) => void): {
    ctx: Record<string, unknown>;
  } {
    const ctx = {
      options: { baseURL: "https://gw.example.com", providerId: "omniroute", apiKey: "k" },
      provider: {
        transform: (cb: (editor: { add: (input: unknown) => void }) => void) => {
          cb({ add });
          return Promise.resolve({ dispose: async () => {} });
        },
        reload: async () => {},
      },
      model: {
        transform: () => Promise.resolve({ dispose: async () => {} }),
      },
      integration: {
        transform: () => Promise.resolve({ dispose: async () => {} }),
      },
    };
    return { ctx };
  }

  function stubFetch(): typeof fetch {
    return (async (url: unknown) => {
      const href = String(url);
      void href;
      return {
        ok: true,
        status: 200,
        statusText: "OK",
        json: async () => ({ data: [{ id: "m1" }] }),
      };
    }) as typeof fetch;
  }

  async function silenceConsole<T>(fn: () => Promise<T>): Promise<{ result: T; warns: string[] }> {
    const warns: string[] = [];
    const origWarn = console.warn;
    const origLog = console.log;
    console.warn = (...args: unknown[]) => {
      warns.push(String(args[0]));
    };
    console.log = () => {};
    try {
      const result = await fn();
      return { result, warns };
    } finally {
      console.warn = origWarn;
      console.log = origLog;
    }
  }

  it("host throw in editor.add: setup resolves + warns, never rejects", async () => {
    const restoreDisk = isolateDisk();
    const { ctx } = setupCtx(() => {
      throw new Error("host boom");
    });
    const origFetch = globalThis.fetch;
    globalThis.fetch = stubFetch();
    try {
      const { warns } = await silenceConsole(async () => {
        // MUST resolve — without the guard this rejects with "host boom".
        await (plugin as unknown as { setup: (ctx: unknown) => Promise<void> }).setup(ctx);
      });
      assert.ok(
        warns.some((w) => w.includes("catalog publish failed") && w.includes("host boom")),
        `expected a publish-guard warn, got: ${JSON.stringify(warns)}`
      );
    } finally {
      globalThis.fetch = origFetch;
      restoreDisk();
    }
  });

  it("requests exactly the declared refresh routes, never the retired one", async () => {
    const { isDeclaredRefreshPath } = await import("../src/catalog.js");
    const restoreDisk = isolateDisk();
    const { ctx } = setupCtx(() => {});
    const requested: string[] = [];
    const origFetch = globalThis.fetch;
    globalThis.fetch = (async (url: unknown) => {
      const href = String(url);
      requested.push(new URL(href).pathname);
      if (href.includes("/api/pricing") || href.includes("/api/free-tier")) {
        return { ok: true, status: 200, statusText: "OK", json: async () => ({}) };
      }
      return {
        ok: true,
        status: 200,
        statusText: "OK",
        json: async () => ({ data: [{ id: "m1" }] }),
      };
    }) as typeof fetch;
    try {
      await silenceConsole(async () => {
        await (plugin as unknown as { setup: (ctx: unknown) => Promise<void> }).setup(ctx);
      });
      assert.ok(requested.length > 0, "setup must issue refresh requests");
      for (const pathname of requested) {
        assert.equal(
          isDeclaredRefreshPath(pathname),
          true,
          `unexpected refresh path ${pathname} in ${JSON.stringify(requested)}`
        );
      }
      assert.ok(
        !requested.some((pathname) => pathname === "/api/combos"),
        `retired route must never be requested, got ${JSON.stringify(requested)}`
      );
    } finally {
      globalThis.fetch = origFetch;
      restoreDisk();
    }
  });
});
