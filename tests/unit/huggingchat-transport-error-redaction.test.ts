import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { test } from "node:test";

const CHILD_RESULT_PREFIX = "HUGGINGCHAT_TRANSPORT_RESULT=";
const childFixture = fileURLToPath(
  new URL("./_fixtures/huggingchat-transport-error-child.ts", import.meta.url)
);

type TransportScenario = "conversation-creation" | "message-send";

type TransportFailureResult = {
  fetchCalls: number;
  status: number;
  contentType: string;
  errorLogs: string[];
  payload: {
    error: {
      message: string;
      type?: string;
      code?: string;
    };
  };
};

function runTransportScenario(scenario: TransportScenario): TransportFailureResult {
  const result = spawnSync(process.execPath, ["--import", "tsx/esm", childFixture, scenario], {
    cwd: process.cwd(),
    encoding: "utf8",
    timeout: 60_000,
    env: {
      NODE_ENV: "test",
      NO_COLOR: "1",
      DISABLE_SQLITE_AUTO_BACKUP: "true",
    },
  });

  assert.equal(
    result.status,
    0,
    `isolated ${scenario} probe failed: ${String(result.stderr).slice(0, 2_000)}`
  );

  const resultLine = String(result.stdout)
    .split("\n")
    .findLast((line) => line.startsWith(CHILD_RESULT_PREFIX));
  assert.ok(resultLine, `isolated ${scenario} probe did not emit its result`);

  return JSON.parse(resultLine.slice(CHILD_RESULT_PREFIX.length)) as TransportFailureResult;
}

function assertPublicFailureIsSanitized(result: TransportFailureResult): void {
  assert.equal(result.status, 502);
  assert.match(result.contentType, /application\/json/);
  assert.equal(result.payload.error.type, "upstream_error");
  assert.match(result.payload.error.message, /^HuggingChat connection failed:/);
  assert.match(result.payload.error.message, /<path>/);
  assert.match(result.payload.error.message, /access_token=\[REDACTED\]/);

  const publicText = JSON.stringify({ payload: result.payload, errorLogs: result.errorLogs });
  assert.doesNotMatch(publicText, /transport-secret/);
  assert.doesNotMatch(publicText, /\/srv\/omniroute/);
  assert.doesNotMatch(publicText, /sendRequest/);
  assert.doesNotMatch(publicText, /\n\s*at /);
}

test("HuggingChat sanitizes conversation-creation transport failures in body and log", () => {
  const result = runTransportScenario("conversation-creation");

  assert.equal(result.fetchCalls, 1, "the probe must intercept the conversation creation request");
  assert.equal(result.errorLogs.length, 1);
  assert.match(result.errorLogs[0], /^Conversation creation failed:/);
  assertPublicFailureIsSanitized(result);
});

test("HuggingChat sanitizes message-send transport failures in body and log", () => {
  const result = runTransportScenario("message-send");

  assert.equal(result.fetchCalls, 3, "the probe must intercept creation, parent lookup, and send");
  assert.equal(result.errorLogs.length, 1);
  assert.match(result.errorLogs[0], /^Message send failed:/);
  assertPublicFailureIsSanitized(result);
});
