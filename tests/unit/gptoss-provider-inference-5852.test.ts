import test from "node:test";
import assert from "node:assert/strict";

import { getModelInfoCore } from "../../open-sse/services/model.ts";

// Bug #5852: resolveModelByProviderInference() in open-sse/services/model.ts had an
// unconditional `/^gpt-/i` heuristic that fired for ANY model id starting with
// "gpt-", hijacking open-weight models cataloged under other providers (e.g.
// "gpt-oss-120b", served by fireworks/cerebras/scaleway/byteplus) into
// provider "openai", which does not carry them — producing a 404 with no
// fallback for bare (non-combo) requests.
//
// Fix: the fallback must only apply when there are ZERO known catalog
// candidates for the model id (providers.length === 0).

const KNOWN_GPT_OSS_120B_PROVIDERS = new Set(["fireworks", "cerebras", "scaleway", "byteplus"]);

test("gpt-oss-120b resolves into its cataloged open-weight providers, not openai (#5852)", async () => {
  const info = await getModelInfoCore("gpt-oss-120b", null);

  assert.notEqual(
    info.provider,
    "openai",
    "gpt-oss-120b must not be hijacked into the openai-family fallback"
  );

  // Multiple providers catalog this open-weight model id, so the resolver correctly
  // reports it as ambiguous (asking the caller to disambiguate with a provider/model
  // prefix) instead of silently defaulting to openai (which doesn't carry it → 404).
  assert.equal(info.errorType, "ambiguous_model");
  assert.ok(Array.isArray(info.candidateProviders) && info.candidateProviders.length > 0);
  assert.ok(
    info.candidateProviders.some((p: string) => KNOWN_GPT_OSS_120B_PROVIDERS.has(p)),
    `expected at least one candidate from ${[...KNOWN_GPT_OSS_120B_PROVIDERS].join(
      ", "
    )}, got ${JSON.stringify(info.candidateProviders)}`
  );
  assert.ok(
    !info.candidateProviders.includes("openai"),
    "openai must not be listed as a candidate for gpt-oss-120b"
  );
});

test("regression guard: a genuinely-uncataloged openai-family id still falls back to openai (#5852)", async () => {
  const info = await getModelInfoCore("gpt-5.9-imaginary-unreleased", null);

  assert.equal(
    info.provider,
    "openai",
    "uncataloged gpt-* ids with zero known candidates must still fall back to openai"
  );
});
