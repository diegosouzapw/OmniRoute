/**
 * Apply step for a rendered proxy-core configuration: native check first,
 * atomic replacement only on success, beside-write with a reason otherwise.
 *
 * The adopted file is never replaced without a passing native check
 * (`<binary> check -c <candidate>`). The candidate lives in the adopted
 * directory (same filesystem, atomic rename) with a random suffix so two
 * subscriptions sharing one path cannot collide.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const applyMod = await import("../../src/lib/proxySubscription/coreConfig/apply.ts");
const guardMod = await import("../../src/lib/proxySubscription/coreConfig/pathGuard.ts");
const { applyRendered } = applyMod;
const { isCoreBinaryPathAllowed, checkArgsFor, CORE_CHECK_ARGS } = guardMod;
import type { RunCheck } from "../../src/lib/proxySubscription/coreConfig/apply.ts";

function makeDir(): string {
  return fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-core-apply-"));
}

function writeExecutable(dir: string, name: string, body: string): string {
  const p = path.join(dir, name);
  fs.writeFileSync(p, body, { mode: 0o755 });
  fs.chmodSync(p, 0o755);
  return p;
}

const okCheck: RunCheck = async () => ({ stdout: "", stderr: "" });
const koCheck: RunCheck = async () => {
  const error = new Error("Command failed") as Error & { stderr: string };
  error.stderr = "invalid configuration";
  throw error;
};

test.after(() => {});

test("allow-list derives from the check-args table", () => {
  assert.deepEqual(checkArgsFor("sing-box"), ["check", "-c"]);
  assert.equal(checkArgsFor("unknown-core"), null);
  assert.ok("sing-box" in CORE_CHECK_ARGS);
});

test("binary guard refuses malformed paths without disk access", () => {
  assert.equal(isCoreBinaryPathAllowed("").reason, "empty");
  assert.equal(isCoreBinaryPathAllowed("   ").reason, "empty");
  assert.equal(isCoreBinaryPathAllowed("relative/sing-box").reason, "not_absolute");
  assert.equal(isCoreBinaryPathAllowed("/opt/sb/../sing-box").reason, "dotdot_segment");
  assert.equal(isCoreBinaryPathAllowed("/bin/sing-box\0").reason, "nul_byte");
  assert.equal(isCoreBinaryPathAllowed(`/${"a".repeat(1024)}`).reason, "too_long");
  assert.equal(isCoreBinaryPathAllowed("/usr/bin/unknown-core").reason, "not_allowlisted");
  assert.equal(isCoreBinaryPathAllowed("/usr/bin/sing-box").allowed, true);
});

test("empty binary path writes beside without forking", async (t) => {
  const dir = makeDir();
  t.after(() => fs.rmSync(dir, { recursive: true, force: true }));
  let called = 0;
  const spy: RunCheck = async () => {
    called += 1;
    return { stdout: "", stderr: "" };
  };
  const outcome = await applyRendered({
    adoptedPath: path.join(dir, "config.json"),
    binaryPath: "",
    renderedText: "{}\n",
    subscriptionId: "s1",
    runCheck: spy,
  });
  assert.deepEqual(outcome, { status: "beside", beside: "no_binary" });
  assert.equal(called, 0);
});

test("identical content skips without writing or forking and keeps mtime", async (t) => {
  const dir = makeDir();
  t.after(() => fs.rmSync(dir, { recursive: true, force: true }));
  const adopted = path.join(dir, "config.json");
  fs.writeFileSync(adopted, '{"a":1}\n');
  const before = fs.statSync(adopted).mtimeMs;
  let called = 0;
  const spy: RunCheck = async () => {
    called += 1;
    return { stdout: "", stderr: "" };
  };
  const outcome = await applyRendered({
    adoptedPath: adopted,
    binaryPath: "/usr/bin/sing-box",
    renderedText: '{"a":1}\n',
    subscriptionId: "s1",
    runCheck: spy,
  });
  assert.deepEqual(outcome, { status: "beside", beside: "unchanged_skip" });
  assert.equal(called, 0);
  assert.equal(fs.statSync(adopted).mtimeMs, before);
});

test("missing binary refuses without executing", async (t) => {
  const dir = makeDir();
  t.after(() => fs.rmSync(dir, { recursive: true, force: true }));
  const adopted = path.join(dir, "config.json");
  fs.writeFileSync(adopted, "old\n");
  let called = 0;
  const spy: RunCheck = async () => {
    called += 1;
    return { stdout: "", stderr: "" };
  };
  const outcome = await applyRendered({
    adoptedPath: adopted,
    binaryPath: path.join(dir, "sing-box"),
    renderedText: "new\n",
    subscriptionId: "s1",
    runCheck: spy,
  });
  assert.deepEqual(outcome, { status: "beside", beside: "binary_missing" });
  assert.equal(called, 0);
  assert.equal(fs.readFileSync(adopted, "utf8"), "old\n");
});

test("non-executable binary refuses without executing", async (t) => {
  const dir = makeDir();
  t.after(() => fs.rmSync(dir, { recursive: true, force: true }));
  const bin = path.join(dir, "sing-box");
  fs.writeFileSync(bin, "not executable\n");
  fs.chmodSync(bin, 0o644);
  const adopted = path.join(dir, "config.json");
  fs.writeFileSync(adopted, "old\n");
  let called = 0;
  const outcome = await applyRendered({
    adoptedPath: adopted,
    binaryPath: bin,
    renderedText: "new\n",
    subscriptionId: "s1",
    runCheck: async () => {
      called += 1;
      return { stdout: "", stderr: "" };
    },
  });
  assert.deepEqual(outcome, { status: "beside", beside: "binary_missing" });
  assert.equal(called, 0);
  assert.equal(fs.readFileSync(adopted, "utf8"), "old\n");
});

test("binary outside the allow-list refuses without executing", async (t) => {
  const dir = makeDir();
  t.after(() => fs.rmSync(dir, { recursive: true, force: true }));
  const bin = writeExecutable(dir, "other-core", "#!/bin/sh\nexit 0\n");
  const adopted = path.join(dir, "config.json");
  fs.writeFileSync(adopted, "old\n");
  let called = 0;
  const outcome = await applyRendered({
    adoptedPath: adopted,
    binaryPath: bin,
    renderedText: "new\n",
    subscriptionId: "s1",
    runCheck: async () => {
      called += 1;
      return { stdout: "", stderr: "" };
    },
  });
  assert.deepEqual(outcome, { status: "beside", beside: "binary_missing" });
  assert.equal(called, 0);
  assert.equal(fs.readFileSync(adopted, "utf8"), "old\n");
});

test("failing check leaves the adopted file byte-identical and cleans the candidate", async (t) => {
  const dir = makeDir();
  t.after(() => fs.rmSync(dir, { recursive: true, force: true }));
  const bin = writeExecutable(dir, "sing-box", "#!/bin/sh\nexit 1\n");
  const adopted = path.join(dir, "config.json");
  fs.writeFileSync(adopted, "old\n");
  const before = fs.readFileSync(adopted);
  const outcome = await applyRendered({
    adoptedPath: adopted,
    binaryPath: bin,
    renderedText: "new\n",
    subscriptionId: "s1",
    runCheck: koCheck,
  });
  assert.deepEqual(outcome, { status: "beside", beside: "check_failed" });
  assert.deepEqual(fs.readFileSync(adopted), before);
  const leftovers = fs.readdirSync(dir).filter((f) => f.includes(".check."));
  assert.deepEqual(leftovers, []);
});

test("detail carries the reason only, never raw checker output", () => {
  const reasons = ["no_binary", "binary_missing", "check_failed", "write_failed", "unchanged_skip"];
  for (const beside of reasons) {
    assert.match(beside, /^(no_binary|binary_missing|check_failed|write_failed|unchanged_skip)$/);
  }
});

test("passing check replaces the adopted file and keeps the old content in .prev", async (t) => {
  const dir = makeDir();
  t.after(() => fs.rmSync(dir, { recursive: true, force: true }));
  const bin = writeExecutable(dir, "sing-box", "#!/bin/sh\nexit 0\n");
  const adopted = path.join(dir, "config.json");
  fs.writeFileSync(adopted, "old\n");
  fs.writeFileSync(`${adopted}.generated`, "stale\n");
  const outcome = await applyRendered({
    adoptedPath: adopted,
    binaryPath: bin,
    renderedText: "new\n",
    subscriptionId: "s1",
    runCheck: okCheck,
  });
  assert.deepEqual(outcome, { status: "replaced" });
  assert.equal(fs.readFileSync(adopted, "utf8"), "new\n");
  assert.equal(fs.readFileSync(`${adopted}.prev`, "utf8"), "old\n");
  assert.equal(fs.existsSync(`${adopted}.generated`), false);
  const leftovers = fs.readdirSync(dir).filter((f) => f.includes(".check."));
  assert.deepEqual(leftovers, []);
});

test("replacement preserves the adopted file mode", async (t) => {
  const dir = makeDir();
  t.after(() => fs.rmSync(dir, { recursive: true, force: true }));
  const bin = writeExecutable(dir, "sing-box", "#!/bin/sh\nexit 0\n");
  const adopted = path.join(dir, "config.json");
  fs.writeFileSync(adopted, "old\n");
  fs.chmodSync(adopted, 0o640);
  const outcome = await applyRendered({
    adoptedPath: adopted,
    binaryPath: bin,
    renderedText: "new\n",
    subscriptionId: "s1",
    runCheck: okCheck,
  });
  assert.deepEqual(outcome, { status: "replaced" });
  assert.equal(fs.statSync(adopted).mode & 0o777, 0o640);
});

test("candidate mode alignment failure reports write_failed", async (t) => {
  const dir = makeDir();
  t.after(() => fs.rmSync(dir, { recursive: true, force: true }));
  const bin = writeExecutable(dir, "sing-box", "#!/bin/sh\nexit 0\n");
  const adopted = path.join(dir, "config.json");
  fs.writeFileSync(adopted, "old\n");
  const outcome = await applyRendered({
    adoptedPath: adopted,
    binaryPath: bin,
    renderedText: "new\n",
    subscriptionId: "s1",
    runCheck: okCheck,
    fsHooks: {
      chmodSync: () => {
        throw new Error("injected chmod fault");
      },
    },
  });
  assert.deepEqual(outcome, { status: "beside", beside: "write_failed" });
  assert.equal(fs.readFileSync(adopted, "utf8"), "old\n");
});

test("first replacement without an adopted file needs no backup", async (t) => {
  const dir = makeDir();
  t.after(() => fs.rmSync(dir, { recursive: true, force: true }));
  const bin = writeExecutable(dir, "sing-box", "#!/bin/sh\nexit 0\n");
  const adopted = path.join(dir, "config.json");
  const outcome = await applyRendered({
    adoptedPath: adopted,
    binaryPath: bin,
    renderedText: "new\n",
    subscriptionId: "s1",
    runCheck: okCheck,
  });
  assert.deepEqual(outcome, { status: "replaced" });
  assert.equal(fs.readFileSync(adopted, "utf8"), "new\n");
  assert.equal(fs.existsSync(`${adopted}.prev`), false);
});

test("slow check is killed at the injected timeout and the candidate is removed", async (t) => {
  const dir = makeDir();
  t.after(() => fs.rmSync(dir, { recursive: true, force: true }));
  const bin = writeExecutable(dir, "sing-box", "#!/bin/sh\nsleep 60\n");
  const adopted = path.join(dir, "config.json");
  fs.writeFileSync(adopted, "old\n");
  const seen: Array<{ timeoutMs: number; maxBuffer: number }> = [];
  const slow: RunCheck = (binPath, args, opts) =>
    new Promise((_resolve, reject) => {
      seen.push({ timeoutMs: opts.timeoutMs, maxBuffer: opts.maxBuffer });
      void binPath;
      void args;
      const timer = setTimeout(() => {
        const error = new Error("killed") as Error & { code: string };
        error.code = "ETIMEDOUT";
        reject(error);
      }, opts.timeoutMs);
      void timer;
    });
  const outcome = await applyRendered({
    adoptedPath: adopted,
    binaryPath: bin,
    renderedText: "new\n",
    subscriptionId: "s1",
    runCheck: slow,
    timeoutMs: 50,
  });
  assert.deepEqual(outcome, { status: "beside", beside: "check_failed" });
  assert.equal(seen.length, 1);
  assert.equal(seen[0].timeoutMs, 50);
  assert.equal(fs.readFileSync(adopted, "utf8"), "old\n");
  assert.deepEqual(
    fs.readdirSync(dir).filter((f) => f.includes(".check.")),
    []
  );
});

test("unwritable directory reports write_failed with no leftover and an intact adopted file", async (t) => {
  const dir = makeDir();
  t.after(() => {
    try {
      fs.chmodSync(dir, 0o755);
    } catch {}
    fs.rmSync(dir, { recursive: true, force: true });
  });
  const adopted = path.join(dir, "config.json");
  fs.writeFileSync(adopted, "old\n");
  fs.chmodSync(dir, 0o555);
  let probeFailed = false;
  try {
    fs.writeFileSync(path.join(dir, ".probe"), "x");
  } catch {
    probeFailed = true;
  }
  if (!probeFailed) {
    t.skip("running as a privileged user: read-only directory still writable");
    return;
  }
  const outcome = await applyRendered({
    adoptedPath: adopted,
    binaryPath: "/usr/bin/sing-box",
    renderedText: "new\n",
    subscriptionId: "s1",
    runCheck: okCheck,
  });
  assert.deepEqual(outcome, { status: "beside", beside: "write_failed" });
  assert.equal(fs.readFileSync(adopted, "utf8"), "old\n");
  fs.chmodSync(dir, 0o755);
  assert.deepEqual(
    fs.readdirSync(dir).filter((f) => f.includes(".check.")),
    []
  );
});

test("trapped binary name travels as a single argument and never executes", async (t) => {
  const dir = makeDir();
  t.after(() => fs.rmSync(dir, { recursive: true, force: true }));
  const adopted = path.join(dir, "config.json");
  fs.writeFileSync(adopted, "old\n");
  const seen: string[][] = [];
  const outcome = await applyRendered({
    adoptedPath: adopted,
    binaryPath: "/usr/bin/sing-box; rm -rf /",
    renderedText: "new\n",
    subscriptionId: "s1",
    runCheck: async (_bin, args) => {
      seen.push(args);
      return { stdout: "", stderr: "" };
    },
  });
  assert.deepEqual(outcome, { status: "beside", beside: "binary_missing" });
  assert.deepEqual(seen, []);
});

test("failing check passes the candidate as a single trailing argument", async (t) => {
  const dir = makeDir();
  t.after(() => fs.rmSync(dir, { recursive: true, force: true }));
  const bin = writeExecutable(dir, "sing-box", "#!/bin/sh\nexit 1\n");
  const adopted = path.join(dir, "config.json");
  fs.writeFileSync(adopted, "old\n");
  const seen: Array<{ bin: string; args: string[] }> = [];
  const outcome = await applyRendered({
    adoptedPath: adopted,
    binaryPath: bin,
    renderedText: "new\n",
    subscriptionId: "s1",
    runCheck: async (b, args) => {
      seen.push({ bin: b, args });
      return koCheck(b, args, { timeoutMs: 1000, maxBuffer: 65536 });
    },
  });
  assert.deepEqual(outcome, { status: "beside", beside: "check_failed" });
  assert.equal(seen.length, 1);
  assert.equal(seen[0].bin, bin);
  assert.deepEqual(seen[0].args.slice(0, 2), ["check", "-c"]);
  assert.equal(seen[0].args.length, 3);
  assert.ok(seen[0].args[2].startsWith(`${adopted}.check.`));
});

test("injected rename fault reports write_failed and logs with the subscription id", async (t) => {
  const dir = makeDir();
  t.after(() => fs.rmSync(dir, { recursive: true, force: true }));
  const bin = writeExecutable(dir, "sing-box", "#!/bin/sh\nexit 0\n");
  const adopted = path.join(dir, "config.json");
  fs.writeFileSync(adopted, "old\n");
  const warnings: string[] = [];
  const originalWarn = console.warn;
  console.warn = (message?: unknown) => {
    warnings.push(String(message));
  };
  t.after(() => {
    console.warn = originalWarn;
  });
  const outcome = await applyRendered({
    adoptedPath: adopted,
    binaryPath: bin,
    renderedText: "new\n",
    subscriptionId: "sub-42",
    runCheck: okCheck,
    fsHooks: {
      renameSync: () => {
        throw new Error("injected rename fault");
      },
    },
  });
  assert.deepEqual(outcome, { status: "beside", beside: "write_failed" });
  assert.ok(warnings.some((w) => w.includes("sub-42")));
});

test("adopted symlink is refused without modification", async (t) => {
  const dir = makeDir();
  t.after(() => fs.rmSync(dir, { recursive: true, force: true }));
  const bin = writeExecutable(dir, "sing-box", "#!/bin/sh\nexit 0\n");
  const target = path.join(dir, "target.json");
  fs.writeFileSync(target, "old\n");
  const adopted = path.join(dir, "config.json");
  fs.symlinkSync(target, adopted);
  let called = 0;
  const outcome = await applyRendered({
    adoptedPath: adopted,
    binaryPath: bin,
    renderedText: "new\n",
    subscriptionId: "s1",
    runCheck: async () => {
      called += 1;
      return { stdout: "", stderr: "" };
    },
  });
  assert.deepEqual(outcome, { status: "beside", beside: "write_failed" });
  assert.equal(called, 0);
  assert.equal(fs.readFileSync(target, "utf8"), "old\n");
});

test("two subscriptions sharing one path do not collide on the candidate", async (t) => {
  const dir = makeDir();
  t.after(() => fs.rmSync(dir, { recursive: true, force: true }));
  const bin = writeExecutable(dir, "sing-box", "#!/bin/sh\nexit 0\n");
  const adopted = path.join(dir, "config.json");
  fs.writeFileSync(adopted, "old\n");
  const [first, second] = await Promise.all([
    applyRendered({
      adoptedPath: adopted,
      binaryPath: bin,
      renderedText: "first\n",
      subscriptionId: "s1",
      runCheck: okCheck,
    }),
    applyRendered({
      adoptedPath: adopted,
      binaryPath: bin,
      renderedText: "second\n",
      subscriptionId: "s2",
      runCheck: okCheck,
    }),
  ]);
  assert.ok([first.status, second.status].includes("replaced"));
  assert.deepEqual(
    fs.readdirSync(dir).filter((f) => f.includes(".check.")),
    []
  );
});
