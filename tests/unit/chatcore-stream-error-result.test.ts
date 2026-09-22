// tests/unit/chatcore-stream-error-result.test.ts
// Characterization of isSemaphoreCapacityError / createStreamingErrorResult /
// getUpstreamErrorIdentifier — streaming error-result helpers extracted from handleChatCore
// (chatCore god-file decomposition, #3501). Locks the semaphore code matching, the SSE error
// envelope shape (status, headers, `data: {...}\n\ndata: [DONE]\n\n` body, optional code/type), and
// the string-code extraction.
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import ts from "typescript";
import {
  createSafeAbortError,
  formatStreamRecoveryRetryWarning,
  isSemaphoreCapacityError,
  createStreamingErrorResult,
  getSafeErrorMetadata,
  getUpstreamErrorIdentifier,
} from "../../open-sse/handlers/chatCore/streamErrorResult.ts";

test("isSemaphoreCapacityError matches the two semaphore codes only", () => {
  assert.equal(isSemaphoreCapacityError({ code: "SEMAPHORE_TIMEOUT" }), true);
  assert.equal(isSemaphoreCapacityError({ code: "SEMAPHORE_QUEUE_FULL" }), true);
  assert.equal(isSemaphoreCapacityError({ code: "OTHER" }), false);
  assert.equal(isSemaphoreCapacityError(null), false);
  assert.equal(isSemaphoreCapacityError("SEMAPHORE_TIMEOUT"), false);
});

test("formatStreamRecoveryRetryWarning sanitizes hostile error names", () => {
  const secret = "STREAM_RECOVERY_NAME_SECRET";
  const credentialName = new Proxy(
    {},
    {
      get(_target, key) {
        if (key === "name") return `password=${secret} /home/alice/recovery.ts`;
        throw new Error("hostile recovery metadata");
      },
    }
  );
  const credentialWarning = formatStreamRecoveryRetryWarning(1, 4, credentialName);
  assert.doesNotMatch(credentialWarning, /STREAM_RECOVERY_NAME_SECRET|\/home\/alice/);
  assert.match(credentialWarning, /\[REDACTED\]/);

  const hostileGetter = new Proxy(
    {},
    {
      get() {
        throw new Error("hostile name getter");
      },
    }
  );
  assert.equal(
    formatStreamRecoveryRetryWarning(2, 4, hostileGetter),
    "transparent early-retry 2/4 after truncation"
  );
});

test("createStreamingErrorResult builds an SSE error envelope with [DONE] terminator", async () => {
  const result = createStreamingErrorResult(503, "boom");
  assert.equal(result.success, false);
  assert.equal(result.status, 503);
  assert.equal(result.error, "boom");
  assert.equal(result.response.status, 503);
  assert.equal(result.response.headers.get("Content-Type"), "text/event-stream");
  assert.equal(result.response.headers.get("X-Accel-Buffering"), "no");
  const body = await result.response.text();
  assert.ok(body.startsWith("data: "));
  assert.ok(body.endsWith("data: [DONE]\n\n"));
  const json = JSON.parse(body.slice("data: ".length, body.indexOf("\n\n")));
  assert.equal(json.error.message, "boom");
});

test("createStreamingErrorResult attaches optional code and type", async () => {
  const result = createStreamingErrorResult(429, "slow down", "rate_limited", "rate_limit_error");
  const body = await result.response.text();
  const json = JSON.parse(body.slice("data: ".length, body.indexOf("\n\n")));
  assert.equal(json.error.code, "rate_limited");
  assert.equal(json.error.type, "rate_limit_error");
});

test("createStreamingErrorResult sanitizes code and type at the SSE boundary", async () => {
  const result = createStreamingErrorResult(
    502,
    "upstream failed",
    "sk-live-secret-value",
    "server_error\nX-Leak: yes"
  );
  const body = await result.response.text();
  const json = JSON.parse(body.slice("data: ".length, body.indexOf("\n\n"))) as {
    error: { code: string; type: string };
  };

  assert.equal(json.error.code, "bad_gateway");
  assert.equal(json.error.type, "server_error");
  assert.doesNotMatch(body, /sk-live-secret-value|X-Leak/);
});

