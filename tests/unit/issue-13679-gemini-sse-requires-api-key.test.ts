/**
 * Issue #13679 (PR E, item #6, gemini-SSE sub-finding) — CONFIRMATION test,
 * not a code fix.
 *
 * The audit cited `open-sse/translator/response/openai-to-gemini-sse.ts:289`,
 * but that line is a plain `return new Response(...)` — it is not where any
 * auth/CORS decision is made (verified by reading the file; also noted in the
 * plan-file). The actual DNS-rebinding-style exposure the audit is pointing
 * at depends entirely on the global `REQUIRE_API_KEY` posture: with it
 * enabled, `/v1beta/models/{model}:streamGenerateContent` (this route) is
 * classified CLIENT_API (`src/server/authz/classify.ts`) and fronted by
 * `clientApiPolicy` (`src/server/authz/policies/clientApi.ts`) through the
 * central `src/proxy.ts` middleware BEFORE the route handler (and therefore
 * the translator) ever runs — an anonymous/credential-less request is
 * rejected with 401 regardless of what Origin/Referer it presents (which is
 * exactly what defeats DNS rebinding: the attacker page can forge Origin but
 * not a valid bearer token). The CORS-header echo for this same route was
 * already hardened fail-closed by #12573 (tests/unit/gemini-cors-wildcard-
 * bypass.test.ts).
 *
 * This test locks that chain end-to-end so a future change to classify.ts /
 * clientApiPolicy.ts cannot silently reopen it. #13679 PR E closes the
 * "keyless AND world-reachable" combination the finding actually depends on
 * by shipping REQUIRE_API_KEY=true as the default posture for the published
 * container/Fly deployment (Dockerfile + fly.toml — see
 * issue-13679-container-posture-require-api-key.test.ts) — this test is what
 * proves that default, once applied, actually closes the gemini-SSE path.
 */
import test from "node:test";
import assert from "node:assert/strict";
import { classifyRoute } from "../../src/server/authz/classify.ts";
import { clientApiPolicy } from "../../src/server/authz/policies/clientApi.ts";

const GEMINI_STREAM_PATH = "/v1beta/models/gemini-2.5-flash:streamGenerateContent";

test("issue #13679: the gemini-SSE route is classified CLIENT_API (fronted by clientApiPolicy)", () => {
  const classification = classifyRoute(GEMINI_STREAM_PATH, "POST");
  assert.equal(classification.routeClass, "CLIENT_API");
});

test("issue #13679: an anonymous/DNS-rebinding-style request to the gemini-SSE route is rejected when REQUIRE_API_KEY=true", async () => {
  const originalRequireApiKey = process.env.REQUIRE_API_KEY;
  process.env.REQUIRE_API_KEY = "true";

  try {
    const classification = classifyRoute(GEMINI_STREAM_PATH, "POST");

    // A DNS-rebinding attacker page can forge whatever Origin/Referer it
    // likes — it presents none of the credentials clientApiPolicy checks.
    const forgedOriginRequest = new Request(`http://localhost${GEMINI_STREAM_PATH}`, {
      method: "POST",
      headers: { Origin: "http://attacker.example", Referer: "http://attacker.example/exploit" },
    });

    const outcome = await clientApiPolicy.evaluate({
      request: forgedOriginRequest,
      classification,
      requestId: "issue-13679-test",
    });

    assert.equal(outcome.allow, false);
    if (!outcome.allow) {
      assert.equal(outcome.status, 401);
    }
  } finally {
    if (originalRequireApiKey === undefined) {
      delete process.env.REQUIRE_API_KEY;
    } else {
      process.env.REQUIRE_API_KEY = originalRequireApiKey;
    }
  }
});
