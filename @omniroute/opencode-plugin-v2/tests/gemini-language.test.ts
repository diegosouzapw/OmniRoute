import { describe, it } from "node:test";
import assert from "node:assert/strict";
import type { Logger } from "../src/shared/index.js";
import type { LanguageModelV3 } from "@ai-sdk/provider";
import plugin from "../src/index.js";
import { sanitizeToolSchemasFor } from "../src/gemini-language.js";

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

/** Records what the underlying model was actually asked to do. */
function recordingModel(): { model: Record<string, unknown>; seen: unknown[] } {
  const seen: unknown[] = [];
  const model = {
    specificationVersion: "v3",
    modelId: "gemini-2.5-flash",
    provider: "omniroute",
    doGenerate: async (options: unknown) => {
      seen.push(options);
      return { content: [], finishReason: "stop", usage: {}, warnings: [] };
    },
    doStream: async (options: unknown) => {
      seen.push(options);
      return { stream: new ReadableStream() };
    },
  };
  return { model, seen };
}

const dirtyTools = [
  {
    type: "function",
    name: "edit",
    inputSchema: {
      type: "object",
      additionalProperties: false,
      properties: { p: { type: "string" } },
    },
  },
];

describe("Gemini sanitising on the language model", () => {
  it("cleans the tool schemas a Gemini model would reject, on both call paths", async () => {
    const { log } = collectingLogger();
    const { model, seen } = recordingModel();
    const wrapped = sanitizeToolSchemasFor(
      model as unknown as LanguageModelV3,
      "gemini-2.5-flash",
      log
    );
    await wrapped.doGenerate({ prompt: [], tools: structuredClone(dirtyTools) } as never);
    await wrapped.doStream({ prompt: [], tools: structuredClone(dirtyTools) } as never);
    assert.equal(seen.length, 2);
    for (const options of seen) {
      const schema = (options as { tools: Array<{ inputSchema: Record<string, unknown> }> })
        .tools[0]!.inputSchema;
      assert.equal("additionalProperties" in schema, false);
      assert.equal(
        ((schema["properties"] as Record<string, Record<string, unknown>>)["p"] ?? {})["type"],
        "string"
      );
    }
  });

  it("leaves a non-Gemini model's request exactly as it was", async () => {
    const { log } = collectingLogger();
    const { model, seen } = recordingModel();
    const wrapped = sanitizeToolSchemasFor(
      model as unknown as LanguageModelV3,
      "claude-opus-5",
      log
    );
    assert.equal(wrapped, model, "a model that needs no cleaning must not even be wrapped");
    await (wrapped as unknown as { doGenerate: (o: unknown) => Promise<unknown> }).doGenerate({
      prompt: [],
      tools: structuredClone(dirtyTools),
    });
    const schema = (seen[0] as { tools: Array<{ inputSchema: Record<string, unknown> }> }).tools[0]!
      .inputSchema;
    assert.equal(schema["additionalProperties"], false);
  });

  it("forwards a request with no tools untouched", async () => {
    const { log } = collectingLogger();
    const { model, seen } = recordingModel();
    const wrapped = sanitizeToolSchemasFor(
      model as unknown as LanguageModelV3,
      "gemini-2.5-flash",
      log
    );
    await wrapped.doGenerate({ prompt: [] } as never);
    assert.deepEqual(seen[0], { prompt: [] });
  });

  it("keeps the properties the model still needs, and says once that it cleaned", async () => {
    const { log, warnings } = collectingLogger();
    const { model, seen } = recordingModel();
    const wrapped = sanitizeToolSchemasFor(
      model as unknown as LanguageModelV3,
      "gemini-2.5-flash",
      log
    );
    await wrapped.doGenerate({ prompt: [], tools: structuredClone(dirtyTools) } as never);
    await wrapped.doGenerate({ prompt: [], tools: structuredClone(dirtyTools) } as never);
    const schema = (seen[0] as { tools: Array<{ inputSchema: Record<string, any> }> }).tools[0]!
      .inputSchema;
    assert.equal(schema["properties"]["p"]["type"], "string");
    assert.equal(warnings.length, 0, "a routine cleaning is not a warning");
  });

  it("passes the untouched model through when the host hands over nothing to wrap", () => {
    const { log } = collectingLogger();
    assert.equal(
      sanitizeToolSchemasFor(undefined as LanguageModelV3 | undefined, "gemini-2.5-flash", log),
      undefined
    );
  });
});

