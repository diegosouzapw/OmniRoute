/**
 * Regression: runElevatedPowerShell() must no longer use -EncodedCommand and
 * must write the elevated payload to a per-call temp .ps1 file referenced via
 * -File. See docs/security/SOCKET_DEV_FINDINGS.md §1.
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import os from "node:os";
import fs from "node:fs";
import path from "node:path";
import {
  buildElevatedScriptWrapper,
  _runElevatedPowerShellForTest,
} from "../../../src/mitm/systemCommands.ts";

test("buildElevatedScriptWrapper does not contain -EncodedCommand fingerprint", () => {
  const wrapper = buildElevatedScriptWrapper("C:\\Temp\\omniroute-elevate-x.ps1");
  assert.ok(
    !wrapper.includes("-EncodedCommand"),
    "wrapper must not contain -EncodedCommand (Socket.dev textbook fingerprint)"
  );
  assert.ok(wrapper.includes("-File"), "wrapper must reference the payload via -File");
  assert.ok(wrapper.includes("Start-Process"), "wrapper must use Start-Process -Verb RunAs");
  assert.ok(wrapper.includes("-Verb RunAs"), "wrapper must request elevation via -Verb RunAs");
});

test("buildElevatedScriptWrapper quotes the script path safely (no shell injection)", () => {
  const wrapper = buildElevatedScriptWrapper("C:\\Temp\\path with spaces'and-quote.ps1");
  // PowerShell single-quote escaping doubles the quote — our quotePowerShell
  // helper does that. Confirm both the original and the escaped form are present.
  assert.ok(
    wrapper.includes("'C:\\Temp\\path with spaces''and-quote.ps1'"),
    "single quotes in the path must be doubled per PowerShell escaping rules"
  );
});

test("_runElevatedPowerShellForTest writes payload to a temp .ps1 file and unlinks after", async () => {
  let capturedWrapper: string | null = null;
  let capturedTempPath: string | null = null;

  await _runElevatedPowerShellForTest(
    "Write-Output 'omniroute regression test'",
    async (wrapper, tempPath) => {
      capturedWrapper = wrapper;
      capturedTempPath = tempPath;
      assert.ok(fs.existsSync(tempPath), "temp file must exist while the runner is active");
      const content = fs.readFileSync(tempPath, "utf8");
      assert.match(content, /Write-Output 'omniroute regression test'/);
      return "ok";
    }
  );

  assert.ok(capturedWrapper, "wrapper must be captured");
  assert.ok(!capturedWrapper!.includes("-EncodedCommand"), "wrapper must not use -EncodedCommand");
  assert.ok(capturedTempPath, "temp path must be captured");
  assert.ok(
    capturedTempPath!.startsWith(path.resolve(os.tmpdir())) ||
      capturedTempPath!.startsWith(os.tmpdir()),
    "temp .ps1 must live inside os.tmpdir()"
  );
  assert.ok(
    !fs.existsSync(capturedTempPath!),
    "temp .ps1 file must be unlinked after the runner returns"
  );
});

test("_runElevatedPowerShellForTest unlinks the temp file even when the runner throws", async () => {
  let capturedTempPath: string | null = null;
  let threw = false;

  try {
    await _runElevatedPowerShellForTest("Write-Output 'denied'", async (_wrapper, tempPath) => {
      capturedTempPath = tempPath;
      throw new Error("simulated UAC denial");
    });
  } catch (err) {
    threw = true;
    assert.match((err as Error).message, /simulated UAC denial/);
  }

  assert.ok(threw, "the error must propagate to the caller");
  assert.ok(capturedTempPath, "temp path must still be captured");
  assert.ok(
    !fs.existsSync(capturedTempPath!),
    "temp .ps1 must be removed by the finally block even after a failed call"
  );
});
