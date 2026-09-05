/**
 * Structural regression guard for #11236 (Windows cliproxy residuals, bugs 2+3).
 *
 * Why this guard exists: the published npm artifact is bundled on Linux, and
 * the bundler constant-folds every literal `process.platform` read to the
 * BUILD machine's platform ("linux"), pruning the win32 branch from the
 * shipped artifact. Precedent: b43a212680 (#10244/#10293), which converted
 * detectPlatform/detectArch to runtime `os.platform()`/`os.arch()` reads for
 * exactly this reason. #10371 later fixed the Windows `.exe` binary name in
 * the source but left literal `process.platform` reads behind in the same
 * runtime paths, so the shipped artifact still:
 *   - named the managed binary `cliproxyapi` (no `.exe`) at install time
 *     (binaryManager.managedBinaryName), and
 *   - spawned that extension-less path at start time
 *     (installers/cliproxy.resolveSpawnArgs) -> ENOENT on Windows even with a
 *     valid `.exe` in place (issue #11236 bugs 2 and 3).
 *
 * The runtime-safe pattern is a call-time `os.platform()` read. This guard
 * fails if `process.platform` reappears outside a comment in any file whose
 * platform branch feeds the published artifact's runtime behavior (binary
 * name, spawn path, per-OS probe selection).
 */

import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..", "..");

const GUARDED_FILES = [
  "src/lib/versionManager/binaryManager.ts",
  "src/lib/versionManager/processManager.ts",
  "src/lib/services/installers/cliproxy.ts",
  "src/lib/services/portProbe.ts",
];

interface Offender {
  line: number;
  text: string;
}

/**
 * Returns the source with every `//` and `/* ... *\/` comment blanked out
 * (replaced by spaces, newlines preserved so line numbers are stable). String
 * literals are kept verbatim — a `process.platform` inside one is still
 * flagged, which is acceptable: none of the guarded files carry the pattern
 * in a string, and a false positive there is safer than a false negative in
 * code.
 */
function stripComments(source: string): string {
  let out = "";
  let i = 0;
  let inBlock = false;
  let inLine = false;
  let inString: string | null = null;
  while (i < source.length) {
    const ch = source[i];
    const next = source[i + 1];
    if (inLine) {
      if (ch === "\n") {
        inLine = false;
        out += ch;
      } else {
        out += " ";
      }
      i++;
      continue;
    }
    if (inBlock) {
      if (ch === "*" && next === "/") {
        inBlock = false;
        out += "  ";
        i += 2;
        continue;
      }
      out += ch === "\n" ? "\n" : " ";
      i++;
      continue;
    }
    if (inString) {
      out += ch;
      if (ch === "\\") {
        out += next ?? "";
        i += 2;
        continue;
      }
      if (ch === inString) inString = null;
      i++;
      continue;
    }
    if (ch === "/" && next === "/") {
      inLine = true;
      out += "  ";
      i += 2;
      continue;
    }
    if (ch === "/" && next === "*") {
      inBlock = true;
      out += "  ";
      i += 2;
      continue;
    }
    if (ch === '"' || ch === "'" || ch === "`") inString = ch;
    out += ch;
    i++;
  }
  return out;
}

/**
 * Every remaining `process.platform` occurrence after comment stripping is an
 * offender — the fold-explanation comments reference the pattern by name and
 * must remain free to do so.
 */
function findFoldableReads(source: string): Offender[] {
  const stripped = stripComments(source);
  const offenders: Offender[] = [];
  stripped.split("\n").forEach((line, index) => {
    if (line.includes("process.platform")) {
      offenders.push({ line: index + 1, text: source.split("\n")[index].trim() });
    }
  });
  return offenders;
}

for (const relPath of GUARDED_FILES) {
  test(`${relPath} has no build-foldable process.platform reads (#11236)`, () => {
    const source = fs.readFileSync(path.join(REPO_ROOT, relPath), "utf8");
    const offenders = findFoldableReads(source);
    assert.deepEqual(
      offenders,
      [],
      `${relPath} must read os.platform() at call time instead of the ` +
        `build-foldable process.platform literal (Turbopack folds it to the ` +
        `Linux build machine — b43a212680 / #10244 / #10371). Offenders: ` +
        offenders.map((o) => `L${o.line}: ${o.text}`).join("; ")
    );
  });
}

// Guard-the-guard (mutation check on synthetic input, so the real sources
// never need to be touched): a code occurrence MUST be caught, comment-only
// occurrences MUST be let through.
test("findFoldableReads catches a code occurrence (mutation self-check)", () => {
  const snippet = [
    'const name = process.platform === "win32" ? "a.exe" : "a";',
    "// process.platform in a line comment is allowed",
    "/**",
    " * process.platform in a block comment is allowed",
    " */",
    "/* process.platform single-line block is allowed */",
    "const ok = os.platform();",
  ].join("\n");
  const offenders = findFoldableReads(snippet);
  assert.equal(offenders.length, 1);
  assert.equal(offenders[0].line, 1);
});

test("findFoldableReads reports nothing when only comments mention the pattern", () => {
  const snippet = [
    "// process.platform",
    "/* process.platform */",
    "const p = os.platform();",
  ].join("\n");
  assert.deepEqual(findFoldableReads(snippet), []);
});
