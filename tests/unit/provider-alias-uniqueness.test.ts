/**
 * Provider alias uniqueness — no two provider IDs may share the same short alias.
 *
 * Before this guard, three aliases collided in the registry and the LAST entry in
 * iteration order silently won, emitting a startup warning and shadowing a real
 * provider:
 *   - "kimi" → kimi-web (shadowed the kimi provider that gained a dedicated executor)
 *   - "hc"   → hackclub (shadowed huggingchat)
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
  assert.equal(PROVIDER_ID_TO_ALIAS["qwen-web"], "qwen-web");
  assert.equal(PROVIDER_ID_TO_ALIAS.kimi, "kimi");
  assert.equal(PROVIDER_ID_TO_ALIAS["kimi-web"], "kimi-web");
  assert.equal(PROVIDER_ID_TO_ALIAS.hackclub, "hc");
  assert.equal(PROVIDER_ID_TO_ALIAS.huggingchat, "huggingchat");
});

test("src/shared providers map resolves the same aliases unambiguously", () => {
  // alias → id
  assert.equal(resolveProviderId("kimi"), "kimi");
  assert.equal(resolveProviderId("hc"), "hackclub");
  // id used as alias for the secondary variants
  assert.equal(resolveProviderId("qwen-web"), "qwen-web");
  assert.equal(resolveProviderId("kimi-web"), "kimi-web");
  assert.equal(resolveProviderId("huggingchat"), "huggingchat");
  // id → alias
  assert.equal(getProviderAlias("kimi"), "kimi");
  assert.equal(getProviderAlias("hackclub"), "hc");
});

// #6673: hailuo-web must not collide with the paid API-key minimax/minimax-cn
// providers — it uses its own id as alias, per the secondary-variant convention.
test("hailuo-web resolves to its own id/alias and does not collide with minimax", () => {
  assert.equal(PROVIDER_ID_TO_ALIAS["hailuo-web"], "hailuo-web");
  assert.equal(resolveProviderId("hailuo-web"), "hailuo-web");
  assert.equal(getProviderAlias("hailuo-web"), "hailuo-web");
  assert.equal(resolveProviderId("minimax"), "minimax");
  assert.equal(resolveProviderId("minimax-cn"), "minimax-cn");
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
