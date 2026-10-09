import test from "node:test";
import assert from "node:assert/strict";
import { DefaultExecutor } from "../../open-sse/executors/default.ts";

test("DefaultExecutor.buildHeaders: cline uses plain Bearer for apiKey-only (dual-auth BYOK)", () => {
  const executor = new DefaultExecutor("cline");

  // apiKey present, authType is "apikey", NO accessToken -> should route as BYOK
  const credentials = {
    apiKey: "sk-my-cline-key",
    authType: "apikey",
  };

  const headers = executor.buildHeaders(credentials, true);

  // It shouldn't have workos: prefix
  assert.equal(headers["Authorization"], "Bearer sk-my-cline-key");

  // Should still have Cline protocol headers
  assert.ok(headers["HTTP-Referer"], "Missing HTTP-Referer");
  assert.ok(headers["X-Title"], "Missing X-Title");
});
