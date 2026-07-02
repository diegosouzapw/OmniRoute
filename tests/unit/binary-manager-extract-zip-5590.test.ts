import test from "node:test";
import assert from "node:assert/strict";

// #5590 — On Windows, `unzip` is not a system command (it only ships inside Git
// for Windows' usr/bin, which Node's spawn PATH doesn't see), so installing an
// embedded service (CLIProxyAPI) failed instantly with `spawn unzip ENOENT`.
// Extraction must use PowerShell's built-in Expand-Archive on win32.
const { buildExtractZipCommand } = await import("../../src/lib/versionManager/binaryManager.ts");

test("#5590 extractZip uses PowerShell Expand-Archive on Windows, not `unzip`", () => {
  const { command, args } = buildExtractZipCommand("win32", "C:\\tmp\\cli.zip", "C:\\tmp\\dest");
  assert.equal(command, "powershell");
  assert.notEqual(command, "unzip");
  assert.ok(args.includes("-NoProfile") && args.includes("-NonInteractive"));
  const script = args[args.length - 1];
  assert.match(
    script,
    /Expand-Archive -LiteralPath 'C:\\tmp\\cli\.zip' -DestinationPath 'C:\\tmp\\dest' -Force/
  );
});

test("#5590 extractZip keeps using `unzip` on non-Windows platforms", () => {
  for (const platform of ["linux", "darwin"] as NodeJS.Platform[]) {
    const { command, args } = buildExtractZipCommand(platform, "/tmp/cli.zip", "/tmp/dest");
    assert.equal(command, "unzip");
    assert.deepEqual(args, ["-o", "/tmp/cli.zip", "-d", "/tmp/dest"]);
  }
});

test("#5590 single quotes in a Windows path are escaped for the PowerShell -Command string", () => {
  const { args } = buildExtractZipCommand("win32", "C:\\o'brien\\cli.zip", "C:\\o'brien\\dest");
  const script = args[args.length - 1];
  // Each literal ' must be doubled ('') inside the single-quoted PowerShell string.
  assert.match(script, /'C:\\o''brien\\cli\.zip'/);
  assert.match(script, /'C:\\o''brien\\dest'/);
});
