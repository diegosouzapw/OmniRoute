import { describe, it, beforeEach } from "node:test";
import assert from "node:assert";
import {
  MonkeyCodeAiExecutor,
  buildCandidateChain,
  extractSystemText,
  rewriteModelName,
  signSystemText,
  stripAnsi,
  DEFAULT_SYSTEM_TEXT,
  SIGNING_SECRET_PSD_KEY,
  __resetModelCooldownsForTests,
} from "../../open-sse/executors/monkeycode-ai.ts";
import type { ExecuteInput, ProviderCredentials } from "../../open-sse/executors/base.ts";

const executor = new MonkeyCodeAiExecutor();
const noopLog = { debug: () => {}, info: () => {}, warn: () => {}, error: () => {} };

type WireMessage = { role?: unknown; content?: unknown };
type WireBody = { model?: unknown; messages?: WireMessage[] } & Record<string, unknown>;

/** Typed access to protected executor hooks under test (no `any` casts). */
function hooks(exec: MonkeyCodeAiExecutor): {
  buildUrl(model: string, stream: boolean, idx?: number, creds?: unknown): string;
  transformRequest(model: string, body: unknown, stream: boolean, creds: unknown): unknown;
  buildHeaders(creds: unknown, stream?: boolean): Record<string, string>;
} {
  return exec as unknown as {
    buildUrl(model: string, stream: boolean, idx?: number, creds?: unknown): string;
    transformRequest(model: string, body: unknown, stream: boolean, creds: unknown): unknown;
    buildHeaders(creds: unknown, stream?: boolean): Record<string, string>;
  };
}

function asRecord(value: unknown): Record<string, unknown> {
  if (value && typeof value === "object" && !Array.isArray(value)) {
    return value as Record<string, unknown>;
  }
  throw new Error("expected a record body");
}

function responseOf(result: unknown): Response {
  const record = asRecord(result);
  if (record.response instanceof Response) return record.response;
  if (result instanceof Response) return result;
  throw new Error("expected a Response result");
}

function bodyOf(result: unknown): WireBody {
  return asRecord(asRecord(result).transformedBody) as WireBody;
}

describe("monkeycode-ai registry entry", () => {
  it("is registered with the signed executor", async () => {
    const { getRegistryEntry } = await import("../../open-sse/config/providerRegistry.ts");
    const entry = getRegistryEntry("monkeycode-ai");
    assert.ok(entry);
    assert.strictEqual(entry.executor, "monkeycode-ai");
    assert.strictEqual(entry.format, "openai");
    assert.strictEqual(entry.authType, "apikey");
    assert.strictEqual(entry.authHeader, "bearer");
    assert.strictEqual(entry.alias, "monkeycode");
    assert.ok(entry.baseUrl?.includes("proxy.monkeycode-ai.net"));
  });

  it("declares the 8 ohmyagent catalog models", async () => {
    const { getRegistryEntry } = await import("../../open-sse/config/providerRegistry.ts");
    const entry = getRegistryEntry("monkeycode-ai");
    const ids = (entry.models as Array<{ id: string }>).map((m) => m.id).sort();
    assert.deepStrictEqual(ids, [
      "monkeycode-basic/deepseek-v4-flash",
      "monkeycode-basic/qwen3.5-plus",
      "monkeycode-basic/qwen3.8-flash",
      "monkeycode-pro/deepseek-v4-pro",
      "monkeycode-pro/glm-5.2",
      "monkeycode-pro/grok-4.6",
      "monkeycode-ultra/gpt-5.5",
      "monkeycode-ultra/gpt-5.6-sol",
    ]);
  });

  it("is a canonical dashboard provider", async () => {
    const { getProviderById } = await import("../../src/shared/constants/providers.ts");
    const provider = getProviderById("monkeycode-ai") ?? getProviderById("monkeycode");
    assert.ok(provider, "expected monkeycode-ai in the canonical provider catalog");
  });
});

describe("monkeycode-ai request signing", () => {
  it("matches an independently computed HMAC-SHA256 vector", () => {
    // Cross-checked with Python hmac.new(b'test-omas-secret', msg, sha256).
    assert.strictEqual(
      signSystemText("test-omas-secret", "You are a helpful assistant."),
      "v1=4aebdf69f7bd84f130cab3bb06637b42b0ab6e0c8f90089f962e37e6aa56af60"
    );
  });

  it("is sensitive to the system text", () => {
    assert.notStrictEqual(signSystemText("s", "A"), signSystemText("s", "B"));
  });
});

