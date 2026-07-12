import test from "node:test";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

// #6559 — `omniroute --mcp` crashed at Node ESM link time with
// ERR_MODULE_NOT_FOUND for 'ioredis'.
//
// Root cause: src/shared/utils/rateLimiter.ts had a top-level static
// `import Redis from "ioredis"`. esbuild's `--packages=external` bundling of
// the MCP server (scripts/build/prepublish.ts Step 8.5) hoists that into a
// real top-level ESM import in the bundled output, even though rateLimiter.ts
// is only ever reached via a dynamic `await import(...)` several call-sites
// deep. `ioredis` is not guaranteed to ship in the MCP-only bundle's
// node_modules, so the eager import can crash at link time before any
// `--mcp` startup code runs.
//
// This test reproduces the exact bundling step used at publish time and
// asserts the compiled output never contains a top-level static `ioredis`
// import — it must stay a lazy `await import("ioredis")`, matching the
// established soft-dependency pattern in src/lib/quota/redisQuotaStore.ts.

const repoRoot = process.cwd();

test("MCP server bundle has no top-level static import of ioredis", () => {
  const outDir = mkdtempSync(join(tmpdir(), "mcp-bundle-ioredis-"));
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

    // A static/hoisted ESM import resolves at module-link time and would
    // crash the MCP server before startup if ioredis isn't in dist/node_modules.
    assert.doesNotMatch(
      bundled,
      /^import\s+.*["']ioredis["'];?\s*$/m,
      "MCP bundle must not eagerly (statically) import 'ioredis' at the top level — " +
        "it must stay a lazy `await import(\"ioredis\")` (see src/lib/quota/redisQuotaStore.ts)"
    );

    // The lazy dynamic import from redisQuotaStore.ts must still be present —
    // proves the assertion above isn't vacuously true (e.g. ioredis missing entirely).
    assert.match(
      bundled,
      /await import\(\s*["']ioredis["']\s*\)/,
      "expected the existing lazy dynamic import of ioredis to remain in the bundle"
    );
  } finally {
    rmSync(outDir, { recursive: true, force: true });
  }
});
