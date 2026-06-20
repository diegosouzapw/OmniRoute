// tests/unit/build/check-complexity.test.ts
// TDD test for check-complexity.mjs: the complexity ratchet must scan the SAME first-party
// scope documented in eslint.complexity.config.mjs `files` and in complexity-baseline.json
// (src + open-sse + electron + bin). Task 6A.11 re-baselined the count claiming bin/electron
// coverage, but ESLINT_ARGS only passed src+open-sse — a fake-green gap (a god-function added
// under bin/ would pass the gate unseen). This test locks the scan scope to the documented one.
import test from "node:test";
import assert from "node:assert/strict";
import { ESLINT_ARGS } from "../../../scripts/check/check-complexity.mjs";

test("check-complexity scans the full documented scope (src, open-sse, electron, bin)", () => {
  assert.ok(
    ESLINT_ARGS.includes("bin"),
    "ESLINT_ARGS must include 'bin' — a new god-function under bin/ must not pass the gate green",
  );
  assert.ok(
    ESLINT_ARGS.includes("electron"),
    "ESLINT_ARGS must include 'electron' to match eslint.complexity.config.mjs `files` and the baseline scope",
  );
  assert.ok(ESLINT_ARGS.includes("src"), "ESLINT_ARGS must include 'src'");
  assert.ok(ESLINT_ARGS.includes("open-sse"), "ESLINT_ARGS must include 'open-sse'");
});
