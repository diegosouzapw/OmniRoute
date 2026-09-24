import { describe, it } from "node:test";
import assert from "node:assert/strict";
import plugin from "../src/index.js";

/**
 * RED test for the stable-contract port: setup must register against a
 * stable ctx (provider/model transforms, no catalog) without throwing the
 * beta breach. Runs against the built shape: id + setup, graceful without
 * a key.
 */
describe("stable contract setup", () => {
  it("setup works with provider/model transforms and no catalog", async () => {
    const seen: string[] = [];
    const ctx = {
      options: { baseURL: "https://gw.example.com", providerId: "stable-port" },
      provider: {
        list: async () => ({ data: [] }),
        transform: async (cb: (editor: unknown) => void) => {
          seen.push("provider.transform");
          assert.equal(typeof cb, "function");
          return { dispose: async () => {} };
        },
        reload: async () => {
          seen.push("provider.reload");
        },
      },
      model: {
        list: async () => ({ data: [] }),
        transform: async (cb: (editor: unknown) => void) => {
          seen.push("model.transform");
          assert.equal(typeof cb, "function");
          return { dispose: async () => {} };
        },
        reload: async () => {},
      },
      integration: {
        transform: async () => ({ dispose: async () => {} }),
        connection: { active: async () => undefined, resolve: async () => undefined },
      },
    };
    await (plugin as unknown as { setup: (c: unknown) => Promise<void> }).setup(ctx);
    assert.ok(
      seen.includes("provider.transform"),
      `provider.transform must be registered, got: ${JSON.stringify(seen)}`
    );
  });
});
