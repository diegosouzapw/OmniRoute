import { test } from "node:test";
import assert from "node:assert/strict";

import {
  providerUsesAuthoritativeLiveCatalog,
  getRegistryEntry,
} from "../../open-sse/config/providerRegistry.ts";

// NVIDIA's `GET /v1/models` is a PARTIAL view of what the credential can route.
// It returns the media/infra buckets (flux, whisper, tacotron2, parakeet,
// embeddings, rerankers) plus only the two `nvidia/*` chat models, while the
// static registry also documents the third-party vendors the same connection
// fronts (moonshotai/, deepseek-ai/, meta/, poolside/, openai/).
//
// With the default `liveCatalogAuthoritative: true`, every static-only route was
// rejected BEFORE dispatch with:
//   Model '<id>' is not available in the active live catalog for provider 'nvidia'
// Observed 159x on 2026-09-12 for `moonshotai/kimi-k3` alone, which also made the
// nvidia combo target unusable (`nvidia/moonshotai/kimi-k3` failed 150x).
//
// `passthroughModels: true` (#6773) already scopes an upstream 4xx to the single
// model, so opting out of the authoritative gate is the matching fix.

test("nvidia opts out of the authoritative live catalog", () => {
  const entry = getRegistryEntry("nvidia");
  assert.ok(entry, "nvidia must be a registered provider");
  assert.equal(
    entry.liveCatalogAuthoritative,
    false,
    "nvidia discovery is partial; static-only vendor routes must stay routable"
  );
  assert.equal(providerUsesAuthoritativeLiveCatalog("nvidia"), false);
});

test("nvidia still declares passthroughModels so a single bad model cannot cool the connection", () => {
  // The two flags are a pair: passthroughModels keeps a per-model 4xx from
  // degrading the whole connection, liveCatalogAuthoritative:false keeps a
  // partial discovery response from suppressing static routes.
  const entry = getRegistryEntry("nvidia");
  assert.equal(entry?.passthroughModels, true);
});

test("nvidia keeps the third-party vendor models its live catalog omits", () => {
  const entry = getRegistryEntry("nvidia");
  const ids = new Set((entry?.models ?? []).map((m) => m.id));
  for (const id of [
    "moonshotai/kimi-k3",
    "deepseek-ai/deepseek-v4-pro-0813",
    "deepseek-ai/deepseek-v4-flash-0731",
    "meta/muse-glimmer-30b",
    "poolside/laguna-xs-2.1",
    "openai/gpt-oss-120b",
  ]) {
    assert.ok(ids.has(id), `static registry must keep documenting ${id}`);
  }
});

test("providers with full discovery stay authoritative", () => {
  // Guard the default: only partial-discovery providers opt out.
  assert.equal(providerUsesAuthoritativeLiveCatalog("kimi-coding-apikey"), true);
  assert.equal(providerUsesAuthoritativeLiveCatalog("nvidia"), false);
  assert.equal(providerUsesAuthoritativeLiveCatalog("command-code"), false);
});
