import test from "node:test";
import assert from "node:assert/strict";

import {
  APP_STAGING_ALLOWED_EXACT_PATHS,
  APP_STAGING_ALLOWED_PATH_PREFIXES,
  PACK_ARTIFACT_ALLOWED_EXACT_PATHS,
  PACK_ARTIFACT_ALLOWED_PATH_PREFIXES,
  PACK_ARTIFACT_REQUIRED_PATHS,
  findMissingArtifactPaths,
  findUnexpectedArtifactPaths,
  normalizeArtifactPath,
} from "../../scripts/pack-artifact-policy.ts";

test("normalizeArtifactPath normalizes slashes and leading relative markers", () => {
  assert.equal(
    normalizeArtifactPath("./app\\scripts\\scratch\\test.js"),
    "app/scripts/scratch/test.js"
  );
});

test("findUnexpectedArtifactPaths flags staged app files outside the allowlist", () => {
  const unexpectedPaths = findUnexpectedArtifactPaths(
    ["package-lock.json", "scripts/sync-env.mjs", "server.js"],
    {
      exactPaths: APP_STAGING_ALLOWED_EXACT_PATHS,
      prefixPaths: APP_STAGING_ALLOWED_PATH_PREFIXES,
    }
  );

  assert.deepEqual(unexpectedPaths, ["package-lock.json"]);
});

test("findUnexpectedArtifactPaths flags app pack files outside the allowlist", () => {
  const unexpectedPaths = findUnexpectedArtifactPaths(
    ["app/server.js", "app/scripts/sync-env.mjs", "app/scripts/prepublish.mjs", "docs/extra.md"],
    {
      exactPaths: PACK_ARTIFACT_ALLOWED_EXACT_PATHS,
      prefixPaths: PACK_ARTIFACT_ALLOWED_PATH_PREFIXES,
    }
  );

  assert.deepEqual(unexpectedPaths, ["app/scripts/prepublish.mjs", "docs/extra.md"]);
});

test("findMissingArtifactPaths flags missing root runtime files in the tarball", () => {
  const missingPaths = findMissingArtifactPaths(
    [
      "app/server.js",
      "bin/omniroute.ts",
      "package.json",
      "scripts/postinstall.mjs",
      "scripts/postinstallSupport.mjs",
    ],
    PACK_ARTIFACT_REQUIRED_PATHS
  );

  assert.deepEqual(missingPaths, [
    "bin/mcp-server.mjs",
    "scripts/native-binary-compat.mjs",
    "src/shared/utils/nodeRuntimeSupport.ts",
  ]);
});
