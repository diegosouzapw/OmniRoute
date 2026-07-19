import { describe, it, before, after } from "node:test";
import assert from "node:assert";
import * as toolDetector from "../../../src/lib/cli-helper/tool-detector.ts";

// #7279 (re-drift of #968) — detectBinary() in tool-detector.ts never checked
// process.platform and never passed shell:true, so on native Windows an
// installed CLI (npm installs claude/codex/opencode as .cmd shims) was reported
// as NOT installed:
//   1. execFileImpl(binary, ["--version"]) fails without shell:true for .cmd shims
//      (Node's CVE-2024-27980 hardening).
//   2. the `which` fallback doesn't exist on native Windows (no WSL/git-bash).
// Both throw, both are swallowed by empty catches, detectBinary returns
// { installed: false }. cliRuntime.ts::locateCommand already solved this for
// the runtime-spawn path (#968); this fix reuses it here.
//
// Methodological note (see plan-file): the `which` fallback previously called
// the RAW execFileAsync, not the injected __setExecFileImpl hook, so it wasn't
// mockable and could silently "pass" using the real system `which`. Uses
// `hermes` (confirmed absent from PATH) to avoid that trap; also uses a
// dedicated __setLocateCommandImpl hook (mirrors __setExecFileImpl) so the
// win32 existence probe is deterministic here instead of depending on a real
// `where.exe`.

describe("tool-detector — win32 (#7279)", () => {
  const originalPlatformDescriptor = Object.getOwnPropertyDescriptor(process, "platform");

  function setPlatform(value: string) {
    Object.defineProperty(process, "platform", { configurable: true, value });
  }

  before(() => {
    setPlatform("win32");

    toolDetector.__setLocateCommandImpl(async (command: string) => {
      if (command === "hermes") {
        return {
          installed: true,
          commandPath: "C:\\Users\\dev\\AppData\\Roaming\\npm\\hermes.cmd",
          reason: null,
        };
      }
      return { installed: false, commandPath: null, reason: "not_found" };
    });

    // @ts-expect-error - internal test hook
    toolDetector.__setExecFileImpl(async (_cmd: string, _args: string[], opts?: { shell?: boolean }) => {
      // Reproduces the real-world failure: without shell:true, spawning the
      // .cmd shim throws (Node's CVE-2024-27980 hardening on Windows).
      if (opts?.shell === true) {
        return { stdout: "v0.75.3\n" };
      }
      throw new Error("spawn hermes.cmd ENOENT (shell:true required on win32 for .cmd shims)");
    });
  });

  after(() => {
    // This is the only test file exercising these hooks — node:test isolates
    // each file's module cache, so no further reset is needed for other suites.
    if (originalPlatformDescriptor) {
      Object.defineProperty(process, "platform", originalPlatformDescriptor);
    }
  });

  it("reports an installed CLI as installed on native Windows (.cmd shim probed with shell:true)", async () => {
    const result = await toolDetector.detectTool("hermes");
    assert.ok(result !== null);
    assert.strictEqual(
      result!.installed,
      true,
      "expected hermes to be detected as installed via locateCommand + shell:true probe on win32"
    );
    assert.strictEqual(result!.version, "0.75.3");
  });

  it("reports a genuinely absent CLI as not installed on native Windows", async () => {
    const result = await toolDetector.detectTool("openclaw");
    assert.ok(result !== null);
    assert.strictEqual(result!.installed, false);
  });
});
