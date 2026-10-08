/**
 * #11742 — Arena (lmarena) public error boundary.
 *
 * Split out of `lmarena-provider.test.ts` to keep that file under the test size cap.
 * Every public failure is projected onto Arena's fixed public vocabulary
 * (`open-sse/executors/lmarena/error.ts` + `lmarena/response.ts`); upstream bodies,
 * transport rejections and TLS failures never reach the client verbatim.
 *
 * Run: node --import tsx/esm --test tests/unit/lmarena-public-error-boundary-11742.test.ts
 */

import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { LMArenaExecutor } from "../../open-sse/executors/lmarena.ts";
import {
  __setTlsFetchOverrideForTesting,
  TlsClientUnavailableError,
} from "../../open-sse/services/lmarenaTlsClient.ts";

const TEST_ARENA_MODEL_ID = "019e080d-c29d-7d9a-aa54-faed41da0763";

describe("LMArena Executor — public error boundary", () => {
  it("normalizes an invalid upstream status before building the public error", async () => {
    __setTlsFetchOverrideForTesting(async () => ({
      status: 700,
      headers: new Headers({ "Content-Type": "text/plain" }),
      text: "InvalidStatusInternalFailure secret-status-id",
      body: null,
    }));

    try {
      const result = await new LMArenaExecutor().execute({
        model: TEST_ARENA_MODEL_ID,
        body: { messages: [{ role: "user", content: "Hello" }] },
        credentials: { cookie: "session=test" },
        signal: new AbortController().signal,
        log: null,
      });

      assert.equal(result.response.status, 502);
      const responseText = await result.response.text();
      assert.deepEqual(JSON.parse(responseText).error, {
        message: "Arena API error: 502",
        type: "api_error",
        code: "502",
      });
      assert.doesNotMatch(responseText, /InvalidStatusInternalFailure|secret-status-id/i);
    } finally {
      __setTlsFetchOverrideForTesting(null);
    }
  });

  it("normalizes an upstream redirect before building the public error", async () => {
    __setTlsFetchOverrideForTesting(async () => ({
      status: 302,
      headers: new Headers({ Location: "https://internal.arena.invalid/login" }),
      text: "RedirectInternalFailure secret-redirect-id",
      body: null,
    }));

    try {
      const result = await new LMArenaExecutor().execute({
        model: TEST_ARENA_MODEL_ID,
        body: { messages: [{ role: "user", content: "Hello" }] },
        credentials: { cookie: "session=test" },
        signal: new AbortController().signal,
        log: null,
      });

      assert.equal(result.response.status, 502);
      const responseText = await result.response.text();
      assert.deepEqual(JSON.parse(responseText).error, {
        message: "Arena API error: 502",
        type: "api_error",
        code: "502",
      });
      assert.doesNotMatch(
        responseText,
        /RedirectInternalFailure|secret-redirect-id|internal\.arena/i
      );
    } finally {
      __setTlsFetchOverrideForTesting(null);
    }
  });

  it("does not expose structured upstream error details while preserving classification", async () => {
    const executor = new LMArenaExecutor();
    __setTlsFetchOverrideForTesting(async () => ({
      status: 500,
      headers: new Headers({ "Content-Type": "application/json" }),
      text: JSON.stringify({
        error: {
          message:
            "SensitiveDatabaseAdapter failed\n" +
            "    at loadSecret (/srv/private/lmarena/database.ts:46:7)",
          stack: "Error: database failure at /srv/private/lmarena/database.ts:46:7",
          cause: "postgresql://private-user:private-password@internal-db/arena",
        },
      }),
      body: null,
    }));

    try {
      const result = await executor.execute({
        model: TEST_ARENA_MODEL_ID,
        body: { messages: [{ role: "user", content: "Hello" }] },
        credentials: { cookie: "session=test" },
        signal: new AbortController().signal,
        log: console,
      });

      assert.equal(result.response.status, 500);
      const responseText = await result.response.text();
      const errorBody = JSON.parse(responseText);
      assert.deepEqual(errorBody.error, {
        message: "Arena API error: 500",
        type: "api_error",
        code: "500",
      });
      assert.doesNotMatch(
        responseText,
        /SensitiveDatabaseAdapter|loadSecret|database\.ts|private-password|stack|cause/i
      );
    } finally {
      __setTlsFetchOverrideForTesting(null);
    }
  });

  it("does not expose plaintext upstream error details while preserving classification", async () => {
    __setTlsFetchOverrideForTesting(async () => ({
      status: 500,
      headers: new Headers({ "Content-Type": "text/plain" }),
      text:
        "SensitivePlaintextFailure: internal adapter failed\n" +
        "    at loadSecret (/srv/private/lmarena/plaintext.ts:71:9)",
      body: null,
    }));

    try {
      const result = await new LMArenaExecutor().execute({
        model: TEST_ARENA_MODEL_ID,
        body: { messages: [{ role: "user", content: "Hello" }] },
        credentials: { cookie: "session=test" },
        signal: new AbortController().signal,
        log: console,
      });

      assert.equal(result.response.status, 500);
      const responseText = await result.response.text();
      const errorBody = JSON.parse(responseText);
      assert.deepEqual(errorBody.error, {
        message: "Arena API error: 500",
        type: "api_error",
        code: "500",
      });
      assert.doesNotMatch(
        responseText,
        /SensitivePlaintextFailure|internal adapter|loadSecret|plaintext\.ts/i
      );
    } finally {
      __setTlsFetchOverrideForTesting(null);
    }
  });

  it("sanitizes network failure details before logging or responding", async () => {
    const errorLogs: string[] = [];
    __setTlsFetchOverrideForTesting(async () => {
      throw new Error(
        "Arena request failed at /srv/private/lmarena-request.ts:17:5; " +
          "access_token=lmarena-network-secret\n" +
          "    at SecretArenaFrame (/srv/private/lmarena-stack.ts:2:3)"
      );
    });

    try {
      const result = await new LMArenaExecutor().execute({
        model: TEST_ARENA_MODEL_ID,
        body: { messages: [{ role: "user", content: "Hello" }] },
        credentials: { cookie: "session=test" },
        signal: new AbortController().signal,
        log: { error: (_scope, message) => errorLogs.push(String(message)) },
      });

      assert.equal(result.response.status, 502);
      assert.equal(errorLogs.length, 1);
      const responseText = await result.response.text();
      const json = JSON.parse(responseText);
      assert.equal(json.error?.message, "Arena upstream error");
      assert.equal(json.error?.type, "network_error");
      assert.equal(json.error?.code, "request_failed");
      const publicOutput = `${errorLogs.join("\n")}\n${responseText}`;
      assert.match(publicOutput, /Arena request failed/);
      assert.doesNotMatch(publicOutput, /\/srv\/private\/lmarena-(?:request|stack)\.ts/);
      assert.doesNotMatch(publicOutput, /lmarena-network-secret|SecretArenaFrame/);
      assert.doesNotMatch(responseText, /"(?:stack|cause)"\s*:/i);
    } finally {
      __setTlsFetchOverrideForTesting(null);
    }
  });

  it("fails closed when a network rejection refuses string coercion", async () => {
    const errorLogs: string[] = [];
    __setTlsFetchOverrideForTesting(async () => {
      throw {
        toString() {
          throw new Error("access_token=hostile-secret at /srv/private/lmarena.ts:1:2");
        },
      };
    });

    try {
      const result = await new LMArenaExecutor().execute({
        model: TEST_ARENA_MODEL_ID,
        body: { messages: [{ role: "user", content: "Hello" }] },
        credentials: { cookie: "session=test" },
        signal: new AbortController().signal,
        log: { error: (_scope, message) => errorLogs.push(String(message)) },
      });

      assert.equal(result.response.status, 502);
      assert.deepEqual(errorLogs, ["Request failed: Arena upstream error"]);
      const json = await result.response.json();
      assert.deepEqual(json.error, {
        message: "Arena upstream error",
        type: "network_error",
        code: "request_failed",
      });
    } finally {
      __setTlsFetchOverrideForTesting(null);
    }
  });

  it("fails closed when network rejection prototype inspection throws", async () => {
    const hostileFailure = new Proxy(
      {},
      {
        getPrototypeOf() {
          throw new Error("access_token=prototype-secret at /srv/private/prototype.ts:1:2");
        },
        get(_target, property) {
          if (property === "toString") {
            return () => {
              throw new Error("access_token=coercion-secret at /srv/private/coercion.ts:1:2");
            };
          }
          return undefined;
        },
      }
    );
    const errorLogs: string[] = [];
    __setTlsFetchOverrideForTesting(async () => {
      throw hostileFailure;
    });

    try {
      const result = await new LMArenaExecutor().execute({
        model: TEST_ARENA_MODEL_ID,
        body: { messages: [{ role: "user", content: "Hello" }] },
        credentials: { cookie: "session=test" },
        signal: new AbortController().signal,
        log: { error: (_scope, message) => errorLogs.push(String(message)) },
      });

      assert.equal(result.response.status, 502);
      assert.deepEqual(errorLogs, ["Request failed: Arena upstream error"]);
      const responseText = await result.response.text();
      assert.doesNotMatch(responseText, /prototype-secret|coercion-secret|\/srv\/private/);
    } finally {
      __setTlsFetchOverrideForTesting(null);
    }
  });

  it("uses a stable fallback for blank TLS-unavailable errors", async () => {
    const errorLogs: string[] = [];
    __setTlsFetchOverrideForTesting(async () => {
      throw new TlsClientUnavailableError(
        "\n    at SecretOnlyFrame (/srv/private/lmarena-tls-stack-only.ts:2:3)"
      );
    });

    try {
      const result = await new LMArenaExecutor().execute({
        model: TEST_ARENA_MODEL_ID,
        body: { messages: [{ role: "user", content: "Hello" }] },
        credentials: { cookie: "session=test" },
        signal: new AbortController().signal,
        log: { error: (_scope, message) => errorLogs.push(String(message)) },
      });

      assert.equal(result.response.status, 502);
      assert.deepEqual(errorLogs, ["TLS client unavailable: Arena upstream error"]);
      const responseText = await result.response.text();
      const json = JSON.parse(responseText);
      assert.equal(json.error?.type, "upstream_error");
      assert.equal(json.error?.code, "TLS_CLIENT_UNAVAILABLE");
      assert.equal(
        json.error?.message,
        "Arena TLS impersonation unavailable: Arena upstream error. Verify the wreq-js 3.2 native binding."
      );
      assert.doesNotMatch(responseText, /SecretOnlyFrame|lmarena-tls-stack-only/);
    } finally {
      __setTlsFetchOverrideForTesting(null);
    }
  });

  it("does not expose TLS-client failure details in the public response", async () => {
    const tlsFailure = new TlsClientUnavailableError(
      "NativeTlsBridgeFailure secret-adapter-id at /srv/private/lmarena-native.ts:22:4"
    ) as TlsClientUnavailableError & { cause?: unknown };
    tlsFailure.cause = new Error("NativeTlsCause secret-cause-id");
    __setTlsFetchOverrideForTesting(async () => {
      throw tlsFailure;
    });

    try {
      const result = await new LMArenaExecutor().execute({
        model: TEST_ARENA_MODEL_ID,
        body: { messages: [{ role: "user", content: "Hello" }] },
        credentials: { cookie: "session=test" },
        signal: new AbortController().signal,
        log: null,
      });

      assert.equal(result.response.status, 502);
      const responseText = await result.response.text();
      const json = JSON.parse(responseText);
      assert.deepEqual(json.error, {
        message:
          "Arena TLS impersonation unavailable: Arena upstream error. Verify the wreq-js 3.2 native binding.",
        type: "upstream_error",
        code: "TLS_CLIENT_UNAVAILABLE",
      });
      assert.doesNotMatch(
        responseText,
        /NativeTlsBridgeFailure|secret-adapter-id|lmarena-native|NativeTlsCause|secret-cause-id/i
      );
    } finally {
      __setTlsFetchOverrideForTesting(null);
    }
  });

  it("uses a stable public fallback for blank network and upstream event errors", async (t) => {
    const stackOnly = "\n    at SecretOnlyFrame (/srv/private/lmarena-stack-only.ts:2:3)";
    const cases = [
      {
        name: "network rejection",
        setup: () =>
          __setTlsFetchOverrideForTesting(async () => {
            throw stackOnly;
          }),
        expectedType: "network_error",
        expectedCode: "request_failed",
      },
      {
        name: "non-streaming upstream event",
        setup: () =>
          __setTlsFetchOverrideForTesting(async () => ({
            status: 200,
            headers: new Headers({ "Content-Type": "text/event-stream" }),
            text: `3:${JSON.stringify(stackOnly)}\n`,
            body: null,
          })),
        expectedType: "api_error",
        expectedCode: "lmarena_error",
      },
    ];

    for (const testCase of cases) {
      await t.test(testCase.name, async () => {
        testCase.setup();
        try {
          const result = await new LMArenaExecutor().execute({
            model: TEST_ARENA_MODEL_ID,
            body: { messages: [{ role: "user", content: "Hello" }] },
            credentials: { cookie: "session=test" },
            signal: new AbortController().signal,
            log: null,
          });

          assert.equal(result.response.status, 502);
          const responseText = await result.response.text();
          const json = JSON.parse(responseText);
          assert.equal(json.error?.message, "Arena upstream error");
          assert.equal(json.error?.type, testCase.expectedType);
          assert.equal(json.error?.code, testCase.expectedCode);
          assert.doesNotMatch(responseText, /SecretOnlyFrame|lmarena-stack-only/);
        } finally {
          __setTlsFetchOverrideForTesting(null);
        }
      });
    }
  });

  it("does not expose non-streaming upstream event details", async () => {
    const upstreamFailure =
      "ArenaEventInternalFailure secret-event-id\n" +
      "    at ArenaEventAdapter (/srv/private/lmarena-event.ts:31:8)";
    __setTlsFetchOverrideForTesting(async () => ({
      status: 200,
      headers: new Headers({ "Content-Type": "text/event-stream" }),
      text: `3:${JSON.stringify(upstreamFailure)}\n`,
      body: null,
    }));

    try {
      const result = await new LMArenaExecutor().execute({
        model: TEST_ARENA_MODEL_ID,
        body: { messages: [{ role: "user", content: "Hello" }] },
        credentials: { cookie: "session=test" },
        signal: new AbortController().signal,
        log: null,
      });

      assert.equal(result.response.status, 502);
      const responseText = await result.response.text();
      const json = JSON.parse(responseText);
      assert.deepEqual(json.error, {
        message: "Arena upstream error",
        type: "api_error",
        code: "lmarena_error",
      });
      assert.doesNotMatch(
        responseText,
        /ArenaEventInternalFailure|secret-event-id|ArenaEventAdapter|lmarena-event/i
      );
    } finally {
      __setTlsFetchOverrideForTesting(null);
    }
  });

  it("uses a stable public fallback for blank streaming event errors", async () => {
    const stackOnly = "\n    at SecretOnlyFrame (/srv/private/lmarena-stream-stack-only.ts:2:3)";
    const encoded = new TextEncoder().encode(`data: 3:${JSON.stringify(stackOnly)}\n\n`);
    __setTlsFetchOverrideForTesting(async () => ({
      status: 200,
      headers: new Headers({ "Content-Type": "text/event-stream" }),
      text: null,
      body: new ReadableStream({
        start(controller) {
          controller.enqueue(encoded);
          controller.close();
        },
      }),
    }));

    try {
      const result = await new LMArenaExecutor().execute({
        model: TEST_ARENA_MODEL_ID,
        body: { messages: [{ role: "user", content: "Hello" }], stream: true },
        stream: true,
        credentials: { cookie: "session=test" },
        signal: new AbortController().signal,
        log: null,
      });

      assert.equal(result.response.status, 200);
      const responseText = await result.response.text();
      const payload = responseText
        .split("\n")
        .filter((line) => line.startsWith("data: ") && line !== "data: [DONE]")
        .map((line) => JSON.parse(line.slice(6)))
        .find((chunk) => chunk.error);
      assert.deepEqual(payload?.error, {
        message: "Arena upstream error",
        type: "api_error",
        code: "lmarena_error",
      });
      assert.doesNotMatch(responseText, /SecretOnlyFrame|lmarena-stream-stack-only/);
    } finally {
      __setTlsFetchOverrideForTesting(null);
    }
  });

  it("does not expose streaming upstream event details", async () => {
    const upstreamFailure =
      "StreamingArenaInternalFailure secret-stream-id\n" +
      "    at StreamingArenaAdapter (/srv/private/lmarena-stream-event.ts:44:9)";
    const encoded = new TextEncoder().encode(`data: 3:${JSON.stringify(upstreamFailure)}\n\n`);
    __setTlsFetchOverrideForTesting(async () => ({
      status: 200,
      headers: new Headers({ "Content-Type": "text/event-stream" }),
      text: null,
      body: new ReadableStream({
        start(controller) {
          controller.enqueue(encoded);
          controller.close();
        },
      }),
    }));

    try {
      const result = await new LMArenaExecutor().execute({
        model: TEST_ARENA_MODEL_ID,
        body: { messages: [{ role: "user", content: "Hello" }], stream: true },
        stream: true,
        credentials: { cookie: "session=test" },
        signal: new AbortController().signal,
        log: null,
      });

      assert.equal(result.response.status, 200);
      const responseText = await result.response.text();
      const payload = responseText
        .split("\n")
        .filter((line) => line.startsWith("data: ") && line !== "data: [DONE]")
        .map((line) => JSON.parse(line.slice(6)))
        .find((chunk) => chunk.error);
      assert.deepEqual(payload?.error, {
        message: "Arena upstream error",
        type: "api_error",
        code: "lmarena_error",
      });
      assert.doesNotMatch(
        responseText,
        /StreamingArenaInternalFailure|secret-stream-id|StreamingArenaAdapter|lmarena-stream-event/i
      );
    } finally {
      __setTlsFetchOverrideForTesting(null);
    }
  });

  it("does not expose transport errors rejected by the upstream stream", async () => {
    const streamFailure = new Error(
      "ArenaStreamTransportFailure secret-transport-id at /srv/private/lmarena-reader.ts:52:6"
    ) as Error & { cause?: unknown; statusCode?: number };
    streamFailure.cause = new Error("ArenaStreamCause secret-stream-cause-id");
    streamFailure.statusCode = 502;
    __setTlsFetchOverrideForTesting(async () => ({
      status: 200,
      headers: new Headers({ "Content-Type": "text/event-stream" }),
      text: null,
      body: new ReadableStream({
        start(controller) {
          controller.error(streamFailure);
        },
      }),
    }));

    try {
      const result = await new LMArenaExecutor().execute({
        model: TEST_ARENA_MODEL_ID,
        body: { messages: [{ role: "user", content: "Hello" }], stream: true },
        stream: true,
        credentials: { cookie: "session=test" },
        signal: new AbortController().signal,
        log: null,
      });

      assert.equal(result.response.status, 200);
      await assert.rejects(result.response.text(), (error: unknown) => {
        assert.ok(error instanceof Error);
        assert.equal(error.message, "Arena upstream stream error");
        assert.equal(error.stack, undefined);
        const projected = error as Error & {
          cause?: unknown;
          statusCode?: number;
          type?: string;
          code?: string;
        };
        assert.equal(projected.cause, undefined);
        assert.equal(projected.statusCode, 502);
        assert.equal(projected.type, "upstream_error");
        assert.equal(projected.code, "lmarena_stream_error");
        assert.doesNotMatch(
          error.message,
          /ArenaStreamTransportFailure|secret-transport-id|lmarena-reader|ArenaStreamCause|secret-stream-cause-id/i
        );
        return true;
      });
    } finally {
      __setTlsFetchOverrideForTesting(null);
    }
  });

  it("does not coerce transport status metadata from the upstream stream", async () => {
    let coercionCalls = 0;
    const hostileStatus = {
      [Symbol.toPrimitive]() {
        coercionCalls += 1;
        throw new Error("StatusCoercionFailure secret-coercion-id");
      },
    };
    const streamFailure = Object.assign(new Error("upstream transport failure"), {
      statusCode: hostileStatus,
    });
    __setTlsFetchOverrideForTesting(async () => ({
      status: 200,
      headers: new Headers({ "Content-Type": "text/event-stream" }),
      text: null,
      body: new ReadableStream({
        start(controller) {
          controller.error(streamFailure);
        },
      }),
    }));

    try {
      const result = await new LMArenaExecutor().execute({
        model: TEST_ARENA_MODEL_ID,
        body: { messages: [{ role: "user", content: "Hello" }], stream: true },
        stream: true,
        credentials: { cookie: "session=test" },
        signal: new AbortController().signal,
        log: null,
      });

      await assert.rejects(result.response.text(), (error: unknown) => {
        assert.ok(error instanceof Error);
        assert.equal((error as Error & { statusCode?: unknown }).statusCode, undefined);
        assert.equal(error.message, "Arena upstream stream error");
        return true;
      });
      assert.equal(coercionCalls, 0);
    } finally {
      __setTlsFetchOverrideForTesting(null);
    }
  });
});
