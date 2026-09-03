import assert from "node:assert/strict";
import test from "node:test";

import {
  applyNativeCodexTurnPin,
  clearNativeCodexTurnPinsForTests,
  getNativeCodexTurnPin,
  pinNativeCodexTurn,
  revokeNativeCodexTurnPinsForConnection,
} from "../../../open-sse/services/combo/nativeCodexTurnPin.ts";
import type { ResolvedComboTarget } from "../../../open-sse/services/combo/types.ts";

const body = {
  client_metadata: {
    "x-codex-turn-metadata": JSON.stringify({ thread_id: "thread-1", turn_id: "turn-1" }),
  },
};

function target(modelStr: string, provider: string): ResolvedComboTarget {
  return {
    kind: "model",
    stepId: `step-${provider}`,
    executionKey: `${provider}:${modelStr}`,
    modelStr,
    provider,
    providerId: provider,
    connectionId: null,
    weight: 1,
    label: null,
  };
}

test("native continuation pins provider, model and connection", () => {
  clearNativeCodexTurnPinsForTests();
  const pinnedTarget = target("chatgpt-web-codex/high", "chatgpt-web-codex");
  pinNativeCodexTurn({
    body,
    comboName: "coding",
    target: pinnedTarget,
    connectionId: "connection-a",
  });
  const pin = getNativeCodexTurnPin(body, "coding");
  assert.ok(pin);
  assert.deepEqual(applyNativeCodexTurnPin([pinnedTarget], pin), [
    { ...pinnedTarget, connectionId: "connection-a", allowedConnectionIds: ["connection-a"] },
  ]);
  assert.equal(revokeNativeCodexTurnPinsForConnection("connection-a"), 1);
  assert.equal(getNativeCodexTurnPin(body, "coding"), null);
});

test("a pinned turn cannot silently move to another target", () => {
  clearNativeCodexTurnPinsForTests();
  pinNativeCodexTurn({
    body,
    comboName: "coding",
    target: target("chatgpt-web-codex/high", "chatgpt-web-codex"),
    connectionId: "connection-a",
  });
  assert.throws(
    () =>
      pinNativeCodexTurn({
        body,
        comboName: "coding",
        target: target("codex/gpt-5.6-sol", "codex"),
        connectionId: "connection-b",
      }),
    /changed after output/
  );
});
