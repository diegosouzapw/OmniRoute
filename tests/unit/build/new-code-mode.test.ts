import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

import {
  baseRefArg,
  deadSymbolKeys,
  diffNewCode,
  filterScope,
  newDeadSymbols,
  perFileRuleCounts,
} from "../../../scripts/check/newCodeMode.mjs";

test("baseRefArg reads --base-ref <sha> and ignores a dangling flag", () => {
  assert.equal(baseRefArg(["node", "x", "--base-ref", "abc123"]), "abc123");
  assert.equal(baseRefArg(["node", "x", "--base-ref"]), null);
  assert.equal(baseRefArg(["node", "x"]), null);
});

test("filterScope keeps only in-scope dirs/extensions, sorted and trimmed", () => {
  const files = filterScope(
    [
      " src/a.ts",
      "open-sse/b.tsx",
      "tests/unit/c.test.ts",
      "src/d.md",
      "srcx/e.ts",
      "",
      "bin/f.mjs",
    ],
    { dirs: ["src", "open-sse", "bin"], exts: [".ts", ".tsx", ".mjs"] }
  );
  assert.deepEqual(files, ["bin/f.mjs", "open-sse/b.tsx", "src/a.ts"]);
});

test("filterScope can exclude first-party vendored source from authorship ratchets", () => {
  const files = filterScope(
    [
      "open-sse/executors/chatgpt-web-codex.ts",
      "open-sse/vendor/codex-chatgpt-web/bridge.ts",
      "open-sse/vendor/other-package/index.ts",
    ],
    {
      dirs: ["open-sse"],
      exts: [".ts"],
      excludePrefixes: ["open-sse/vendor/"],
    }
  );

  assert.deepEqual(files, ["open-sse/executors/chatgpt-web-codex.ts"]);
});

test("perFileRuleCounts counts only the requested rules and relativizes absolute paths", () => {
  const report = [
    {
      filePath: "/repo/src/a.ts",
      messages: [
        { ruleId: "complexity" },
        { ruleId: "max-lines-per-function" },
        { ruleId: "no-unused-vars" },
      ],
    },
    { filePath: "/repo/src/b.ts", messages: [{ ruleId: "sonarjs/cognitive-complexity" }] },
    { filePath: "src/c.ts", messages: [] },
  ];
  const cyc = perFileRuleCounts(report, new Set(["complexity", "max-lines-per-function"]), "/repo");
  assert.equal(cyc.get("src/a.ts"), 2);
  assert.equal(cyc.get("src/b.ts"), 0);
  assert.equal(cyc.get("src/c.ts"), 0);
  const cog = perFileRuleCounts(report, new Set(["sonarjs/cognitive-complexity"]), "/repo");
  assert.equal(cog.get("src/b.ts"), 1);
});

test("diffNewCode flags only changed files that grew; new files count from zero", () => {
  const head = new Map([
    ["src/a.ts", 3],
    ["src/new.ts", 1],
    ["src/untouched.ts", 9],
  ]);
  const base = new Map([
    ["src/a.ts", 3],
    ["src/untouched.ts", 2],
  ]);
  const r = diffNewCode(head, base, ["src/a.ts", "src/new.ts"]);
  assert.deepEqual(r.regressions, [{ file: "src/new.ts", base: 0, head: 1 }]);
  assert.equal(r.head, 4);
  assert.equal(r.base, 3);
  assert.equal(r.delta, 1);
  // a file that got better is not a regression
  const better = diffNewCode(new Map([["src/a.ts", 1]]), new Map([["src/a.ts", 3]]), ["src/a.ts"]);
  assert.deepEqual(better.regressions, []);
  assert.equal(better.delta, -2);
});

test("deadSymbolKeys covers exports, types, namespace members and unused files", () => {
  const keys = deadSymbolKeys({
    issues: [
      {
        file: "src/a.ts",
        exports: [{ name: "foo" }],
        types: [{ name: "Bar" }],
        nsExports: [{ name: "ns" }],
      },
      { file: "src/dead.ts", files: ["src/dead.ts"] },
    ],
  });
  assert.deepEqual([...keys].sort(), [
    "src/a.ts:Bar",
    "src/a.ts:foo",
    "src/a.ts:ns",
    "src/dead.ts:<file>",
  ]);
  assert.equal(deadSymbolKeys(null).size, 0);
});

test("newDeadSymbols reports only symbols that are new on HEAD, in touched files by default", () => {
  const base = { issues: [{ file: "src/a.ts", exports: [{ name: "old" }] }] };
  const head = {
    issues: [
      { file: "src/a.ts", exports: [{ name: "old" }, { name: "fresh" }] },
      { file: "src/other.ts", exports: [{ name: "orphaned" }] },
    ],
  };
  assert.deepEqual(newDeadSymbols(head, base, ["src/a.ts"]), ["src/a.ts:fresh"]);
  assert.deepEqual(newDeadSymbols(head, base, ["src/a.ts"], { includeUntouched: true }), [
    "src/a.ts:fresh",
    "src/other.ts:orphaned",
  ]);
  assert.deepEqual(newDeadSymbols(base, head, ["src/a.ts"]), []);
});

test("perFileRuleCounts normalizes symlinked cwd so canonical paths match (#14744)", () => {
  const realBase = fs.realpathSync(os.tmpdir());
  const realDir = fs.mkdtempSync(path.join(realBase, "omni-test-real-"));
  const symDir = path.join(realBase, `omni-test-symlink-${Date.now()}-${Math.random().toString(36).slice(2)}`);
  fs.symlinkSync(realDir, symDir, "dir");

  const report = [
    {
      filePath: path.join(realDir, "open-sse/executors/commandCode.ts"),
      messages: [{ ruleId: "complexity" }, { ruleId: "max-lines-per-function" }],
    },
    {
      filePath: "src/relative.ts",
      messages: [{ ruleId: "complexity" }],
    },
  ];

  try {
    const counts = perFileRuleCounts(report, new Set(["complexity", "max-lines-per-function"]), symDir);
    assert.equal(counts.size, 2);
    assert.equal(counts.get("open-sse/executors/commandCode.ts"), 2);
    assert.equal(counts.get("src/relative.ts"), 1);

    // Fallback when cwd does not exist on disk
    const fallbackCounts = perFileRuleCounts(
      [{ filePath: "/nonexistent/repo/src/a.ts", messages: [{ ruleId: "complexity" }] }],
      new Set(["complexity"]),
      "/nonexistent/repo"
    );
    assert.equal(fallbackCounts.get("src/a.ts"), 1);
  } finally {
    try {
      fs.unlinkSync(symDir);
    } catch {}
    try {
      fs.rmSync(realDir, { recursive: true, force: true });
    } catch {}
  }
});
