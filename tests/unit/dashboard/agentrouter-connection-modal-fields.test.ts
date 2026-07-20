import test from "node:test";
import assert from "node:assert/strict";

import {
  assignEditApiKeyProviderSpecificData,
  buildAddProviderSpecificData,
} from "../../../src/app/(dashboard)/dashboard/providers/[id]/components/modals/connectionProviderSpecificData.ts";

// #6850 — the AgentRouter quota tracker (open-sse/services/agentrouterQuotaFetcher.ts)
// reads connection.providerSpecificData.consoleApiKey (New-API System Access Token) and
// connection.providerSpecificData.newApiUserId (New-Api-User header) for provider
// "agentrouter". These helpers back the Add/Edit connection modals and are the only place
// those fields get persisted from the dashboard UI — without this wiring the tracker can
// never populate for a real user, even though the fetcher itself is fully implemented.

const BASE_FORM_DATA = {
  accountId: "",
  apiRegion: "international",
  ccCompatibleContext1m: false,
  ccCompatibleRedactThinking: false,
  ccCompatibleSummarizeThinking: false,
  consoleApiKey: "",
  customUserAgent: "",
  cx: "",
  excludedModels: "",
  glmOrganizationId: "",
  glmProjectId: "",
  importFreeModelsOnly: false,
  m365Tier: undefined,
  newApiUserId: "",
  ollamaCloudUsageCookie: "",
  opencodeGoAuthCookie: "",
  opencodeGoWorkspaceId: "",
  passthroughModels: false,
  region: "",
  routingTags: "",
  tag: "",
  validationModelId: undefined,
};

const NOOP_OPEN_ROUTER_PRESET_ADD = { applyTo: () => {} };
const NOOP_OPEN_ROUTER_PRESET_EDIT = { getPatch: () => ({}) };

function baseAddOptions(overrides: Partial<Parameters<typeof buildAddProviderSpecificData>[0]>) {
  return {
    provider: "agentrouter",
    formData: BASE_FORM_DATA,
    openRouterPreset: NOOP_OPEN_ROUTER_PRESET_ADD,
    showFreeModelsToggle: false,
    isGooglePse: false,
    usesBaseUrl: false,
    validatedBaseUrl: null,
    showsRegion: false,
    defaultRegion: "us-central1",
    isGlm: false,
    isCloudflare: false,
    ...overrides,
  };
}

function baseEditOptions(
  overrides: Partial<Parameters<typeof assignEditApiKeyProviderSpecificData>[0]>
) {
  return {
    provider: "agentrouter",
    formData: BASE_FORM_DATA,
    target: {} as Record<string, unknown>,
    extraApiKeys: [],
    openRouterPreset: NOOP_OPEN_ROUTER_PRESET_EDIT,
    usesBaseUrl: false,
    validatedBaseUrl: null,
    showsRegion: false,
    defaultRegion: "us-central1",
    isGlm: false,
    isCloudflare: false,
    isAntigravityFamily: false,
    trimmedCloudCodeProjectId: "",
    isGooglePse: false,
    isCcCompatible: false,
    ...overrides,
  };
}

test("buildAddProviderSpecificData persists consoleApiKey + newApiUserId for provider agentrouter", () => {
  const data = buildAddProviderSpecificData(
    baseAddOptions({
      formData: { ...BASE_FORM_DATA, consoleApiKey: " sat-123 ", newApiUserId: " 42 " },
    })
  );

  assert.ok(data, "expected providerSpecificData to be defined");
  assert.equal(data?.consoleApiKey, "sat-123");
  assert.equal(data?.newApiUserId, "42");
});

test("buildAddProviderSpecificData omits consoleApiKey + newApiUserId for other providers", () => {
  const data = buildAddProviderSpecificData(
    baseAddOptions({
      provider: "openai",
      formData: { ...BASE_FORM_DATA, consoleApiKey: "sat-123", newApiUserId: "42" },
    })
  );

  assert.equal(data?.consoleApiKey, undefined);
  assert.equal(data?.newApiUserId, undefined);
});

test("buildAddProviderSpecificData still supports bailian-coding-plan consoleApiKey without newApiUserId", () => {
  const data = buildAddProviderSpecificData(
    baseAddOptions({
      provider: "bailian-coding-plan",
      formData: {
        ...BASE_FORM_DATA,
        consoleApiKey: "oracle-token",
        newApiUserId: "should-not-persist",
      },
    })
  );

  assert.equal(data?.consoleApiKey, "oracle-token");
  assert.equal(data?.newApiUserId, undefined);
});

test("assignEditApiKeyProviderSpecificData persists consoleApiKey + newApiUserId for provider agentrouter", () => {
  const target: Record<string, unknown> = {};
  assignEditApiKeyProviderSpecificData(
    baseEditOptions({
      target,
      formData: { ...BASE_FORM_DATA, consoleApiKey: " sat-456 ", newApiUserId: " 99 " },
    })
  );

  assert.equal(target.consoleApiKey, "sat-456");
  assert.equal(target.newApiUserId, "99");
});

test("assignEditApiKeyProviderSpecificData clears newApiUserId to undefined when blank for agentrouter", () => {
  const target: Record<string, unknown> = {};
  assignEditApiKeyProviderSpecificData(
    baseEditOptions({
      target,
      formData: { ...BASE_FORM_DATA, consoleApiKey: "", newApiUserId: "   " },
    })
  );

  assert.equal(target.consoleApiKey, undefined);
  assert.equal(target.newApiUserId, undefined);
});

test("assignEditApiKeyProviderSpecificData omits newApiUserId for non-agentrouter providers", () => {
  const target: Record<string, unknown> = {};
  assignEditApiKeyProviderSpecificData(
    baseEditOptions({
      provider: "openai",
      target,
      formData: { ...BASE_FORM_DATA, consoleApiKey: "sat-456", newApiUserId: "99" },
    })
  );

  assert.equal(target.consoleApiKey, undefined);
  assert.equal(target.newApiUserId, undefined);
});
