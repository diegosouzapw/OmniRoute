import { test } from "node:test";
import assert from "node:assert/strict";
import { handleOcr } from "../../open-sse/handlers/ocr.ts";

function fetchStub(
  script: Array<{ status: number; headers?: Record<string, string>; json?: unknown }>
) {
  const calls: Array<{ url: string; init: RequestInit }> = [];
  const impl = async (url: string, init: RequestInit) => {
    calls.push({ url, init });
    const step = script.shift()!;
    return new Response(step.json !== undefined ? JSON.stringify(step.json) : null, {
      status: step.status,
      headers: { "Content-Type": "application/json", ...(step.headers ?? {}) },
    });
  };
  return { impl, calls };
}

const noSleep = async () => {};

test("mistral path posts once and returns the upstream body", async () => {
  const { impl, calls } = fetchStub([
    { status: 200, json: { pages: [{ index: 0, markdown: "ok" }], model: "mistral-ocr-latest" } },
  ]);
  const res = await handleOcr({
    body: {
      model: "mistral/mistral-ocr-latest",
      document: { type: "image_url", image_url: "https://x/y.png" },
    },
    credentials: { apiKey: "sk" },
    fetchImpl: impl,
    sleepImpl: noSleep,
  });
  assert.equal(res.status, 200);
  assert.equal(calls.length, 1);
  const data = await res.json();
  assert.equal(data.pages[0].markdown, "ok");
});

test("OCR sanitizes structured upstream error bodies", async () => {
  const opaqueIdentifier = "AbC9xY7pQ2mN8vR4kL6z";
  const res = await handleOcr({
    body: {
      model: "mistral/mistral-ocr-latest",
      document: { type: "image_url", image_url: "https://x/y.png" },
    },
    credentials: { apiKey: "sk" },
    fetchImpl: async () =>
      Response.json(
        {
          error: {
            message: "quota metadata at /srv/provider/private.json",
            type: opaqueIdentifier,
            code: opaqueIdentifier,
            reason: opaqueIdentifier,
            api_key: "credential-value-12345",
          },
        },
        { status: 429 }
      ),
    sleepImpl: noSleep,
  });
  const payload = (await res.json()) as {
    error: { message: string; type?: string; code?: string; reason?: string; api_key?: string };
  };

  assert.equal(res.status, 429);
  assert.equal(payload.error.api_key, undefined);
  assert.doesNotMatch(payload.error.message, /srv\/provider/i);
  assert.doesNotMatch(
    JSON.stringify(payload),
    new RegExp(`credential-value-12345|${opaqueIdentifier}`, "i")
  );
});

test("OCR canonicalizes blank, plaintext, and mislabeled upstream failures", async () => {
  const scenarios = [
    { name: "blank", body: "   ", contentType: "application/json" },
    {
      name: "plaintext",
      body: "access_token=ocr-plain-secret at /srv/private/ocr.txt",
      contentType: "text/plain",
    },
    {
      name: "mislabeled",
      body: "<html>api_key=ocr-html-secret at /srv/private/ocr.html</html>",
      contentType: "application/json",
    },
  ];

  for (const scenario of scenarios) {
    const res = await handleOcr({
      body: {
        model: "mistral/mistral-ocr-latest",
        document: { type: "image_url", image_url: "https://x/y.png" },
      },
      credentials: { apiKey: "sk" },
      fetchImpl: async () =>
        new Response(scenario.body, {
          status: 502,
          headers: { "content-type": scenario.contentType },
        }),
      sleepImpl: noSleep,
    });
    const text = await res.text();
    const payload = JSON.parse(text) as { error: { message: string } };

    assert.equal(res.status, 502, scenario.name);
    assert.match(res.headers.get("content-type") || "", /application\/json/i, scenario.name);
    assert.match(res.headers.get("access-control-allow-methods") || "", /OPTIONS/, scenario.name);
    assert.equal(typeof payload.error.message, "string", scenario.name);
    assert.doesNotMatch(
      text,
      /ocr-plain-secret|ocr-html-secret|srv\/private|<html>/i,
      scenario.name
    );
  }
});

