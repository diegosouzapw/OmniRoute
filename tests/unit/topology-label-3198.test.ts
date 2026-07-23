/**
 * #3198 — the home provider-topology graph rendered the internal UUID for custom
 * providers instead of the user's friendly name, because the label precedence was
 * `config.name || entry.name` and `getProviderConfig` falls back to `{ name: providerId }`
 * (the UUID) for unknown ids, shadowing the pre-resolved `entry.name`.
 */
import test from "node:test";
import assert from "node:assert/strict";

import { resolveTopologyNodeLabel } from "../../src/app/(dashboard)/home/topologyLabel.ts";

test("custom provider node prefers the pre-resolved friendly name over the UUID config fallback", () => {
  const uuid = "openai-compatible-chat-1234abcd";
  // getProviderConfig returns { name: <uuid> } for unknown custom providers
  assert.equal(resolveTopologyNodeLabel("My Custom GPT", uuid, uuid), "My Custom GPT");
});

test("falls back to the config name, then the provider id", () => {
  assert.equal(resolveTopologyNodeLabel(undefined, "OpenAI", "openai"), "OpenAI");
  assert.equal(resolveTopologyNodeLabel("", "", "anthropic"), "anthropic");
  assert.equal(resolveTopologyNodeLabel("   ", "Groq", "groq"), "Groq");
});
