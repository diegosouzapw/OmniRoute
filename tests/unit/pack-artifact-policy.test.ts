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
  parseJsonArrayOutput,
  parseJsonValuesOutput,
} from "../../scripts/build/pack-artifact-policy.ts";

test("artifact path policy arrays contain no duplicate entries", () => {
  const policies = {
    APP_STAGING_ALLOWED_EXACT_PATHS,
    APP_STAGING_ALLOWED_PATH_PREFIXES,
    PACK_ARTIFACT_ALLOWED_EXACT_PATHS,
    PACK_ARTIFACT_ALLOWED_PATH_PREFIXES,
    PACK_ARTIFACT_REQUIRED_PATHS,
  };

  for (const [name, paths] of Object.entries(policies)) {
    const duplicates = [...new Set(paths.filter((entry, index) => paths.indexOf(entry) !== index))];
    assert.deepEqual(duplicates, [], `${name} contains duplicate paths: ${duplicates.join(", ")}`);
  }
});

test("normalizeArtifactPath normalizes slashes and leading relative markers", () => {
  assert.equal(
    normalizeArtifactPath("./app\\scripts\\ad-hoc\\test.js"),
    "app/scripts/ad-hoc/test.js"
  );
});

test("parseJsonArrayOutput extracts the first valid array from mixed command output", () => {
  const output = [
    "notice [not-json]",
    '[{"path":"src/[literal].ts","files":[["nested"]]}]',
    "notice [second-array]",
  ].join("\n");
  assert.deepEqual(parseJsonArrayOutput(output), [
    { path: "src/[literal].ts", files: [["nested"]] },
  ]);
});

test("parseJsonArrayOutput can skip valid arrays that are not the target payload", () => {
  const output = `[]
[{"filename":"omniroute.tgz","files":[{"path":"src/index.ts"}]}]`;
  assert.deepEqual(
    parseJsonArrayOutput(output, (candidate) =>
      candidate.some(
        (entry) =>
          typeof entry === "object" &&
          entry !== null &&
          Array.isArray((entry as { files?: unknown }).files)
      )
    ),
    [{ filename: "omniroute.tgz", files: [{ path: "src/index.ts" }] }]
  );
});

