import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import type { Dirent } from "node:fs";
import { join } from "node:path";

/**
 * v3.8.50 was refused by the registry with `413 Payload Too Large` on
 * `POST /-/stage/package/omniroute`: the tarball had reached 288.7 MB packed
 * (1.1 GB unpacked), against 174.5 MB for the 3.8.49 that published fine.
 *
 * 668.7 MB of that — 61% of the whole package — was 842 `*.nft.json` files.
 * Those are Next.js Node File Trace manifests: build-time metadata used to
 * COMPUTE the standalone bundle, never read while serving. They had doubled
 * since 3.8.49 (325.0 MB across 748 files), which is what tipped the payload
 * over the limit.
 *
 * The guard is the `files[]` negation, so a future entry that re-widens the
 * glob (or a rewrite of the array) cannot silently put them back.
 */
const pkg = JSON.parse(readFileSync(join(import.meta.dirname, "../../package.json"), "utf8")) as {
  files?: string[];
};

test("package.json files[] excludes Next's .nft.json trace manifests", () => {
  const files = pkg.files ?? [];
  assert.ok(files.length > 0, "package.json must declare files[]");
  assert.ok(
    files.includes("!**/*.nft.json"),
    "files[] must negate **/*.nft.json — they are build metadata and were 61% of the 3.8.50 payload"
  );
});

test("the negation sits after the positive dist/ entry it has to override", () => {
  // npm applies files[] in order: a negation listed BEFORE the directory that
  // pulls the files in is a no-op. Positive anchor, so this test cannot pass
  // just because both strings happen to be present somewhere.
  const files = pkg.files ?? [];
  const dist = files.indexOf("dist/");
  const negation = files.indexOf("!**/*.nft.json");
  assert.notEqual(dist, -1, "dist/ must still be published");
  assert.ok(negation > dist, "the .nft.json negation must come after dist/");
});

test("no source module reads a .nft.json at runtime", () => {
  // If this ever stops holding, the exclusion above becomes a runtime break
  // rather than a size win — which is exactly the assumption worth pinning.
  const roots = ["src", "open-sse", "bin"];
  const hits: string[] = [];
  for (const root of roots) {
    const dir = join(import.meta.dirname, "../..", root);
    const stack = [dir];
    while (stack.length > 0) {
      const current = stack.pop() as string;
      let entries: Dirent[];
      try {
        entries = readdirSync(current, { withFileTypes: true });
      } catch {
        continue;
      }
      for (const entry of entries) {
        const full = join(current, entry.name);
        if (entry.isDirectory()) {
          if (entry.name !== "node_modules") stack.push(full);
        } else if (/\.(ts|tsx|mjs|js)$/.test(entry.name)) {
          if (readFileSync(full, "utf8").includes(".nft.json")) hits.push(full);
        }
      }
    }
  }
  assert.deepEqual(hits, [], `nothing may depend on .nft.json at runtime: ${hits.join(", ")}`);
});
