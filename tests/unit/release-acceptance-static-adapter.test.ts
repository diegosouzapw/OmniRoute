import test from "node:test";
import assert from "node:assert/strict";
import { adaptCompiler } from "../../scripts/quality/release-acceptance/staticAdapter.mjs";

test("empty diagnostics with nonempty digest and exit 0 is PASS", () => {
  const out = adaptCompiler({
    commandId: "tsc",
    inputDigest: "a".repeat(64),
    exitCode: 0,
    diagnostics: [],
  });
  assert.equal(out.status, "PASS");
});

test("empty digest plus empty diagnostics is INFRA_ERROR", () => {
  const out = adaptCompiler({
    commandId: "tsc",
    inputDigest: "",
    exitCode: 0,
    diagnostics: [],
  });
  assert.equal(out.status, "INFRA_ERROR");
});

test("exit 1 with diagnostics is FAIL", () => {
  const out = adaptCompiler({
    commandId: "tsc",
    inputDigest: "a".repeat(64),
    exitCode: 1,
    diagnostics: ["error TS2304"],
  });
  assert.equal(out.status, "FAIL");
});
