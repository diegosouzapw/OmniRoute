import { after, before, describe, it } from "node:test";
import assert from "node:assert/strict";
import { createServer, type Server } from "node:http";
import type { AddressInfo } from "node:net";
import {
  parseProvidersYaml,
  splitProviderModel,
  selectSelfHostedProvider,
  handleSelfHostedCompletions,
} from "../../open-sse/services/selfHostedEntry.ts";
import { ProviderRouter } from "../../open-sse/services/providerAdapters.ts";

/**
 * Unified entry tests (RIC-738 — D4 接入即用).
 *
 * The self-hosted entry is exercised over the real HTTP contract: a local
 * upstream server stands in for the provider, so the adapter layer's fetch,
 * the passthrough header hygiene, and the streaming pipe are all covered.
 */

describe("selfHostedEntry splitProviderModel", () => {
  it("splits provider/model on first slash", () => {
    assert.deepEqual(splitProviderModel("openai/gpt-4o"), {
      provider: "openai",
      model: "gpt-4o",
    });
  });
  it("splits provider::model on double colon", () => {
    assert.deepEqual(splitProviderModel("local::llama3"), {
      provider: "local",
      model: "llama3",
    });
  });
  it("returns bare model when no separator", () => {
    assert.deepEqual(splitProviderModel("gpt-4o"), { model: "gpt-4o" });
  });
  it("does not split a leading-separator model", () => {
    assert.deepEqual(splitProviderModel("/gpt-4o"), { model: "/gpt-4o" });
  });
  it("handles non-string input", () => {
    assert.deepEqual(splitProviderModel(42), {});
  });
});

describe("selfHostedEntry parseProvidersYaml", () => {
  it("parses a well-formed providers list", () => {
    const config = parseProvidersYaml(
      "providers:\n  - id: cloud\n    kind: openai\n    baseUrl: https://api.openai.com/v1\n    model: gpt-4o\n    apiKey: secret"
    );
    assert.equal(config.providers.length, 1);
    assert.equal(config.providers[0].kind, "openai");
  });
  it("rejects a non-list providers document", () => {
    assert.throws(() => parseProvidersYaml("providers: nope"), {
      message: /providers list/,
    });
  });
});

describe("selfHostedEntry selectSelfHostedProvider", () => {
  const yaml = `providers:
  - id: openai
    kind: openai
    baseUrl: http://upstream/v1
    model: gpt-4o
  - id: local
    kind: local
    baseUrl: http://localhost:11434/v1
    model: llama3
`;
  const router = new ProviderRouter(parseProvidersYaml(yaml));
  const baseUrl = "http://localhost/v1/chat/completions";

  it("header provider id wins", () => {
    const req = new Request(baseUrl, { headers: { "x-omniroute-provider": "local" } });
    const selected = selectSelfHostedProvider(router, req, { model: "openai/gpt-4o" });
    assert.equal(selected.id, "local");
  });
  it("header with unknown id falls back to model prefix", () => {
    const req = new Request(baseUrl, { headers: { "x-omniroute-provider": "nope" } });
    const selected = selectSelfHostedProvider(router, req, { model: "openai/gpt-4o" });
    assert.equal(selected.id, "openai");
  });
  it("model prefix selects provider", () => {
    const req = new Request(baseUrl);
    const selected = selectSelfHostedProvider(router, req, { model: "local::llama3" });
    assert.equal(selected.id, "local");
  });
  it("no selector uses the first provider", () => {
    const req = new Request(baseUrl);
    const selected = selectSelfHostedProvider(router, req, { model: "gpt-4o" });
    assert.equal(selected.id, "openai");
  });
});

