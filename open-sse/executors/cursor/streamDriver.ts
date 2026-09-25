import * as fs from "node:fs";
import * as zlib from "node:zlib";
import { promisify } from "node:util";

import type { McpToolDefinition } from "../../utils/cursorAgentProtobuf.ts";
import type { CursorClientPlatform, CursorTodoHistoryItem } from "./builtinToolBridge.ts";

const gunzipAsync = promisify(zlib.gunzip);

// Phase 8: max wall-clock time before we give up on the upstream and abort
// the stream. Cursor's longest-observed plain chat takes ~90s; tool-using
// turns can be longer. Five minutes is generous but bounded. A malformed env
// value (NaN / non-positive) falls back to the default rather than breaking
// setTimeout.
const CURSOR_STREAM_TIMEOUT_MS = (() => {
  const parsed = parseInt(process.env.CURSOR_STREAM_TIMEOUT_MS || "300000", 10);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : 300000;
})();

// How long to wait after an unhandled exec variant before failing the turn
// with a named error instead of hanging until the full safety timeout.
const UNKNOWN_EXEC_IDLE_MS = 15_000;

// Grace window after a composer kv_after_text soft terminator when bytes
// remain buffered: gives a trailing exec_mcp tool call time to complete its
// frame without letting plain-chat latency regress to the full stream
// timeout. 2s covers every exec_mcp-behind-kv ordering observed live.
const KV_GRACE_MS = (() => {
  const parsed = parseInt(process.env.CURSOR_KV_GRACE_MS || "2000", 10);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : 2000;
})();

// Upper bound on a single Connect-RPC frame. The 4-byte length prefix can
// declare up to 4 GiB; a corrupt or hostile upstream could send a huge length
// that forces driveH2's rolling buffer to grow unbounded (OOM) while it waits
// for bytes that never arrive. Real cursor frames are well under 1 MiB
// (largest observed: a ~13 KB KV blob), so 16 MiB is a generous ceiling that
// turns the failure into a clean stream error instead of memory exhaustion.
const CURSOR_MAX_FRAME_BYTES = 16 * 1024 * 1024;

type DriverContext = {
  endReason: "turn_ended" | "kv_after_text" | "tool_calls" | "server_end" | null;
  leftoverBytes: Buffer;
  unknownExecField: number | null;
  lastUnknownUpdateField?: number | null;
};

type H2Stream = {
  req: import("node:http2").ClientHttp2Stream;
  client: import("node:http2").ClientHttp2Session;
  initialBytes: Buffer;
};

type FrameOptions = {
  h2Req: import("node:http2").ClientHttp2Stream;
  mcpTools?: McpToolDefinition[];
  blobStore?: Map<string, Buffer>;
  clientPlatform?: CursorClientPlatform;
  todoHistory?: CursorTodoHistoryItem[];
};

type DriveOptions = Omit<FrameOptions, "h2Req"> & {
  signal?: AbortSignal;
  debugEnabled: boolean;
  debugLog: (...args: unknown[]) => void;
  onFrame: (payload: Buffer, ids: Set<string>, opts: FrameOptions) => void;
};

