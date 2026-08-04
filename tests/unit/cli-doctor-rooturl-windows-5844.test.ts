import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

// Regression test for #5844: on Windows, `bin/cli/commands/doctor.mjs` used to
// resolve its `rootDir` via `new URL(import.meta.url).pathname`, which keeps the
// leading drive-letter slash from a `file:///C:/...` URL (e.g. `/C:/Users/...`).
// Feeding that string into `path.resolve()` on win32 does NOT strip the leading
// slash the way `fileURLToPath` does, so the resolved rootDir ends up malformed
// (effectively doubling/mismatching the drive segment), breaking every doctor
// check that depends on rootDir (DB migrations, native binary probe, etc).
//
// `fileURLToPath` handles the platform-specific URL -> path conversion correctly
// (stripping the extra leading slash on win32), which is why the fix in PR #5845
// switched `doctor.mjs` to use it instead of `new URL(...).pathname`.
//
// fileURLToPath() throws when parsing a Windows-style file URL on a POSIX host,
// so we can't call it directly here to prove the "after" behavior cross-platform.
// Instead we assert two things that together lock the regression:
//   1. The OLD pattern (`new URL(u).pathname`) demonstrably produces the buggy
//      `/C:/...` prefix for a synthetic Windows file URL — proving why it was wrong.
//   2. The current source of doctor.mjs uses `fileURLToPath(import.meta.url)` and
//      does NOT use the old `new URL(import.meta.url).pathname` pattern anymore.

test("old `new URL(...).pathname` pattern produces the buggy /C: prefix on a Windows file URL", () => {
  const windowsFileUrl = "file:///C:/Users/x/node_modules/omniroute/bin/cli/commands/doctor.mjs";
  const buggyPathname = new URL(windowsFileUrl).pathname;

  // This is the defect: the pathname keeps the leading slash before the drive
  // letter, so `path.resolve(path.dirname(buggyPathname), ...)` on win32 would
  // treat `/C:/Users/...` as a POSIX-relative-looking segment instead of the
  // real Windows path `C:\Users\...`, producing a malformed rootDir.
  assert.equal(buggyPathname.startsWith("/C:"), true);
  assert.equal(buggyPathname, "/C:/Users/x/node_modules/omniroute/bin/cli/commands/doctor.mjs");
});

test("fileURLToPath does not keep the leading-slash drive-letter defect on the current platform", () => {
  // On any platform, fileURLToPath never yields a path starting with "/C:" for a
  // same-platform URL — it fully normalizes drive letters (win32) or leaves POSIX
  // paths untouched (posix), unlike the raw `.pathname` accessor used by the bug.
  const here = fileURLToPath(import.meta.url);
  assert.equal(here.startsWith("/C:"), false);
});

test("doctor.mjs source uses fileURLToPath(import.meta.url) and not the buggy new URL(...).pathname pattern", () => {
  const doctorSource = fs.readFileSync(
    path.resolve("bin/cli/commands/doctor.mjs"),
    "utf8"
  );

  assert.match(
    doctorSource,
    /fileURLToPath\(import\.meta\.url\)/,
    "doctor.mjs must resolve rootDir via fileURLToPath(import.meta.url)"
  );

  assert.doesNotMatch(
    doctorSource,
    /new URL\(import\.meta\.url\)\.pathname/,
    "doctor.mjs must not regress to the buggy new URL(import.meta.url).pathname pattern"
  );
});
