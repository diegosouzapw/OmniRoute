/**
 * #7836 — Agent Bridge Repair must not spawn `sudo -S` with an empty password.
 * Pins the shared MITM sudo gate and the repair route's 400 rejection path.
 */
import test from "node:test";
import assert from "node:assert/strict";
import {
  isMitmSudoPasswordRequired,
  normalizeMitmSudoPasswordInput,
  resolveMitmSudoPassword,
} from "../../src/mitm/sudoGate.ts";
import { isSudoPasswordRequired } from "../../src/mitm/dns/dnsConfig.ts";

test("normalizeMitmSudoPasswordInput treats whitespace-only as empty", () => {
  assert.equal(normalizeMitmSudoPasswordInput("   "), "");
  assert.equal(normalizeMitmSudoPasswordInput(undefined), "");
  assert.equal(normalizeMitmSudoPasswordInput(" secret "), "secret");
});

test("resolveMitmSudoPassword prefers body over cache and ignores whitespace-only body", () => {
  assert.equal(resolveMitmSudoPassword("from-body", "cached"), "from-body");
  assert.equal(resolveMitmSudoPassword(undefined, "cached"), "cached");
  assert.equal(resolveMitmSudoPassword(undefined, null), "");
  assert.equal(resolveMitmSudoPassword("   ", "cached"), "cached");
  assert.equal(resolveMitmSudoPassword("   ", null), "");
});

test("isMitmSudoPasswordRequired returns false when a password is present", () => {
  assert.equal(isMitmSudoPasswordRequired("secret"), false);
});

test("isMitmSudoPasswordRequired treats whitespace-only as missing", () => {
  if (process.platform === "win32") return;
  const isRootUser = !!(process.getuid && process.getuid() === 0);
  if (isRootUser) return;
  if (!isSudoPasswordRequired()) return;
  assert.equal(isMitmSudoPasswordRequired("   "), true);
});

test("isMitmSudoPasswordRequired is false on Windows", () => {
  if (process.platform !== "win32") return;
  assert.equal(isMitmSudoPasswordRequired(""), false);
});

test("isMitmSudoPasswordRequired matches isSudoPasswordRequired when unprivileged on POSIX", () => {
  if (process.platform === "win32") return;
  const isRootUser = !!(process.getuid && process.getuid() === 0);
  if (isRootUser) {
    assert.equal(isMitmSudoPasswordRequired(""), false);
    return;
  }
  assert.equal(isMitmSudoPasswordRequired(""), isSudoPasswordRequired());
});

const repairRoute = await import(
  "../../src/app/api/tools/agent-bridge/repair/route.ts"
);

function makeRepairRequest(body: Record<string, unknown> = {}) {
  return new Request("http://127.0.0.1/api/tools/agent-bridge/repair", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
}

test("POST /repair returns 400 Missing sudoPassword when sudo is required and none supplied", async () => {
  if (process.platform === "win32") return;
  if (!isSudoPasswordRequired()) return;
  const isRootUser = !!(process.getuid && process.getuid() === 0);
  if (isRootUser) return;

  const res = await repairRoute.POST(makeRepairRequest({}));
  assert.equal(res.status, 400);
  const body = (await res.json()) as { error?: { message?: string } };
  assert.match(body.error?.message ?? "", /Missing sudoPassword/);
});

test("POST /repair returns 400 for whitespace-only sudoPassword without invoking repair", async () => {
  if (process.platform === "win32") return;
  if (!isSudoPasswordRequired()) return;
  const isRootUser = !!(process.getuid && process.getuid() === 0);
  if (isRootUser) return;

  const res = await repairRoute.POST(makeRepairRequest({ sudoPassword: "   " }));
  assert.equal(res.status, 400);
  const body = (await res.json()) as { error?: { message?: string } };
  assert.match(body.error?.message ?? "", /Missing sudoPassword/);
});

test("resolveMitmSudoPassword passes the sudo gate for a non-empty body password", () => {
  const resolved = resolveMitmSudoPassword("test-password", null);
  assert.equal(resolved, "test-password");
  assert.equal(isMitmSudoPasswordRequired(resolved), false);
});
