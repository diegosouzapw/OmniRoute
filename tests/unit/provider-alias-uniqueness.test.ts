/**
 * Provider alias uniqueness — no two provider IDs may share the same short alias.
 *
 * Before this guard, three aliases collided in the registry and the LAST entry in
 * iteration order silently won, emitting a startup warning and shadowing a real
 * provider:
 *   - "kimi" → kimi-web (shadowed the kimi provider that gained a dedicated executor)
 *   - "hc"   → the provider that held it shadowed huggingchat (it was later
 *     removed entirely, #11176; huggingchat keeps its own id as alias)
 *
 * The decision: the primary provider keeps the short alias; the web/secondary
 * variant takes its own id as alias. This test pins both the global uniqueness
 * invariant (so future additions can't silently re-collide) and the specific
 * resolutions for the affected providers, across BOTH alias sources
 * (open-sse registry + src/shared providers map).
 */
import test from "node:test";
import assert from "node:assert/strict";

import { PROVIDER_ID_TO_ALIAS } from "../../open-sse/config/providerModels.ts";
import {
  resolveProviderId,
  getProviderAlias,
  APIKEY_PROVIDERS,
  WEB_COOKIE_PROVIDERS,
} from "../../src/shared/constants/providers.ts";

test("no two provider IDs share the same alias in the open-sse registry", () => {
  const aliasToIds = new Map<string, string[]>();
  for (const [id, alias] of Object.entries(PROVIDER_ID_TO_ALIAS)) {
    const ids = aliasToIds.get(alias) ?? [];
    ids.push(id);
    aliasToIds.set(alias, ids);
  }

  const collisions = [...aliasToIds.entries()].filter(([, ids]) => ids.length > 1);
  assert.deepEqual(
    collisions,
    [],
    `Alias collisions detected (each alias must map to exactly one provider id): ${collisions
      .map(([alias, ids]) => `"${alias}" → ${ids.join(", ")}`)
      .join("; ")}`
  );
});

test("primary providers keep the short alias; web variants use their own id", () => {
  // open-sse registry (source of the startup warning + chat routing)
  assert.equal(PROVIDER_ID_TO_ALIAS.kimi, "kimi");
  assert.equal(PROVIDER_ID_TO_ALIAS["kimi-web"], "kimi-web");
  assert.equal(PROVIDER_ID_TO_ALIAS.huggingchat, "huggingchat");
});

test("src/shared providers map resolves the same aliases unambiguously", () => {
  // alias → id
  assert.equal(resolveProviderId("kimi"), "kimi");
  // ids used as aliases for the supported secondary variants
  assert.equal(resolveProviderId("kimi-web"), "kimi-web");
  assert.equal(resolveProviderId("huggingchat"), "huggingchat");
  // id → alias
  assert.equal(getProviderAlias("kimi"), "kimi");
});

test("retired Hailuo alias is absent while official MiniMax aliases remain distinct", () => {
  assert.equal(PROVIDER_ID_TO_ALIAS["hailuo-web"], undefined);
  assert.equal(PROVIDER_ID_TO_ALIAS.minimax, "minimax");
  assert.equal(PROVIDER_ID_TO_ALIAS["minimax-cn"], "minimax-cn");
  assert.equal(resolveProviderId("minimax"), "minimax");
  assert.equal(resolveProviderId("minimax-cn"), "minimax-cn");
});

test("freepik is the Magnific Mystic legacy alias, not a second provider id", () => {
  assert.equal(resolveProviderId("freepik"), "magnific");
  assert.equal(resolveProviderId("magnific"), "magnific");
  assert.equal(getProviderAlias("magnific"), "freepik");
  assert.ok("magnific" in APIKEY_PROVIDERS);
  assert.ok(!("freepik" in APIKEY_PROVIDERS));
});

test("no provider id is registered in both the API-key and web-cookie catalogs", () => {
  // A provider belongs to exactly one auth category; the same id in both catalogs
  // renders the provider twice in the dashboard (once per section). huggingchat
  // regressed this way (its API-key counterpart is the separate `huggingface`
  // Inference API id), so it must live ONLY in WEB_COOKIE_PROVIDERS.
  const apikeyIds = new Set(Object.keys(APIKEY_PROVIDERS));
  const overlap = Object.keys(WEB_COOKIE_PROVIDERS).filter((id) => apikeyIds.has(id));
  assert.deepEqual(overlap, [], `Providers duplicated across catalogs: ${overlap.join(", ")}`);

  assert.ok("huggingchat" in WEB_COOKIE_PROVIDERS, "huggingchat must be in the web-cookie catalog");
  assert.ok(
    !("huggingchat" in APIKEY_PROVIDERS),
    "huggingchat must NOT be in the API-key catalog (use `huggingface` for the API key path)"
  );
});
