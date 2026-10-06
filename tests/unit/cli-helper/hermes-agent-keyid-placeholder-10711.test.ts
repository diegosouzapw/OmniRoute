/**
 * Regression test for #10711.
 *
 * The Hermes Agent dashboard "Apply" flow (HermesAgentToolCard.tsx) only
 * ever sends `keyId` (never a raw `apiKey`). Credentials belong in Hermes'
 * `.env`, while config.yaml references `OMNIROUTE_API_KEY` through the
 * canonical `custom_providers` schema. The generator must never serialize a
 * key or placeholder into config.yaml.
 */

import { test } from "node:test";
import assert from "node:assert/strict";
import * as yaml from "js-yaml";
import {
  generateHermesAgentConfig,
  sanitizeOmniRouteRoleCredentials,
} from "../../../src/lib/cli-helper/config-generator/hermes-agent.ts";

interface HermesAgentParsedConfig {
  providers?: Record<string, unknown>;
  custom_providers: Array<{ name: string; key_env: string; api_key?: string }>;
  delegation: { api_key?: string };
  auxiliary: Record<string, { api_key?: string }>;
}

test("Hermes Agent config references OMNIROUTE_API_KEY when only keyId is supplied", async () => {
  const result = await generateHermesAgentConfig({
    baseUrl: "http://localhost:20128",
    keyId: "some-stored-key-id", // what the real dashboard flow actually sends
    apiKey: null, // never resolved server-side — this is the bug
    selections: [
      { role: "default", model: "gpt-4o" },
      { role: "delegation", model: "gpt-4o" },
      { role: "vision", model: "gpt-4o-vision" },
    ],
  });

  assert.equal(result.error, undefined);
  const parsed = yaml.load(result.yaml) as HermesAgentParsedConfig;

  assert.equal(parsed.providers?.omniroute, undefined);
  const provider = parsed.custom_providers.find((entry) => entry.name === "omniroute");
  assert.equal(provider?.key_env, "OMNIROUTE_API_KEY");
  assert.equal(provider?.api_key, undefined);
  assert.equal(parsed.delegation.api_key, undefined);
  assert.equal(parsed.auxiliary.vision.api_key, undefined);
  assert.ok(!result.yaml.includes("YOUR_OMNIROUTE_API_KEY_HERE"));
});

test("Hermes Agent config never serializes an explicitly resolved API key", async () => {
  const result = await generateHermesAgentConfig({
    baseUrl: "http://localhost:20128",
    keyId: "some-stored-key-id",
    apiKey: "sk-resolved-real-key-value",
    selections: [
      { role: "default", model: "gpt-4o" },
      { role: "delegation", model: "gpt-4o" },
      { role: "vision", model: "gpt-4o-vision" },
    ],
  });

  assert.equal(result.error, undefined);
  const parsed = yaml.load(result.yaml) as HermesAgentParsedConfig;

  assert.ok(!result.yaml.includes("sk-resolved-real-key-value"));
  assert.equal(parsed.delegation.api_key, undefined);
  assert.equal(parsed.auxiliary.vision.api_key, undefined);
});

test("Hermes Agent config strips stale inline credentials from every OmniRoute role", () => {
  const config = {
    model: { provider: "omniroute", default: "main", base_url: "http://old", api_key: "main-key" },
    delegation: { provider: "omniroute", model: "delegate", api_key: "delegate-key" },
    auxiliary: {
      vision: {
        provider: "omniroute",
        model: "vision",
        base_url: "http://old",
        api_key: "vision-key",
      },
      other: { provider: "anthropic", model: "claude", api_key: "must-stay" },
    },
  };

  sanitizeOmniRouteRoleCredentials(config);

  assert.equal(config.model.api_key, undefined);
  assert.equal(config.model.base_url, undefined);
  assert.equal(config.delegation.api_key, undefined);
  assert.equal(config.auxiliary.vision.api_key, undefined);
  assert.equal(config.auxiliary.vision.base_url, undefined);
  assert.equal(config.auxiliary.other.api_key, "must-stay");
});
