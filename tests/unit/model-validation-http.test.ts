import assert from "node:assert/strict";
import test from "node:test";
import { createValidateAndAddHandler } from "../../src/lib/modelValidation/http.ts";

test("validation requires explicit inference consent before invoking the service", async () => {
  let invoked = false;
  const handler = createValidateAndAddHandler({
    authorize: async () => null,
    validateAndAdd: async () => {
      invoked = true;
      throw new Error("must not execute");
    },
  });
  const response = await handler(
    new Request("http://localhost/api/provider-models/validate-and-add", {
      method: "POST",
      body: JSON.stringify({ provider: "openai", modelId: "custom", connectionId: "chosen" }),
    })
  );
  assert.equal(response.status, 400);
  assert.equal(response.headers.get("cache-control"), "no-store");
  assert.equal(invoked, false);
});

test("auth refusal is no-store and occurs before body parsing", async () => {
  const handler = createValidateAndAddHandler({
    authorize: async () => new Response("denied", { status: 401 }),
    validateAndAdd: async () => {
      throw new Error("must not execute");
    },
  });
  const response = await handler(new Request("http://localhost", { method: "POST", body: "bad" }));
  assert.equal(response.status, 401);
  assert.equal(response.headers.get("cache-control"), "no-store");
});

test("oversized bodies cannot reach validation even with a forged content length", async () => {
  let invoked = false;
  const handler = createValidateAndAddHandler({
    authorize: async () => null,
    validateAndAdd: async () => {
      invoked = true;
      return {};
    },
  });
  const response = await handler(
    new Request("http://localhost", {
      method: "POST",
      headers: { "content-length": "1" },
      body: JSON.stringify({
        provider: "openai",
        modelId: "custom",
        connectionId: "chosen",
        allowInference: true,
        padding: "x".repeat(20_000),
      }),
    })
  );
  assert.equal(response.status, 413);
  assert.equal(response.headers.get("cache-control"), "no-store");
  assert.equal(invoked, false);
});

test("unknown fields and false consent are rejected; unexpected errors cannot leak", async () => {
  const handler = createValidateAndAddHandler({
    authorize: async () => null,
    validateAndAdd: async () => {
      throw new Error("secret-token at /private/server.ts:9");
    },
  });
  const input = {
    provider: "openai",
    modelId: "custom",
    connectionId: "chosen",
    allowInference: true,
  };
  for (const body of [
    { ...input, allowInference: false },
    { ...input, url: "http://untrusted" },
  ]) {
    assert.equal(
      (
        await handler(
          new Request("http://localhost", { method: "POST", body: JSON.stringify(body) })
        )
      ).status,
      400
    );
  }
  const response = await handler(
    new Request("http://localhost", { method: "POST", body: JSON.stringify(input) })
  );
  assert.equal(response.status, 500);
  assert.equal(response.headers.get("cache-control"), "no-store");
  assert.doesNotMatch(await response.text(), /secret-token|at \/|server\.ts/);
});
