import test from "node:test";
import assert from "node:assert/strict";
import {
  shouldPassthroughUpstreamError,
  buildPassthroughErrorResponse,
} from "../../open-sse/utils/upstreamErrorPassthrough.ts";
import { buildSanitizedUpstreamErrorResponse } from "../../open-sse/utils/upstreamErrorResponse.ts";

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
  await t.test(
    "corpo que ecoa uma credencial (Bearer/api_key/sk-) NÃO é elegível (#secret-leak hardening)",
    () => {
      // Some providers echo the offending request inside a 400/422 validation
      // body. Passthrough must refuse so the key is not relayed to the client.
      assert.equal(
        shouldPassthroughUpstreamError(400, {
          error: { message: "invalid request: Authorization: Bearer sk-live-abc123def456ghi" },
        }),
        false
      );
      assert.equal(
        shouldPassthroughUpstreamError(422, {
          error: { message: "bad field", received: { api_key: "sk-abc123def456" } },
        }),
        false
      );
      assert.equal(
        shouldPassthroughUpstreamError(429, {
          error: { message: 'rejected: {"api-key":"xyzabc123secret"}' },
        }),
        false
      );
      for (const message of [
        String.raw`rejected api_key\t=opaque-tab-secret-9382746`,
        String.raw`rejected api_key\u0009=opaque-unicode-tab-9382746`,
        String.raw`rejected Bearer\\topaque-bearer-secret-9382746`,
        "spawn failed: helper --api-key opaque-cli-key-9382746",
        'spawn failed: helper --token "opaque cli token 9382746"',
        "spawn failed: helper --password 'opaque-cli-password-9382746'",
        `upstream echoed hf_${"A".repeat(34)}`,
      ]) {
        assert.equal(shouldPassthroughUpstreamError(422, { error: { message } }), false, message);
      }
    }
  );
  await t.test(
    "corpo de capacidade/quota sem segredo continua elegível (contrato Claude Code preservado)",
    () => {
      // The common safe case must preserve wording so Claude Code can match it
      // after recursive sanitization and auto-disable capabilities.
      assert.equal(
        shouldPassthroughUpstreamError(400, {
          error: { message: "thinking.type: adaptive is not supported" },
        }),
        true
      );
      assert.equal(
        shouldPassthroughUpstreamError(429, {
          error: { type: "rate_limit_error", message: "slow down, retry after 60s" },
        }),
        true
      );
    }
  );
  await t.test("buildPassthroughErrorResponse preserves an already-safe JSON body", async () => {
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

test("passthrough preserves multiline capability wording without stack frames", async () => {
  const message = "validation failed\nthinking.type: adaptive is not supported";
  const res = buildPassthroughErrorResponse(400, {
    type: "error",
    error: { type: "invalid_request_error", message },
  });
  assert.ok(res);
  const body = (await res.json()) as { error?: { message?: string } };
  assert.equal(body.error?.message, message);
});

test("passthrough removes basename and URL stack frames while preserving prose URLs", async () => {
  const hostileMessages = [
    "boom\n    at handler (server.js:12:3)",
    String.raw`boom\n    at handler (server.js:12:3)`,
    "boom at handler (http://127.0.0.1:3000/_next/server.js:12:3)",
    "boom at handler (webpack-internal:///app/server.js:12:3)",
    "boom\n    at handler (http://127.0.0.1:3000/_next/server.js?build=abc:12:3)",
    String.raw`boom\n    at handler (webpack-internal:///app/server.js#chunk:12:3)`,
    String.raw`boom at handler (\Windows\Temp\server.js:12:3)`,
    "boom\nhandler@file:///home/runner/private.js:12:3",
    String.raw`boom\nhandler@/home/runner/private.cts:12:3`,
    "boom\nhandler@https://127.0.0.1:3000/_next/server.mts?build=abc:12:3",
    "boom at handler (http://127.0.0.1:3000/_next/chunks/route:12:3)",
  ];

  for (const message of hostileMessages) {
    const response = buildPassthroughErrorResponse(400, {
      type: "error",
      error: { type: "invalid_request_error", message },
    });
    assert.ok(response);
    const body = (await response.json()) as { error?: { message?: string } };
    assert.equal(body.error?.message, "boom");
  }

  const prose = "See https://example.com/docs/error for recovery guidance";
  const proseResponse = buildPassthroughErrorResponse(400, {
    type: "error",
    error: { type: "invalid_request_error", message: prose },
  });
  assert.ok(proseResponse);
  const proseBody = (await proseResponse.json()) as { error?: { message?: string } };
  assert.equal(proseBody.error?.message, prose);

  const proseWithCoordinates = "See https://example.com/docs/error:12:3 for recovery guidance";
  const proseWithCoordinatesResponse = buildPassthroughErrorResponse(400, {
    type: "error",
    error: { type: "invalid_request_error", message: proseWithCoordinates },
  });
  assert.ok(proseWithCoordinatesResponse);
  const proseWithCoordinatesBody = (await proseWithCoordinatesResponse.json()) as {
    error?: { message?: string };
  };
  assert.equal(proseWithCoordinatesBody.error?.message, proseWithCoordinates);
});

test("canonical upstream JSON projection redacts URL credentials", async () => {
  const response = buildSanitizedUpstreamErrorResponse({
    status: 422,
    rawBody: JSON.stringify({
      error: {
        message:
          "proxy failed https://svc-user:p4ss-opaque-9382@internal.example/v1?" +
          "X-Amz-Signature=amz-secret&sig=sas-secret",
      },
    }),
    fallbackMessage: "Upstream validation failed",
  });
  const serialized = await response.text();

  assert.equal(response.status, 422);
  assert.doesNotMatch(serialized, /svc-user|p4ss-opaque|amz-secret|sas-secret/i);
  assert.match(serialized, /\[REDACTED\]/);
});

test("createErrorResult opt-in passthrough (opts.passthrough)", async (t) => {
  await t.test(
    "com opts.passthrough e corpo elegível, result.response preserva o JSON upstream seguro",
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
