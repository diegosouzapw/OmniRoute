import test from "node:test";
import assert from "node:assert/strict";

import {
  REQUIRED_PACKAGE_FILES_TEST_NEGATIONS,
  findLeakedTestArtifactPaths,
  findMissingMcpClosurePaths,
  findMissingPackageFilesTestNegations,
  isCoveredByFiles,
} from "../../scripts/build/mcpPublishedFilesClosure.ts";

test("findLeakedTestArtifactPaths flags co-located test and __tests__ paths", () => {
  assert.deepEqual(
    findLeakedTestArtifactPaths([
      "open-sse/mcp-server/server.ts",
      "open-sse/mcp-server/__tests__/server.test.ts",
      "src/lib/combos/steps.ts",
      "src/lib/combos/steps.test.ts",
      "src/lib/foo.spec.tsx",
      "src/lib/foo.test.mjs",
    ]),
    [
      "open-sse/mcp-server/__tests__/server.test.ts",
      "src/lib/combos/steps.test.ts",
      "src/lib/foo.spec.tsx",
      "src/lib/foo.test.mjs",
    ]
  );
});

test("findLeakedTestArtifactPaths returns empty when no tests ship", () => {
  assert.deepEqual(
    findLeakedTestArtifactPaths(["open-sse/mcp-server/server.ts", "src/lib/combos/steps.ts"]),
    []
  );
});

test("findMissingMcpClosurePaths reports closure members absent from the pack list", () => {
  assert.deepEqual(
    findMissingMcpClosurePaths(
      ["open-sse/mcp-server/server.ts", "src/lib/combos/other.ts"],
      ["open-sse/mcp-server/server.ts", "src/lib/combos/steps.ts", "src/lib/combos/other.ts"]
    ),
    ["src/lib/combos/steps.ts"]
  );
});

test("findMissingMcpClosurePaths is empty when the full closure is packed", () => {
  const closure = ["open-sse/mcp-server/server.ts", "src/lib/combos/steps.ts"];
  assert.deepEqual(findMissingMcpClosurePaths(closure, closure), []);
});

test("isCoveredByFiles honours directory and exact package.json files entries", () => {
  assert.equal(isCoveredByFiles("src/lib/combos/steps.ts", ["src/lib/"]), true);
  assert.equal(isCoveredByFiles("src/lib/combos/steps.ts", ["src/lib/combos/steps.ts"]), true);
  assert.equal(isCoveredByFiles("src/domain/foo.ts", ["src/lib/"]), false);
  // Negations must not count as positive coverage.
  assert.equal(isCoveredByFiles("src/lib/combos/steps.ts", ["!**/*.test.ts"]), false);
});

test("findMissingPackageFilesTestNegations flags deleted negations", () => {
  assert.deepEqual(
    findMissingPackageFilesTestNegations([...REQUIRED_PACKAGE_FILES_TEST_NEGATIONS]),
    []
  );
  assert.deepEqual(
    findMissingPackageFilesTestNegations(["bin/", "open-sse/", "!**/*.test.ts"]),
    REQUIRED_PACKAGE_FILES_TEST_NEGATIONS.filter((e) => e !== "!**/*.test.ts")
  );
});