describe("selfHostedEntry unified entry (HTTP contract)", () => {
  let server: Server;
  let baseUrl: string;
  const calls: Array<{ url: string; auth: string | undefined; body: string }> = [];

  const yamlFor = (base: string) => `providers:
  - id: openai
    kind: openai
    baseUrl: ${base}
    model: gpt-4o
    apiKey: upstream-token
  - id: claude
    kind: anthropic
    baseUrl: ${base}
    model: claude-sonnet
    apiKey: upstream-token
`;

  before(async () => {
    server = createServer((req, res) => {
      let body = "";
      req.on("data", (chunk) => (body += chunk));
      req.on("end", () => {
        const xApiKey = req.headers["x-api-key"];
        calls.push({
          url: req.url ?? "",
          auth: req.headers.authorization ?? (typeof xApiKey === "string" ? xApiKey : undefined),
          body,
        });
        // The OpenAI adapter authenticates via `Authorization: Bearer`, the
        // Anthropic adapter via `x-api-key` — accept either upstream credential.
        if (
          req.headers.authorization === "Bearer upstream-token" ||
          req.headers["x-api-key"] === "upstream-token"
        ) {
          res.setHeader("content-type", "application/json");
          res.end(
            JSON.stringify({
              id: "cmpl-1",
              object: "chat.completion",
              choices: [{ message: { role: "assistant", content: "pong" }, finish_reason: "stop" }],
              usage: { prompt_tokens: 1, completion_tokens: 1, total_tokens: 2 },
            })
          );
        } else {
          res.setHeader("content-type", "application/json");
          res.statusCode = 401;
          res.end(JSON.stringify({ error: { message: "bad upstream key" } }));
        }
      });
    });
    await new Promise<void>((resolve) =>
      server.listen(0, "127.0.0.1", () => {
        const { port } = server.address() as AddressInfo;
        baseUrl = `http://127.0.0.1:${port}/v1`;
        resolve();
      })
    );
  });
  after(() => {
    server?.close();
  });

  it("routes by model prefix and forwards the bare model", async () => {
    const req = new Request("http://localhost/v1/chat/completions", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        model: "claude/claude-sonnet",
        messages: [{ role: "user", content: "hi" }],
      }),
    });
    const resp = await handleSelfHostedCompletions(
      req,
      { model: "claude/claude-sonnet", messages: [{ role: "user", content: "hi" }] },
      { providers: yamlFor(baseUrl) }
    );
    assert.equal(resp?.status, 200);
    assert.equal(resp?.headers.get("x-omniroute-routed-by"), "self-hosted-openai-compat");
    const parsed = JSON.parse(await resp!.text());
    assert.equal(parsed.choices[0].message.content, "pong");
    const call = calls.at(-1)!;
    assert.equal(call.url, "/v1/messages");
    const sent = JSON.parse(call.body);
    assert.equal(sent.model, "claude-sonnet");
  });

  it("forwards upstream Authorization and strips echo credentials from response", async () => {
    const req = new Request("http://localhost/v1/chat/completions", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ model: "openai/gpt-4o", messages: [{ role: "user", content: "hi" }] }),
    });
    const resp = await handleSelfHostedCompletions(
      req,
      { model: "openai/gpt-4o", messages: [{ role: "user", content: "hi" }] },
      { providers: yamlFor(baseUrl) }
    );
    assert.equal(resp?.status, 200);
    const call = calls.at(-1)!;
    assert.equal(call.auth, "Bearer upstream-token");
    assert.equal(resp!.headers.get("authorization"), null);
  });

  it("returns 401 when a configured API key is missing/wrong", async () => {
    const req = new Request("http://localhost/v1/chat/completions", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ messages: [{ role: "user", content: "hi" }] }),
    });
    const resp = await handleSelfHostedCompletions(
      req,
      { messages: [{ role: "user", content: "hi" }] },
      { providers: yamlFor(baseUrl), apiKey: "sk-required" }
    );
    assert.equal(resp?.status, 401);
    const parsed = JSON.parse(await resp!.text());
    assert.equal(parsed.error.type, "authentication_error");
  });

  it("returns 402-style upstream error shape on upstream 401 (normalized, sanitized)", async () => {
    const req = new Request("http://localhost/v1/chat/completions", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ model: "openai/gpt-4o", messages: [{ role: "user", content: "hi" }] }),
    });
    const badYaml = `providers:
  - id: openai
    kind: openai
    baseUrl: ${baseUrl}
    model: gpt-4o
    apiKey: wrong-key
`;
    const resp = await handleSelfHostedCompletions(
      req,
      { model: "openai/gpt-4o", messages: [{ role: "user", content: "hi" }] },
      { providers: badYaml }
    );
    // Upstream returns 401; the unified entry normalizes the body to the OpenAI
    // error shape without leaking upstream details.
    assert.equal(resp?.status, 401);
    const parsed = JSON.parse(await resp!.text());
    assert.ok(parsed.error, "must carry an OpenAI error object");
    assert.equal(parsed.error.type, "authentication_error");
  });

  it("streams SSE passthrough untouched", async () => {
    const sseCalls: Array<{ url: string; body: string }> = [];
    const sseServer = createServer((req, res) => {
      let body = "";
      req.on("data", (c) => (body += c));
      req.on("end", () => {
        sseCalls.push({ url: req.url ?? "", body });
        res.setHeader("content-type", "text/event-stream");
        res.write('data: {"choices":[{"delta":{"content":"hel"}}]}\n\n');
        res.end("data: [DONE]\n\n");
      });
    });
    await new Promise<void>((resolve) =>
      sseServer.listen(0, "127.0.0.1", () => {
        const { port } = sseServer.address() as AddressInfo;
        const sseBase = `http://127.0.0.1:${port}/v1`;
        const sseYaml = `providers:
  - id: openai
    kind: openai
    baseUrl: ${sseBase}
    model: gpt-4o
`;
        void (async () => {
          const req = new Request("http://localhost/v1/chat/completions", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ stream: true, messages: [{ role: "user", content: "hi" }] }),
          });
          const resp = await handleSelfHostedCompletions(
            req,
            { stream: true, messages: [{ role: "user", content: "hi" }] },
            { providers: sseYaml }
          );
          assert.equal(resp?.status, 200);
          assert.equal(resp?.headers.get("content-type"), "text/event-stream");
          const text = await resp!.text();
          assert.ok(text.includes("data: [DONE]"));
          assert.equal(sseCalls[0].url, "/v1/chat/completions");
          resolve();
        })().catch((error) => {
          server?.close();
          throw error;
        });
      })
    );
    sseServer.close();
  });

  it("returns a normalized 502 when upstream is unreachable", async () => {
    const unreachableYaml = `providers:
  - id: dead
    kind: openai
    baseUrl: http://127.0.0.1:1/v1
    model: x
`;
    const req = new Request("http://localhost/v1/chat/completions", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ model: "dead/x", messages: [{ role: "user", content: "hi" }] }),
    });
    const resp = await handleSelfHostedCompletions(
      req,
      { model: "dead/x", messages: [{ role: "user", content: "hi" }] },
      { providers: unreachableYaml }
    );
    assert.equal(resp?.status, 502);
    const parsed = JSON.parse(await resp!.text());
    assert.ok(parsed.error);
    assert.match(parsed.error.message, /Upstream provider unreachable/);
  });

  it("returns null (fall through to cloud) when no config present", async () => {
    const resp = await handleSelfHostedCompletions(
      new Request("http://localhost/v1/chat/completions"),
      { model: "gpt-4o", messages: [] },
      {}
    );
    assert.equal(resp, null);
  });

  it("returns a 500 when config exists but fails to parse", async () => {
    const resp = await handleSelfHostedCompletions(
      new Request("http://localhost/v1/chat/completions"),
      { model: "gpt-4o", messages: [] },
      { providers: "providers: nope" }
    );
    assert.equal(resp?.status, 500);
    const parsed = JSON.parse(await resp!.text());
    assert.ok(parsed.error);
  });
});