describe("monkeycode-ai system text extraction", () => {
  it("returns the first system message", () => {
    assert.strictEqual(
      extractSystemText([
        { role: "system", content: "A" },
        { role: "system", content: "B" },
      ]),
      "A"
    );
  });

  it("joins text content parts", () => {
    assert.strictEqual(
      extractSystemText([{ role: "system", content: [{ type: "text", text: "Hi" }] }]),
      "Hi"
    );
  });

  it("skips empty system messages", () => {
    assert.strictEqual(
      extractSystemText([
        { role: "system", content: "" },
        { role: "system", content: "B" },
      ]),
      "B"
    );
  });

  it("returns null when there is no system message", () => {
    assert.strictEqual(extractSystemText([{ role: "user", content: "hi" }]), null);
    assert.strictEqual(extractSystemText("nope"), null);
  });
});

describe("MonkeyCodeAiExecutor", () => {
  it("strips only the provider prefix, keeping the tier/model id", () => {
    assert.strictEqual(
      rewriteModelName("monkeycode-ai/monkeycode-basic/qwen3.8-flash"),
      "monkeycode-basic/qwen3.8-flash"
    );
    assert.strictEqual(
      rewriteModelName("monkeycode/monkeycode-pro/glm-5.2"),
      "monkeycode-pro/glm-5.2"
    );
    assert.strictEqual(
      rewriteModelName("monkeycode-basic/qwen3.8-flash"),
      "monkeycode-basic/qwen3.8-flash"
    );
  });

  it("buildUrl returns the chat completions endpoint", () => {
    const url = executor.buildUrl("monkeycode-basic/qwen3.8-flash", false);
    assert.ok(url.includes("proxy.monkeycode-ai.net/v1/chat/completions"));
  });

  it("buildUrl honors a manual baseUrl override", () => {
    const url = hooks(executor).buildUrl("m", false, 0, {
      providerSpecificData: { baseUrl: "https://example.com/v1" },
    });
    assert.strictEqual(url, "https://example.com/v1/chat/completions");
  });

  it("transformRequest injects a default system message when missing", () => {
    const out = asRecord(
      hooks(executor).transformRequest(
        "monkeycode-ai/monkeycode-basic/qwen3.8-flash",
        {
          model: "monkeycode-ai/monkeycode-basic/qwen3.8-flash",
          messages: [{ role: "user", content: "hi" }],
        },
        false,
        {}
      )
    ) as WireBody;
    assert.strictEqual(out.model, "monkeycode-basic/qwen3.8-flash");
    const messages = (out.messages ?? []) as WireMessage[];
    assert.strictEqual(messages[0].role, "system");
    assert.strictEqual(messages[0].content, DEFAULT_SYSTEM_TEXT);
  });

  it("transformRequest strips stop sequences (gateway 502s on them)", () => {
    const out = asRecord(
      hooks(executor).transformRequest(
        "m",
        {
          model: "m",
          messages: [{ role: "user", content: "hi" }],
          stop: ["\n\n"],
          temperature: 0.7,
          max_tokens: 64,
        },
        false,
        {}
      )
    );
    assert.strictEqual("stop" in out, false);
    assert.strictEqual(out.temperature, 0.7);
    assert.strictEqual(out.max_tokens, 64);
  });

  it("transformRequest keeps a caller system message and stays idempotent", () => {
    const once = hooks(executor).transformRequest(
      "m",
      {
        model: "m",
        messages: [
          { role: "system", content: "S" },
          { role: "user", content: "hi" },
        ],
      },
      false,
      {}
    );
    const twice = asRecord(hooks(executor).transformRequest("m", once, false, {})) as WireBody;
    const systems = ((twice.messages ?? []) as WireMessage[]).filter((m) => m.role === "system");
    assert.strictEqual(systems.length, 1);
  });

  it("buildHeaders carries the precomputed signature", () => {
    const headers = hooks(executor).buildHeaders(
      { apiKey: "oma_x", providerSpecificData: { __monkeycodeAiSignature: "v1=abc" } },
      false
    );
    assert.strictEqual(headers["X-OhMyAgent-Signature"], "v1=abc");
    assert.strictEqual(headers["Authorization"], "Bearer oma_x");
  });

  it("execute rejects a missing signing secret without network", async () => {
    const result = await executor.execute({
      model: "monkeycode-basic/qwen3.8-flash",
      body: { messages: [{ role: "user", content: "hi" }] },
      stream: false,
      signal: null,
      credentials: { apiKey: "oma_x", providerSpecificData: {} },
      log: noopLog,
    });
    assert.strictEqual(responseOf(result).status, 400);
    assert.ok((await responseOf(result).text()).includes(SIGNING_SECRET_PSD_KEY));
  });

  it("is registered in the executor index under both ids", async () => {
    const { getExecutor } = await import("../../open-sse/executors/index.ts");
    assert.ok(getExecutor("monkeycode-ai") instanceof MonkeyCodeAiExecutor);
    assert.ok(getExecutor("monkeycode") instanceof MonkeyCodeAiExecutor);
  });

  it("testConnection is false without a signing secret", async () => {
    assert.strictEqual(
      await executor.testConnection({ apiKey: "oma_x", providerSpecificData: {} }),
      false
    );
  });
});

