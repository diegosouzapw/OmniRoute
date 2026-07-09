/**
 * Regression test for #6210 (observability follow-up) — copilot-m365-web streaming
 * path emitted NO logs, so an empty `content:null` response was undiagnosable even at
 * `APP_LOG_LEVEL=debug`. The tier parser itself was fixed in #6234; this guards the
 * remaining defect: the WS path must emit debug diagnostics (connect / handshake /
 * per-frame) AND must never leak the access_token that rides in the WS query string.
 *
 * The stub drives the executor with a scripted SignalR frame sequence (handshake ack →
 * bot update → completion) and a captured `log`, asserting (a) a debug log fires for the
 * handshake / first frame and (b) the logged connect URL is redacted — the raw URL handed
 * to the WebSocket constructor still carries the secret, proving redaction is real.
 */
import test from "node:test";
import assert from "node:assert/strict";
import {
  CopilotM365WebExecutor,
  __setCopilotM365WebSocketForTesting,
} from "../../open-sse/executors/copilot-m365-web.ts";
import { encodeFrame } from "../../open-sse/executors/copilot-m365-frames.ts";
import type { ExecutorLog } from "../../open-sse/executors/base.ts";

const SECRET = "SUPERSECRETTOKEN-do-not-log-123";

type LogEntry = { level: string; tag: string; message: string };

function makeCapturingLog(sink: LogEntry[]): ExecutorLog {
  const push = (level: string) => (tag: string, message: string) =>
    sink.push({ level, tag, message });
  return { debug: push("debug"), info: push("info"), warn: push("warn"), error: push("error") };
}

/**
 * Minimal `ws`-shaped stub: emits `open` on next tick, answers the handshake request
 * frame with `{}` (ack), and once the chat invocation is sent replays `frames`.
 */
function makeFakeWsCtor(frames: Array<Record<string, unknown>>, captured: { url?: string }) {
  return class FakeWS {
    private handlers: Record<string, (arg?: unknown) => void> = {};
    constructor(url: string) {
      captured.url = url;
      setImmediate(() => this.handlers.open?.());
    }
    on(event: string, cb: (arg?: unknown) => void) {
      this.handlers[event] = cb;
      return this;
    }
    send(data: unknown) {
      const str = typeof data === "string" ? data : String(data);
      if (str.includes('"protocol":"json"')) {
        setImmediate(() => this.handlers.message?.(Buffer.from(encodeFrame({}))));
      } else if (str.includes('"target":"chat"')) {
        setImmediate(() => {
          for (const frame of frames) this.handlers.message?.(Buffer.from(encodeFrame(frame)));
        });
      }
    }
    close() {
      /* no-op */
    }
  };
}

async function drainStream(executor: CopilotM365WebExecutor, log: ExecutorLog): Promise<void> {
  const { response } = await executor.execute({
    model: "copilot-m365",
    body: { messages: [{ role: "user", content: "hi" }] },
    stream: true,
    credentials: {
      apiKey: `access_token=${SECRET}`,
      providerSpecificData: { chathubPath: "user-oid@tenant-id" },
    },
    log,
  });
  await response.text();
}

test("copilot-m365-web: WS path emits debug logs for handshake + first frame [#6210]", async () => {
  const captured: { url?: string } = {};
  const frames = [
    { type: 1, target: "update", arguments: [{ messages: [{ text: "Hi there", author: "bot" }] }] },
    { type: 3 },
  ];
  const restore = __setCopilotM365WebSocketForTesting(
    makeFakeWsCtor(frames, captured) as never
  );
  const sink: LogEntry[] = [];
  try {
    await drainStream(new CopilotM365WebExecutor(), makeCapturingLog(sink));
  } finally {
    restore();
  }

  const wsLogs = sink.filter((e) => e.level === "debug" && e.tag === "M365_WS");
  assert.ok(wsLogs.length > 0, "expected at least one M365_WS debug log");
  // (a) handshake is logged.
  assert.ok(
    wsLogs.some((e) => /handshake complete/i.test(e.message)),
    "expected a handshake-complete debug log"
  );
  // (a) the first received frame's type/target is logged.
  assert.ok(
    wsLogs.some((e) => e.message.includes("frame type=1 target=update")),
    "expected a per-frame type/target debug log for the first update frame"
  );
});

test("copilot-m365-web: logged WS URL is redacted — access_token never leaks [#6210]", async () => {
  const captured: { url?: string } = {};
  const frames = [{ type: 3 }];
  const restore = __setCopilotM365WebSocketForTesting(
    makeFakeWsCtor(frames, captured) as never
  );
  const sink: LogEntry[] = [];
  try {
    await drainStream(new CopilotM365WebExecutor(), makeCapturingLog(sink));
  } finally {
    restore();
  }

  // The raw URL handed to the WebSocket constructor DOES carry the secret — proving the
  // redaction assertion below would fail on an un-redacted URL and passes only because
  // the executor redacts before logging.
  assert.ok(captured.url?.includes(SECRET), "sanity: raw WS URL should contain the token");

  const connectLog = sink.find(
    (e) => e.tag === "M365_WS" && e.message.startsWith("connecting")
  );
  assert.ok(connectLog, "expected a 'connecting' debug log");
  assert.ok(
    connectLog.message.includes("access_token=REDACTED"),
    "connect log should show the token as REDACTED"
  );
  // (b) NO logged message anywhere may contain the raw secret.
  for (const entry of sink) {
    assert.ok(
      !entry.message.includes(SECRET),
      `log leaked the access_token: ${entry.tag} ${entry.message}`
    );
  }
});
