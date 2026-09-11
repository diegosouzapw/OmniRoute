import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-count-tokens-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const modelAliasesDb = await import("../../src/lib/db/models/aliases.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const modelAliasResolver = await import("../../src/lib/modelAliasResolver.ts");
const { POST } = await import("../../src/app/api/v1/messages/count_tokens/route.ts");

type CountTokensResponse = {
  input_tokens: number;
  source: string;
  provider?: string;
  model?: string;
};

type ErrorResponse = {
  error?: {
    code?: string;
    message?: string;
  };
};

type CountTokensErrorResponse = {
  error: { code?: string; message?: string };
};

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

async function seedConnection(provider, overrides = {}) {
  return providersDb.createProviderConnection({
    provider,
    authType: "apikey",
    name: overrides.name || `${provider}-count-${Math.random().toString(16).slice(2, 8)}`,
    apiKey: overrides.apiKey || `sk-${provider}-count`,
    isActive: overrides.isActive ?? true,
    testStatus: overrides.testStatus || "active",
    providerSpecificData: overrides.providerSpecificData || {},
  });
}

test.beforeEach(async () => {
  await resetStorage();
  modelAliasResolver.invalidateAliasCache();
});

test.after(async () => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("messages/count_tokens uses real provider count when Claude-compatible upstream supports it", async () => {
  await seedConnection("anthropic", { apiKey: "sk-ant-count" });

  const originalFetch = globalThis.fetch;
  let captured = null;
  globalThis.fetch = async (url, init = {}) => {
    captured = {
      body: JSON.parse(String(init.body)),
      headers: init.headers,
      url: String(url),
    };
    return new Response(JSON.stringify({ input_tokens: 321 }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  };

  try {
    const response = await POST(
      new Request("http://localhost/api/v1/messages/count_tokens", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "anthropic/claude-opus-4.6",
          messages: [{ role: "user", content: "Count these tokens" }],
        }),
      })
    );

    assert.equal(response.status, 200);
    const body = (await response.json()) as CountTokensResponse;
    assert.equal(body.input_tokens, 321);
    assert.equal(body.source, "provider");
    assert.equal(body.provider, "anthropic");
    assert.equal(body.model, "claude-opus-4.6");
    assert.ok(captured.url.includes("/v1/messages/count_tokens"));
    assert.equal(captured.body.model, "claude-opus-4.6");
    assert.equal(captured.headers["x-api-key"], "sk-ant-count");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("messages/count_tokens falls back to estimate when model is missing", async () => {
  const response = await POST(
    new Request("http://localhost/api/v1/messages/count_tokens", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: [
          { role: "user", content: "abcd" },
          { role: "assistant", content: [{ type: "text", text: "12345678" }] },
        ],
      }),
    })
  );

  assert.equal(response.status, 200);
  const body = (await response.json()) as CountTokensResponse;
  assert.equal(body.input_tokens, 4); // tiktoken: "abcd"=1 + "12345678"=3
  assert.equal(body.source, "local");
});

test("messages/count_tokens rejects retired Felo models instead of estimating locally", async () => {
  const response = await POST(
    new Request("http://localhost/api/v1/messages/count_tokens", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "felo-web/gpt-4o",
        messages: [{ role: "user", content: "Count these tokens" }],
      }),
    })
  );

  assert.equal(response.status, 410);
  const body = (await response.json()) as ErrorResponse;
  assert.equal(body.error?.code, "PROVIDER_RETIRED");
  assert.equal(body.error?.message, "Provider is retired and unavailable.");
  assert.equal(JSON.stringify(body).includes("felo-web"), false);
});

