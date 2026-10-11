import test from "node:test";
import assert from "node:assert/strict";
import { EventEmitter } from "node:events";
import { PassThrough } from "node:stream";

import {
  ensureVirtualDisplay,
  stopVirtualDisplay,
  MissingDisplayError,
} from "../../open-sse/services/virtualDisplay.ts";
import { isMissingDisplay } from "../../open-sse/executors/browserExecutableCheck.ts";

function fakeSpawn(behavior: "ok" | "enoent") {
  const calls: Array<{ cmd: string; args: string[] }> = [];
  const spawn = ((cmd: string, args: string[]) => {
    calls.push({ cmd, args });
    const child = new EventEmitter() as EventEmitter & Record<string, unknown>;
    child.exitCode = null;
    child.killed = false;
    child.kill = () => {
      child.killed = true;
      return true;
    };
    child.unref = () => undefined;
    const pipe = new PassThrough();
    child.stdio = [null, null, null, pipe];
    setImmediate(() => {
      if (behavior === "enoent") {
        child.emit("error", Object.assign(new Error("spawn Xvfb ENOENT"), { code: "ENOENT" }));
      } else {
        pipe.write("99\n");
      }
    });
    return child;
  }) as never;
  return { spawn, calls };
}

test.afterEach(() => stopVirtualDisplay());

test("no Xvfb when the host already has a display or is not linux", async () => {
  const { spawn, calls } = fakeSpawn("ok");
  assert.equal(
    await ensureVirtualDisplay({ spawn, env: { DISPLAY: ":0" }, platform: "linux" }),
    undefined
  );
  assert.equal(
    await ensureVirtualDisplay({ spawn, env: { WAYLAND_DISPLAY: "w" }, platform: "linux" }),
    undefined
  );
  assert.equal(await ensureVirtualDisplay({ spawn, env: {}, platform: "darwin" }), undefined);
  assert.equal(calls.length, 0);
});

test("starts one private Xvfb (args array, no shell) and reuses it", async () => {
  const { spawn, calls } = fakeSpawn("ok");
  const a = await ensureVirtualDisplay({ spawn, env: {}, platform: "linux" });
  const b = await ensureVirtualDisplay({ spawn, env: {}, platform: "linux" });
  assert.equal(a, ":99");
  assert.equal(b, ":99");
  assert.equal(calls.length, 1);
  assert.equal(calls[0].cmd, "Xvfb");
  assert.ok(calls[0].args.includes("-displayfd"));
});

test("missing Xvfb binary throws a typed error that isMissingDisplay recognises", async () => {
  const { spawn } = fakeSpawn("enoent");
  await assert.rejects(
    ensureVirtualDisplay({ spawn, env: {}, platform: "linux" }),
    (err: Error) => err instanceof MissingDisplayError && isMissingDisplay(err.message)
  );
});

test("isMissingDisplay matches Playwright's headed-without-XServer text only", () => {
  assert.equal(
    isMissingDisplay("Looks like you launched a headed browser without having a XServer running."),
    true
  );
  assert.equal(isMissingDisplay("Missing X server or $DISPLAY"), true);
  assert.equal(isMissingDisplay("net::ERR_CONNECTION_RESET"), false);
  assert.equal(isMissingDisplay(""), false);
});
