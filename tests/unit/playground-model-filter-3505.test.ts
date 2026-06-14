import test from "node:test";
import assert from "node:assert/strict";
import { filterModelsByProvider } from "../../src/app/(dashboard)/dashboard/translator/hooks/useAvailableModels.tsx";

// Regression for #3505: the playground model selector filtered the /v1/models list by the
// provider OPTION VALUE (a compatible provider's node id, e.g. "openai-compatible-<uuid>"),
// but the catalog emits compatible-provider models under the node's custom PREFIX
// (e.g. "myprefix/gpt-4o"). So `startsWith("openai-compatible-<uuid>/")` matched nothing and
// the selector showed "None"/"-". The fix passes the node prefix as the filter key. This locks
// the filter behaviour: given the right key (the prefix), the models surface.

test("#3505 filters models by a custom node prefix (the catalog's model namespace)", () => {
  const all = ["myprefix/gpt-4o", "myprefix/llama-3", "openai/gpt-4o", "anthropic/claude-opus-4-8"];
  assert.deepEqual(filterModelsByProvider(all, "myprefix"), ["myprefix/gpt-4o", "myprefix/llama-3"]);
});

test("#3505 a UUID-style node id (the old wrong key) matches nothing → empty (the bug)", () => {
  const all = ["myprefix/gpt-4o", "openai/gpt-4o"];
  assert.deepEqual(filterModelsByProvider(all, "openai-compatible-1234-uuid"), []);
});

test("#3505 built-in provider filtering still works", () => {
  const all = ["openai/gpt-4o", "openai/gpt-4o-mini", "anthropic/claude-opus-4-8"];
  assert.deepEqual(filterModelsByProvider(all, "openai"), ["openai/gpt-4o", "openai/gpt-4o-mini"]);
});

test("#3505 an exact bare match is included; no provider returns all", () => {
  assert.deepEqual(filterModelsByProvider(["auto", "openai/gpt-4o"], "auto"), ["auto"]);
  assert.deepEqual(filterModelsByProvider(["a", "b"], undefined), ["a", "b"]);
});