/**
 * Deterministic routing strategies over the real HTTP contract (M2 — RIC-740).
 *
 * Fault injection: the primary provider is DOWN (connection refused), so the
 * fallback chain must select the backup and the client receives a success —
 * plus an `x-omniroute-route-decision` header explaining the choice.
 */
describe("selfHostedEntry deterministic routing (fault injection)", () => {
  it("falls back to the backup when the primary provider is down", async () => {
    const okCalls: Array<{ url: string; body: string }> = [];
    const okServer = createServer((req, res) => {
      let body = "";
      req.on("data", (c) => (body += c));
      req.on("end", () => {
        okCalls.push({ url: req.url ?? "", body });
        res.setHeader("content-type", "application/json");
        res.end(
          JSON.stringify({
            id: "cmpl-backup",
            object: "chat.completion",
            choices: [
              { message: { role: "assistant", content: "backup-pong" }, finish_reason: "stop" },
            ],
            usage: { prompt_tokens: 1, completion_tokens: 1, total_tokens: 2 },
          })
        );
      });
    });
    await new Promise<void>((resolve) => okServer.listen(0, "127.0.0.1", () => resolve()));
    const okPort = (okServer.address() as AddressInfo).port;

    try {
      // Port 1 refuses connections: primary "dead" is unreachable; backup is live.
      const yaml = `providers:
  - id: dead
    kind: openai
    baseUrl: http://127.0.0.1:1/v1
    model: d
  - id: backup
    kind: openai
    baseUrl: http://127.0.0.1:${okPort}/v1
    model: b
strategy:
  fallbackChain:
    - dead
    - backup
`;
      const req = new Request("http://localhost/v1/chat/completions", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ messages: [{ role: "user", content: "hi" }] }),
      });
      const resp = await handleSelfHostedCompletions(
        req,
        { messages: [{ role: "user", content: "hi" }] },
        { providers: yaml }
      );
      assert.equal(resp?.status, 200);
      const parsed = JSON.parse(await resp!.text());
      assert.equal(parsed.choices[0].message.content, "backup-pong");
      assert.equal(okCalls.length, 1);
      assert.match(resp!.headers.get("x-omniroute-route-decision") ?? "", /dead.*backup/);
    } finally {
      okServer.close();
    }
  });

  it("returns the last fallback error when every candidate is down", async () => {
    const yaml = `providers:
  - id: one
    kind: openai
    baseUrl: http://127.0.0.1:1/v1
    model: o
  - id: two
    kind: openai
    baseUrl: http://127.0.0.1:1/v1
    model: t
`;
    const req = new Request("http://localhost/v1/chat/completions", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ messages: [{ role: "user", content: "hi" }] }),
    });
    const resp = await handleSelfHostedCompletions(
      req,
      { messages: [{ role: "user", content: "hi" }] },
      { providers: yaml }
    );
    assert.equal(resp?.status, 502);
    const parsed = JSON.parse(await resp!.text());
    assert.ok(parsed.error);
    assert.match(parsed.error.message, /Upstream provider unreachable/);
  });

  it("rejects a pinned provider that was blacklisted (no silent re-route)", async () => {
    const yaml = `providers:
  - id: a
    kind: openai
    baseUrl: http://127.0.0.1:1/v1
    model: m
  - id: b
    kind: openai
    baseUrl: http://127.0.0.1:1/v1
    model: m
strategy:
  blacklist:
    - a
`;
    const req = new Request("http://localhost/v1/chat/completions", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ model: "a/m", messages: [{ role: "user", content: "hi" }] }),
    });
    const resp = await handleSelfHostedCompletions(
      req,
      { model: "a/m", messages: [{ role: "user", content: "hi" }] },
      { providers: yaml }
    );
    assert.equal(resp?.status, 400);
    const parsed = JSON.parse(await resp!.text());
    assert.match(parsed.error.message, /blacklist/);
  });

  it("cooldown breaker excludes a failing provider from the next request", async () => {
    const okCalls: Array<{ url: string; body: string }> = [];
    const okServer = createServer((req, res) => {
      let body = "";
      req.on("data", (c) => (body += c));
      req.on("end", () => {
        okCalls.push({ url: req.url ?? "", body });
        res.setHeader("content-type", "application/json");
        res.end(
          JSON.stringify({
            id: "cmpl-ok",
            object: "chat.completion",
            choices: [{ message: { role: "assistant", content: "ok" }, finish_reason: "stop" }],
            usage: { prompt_tokens: 1, completion_tokens: 1, total_tokens: 2 },
          })
        );
      });
    });
    await new Promise<void>((resolve) => okServer.listen(0, "127.0.0.1", () => resolve()));
    const okPort = (okServer.address() as AddressInfo).port;

    try {
      const yaml = `providers:
  - id: dead
    kind: openai
    baseUrl: http://127.0.0.1:1/v1
    model: d
  - id: backup
    kind: openai
    baseUrl: http://127.0.0.1:${okPort}/v1
    model: b
strategy:
  cooldown:
    consecutiveFailures: 1
    cooldownMs: 60000
`;
      const mkReq = () =>
        new Request("http://localhost/v1/chat/completions", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ model: "dead/d", messages: [{ role: "user", content: "hi" }] }),
        });

      // First request: "dead" unreachable → fallback hits backup, and the failure
      // is recorded — the engine pins by model prefix but the cooldown next time
      // reports "dead" as excluded even when pinned.
      const first = await handleSelfHostedCompletions(
        mkReq(),
        { model: "dead/d", messages: [{ role: "user", content: "hi" }] },
        { providers: yaml }
      );
      assert.equal(first?.status, 200);
      assert.equal(okCalls.length, 1);

      // Second request: "dead" is now cooling (consecutiveFailures=1) — but it's
      // pinned, so a hard-filter rejection of the pin is surfaced as 400 rather
      // than a silent re-route.
      const second = await handleSelfHostedCompletions(
        mkReq(),
        { model: "dead/d", messages: [{ role: "user", content: "hi" }] },
        { providers: yaml }
      );
      assert.equal(second?.status, 400);
      const parsed = JSON.parse(await second!.text());
      assert.match(parsed.error.message, /cooldown/);
      // The backup must NOT have been hit on the excluded-pin request.
      assert.equal(okCalls.length, 1);
    } finally {
      okServer.close();
    }
  });

  it("returns 503 with the full explainable decision when no providers are eligible", async () => {
    const yaml = `providers:
  - id: a
    kind: openai
    baseUrl: http://127.0.0.1:1/v1
    model: m
strategy:
  blacklist:
    - a
`;
    const req = new Request("http://localhost/v1/chat/completions", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ messages: [{ role: "user", content: "hi" }] }),
    });
    const resp = await handleSelfHostedCompletions(
      req,
      { messages: [{ role: "user", content: "hi" }] },
      { providers: yaml }
    );
    assert.equal(resp?.status, 503);
    const parsed = JSON.parse(await resp!.text());
    assert.match(parsed.error.message, /No eligible providers/);
    assert.match(parsed.error.message, /blacklist/);
  });
});
