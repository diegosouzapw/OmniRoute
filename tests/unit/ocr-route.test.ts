import test from "node:test";
import assert from "node:assert/strict";

const { POST, OPTIONS } = await import("../../src/app/api/v1/ocr/route.ts");
const { handleOcr } = await import("../../open-sse/handlers/ocr.ts");
const { OCR_PROVIDERS, getOcrProvider, parseOcrModel, getAllOcrModels } =
  await import("../../open-sse/config/ocrRegistry.ts");
const { v1OcrSchema } = await import("../../src/shared/validation/schemas/apiV1.ts");

const originalFetch = globalThis.fetch;

test.afterEach(() => {
  globalThis.fetch = originalFetch;
});

function ocrRequest(body: string) {
  return new Request("http://localhost/v1/ocr", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
  });
}

// ── Registry ───────────────────────────────────────────────────────────────

test("OCR_PROVIDERS registers mistral with the Mistral OCR base URL", () => {
  assert.equal(OCR_PROVIDERS.mistral.baseUrl, "https://api.mistral.ai/v1/ocr");
  const provider = getOcrProvider("mistral");
  assert.ok(provider);
  assert.equal(provider.authHeader, "bearer");
  assert.ok(provider.models.some((m: { id: string }) => m.id === "mistral-ocr-latest"));
});

test("parseOcrModel routes bare and prefixed mistral models to the mistral provider", () => {
  assert.deepEqual(parseOcrModel("mistral-ocr-latest"), {
    provider: "mistral",
    model: "mistral-ocr-latest",
  });
  assert.deepEqual(parseOcrModel("mistral/mistral-ocr-latest"), {
    provider: "mistral",
    model: "mistral-ocr-latest",
  });
  // Unknown model → no provider resolved
  assert.deepEqual(parseOcrModel("mystery-model"), {
    provider: null,
    model: "mystery-model",
  });
});

test("getAllOcrModels exposes the mistral OCR model with a provider prefix", () => {
  const models = getAllOcrModels();
  assert.ok(models.some((m: { id: string }) => m.id === "mistral/mistral-ocr-latest"));
});

// ── Schema (Zod, Rule #7) ────────────────────────────────────────────────────

test("v1OcrSchema rejects a body without a document", () => {
  const result = v1OcrSchema.safeParse({ model: "mistral-ocr-latest" });
  assert.equal(result.success, false);
});

test("v1OcrSchema accepts a document_url document object", () => {
  const result = v1OcrSchema.safeParse({
    model: "mistral-ocr-latest",
    document: { type: "document_url", document_url: "https://example.com/a.pdf" },
  });
  assert.equal(result.success, true);
});

test("v1OcrSchema accepts an image_url document object", () => {
  const result = v1OcrSchema.safeParse({
    document: { type: "image_url", image_url: "https://example.com/a.png" },
  });
  assert.equal(result.success, true);
});

// ── Route (public /v1/ocr entry point) ───────────────────────────────────────

test("POST /v1/ocr returns 400 for invalid JSON without leaking a stack trace", async () => {
  const response = await POST(ocrRequest("not json at all"));
  const body = (await response.json()) as any;

  assert.equal(response.status, 400);
  assert.equal(body.error.message, "Invalid JSON body");
  // Rule #12 — error responses must never leak stack traces.
  assert.ok(!body.error.message.includes("at /"));
});

test("OPTIONS /v1/ocr answers the CORS preflight", async () => {
  const response = await OPTIONS();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("access-control-allow-methods") || "", /OPTIONS/);
});

// ── Handler ──────────────────────────────────────────────────────────────────

test("handleOcr requires a document", async () => {
  const response = await handleOcr({
    body: { model: "mistral-ocr-latest" },
    credentials: { apiKey: "sk-test" },
  });
  const payload = (await response.json()) as any;

  assert.equal(response.status, 400);
  assert.equal(payload.error.message, "document is required");
});

test("handleOcr rejects unknown OCR models", async () => {
  const response = await handleOcr({
    body: { model: "mystery/ocr", document: { document_url: "x" } },
    credentials: { apiKey: "sk-test" },
  });
  const payload = (await response.json()) as any;

  assert.equal(response.status, 400);
  assert.match(payload.error.message, /No OCR provider found/);
});

test("handleOcr requires credentials for the resolved provider", async () => {
  const response = await handleOcr({
    body: { document: { document_url: "x" } },
    credentials: null,
  });
  const payload = (await response.json()) as any;

  assert.equal(response.status, 401);
  assert.equal(payload.error.message, "No credentials for OCR provider: mistral");
});

test("handleOcr proxies a successful request to the mistral OCR endpoint", async () => {
  let captured: any;
  globalThis.fetch = async (url: any, options: any = {}) => {
    captured = {
      url: String(url),
      headers: options.headers,
      body: JSON.parse(String(options.body || "{}")),
    };
    return Response.json({ pages: [{ index: 0, markdown: "hello" }] });
  };

  const response = await handleOcr({
    body: { document: { type: "document_url", document_url: "https://example.com/a.pdf" } },
    credentials: { apiKey: "sk-mistral" },
  });

  assert.equal(captured.url, "https://api.mistral.ai/v1/ocr");
  assert.equal(captured.headers.Authorization, "Bearer sk-mistral");
  // model defaults to mistral-ocr-latest and the document is forwarded upstream.
  assert.equal(captured.body.model, "mistral-ocr-latest");
  assert.deepEqual(captured.body.document, {
    type: "document_url",
    document_url: "https://example.com/a.pdf",
  });
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { pages: [{ index: 0, markdown: "hello" }] });
});

test("handleOcr passes upstream error payloads through with the upstream status", async () => {
  globalThis.fetch = async () =>
    new Response('{"error":"bad request"}', {
      status: 422,
      headers: { "content-type": "application/json" },
    });

  const response = await handleOcr({
    body: { model: "mistral/mistral-ocr-latest", document: { document_url: "x" } },
    credentials: { apiKey: "sk-test" },
  });

  assert.equal(response.status, 422);
  assert.equal(await response.text(), '{"error":"bad request"}');
});

test("handleOcr returns a sanitized 500 when the upstream request throws", async () => {
  globalThis.fetch = async () => {
    throw new Error("socket closed");
  };

  const response = await handleOcr({
    body: { model: "mistral-ocr-latest", document: { document_url: "x" } },
    credentials: { apiKey: "sk-test" },
  });
  const payload = (await response.json()) as any;

  assert.equal(response.status, 500);
  assert.match(payload.error.message, /OCR request failed: socket closed/);
  assert.ok(!payload.error.message.includes("at /"));
});
