import test from "node:test";
import assert from "node:assert/strict";

import { runEnvDocSync } from "../../scripts/check/check-env-doc-sync.mjs";

// Repro for issue #7793 ("Release branch not green: release/v3.8.49").
test("issue #7793: real .env.example is in sync with process.env.* reads in code", () => {
  const result = runEnvDocSync();

  assert.deepEqual(
    result.problems.codeMissingEnv,
    [],
    `Vars read via process.env.X in code but missing from .env.example: ${JSON.stringify(result.problems.codeMissingEnv)}`
  );
  assert.deepEqual(
    result.problems.envMissingDoc,
    [],
    `Vars in .env.example but missing from ENVIRONMENT.md: ${JSON.stringify(result.problems.envMissingDoc)}`
  );
  assert.deepEqual(
    result.problems.docMissingEnv,
    [],
    `Vars in ENVIRONMENT.md but missing from .env.example: ${JSON.stringify(result.problems.docMissingEnv)}`
  );
  assert.equal(result.ok, true);
});