test("azure DI path polls Operation-Location until succeeded", async () => {
  const { impl, calls } = fetchStub([
    { status: 202, headers: { "Operation-Location": "https://poll/op/1" } },
    { status: 200, json: { status: "running" } },
    { status: 200, json: { status: "succeeded", analyzeResult: { content: "# md", pages: [{}] } } },
  ]);
  const res = await handleOcr({
    body: {
      model: "azure-document-intelligence/prebuilt-read",
      document: { type: "document_url", document_url: "https://x/d.pdf" },
    },
    credentials: { apiKey: "azkey", baseUrl: "https://r.cognitiveservices.azure.com" },
    fetchImpl: impl,
    sleepImpl: noSleep,
  });
  assert.equal(res.status, 200);
  assert.ok(calls.length >= 3);
  const data = await res.json();
  assert.equal(data.pages[0].markdown, "# md");
});

test("unknown model lists available providers dynamically and errors do not leak internals", async () => {
  const res = await handleOcr({
    body: { model: "nope/none", document: { type: "image_url", image_url: "https://x" } },
    credentials: { apiKey: "k" },
    fetchImpl: async () => new Response("{}", { status: 200 }),
    sleepImpl: noSleep,
  });
  assert.equal(res.status, 400);
  const body = await res.json();
  assert.ok(body.error.message.includes("azure-document-intelligence"));
  assert.ok(!body.error.message.includes("at /"));
});

test("azure DI poll returns failed status maps to 502", async () => {
  const { impl } = fetchStub([
    { status: 202, headers: { "Operation-Location": "https://poll/op/1" } },
    { status: 200, json: { status: "failed" } },
  ]);
  const res = await handleOcr({
    body: {
      model: "azure-document-intelligence/prebuilt-read",
      document: { type: "document_url", document_url: "https://x/d.pdf" },
    },
    credentials: { apiKey: "azkey", baseUrl: "https://r.cognitiveservices.azure.com" },
    fetchImpl: impl,
    sleepImpl: noSleep,
  });
  assert.equal(res.status, 502);
  const body = await res.json();
  assert.ok(!body.error.message.includes("at /"));
});

test("azure DI poll returns a non-ok response (401) and fails fast without exhausting the loop", async () => {
  const { impl, calls } = fetchStub([
    { status: 202, headers: { "Operation-Location": "https://poll/op/1" } },
    { status: 401, json: { error: "unauthorized" } },
  ]);
  const res = await handleOcr({
    body: {
      model: "azure-document-intelligence/prebuilt-read",
      document: { type: "document_url", document_url: "https://x/d.pdf" },
    },
    credentials: { apiKey: "azkey", baseUrl: "https://r.cognitiveservices.azure.com" },
    fetchImpl: impl,
    sleepImpl: noSleep,
  });
  assert.equal(res.status, 502);
  // 1 initial POST + 1 poll: the loop stopped immediately, it did not run all 30 attempts.
  assert.equal(calls.length, 2);
  const body = await res.json();
  assert.ok(!body.error.message.includes("at /"));
});

test("azure DI poll never resolves and times out after 30 attempts with a 504", async () => {
  const script = [{ status: 202, headers: { "Operation-Location": "https://poll/op/1" } }];
  for (let i = 0; i < 30; i++) {
    script.push({ status: 200, json: { status: "running" } });
  }
  const { impl, calls } = fetchStub(script);
  const res = await handleOcr({
    body: {
      model: "azure-document-intelligence/prebuilt-read",
      document: { type: "document_url", document_url: "https://x/d.pdf" },
    },
    credentials: { apiKey: "azkey", baseUrl: "https://r.cognitiveservices.azure.com" },
    fetchImpl: impl,
    sleepImpl: noSleep,
  });
  assert.equal(res.status, 504);
  // 1 initial POST + 30 poll attempts (the max cap), no more.
  assert.equal(calls.length, 31);
});
