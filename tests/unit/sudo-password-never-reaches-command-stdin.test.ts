/**
 * GHSA-cqwr-7mqw-chr9: the operator's sudo password must never reach the stdin of the
 * elevated command.
 *
 * `execFileWithPassword("sudo", ["-S", "tee", "-a", HOSTS], pw, data)` used to write
 * `pw\ndata` to one `sudo -S tee` process. When sudo does not prompt (NOPASSWD, or a cached
 * credential) it never reads stdin, so `tee` appended the password to the world-readable
 * hosts file. These cases drive the helper with a fake spawn that behaves like a
 * no-prompt sudo and record exactly what each process receives on stdin.
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import { EventEmitter } from "node:events";

const { planSudoSteps, execFileWithPassword } = await import("../../src/mitm/systemCommands.ts");

const PASSWORD = "PROBE-PASSWORD-9f3a";
const DATA = "127.0.0.1 example.test\n";
// Never a real system file: if a regression ever ignored the injected spawn, a real `tee`
// would fail on this missing directory instead of appending to the host's /etc/hosts.
const HOSTS = "/nonexistent-omniroute-sudo-test/hosts";
const NON_ROOT_WITH_SUDO = { root: false, sudoAvailable: true, noSudo: false } as const;

type Call = { command: string; args: string[]; stdin: string };

/** Fake spawn: `respond(call)` decides exit code and stderr once stdin is closed. */
function fakeSpawn(respond: (call: Call) => { code: number; stderr?: string }) {
  const calls: Call[] = [];
  const spawnImpl = ((command: string, args: string[]) => {
    const call: Call = { command, args, stdin: "" };
    calls.push(call);
    const child = new EventEmitter() as EventEmitter & Record<string, unknown>;
    child.stdout = new EventEmitter();
    child.stderr = new EventEmitter();
    child.stdin = {
      write: (chunk: string) => {
        call.stdin += chunk;
      },
      end: () => {
        const { code, stderr } = respond(call);
        setImmediate(() => {
          if (stderr) (child.stderr as EventEmitter).emit("data", Buffer.from(stderr));
          child.emit("close", code);
        });
      },
    };
    return child;
  }) as never;
  return { calls, spawnImpl };
}

test("plan: the password goes only to `sudo -S -v`, the command gets only its data", () => {
  const { steps, fallback } = planSudoSteps(
    "sudo",
    ["-S", "tee", "-a", HOSTS],
    PASSWORD,
    DATA,
    NON_ROOT_WITH_SUDO
  );
  assert.deepEqual(steps, [
    { command: "sudo", args: ["-S", "-p", "", "-v"], stdin: `${PASSWORD}\n` },
    { command: "sudo", args: ["-n", "tee", "-a", HOSTS], stdin: DATA },
  ]);
  assert.ok(!steps[1].stdin.includes(PASSWORD), "the elevated command never sees the password");
  assert.deepEqual(fallback?.args, ["-S", "tee", "-a", HOSTS]);
});

test("plan: without sudo (root / no sudo / OMNIROUTE_NO_SUDO) there is one plain step, no password", () => {
  const { steps, fallback } = planSudoSteps("sudo", ["-S", "tee", "-a", HOSTS], PASSWORD, DATA, {
    root: true,
    sudoAvailable: true,
    noSudo: false,
  });
  assert.deepEqual(steps, [{ command: "tee", args: ["-a", HOSTS], stdin: DATA }]);
  assert.equal(fallback, null);
});

test("no-prompt sudo: the hosts writer receives the entries and never the password", async () => {
  const { calls, spawnImpl } = fakeSpawn(() => ({ code: 0 }));
  await execFileWithPassword("sudo", ["-S", "tee", "-a", HOSTS], PASSWORD, DATA, {
    spawnImpl,
    sudoOverrides: NON_ROOT_WITH_SUDO,
  });
  const writer = calls.find((c) => c.args.includes("tee"));
  assert.ok(writer, "the hosts writer ran");
  assert.equal(writer.stdin, DATA);
  assert.ok(!writer.stdin.includes(PASSWORD));
  assert.ok(calls.every((c) => c.args.includes("-v") || !c.stdin.includes(PASSWORD)));
});

test("timestamp_timeout=0: `sudo -n` refuses, the fallback lets sudo consume the password", async () => {
  const { calls, spawnImpl } = fakeSpawn((call) =>
    call.args[0] === "-n" ? { code: 1, stderr: "sudo: a password is required\n" } : { code: 0 }
  );
  await execFileWithPassword("sudo", ["-S", "tee", "-a", HOSTS], PASSWORD, DATA, {
    spawnImpl,
    sudoOverrides: NON_ROOT_WITH_SUDO,
  });
  assert.equal(calls.length, 3);
  assert.deepEqual(calls[2].args, ["-S", "tee", "-a", HOSTS]);
});

test("a wrong password stops at validation and never runs the command", async () => {
  const { calls, spawnImpl } = fakeSpawn((call) =>
    call.args.includes("-v") ? { code: 1, stderr: "Sorry, try again.\n" } : { code: 0 }
  );
  await assert.rejects(
    execFileWithPassword("sudo", ["-S", "tee", "-a", HOSTS], PASSWORD, DATA, {
      spawnImpl,
      sudoOverrides: NON_ROOT_WITH_SUDO,
    }),
    /Command failed/
  );
  assert.equal(calls.length, 1);
});
