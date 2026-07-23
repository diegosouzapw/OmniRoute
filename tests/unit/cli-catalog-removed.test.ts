/**
 * F1: cli-catalog-removed.test.ts
 * Assert that MITM-backlog entries are removed from CLI_TOOLS per plan 14 D17.
 */
import test from "node:test";
import assert from "node:assert/strict";

const { CLI_TOOLS } = await import("../../src/shared/constants/cliTools.ts");

test("CLI_TOOLS.windsurf is undefined (removed per D17 — MITM backlog plan 11)", () => {
  // windsurf (Codeium) was removed from CLI_TOOLS because it has no generic
  // custom base URL support. It remains as an OAuth provider in src/lib/oauth/.
  assert.equal(
    (CLI_TOOLS as Record<string, unknown>)["windsurf"],
    undefined,
    "windsurf must be removed from CLI_TOOLS"
  );
});

test("CLI_TOOLS.amp is undefined (removed per D17 — MITM backlog plan 11)", () => {
  // amp (Sourcegraph) was removed from CLI_TOOLS because it has a closed ecosystem.
  assert.equal(
    (CLI_TOOLS as Record<string, unknown>)["amp"],
    undefined,
    "amp must be removed from CLI_TOOLS"
  );
});

// amazon-q and cowork were NOT present in CLI_TOOLS before plan 14.
// They are documented here for completeness.
test("CLI_TOOLS['amazon-q'] is undefined (was never added — MITM backlog plan 11)", () => {
  assert.equal(
    (CLI_TOOLS as Record<string, unknown>)["amazon-q"],
    undefined,
    "amazon-q must not exist in CLI_TOOLS"
  );
});

test("CLI_TOOLS.cowork is undefined (was never added — MITM backlog plan 11)", () => {
  assert.equal(
    (CLI_TOOLS as Record<string, unknown>)["cowork"],
    undefined,
    "cowork must not exist in CLI_TOOLS"
  );
});
