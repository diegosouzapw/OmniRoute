import test from "node:test";
import assert from "node:assert/strict";

import {
  collectModelBackedProviderIds,
  selectRoutableLocalNodes,
} from "../../src/lib/localHealthCheck.ts";

const ACTIVE_NODE = {
  id: "openai-compatible-chat-11111111-1111-4111-8111-111111111111",
  prefix: "active-local",
  baseUrl: "http://127.0.0.1:19001/v1",
};

const STALE_NODE = {
  id: "openai-compatible-audio-speech-22222222-2222-4222-8222-222222222222",
  prefix: "stale-voice",
  baseUrl: "http://127.0.0.1:18000/v1",
};

test("local health check skips a stale loopback node with no active connection", () => {
  const selected = selectRoutableLocalNodes(
    [ACTIVE_NODE, STALE_NODE],
    [
      {
        provider: ACTIVE_NODE.id,
        isActive: true,
        // A transient provider failure must not suppress recovery probes.
        testStatus: "unavailable",
      },
    ]
  );

  assert.deepEqual(
    selected.map((node) => node.id),
    [ACTIVE_NODE.id]
  );
});

test("inactive connections do not make an orphaned node probe-eligible", () => {
  const selected = selectRoutableLocalNodes(
    [STALE_NODE],
    [
      { provider: STALE_NODE.id, isActive: false, testStatus: "active" },
      { provider: STALE_NODE.id, isActive: 0, testStatus: "active" },
    ]
  );

  assert.deepEqual(selected, []);
});

test("a configured local model keeps a no-auth node observable without a connection", () => {
  const modelProviders = collectModelBackedProviderIds({
    [STALE_NODE.id]: [{ id: "voice-model", isHidden: false }],
  });
  const selected = selectRoutableLocalNodes([STALE_NODE], [], modelProviders);

  assert.deepEqual(
    selected.map((node) => node.id),
    [STALE_NODE.id]
  );
});

test("hidden or empty model catalogs do not revive an orphaned node", () => {
  const modelProviders = collectModelBackedProviderIds(
    { [STALE_NODE.id]: [{ id: "hidden-model", isHidden: true }] },
    { [STALE_NODE.prefix]: [] }
  );

  assert.deepEqual(selectRoutableLocalNodes([STALE_NODE], [], modelProviders), []);
});

test("the sole node of a generic compatible type inherits its active connection", () => {
  const selected = selectRoutableLocalNodes(
    [ACTIVE_NODE],
    [{ provider: "openai-compatible-chat", isActive: true }]
  );

  assert.deepEqual(
    selected.map((node) => node.id),
    [ACTIVE_NODE.id]
  );
});

test("a generic compatible connection never selects an ambiguous node", () => {
  const secondChatNode = {
    id: "openai-compatible-chat-33333333-3333-4333-8333-333333333333",
    prefix: "second-local",
    baseUrl: "http://localhost:19002/v1",
  };

  const selected = selectRoutableLocalNodes(
    [ACTIVE_NODE, secondChatNode],
    [{ provider: "openai-compatible-chat", isActive: true }]
  );

  assert.deepEqual(selected, []);
});

test("remote and malformed nodes remain outside the local health-check set", () => {
  const selected = selectRoutableLocalNodes(
    [
      { ...ACTIVE_NODE, baseUrl: "https://remote.example/v1" },
      { id: "missing-prefix", baseUrl: "http://127.0.0.1:19003/v1" },
      null,
    ],
    [{ provider: ACTIVE_NODE.id, isActive: true }]
  );

  assert.deepEqual(selected, []);
});
