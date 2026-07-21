/**
 * #7938 — privileged MITM steps (cert trust, DNS) must be skippable when no sudo password.
 */
import test from "node:test";
import assert from "node:assert/strict";
import {
  canRunPrivilegedMitmSteps,
  isMitmSudoPasswordRequired,
} from "../../src/mitm/sudoGate.ts";

test("canRunPrivilegedMitmSteps is false when isMitmSudoPasswordRequired is true", () => {
  assert.equal(canRunPrivilegedMitmSteps("secret"), !isMitmSudoPasswordRequired("secret"));
});

test("canRunPrivilegedMitmSteps is false for empty password on POSIX sudo-required hosts", () => {
  if (process.platform === "win32") return;
  const isRootUser = !!(process.getuid && process.getuid() === 0);
  if (isRootUser) return;
  if (!isMitmSudoPasswordRequired("")) return;
  assert.equal(canRunPrivilegedMitmSteps(""), false);
});
