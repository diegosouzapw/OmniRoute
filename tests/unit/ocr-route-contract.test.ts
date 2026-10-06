import { test } from "node:test";
import assert from "node:assert/strict";
import { getAllOcrModels, parseOcrModel } from "../../open-sse/config/ocrRegistry.ts";
import { resolveOcrCredentials } from "../../src/app/api/v1/ocr/route.ts";

test("getAllOcrModels exposes both the mistral and azure-document-intelligence OCR models", () => {
  const ids = getAllOcrModels().map((m) => m.id);
  assert.ok(ids.includes("mistral/mistral-ocr-latest"));
  assert.ok(ids.includes("azure-document-intelligence/prebuilt-read"));
});

test("parseOcrModel resolves the azure-document-intelligence provider prefix", () => {
  assert.deepEqual(parseOcrModel("azure-document-intelligence/prebuilt-read"), {
    provider: "azure-document-intelligence",
    model: "prebuilt-read",
  });
});

// ── resolveOcrCredentials — maps the connection's custom endpoint (stored
// under providerSpecificData.baseUrl per the src/lib/providers/validation/*
// convention) onto the top-level credentials.baseUrl field that handleOcr
// reads, so azure-document-intelligence connections resolve their endpoint. ──

test("resolveOcrCredentials surfaces providerSpecificData.baseUrl to the top level", () => {
  const credentials = {
    apiKey: "azkey",
    providerSpecificData: { baseUrl: "https://r.cognitiveservices.azure.com" },
  };
  assert.deepEqual(resolveOcrCredentials(credentials), {
    apiKey: "azkey",
    providerSpecificData: { baseUrl: "https://r.cognitiveservices.azure.com" },
    baseUrl: "https://r.cognitiveservices.azure.com",
  });
});

test("resolveOcrCredentials keeps an existing top-level baseUrl untouched", () => {
  const credentials = {
    apiKey: "azkey",
    baseUrl: "https://explicit.example.com",
    providerSpecificData: { baseUrl: "https://ignored.example.com" },
  };
  assert.equal(resolveOcrCredentials(credentials).baseUrl, "https://explicit.example.com");
});

test("resolveOcrCredentials is a no-op when there is no providerSpecificData.baseUrl (mistral)", () => {
  const credentials = { apiKey: "sk-mistral" };
  assert.deepEqual(resolveOcrCredentials(credentials), credentials);
});
