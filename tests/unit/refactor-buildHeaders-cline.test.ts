import test from "node:test";
import assert from "node:assert/strict";
import { DefaultExecutor } from "../../open-sse/executors/default.ts";

test("DefaultExecutor.buildHeaders: cline uses plain Bearer for apiKey-only (dual-auth BYOK)", () => {
  const executor = new DefaultExecutor("cline");

  // apiKey present, authType is "apikey", NO accessToken -> should route as BYOK
  const credentialsWithAuthType = {
    apiKey: "sk-my-cline-key",
    authType: "apikey",
  };

  const headers1 = executor.buildHeaders(credentialsWithAuthType, true);

  // It shouldn't have workos: prefix
  assert.equal(headers1["Authorization"], "Bearer sk-my-cline-key");
  assert.ok(headers1["HTTP-Referer"], "Missing HTTP-Referer");
  assert.ok(headers1["X-Title"], "Missing X-Title");

  // apiKey present, authType OMITTED (proves robustness against divergent/missing authType)
  const credentialsWithoutAuthType = {
    apiKey: "sk-my-cline-key",
  };

  const headers2 = executor.buildHeaders(credentialsWithoutAuthType, true);
  assert.equal(headers2["Authorization"], "Bearer sk-my-cline-key");
  assert.ok(headers2["HTTP-Referer"], "Missing HTTP-Referer");
  assert.ok(headers2["X-Title"], "Missing X-Title");

  // OAuth token present (accessToken) -> should route as OAuth with workos: prefix
  const credentialsOAuth = {
    accessToken: "workos_token_123",
  };

  const headers3 = executor.buildHeaders(credentialsOAuth, true);
  assert.equal(headers3["Authorization"], "Bearer workos:workos_token_123");
  assert.ok(headers3["HTTP-Referer"], "Missing HTTP-Referer");
  assert.ok(headers3["X-Title"], "Missing X-Title");
});
