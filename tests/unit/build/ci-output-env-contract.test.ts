import assert from "node:assert/strict";
import test from "node:test";
import { runEnvDocSync } from "../../../scripts/check/check-env-doc-sync.mjs";

test("Actions output file is platform context, not an application setting", () => {
  const result = runEnvDocSync({
    codeVars: new Set([
      "GITHUB_OUTPUT",
      "GITHUB_EVENT_NAME",
      "GITHUB_EVENT_PATH",
      "GITHUB_RUN_ATTEMPT",
      "GITHUB_RUN_ID",
      "GITHUB_SHA",
      "NEEDS_JSON",
      "OMNIROUTE_UNDOCUMENTED_EXAMPLE",
    ]),
    envExampleText: "",
    envDocText: "",
    docOnlyAllowlist: new Set(),
    envOnlyAllowlist: new Set(),
  });
  assert.equal(result.ok, false);
  assert.deepEqual(result.problems.codeMissingEnv, ["OMNIROUTE_UNDOCUMENTED_EXAMPLE"]);
});
