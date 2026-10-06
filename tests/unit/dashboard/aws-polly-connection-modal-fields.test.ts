import test from "node:test";
import assert from "node:assert/strict";

import {
  assignEditApiKeyProviderSpecificData,
  buildAddProviderSpecificData,
} from "../../../src/app/(dashboard)/dashboard/providers/[id]/components/modals/connectionProviderSpecificData.ts";

const BASE_FORM_DATA = {
  accountId: "",
  apiRegion: "international",
  awsAccessKeyId: "",
  awsSessionToken: "",
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
    provider: "aws-polly",
    formData: BASE_FORM_DATA,
    openRouterPreset: NOOP_OPEN_ROUTER_PRESET_ADD,
    showFreeModelsToggle: false,
    isGooglePse: false,
    usesBaseUrl: false,
    validatedBaseUrl: null,
    showsRegion: false,
    defaultRegion: "us-east-1",
    isGlm: false,
    isCloudflare: false,
    ...overrides,
  };
}

function baseEditOptions(
  overrides: Partial<Parameters<typeof assignEditApiKeyProviderSpecificData>[0]>
) {
  return {
    provider: "aws-polly",
    formData: BASE_FORM_DATA,
    target: {} as Record<string, unknown>,
    extraApiKeys: [],
    openRouterPreset: NOOP_OPEN_ROUTER_PRESET_EDIT,
    usesBaseUrl: false,
    validatedBaseUrl: null,
    showsRegion: false,
    defaultRegion: "us-east-1",
    isGlm: false,
    isCloudflare: false,
    isAntigravityFamily: false,
    trimmedCloudCodeProjectId: "",
    isGooglePse: false,
    isCcCompatible: false,
    ...overrides,
  };
}

test("buildAddProviderSpecificData stores AWS Polly signing metadata", () => {
  const data = buildAddProviderSpecificData(
    baseAddOptions({
      formData: {
        ...BASE_FORM_DATA,
        awsAccessKeyId: " AKIA_TEST ",
        region: " us-east-2 ",
        awsSessionToken: " token ",
      },
    })
  );

  assert.deepEqual(data, {
    accessKeyId: "AKIA_TEST",
    region: "us-east-2",
    sessionToken: "token",
  });
});

test("buildAddProviderSpecificData omits Polly metadata for other providers", () => {
  const data = buildAddProviderSpecificData(
    baseAddOptions({
      provider: "openai",
      formData: { ...BASE_FORM_DATA, awsAccessKeyId: "AKIA_TEST", awsSessionToken: "token" },
    })
  );

  assert.equal(data, undefined);
});

test("assignEditApiKeyProviderSpecificData updates and clears Polly metadata", () => {
  const target: Record<string, unknown> = { accessKeyId: "OLD", sessionToken: "old-token" };
  assignEditApiKeyProviderSpecificData(
    baseEditOptions({
      target,
      formData: {
        ...BASE_FORM_DATA,
        awsAccessKeyId: " AKIA_NEW ",
        region: " eu-west-1 ",
        awsSessionToken: " ",
      },
    })
  );

  assert.equal(target.accessKeyId, "AKIA_NEW");
  assert.equal(target.region, "eu-west-1");
  assert.equal(target.sessionToken, undefined);
});

test("assignEditApiKeyProviderSpecificData leaves Polly metadata untouched for other providers", () => {
  const target: Record<string, unknown> = {};
  assignEditApiKeyProviderSpecificData(
    baseEditOptions({
      provider: "openai",
      target,
      formData: { ...BASE_FORM_DATA, awsAccessKeyId: "AKIA_NEW", awsSessionToken: "token" },
    })
  );

  assert.equal(target.accessKeyId, undefined);
  assert.equal(target.sessionToken, undefined);
});
