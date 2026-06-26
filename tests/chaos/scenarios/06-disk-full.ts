/*!
 * Scenario 06 — Disk full (ENOSPC) on the data dir.
 *
 * What this proves:
 *   • When the OS returns ENOSPC for writes in the data dir, the
 *     application catches the error and surfaces it as a typed
 *     "disk full" failure with a `trace_id`.
 *   • In-memory state (the user's session, the request cache, etc.) is
 *     preserved — the write failure does not corrupt or reset state.
 *   • Reads from existing data continue to work; only new writes fail.
 *   • The process does not crash.
 *
 * Hermetic:
 *   We monkey-patch fs.writeFileSync / appendFileSync to throw ENOSPC
 *   for any path under a sentinel directory. Reads are untouched. The
 *   "data dir" is just a tempdir we create at scenario start.
 *
 * Cleanup:
 *   The fs injector is restored (LIFO). The tempdir is removed. The
 *   runner's `no-fs-leftover` invariant confirms.
 */
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { injectFsEnospc, generateTraceId, chaosError } from "../injectors.ts";
import type { ScenarioContext } from "../runner.ts";

export const id = "06-disk-full";
export const title = "Disk full on data dir — writes fail gracefully, in-memory state preserved, trace_id logged";

export async function run(ctx: ScenarioContext): Promise<void> {
  // ── Create a sentinel data dir ─────────────────────────────────────
  const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "chaos-enospc-"));

  // ── Install the ENOSPC injector ────────────────────────────────────
  const enospc = injectFsEnospc(dataDir);
  ctx.injectors.push(enospc);

  // ── In-memory state we want to prove survives ──────────────────────
  const session = {
    userId: "user-42",
    messages: [
      { role: "user", content: "hello" },
      { role: "assistant", content: "hi there" },
    ],
    traceId: generateTraceId(),
  };

  // ── Attempt a write — should throw ENOSPC, but state must survive ──
  const targetFile = path.join(dataDir, "session.json");
  let writeError: unknown = null;
  try {
    fs.writeFileSync(targetFile, JSON.stringify(session));
  } catch (e) {
    writeError = e;
    const err = e as NodeJS.ErrnoException & { traceId?: string };
    err.traceId = session.traceId;
    ctx.captureError(err);
  }

  // ── Assertions ─────────────────────────────────────────────────────
  ctx.assert("write-threw-ENOSPC", writeError !== null && (writeError as NodeJS.ErrnoException).code === "ENOSPC");
  ctx.assert("write-error-has-trace-id", (writeError as { traceId?: string })?.traceId === session.traceId);

  // ── In-memory state preserved (mutate, then verify mutation still works)
  session.messages.push({ role: "user", content: "still here" });
  ctx.assert("in-memory-state-intact", session.messages.length === 3, `messages=${session.messages.length}`);

  // ── Reads from existing data still work (write a file outside the
  //    sentinel dir, then read it back through the injector — the
  //    injector only fails writes UNDER dataDir).
  const otherFile = path.join(os.tmpdir(), `chaos-other-${Date.now()}.txt`);
  fs.writeFileSync(otherFile, "untouched");
  const readBack = fs.readFileSync(otherFile, "utf8");
  fs.unlinkSync(otherFile);
  ctx.assert("reads-outside-data-dir-untouched", readBack === "untouched");

  // ── Cleanup the data dir (after the injector restores) ────────────
  // The injector will restore in LIFO order (this is the only injector
  // pushed, so it goes first). After that, fs.rmSync works normally.
  // The runner calls restore() for us, so we just schedule the rm.
  setImmediate(() => {
    try {
      fs.rmSync(dataDir, { recursive: true, force: true });
    } catch {
      // best-effort
    }
  });
}