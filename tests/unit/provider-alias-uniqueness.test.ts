/**
 * Provider alias uniqueness — no two provider IDs may share the same short alias.
 *
 * Before this guard, three aliases collided in the registry and the LAST entry in
 * iteration order silently won, emitting a startup warning and shadowing a real
 * provider:
 *   - "qw"   → qwen-web (shadowed qwen)
 *   - "kimi" → kimi-web (shadowed the kimi provider that gained a dedicated executor)
 *   - "hc"   → hackclub (shadowed huggingchat)
 *
 * The decision: the primary provider keeps the short alias; the web/secondary
 * variant takes its own id as alias. This test pins both the global uniqueness
 * invariant (so future additions can't silently re-collide) and the specific
 * resolutions for the six affected providers, across BOTH alias sources
 * (open-sse registry + src/shared providers map).
 */
import test from "node:test";
import assert from "node:assert/strict";

import { PROVIDER_ID_TO_ALIAS } from "../../open-sse/config/providerModels.ts";
import { resolveProviderId, getProviderAlias } from "../../src/shared/constants/providers.ts";

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

test("primary providers keep the short alias; web/secondary variants use their own id", () => {
  // open-sse registry (source of the startup warning + chat routing)
  assert.equal(PROVIDER_ID_TO_ALIAS.qwen, "qw");
  assert.equal(PROVIDER_ID_TO_ALIAS["qwen-web"], "qwen-web");
  assert.equal(PROVIDER_ID_TO_ALIAS.kimi, "kimi");
  assert.equal(PROVIDER_ID_TO_ALIAS["kimi-web"], "kimi-web");
  assert.equal(PROVIDER_ID_TO_ALIAS.hackclub, "hc");
  assert.equal(PROVIDER_ID_TO_ALIAS.huggingchat, "huggingchat");
});

test("src/shared providers map resolves the same aliases unambiguously", () => {
  // alias → id
  assert.equal(resolveProviderId("qw"), "qwen");
  assert.equal(resolveProviderId("kimi"), "kimi");
  assert.equal(resolveProviderId("hc"), "hackclub");
  // id used as alias for the secondary variants
  assert.equal(resolveProviderId("qwen-web"), "qwen-web");
  assert.equal(resolveProviderId("kimi-web"), "kimi-web");
  assert.equal(resolveProviderId("huggingchat"), "huggingchat");
  // id → alias
  assert.equal(getProviderAlias("qwen"), "qw");
  assert.equal(getProviderAlias("kimi"), "kimi");
  assert.equal(getProviderAlias("hackclub"), "hc");
});
