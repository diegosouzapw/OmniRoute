/**
 * Port of decolua/9router commit d652300e:
 * Cerebras returns 400 (wrong_api_format) and Mistral returns 422
 * (extra_forbidden) when the forwarded body contains `client_metadata`
 * (an OpenAI-Codex/Claude-CLI passthrough field that has no equivalent
 * on these upstreams). Strip it on the executor's transformRequest path
 * before sending the request downstream.
 */

import test from "node:test";
import assert from "node:assert/strict";

import { DefaultExecutor } from "../../open-sse/executors/default.ts";

const STREAM = true;
const CREDENTIALS = { apiKey: "k" } as Record<string, unknown>;

function bodyWithClientMetadata() {
  return {
    model: "any",
    messages: [{ role: "user", content: "hi" }],
    client_metadata: { foo: "bar" },
    stream: STREAM,
  };
}

test("DefaultExecutor.transformRequest strips client_metadata for cerebras", () => {
  const executor = new DefaultExecutor("cerebras");
  const out = executor.transformRequest(
    "any",
    bodyWithClientMetadata(),
    STREAM,
    CREDENTIALS
  ) as Record<string, unknown>;
  assert.equal(
    Object.prototype.hasOwnProperty.call(out, "client_metadata"),
    false,
    "cerebras forward body must not contain client_metadata"
  );
});

test("DefaultExecutor.transformRequest strips client_metadata for mistral", () => {
  const executor = new DefaultExecutor("mistral");
  const out = executor.transformRequest(
    "any",
    bodyWithClientMetadata(),
    STREAM,
    CREDENTIALS
  ) as Record<string, unknown>;
  assert.equal(
    Object.prototype.hasOwnProperty.call(out, "client_metadata"),
    false,
    "mistral forward body must not contain client_metadata"
  );
});

test("DefaultExecutor.transformRequest strips client_metadata for nvidia (port from 9router#1887)", () => {
  const executor = new DefaultExecutor("nvidia");
  const out = executor.transformRequest(
    "any",
    bodyWithClientMetadata(),
    STREAM,
    CREDENTIALS
  ) as Record<string, unknown>;
  assert.equal(
    Object.prototype.hasOwnProperty.call(out, "client_metadata"),
    false,
    "nvidia forward body must not contain client_metadata"
  );
});

test("DefaultExecutor.transformRequest preserves client_metadata for other providers", () => {
  // Sanity check: the strip must be scoped, not global. Openai keeps it
  // (codex flow needs it), the cerebras/mistral strip is the only carve-out.
  const executor = new DefaultExecutor("openai");
  const out = executor.transformRequest(
    "any",
    bodyWithClientMetadata(),
    STREAM,
    CREDENTIALS
  ) as Record<string, unknown>;
  assert.deepEqual(out.client_metadata, { foo: "bar" });
});
