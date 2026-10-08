import test from "node:test";
import assert from "node:assert/strict";
import {
  MuseSparkWebExecutor,
  __resetMuseSparkConversationCacheForTesting,
  __setMuseSparkWebSocketForTesting,
  __setMuseSparkFreshTokenFetcherForTesting,
} from "../../open-sse/executors/muse-spark-web.ts";
import { WebSocket } from "ws";

// #10727: Meta AI (muse-spark-web) times out on the WS send-message step at
// exactly the executor's hardcoded 30s timeout, with no onerror/onclose
// firing first. The reporter's log shows the flow reaching wsChat and
// hanging until the timeout fires, meaning Meta's gateway either never
// truly opens the socket or silently drops frames after opening — but the
// old flat "Meta AI WebSocket timed out" message could not distinguish
// those two failure modes for whoever debugs the next occurrence.
//
// Root-causing (and fixing) the reverse-engineered private WS protocol
// itself requires a live meta.ai session + a fresh DevTools capture (see
// the plan-file's `needs-vps` verdict) — not achievable in this sandbox.
// This regression test locks in the diagnosability improvement that *is*
// verifiable here: the timeout error now reports the socket's readyState
// at the moment it fires, so a future report can tell "never opened"
// (readyState 0) apart from "opened but Meta went silent" (readyState 1).

/**
 * Intercepts only the wsChat 30000ms timeout registration and lets every
 * other setTimeout (including the mock WebSocket's own onopen scheduling)
 * run for real. Firing the captured callback directly — instead of
 * advancing a fake clock — keeps the test fast and avoids interleaving
 * bugs between fake timers and the executor's real async/await chain.
 */
function interceptWsTimeout(): {
  registered: Promise<void>;
  fire: () => void;
  restore: () => void;
} {
  const original = globalThis.setTimeout;
  let captured: (() => void) | null = null;
  let markRegistered: () => void = () => {};
  const registered = new Promise<void>((resolve) => {
    markRegistered = resolve;
  });
  globalThis.setTimeout = ((cb: (...a: unknown[]) => void, ms?: number, ...args: unknown[]) => {
    if (ms === 30000 && captured === null) {
      captured = cb as () => void;
      markRegistered();
      return 0 as unknown as ReturnType<typeof setTimeout>;
    }
    return original(cb as () => void, ms, ...args);
  }) as typeof setTimeout;
  return {
    registered,
    fire: () => {
      assert.ok(captured, "the 30000ms wsChat timeout was never registered");
      captured?.();
    },
    restore: () => {
      globalThis.setTimeout = original;
    },
  };
}

class NeverOpensWebSocket {
  onopen: (() => void) | null = null;
  onmessage: ((evt: { data: string }) => void) | null = null;
  onclose: (() => void) | null = null;
  onerror: ((evt: Error) => void) | null = null;
  readyState = WebSocket.CONNECTING;
  url: string;
  constructor(url: string) {
    this.url = url;
    // Never calls onopen, onmessage, onerror, or onclose — mirrors the
    // reported symptom exactly: the socket just hangs until the timeout.
  }
  send(_data: Uint8Array | string) {}
  close() {}
}

class OpensThenSilentWebSocket {
  // Resolved once onopen has run (the intro + prompt frames are sent inside it),
  // so the test can fire the timeout at a deterministic point instead of
  // sleeping a wall-clock 20ms that flakes under load.
  static opened: Promise<void> = Promise.resolve();
  static sent: Array<Uint8Array | string> = [];
  onopen: (() => void) | null = null;
  onmessage: ((evt: { data: string }) => void) | null = null;
  onclose: (() => void) | null = null;
  onerror: ((evt: Error) => void) | null = null;
  readyState = WebSocket.CONNECTING;
  url: string;
  constructor(url: string) {
    this.url = url;
    OpensThenSilentWebSocket.sent = [];
    OpensThenSilentWebSocket.opened = new Promise<void>((resolve) => {
      setTimeout(() => {
        this.readyState = WebSocket.OPEN;
        this.onopen?.();
        resolve();
      }, 0);
    });
  }
  send(data: Uint8Array | string) {
    OpensThenSilentWebSocket.sent.push(data);
  }
  close() {}
}

