import { test } from "node:test";
import assert from "node:assert/strict";
import { generateKeyPairSync } from "node:crypto";
import {
  resolveOcrCredentials,
  resolveVertexOcrAccessToken,
} from "../../../src/app/api/v1/ocr/route.ts";

// ── resolveOcrCredentials — vertex-deepseek-ocr project/location resolution ─
// Mirrors the Azure DI pattern (providerSpecificData.baseUrl → top-level
// baseUrl) but synthesizes the full Vertex "openapi/chat/completions"
// endpoint URL from providerSpecificData.project/region, or (when project is
// not explicitly configured) from the Service Account JSON's project_id —
// the same source VertexExecutor.buildUrl uses (open-sse/executors/vertex.ts).

test("resolveOcrCredentials builds the Vertex endpoint URL from explicit providerSpecificData.project/region", () => {
  const credentials = {
    apiKey: "ya29.raw-access-token",
    providerSpecificData: { project: "proj-explicit", region: "europe-west4" },
  };
  const resolved = resolveOcrCredentials(credentials, "vertex-deepseek-ocr");
  assert.equal(
    resolved.baseUrl,
    "https://aiplatform.googleapis.com/v1/projects/proj-explicit/locations/europe-west4/endpoints/openapi/chat/completions"
  );
});

test("resolveOcrCredentials defaults the Vertex region to us-central1 when unset", () => {
  const credentials = { apiKey: "ya29.tok", providerSpecificData: { project: "proj-1" } };
  const resolved = resolveOcrCredentials(credentials, "vertex-deepseek-ocr");
  assert.equal(
    resolved.baseUrl,
    "https://aiplatform.googleapis.com/v1/projects/proj-1/locations/us-central1/endpoints/openapi/chat/completions"
  );
});

test("resolveOcrCredentials derives the Vertex project from a Service Account JSON apiKey when providerSpecificData.project is absent", () => {
  const credentials = {
    apiKey: JSON.stringify({
      project_id: "proj-from-sa",
      client_email: "svc@x.iam",
      private_key: "x",
    }),
  };
  const resolved = resolveOcrCredentials(credentials, "vertex-deepseek-ocr");
  assert.equal(
    resolved.baseUrl,
    "https://aiplatform.googleapis.com/v1/projects/proj-from-sa/locations/us-central1/endpoints/openapi/chat/completions"
  );
});

test("resolveOcrCredentials leaves baseUrl unset when the Vertex project cannot be resolved (raw token, no providerSpecificData.project)", () => {
  const credentials = { apiKey: "ya29.raw-token-no-project" };
  const resolved = resolveOcrCredentials(credentials, "vertex-deepseek-ocr");
  assert.equal(resolved.baseUrl, undefined);
});

test("resolveOcrCredentials keeps an explicit top-level baseUrl untouched for vertex-deepseek-ocr", () => {
  const credentials = {
    apiKey: "ya29.tok",
    baseUrl: "https://explicit.example.com",
    providerSpecificData: { project: "ignored" },
  };
  const resolved = resolveOcrCredentials(credentials, "vertex-deepseek-ocr");
  assert.equal(resolved.baseUrl, "https://explicit.example.com");
});

test("resolveOcrCredentials is unaffected for non-vertex providers (mistral, azure-document-intelligence unchanged)", () => {
  const mistral = { apiKey: "sk-mistral" };
  assert.deepEqual(resolveOcrCredentials(mistral, "mistral"), mistral);
  const azure = {
    apiKey: "azkey",
    providerSpecificData: { baseUrl: "https://r.cognitiveservices.azure.com" },
  };
  assert.equal(
    resolveOcrCredentials(azure, "azure-document-intelligence").baseUrl,
    "https://r.cognitiveservices.azure.com"
  );
});

// ── resolveVertexOcrAccessToken — mints a Vertex OAuth access token from a  ─
// Service Account JSON credential, reusing the exact same JWT-bearer flow
// the chat executor uses (open-sse/executors/vertex.ts::getAccessToken) —
// no new OAuth flow is implemented here.

test("resolveVertexOcrAccessToken is a no-op for non-vertex providers", async () => {
  const credentials = { apiKey: JSON.stringify({ client_email: "x", private_key: "y" }) };
  const resolved = await resolveVertexOcrAccessToken("mistral", credentials);
  assert.equal(resolved, credentials);
});

test("resolveVertexOcrAccessToken is a no-op when an accessToken is already present", async () => {
  const credentials = { apiKey: "sa-json-ignored", accessToken: "ya29.already-here" };
  const resolved = await resolveVertexOcrAccessToken("vertex-deepseek-ocr", credentials);
  assert.equal(resolved, credentials);
});

test("resolveVertexOcrAccessToken is a no-op for a raw (non-JSON) access token apiKey — used as-is", async () => {
  const credentials = { apiKey: "ya29.raw-preminted-token" };
  const resolved = await resolveVertexOcrAccessToken("vertex-deepseek-ocr", credentials);
  assert.equal(resolved, credentials);
});

test("resolveVertexOcrAccessToken exchanges a Service Account JSON apiKey for a minted accessToken via the shared JWT-bearer flow", async () => {
  const { privateKey } = generateKeyPairSync("rsa", {
    modulusLength: 2048,
    privateKeyEncoding: { type: "pkcs8", format: "pem" },
    publicKeyEncoding: { type: "spki", format: "pem" },
  });
  const saJson = JSON.stringify({
    project_id: "proj-ocr",
    private_key_id: "kid-ocr-1",
    client_email: "svc-ocr-route-test@example.iam.gserviceaccount.com",
    private_key: privateKey,
  });

  const originalFetch = globalThis.fetch;
  const calls: Array<{ url: string }> = [];
  globalThis.fetch = async (url: string | URL | Request, options?: RequestInit) => {
    calls.push({ url: String(url) });
    assert.match(String(url), /oauth2\.googleapis\.com\/token$/);
    assert.match(
      String(options?.body ?? ""),
      /grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer/
    );
    return new Response(JSON.stringify({ access_token: "ya29.minted-for-ocr", expires_in: 3600 }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  };

  try {
    const credentials = { apiKey: saJson };
    const resolved = await resolveVertexOcrAccessToken("vertex-deepseek-ocr", credentials);
    assert.equal(resolved.accessToken, "ya29.minted-for-ocr");
    // apiKey is preserved (resolveOcrCredentials may still need it to derive the project).
    assert.equal(resolved.apiKey, saJson);
    assert.equal(calls.length, 1);
  } finally {
    globalThis.fetch = originalFetch;
  }
});
