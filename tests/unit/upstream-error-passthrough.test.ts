import test from "node:test";
import assert from "node:assert/strict";
import {
  shouldPassthroughUpstreamError,
  buildPassthroughErrorResponse,
} from "../../open-sse/utils/upstreamErrorPassthrough.ts";

test("upstream error passthrough", async (t) => {
  await t.test("4xx com corpo JSON de erro do provider é elegível", () => {
    const body = {
      type: "error",
      error: { type: "invalid_request_error", message: "thinking.type: adaptive is not supported" },
    };
    assert.equal(shouldPassthroughUpstreamError(400, body), true);
  });
  await t.test("5xx NÃO é elegível (segue sanitizado)", () => {
    assert.equal(shouldPassthroughUpstreamError(500, { error: { message: "x" } }), false);
  });
  await t.test("corpo com cara de vazamento interno (stack trace) NÃO é elegível", () => {
    assert.equal(
      shouldPassthroughUpstreamError(400, {
        error: { message: "Error\n    at /usr/lib/node_modules/omniroute/x.js:1" },
      }),
      false
    );
  });
  await t.test(
    "401/407 NÃO são elegíveis (credencial nossa pode vazar em www-authenticate)",
    () => {
      assert.equal(shouldPassthroughUpstreamError(401, { error: { message: "bad key" } }), false);
    }
  );
  await t.test("buildPassthroughErrorResponse preserva corpo byte-a-byte", async () => {
    const body = {
      type: "error",
      error: { type: "invalid_request_error", message: "thinking.type: nope" },
    };
    const res = buildPassthroughErrorResponse(400, body);
    assert.ok(res);
    assert.equal(res.status, 400);
    assert.deepEqual(await res.json(), body);
  });
  await t.test("retorna null quando inelegível", () => {
    assert.equal(buildPassthroughErrorResponse(500, {}), null);
  });
});

test("createErrorResult opt-in passthrough (opts.passthrough)", async (t) => {
  await t.test(
    "com opts.passthrough e corpo elegível, result.response é o corpo upstream verbatim",
    async () => {
      const { createErrorResult } = await import("../../open-sse/utils/error.ts");
      const upstreamBody = {
        type: "error",
        error: {
          type: "invalid_request_error",
          message: "thinking.type: adaptive is not supported",
        },
      };
      const result = createErrorResult(400, "msg", null, "code", "type", upstreamBody, {
        passthrough: true,
      });
      assert.deepEqual(await result.response.json(), upstreamBody);
      assert.equal(result.status, 400);
      // Internal classification fields must never be affected by passthrough.
      assert.equal(typeof result.error, "string");
      assert.notEqual(result.error, JSON.stringify(upstreamBody));
    }
  );

  await t.test("sem opts, comportamento atual (corpo sanitizado) é preservado", async () => {
    const { createErrorResult } = await import("../../open-sse/utils/error.ts");
    const upstreamBody = {
      type: "error",
      error: { type: "invalid_request_error", message: "thinking.type: adaptive is not supported" },
    };
    const result = createErrorResult(400, "msg", null, "code", "type", upstreamBody);
    const body = (await result.response.json()) as { error?: { message?: string } };
    assert.ok(body.error?.message, "sanitized body keeps the wrapped error.message shape");
    assert.ok(
      !JSON.stringify(body).includes("    at /"),
      "sanitized body never leaks stack-trace-like text"
    );
  });

  await t.test("com retryAfterMs e passthrough elegível, header Retry-After é setado", async () => {
    const { createErrorResult } = await import("../../open-sse/utils/error.ts");
    const upstreamBody = {
      type: "error",
      error: { type: "rate_limit_error", message: "slow down" },
    };
    const result = createErrorResult(429, "msg", 5000, "code", "type", upstreamBody, {
      passthrough: true,
    });
    assert.equal(result.response.headers.get("Retry-After"), "5");
    assert.deepEqual(await result.response.json(), upstreamBody);
  });

  await t.test(
    "opts.passthrough true mas corpo inelegível (401) cai no corpo sanitizado atual",
    async () => {
      const { createErrorResult } = await import("../../open-sse/utils/error.ts");
      const upstreamBody = { error: { message: "bad key" } };
      const result = createErrorResult(401, "unauthorized", null, "code", "type", upstreamBody, {
        passthrough: true,
      });
      const body = (await result.response.json()) as { error?: { message?: string } };
      assert.notDeepEqual(body, upstreamBody);
      assert.ok(body.error?.message, "sanitized body keeps the wrapped error.message shape");
    }
  );
});
