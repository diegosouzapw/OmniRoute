/**
 * @file controlcenter-client-boundary-13474.test.ts
 * @description Verifies that src/lib/combos/controlCenter.ts has no
 * transitive imports from open-sse/services/ or open-sse/config/, which
 * would pull the DB/playwright chain into the "use client" bundle and
 * break production builds.  (#13474)
 */

import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";

test("controlCenter.ts does not import from open-sse/services/ or open-sse/config/", () => {
  const filePath = join(process.cwd(), "src/lib/combos/controlCenter.ts");
  const content = readFileSync(filePath, "utf8");

  // Check for direct imports from problematic open-sse paths
  const problematicPatterns = [
    /from\s+["'].*open-sse\/services\//,
    /from\s+["'].*open-sse\/config\//,
    /import\s+.*open-sse\/services\//,
    /import\s+.*open-sse\/config\//,
  ];

  for (const pattern of problematicPatterns) {
    const match = content.match(pattern);
    assert.ok(
      !match,
      `controlCenter.ts should not import from open-sse/services/ or open-sse/config/ — ` +
        `found: ${match?.[0]}`
    );
  }
});

test("controlCenter.ts only imports from safe internal modules", () => {
  const filePath = join(process.cwd(), "src/lib/combos/controlCenter.ts");
  const content = readFileSync(filePath, "utf8");

  // Extract all import lines
  const importLines = content
    .split("\n")
    .filter((line) => line.trimStart().startsWith("import "));

  // Each import should be from a safe path (no open-sse)
  for (const line of importLines) {
    assert.ok(
      !line.includes("open-sse"),
      `controlCenter.ts has unsafe import: ${line.trim()}`
    );
  }
});
