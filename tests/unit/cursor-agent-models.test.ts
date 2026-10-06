import test, { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import {
  humanizeCursorModelId,
  parseCursorAgentModels,
  resolveCursorAgentBinary,
  runCursorAgent,
} from "../../src/lib/providerModels/cursorAgent";

test("parseCursorAgentModels returns every reported id including auto and composer-*", () => {
  const text =
    "Cannot use this model: --help. Available models: auto, composer-2, composer-2-fast, gpt-5.3-codex-low, claude-opus-4-7-thinking-high, kimi-k2.5";
  assert.deepEqual(parseCursorAgentModels(text), [
    "auto",
    "composer-2",
    "composer-2-fast",
    "gpt-5.3-codex-low",
    "claude-opus-4-7-thinking-high",
    "kimi-k2.5",
  ]);
});

test("parseCursorAgentModels deduplicates and trims", () => {
  assert.deepEqual(parseCursorAgentModels("Available models: a, a , b"), ["a", "b"]);
});

test("parseCursorAgentModels parses the multiline output from the models command", () => {
  const text = `Available models

auto - Auto (default)
gpt-5.3-codex - Codex 5.3
claude-opus-4-8-thinking-high-fast - Opus 4.8 1M Thinking Fast

Tip: use --model <id> to switch.`;
  assert.deepEqual(parseCursorAgentModels(text), [
    "auto",
    "gpt-5.3-codex",
    "claude-opus-4-8-thinking-high-fast",
  ]);
});

test("parseCursorAgentModels returns [] when the marker is missing", () => {
  assert.deepEqual(parseCursorAgentModels("nothing here"), []);
});

test("humanizeCursorModelId pretty-prints common patterns", () => {
  assert.equal(humanizeCursorModelId("auto"), "Auto (Server Picks)");
  assert.equal(humanizeCursorModelId("composer-2-fast"), "Composer 2 Fast");
  assert.equal(humanizeCursorModelId("gpt-5.3-codex-low"), "GPT 5.3 Codex Low");
  assert.equal(humanizeCursorModelId("gpt-5.5-extra-high-fast"), "GPT 5.5 Extra High Fast");
  // Collapses claude-opus-4-7-* version pattern into 4.7
  assert.equal(
    humanizeCursorModelId("claude-opus-4-7-thinking-high"),
    "Claude Opus 4.7 Thinking High"
  );
  assert.equal(
    humanizeCursorModelId("claude-opus-4-8-thinking-high-fast"),
    "Claude Opus 4.8 Thinking High Fast"
  );
  assert.equal(
    humanizeCursorModelId("claude-fable-5-thinking-xhigh"),
    "Claude Fable 5 Thinking XHigh"
  );
  assert.equal(humanizeCursorModelId("claude-sonnet-5-max"), "Claude Sonnet 5 Max");
  assert.equal(humanizeCursorModelId("kimi-k2.5"), "Kimi K2.5");
  assert.equal(humanizeCursorModelId("gemini-3.1-pro"), "Gemini 3.1 Pro");
  assert.equal(humanizeCursorModelId("claude-4-sonnet-thinking"), "Claude 4 Sonnet Thinking");
  // Grok 4.5 uses infix -fast- (unlike GPT's trailing -fast)
  assert.equal(humanizeCursorModelId("grok-4.5-medium"), "Grok 4.5 Medium");
  assert.equal(humanizeCursorModelId("grok-4.5-fast-medium"), "Grok 4.5 Fast Medium");
  assert.equal(humanizeCursorModelId("grok-4.5-xhigh"), "Grok 4.5 XHigh");
  assert.equal(humanizeCursorModelId("grok-4.5-fast-xhigh"), "Grok 4.5 Fast XHigh");
});

// --- Cursor renewal plan, Task 2 Step 1: resolveCursorAgentBinary()/runCursorAgent() ---
//
// resolveCursorAgentBinary() checks a fixed list of absolute candidate paths
// (one of which is HOME-relative: `~/.local/bin/cursor-agent`) before an
// optional PATH scan. It has no injectable candidate list, so the 4 other
// hardcoded absolute paths (/root/.local/bin, /usr/local/bin, /usr/bin,
// /opt/homebrew/bin) are outside test control. On a host that genuinely has
// cursor-agent installed at one of those paths (true on at least one dev
// machine, via Homebrew Cask `cursor-cli`), the "nothing found" branches
// cannot be made hermetic without either touching real system files (out of
// scope — that's someone's actual local install) or a DI seam in production
// code (out of this test-writer's scope). Those specific cases are guarded
// with a runtime-computed `skip` reason instead of being silently omitted.
function ambientFixedCursorAgentPath(): string | null {
  const candidates = [
    "/root/.local/bin/cursor-agent",
    "/usr/local/bin/cursor-agent",
    "/usr/bin/cursor-agent",
    "/opt/homebrew/bin/cursor-agent",
  ];
  return candidates.find((c) => fs.existsSync(c)) ?? null;
}

function writeFakeBinary(destPath: string, script: string): void {
  fs.mkdirSync(path.dirname(destPath), { recursive: true });
  fs.writeFileSync(destPath, script, { mode: 0o755 });
  fs.chmodSync(destPath, 0o755);
}

const NOOP_SCRIPT = "#!/usr/bin/env node\n";

describe("resolveCursorAgentBinary", () => {
  const ORIGINAL_HOME = process.env.HOME;
  const ORIGINAL_USERPROFILE = process.env.USERPROFILE;
  const ORIGINAL_PATH = process.env.PATH;
  let tmpHome: string;

  beforeEach(() => {
    tmpHome = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-resolve-cursor-agent-"));
    process.env.HOME = tmpHome;
    process.env.USERPROFILE = tmpHome;
  });

  afterEach(() => {
    process.env.HOME = ORIGINAL_HOME;
    if (ORIGINAL_USERPROFILE !== undefined) process.env.USERPROFILE = ORIGINAL_USERPROFILE;
    else delete process.env.USERPROFILE;
    process.env.PATH = ORIGINAL_PATH;
    fs.rmSync(tmpHome, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  });

  it("finds the HOME-relative fixed candidate (~/.local/bin/cursor-agent) with allowPathFallback:false", () => {
    const binary = path.join(tmpHome, ".local", "bin", "cursor-agent");
    writeFakeBinary(binary, NOOP_SCRIPT);
    assert.equal(resolveCursorAgentBinary({ allowPathFallback: false }), binary);
  });

  it("finds the HOME-relative fixed candidate with allowPathFallback:true (byte-identical default caller behavior)", () => {
    const binary = path.join(tmpHome, ".local", "bin", "cursor-agent");
    writeFakeBinary(binary, NOOP_SCRIPT);
    assert.equal(resolveCursorAgentBinary(), binary);
    assert.equal(resolveCursorAgentBinary({ allowPathFallback: true }), binary);
  });

  it("a fixed-path match wins over a PATH-only decoy, regardless of allowPathFallback", () => {
    const fixedBinary = path.join(tmpHome, ".local", "bin", "cursor-agent");
    writeFakeBinary(fixedBinary, NOOP_SCRIPT);

    const pathDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-decoy-path-"));
    const decoyBinary = path.join(pathDir, "cursor-agent");
    writeFakeBinary(decoyBinary, NOOP_SCRIPT);
    process.env.PATH = `${pathDir}${path.delimiter}${ORIGINAL_PATH ?? ""}`;

    try {
      assert.equal(resolveCursorAgentBinary({ allowPathFallback: false }), fixedBinary);
      assert.equal(resolveCursorAgentBinary({ allowPathFallback: true }), fixedBinary);
    } finally {
      fs.rmSync(pathDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
    }
  });

  it("allowPathFallback:true finds a PATH-only binary when no fixed candidate matches", () => {
    const ambient = ambientFixedCursorAgentPath();
    if (ambient) {
      // The HOME-relative candidate is clean (fresh tmp dir), but an ambient
      // real install at one of the OTHER 4 hardcoded absolute paths would be
      // found first regardless of PATH — not hermetically testable here.
      console.log(
        `SKIP: ambient cursor-agent install detected at ${ambient} (see file-level note above)`
      );
      return;
    }
    const pathDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-real-path-only-"));
    const pathOnlyBinary = path.join(pathDir, "cursor-agent");
    writeFakeBinary(pathOnlyBinary, NOOP_SCRIPT);
    process.env.PATH = `${pathDir}${path.delimiter}${ORIGINAL_PATH ?? ""}`;
    try {
      assert.equal(resolveCursorAgentBinary({ allowPathFallback: true }), pathOnlyBinary);
      assert.equal(resolveCursorAgentBinary(), pathOnlyBinary);
    } finally {
      fs.rmSync(pathDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
    }
  });

  const ambient = ambientFixedCursorAgentPath();

  it(
    "allowPathFallback:false returns null when only a PATH-resolvable binary exists (no fixed-path match)",
    {
      skip: ambient
        ? `ambient cursor-agent install detected at ${ambient} — resolveCursorAgentBinary has no ` +
          "DI seam for its other hardcoded absolute candidates, so this host can never observe a " +
          'true "nothing fixed matches" state; passes in a clean CI container without cursor-agent installed'
        : false,
    },
    () => {
      const pathDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-path-only-no-fallback-"));
      const pathOnlyBinary = path.join(pathDir, "cursor-agent");
      writeFakeBinary(pathOnlyBinary, NOOP_SCRIPT);
      process.env.PATH = `${pathDir}${path.delimiter}${ORIGINAL_PATH ?? ""}`;
      try {
        assert.equal(resolveCursorAgentBinary({ allowPathFallback: false }), null);
      } finally {
        fs.rmSync(pathDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
      }
    }
  );

  it(
    "returns null when nothing matches and allowPathFallback is false",
    {
      skip: ambient
        ? `ambient cursor-agent install detected at ${ambient} — see note above`
        : false,
    },
    () => {
      assert.equal(resolveCursorAgentBinary({ allowPathFallback: false }), null);
    }
  );

  it(
    "finds the real /opt/homebrew/bin/cursor-agent candidate on hosts that have it installed there, without a PATH scan",
    {
      skip:
        fs.existsSync("/opt/homebrew/bin/cursor-agent") &&
        !fs.existsSync("/root/.local/bin/cursor-agent") &&
        !fs.existsSync("/usr/local/bin/cursor-agent") &&
        !fs.existsSync("/usr/bin/cursor-agent")
          ? false
          : "no ambient /opt/homebrew/bin/cursor-agent (or an earlier fixed candidate shadows it) on this host",
    },
    () => {
      // Read-only, non-destructive: asserts against whatever is already
      // installed on this host (e.g. via `brew install --cask cursor-cli`) —
      // never creates/modifies anything at this real system path.
      process.env.PATH = "";
      assert.equal(
        resolveCursorAgentBinary({ allowPathFallback: false }),
        "/opt/homebrew/bin/cursor-agent"
      );
    }
  );
});

describe("runCursorAgent — sigkillFollowupMs (Task 2 Step 1/2 unattended hardening)", () => {
  let tmpDir: string;
  let binary: string;

  const HANG_IGNORE_SIGTERM_SCRIPT = `#!/usr/bin/env node
process.on("SIGTERM", () => {});
const selfExitMs = process.env.FAKE_BIN_SELF_EXIT_MS;
if (selfExitMs) {
  setTimeout(() => process.exit(0), Number(selfExitMs));
} else {
  setInterval(() => {}, 60000);
}
`;

  beforeEach(() => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-run-cursor-agent-"));
    binary = path.join(tmpDir, "fake-cursor-agent");
    writeFakeBinary(binary, HANG_IGNORE_SIGTERM_SCRIPT);
  });

  afterEach(() => {
    delete process.env.FAKE_BIN_SELF_EXIT_MS;
    fs.rmSync(tmpDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  });

  it("sends SIGKILL after the follow-up window when the process ignores SIGTERM", async () => {
    // A freshly spawned node process (via the #!/usr/bin/env node shebang) needs
    // real wall-clock time to start up and register its SIGTERM handler before
    // the handler can take effect — empirically, 150-200ms was flaky in this
    // sandboxed environment (SIGTERM won the race and killed the process before
    // the handler was installed). 600ms/200ms gives a comfortable margin.
    const start = Date.now();
    const result = await runCursorAgent(binary, [], 600, { sigkillFollowupMs: 200 });
    const elapsed = Date.now() - start;
    assert.equal(result.signal, "SIGKILL");
    assert.ok(
      elapsed >= 600,
      `SIGKILL cannot fire before the SIGTERM timeout (600ms), got ${elapsed}ms`
    );
    assert.ok(elapsed < 10_000, `expected the SIGKILL follow-up well under 10s, got ${elapsed}ms`);
  });

  it("does NOT force-kill when sigkillFollowupMs is omitted (byte-identical to the existing fetchCursorAgentModels caller)", async () => {
    process.env.FAKE_BIN_SELF_EXIT_MS = "1000";
    const start = Date.now();
    const result = await runCursorAgent(binary, [], 600);
    const elapsed = Date.now() - start;
    // No sigkillFollowupMs -> SIGTERM at 600ms is ignored, process exits on
    // its own at ~1000ms via process.exit(0) — proves no automatic SIGKILL
    // follow-up fired (that would have resolved near 600ms with signal
    // "SIGKILL" instead).
    assert.equal(result.signal, null);
    assert.equal(result.code, 0);
    assert.ok(
      elapsed >= 950,
      `expected the process to exit on its own near 1000ms, got ${elapsed}ms`
    );
  });
});