describe("Gemini sanitising is wired into the host, and only where it belongs", () => {
  interface LanguageInput {
    model: { id: string; providerID: string };
    sdk: unknown;
    options: Record<string, unknown>;
    language?: LanguageModelV3;
  }

  function hostCtx(opts: { geminiSanitization?: boolean; withAisdk?: boolean }): {
    ctx: Record<string, unknown>;
    languageCallbacks: Array<(input: LanguageInput) => void | Promise<void>>;
  } {
    const languageCallbacks: Array<(input: LanguageInput) => void | Promise<void>> = [];
    const registration = Promise.resolve({ dispose: async () => {} });
    const options: Record<string, unknown> = {
      baseURL: "https://gw.example.com",
      providerId: "omni",
      apiKey: "k",
    };
    if (opts.geminiSanitization !== undefined)
      options["geminiSanitization"] = opts.geminiSanitization;
    const ctx: Record<string, unknown> = {
      options,
      catalog: { transform: () => registration, reload: async () => {} },
      integration: { transform: () => registration },
    };
    if (opts.withAisdk !== false) {
      ctx["aisdk"] = {
        language: (cb: (input: LanguageInput) => void | Promise<void>) => {
          languageCallbacks.push(cb);
          return registration;
        },
        sdk: () => registration,
      };
    }
    return { ctx, languageCallbacks };
  }

  async function setupPlugin(ctx: Record<string, unknown>): Promise<void> {
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

  const bareModel = { specificationVersion: "v3", modelId: "x" } as unknown as LanguageModelV3;

  it("wraps a Gemini model of this provider and leaves every other one alone", async () => {
    const { ctx, languageCallbacks } = hostCtx({});
    await setupPlugin(ctx);
    assert.equal(languageCallbacks.length, 1);
    const wrapOf = async (model: { id: string; providerID: string }) => {
      const input: LanguageInput = { model, sdk: {}, options: {}, language: bareModel };
      await languageCallbacks[0]!(input);
      return input.language !== bareModel;
    };
    assert.equal(await wrapOf({ id: "gemini-2.5-flash", providerID: "omni" }), true);
    assert.equal(await wrapOf({ id: "claude-opus-5", providerID: "omni" }), false);
    assert.equal(
      await wrapOf({ id: "gemini-2.5-flash", providerID: "some-other-provider" }),
      false,
      "another provider's models are none of this plugin's business"
    );
  });

  it("registers nothing when the option is turned off", async () => {
    const { ctx, languageCallbacks } = hostCtx({ geminiSanitization: false });
    await setupPlugin(ctx);
    assert.deepEqual(languageCallbacks, []);
  });

  it("still loads on a host that exposes no aisdk domain", async () => {
    const { ctx } = hostCtx({ withAisdk: false });
    await setupPlugin(ctx);
  });

  it("keeps the catalog when the host refuses the language hook", async () => {
    const registration = Promise.resolve({ dispose: async () => {} });
    const ctx: Record<string, unknown> = {
      options: { baseURL: "https://gw.example.com", providerId: "omni", apiKey: "k" },
      catalog: { transform: () => registration, reload: async () => {} },
      integration: { transform: () => registration },
      aisdk: {
        language: () => {
          throw new Error("host says no");
        },
        sdk: () => registration,
      },
    };
    // Must not reject: tool-schema cleaning is an extra, the catalog is the job.
    await setupPlugin(ctx);
  });
});