test("messages/count_tokens does not mask the retired ChatGPT Web alias as a local estimate", async () => {
  const originalFetch = globalThis.fetch;
  let fetchCalls = 0;
  globalThis.fetch = async () => {
    fetchCalls += 1;
    throw new Error("Retired count_tokens requests must not reach the network");
  };

  try {
    for (const provider of ["cgpt-web"]) {
      const alias = `count-via-${provider}`;
      await modelAliasesDb.setModelAlias(alias, `${provider}/gpt-5.5`);
      await settingsDb.updateSettings({
        wildcardAliases: [
          { pattern: `count-wildcard-${provider}-*`, target: `${provider}/gpt-5.5` },
        ],
      });
      modelAliasResolver.invalidateAliasCache();

      for (const model of [`${provider}/gpt-5.5`, alias, `count-wildcard-${provider}-model`]) {
        const response = await POST(
          new Request("http://localhost/api/v1/messages/count_tokens", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              model,
              messages: [{ role: "user", content: "Count these tokens" }],
            }),
          })
        );
        const body = (await response.json()) as CountTokensErrorResponse;
        assert.equal(response.status, 410);
        assert.equal(body.error.code, "PROVIDER_RETIRED");
        assert.equal(body.error.message, "Provider is retired and unavailable.");
      }
    }
    assert.equal(fetchCalls, 0);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("count_tokens fallback uses exact tiktoken count with source=local", async () => {
  const req = new Request("http://localhost/v1/messages/count_tokens", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages: [{ role: "user", content: "hello world" }] }),
  });
  const res = await POST(req);
  const json = (await res.json()) as CountTokensResponse;
  assert.equal(json.source, "local");
  assert.equal(json.input_tokens, 2); // exact cl100k_base count, not Math.ceil(11/4)=3
});

test("count_tokens estimate counts tool_use / tool_result / thinking blocks (not just text) — #2337", async () => {
  // Real agentic conversations carry ~95% of their tokens inside tool_use inputs
  // and tool_result content. The estimation path used to only sum `text` blocks,
  // returning input_tokens: 0 for the shape below, which silently broke Claude
  // Code's auto-compaction. Every non-text block below must contribute tokens.
  const response = await POST(
    new Request("http://localhost/v1/messages/count_tokens", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: [
          {
            role: "assistant",
            content: [
              {
                type: "thinking",
                thinking: "The user wants me to read a file, let me call the Read tool.",
              },
              {
                type: "tool_use",
                id: "toolu_01",
                name: "Read",
                input: { file_path: "/tmp/a.txt", limit: 200 },
              },
            ],
          },
          {
            role: "user",
            content: [
              {
                type: "tool_result",
                tool_use_id: "toolu_01",
                content: "line1 line2 line3 some file content here",
              },
            ],
          },
        ],
      }),
    })
  );

  assert.equal(response.status, 200);
  const body = (await response.json()) as CountTokensResponse;
  assert.equal(body.source, "local");
  // Before the fix this was 0 (only `text` blocks were counted).
  assert.ok(
    body.input_tokens > 0,
    `expected tool/thinking blocks to contribute tokens, got ${body.input_tokens}`
  );
});

test("count_tokens estimate counts array-form system prompt blocks — #2337", async () => {
  const response = await POST(
    new Request("http://localhost/v1/messages/count_tokens", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        system: [{ type: "text", text: "You are a helpful coding assistant." }],
        messages: [{ role: "user", content: "hi" }],
      }),
    })
  );

  assert.equal(response.status, 200);
  const body = (await response.json()) as CountTokensResponse;
  assert.equal(body.source, "local");
  // Array-form `system` used to count as 0 (only string system was summed).
  assert.ok(body.input_tokens > 1, `expected system blocks counted, got ${body.input_tokens}`);
});

test("messages/count_tokens falls back to estimate when real upstream count fails", async () => {
  await seedConnection("anthropic", { apiKey: "sk-ant-fallback" });

  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () => new Response("upstream unavailable", { status: 503 });

  try {
    const response = await POST(
      new Request("http://localhost/api/v1/messages/count_tokens", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "anthropic/claude-opus-4.6",
          messages: [{ role: "user", content: "abcd" }],
        }),
      })
    );

    assert.equal(response.status, 200);
    const body = (await response.json()) as CountTokensResponse;
    assert.equal(body.input_tokens, 1); // tiktoken: "abcd"=1
    assert.equal(body.source, "local");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("messages/count_tokens rejects an impossible provider count and uses the local estimate", async () => {
  await seedConnection("anthropic", { apiKey: "sk-ant-impossible-count" });

  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () =>
    new Response(JSON.stringify({ input_tokens: 336409 }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  try {
    const response = await POST(
      new Request("http://localhost/api/v1/messages/count_tokens", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "anthropic/claude-opus-4.6",
          messages: [{ role: "user", content: "hello world" }],
        }),
      })
    );

    assert.equal(response.status, 200);
    const body = (await response.json()) as CountTokensResponse;
    assert.equal(body.input_tokens, 2);
    assert.equal(body.source, "local");
    assert.equal(body.provider, undefined);
  } finally {
    globalThis.fetch = originalFetch;
  }
});
