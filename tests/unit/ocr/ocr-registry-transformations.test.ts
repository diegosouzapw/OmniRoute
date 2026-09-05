import { test } from "node:test";
import assert from "node:assert/strict";
import {
  OCR_PROVIDERS,
  getOcrTransformation,
  MISTRAL_PASSTHROUGH,
  VERTEX_DEEPSEEK_TRANSFORMATION,
} from "../../../open-sse/config/ocrRegistry.ts";

test("mistral resolves the passthrough transformation by default", () => {
  const t = getOcrTransformation("mistral");
  assert.equal(t, MISTRAL_PASSTHROUGH);
  const { url, init } = t.buildRequest({
    baseUrl: OCR_PROVIDERS.mistral.baseUrl,
    token: "sk-test",
    body: { document: { type: "image_url", image_url: "https://x/y.png" } },
    modelId: "mistral-ocr-latest",
  });
  assert.equal(url, "https://api.mistral.ai/v1/ocr");
  assert.equal(init.method, "POST");
  assert.equal((init.headers as Record<string, string>).Authorization, "Bearer sk-test");
  const sent = JSON.parse(String(init.body));
  assert.equal(sent.model, "mistral-ocr-latest");
});

test("passthrough parseResponse returns the body unchanged (Mistral is the canonical shape)", () => {
  const raw = { pages: [{ index: 0, markdown: "hello" }], model: "mistral-ocr-latest" };
  assert.deepEqual(MISTRAL_PASSTHROUGH.parseResponse(raw), raw);
});

test("azure-document-intelligence builds the prebuilt-read:analyze request", () => {
  const t = getOcrTransformation("azure-document-intelligence");
  const { url, init } = t.buildRequest({
    baseUrl: "https://myres.cognitiveservices.azure.com",
    token: "azkey",
    body: { document: { type: "document_url", document_url: "https://x/d.pdf" } },
    modelId: "prebuilt-read",
  });
  assert.equal(
    url,
    "https://myres.cognitiveservices.azure.com/documentintelligence/documentModels/prebuilt-read:analyze?api-version=2024-11-30&outputContentFormat=markdown"
  );
  assert.equal((init.headers as Record<string, string>)["Ocp-Apim-Subscription-Key"], "azkey");
  const sent = JSON.parse(String(init.body));
  assert.equal(sent.urlSource, "https://x/d.pdf");
});

test("azure-document-intelligence extracts poll URL and parses analyzeResult into Mistral shape", () => {
  const t = getOcrTransformation("azure-document-intelligence");
  const res = new Response(null, {
    status: 202,
    headers: { "Operation-Location": "https://poll/op/1" },
  });
  assert.equal(t.pollUrl?.(res), "https://poll/op/1");
  const parsed = t.parseResponse({
    status: "succeeded",
    analyzeResult: { content: "# doc text", pages: [{ pageNumber: 1 }] },
  });
  assert.equal(parsed.pages.length, 1);
  assert.equal(parsed.pages[0].index, 0);
  assert.equal(parsed.pages[0].markdown, "# doc text");
  assert.equal(parsed.model, "prebuilt-read");
});

test("azure DI maps base64/image_url documents to base64Source/urlSource", () => {
  const t = getOcrTransformation("azure-document-intelligence");
  const { init } = t.buildRequest({
    baseUrl: "https://r.example.com",
    token: "k",
    body: { document: { type: "image_url", image_url: "data:image/png;base64,AAAA" } },
    modelId: "prebuilt-read",
  });
  const sent = JSON.parse(String(init.body));
  assert.equal(sent.base64Source, "AAAA");
});

// ── Vertex AI DeepSeek OCR ──────────────────────────────────────────────────
// URL/body/response shapes verified against the upstream reference
// (litellm/llms/vertex_ai/ocr/deepseek_transformation.py): the endpoint is the
// generic Vertex "openapi/chat/completions" partner endpoint, the model id is
// prefixed with "deepseek-ai/", and the OCR document is sent as an
// OpenAI-chat-shaped image_url content part.

