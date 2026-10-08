import { test } from "node:test";
import assert from "node:assert/strict";
import { writeFileSync, mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

// #13314: ServerSupervisor's default (non `--log`) mode only buffers a
// fatal `[STARTUP] Fatal: ...` boot diagnostic in-memory and flushes it to
// the real console only when the child process exits. If the HTTP listener
// still comes up after a fatal DB-driver-cascade failure was already
// printed, the operator sees "OmniRoute is running!" with every route
// 500ing and zero diagnostic output anywhere. This regression test asserts
// the fatal line now reaches the real console immediately, not only on
// exit/crash.
test("ServerSupervisor surfaces a fatal [STARTUP] Fatal: boot diagnostic to the real console even when the child never exits (default, non --log mode)", async () => {
  const { ServerSupervisor } = await import("../../bin/cli/runtime/processSupervisor.mjs");
  delete process.env.OMNIROUTE_SHOW_LOG;

  const dir = mkdtempSync(join(tmpdir(), "omniroute-issue13314-"));
  const childScript = join(dir, "fake-server.mjs");
  writeFileSync(
    childScript,
    `
    console.error("[STARTUP] Fatal: Database driver initialization failed: better-sqlite3 invalid, node:sqlite fallback also failed");
    console.log("Ready on 0.0.0.0:20128");
    setInterval(() => {}, 1000);
    `
  );

  const seenOnRealConsole: string[] = [];
  const origStdoutWrite = process.stdout.write.bind(process.stdout);
  const origStderrWrite = process.stderr.write.bind(process.stderr);
  process.stdout.write = ((chunk: unknown, ...rest: unknown[]) => {
    seenOnRealConsole.push(String(chunk));
    // @ts-expect-error - forwarding varargs to the real writer
    return origStdoutWrite(chunk, ...rest);
  }) as typeof process.stdout.write;
  process.stderr.write = ((chunk: unknown, ...rest: unknown[]) => {
    seenOnRealConsole.push(String(chunk));
    // @ts-expect-error - forwarding varargs to the real writer
    return origStderrWrite(chunk, ...rest);
  }) as typeof process.stderr.write;

  const supervisor = new ServerSupervisor({
    serverPath: childScript,
    env: { ...process.env },
    maxRestarts: 2,
    memoryLimit: 256,
  });

  try {
    supervisor.start();
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const bufferedLog = supervisor.getRecentLog().join("\n");
    const printedToRealConsole = seenOnRealConsole.join("");

    assert.match(
      bufferedLog,
      /\[STARTUP\] Fatal: Database driver initialization failed/,
      "expected the fatal boot diagnostic to be captured into the supervisor's buffer"
    );

    assert.match(
      printedToRealConsole,
      /\[STARTUP\] Fatal: Database driver initialization failed/,
      "expected the fatal boot diagnostic to reach the real console even though the child process never exits"
    );
  } finally {
    process.stdout.write = origStdoutWrite;
    process.stderr.write = origStderrWrite;
    supervisor.stop();
  }
});
