// #10315: the header-budget drop warn must not storm — identical dropped-header
// sets recur on every SSE response from the same upstream, so we warn once per
// unique drop fingerprint per process and fall back to debug afterwards.
import { test } from "node:test";
import assert from "node:assert/strict";

const {
  buildStreamingResponseHeaders,
  fingerprintDroppedHeaders,
  resetDroppedHeaderWarnFingerprints,
} = await import("../../open-sse/handlers/chatCore/responseHeaders.ts");

type DropPayload = {
  budgetBytes: number;
  forwardedBytes: number;
  droppedCount: number;
  droppedHeaders: Array<{ name: string; bytes: number }>;
};

function makeLogger() {
  const warns: DropPayload[] = [];
  const debugs: DropPayload[] = [];
  return {
    logger: {
      warn: (_tag: string, _msg: string, data?: DropPayload) => warns.push(data as DropPayload),
      debug: (_tag: string, _msg: string, data?: DropPayload) => debugs.push(data as DropPayload),
    },
    warns,
    debugs,
  };
}

const meta = {} as Parameters<typeof buildStreamingResponseHeaders>[1];

// Small header + two ~600-byte headers: the first big one fits the 768-byte
// budget alongside the small one, the second is always dropped.
function oversizedProviderHeaders(): Headers {
  return new Headers({
    "x-kept-small": "k".repeat(10),
    "x-drop-alpha": "a".repeat(600),
    "x-drop-beta": "b".repeat(600),
  });
}

test("#10315: 100 identical oversized responses emit exactly one warn, the rest at debug", () => {
  resetDroppedHeaderWarnFingerprints();
  const { logger, warns, debugs } = makeLogger();
  for (let i = 0; i < 100; i++) {
    buildStreamingResponseHeaders(oversizedProviderHeaders(), meta, logger);
  }
  assert.equal(warns.length, 1);
  assert.equal(debugs.length, 99);
  assert.equal(warns[0].droppedCount, 1);
});

test("#10315: a different drop set warns again", () => {
  resetDroppedHeaderWarnFingerprints();
  const { logger, warns } = makeLogger();
  buildStreamingResponseHeaders(oversizedProviderHeaders(), meta, logger);
  assert.equal(warns.length, 1);
  buildStreamingResponseHeaders(
    new Headers({
      "x-kept-small": "k".repeat(10),
      "x-drop-gamma": "g".repeat(600),
      "x-drop-delta": "d".repeat(600),
    }),
    meta,
    logger
  );
  assert.equal(warns.length, 2);
});

test("#10315: fingerprint is order-insensitive to dropped header names", () => {
  assert.equal(
    fingerprintDroppedHeaders([
      { name: "X-Drop-Beta", bytes: 600 },
      { name: "x-drop-alpha", bytes: 600 },
    ]),
    fingerprintDroppedHeaders([
      { name: "x-drop-alpha", bytes: 600 },
      { name: "X-Drop-Beta", bytes: 600 },
    ])
  );
});

test("#10315: reset hook forgets fingerprints so the same drop set warns again", () => {
  resetDroppedHeaderWarnFingerprints();
  const { logger, warns } = makeLogger();
  buildStreamingResponseHeaders(oversizedProviderHeaders(), meta, logger);
  resetDroppedHeaderWarnFingerprints();
  buildStreamingResponseHeaders(oversizedProviderHeaders(), meta, logger);
  assert.equal(warns.length, 2);
});

test("#10315: responses within budget never warn", () => {
  resetDroppedHeaderWarnFingerprints();
  const { logger, warns, debugs } = makeLogger();
  const headers = buildStreamingResponseHeaders(new Headers({ "x-fits": "ok" }), meta, logger);
  assert.equal(headers["x-fits"], "ok");
  assert.equal(warns.length, 0);
  assert.equal(debugs.length, 0);
});
