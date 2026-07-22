import test from "node:test";
import assert from "node:assert/strict";

const { handleNoCredentials } = await import("../../src/sse/handlers/chatHelpers.ts");
const { HTTP_STATUS } = await import("../../open-sse/config/constants.ts");

test("handleNoCredentials: web-cookie auth cooldown returns 401 re-auth, not unavailable/404", async () => {
  const res = handleNoCredentials(
    {
      allRateLimited: true,
      retryAfter: new Date(Date.now() + 60_000).toISOString(),
      retryAfterHuman: "in 1 minute",
      lastError:
        "Perplexity auth failed — session cookie may be expired. Re-paste your __Secure-next-auth.session-token.",
      lastErrorCode: 401,
    },
    null,
    "perplexity-web",
    "pplx-auto",
    null,
    null
  );
  assert.equal(res.status, HTTP_STATUS.UNAUTHORIZED);
  const body = await res.json();
  assert.match(String(body.error?.message || body.message || ""), /session cookie|re-paste|Perplexity/i);
  // must not look like missing credentials / model_not_found
  assert.notEqual(res.status, HTTP_STATUS.NOT_FOUND);
});

test("handleNoCredentials: non-cookie provider keeps unavailable cooldown behavior", async () => {
  const res = handleNoCredentials(
    {
      allRateLimited: true,
      retryAfter: new Date(Date.now() + 60_000).toISOString(),
      retryAfterHuman: "in 1 minute",
      lastError: "rate limited",
      lastErrorCode: 429,
    },
    null,
    "openai",
    "gpt-4o",
    null,
    null
  );
  // unavailable path is 429/503-style, not forced 401 session message
  assert.notEqual(res.status, HTTP_STATUS.NOT_FOUND);
  const body = await res.json();
  const msg = String(body.error?.message || "");
  assert.doesNotMatch(msg, /re-paste the browser session cookie/i);
});
