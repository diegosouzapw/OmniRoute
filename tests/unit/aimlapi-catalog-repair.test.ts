// AI/ML API (aimlapi) — regression guard for the 2026-09 discovery repair.
//
// The provider shipped fully wired and still showed users a 6-entry model list,
// four of whose ids no longer existed upstream. Three independent defects:
//
//   1. discovery ran `Array.isArray(data)` against `{ object: "list", data: [...] }`
//      → every catalog row discarded → the route fell back to the static seed;
//   2. the chat filter used `chat-completion`, a spelling the catalog stopped
//      publishing (`openai/chat-completions` matches 353 of 936 rows);
//   3. four seed ids (claude-3-5-sonnet-20241022, gemini-1.5-pro,
//      meta-llama/Meta-Llama-3.1-70B-Instruct-Turbo, mistral-large-latest) are
//      absent from the catalog as both id AND alias.
//
// Defects 1 and 2 are covered by provider-models-discovery-split.test.ts. This
// file guards the seed list and pins the shape of the ids so a future refresh
// cannot reintroduce a dead spelling.
import test from "node:test";
import assert from "node:assert/strict";

import { aimlapiProvider } from "@omniroute/open-sse/config/providers/registry/aimlapi/index.ts";

/**
 * Ids that look plausible and are NOT in the AI/ML API catalog (as id or alias),
 * re-verified 2026-09-03. Four of these shipped in this registry entry; the rest
 * are the spellings other aggregators publish, which is how they get copied in.
 */
const KNOWN_DEAD_IDS = [
  "claude-3-5-sonnet-20241022",
  "gemini-1.5-pro",
  "meta-llama/Meta-Llama-3.1-70B-Instruct-Turbo",
  "mistral-large-latest",
  "gpt-5.5",
  "anthropic/claude-sonnet-4-5",
  "z-ai/glm-5.2",
  "moonshotai/kimi-k2.6",
  "meta-llama/llama-4-maverick",
  // In the catalog as a chat model, advertises tools + structured output, and
  // still 404s "model does not exist" on POST /v1/chat/completions (2026-09-03).
  "llama-3.3-70b-versatile",
  // Dashed Anthropic spellings exist but advertise only `streaming`; the dotted
  // ids are the ones carrying the real capability set.
  "claude-sonnet-4-6",
];

/**
 * Ids verified twice on 2026-09-03: present on the catalog's
 * `openai/chat-completions` surface (each is an alias of a canonical
 * `vendor/model` id — checking ids alone would wrongly call all six dead) AND
 * answering 200 to a real POST /v1/chat/completions. Both checks are needed:
 * `llama-3.3-70b-versatile` passes the first and fails the second.
 */
const VERIFIED_SEED_IDS = [
  "gpt-5",
  "claude-sonnet-4.6",
  "gemini-2.5-pro",
  "glm-5",
  "deepseek-chat",
  "mistral-large",
];

test("aimlapi seed catalog carries only catalog-verified ids", () => {
  assert.deepEqual(
    aimlapiProvider.models.map((m) => m.id),
    VERIFIED_SEED_IDS
  );
});

test("aimlapi seed catalog contains no known-dead model id", () => {
  const seeded = new Set(aimlapiProvider.models.map((m) => m.id));
  for (const dead of KNOWN_DEAD_IDS) {
    assert.ok(!seeded.has(dead), `dead model id "${dead}" must not be seeded`);
  }
});

test("aimlapi seed ids carry no vendor prefix", () => {
  // Not cosmetic. A "vendor/model" id in this registry is matched by parseModel()
  // as an exact model id, which makes it report provider = null — so seeding
  // "anthropic/claude-sonnet-4-6" here stops that string resolving to the
  // anthropic provider app-wide (context window 1M -> the 128k default, and combo
  // targets lose the provider prefix that #8716 guards). Bare aliases are inert.
  for (const model of aimlapiProvider.models) {
    assert.ok(
      !model.id.includes("/"),
      `"${model.id}" must not carry a vendor prefix — it would shadow that provider's own model resolution`
    );
    assert.ok(model.name.length > 0, `"${model.id}" must have a display name`);
  }
});

test("aimlapi still points at the OpenAI-compatible chat endpoint", () => {
  // /v1/completions does not exist on this API (404); only /v1/chat/completions
  // and /v1/responses do.
  assert.equal(aimlapiProvider.baseUrl, "https://api.aimlapi.com/v1/chat/completions");
  assert.equal(aimlapiProvider.format, "openai");
  assert.equal(aimlapiProvider.authHeader, "bearer");
  assert.equal(aimlapiProvider.passthroughModels, true);
});
