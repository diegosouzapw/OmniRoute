import test from "node:test";
import assert from "node:assert/strict";

const BASE_URL = "http://localhost:20128";

test("contract: /api/v1 OPTIONS exposes CORS and allowed methods", async () => {
  const { OPTIONS } = await import("../../src/app/api/v1/route.ts");
  const response = await OPTIONS();

  assert.equal(response.status, 200);
  assert.ok(response.headers.has("Access-Control-Allow-Origin"));
});

test("contract: /api/v1/embeddings OPTIONS exposes POST/GET/OPTIONS", async () => {
  const { OPTIONS } = await import("../../src/app/api/v1/embeddings/route.ts");
  const response = await OPTIONS();
  const allowMethods = response.headers.get("Access-Control-Allow-Methods") || "";

  assert.equal(response.status, 200);
  assert.ok(allowMethods.includes("GET"));
  assert.ok(allowMethods.includes("POST"));
  assert.ok(allowMethods.includes("OPTIONS"));
});

test("contract: /api/v1 and /api/v1/models return consistent model IDs", async () => {
  const [{ GET: getV1 }, { GET: getV1Models }] = await Promise.all([
    import("../../src/app/api/v1/route.ts"),
    import("../../src/app/api/v1/models/route.ts"),
  ]);

  const [v1Response, v1ModelsResponse] = await Promise.all([
    getV1(new Request(`${BASE_URL}/api/v1`, { method: "GET" })),
    getV1Models(new Request(`${BASE_URL}/api/v1/models`, { method: "GET" })),
  ]);

  assert.equal(v1Response.status, 200);
  assert.equal(v1ModelsResponse.status, 200);

  const v1Body = (await v1Response.json()) as any;
  const v1ModelsBody = (await v1ModelsResponse.json()) as any;

  assert.equal(v1Body.object, "list");
  assert.equal(v1ModelsBody.object, "list");
  assert.ok(Array.isArray(v1Body.data));
  assert.ok(Array.isArray(v1ModelsBody.data));

  const v1Ids = [...new Set(v1Body.data.map((item) => item.id))].sort();
  const v1ModelsIds = [...new Set(v1ModelsBody.data.map((item) => item.id))].sort();

  assert.deepEqual(v1Ids, v1ModelsIds);
});

test("contract: /api/v1/models returns OpenAI-compatible model shape", async () => {
  const { GET: getV1Models } = await import("../../src/app/api/v1/models/route.ts");
  const response = await getV1Models(new Request(`${BASE_URL}/api/v1/models`, { method: "GET" }));

  assert.equal(response.status, 200);
  const body = (await response.json()) as any;

  assert.equal(body.object, "list");
  assert.ok(Array.isArray(body.data));

  // In CI environments without provider connections, models list may be empty — skip shape check
  if (body.data.length > 0) {
    const first = body.data[0];
    assert.equal(typeof first.id, "string");
    assert.equal(first.object, "model");
    assert.equal(typeof first.created, "number");
    assert.equal(typeof first.owned_by, "string");
  }
});

test("contract: /api/v1/embeddings GET returns embedding model listing shape", async () => {
  const { GET: getEmbeddings } = await import("../../src/app/api/v1/embeddings/route.ts");
  const response = await getEmbeddings();

  assert.equal(response.status, 200);
  const body = (await response.json()) as any;

  assert.equal(body.object, "list");
  assert.ok(Array.isArray(body.data));
  assert.ok(body.data.length > 0, "embedding model list should not be empty");

  const first = body.data[0];
  assert.equal(first.object, "model");
  assert.equal(first.type, "embedding");
  assert.equal(typeof first.id, "string");
  assert.equal(typeof first.owned_by, "string");
});

test("contract: /api/v1/images/generations GET returns image model listing shape", async () => {
  const { GET: getImageModels } = await import("../../src/app/api/v1/images/generations/route.ts");
  const response = await getImageModels();

  assert.equal(response.status, 200);
  const body = (await response.json()) as any;

  assert.equal(body.object, "list");
  assert.ok(Array.isArray(body.data));
  assert.ok(body.data.length > 0, "image model list should not be empty");

  const first = body.data[0];
  assert.equal(first.object, "model");
  assert.equal(first.type, "image");
  assert.equal(typeof first.id, "string");
  assert.equal(typeof first.owned_by, "string");
});

test("contract: /api/v1/messages/count_tokens returns 400 on invalid JSON", async () => {
  const { POST: countTokens } = await import("../../src/app/api/v1/messages/count_tokens/route.ts");

  const response = await countTokens(
    new Request(`${BASE_URL}/api/v1/messages/count_tokens`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: "not-json",
    })
  );

  assert.equal(response.status, 400);
  const body = (await response.json()) as any;
  assert.ok(body.error, "error payload should exist");
  assert.ok(
    typeof body.error === "string" || typeof body.error === "object",
    "error payload should be string or object"
  );
});

test("contract: /api/v1/messages/count_tokens rejects empty messages payload", async () => {
  const { POST: countTokens } = await import("../../src/app/api/v1/messages/count_tokens/route.ts");

  const response = await countTokens(
    new Request(`${BASE_URL}/api/v1/messages/count_tokens`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: [] }),
    })
  );

  assert.equal(response.status, 400);
  const body = (await response.json()) as any;
  assert.ok(body.error, "error payload should exist");
  assert.ok(
    typeof body.error === "string" || typeof body.error === "object",
    "error payload should be string or object"
  );
});

test("contract: /api/v1/messages/count_tokens computes token estimate from text content", async () => {
  const { POST: countTokens } = await import("../../src/app/api/v1/messages/count_tokens/route.ts");

  const payload = {
    messages: [
      { role: "user", content: "abcd" }, // 4 chars
      {
        role: "assistant",
        content: [{ type: "text", text: "12345678" }], // 8 chars
      },
    ],
  };

  const response = await countTokens(
    new Request(`${BASE_URL}/api/v1/messages/count_tokens`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
  );

  assert.equal(response.status, 200);
  const body = (await response.json()) as any;
  assert.equal(body.input_tokens, 3);
});
