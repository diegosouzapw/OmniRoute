import assert from "node:assert/strict";
import test from "node:test";

import {
  getEligibleFreeOnboardingProviders,
  setupFreeProviderConnections,
} from "../../src/lib/providers/freeOnboarding.ts";

test("batch setup creates missing providers, skips existing ones, and is retry-safe", async () => {
  const existing = [{ provider: "opencode", name: "My customized OpenCode" }];
  const created: Array<{ provider: string; name: string }> = [];
  const candidates = getEligibleFreeOnboardingProviders();
  const requestedIds = ["opencode", "cloudflare-playground"];

  const first = await setupFreeProviderConnections({
    requestedIds,
    candidates,
    listExisting: async () => [...existing, ...created],
    create: async (input) => {
      created.push({ provider: input.provider, name: input.name });
      return { id: `created-${input.provider}` };
    },
  });
  const second = await setupFreeProviderConnections({
    requestedIds,
    candidates,
    listExisting: async () => [...existing, ...created],
    create: async (input) => {
      created.push({ provider: input.provider, name: input.name });
      return { id: `created-${input.provider}` };
    },
  });

  assert.deepEqual(first.results, [
    { providerId: "opencode", status: "skipped", reason: "already-configured" },
    {
      providerId: "cloudflare-playground",
      status: "created",
      connectionId: "created-cloudflare-playground",
    },
  ]);
  assert.deepEqual(second.results, [
    { providerId: "opencode", status: "skipped", reason: "already-configured" },
    { providerId: "cloudflare-playground", status: "skipped", reason: "already-configured" },
  ]);
  assert.deepEqual(existing, [{ provider: "opencode", name: "My customized OpenCode" }]);
  assert.deepEqual(created, [
    { provider: "cloudflare-playground", name: "Cloudflare AI Playground" },
  ]);
});

test("batch setup rejects unknown or ineligible IDs before creating anything", async () => {
  let createCalls = 0;

  await assert.rejects(
    setupFreeProviderConnections({
      requestedIds: ["openai", "missing-provider"],
      candidates: getEligibleFreeOnboardingProviders(),
      listExisting: async () => [],
      create: async () => {
        createCalls += 1;
        return { id: "unexpected" };
      },
    }),
    /Ineligible free provider IDs: missing-provider, openai/
  );
  assert.equal(createCalls, 0);
});

test("partial failures are reported per provider and can be retried", async () => {
  const created = new Set<string>();
  let cloudflarePlaygroundAttempts = 0;
  const input = {
    requestedIds: ["opencode", "cloudflare-playground"],
    candidates: getEligibleFreeOnboardingProviders(),
    listExisting: async () => [...created].map((provider) => ({ provider })),
    create: async ({ provider }: { provider: string }) => {
      if (provider === "cloudflare-playground" && cloudflarePlaygroundAttempts++ === 0)
        throw new Error("upstream detail");
      created.add(provider);
      return { id: `created-${provider}` };
    },
  };

  const first = await setupFreeProviderConnections(input);
  const retry = await setupFreeProviderConnections(input);

  assert.deepEqual(first.results, [
    { providerId: "opencode", status: "created", connectionId: "created-opencode" },
    { providerId: "cloudflare-playground", status: "failed", reason: "Failed to create provider" },
  ]);
  assert.deepEqual(retry.results, [
    { providerId: "opencode", status: "skipped", reason: "already-configured" },
    {
      providerId: "cloudflare-playground",
      status: "created",
      connectionId: "created-cloudflare-playground",
    },
  ]);
});