test("parseJsonValuesOutput extracts object reports as well as arrays", () => {
  assert.deepEqual(parseJsonValuesOutput('notice\n{"files":[{"path":"src/index.ts"}]}'), [
    { files: [{ path: "src/index.ts" }] },
  ]);
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

test("staging mode (neverAllowedSegments: []) keeps runtime node_modules under allowed prefixes (#11317)", () => {
  // #9985/#11300-class regression: the app-STAGING prune reused the npm-pack
  // never-allowed "node_modules" segment, deleting the standalone server's
  // runtime deps — Turbopack-hashed sql.js (sql-wasm.wasm!) and transformers
  // ort-wasm — so every packaged boot 500'd on all DB-backed routes while
  // /api/monitoring/health stayed green. Staging allowlist prefixes are the
  // runtime contract; the node_modules segment ban is a PUBLISH-tarball rule.
  const unexpectedPaths = findUnexpectedArtifactPaths(
    [
      ".build/next/node_modules/sql.js-59d66b30daa0a8d2/dist/sql-wasm.wasm",
      ".build/next/node_modules/@huggingface/transformers-31f28a0eb9b916d1/dist/transformers.js",
      ".build/next/node_modules/@huggingface/transformers-31f28a0eb9b916d1/node_modules/tsup/package.json",
      "node_modules/sql.js/dist/sql-wasm.wasm",
      "package-lock.json",
    ],
    {
      exactPaths: APP_STAGING_ALLOWED_EXACT_PATHS,
      prefixPaths: APP_STAGING_ALLOWED_PATH_PREFIXES,
      neverAllowedSegments: [],
    }
  );

  assert.deepEqual(unexpectedPaths, ["package-lock.json"]);
});

test("default pack mode still rejects node_modules under .build/next (tarball guard intact)", () => {
  const unexpectedPaths = findUnexpectedArtifactPaths(
    [".build/next/node_modules/sql.js-59d66b30daa0a8d2/dist/sql-wasm.wasm"],
    {
      exactPaths: PACK_ARTIFACT_ALLOWED_EXACT_PATHS,
      prefixPaths: PACK_ARTIFACT_ALLOWED_PATH_PREFIXES,
    }
  );

  assert.deepEqual(unexpectedPaths, [
    ".build/next/node_modules/sql.js-59d66b30daa0a8d2/dist/sql-wasm.wasm",
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

test("build-next-isolated sibling imports are allowed in the published package", () => {
  const buildDependencies = [
    "scripts/build/assembleStandalone.mjs",
    "scripts/build/backendOnlyPages.mjs",
    "scripts/build/build-tproxy-native.mjs",
  ];

  const unexpectedPaths = findUnexpectedArtifactPaths(buildDependencies, {
    exactPaths: PACK_ARTIFACT_ALLOWED_EXACT_PATHS,
    prefixPaths: PACK_ARTIFACT_ALLOWED_PATH_PREFIXES,
  });

  assert.deepEqual(unexpectedPaths, []);
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

test("call-log artifact worker is kept and required in packaged runtimes", () => {
  const workerPath = "src/lib/usage/callLogArtifactWorker.js";
  assert.ok(APP_STAGING_ALLOWED_EXACT_PATHS.includes(workerPath));
  assert.ok(PACK_ARTIFACT_REQUIRED_PATHS.includes(`dist/${workerPath}`));
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

test("config/i18n.json ships in the tarball: allowed, required, and in package.json files[]", () => {
  // Locale source of truth read at runtime by bin/cli/i18n.mjs (OMNIROUTE_LANG alias
  // resolution, e.g. uk → uk-UA / fil → phi) and bin/cli/commands/config.mjs
  // (`config lang list`). package.json "files" never shipped config/, so the published
  // CLI silently fell back to en for every alias — pin all three layers so the file can
  // never drop out of the tarball again.
  const configPath = "config/i18n.json";

  const unexpectedPaths = findUnexpectedArtifactPaths([configPath], {
    exactPaths: PACK_ARTIFACT_ALLOWED_EXACT_PATHS,
    prefixPaths: PACK_ARTIFACT_ALLOWED_PATH_PREFIXES,
  });
  assert.deepEqual(unexpectedPaths, [], `${configPath} must be allowed in the tarball`);

  assert.ok(
    PACK_ARTIFACT_REQUIRED_PATHS.includes(configPath),
    `${configPath} must be a required tarball path (check:pack-artifact regression guard)`
  );

  const files: string[] = JSON.parse(
    readFileSync(new URL("../../package.json", import.meta.url), "utf8")
  ).files;
  assert.ok(files.includes(configPath), `package.json "files" must list ${configPath}`);
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
    "bin/cli/utils/parseEnvValue.mjs",
    "bin/cli/utils/storageKeyProvision.mjs",
    "bin/cli/utils/versionFastPath.mjs",
    "bin/cli/utils/volatileEnvPath.mjs",
    "bin/mcp-server.mjs",
    "bin/mcpStdioConsoleGuard.mjs",
    "bin/nodeRuntimeSupport.mjs",
    "config/i18n.json",
    "config/release/wreq-js-native-manifest.json",
    "config/release/wreq-js-rust-license-inventory.json",
    "config/release/wreq-js-rust-notices.md",
    "dist/head-response-guard.cjs",
    "dist/http-method-guard.cjs",
    "dist/main-server-timeouts.mjs",
    "dist/open-sse/services/compression/engines/rtk/filters/generic-output.json",
    "dist/open-sse/services/compression/rules/en/filler.json",
    "dist/open-sse/vendor/codex-chatgpt-web/adapters/chatgpt-web/mcp-server.js",
    "dist/peer-stamp.mjs",
    "dist/responses-ws-proxy.mjs",
    "dist/server-ws.mjs",
    "dist/src/lib/usage/callLogArtifactWorker.js",
    "dist/systemd-notify.mjs",
    "dist/tls-options.mjs",
    "dist/webdav-handler.mjs",
    "scripts/build/colocateOptionals.mjs",
    "scripts/build/native-binary-compat.mjs",
    "scripts/build/runtime-env.mjs",
    "scripts/build/wreqJsNative.mjs",
    "scripts/packs/optionalPackInstaller.mjs",
    "scripts/packs/optionalPackManifest.mjs",
    "src/shared/utils/nodeRuntimeSupport.ts",
  ]);
});
