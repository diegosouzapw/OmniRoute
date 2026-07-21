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
      "dist/open-sse/services/compression/engines/rtk/filters/generic-output.json",
      "dist/open-sse/services/compression/rules/en/filler.json",
      "dist/server.js",
      "dist/scripts/dev/sync-env.mjs",
      "dist/scripts/build/prepublish.mjs",
      "docs/extra.md",
    ],
    {
      exactPaths: PACK_ARTIFACT_ALLOWED_EXACT_PATHS,
      prefixPaths: PACK_ARTIFACT_ALLOWED_PATH_PREFIXES,
    }
  );

  assert.deepEqual(unexpectedPaths, ["dist/scripts/build/prepublish.mjs", "docs/extra.md"]);
});

test("webdav-handler.mjs is allowed in staging dist/ (server-ws.mjs dependency, missed in 3.8.22 build)", () => {
  const unexpectedPaths = findUnexpectedArtifactPaths(["webdav-handler.mjs"], {
    exactPaths: APP_STAGING_ALLOWED_EXACT_PATHS,
    prefixPaths: APP_STAGING_ALLOWED_PATH_PREFIXES,
  });
  assert.deepEqual(unexpectedPaths, []);
});

test("tls-options.mjs is allowed in staging dist/ (server-ws.mjs dependency, missed in 3.8.41 build — #5452)", () => {
  const unexpectedPaths = findUnexpectedArtifactPaths(["tls-options.mjs"], {
    exactPaths: APP_STAGING_ALLOWED_EXACT_PATHS,
    prefixPaths: APP_STAGING_ALLOWED_PATH_PREFIXES,
  });
  assert.deepEqual(unexpectedPaths, []);
});

test("dist/tls-options.mjs is a required tarball path (regression guard for #5452)", () => {
  const missingPaths = findMissingArtifactPaths([], PACK_ARTIFACT_REQUIRED_PATHS);
  assert.ok(
    missingPaths.includes("dist/tls-options.mjs"),
    "dist/tls-options.mjs must be enforced by the pack-artifact gate"
  );
});

test("setupPolyfill.ts is allowed in the tarball (bin/omniroute.mjs imports it at startup)", () => {
  const unexpectedPaths = findUnexpectedArtifactPaths(["open-sse/utils/setupPolyfill.ts"], {
    exactPaths: PACK_ARTIFACT_ALLOWED_EXACT_PATHS,
    prefixPaths: PACK_ARTIFACT_ALLOWED_PATH_PREFIXES,
  });

  assert.deepEqual(unexpectedPaths, []);
});

test("findMissingArtifactPaths flags missing root runtime files in the tarball", () => {
  const missingPaths = findMissingArtifactPaths(
    [
      "dist/server.js",
      "bin/omniroute.mjs",
      "package.json",
      "scripts/build/postinstall.mjs",
      "scripts/build/postinstallSupport.mjs",
    ],
    PACK_ARTIFACT_REQUIRED_PATHS
  );

  // findMissingArtifactPaths returns the missing required paths sorted
  // alphabetically (bin/ < dist/ < scripts/ < src/), minus the paths present
  // above (dist/server.js, bin/omniroute.mjs, package.json, the postinstall scripts).
  assert.deepEqual(missingPaths, [
    "bin/aliasResolver.mjs",
    "bin/aliasResolverHook.mjs",
    "bin/cli/data-dir.mjs",
    "bin/cli/program.mjs",
    "bin/cli/utils/storageKeyProvision.mjs",
    "bin/cli/utils/versionFastPath.mjs",
    "bin/mcp-server.mjs",
    "bin/nodeRuntimeSupport.mjs",
    "dist/head-response-guard.cjs",
    "dist/http-method-guard.cjs",
    "dist/main-server-timeouts.mjs",
    "dist/open-sse/services/compression/engines/rtk/filters/generic-output.json",
    "dist/open-sse/services/compression/rules/en/filler.json",
    "dist/peer-stamp.mjs",
    "dist/responses-ws-proxy.mjs",
    "dist/server-ws.mjs",
    "dist/tls-options.mjs",
    "dist/webdav-handler.mjs",
    "scripts/build/colocateOptionals.mjs",
    "scripts/build/fixTlsClientNodeBinary.mjs",
    "scripts/build/native-binary-compat.mjs",
    "scripts/build/runtime-env.mjs",
    "src/shared/utils/nodeRuntimeSupport.ts",
  ]);
});
