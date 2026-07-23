import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

// #5542 — On Windows, npm is `npm.cmd`; Node ≥24 refuses to execFile a `.cmd`
// without a shell (nodejs/node#52554), so the in-app auto-update flow threw
// "spawn npm ENOENT" for the version lookup, dependency install, global install,
// and native rebuild. Those npm calls now go through buildNpmExecOptions (the
// same win32-shell helper the embedded-services installer uses, fix #5379).
const { buildNpmExecOptions, SERVICE_VERSION_PATTERN } = await import(
  "../../src/lib/services/installers/utils.ts"
);

test("#5542 npm exec options enable the shell on win32 (resolves npm.cmd → no ENOENT)", () => {
  const win = buildNpmExecOptions("win32", { cwd: "/x", timeoutMs: 1000 });
  assert.equal(win.shell, true, "win32 must enable the shell so npm.cmd resolves");
  assert.equal(win.timeout, 1000);
  assert.equal(win.cwd, "/x");

  const linux = buildNpmExecOptions("linux", { cwd: "/x", timeoutMs: 1000 });
  assert.notEqual(linux.shell, true, "non-win32 must not enable the shell");
});

test("#5542 the update version spec is validated before it is shell-joined (Hard Rule #13)", () => {
  assert.ok(SERVICE_VERSION_PATTERN.test("3.8.43"));
  assert.ok(SERVICE_VERSION_PATTERN.test("3.8.43-beta.1"));
  assert.ok(!SERVICE_VERSION_PATTERN.test("1.0.0; rm -rf /"));
  assert.ok(!SERVICE_VERSION_PATTERN.test("$(whoami)"));
  assert.ok(!SERVICE_VERSION_PATTERN.test("1.0 && curl evil"));
});

test("#5542 the auto-update npm call sites route through buildNpmExecOptions", () => {
  const routeSrc = fs.readFileSync(
    new URL("../../src/app/api/system/version/route.ts", import.meta.url),
    "utf8"
  );
  const checkSrc = fs.readFileSync(
    new URL("../../src/lib/system/versionCheck.ts", import.meta.url),
    "utf8"
  );
  assert.ok(routeSrc.includes("buildNpmExecOptions"), "version route must use the win32-shell helper");
  assert.ok(checkSrc.includes("buildNpmExecOptions"), "versionCheck must use the win32-shell helper");
  // The global install spec must be guarded before it reaches the shell.
  assert.ok(
    routeSrc.includes("SERVICE_VERSION_PATTERN.test(latest)"),
    "version route must validate the version spec before shell-joining it"
  );
  // Every npm invocation in the route must pass buildNpmExecOptions (not a bare
  // inline options object that would lack the win32 shell).
  const npmCalls = routeSrc.match(/execFileAsync\(\s*\n?\s*"npm",/g) || [];
  const npmViaHelper = routeSrc.match(/"npm",[\s\S]{0,120}?buildNpmExecOptions\(/g) || [];
  assert.equal(
    npmViaHelper.length,
    npmCalls.length,
    `all ${npmCalls.length} npm calls must route through buildNpmExecOptions`
  );
});