export function driveCursorH2(
  h2: H2Stream,
  ctx: DriverContext,
  {
    mcpTools,
    blobStore,
    clientPlatform,
    todoHistory,
    signal,
    debugEnabled,
    debugLog,
    onFrame,
  }: DriveOptions
): Promise<void> {
  const ackedExecIds = new Set<string>();
  // Rolling buffer: chunks arrive on `data`, get appended, and consumed
  // frames are sliced off so we don't re-scan + re-concat on every event
  // (avoids O(N²) for long-running streams).
  let buf: Buffer = h2.initialBytes.length > 0 ? h2.initialBytes : Buffer.alloc(0);

  return new Promise((resolve, reject) => {
    let scanning = false;
    let settled = false;
    // Grace window after a soft kv_after_text terminator with buffered
    // bytes still pending: if no further frame completes in this window,
    // the turn ends anyway — bounded latency, no dependence on the full
    // safety timeout.
    let kvGraceTimer: NodeJS.Timeout | null = null;
    // Phase 8: safety timeout. If neither turn_ended, kv_after_text, nor
    // server-end fires within CURSOR_STREAM_TIMEOUT_MS, abort the stream
    // so a stuck upstream doesn't keep the response open indefinitely.
    const safetyTimer = setTimeout(() => {
      if (ctx.endReason) return;
      debugLog("[cursor-agent] stream safety timeout fired");
      teardown();
      const lastField = ctx.lastUnknownUpdateField;
      reject(
        new Error(
          `cursor-agent stream timed out${lastField != null ? ` (last unhandled interaction update field ${lastField})` : ""}`
        )
      );
    }, CURSOR_STREAM_TIMEOUT_MS);

    // Idle watchdog: once an exec variant arrives that this build cannot
    // answer, Cursor waits for a reply that will never come and the stream
    // goes heartbeat-only. Rather than burning the full safety timeout with
    // nothing in the logs, fail fast with an error that NAMES the field, so
    // a newly introduced variant is immediately diagnosable.
    // Suggested by @QuangBlue on #14737.
    let unknownIdleTimer: NodeJS.Timeout | null = null;
    const armUnknownWatchdog = () => {
      if (unknownIdleTimer || ctx.unknownExecField === null) return;
      unknownIdleTimer = setTimeout(() => {
        if (settled || ctx.endReason) return;
        const field = ctx.unknownExecField;
        debugLog(`[cursor-agent] idle after unhandled exec variant field=${field}`);
        teardown();
        reject(
          new Error(
            `cursor-agent sent an exec variant this build cannot answer (field ${field}); the turn stalled waiting for a reply`
          )
        );
      }, UNKNOWN_EXEC_IDLE_MS);
      unknownIdleTimer.unref?.();
    };

    const onData = (chunk: Buffer) => {
      if (debugEnabled && process.env.CURSOR_DUMP_FILE) {
        fs.appendFileSync(process.env.CURSOR_DUMP_FILE, chunk);
      }
      buf = buf.length === 0 ? Buffer.from(chunk) : Buffer.concat([buf, chunk]);
      void tryScan();
    };
    const onEnd = () => {
      if (settled) return;
      settled = true;
      if (!ctx.endReason) ctx.endReason = "server_end";
      detachListeners();
      resolve();
    };
    const onErr = (err: Error) => {
      if (settled) return;
      settled = true;
      teardown();
      reject(err);
    };
    const onAbort = () => {
      if (settled) return;
      settled = true;
      teardown();
      reject(new Error("aborted"));
    };

    // detachListeners removes data/end/error/abort handlers and clears the
    // safety timer. Called on successful resolve when the caller keeps the
    // h2 alive (Phase 6 session reuse).
    const detachListeners = () => {
      clearTimeout(safetyTimer);
      if (kvGraceTimer) clearTimeout(kvGraceTimer);
      if (unknownIdleTimer) clearTimeout(unknownIdleTimer);
      h2.req.off("data", onData);
      h2.req.off("end", onEnd);
      h2.req.off("error", onErr);
      if (signal) signal.removeEventListener("abort", onAbort);
    };
    // teardown additionally closes the h2 stream. Used on error / abort /
    // safety-timeout — the connection isn't worth keeping at that point.
    const teardown = () => {
      detachListeners();
      try {
        h2.req.close();
        h2.client.close();
      } catch {
        // Expected: connection may already be closed during teardown
      }
    };

    if (signal) signal.addEventListener("abort", onAbort);

    const hasCompleteFrame = () => buf.length >= 5 && buf.length >= 5 + buf.readUInt32BE(1);

    const tryScan = async () => {
      if (scanning || settled) return;
      scanning = true;
      try {
        let pos = 0;
        while (!settled && pos + 5 <= buf.length) {
          const length = buf.readUInt32BE(pos + 1);
          if (length > CURSOR_MAX_FRAME_BYTES) {
            // Refuse to buffer an implausibly large frame — fail fast instead
            // of letting the rolling buffer grow toward OOM.
            settled = true;
            teardown();
            reject(new Error(`cursor-agent frame too large (${length} bytes)`));
            return;
          }
          if (pos + 5 + length > buf.length) break; // partial frame; wait
          const flag = buf[pos];
          const raw = buf.subarray(pos + 5, pos + 5 + length);
          // A malformed complete frame can be a blocking exec request. Skipping
          // it leaves Cursor waiting for a reply we never send.
          try {
            const payload = flag & 0x1 ? await gunzipAsync(raw) : raw;
            if (settled) return;
            onFrame(payload, ackedExecIds, {
              h2Req: h2.req,
              mcpTools,
              blobStore,
              clientPlatform,
              todoHistory,
            });
            armUnknownWatchdog();
          } catch (err) {
            debugLog("[cursor-agent] frame decode failed at pos", pos, ":", (err as Error).message);
            settled = true;
            teardown();
            reject(new Error(`cursor-agent frame decode failed (flag=${flag}, size=${length})`));
            return;
          }
          pos += 5 + length;
          if (ctx.endReason) {
            // Finish scanning coalesced frames through the normal path. A
            // later frame can be gzip-compressed; decoding it as raw protobuf
            // drops parallel exec calls and can leave Cursor waiting forever.
            const nextLength = pos + 5 <= buf.length ? buf.readUInt32BE(pos + 1) : null;
            if (nextLength !== null && pos + 5 + nextLength <= buf.length) continue;
            // kv_after_text is a speculative terminator (Phase 8): under
            // load the exec_mcp tool call shares the TCP segment with — or
            // trails by a partial frame — the KV checkpoint. Settling here
            // would splice it off as leftover and drop the tool call
            // (#10215 follow-up: empty content, zero tool_calls). Only
            // settle when the buffer ends at a clean frame boundary; bytes
            // already in flight belong to this run and are processed by
            // the next scan pass. A bounded grace window (not the full
            // safety timeout) still ends the work if no further frame
            // completes, so plain-chat latency can't regress.
            const softKv = ctx.endReason === "kv_after_text";
            const nextFrameStarted = pos < buf.length;
            if (softKv && nextFrameStarted) {
              if (!kvGraceTimer) {
                kvGraceTimer = setTimeout(() => {
                  if (settled || !ctx.endReason) return;
                  settled = true;
                  detachListeners();
                  resolve();
                }, KV_GRACE_MS);
              }
            } else {
              buf = buf.subarray(pos);
              if (ctx.endReason === "tool_calls") {
                ctx.leftoverBytes = Buffer.from(buf);
                // Removing the last data listener does not stop a flowing
                // Readable: frames arriving before the next API request were
                // silently discarded. Hold the h2 receive side until the
                // next driveH2 call has attached its listeners.
                h2.req.pause?.();
              }
              settled = true;
              detachListeners();
              resolve();
              return;
            }
          }
        }
        // Splice off processed bytes so the buffer stays bounded.
        if (pos > 0) buf = buf.subarray(pos);
      } finally {
        scanning = false;
      }

      if (!settled && hasCompleteFrame()) {
        void tryScan();
      }
    };

    h2.req.on("data", onData);
    h2.req.on("end", onEnd);
    h2.req.on("error", onErr);

    // Process any bytes already buffered from openH2.
    void tryScan();
    h2.req.resume?.();
  });
}
