import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

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

test("findUnexpectedArtifactPaths flags node_modules even inside an allowed prefix", () => {
  // Regression guard: the allowlist grants the whole `@omniroute/opencode-provider/`
  // prefix, which used to authorize a nested node_modules inside it — 79 MB of
  // devDependencies (80% of the tarball) whenever the publish ran from a machine
  // that had installed inside that subpackage. package.json `files[]` excludes it
  // at the source; this asserts the gate FAILS instead of allowing a regression.
  const unexpectedPaths = findUnexpectedArtifactPaths(
    [
      "@omniroute/opencode-provider/node_modules/tsup/package.json",
      "@omniroute/opencode-provider/node_modules/esbuild/lib/main.js",
      "@omniroute/opencode-provider/dist/index.js",
      "@omniroute/opencode-provider/package.json",
    ],
    {
      exactPaths: [],
      prefixPaths: ["@omniroute/opencode-provider/"],
    }
  );

  assert.deepEqual(unexpectedPaths, [
    "@omniroute/opencode-provider/node_modules/esbuild/lib/main.js",
    "@omniroute/opencode-provider/node_modules/tsup/package.json",
  ]);
});

test("package.json files[] excludes nested node_modules from the published package", () => {
  // The gate above is defence-in-depth; this pins the actual fix. Without the
  // "!**/node_modules/**" negation the tarball was 99.4 MB unpacked (31.3 MB
  // packed) instead of 20.0 MB (5.3 MB).
  const files: string[] = JSON.parse(
    readFileSync(new URL("../../package.json", import.meta.url), "utf8")
  ).files;

  assert.ok(
    files.includes("!**/node_modules/**"),
    'package.json "files" must keep the "!**/node_modules/**" negation — without it, ' +
      "a nested install inside @omniroute/* ships ~79 MB of devDependencies."
  );
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
    "bin/cli/utils/ensureAndroidCacheDir.mjs",
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
