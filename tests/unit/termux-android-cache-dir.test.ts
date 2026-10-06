/**
 * Termux/Android: Next.js cache-dir prep and instrumentation-failure hints.
 *
 * Guards the behavior where a missing `~/.cache` on `platform === "android"`
 * makes Next.js abort its instrumentation hook and leave every request as a
 * silent HTTP 500.
 */
import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, mkdirSync, rmSync, existsSync, readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { tmpdir } from "node:os";
import { fileURLToPath } from "node:url";

import {
  needsAndroidCacheDirPrep,
  resolveAndroidCacheDir,
  ensureAndroidCacheDir,
  isFatalInstrumentationHookFailure,
  formatAndroidInstrumentationFailureHint,
} from "../../bin/cli/utils/ensureAndroidCacheDir.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, "../..");

test("needsAndroidCacheDirPrep: true for platform android", () => {
  assert.equal(needsAndroidCacheDirPrep("android", {}), true);
});

test("needsAndroidCacheDirPrep: true for Termux env even when platform is linux", () => {
  assert.equal(needsAndroidCacheDirPrep("linux", { TERMUX_VERSION: "0.119" }), true);
  assert.equal(
    needsAndroidCacheDirPrep("linux", { PREFIX: "/data/data/com.termux/files/usr" }),
    true
  );
});

test("needsAndroidCacheDirPrep: false on desktop platforms without Termux signals", () => {
  assert.equal(needsAndroidCacheDirPrep("darwin", {}), false);
  assert.equal(needsAndroidCacheDirPrep("linux", {}), false);
  assert.equal(needsAndroidCacheDirPrep("win32", { PREFIX: "/usr/local" }), false);
});

test("resolveAndroidCacheDir: prefers XDG_CACHE_HOME when set", () => {
  assert.equal(
    resolveAndroidCacheDir(() => "/home/u", { XDG_CACHE_HOME: "/custom/cache" }),
    "/custom/cache"
  );
});

test("resolveAndroidCacheDir: falls back to <homedir>/.cache", () => {
  assert.equal(
    resolveAndroidCacheDir(() => "/data/data/com.termux/files/home", {}),
    join("/data/data/com.termux/files/home", ".cache")
  );
});

test("ensureAndroidCacheDir: no-op on darwin (does not mkdir, does not set env)", () => {
  const env = {};
  const calls = [];
  const result = ensureAndroidCacheDir({
    platform: "darwin",
    env,
    mkdirSyncFn: (...args) => {
      calls.push(args);
    },
    existsSyncFn: () => false,
  });
  assert.deepEqual(result, { prepared: false, cacheDir: null, created: false });
  assert.equal(calls.length, 0);
  assert.equal(env.XDG_CACHE_HOME, undefined);
});

