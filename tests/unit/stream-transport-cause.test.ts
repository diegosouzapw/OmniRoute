import { test } from "node:test";
import assert from "node:assert/strict";
import {
  createStreamFailureFinalizers,
  type StreamCompletionPayload,
} from "../../open-sse/utils/streamFailureFinalization.ts";

function finalize(error: unknown, statusCode = 502) {
  let completion: StreamCompletionPayload | undefined;
  const finalizers = createStreamFailureFinalizers({
    isFailureCompletionRecorded: () => false,
    onStreamComplete: (payload) => {
      completion = payload;
    },
    persistFailureUsage: () => {},
  });
  finalizers.onPipelineStreamError({ message: "terminated", statusCode, error });
  assert.ok(completion);
  return completion;
}

test("stream failure retains a standard transport cause code without its private message", () => {
  const error = new TypeError("terminated", {
    cause: Object.assign(new Error("private socket address and credentials"), {
      code: "ERR_HTTP2_STREAM_ERROR",
    }),
  });
  const completion = finalize(error);
  assert.match(completion.error ?? "", /ERR_HTTP2_STREAM_ERROR/);
  assert.doesNotMatch(JSON.stringify(completion), /private socket|credentials/);
  assert.equal(completion.status, 502);
  assert.equal(completion.errorCode, "stream_terminated");
});

test("nested transport codes are bounded and deduplicated", () => {
  const cycle: { code: string; cause?: unknown } = { code: "ECONNRESET" };
  cycle.cause = cycle;
  const completion = finalize({ cause: { code: "UND_ERR_SOCKET", cause: cycle } });
  assert.match(completion.error ?? "", /UND_ERR_SOCKET/);
  assert.match(completion.error ?? "", /ECONNRESET/);
  assert.equal(completion.error?.match(/ECONNRESET/g)?.length, 1);
});

test("unknown codes, arbitrary cause messages and hostile accessors are never published", () => {
  for (const error of [
    { cause: { code: "PRIVATE_SECRET_VALUE", message: "sensitive" } },
    { cause: new Error("password=secret-value at /home/private/app.ts") },
    new Proxy(
      {},
      {
        get() {
          throw new Error("private getter error");
        },
      }
    ),
    undefined,
  ]) {
    assert.equal(finalize(error).error, "terminated");
  }
});

test("client disconnect classification is unchanged and gains no transport suffix", () => {
  const completion = finalize({ cause: { code: "ECONNRESET" } }, 499);
  assert.equal(completion.status, 499);
  assert.equal(completion.errorCode, "client_disconnected");
  assert.equal(completion.error, "terminated");
});
