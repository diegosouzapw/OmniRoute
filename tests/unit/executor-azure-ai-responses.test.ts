/**
 * Tests for Azure AI Foundry + OCI generic-OpenAI providers with
 * apiFormat=responses routing (PR #2236).
 *
 * Covers:
 *   1. transformRequest strips stream_options when routing to /responses.
 *   2. buildUrl picks the /responses path when
 *      providerSpecificData._omnirouteForceResponsesUpstream === true.
 *   3. The default chat path is preserved for non-responses requests.
 */
import test from "node:test";
import assert from "node:assert/strict";

import { DefaultExecutor } from "@omniroute/open-sse/executors/default.ts";

test("DefaultExecutor.transformRequest strips stream_options for openai-responses target (azure-ai)", () => {
  const executor = new DefaultExecutor("azure-ai");
  const body = {
    model: "gpt-4.1",
    input: "hi",
    stream_options: { include_usage: true },
  };

  // providerSpecificData with apiType=responses signals openai-responses target.
  const result = executor.transformRequest("gpt-4.1", body, true, {
    providerSpecificData: {
      baseUrl: "https://example-resource.services.ai.azure.com/openai/v1",
      apiType: "responses",
    },
  });

  assert.equal(
    (result as { stream_options?: unknown }).stream_options,
    undefined,
    "stream_options must be stripped on /responses path"
  );
});

test("DefaultExecutor.buildUrl forces /responses path when _omnirouteForceResponsesUpstream=true", () => {
  const executor = new DefaultExecutor("azure-ai");

  const forced = executor.buildUrl("gpt-4.1", true, 0, {
    providerSpecificData: {
      baseUrl: "https://example-resource.services.ai.azure.com/openai/v1",
      _omnirouteForceResponsesUpstream: true,
    },
  });

  // Even without apiType: "responses" on credentials, the force flag must win.
  assert.match(
    forced,
    /\/responses(\?|$)/,
    "Forced upstream flag must route to the /responses endpoint"
  );

  const defaultPath = executor.buildUrl("gpt-4.1", true, 0, {
    providerSpecificData: {
      baseUrl: "https://example-resource.services.ai.azure.com/openai/v1",
    },
  });

  assert.match(
    defaultPath,
    /\/chat\/completions(\?|$)/,
    "Default azure-ai path must be /chat/completions when force flag is absent"
  );
});

test("DefaultExecutor: apiType=responses on credentials still routes to /responses (azure-ai)", () => {
  const executor = new DefaultExecutor("azure-ai");

  const result = executor.buildUrl("gpt-4.1", true, 0, {
    providerSpecificData: {
      baseUrl: "https://example-resource.services.ai.azure.com/openai/v1",
      apiType: "responses",
    },
  });

  assert.match(result, /\/responses(\?|$)/);
});

test("DefaultExecutor: OCI generic-OpenAI honors force-responses flag", () => {
  const executor = new DefaultExecutor("oci");

  const forced = executor.buildUrl("openai.gpt-oss-20b", true, 0, {
    providerSpecificData: {
      baseUrl: "https://inference.generativeai.us-ashburn-1.oci.oraclecloud.com",
      _omnirouteForceResponsesUpstream: true,
    },
  });

  assert.match(forced, /\/responses(\?|$)/, "OCI must also honor the responses force flag");
});
