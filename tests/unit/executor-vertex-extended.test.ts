import test from "node:test";
import assert from "node:assert/strict";
import { generateKeyPairSync } from "node:crypto";

import { VertexExecutor } from "../../open-sse/executors/vertex.ts";

const { privateKey } = generateKeyPairSync("rsa", {
  modulusLength: 2048,
  privateKeyEncoding: { type: "pkcs8", format: "pem" },
  publicKeyEncoding: { type: "spki", format: "pem" },
});

let saCounter = 0;

function createServiceAccountJson({
  projectId = "vertex-project-123",
  includeProjectId = true,
  includeEmail = true,
  includePrivateKey = true,
} = {}) {
  saCounter += 1;
  const payload = {
    private_key_id: `kid-${saCounter}`,
  };

  if (includeProjectId) payload.project_id = projectId;
  if (includeEmail) {
    payload.client_email = `svc-${saCounter}@example.iam.gserviceaccount.com`;
  }
  if (includePrivateKey) payload.private_key = privateKey;

  return JSON.stringify(payload);
}

test("VertexExecutor.buildUrl uses project from Service Account JSON and configured region", () => {
  const executor = new VertexExecutor();
  const url = executor.buildUrl("gemini-2.5-flash", true, 0, {
    apiKey: createServiceAccountJson({ projectId: "proj-eu" }),
    providerSpecificData: { region: "europe-west4" },
  });

  assert.equal(
    url,
    "https://aiplatform.googleapis.com/v1/projects/proj-eu/locations/europe-west4/publishers/google/models/gemini-2.5-flash:streamGenerateContent?alt=sse"
  );
});

test("VertexExecutor.buildUrl defaults to us-central1 and unknown-project when project is absent", () => {
  const executor = new VertexExecutor();
  const missingProject = executor.buildUrl("gemini-2.5-flash", false, 0, {
    apiKey: createServiceAccountJson({ includeProjectId: false }),
    providerSpecificData: {},
  });
  const invalidJson = executor.buildUrl("gemini-2.5-flash", false, 0, {
    apiKey: "not-json",
  });

  assert.equal(
    missingProject,
    "https://aiplatform.googleapis.com/v1/projects/unknown-project/locations/us-central1/publishers/google/models/gemini-2.5-flash:generateContent"
  );
  assert.equal(
    invalidJson,
    "https://aiplatform.googleapis.com/v1/projects/unknown-project/locations/us-central1/publishers/google/models/gemini-2.5-flash:generateContent"
  );
});

test("VertexExecutor.buildUrl routes partner and org-prefixed models to the global partner endpoint", () => {
  const executor = new VertexExecutor();
  const deepseek = executor.buildUrl("deepseek-v3.2", false, 0, {
    apiKey: createServiceAccountJson({ projectId: "proj-deepseek" }),
  });
  const metaLlama = executor.buildUrl("meta/llama-3.1-405b-instruct-maas", true, 0, {
    apiKey: createServiceAccountJson({ projectId: "proj-llama" }),
  });

  assert.equal(
    deepseek,
    "https://aiplatform.googleapis.com/v1/projects/proj-deepseek/locations/global/endpoints/openapi/chat/completions"
  );
  assert.equal(
    metaLlama,
    "https://aiplatform.googleapis.com/v1/projects/proj-llama/locations/global/endpoints/openapi/chat/completions"
  );
});

test("VertexExecutor.buildHeaders includes Bearer token and SSE Accept only for streaming", () => {
  const executor = new VertexExecutor();
  const streamHeaders = executor.buildHeaders({ accessToken: "ya29.stream" }, true);
  const jsonHeaders = executor.buildHeaders({ accessToken: "ya29.json" }, false);

  assert.deepEqual(streamHeaders, {
    "Content-Type": "application/json",
    Authorization: "Bearer ya29.stream",
    Accept: "text/event-stream",
  });
  assert.deepEqual(jsonHeaders, {
    "Content-Type": "application/json",
    Authorization: "Bearer ya29.json",
  });
});

test("VertexExecutor.execute exchanges a JWT for an access token and then calls Vertex", async () => {
  const executor = new VertexExecutor();
  const saJson = createServiceAccountJson({ projectId: "proj-run" });
  const originalFetch = globalThis.fetch;
  const calls = [];

  globalThis.fetch = async (url, options) => {
    calls.push({
      url: String(url),
      method: options?.method,
      headers: options?.headers,
      body: String(options?.body || ""),
    });

    if (String(url).includes("oauth2.googleapis.com/token")) {
      return new Response(JSON.stringify({ access_token: "ya29.mock", expires_in: 3600 }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  };

  try {
    const body = { contents: [{ role: "user", parts: [{ text: "Hello" }] }] };
    const result = await executor.execute({
      model: "gemini-2.5-flash",
      body,
      stream: false,
      credentials: {
        apiKey: saJson,
        providerSpecificData: { region: "europe-west4" },
      },
    });

    assert.equal(result.response.status, 200);
    assert.equal(
      result.url,
      "https://aiplatform.googleapis.com/v1/projects/proj-run/locations/europe-west4/publishers/google/models/gemini-2.5-flash:generateContent"
    );
    assert.equal(calls.length, 2);
    assert.match(calls[0].url, /oauth2\.googleapis\.com\/token$/);
    assert.match(calls[0].body, /grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer/);
    assert.match(calls[0].body, /assertion=/);
    assert.equal(calls[1].headers.Authorization, "Bearer ya29.mock");
    assert.equal(calls[1].headers["Content-Type"], "application/json");
    assert.equal(calls[1].body, JSON.stringify(body));
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("VertexExecutor.execute skips Service Account parsing when accessToken is already present", async () => {
  const executor = new VertexExecutor();
  const originalFetch = globalThis.fetch;
  const calls = [];

  globalThis.fetch = async (url, options) => {
    calls.push({ url: String(url), headers: options?.headers });
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  };

  try {
    const result = await executor.execute({
      model: "gemini-2.5-flash",
      body: { contents: [] },
      stream: true,
      credentials: {
        apiKey: "not-json",
        accessToken: "ya29.existing",
        providerSpecificData: { region: "us-central1" },
      },
    });

    assert.equal(result.response.status, 200);
    assert.equal(calls.length, 1);
    assert.match(calls[0].url, /projects\/unknown-project\/locations\/us-central1/);
    assert.equal(calls[0].headers.Authorization, "Bearer ya29.existing");
    assert.equal(calls[0].headers.Accept, "text/event-stream");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("VertexExecutor.execute rejects invalid or incomplete Service Account JSON clearly", async () => {
  const executor = new VertexExecutor();

  await assert.rejects(
    () =>
      executor.execute({
        model: "gemini-2.5-flash",
        body: { contents: [] },
        stream: false,
        credentials: { apiKey: "not-json" },
      }),
    /Service Account JSON/
  );

  await assert.rejects(
    () =>
      executor.execute({
        model: "gemini-2.5-flash",
        body: { contents: [] },
        stream: false,
        credentials: {
          apiKey: createServiceAccountJson({ includeEmail: false, includePrivateKey: false }),
        },
      }),
    /missing required fields/
  );
});