test("ensureAndroidCacheDir: creates ~/.cache when missing on android", () => {
  const home = mkdtempSync(join(tmpdir(), "omniroute-android-cache-home-"));
  const cacheDir = join(home, ".cache");
  const env = {};

  try {
    assert.equal(existsSync(cacheDir), false);
    const result = ensureAndroidCacheDir({
      platform: "android",
      env,
      homedirFn: () => home,
    });
    assert.equal(result.prepared, true);
    assert.equal(result.created, true);
    assert.equal(result.cacheDir, cacheDir);
    assert.equal(existsSync(cacheDir), true);
    assert.equal(env.XDG_CACHE_HOME, cacheDir);
  } finally {
    rmSync(home, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  }
});

test("ensureAndroidCacheDir: does not recreate when ~/.cache already exists", () => {
  const home = mkdtempSync(join(tmpdir(), "omniroute-android-cache-existing-"));
  const cacheDir = join(home, ".cache");
  mkdirSync(cacheDir);
  const env = {};
  let mkdirCalls = 0;

  try {
    const result = ensureAndroidCacheDir({
      platform: "android",
      env,
      homedirFn: () => home,
      mkdirSyncFn: () => {
        mkdirCalls += 1;
      },
    });
    assert.equal(result.prepared, true);
    assert.equal(result.created, false);
    assert.equal(mkdirCalls, 0);
    assert.equal(env.XDG_CACHE_HOME, cacheDir);
  } finally {
    rmSync(home, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  }
});

test("ensureAndroidCacheDir: respects an existing XDG_CACHE_HOME and creates that path", () => {
  const root = mkdtempSync(join(tmpdir(), "omniroute-android-cache-xdg-"));
  const xdg = join(root, "xdg-cache");
  const env = { XDG_CACHE_HOME: xdg };

  try {
    const result = ensureAndroidCacheDir({
      platform: "android",
      env,
      homedirFn: () => root,
    });
    assert.equal(result.cacheDir, xdg);
    assert.equal(existsSync(xdg), true);
    assert.equal(env.XDG_CACHE_HOME, xdg);
  } finally {
    rmSync(root, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  }
});

test("ensureAndroidCacheDir: Termux-on-linux still prepares ~/.cache", () => {
  const home = mkdtempSync(join(tmpdir(), "omniroute-android-cache-termux-"));
  const env = { TERMUX_VERSION: "0.119" };

  try {
    const result = ensureAndroidCacheDir({
      platform: "linux",
      env,
      homedirFn: () => home,
    });
    assert.equal(result.prepared, true);
    assert.equal(existsSync(join(home, ".cache")), true);
  } finally {
    rmSync(home, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  }
});

test("isFatalInstrumentationHookFailure: matches Next.js android + hook errors", () => {
  assert.equal(isFatalInstrumentationHookFailure("Unsupported platform: android"), true);
  assert.equal(
    isFatalInstrumentationHookFailure(
      "Error: An error occurred while loading instrumentation hook: Unsupported platform: android"
    ),
    true
  );
  assert.equal(isFatalInstrumentationHookFailure("Ready in 1200ms"), false);
  assert.equal(isFatalInstrumentationHookFailure(""), false);
});

test("isFatalInstrumentationHookFailure: BUG #10028 — generic non-Android instrumentation failure is not Android/Termux", () => {
  // Next.js wraps ANY throw inside instrumentation.register() with the generic
  // "An error occurred while loading instrumentation hook:" prefix, on every
  // platform. Without an actual Android/"Unsupported platform:" signal, that
  // generic wrapper must NOT be diagnosed as the Android/Termux cache-dir bug,
  // or a plain win32/desktop failure gets a useless `mkdir -p ~/.cache` hint
  // and the real cause is hidden.
  const genericWindowsFailure =
    "Error: An error occurred while loading instrumentation hook: " +
    "Cannot find module 'C:\\Users\\dev\\.omniroute\\config.json'";
  assert.equal(isFatalInstrumentationHookFailure(genericWindowsFailure), false);
});

test("formatAndroidInstrumentationFailureHint: names the cache dir and TERMUX_GUIDE", () => {
  const hint = formatAndroidInstrumentationFailureHint("/data/home/.cache");
  assert.match(hint, /\/data\/home\/\.cache/);
  assert.match(hint, /mkdir -p ~\/\.cache/);
  assert.match(hint, /TERMUX_GUIDE/);
  assert.match(hint, /do NOT patch dist\/server\.js/i);
});

test("CLI entrypoint calls ensureAndroidCacheDir before Commander/Next load", () => {
  const src = readFileSync(join(ROOT, "bin/omniroute.mjs"), "utf8");
  assert.match(src, /ensureAndroidCacheDir\(\)/);
  // Real import is join(ROOT, "bin", "cli", "program.mjs") — not a contiguous path.
  // Header comments also mention program.mjs; compare call site vs last occurrence.
  const callIdx = src.indexOf("ensureAndroidCacheDir();");
  const programImportIdx = src.lastIndexOf("program.mjs");
  assert.ok(callIdx > 0, "omniroute.mjs must call ensureAndroidCacheDir()");
  assert.ok(programImportIdx > 0, "omniroute.mjs must still load program.mjs");
  assert.ok(
    callIdx < programImportIdx,
    "ensureAndroidCacheDir() must run before program.mjs is imported"
  );
});

test("serve command prepares Android cache before spawning the Next.js server", () => {
  const src = readFileSync(join(ROOT, "bin/cli/commands/serve.mjs"), "utf8");
  assert.match(src, /ensureAndroidCacheDir/);
  assert.match(src, /maybeReportInstrumentationHookFailure|isFatalInstrumentationHookFailure/);
  assert.match(src, /formatAndroidInstrumentationFailureHint/);
});

test("TERMUX_GUIDE documents Unsupported platform: android", () => {
  const guide = readFileSync(join(ROOT, "docs/guides/TERMUX_GUIDE.md"), "utf8");
  assert.match(guide, /Unsupported platform:\s*android/);
  assert.match(guide, /mkdir -p ~\/\.cache/);
  assert.match(guide, /Do not[\s\S]*dist\/server\.js/i);
});

test("maybeReportInstrumentationHookFailure prints once then no-ops", async () => {
  const serve = await import("../../bin/cli/commands/serve.mjs");
  serve.resetInstrumentationFailureHintForTests();
  const chunks = [];
  const originalWrite = process.stderr.write;
  process.stderr.write = ((chunk, ..._rest) => {
    chunks.push(String(chunk));
    return true;
  }) as typeof process.stderr.write;
  try {
    assert.equal(
      serve.maybeReportInstrumentationHookFailure(
        "Error: An error occurred while loading instrumentation hook: Unsupported platform: android"
      ),
      true
    );
    assert.equal(
      serve.maybeReportInstrumentationHookFailure("Unsupported platform: android"),
      false
    );
    assert.match(chunks.join(""), /mkdir -p ~\/\.cache/);
  } finally {
    process.stderr.write = originalWrite;
    serve.resetInstrumentationFailureHintForTests();
  }
});