test("createStreamingErrorResult sanitizes message, code, and type at the SSE boundary", async () => {
  const secret = "STREAM_RESULT_SECRET";
  const result = createStreamingErrorResult(
    502,
    `upstream password=${secret} at /home/alice/stream.ts:10:2`,
    "password_hunter2",
    "authorization_BearerSecret"
  );
  const body = await result.response.text();
  const json = JSON.parse(body.slice("data: ".length, body.indexOf("\n\n")));

  assert.equal(json.error.message, "upstream password=[REDACTED]");
  assert.equal(json.error.code, "bad_gateway");
  assert.equal(json.error.type, "server_error");
  assert.doesNotMatch(body, new RegExp(`${secret}|/home/alice|\\bat \\S`));
  assert.equal(result.error, `upstream password=${secret} at /home/alice/stream.ts:10:2`);
});

test("getUpstreamErrorIdentifier returns a non-empty string code or undefined", () => {
  assert.equal(getUpstreamErrorIdentifier({ code: "ECONNRESET" }), "ECONNRESET");
  assert.equal(getUpstreamErrorIdentifier({ code: "" }), undefined);
  assert.equal(getUpstreamErrorIdentifier({ code: 123 }), undefined);
  assert.equal(getUpstreamErrorIdentifier(null), undefined);
  assert.equal(getUpstreamErrorIdentifier("ECONNRESET"), undefined);
  const hostile = new Proxy(
    {},
    {
      get() {
        throw new Error("hostile code getter");
      },
    }
  );
  assert.doesNotThrow(() => isSemaphoreCapacityError(hostile));
  assert.equal(getUpstreamErrorIdentifier(hostile), undefined);
  const hostileAbort = new Proxy(
    {},
    {
      get(_target, key) {
        if (key === "name") return "AbortError";
        throw new Error("hostile abort metadata");
      },
    }
  );
  assert.equal(getSafeErrorMetadata(hostileAbort).name, "AbortError");
  let codeReads = 0;
  const mutableCode = new Proxy(
    {},
    {
      get(_target, key) {
        if (key !== "code") return undefined;
        codeReads += 1;
        return codeReads === 1 ? "SEMAPHORE_TIMEOUT" : "OTHER";
      },
    }
  );
  assert.equal(isSemaphoreCapacityError(mutableCode), true);
  assert.equal(codeReads, 1);
  const safeAbort = createSafeAbortError();
  assert.equal(safeAbort.name, "AbortError");
  assert.equal(safeAbort.message, "Request aborted");
});

test("non-streaming runNonStreamingProviderLeg is inside a try that maps semaphore errors", () => {
  const barrel = readFileSync(
    new URL("../../open-sse/handlers/chatCore.ts", import.meta.url),
    "utf8"
  );
  assert.match(
    barrel,
    /if\s*\(!stream\)\s*\{\s*return await runNonStreamingLeg\(/,
    "barrel must delegate non-streaming requests to runNonStreamingLeg"
  );

  const src = readFileSync(
    new URL("../../open-sse/handlers/chatCore/nonStreamingLeg.ts", import.meta.url),
    "utf8"
  );
  const sf = ts.createSourceFile("nonStreamingLeg.ts", src, ts.ScriptTarget.ESNext, true);

  const calls: ts.CallExpression[] = [];
  const visit = (node: ts.Node) => {
    if (
      ts.isCallExpression(node) &&
      ts.isIdentifier(node.expression) &&
      node.expression.text === "runNonStreamingProviderLeg"
    ) {
      calls.push(node);
    }
    ts.forEachChild(node, visit);
  };
  visit(sf);
  assert.ok(calls.length >= 1, "at least one runNonStreamingProviderLeg call must exist");

  for (const callNode of calls) {
    let tryNode: ts.TryStatement | null = null;
    let curr: ts.Node = callNode;
    while (curr && curr !== sf) {
      if (ts.isTryStatement(curr)) {
        tryNode = curr;
        break;
      }
      curr = curr.parent;
    }
    assert.ok(tryNode, "each runNonStreamingProviderLeg call must sit in a try statement");
    assert.ok(tryNode.catchClause, "enclosing try must have a catch clause");
    const catchText = tryNode.catchClause.getText(sf);
    assert.match(
      catchText,
      /isSemaphoreCapacityError/,
      "same catch that maps stream semaphore errors must cover the non-stream leg"
    );
  }
});
