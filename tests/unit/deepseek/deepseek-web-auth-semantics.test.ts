import test from "node:test";
import assert from "node:assert/strict";

const { validateDeepSeekWebProvider } = await import(
  "../../../src/lib/providers/validation/webProvidersA.ts"
);
const { classifyFailure } = await import(
  "../../../src/app/api/providers/[id]/test/route.ts"
);

const SYNTHETIC_INVALID_TOKEN = "omniroute-auth-keeper-invalid-session-deepseek";

type DeepSeekValidationResult = Awaited<ReturnType<typeof validateDeepSeekWebProvider>>;

function statusCodeOf(result: DeepSeekValidationResult): number | undefined {
  if ("statusCode" in result && typeof result.statusCode === "number") {
    return result.statusCode;
  }
  return undefined;
}

async function withFetchResponse(body: unknown, status: number, fn: () => Promise<void>) {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () =>
    new Response(JSON.stringify(body), {
      status,
      headers: { "Content-Type": "application/json" },
    });

  try {
    await fn();
  } finally {
    globalThis.fetch = originalFetch;
  }
}

test("DeepSeek HTTP 200 code 40003 is surfaced as auth-classifiable 401", async () => {
  await withFetchResponse(
    {
      code: 40003,
      msg: "Authorization Failed",
      data: { biz_data: null },
    },
    200,
    async () => {
      const result = await validateDeepSeekWebProvider({
        apiKey: SYNTHETIC_INVALID_TOKEN,
      });
      const statusCode = statusCodeOf(result);

      assert.equal(result.valid, false);
      assert.equal(statusCode, 401);
      assert.match(String(result.error ?? ""), /invalid or expired/i);
      assert.doesNotMatch(String(result.error ?? ""), new RegExp(SYNTHETIC_INVALID_TOKEN));

      const diagnosis = classifyFailure({
        error: result.error,
        statusCode,
        provider: "deepseek-web",
      });
      assert.equal(diagnosis.type, "upstream_auth_error");
      assert.equal(diagnosis.code, "401");
    }
  );
});

test("DeepSeek unknown HTTP 200 business failure is not synthesized into 401", async () => {
  await withFetchResponse(
    {
      code: 49999,
      msg: "Temporary provider condition",
      data: { biz_data: null },
    },
    200,
    async () => {
      const result = await validateDeepSeekWebProvider({
        apiKey: SYNTHETIC_INVALID_TOKEN,
      });
      const statusCode = statusCodeOf(result);

      assert.equal(result.valid, false);
      assert.equal(statusCode, undefined);

      const diagnosis = classifyFailure({
        error: result.error,
        statusCode,
        provider: "deepseek-web",
      });
      assert.equal(diagnosis.type, "upstream_error");
      assert.equal(diagnosis.code, "upstream_error");
    }
  );
});

test("DeepSeek literal 401 and 403 preserve their HTTP auth status", async () => {
  for (const status of [401, 403]) {
    await withFetchResponse({}, status, async () => {
      const result = await validateDeepSeekWebProvider({
        apiKey: SYNTHETIC_INVALID_TOKEN,
      });
      const statusCode = statusCodeOf(result);

      assert.equal(result.valid, false);
      assert.equal(statusCode, status);

      const diagnosis = classifyFailure({
        error: result.error,
        statusCode,
        provider: "deepseek-web",
      });
      assert.equal(diagnosis.type, "upstream_auth_error");
      assert.equal(diagnosis.code, String(status));
    });
  }
});

test("DeepSeek valid HTTP 200 response with derived token remains healthy", async () => {
  await withFetchResponse(
    {
      code: 0,
      msg: "",
      data: { biz_data: { token: "synthetic-derived-access-token" } },
    },
    200,
    async () => {
      const result = await validateDeepSeekWebProvider({
        apiKey: "synthetic-valid-user-token",
      });
      assert.deepEqual(result, { valid: true, error: null });
    }
  );
});