describe("monkeycode-ai availability fallback", () => {
  const creds: ProviderCredentials = {
    apiKey: "oma_test",
    providerSpecificData: { signingSecret: "omas_test" },
  };

  function stubFetch(handler: (model: string) => Response) {
    const calls: string[] = [];
    const original = globalThis.fetch;
    globalThis.fetch = (async (_url: unknown, init?: { body?: unknown }) => {
      const body = JSON.parse(String(init?.body ?? "{}")) as { model: string };
      calls.push(body.model);
      return handler(body.model);
    }) as typeof fetch;
    return {
      calls,
      restore: () => {
        globalThis.fetch = original;
      },
    };
  }

  const ok = (model: string) =>
    new Response(JSON.stringify({ choices: [{ message: { content: "hi" } }], model }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  const fail = (status: number, model: string) =>
    new Response(JSON.stringify({ error: { message: `${status} on ${model}` } }), {
      status,
      headers: { "Content-Type": "application/json" },
    });

  beforeEach(() => __resetModelCooldownsForTests());

  it("requested model first, falls back on 403", async () => {
    const { calls, restore } = stubFetch((model) =>
      model === "dead-model" ? fail(403, model) : ok(model)
    );
    try {
      const exec = new MonkeyCodeAiExecutor();
      const result = await exec.execute({
        model: "dead-model",
        body: {
          messages: [
            { role: "system", content: "S" },
            { role: "user", content: "hi" },
          ],
          stream: false,
        },
        stream: false,
        signal: null,
        credentials: creds,
        log: noopLog,
      });
      assert.strictEqual(responseOf(result).status, 200);
      assert.deepStrictEqual(calls.slice(0, 2), ["dead-model", "monkeycode-basic/qwen3.8-flash"]);
      assert.strictEqual(bodyOf(result).model, "monkeycode-basic/qwen3.8-flash");
    } finally {
      restore();
    }
  });

  it("cools down the dead model so the next request skips it", async () => {
    const { calls, restore } = stubFetch((model) =>
      model === "dead-model" ? fail(404, model) : ok(model)
    );
    try {
      const exec = new MonkeyCodeAiExecutor();
      const input = {
        model: "dead-model",
        body: { messages: [{ role: "user", content: "hi" }], stream: false },
        stream: false,
        signal: null,
        credentials: creds,
        log: noopLog,
      };
      await exec.execute({ ...input });
      assert.deepStrictEqual(calls, ["dead-model", "monkeycode-basic/qwen3.8-flash"]);
      calls.length = 0;
      await exec.execute({ ...input });
      assert.deepStrictEqual(calls, ["monkeycode-basic/qwen3.8-flash"]);
    } finally {
      restore();
    }
  });

  it("does not fall back on a malformed 400", async () => {
    const { calls, restore } = stubFetch(() => fail(400, "x"));
    try {
      const exec = new MonkeyCodeAiExecutor();
      const result = await exec.execute({
        model: "dead-model",
        body: { messages: [{ role: "user", content: "hi" }], stream: false },
        stream: false,
        signal: null,
        credentials: creds,
        log: noopLog,
      });
      assert.strictEqual(responseOf(result).status, 400);
      assert.strictEqual(calls.length, 1);
    } finally {
      restore();
    }
  });

  it("chain exhaustion surfaces the first candidate failure", async () => {
    const { calls, restore } = stubFetch((model) => fail(403, model));
    try {
      const exec = new MonkeyCodeAiExecutor();
      const result = await exec.execute({
        model: "dead-model",
        body: { messages: [{ role: "user", content: "hi" }], stream: false },
        stream: false,
        signal: null,
        credentials: creds,
        log: noopLog,
      });
      assert.strictEqual(responseOf(result).status, 403);
      assert.strictEqual(calls[0], "dead-model");
      assert.ok(calls.length > 1, "expected fallback attempts");
      const text = await responseOf(result).text();
      assert.ok(text.includes("dead-model"), `expected first failure surfaced, got: ${text}`);
    } finally {
      restore();
    }
  });

  it("buildCandidateChain prefers requested, then catalog, skipping cooled models", () => {
    const chain = buildCandidateChain("monkeycode-pro/glm-5.2");
    assert.strictEqual(chain[0], "monkeycode-pro/glm-5.2");
    assert.ok(chain.includes("monkeycode-basic/qwen3.8-flash"));
    assert.strictEqual(new Set(chain).size, chain.length);
  });
});

describe("monkeycode-ai ANSI sanitization", () => {
  const creds: ProviderCredentials = {
    apiKey: "oma_test",
    providerSpecificData: { signingSecret: "omas_test" },
  };
  const input: ExecuteInput = {
    model: "monkeycode-basic/qwen3.8-flash",
    body: { messages: [{ role: "user", content: "hi" }] },
    stream: false,
    signal: null,
    credentials: creds,
    log: noopLog,
  };

  beforeEach(() => __resetModelCooldownsForTests());

  it("stripAnsi removes SGR sequences and leaves text intact", () => {
    assert.strictEqual(stripAnsi("\x1b[2m dim \x1b[0m plain"), " dim  plain");
    assert.strictEqual(stripAnsi("no codes"), "no codes");
    assert.strictEqual(stripAnsi("emoji 💭 kept"), "emoji 💭 kept");
  });

  it("cleans ANSI from non-streaming message fields", async () => {
    const original = globalThis.fetch;
    globalThis.fetch = (async () =>
      new Response(
        JSON.stringify({
          choices: [
            {
              message: {
                role: "assistant",
                content: "\x1b[2mthinking…\x1b[0mHi!",
                reasoning_content: "\x1b[2mplan\x1b[0m",
              },
            },
          ],
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      )) as typeof fetch;
    try {
      const exec = new MonkeyCodeAiExecutor();
      const result = (await exec.execute({
        ...input,
        body: { messages: [{ role: "user", content: "hi" }], stream: false },
      })) as unknown as { response: Response };
      const json = (await result.response.json()) as {
        choices: Array<{ message: { content: string; reasoning_content: string } }>;
      };
      assert.strictEqual(json.choices[0].message.content, "thinking…Hi!");
      assert.strictEqual(json.choices[0].message.reasoning_content, "plan");
    } finally {
      globalThis.fetch = original;
    }
  });

  it("cleans ANSI from streaming chunks, even split across chunks", async () => {
    const original = globalThis.fetch;
    const payload =
      'data: {"choices":[{"delta":{"reasoning_content":"\x1b[2mThe"}}]}\n\n' +
      'data: {"choices":[{"delta":{"content":"\x1b[0mHi"}}]}\n\n' +
      "data: [DONE]\n\n";
    const bytes = new TextEncoder().encode(payload);
    globalThis.fetch = (async () =>
      new Response(
        new ReadableStream({
          start(controller) {
            // Split mid-sequence to prove carry handling.
            controller.enqueue(bytes.slice(0, 45));
            controller.enqueue(bytes.slice(45));
            controller.close();
          },
        }),
        { status: 200, headers: { "Content-Type": "text/event-stream" } }
      )) as typeof fetch;
    try {
      const exec = new MonkeyCodeAiExecutor();
      const result = (await exec.execute({
        ...input,
        stream: true,
        body: { messages: [{ role: "user", content: "hi" }], stream: true },
      })) as unknown as { response: Response };
      const text = await result.response.text();
      assert.ok(!text.includes("[2m") && !text.includes("[0m"), `ANSI leaked: ${text}`);
      assert.ok(text.includes("The") && text.includes("Hi"), `content lost: ${text}`);
      assert.ok(text.includes("[DONE]"), "terminator must survive");
    } finally {
      globalThis.fetch = original;
    }
  });
});
