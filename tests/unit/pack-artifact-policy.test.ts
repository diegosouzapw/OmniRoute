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
} from "../../scripts/build/pack-artifact-policy.ts";

test("normalizeArtifactPath normalizes slashes and leading relative markers", () => {
  assert.equal(
    normalizeArtifactPath("./app\\scripts\\ad-hoc\\test.js"),
    "app/scripts/ad-hoc/test.js"
  );
});

test("findUnexpectedArtifactPaths flags staged app files outside the allowlist", () => {
  const unexpectedPaths = findUnexpectedArtifactPaths(
    [
      "open-sse/services/compression/engines/rtk/filters/generic-output.json",
      "open-sse/services/compression/rules/en/filler.json",
      "package-lock.json",
      "scripts/dev/sync-env.mjs",
      "server.js",
    ],
    {
      exactPaths: APP_STAGING_ALLOWED_EXACT_PATHS,
      prefixPaths: APP_STAGING_ALLOWED_PATH_PREFIXES,
    }
  );

  assert.deepEqual(unexpectedPaths, ["package-lock.json"]);
});

test("findUnexpectedArtifactPaths flags app pack files outside the allowlist", () => {
  const unexpectedPaths = findUnexpectedArtifactPaths(
    [
      "app/open-sse/services/compression/engines/rtk/filters/generic-output.json",
      "app/open-sse/services/compression/rules/en/filler.json",
      "app/server.js",
      "app/scripts/dev/sync-env.mjs",
      "app/scripts/build/prepublish.mjs",
      "docs/extra.md",
    ],
    {
      exactPaths: PACK_ARTIFACT_ALLOWED_EXACT_PATHS,
      prefixPaths: PACK_ARTIFACT_ALLOWED_PATH_PREFIXES,
    }
  );

  assert.deepEqual(unexpectedPaths, ["app/scripts/build/prepublish.mjs", "docs/extra.md"]);
});

test("findMissingArtifactPaths flags missing root runtime files in the tarball", () => {
  const missingPaths = findMissingArtifactPaths(
    [
      "app/server.js",
      "bin/omniroute.mjs",
      "package.json",
      "scripts/build/postinstall.mjs",
      "scripts/build/postinstallSupport.mjs",
    ],
    PACK_ARTIFACT_REQUIRED_PATHS
  );

  assert.deepEqual(missingPaths, [
    "app/open-sse/services/compression/engines/rtk/filters/generic-output.json",
    "app/open-sse/services/compression/rules/en/filler.json",
    "app/responses-ws-proxy.mjs",
    "app/server-ws.mjs",
    "bin/cli-commands.mjs",
    "bin/cli/index.mjs",
    "bin/mcp-server.mjs",
    "bin/nodeRuntimeSupport.mjs",
    "scripts/build/native-binary-compat.mjs",
    "src/shared/utils/nodeRuntimeSupport.ts",
  ]);
});
