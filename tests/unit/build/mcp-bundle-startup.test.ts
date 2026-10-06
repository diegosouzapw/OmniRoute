import test from "node:test";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { mkdtempSync, readFileSync, rmSync } from "node:fs";
import { join } from "node:path";
import { pathToFileURL } from "node:url";

// Regression guard for the Node 24 MCP startup crash caused by an ESM init cycle.
// The published bundle is produced by this exact esbuild invocation in
// scripts/build/prepublish.ts. Importing the generated file in a fresh Node process
// catches syntax/link failures that `node --check` does not report for this bundle.

const repoRoot = process.cwd();

test("MCP server bundle imports successfully on Node 24", () => {
  // Keep the generated bundle below the repository so Node's ESM resolver can
  // find the repository's external production dependencies (for example zod).
  const outDir = mkdtempSync(join(repoRoot, ".mcp-bundle-startup-"));
  const outFile = join(outDir, "server.js");

  try {
    execFileSync(
      "npx",
      [
        "esbuild",
        "open-sse/mcp-server/server.ts",
        "--bundle",
        "--platform=node",
        "--packages=external",
        "--format=esm",
        `--outfile=${outFile}`,
      ],
      { cwd: repoRoot, stdio: "pipe" }
    );

    const bundled = readFileSync(outFile, "utf8");
    assert.doesNotMatch(
      bundled,
      /init_googApiKeyAuth[\s\S]{0,300}await init_auth\(\)/,
      "MCP bundle must not contain the auth ↔ googApiKeyAuth circular initializer"
    );

    const importScript = `await import(${JSON.stringify(pathToFileURL(outFile).href)});`;
    assert.doesNotThrow(() => {
      execFileSync(process.execPath, ["--input-type=module", "-e", importScript], {
        cwd: repoRoot,
        env: {
          ...process.env,
          DATA_DIR: join(outDir, "data"),
          DISABLE_SQLITE_AUTO_BACKUP: "true",
          JWT_SECRET: "mcp-bundle-startup-test-jwt-secret-000",
          API_KEY_SECRET: "mcp-bundle-startup-test-api-key-secret",
        },
        stdio: "pipe",
      });
    }, "the generated MCP bundle must be importable by the supported Node runtime");
  } finally {
    rmSync(outDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  }
});
