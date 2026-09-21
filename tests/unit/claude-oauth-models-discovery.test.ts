import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { buildClaudeModelsHeaders } from "../../src/lib/providerModels/claudeModelsHeaders.ts";
import {
  assembleProviderModelsHeaders,
  PROVIDER_MODELS_CONFIG,
} from "../../src/app/api/providers/[id]/models/discovery/providerModelsConfig.ts";

const OAUTH = "oauth-access-token-fixture";
const KEY = "sk-ant-api-key-fixture";

test("test 4: OAuth headers are RFC 6750 Authorization, not x-api-key", () => {
  const headers = assembleProviderModelsHeaders(PROVIDER_MODELS_CONFIG.claude, OAUTH, {
    accessToken: OAUTH,
    apiKey: KEY,
  });
  assert.match(headers.Authorization ?? "", /^Bearer /);
  assert.equal(headers.Authorization, ["Bearer", OAUTH].join(" "));
  assert.equal(headers["anthropic-beta"], "oauth-2025-04-20");
  assert.equal(headers["anthropic-version"] ?? headers["Anthropic-Version"], "2023-06-01");
  assert.equal(headers["x-api-key"], undefined);
  assert.ok(!("x-api-key" in headers));
});

test("test 5: API key headers set x-api-key only", () => {
  const headers = assembleProviderModelsHeaders(PROVIDER_MODELS_CONFIG.claude, KEY, {
    accessToken: "",
    apiKey: KEY,
  });
  assert.equal(headers["x-api-key"], KEY);
  assert.equal(headers.Authorization, undefined);
  assert.ok(!("Authorization" in headers));
});

test("test 6: route.ts has no claude static early return", () => {
  const src = fs.readFileSync(
    path.join(process.cwd(), "src/app/api/providers/[id]/models/route.ts"),
    "utf8",
  );
  assert.doesNotMatch(
    src,
    /if\s*\(\s*provider\s*===\s*"claude"\s*\)[\s\S]{0,400}getStaticModelsForProvider\(\s*"claude"/,
  );
});

test("mutation: OAuth context without buildHeaders would set x-api-key (helper contract)", () => {
  const direct = buildClaudeModelsHeaders({ accessToken: OAUTH, apiKey: KEY });
  assert.equal(direct["x-api-key"], undefined);
});
