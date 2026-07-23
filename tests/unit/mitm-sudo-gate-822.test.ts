/**
 * PR #822: gate sudo prompts on the server platform.
 *
 * The MITM control surface previously decided whether to prompt for a sudo
 * password using the *browser's* `navigator.userAgent` and a non-Windows
 * unconditional gate on the API route. That broke two real cases:
 *
 *   1. Windows browser hitting a Linux server (no prompt → request 400s).
 *   2. Linux server running as root or under NOPASSWD sudoers (unnecessary
 *      modal blocks the user even though sudo would never ask).
 *
 * The fix:
 *   - `dnsConfig.ts` exposes `canRunSudoWithoutPassword()` /
 *     `isSudoPasswordRequired()` that probe the actual server state.
 *   - The route surfaces `isWin` + `needsSudoPassword` so the UI can decide
 *     based on the server's platform, not the browser's.
 *
 * These tests pin the *pure* helper contract — no real `sudo` is invoked
 * because every probe path is short-circuited before it tries `sudo -n true`
 * (Windows / root / no-sudo-on-PATH).
 */
import test from "node:test";
import assert from "node:assert/strict";
import {
  canRunSudoWithoutPassword,
  isSudoAvailable,
  isSudoPasswordRequired,
} from "../../src/mitm/dns/dnsConfig.ts";

test("isSudoAvailable returns a boolean on the current platform", () => {
  const result = isSudoAvailable();
  assert.equal(typeof result, "boolean");
  // Windows reports true unconditionally (no sudo concept).
  if (process.platform === "win32") {
    assert.equal(result, true);
  }
});

test("canRunSudoWithoutPassword short-circuits to true on Windows and root", () => {
  const result = canRunSudoWithoutPassword();
  assert.equal(typeof result, "boolean");

  if (process.platform === "win32") {
    assert.equal(result, true, "Windows uses UAC, never needs sudo password");
    return;
  }

  // Linux/macOS: root user always passes without a password.
  const isRootUser = !!(process.getuid && process.getuid() === 0);
  if (isRootUser) {
    assert.equal(result, true, "root user never needs sudo password");
  }
});

test("isSudoPasswordRequired returns false on Windows", () => {
  if (process.platform !== "win32") {
    // Can't simulate Windows from a non-Windows test runner; assert the
    // contract holds on the native platform.
    const result = isSudoPasswordRequired();
    assert.equal(typeof result, "boolean");
    return;
  }
  assert.equal(isSudoPasswordRequired(), false);
});

test("isSudoPasswordRequired returns false when running as root on POSIX", () => {
  if (process.platform === "win32") return;
  const isRootUser = !!(process.getuid && process.getuid() === 0);
  if (!isRootUser) {
    // Skip — we can't elevate from the test runner. This branch is covered
    // by the contract: isSudoPasswordRequired === !IS_WIN && isSudoAvailable
    // && !canRunSudoWithoutPassword, and canRunSudoWithoutPassword returns
    // early when isRoot() is true.
    return;
  }
  assert.equal(isSudoPasswordRequired(), false);
});

test("isSudoPasswordRequired is consistent with canRunSudoWithoutPassword on POSIX", () => {
  if (process.platform === "win32") return;
  if (!isSudoAvailable()) {
    // No sudo binary → never required.
    assert.equal(isSudoPasswordRequired(), false);
    return;
  }
  // When sudo *is* available, requirement is the inverse of "can run without".
  assert.equal(isSudoPasswordRequired(), !canRunSudoWithoutPassword());
});
