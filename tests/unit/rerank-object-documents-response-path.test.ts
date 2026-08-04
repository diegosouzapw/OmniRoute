import test from "node:test";
import assert from "node:assert/strict";

const { getRerankProvider } = await import("../../open-sse/config/rerankRegistry.ts");
const { transformResponseFromProvider } = await import("../../open-sse/handlers/rerank.ts");

/**
 * The Cohere-compatible rerank API accepts each document as either a bare string
 * or `{ text }`, and the DeepInfra/Voyage **response** adapters synthesize
 * `document.text` from the caller's originals (upstreams either omit documents
 * or echo them in their own shape — #7809/#7811).
 *
 * The `{ text }` form was only ever exercised through the *request* adapter
 * (`#5332 deepinfra request adapter`, `#7809 voyage request adapter handles
 * {text} object documents`). Every response-adapter test passed plain strings,
 * so the `typeof doc === "string" ? doc : doc?.text` branch on the response side
 * was uncovered — which is also the branch that gives
 * `RerankResponseOptions.documents` its union type.
 */

test("deepinfra response adapter resolves document text from {text} objects", () => {
  const cfg = getRerankProvider("deepinfra");
  const out = transformResponseFromProvider(
    cfg,
    { scores: [0.1, 0.9] },
    { documents: [{ text: "Washington DC" }, { text: "Paris" }], return_documents: true }
  );

  assert.equal(out.results[0].index, 1, "0.9 ranks first");
  assert.equal(out.results[0].document.text, "Paris");
  assert.equal(out.results[1].document.text, "Washington DC");
});

test("deepinfra response adapter handles a mixed string/{text} document array", () => {
  const cfg = getRerankProvider("deepinfra");
  const out = transformResponseFromProvider(
    cfg,
    { scores: [0.2, 0.8] },
    { documents: ["plain string", { text: "object form" }], return_documents: true }
  );

  assert.equal(out.results[0].document.text, "object form");
  assert.equal(out.results[1].document.text, "plain string");
});

test("deepinfra response adapter falls back to empty text for a {text}-less object", () => {
  const cfg = getRerankProvider("deepinfra");
  const out = transformResponseFromProvider(
    cfg,
    { scores: [0.5] },
    { documents: [{} as { text?: string }], return_documents: true }
  );

  assert.equal(out.results[0].document.text, "", "a document with no text must not yield undefined");
});

test("voyage response adapter resolves document text from {text} objects", () => {
  const cfg = getRerankProvider("voyage-ai");
  const out = transformResponseFromProvider(
    cfg,
    { data: [{ index: 0, relevance_score: 0.4 }, { index: 1, relevance_score: 0.7 }] },
    { documents: [{ text: "alpha" }, { text: "beta" }], return_documents: true }
  );

  assert.equal(out.results[0].index, 1, "0.7 ranks first");
  assert.equal(out.results[0].document.text, "beta");
  assert.equal(out.results[1].document.text, "alpha");
});

test("voyage response adapter remaps indices past an empty {text} document", () => {
  // The request adapter drops exact-empty documents before sending, so the
  // upstream indices refer to the filtered array. The response adapter rebuilds
  // that filter to map back — this must work for the object form too, not just
  // strings.
  const cfg = getRerankProvider("voyage-ai");
  const out = transformResponseFromProvider(
    cfg,
    { data: [{ index: 1, relevance_score: 0.9 }] },
    { documents: [{ text: "kept" }, { text: "" }, { text: "also kept" }], return_documents: true }
  );

  assert.equal(out.results[0].index, 2, "filtered index 1 maps back to original index 2");
  assert.equal(out.results[0].document.text, "also kept");
});
