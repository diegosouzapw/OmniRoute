import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

import {
  MCP_CLOSURE_SPOT_CHECK_PATH,
  computeMcpClosure,
  findMissingPackageFilesTestNegations,
  isCoveredByFiles,
} from "../../../scripts/build/mcpPublishedFilesClosure.ts";

// #3578 — `omniroute --mcp` crashed on npm installs with ERR_MODULE_NOT_FOUND for
// src/lib/combos/steps.ts: the MCP server runs from raw TypeScript source and imports
// across src/ + open-sse/, but the published `files` allowlist only shipped a few
// cherry-picked paths. This gate computes the MCP server's transitive import closure
// and asserts every reachable src/ + open-sse/ file is covered by a package.json
// `files` entry, so a missing dir can never silently ship a broken --mcp again.
//
// Live `npm pack` over-inclusion checks (#3821) live in
// `scripts/build/validate-pack-artifact.ts` (already `--ignore-scripts`) so concurrent
// `test:unit` never stalls on a monorepo pack walk / prepare→husky lifecycle.

const ROOT = process.cwd();

test("#3578 every MCP-server source file is covered by package.json files", () => {
  const pkg = JSON.parse(fs.readFileSync(path.join(ROOT, "package.json"), "utf8"));
  const filesEntries: string[] = pkg.files || [];
  const closure = computeMcpClosure(ROOT);

  // Sanity: the closure must actually include the file the bug report hit.
  assert.ok(
    closure.includes(MCP_CLOSURE_SPOT_CHECK_PATH),
    `closure should include the file from the bug report (#3578): ${MCP_CLOSURE_SPOT_CHECK_PATH}`
  );

  const uncovered = closure.filter((f) => !isCoveredByFiles(f, filesEntries));
  assert.deepEqual(
    uncovered,
    [],
    `These MCP-reachable source files are not in package.json "files" and would 404 a published --mcp:\n` +
      uncovered.map((f) => "  - " + f).join("\n")
  );
});

test("#3821 package.json files keeps test/spec negations (static)", () => {
  const pkg = JSON.parse(fs.readFileSync(path.join(ROOT, "package.json"), "utf8"));
  const filesEntries: string[] = pkg.files || [];
  const missing = findMissingPackageFilesTestNegations(filesEntries);
  assert.deepEqual(
    missing,
    [],
    `These package.json "files" negations are missing — without them co-located tests can ship:\n` +
      missing.map((f) => "  - " + f).join("\n")
  );
});
