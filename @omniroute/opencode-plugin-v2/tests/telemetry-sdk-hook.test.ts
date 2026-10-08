import { describe, it } from "node:test";
import assert from "node:assert/strict";
import plugin from "../src/index.js";

/**
 * Strict fallback (re-anchored): no `includeUsage` marking is proven anywhere
 * outside node_modules. The repo-verifiable facts are:
 * (a) the host mock in `gemini-language.test.ts` mounts a callable `aisdk`
 *     domain the plugin reaches through `hook(name, cb)` — the domain exists
 *     on the host and routes by name;
 * (b) `@opencode/plugin 2.0.12` is the pinned contract reference
 *     (`package.json`), its `sdk`-event option shape is UNKNOWN here.
 * Consequence: no options-only marking is proven → strict fallback: register
 * the hook (domain exists, probed at runtime) and record the observation in
 * `options` only; the pure telemetry core stays unported and unimported.
 *
 * Host shape: the stable `@opencode/plugin` contract publishes the catalog
 * through `ctx.provider.transform` (`assertContext` requires the provider and
 * model transforms) and exposes one named `ctx.aisdk.hook(name, cb)` entry
 * point instead of a callable domain per event. The fake below mirrors that;
 * the five properties it asserts are unchanged.
 */

interface SdkInput {
  model: { id: string; providerID: string };
  package: string;
  options: Record<string, unknown>;
}

function hostCtx(opts: {
  telemetry?: boolean;
  withAisdk?: boolean;
  sdkImpl?: (
    cb: (input: SdkInput) => void | Promise<void>
  ) => Promise<{ dispose: () => Promise<void> }>;
}): {
  ctx: Record<string, unknown>;
  sdkCallbacks: Array<(input: SdkInput) => void | Promise<void>>;
} {
  const sdkCallbacks: Array<(input: SdkInput) => void | Promise<void>> = [];
  const registration = Promise.resolve({ dispose: async () => {} });
  const options: Record<string, unknown> = {
    baseURL: "https://gw.example.com",
    providerId: "omni",
    apiKey: "k",
  };
  if (opts.telemetry !== undefined) options["telemetry"] = opts.telemetry;
  const ctx: Record<string, unknown> = {
    options,
    provider: { transform: () => registration, reload: async () => {} },
    model: { transform: () => registration },
    integration: { transform: () => registration },
  };
  if (opts.withAisdk !== false) {
    ctx["aisdk"] = {
      hook: (name: string, cb: (input: SdkInput) => void | Promise<void>) => {
        // The stable host routes every aisdk event through one entry point;
        // "language" is the Gemini sanitiser, only "sdk" is this test's subject.
        if (name !== "sdk") return registration;
        if (opts.sdkImpl !== undefined) return opts.sdkImpl(cb);
        sdkCallbacks.push(cb);
        return registration;
      },
    };
  }
  return { ctx, sdkCallbacks };
}

async function setupQuiet(ctx: Record<string, unknown>): Promise<void> {
  const warn = console.warn;
  const log = console.log;
  console.warn = () => {};
  console.log = () => {};
  try {
    await (plugin as unknown as { setup: (c: unknown) => Promise<void> }).setup(ctx);
  } finally {
    console.warn = warn;
    console.log = log;
  }
}

describe("aisdk.sdk telemetry hook (parity, option off by default)", () => {
  it("an older host without the aisdk domain still loads (catalog only)", async () => {
    const { ctx } = hostCtx({ telemetry: true, withAisdk: false });
    await setupQuiet(ctx);
  });

  it("registers nothing when the option is off (default)", async () => {
    const { ctx, sdkCallbacks } = hostCtx({});
    await setupQuiet(ctx);
    assert.equal(sdkCallbacks.length, 0, "telemetry off must not touch aisdk.sdk");
  });

  it("registers the hook when the option is on and the domain exists", async () => {
    const { ctx, sdkCallbacks } = hostCtx({ telemetry: true });
    await setupQuiet(ctx);
    assert.equal(sdkCallbacks.length, 1, "telemetry on must register aisdk.sdk");
  });

  it("ignores models from other providers and marks only its own (options-only, no fetch)", async () => {
    const { ctx, sdkCallbacks } = hostCtx({ telemetry: true });
    await setupQuiet(ctx);
    assert.equal(sdkCallbacks.length, 1);
    const foreign: SdkInput = {
      model: { id: "m", providerID: "some-other-provider" },
      package: "@ai-sdk/openai-compatible",
      options: {},
    };
    await sdkCallbacks[0]!(foreign);
    assert.deepEqual(foreign.options, {}, "another provider's options are untouched");
    const own: SdkInput = {
      model: { id: "m", providerID: "omni" },
      package: "@ai-sdk/openai-compatible",
      options: {},
    };
    await sdkCallbacks[0]!(own);
    assert.equal(
      own.options["telemetry"],
      true,
      "own models carry an options-only telemetry mark, never a wrapped fetch"
    );
  });

  it("a host that refuses the sdk hook still keeps its catalog", async () => {
    const { ctx } = hostCtx({
      telemetry: true,
      sdkImpl: () => {
        throw new Error("refused");
      },
    });
    await setupQuiet(ctx);
  });
});
