import test from "node:test";
import assert from "node:assert/strict";

// #3922 — the Vertex SA access token must carry BOTH cloud-platform (chat/image
// execution on aiplatform.googleapis.com) AND generative-language.retriever
// (live model discovery on generativelanguage.googleapis.com). Dropping the
// second scope makes discovery return 403 ACCESS_TOKEN_SCOPE_INSUFFICIENT and
// silently fall back to the static ~10-model registry list. This guards both.
const { VERTEX_OAUTH_SCOPES } = await import("../../open-sse/executors/vertex.ts");

test("Vertex OAuth scopes include cloud-platform (execution)", () => {
  assert.ok(
    VERTEX_OAUTH_SCOPES.includes("https://www.googleapis.com/auth/cloud-platform"),
    "cloud-platform scope is required for Vertex AI execution"
  );
});

test("Vertex OAuth scopes include generative-language.retriever (discovery)", () => {
  assert.ok(
    VERTEX_OAUTH_SCOPES.includes("https://www.googleapis.com/auth/generative-language.retriever"),
    "generative-language.retriever scope is required for live model discovery"
  );
});

test("Vertex OAuth scopes serialize as a space-delimited string for the JWT", () => {
  const serialized = VERTEX_OAUTH_SCOPES.join(" ");
  assert.equal(
    serialized,
    "https://www.googleapis.com/auth/cloud-platform https://www.googleapis.com/auth/generative-language.retriever"
  );
});
