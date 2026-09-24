import { describe, it } from "node:test";
import assert from "node:assert/strict";
import plugin from "../src/index.js";
import { snapshotIdentityFingerprint, writeDiskSnapshot } from "../src/cache.js";

/**
 * The recommended setup stores the gateway key in the host's credential store,
 * so the key the plugin ends up using is not the one its options carry. The
 * disk snapshot is keyed by that credential: reading it before the credential
 * is resolved looks up the wrong identity and throws away a usable catalog —
 * exactly when it is needed, on a cold start against an unreachable gateway.
 */
describe("warm snapshot is read under the credential actually in use", () => {
  it("serves the snapshot written for the host credential, gateway down", async () => {
    const { mkdtempSync } = await import("node:fs");
    const { tmpdir } = await import("node:os");
    const { join } = await import("node:path");
    const dir = mkdtempSync(join(tmpdir(), "omniroute-warm-id-"));
    const prevDir = process.env.OPENCODE_DATA_DIR;
    process.env.OPENCODE_DATA_DIR = dir;
    const origFetch = globalThis.fetch;
    globalThis.fetch = (async () => {
      throw new Error("gateway unreachable");
    }) as unknown as typeof fetch;
    const warn = console.warn;
    const log = console.log;
    console.warn = () => {};
    console.log = () => {};
    try {
      const baseURL = "https://gw.example.com";
      const hostKey = "key-from-the-host-store";
      await writeDiskSnapshot(
        "warmid",
        {
          models: [{ id: "m-snap" }],
          combos: [],
          autoCombos: [],
          providers: [],
          fetchedAt: Date.now(),
        } as never,
        snapshotIdentityFingerprint(baseURL, hostKey, hostKey)
      );

      const added: unknown[] = [];
      const registration = Promise.resolve({ dispose: async () => {} });
      const ctx = {
        options: { baseURL, providerId: "warmid", apiKey: "key-written-in-the-config" },
        provider: {
          transform: (cb: (editor: { add: (input: unknown) => void }) => void) => {
            cb({ add: (input: unknown) => added.push(input) });
            return registration;
          },
          reload: async () => {},
        },
        model: {
          transform: () => registration,
        },
        integration: {
          transform: () => registration,
          connection: {
            active: async () => ({ type: "credential", id: "c", label: "l" }),
            resolve: async () => ({ type: "key", key: hostKey }),
          },
        },
      };
      await (plugin as unknown as { setup: (c: unknown) => Promise<void> }).setup(ctx);
      const published = new Map<string, Record<string, unknown>>();
      for (const entry of added as Array<{
        info: { id: string };
        models: Array<Record<string, unknown>>;
      }>) {
        for (const m of entry.models) published.set(`${entry.info.id}/${String(m.id)}`, m);
      }
      assert.ok(
        [...published.keys()].some((k) => k.endsWith("/m-snap")),
        `the snapshot must survive the credential switch, published: ${JSON.stringify([...published.keys()])}`
      );
    } finally {
      globalThis.fetch = origFetch;
      console.warn = warn;
      console.log = log;
      if (prevDir === undefined) delete process.env.OPENCODE_DATA_DIR;
      else process.env.OPENCODE_DATA_DIR = prevDir;
    }
  });
});
