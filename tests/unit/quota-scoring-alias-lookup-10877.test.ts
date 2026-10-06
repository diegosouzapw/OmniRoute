import { test } from "node:test";
import assert from "node:assert/strict";
import { getResetAwareProvider } from "../../open-sse/services/combo/quotaScoring.ts";
import { registerQuotaFetcher, getQuotaFetcher } from "../../open-sse/services/quotaPreflight.ts";
import { resolveProviderId } from "../../src/shared/constants/providers.ts";
import type { ResolvedComboTarget } from "../../open-sse/services/combo/types.ts";

function buildTarget(provider: string): ResolvedComboTarget {
  return {
    kind: "model",
    stepId: "s1",
    executionKey: "e1",
    modelStr: `${provider}/some-model`,
    provider,
    providerId: provider,
    connectionId: "conn-1",
    weight: 1,
    label: null,
  } as ResolvedComboTarget;
}

test("#10877: getResetAwareProvider() canonicalizes an alias-spelled provider so the fetcher registered under the canonical id is found", () => {
  registerQuotaFetcher("ollama-cloud", async () => ({ ok: true }) as never);

  const target = buildTarget("ollamacloud");
  const lookedUpProvider = getResetAwareProvider(target);

  assert.equal(
    lookedUpProvider,
    resolveProviderId("ollamacloud"),
    "getResetAwareProvider() should return the canonical provider id, not the raw alias"
  );

  const fetcher = getQuotaFetcher(lookedUpProvider!);
  assert.notEqual(
    fetcher,
    undefined,
    "a fetcher registered under the canonical provider id must be found for an alias-spelled combo target"
  );
});

test("#10877: getResetAwareProvider() is a no-op (same cache key) for already-canonical provider ids", () => {
  registerQuotaFetcher("codex", async () => ({ ok: true }) as never);

  const target = buildTarget("codex");
  const lookedUpProvider = getResetAwareProvider(target);

  assert.equal(lookedUpProvider, "codex");
  assert.notEqual(getQuotaFetcher(lookedUpProvider!), undefined);
});

test("#10877: getResetAwareProvider() returns null when neither providerId nor provider is set", () => {
  const target = {
    kind: "model",
    stepId: "s1",
    executionKey: "e1",
    modelStr: "unknown/model",
    provider: "",
    providerId: "",
    connectionId: "conn-1",
    weight: 1,
    label: null,
  } as ResolvedComboTarget;

  assert.equal(getResetAwareProvider(target), null);
});