test("vertex-deepseek-ocr resolves its own transformation (not the passthrough)", () => {
  const t = getOcrTransformation("vertex-deepseek-ocr");
  assert.equal(t, VERTEX_DEEPSEEK_TRANSFORMATION);
});

test("vertex-deepseek-ocr builds an OpenAI-chat-shaped request against the resolved endpoint", () => {
  const t = getOcrTransformation("vertex-deepseek-ocr");
  const { url, init } = t.buildRequest({
    // resolveOcrCredentials (src/app/api/v1/ocr/route.ts) resolves the full
    // project/location endpoint into credentials.baseUrl before this runs —
    // buildRequest treats baseUrl as the complete URL, mirroring Mistral.
    baseUrl:
      "https://aiplatform.googleapis.com/v1/projects/proj-1/locations/us-central1/endpoints/openapi/chat/completions",
    token: "ya29.mock",
    body: { document: { type: "image_url", image_url: "https://x/y.png" } },
    modelId: "deepseek-ocr-maas",
  });
  assert.equal(
    url,
    "https://aiplatform.googleapis.com/v1/projects/proj-1/locations/us-central1/endpoints/openapi/chat/completions"
  );
  assert.equal(init.method, "POST");
  assert.equal((init.headers as Record<string, string>).Authorization, "Bearer ya29.mock");
  const sent = JSON.parse(String(init.body));
  assert.equal(sent.model, "deepseek-ai/deepseek-ocr-maas");
  assert.deepEqual(sent.messages, [
    { role: "user", content: [{ type: "image_url", image_url: "https://x/y.png" }] },
  ]);
});

test("vertex-deepseek-ocr maps a document_url document to the same image_url content shape", () => {
  const t = getOcrTransformation("vertex-deepseek-ocr");
  const { init } = t.buildRequest({
    baseUrl:
      "https://aiplatform.googleapis.com/v1/projects/p/locations/us-central1/endpoints/openapi/chat/completions",
    token: "t",
    body: { document: { type: "document_url", document_url: "https://x/d.pdf" } },
    modelId: "deepseek-ocr-maas",
  });
  const sent = JSON.parse(String(init.body));
  assert.deepEqual(sent.messages[0].content, [{ type: "image_url", image_url: "https://x/d.pdf" }]);
});

test("vertex-deepseek-ocr parseResponse extracts a JSON pages payload embedded in choices[0].message.content", () => {
  const t = getOcrTransformation("vertex-deepseek-ocr");
  const raw = {
    choices: [
      {
        message: {
          content: JSON.stringify({
            pages: [{ index: 0, markdown: "# hi" }],
            model: "deepseek-ocr-maas",
            usage_info: { pages_processed: 1 },
          }),
        },
      },
    ],
  };
  const parsed = t.parseResponse(raw);
  assert.deepEqual(parsed.pages, [{ index: 0, markdown: "# hi" }]);
  assert.equal(parsed.model, "deepseek-ocr-maas");
  assert.deepEqual(parsed.usage_info, { pages_processed: 1 });
});

test("vertex-deepseek-ocr parseResponse wraps plain markdown content into a single page (Mistral shape)", () => {
  const t = getOcrTransformation("vertex-deepseek-ocr");
  const raw = {
    model: "deepseek-ocr-maas",
    choices: [{ message: { content: "# just markdown, not JSON" } }],
    usage: { total_tokens: 42 },
  };
  const parsed = t.parseResponse(raw);
  assert.deepEqual(parsed.pages, [{ index: 0, markdown: "# just markdown, not JSON" }]);
  assert.equal(parsed.model, "deepseek-ocr-maas");
  assert.deepEqual(parsed.usage_info, { total_tokens: 42 });
});

test("vertex-deepseek-ocr parseResponse tolerates a missing/empty choices array", () => {
  const t = getOcrTransformation("vertex-deepseek-ocr");
  const parsed = t.parseResponse({ model: "deepseek-ocr-maas", choices: [] });
  assert.deepEqual(parsed.pages, [{ index: 0, markdown: "" }]);
  assert.equal(parsed.model, "deepseek-ocr-maas");
});