function baseInput(connectionId: string): Parameters<MuseSparkWebExecutor["execute"]>[0] {
  return {
    model: "muse-spark",
    body: { messages: [{ role: "user", content: "ping" }] },
    stream: false,
    credentials: {
      apiKey: "ecto_1_sess=test123",
      connectionId,
      providerSpecificData: { authorization: "ecto1:test-auth-token" },
    },
    signal: null,
    log: null,
    upstreamExtraHeaders: undefined,
  } as Parameters<MuseSparkWebExecutor["execute"]>[0];
}

test("#10727: WS timeout while still CONNECTING reports readyState=0 (never opened)", async () => {
  __resetMuseSparkConversationCacheForTesting();
  // Prevent real browser launch — return a failure so the test falls back to
  // the static authorization token provided in baseInput().
  __setMuseSparkFreshTokenFetcherForTesting(async () => ({ ok: false as const, error: "test" }));
  const executor = new MuseSparkWebExecutor();
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () => new Response("{}", { status: 200 });
  const restore = __setMuseSparkWebSocketForTesting(
    NeverOpensWebSocket as unknown as typeof WebSocket
  );
  const timeoutHook = interceptWsTimeout();
  try {
    const resultPromise = executor.execute(baseInput("conn-10727-never-opens"));
    // wsChat registers the 30s timer synchronously right after constructing the
    // socket, so waiting for that registration (not a fixed sleep) guarantees the
    // socket exists and never left CONNECTING.
    await timeoutHook.registered;
    timeoutHook.fire();

    const result = await resultPromise;
    assert.equal(result.response.status, 502);
    const body = await result.response.json();
    assert.match(
      body.error.message,
      /readyState=0/,
      "timeout while the socket never left CONNECTING must report readyState=0"
    );
  } finally {
    globalThis.fetch = originalFetch;
    restore();
    timeoutHook.restore();
    __setMuseSparkFreshTokenFetcherForTesting(undefined); // Restore real impl
  }
});

test("#10727: WS timeout after a successful open reports readyState=1 (opened, then silent)", async () => {
  __resetMuseSparkConversationCacheForTesting();
  // Prevent real browser launch — return a failure so the test falls back to
  // the static authorization token provided in baseInput().
  __setMuseSparkFreshTokenFetcherForTesting(async () => ({ ok: false as const, error: "test" }));
  const executor = new MuseSparkWebExecutor();
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () => new Response("{}", { status: 200 });
  const restore = __setMuseSparkWebSocketForTesting(
    OpensThenSilentWebSocket as unknown as typeof WebSocket
  );
  const timeoutHook = interceptWsTimeout();
  try {
    const resultPromise = executor.execute(baseInput("conn-10727-opens-silent"));
    // The timer is registered before the socket opens, so wait for BOTH the
    // registration and the socket's onopen (which sends the intro + prompt
    // frames) before firing — no wall-clock sleep involved.
    await timeoutHook.registered;
    await OpensThenSilentWebSocket.opened;
    assert.equal(OpensThenSilentWebSocket.sent.length, 2, "intro + prompt frames were sent");
    timeoutHook.fire();

    const result = await resultPromise;
    assert.equal(result.response.status, 502);
    const body = await result.response.json();
    assert.match(
      body.error.message,
      /readyState=1/,
      "timeout after the socket reached OPEN must report readyState=1, not the never-opened case"
    );
  } finally {
    globalThis.fetch = originalFetch;
    restore();
    timeoutHook.restore();
    __setMuseSparkFreshTokenFetcherForTesting(undefined); // Restore real impl
  }
});
