import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

import {
  detectCommandOutput,
  detectCommandType,
} from "../../../open-sse/services/compression/index.ts";

const FIXTURES = path.join(path.dirname(fileURLToPath(import.meta.url)), "fixtures", "rtk");

function fixture(name: string): string {
  return readFileSync(path.join(FIXTURES, name), "utf8");
}

describe("RTK command detector", () => {
  it("detects planned command output classes", () => {
    assert.equal(
      detectCommandType(fixture("git-status-sample.txt"), "git status").type,
      "git-status"
    );
    assert.equal(detectCommandType(fixture("git-diff-sample.txt"), "git diff").type, "git-diff");
    assert.equal(detectCommandType("commit abcdef1\nAuthor: A", "git log").type, "git-log");
    assert.equal(
      detectCommandType(fixture("vitest-output-sample.txt"), "vitest").type,
      "test-vitest"
    );
    assert.equal(detectCommandType("FAIL test\nTests: 1 failed", "jest").type, "test-jest");
    assert.equal(detectCommandType("FAILED test_a.py::test_a", "pytest").type, "test-pytest");
    assert.equal(
      detectCommandType(fixture("typescript-errors-sample.txt"), "tsc --noEmit").type,
      "build-typescript"
    );
    assert.equal(
      detectCommandType(fixture("eslint-output-sample.txt"), "eslint .").type,
      "build-eslint"
    );
    assert.equal(
      detectCommandType("CONTAINER ID   IMAGE   COMMAND", "docker ps").type,
      "docker-ps"
    );
    assert.equal(detectCommandType(fixture("json-output-sample.txt")).type, "json-output");
    assert.equal(detectCommandType("Error: boom\n    at fn").type, "generic-error");
  });

  it("detects RTK parity command output classes", () => {
    const cases: Array<[string, string | null, string]> = [
      ["* feature/rtk\n  main", "git branch", "git-branch"],
      ["running 2 tests\ntest a ... FAILED\ntest result: FAILED", "cargo test", "test-cargo"],
      ["--- FAIL: TestA\nFAIL\t./pkg\t0.1s", "go test ./...", "test-go"],
      ["webpack 5.0.0 compiled with 1 error", "webpack", "build-webpack"],
      ["vite v5.0.0\n✓ built in 100ms", "vite build", "build-vite"],
      ["2026-05-02T00:00:00Z ERROR failed", "docker logs app", "docker-logs"],
      ["./src/a.ts\n./src/b.ts", "find . -name '*.ts'", "shell-find"],
      ["src/a.ts:1:match", "rg match", "shell-grep"],
      ["found 1 vulnerabilities\ncritical severity", "npm audit", "npm-audit"],
      ['Traceback (most recent call last):\n  File "a.py", line 1', null, "error-stacktrace"],
    ];

    for (const [text, command, expected] of cases) {
      const detection = detectCommandType(text, command);
      assert.equal(detection.type, expected);
      assert.ok(detection.matchedPatterns.length > 0);
      assert.ok(detection.confidence >= 0.25);
    }
  });

  it("returns unknown for generic text and exposes planned alias", () => {
    const detection = detectCommandOutput("ordinary prose without command output");

    assert.equal(detection.type, "unknown");
    assert.ok(detection.confidence > 0);
    assert.deepEqual(detection.matchedPatterns, []);
  });
});
