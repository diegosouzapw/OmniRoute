/**
 * stream-imports-no-duplicates.test.ts — regression guard for duplicate import
 * bindings in open-sse/utils/stream.ts.
 *
 * A merge auto-resolve (#9378 → commit 9a4cca4bc2) left `sseCommentsEnabled`
 * imported twice. tsx/esbuild (typecheck + test runners) silently dedupe the
 * binding, but the webpack production build fails with "Identifier
 * 'sseCommentsEnabled' has already been declared" — so the defect only
 * surfaces at release-build time. This static guard fails fast in the unit
 * suite instead.
 */
import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const STREAM_TS = fileURLToPath(new URL("../../../open-sse/utils/stream.ts", import.meta.url));

test("open-sse/utils/stream.ts has no duplicate import bindings", async () => {
  const source = await readFile(STREAM_TS, "utf8");

  const bindings = new Map<string, number>();
  const importRegex = /^import\s+(?:type\s+)?(\{[\s\S]*?\}|[A-Za-z0-9_$]+)\s+from\s+/gm;

  for (const match of source.matchAll(importRegex)) {
    const clause = match[1];
    const names = clause.startsWith("{")
      ? clause
          .slice(1, -1)
          .split(",")
          .map(
            (n) =>
              n
                .trim()
                .split(/\s+as\s+/)
                .pop()
                ?.trim() ?? ""
          )
          .filter(Boolean)
      : [clause.trim()];
    for (const name of names) {
      bindings.set(name, (bindings.get(name) ?? 0) + 1);
    }
  }

  const duplicates = [...bindings.entries()].filter(([, count]) => count > 1).map(([name]) => name);

  assert.deepEqual(
    duplicates,
    [],
    `duplicate import bindings in stream.ts (breaks webpack production build): ${duplicates.join(", ")}`
  );
});
