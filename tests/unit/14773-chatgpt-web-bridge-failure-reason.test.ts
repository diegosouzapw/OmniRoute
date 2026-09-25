import assert from "node:assert/strict";
import test from "node:test";

import {
  collectBridgeFailureSignals,
  describeBridgeLoadFailure,
  type ChatGptWebBridgeFailureSignal,
} from "../../open-sse/utils/chatgptWebFirstParty.ts";

const ASSET_URL = "https://chatgpt.com/_next/static/chunks/main-abc123.js";

/** Minimal stand-in for the Playwright page: only `on`/`off` are used here. */
function stubPage() {
  const handlers = new Map<string, Set<(arg: never) => void>>();
  return {
    page: {
      on(event: string, handler: (arg: never) => void) {
        if (!handlers.has(event)) handlers.set(event, new Set());
        handlers.get(event)!.add(handler);
      },
      off(event: string, handler: (arg: never) => void) {
        handlers.get(event)?.delete(handler);
      },
    },
    emit(event: string, arg: unknown) {
      for (const handler of handlers.get(event) ?? []) (handler as (a: unknown) => void)(arg);
    },
    count(event: string) {
      return handlers.get(event)?.size ?? 0;
    },
  };
}

function failedRequest(url: string, errorText: string) {
  return { url: () => url, failure: () => ({ errorText }) };
}

test("a failed request for the module asset is captured as the reason", () => {
  const stub = stubPage();
  const { signals, dispose } = collectBridgeFailureSignals(stub.page as never, ASSET_URL);

  stub.emit("requestfailed", failedRequest(ASSET_URL, "net::ERR_HTTP_RESPONSE_CODE_FAILURE"));

  assert.equal(signals.length, 1);
  assert.equal(signals[0]!.kind, "requestfailed");
  assert.match(describeBridgeLoadFailure(signals), /net::ERR_HTTP_RESPONSE_CODE_FAILURE/);
  dispose();
});

test("an unrelated failed request is not offered as the explanation", () => {
  const stub = stubPage();
  const { signals, dispose } = collectBridgeFailureSignals(stub.page as never, ASSET_URL);

  // The page keeps making its own requests while the bridge loads. Reporting
  // one of those would be a misleading reason rather than no reason.
  stub.emit(
    "requestfailed",
    failedRequest("https://chatgpt.com/api/telemetry", "net::ERR_ABORTED")
  );

  assert.deepEqual(signals, []);
  assert.match(
    describeBridgeLoadFailure(signals),
    /no CSP violation, failed request or page error/
  );
  dispose();
});

test("a page error is captured", () => {
  const stub = stubPage();
  const { signals, dispose } = collectBridgeFailureSignals(stub.page as never, ASSET_URL);

  stub.emit("pageerror", new Error("upstream is not a module"));

  assert.equal(signals.length, 1);
  assert.equal(signals[0]!.kind, "pageerror");
  assert.match(describeBridgeLoadFailure(signals), /upstream is not a module/);
  dispose();
});

test("a CSP violation outranks the other signals", () => {
  // CSP is the one cause that is a property of chatgpt.com rather than of this
  // install, so it is the signal that distinguishes "upstream changed" from
  // "this session is stale" — it must not be buried behind a page error.
  const signals: ChatGptWebBridgeFailureSignal[] = [
    { kind: "pageerror", detail: "some later noise" },
    { kind: "requestfailed", detail: "blob:… failed: net::ERR_FAILED" },
    { kind: "csp", detail: "script-src-elem blocked blob:https://chatgpt.com/uuid" },
  ];

  const described = describeBridgeLoadFailure(signals);
  assert.match(described, /csp: script-src-elem blocked blob:/);
  assert.doesNotMatch(described, /some later noise/);
});

test("a failed request outranks a page error when there is no CSP violation", () => {
  const described = describeBridgeLoadFailure([
    { kind: "pageerror", detail: "downstream noise" },
    { kind: "requestfailed", detail: "asset 404" },
  ]);
  assert.match(described, /requestfailed: asset 404/);
});

test("the reason always keeps the original message so existing matching still works", () => {
  for (const signals of [
    [],
    [{ kind: "csp", detail: "script-src blocked blob:" }] as ChatGptWebBridgeFailureSignal[],
  ]) {
    assert.match(
      describeBridgeLoadFailure(signals),
      /^ChatGPT Web first-party bridge module failed to load/
    );
  }
});

test("dispose detaches both listeners so a failed load leaks nothing", () => {
  const stub = stubPage();
  const { signals, dispose } = collectBridgeFailureSignals(stub.page as never, ASSET_URL);

  assert.equal(stub.count("requestfailed"), 1);
  assert.equal(stub.count("pageerror"), 1);

  dispose();

  assert.equal(stub.count("requestfailed"), 0);
  assert.equal(stub.count("pageerror"), 0);

  stub.emit("pageerror", new Error("after dispose"));
  assert.deepEqual(signals, []);
});
