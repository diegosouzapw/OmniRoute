/**
 * Regression guard — the dependency tree must resolve exactly ONE
 * `onnxruntime-node` (and one `onnxruntime-common`).
 *
 * `@huggingface/transformers` pins `onnxruntime-node` to an EXACT version
 * (4.2.0 → "1.24.3"). Whenever the root range in package.json drifts off that
 * pin, npm nests a second copy under
 * `node_modules/@huggingface/transformers/node_modules/onnxruntime-node`.
 *
 * Two copies cannot coexist in one Node process: both ship a native
 * `libonnxruntime.so.1` under the SAME SONAME, so glibc's loader binds
 * whichever was dlopen()ed first and the other addon dies with
 *
 *   Error: .../libonnxruntime.so.1: version `VERS_1.27.0' not found
 *          (required by .../onnxruntime_binding.node)
 *
 * That is exactly what a production-group dependabot bump did on 2026-08-16
 * (root `onnxruntime-node` "~1.24.3" → "~1.27.0"): it broke the Docker image
 * build at the Dockerfile's post-build standalone verification step, which
 * imports `@huggingface/transformers` and `onnxruntime-node` in one process.
 *
 * Keep the root range compatible with whatever `@huggingface/transformers`
 * pins — do not "fix" a future recurrence by copying the nested native
 * binaries into the bundle; the SONAME clash makes that impossible.
 */
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), "..", "..", "..");

const lockfile = JSON.parse(readFileSync(join(repoRoot, "package-lock.json"), "utf8")) as {
  packages: Record<string, { version?: string; dependencies?: Record<string, string> }>;
};

function copiesOf(pkg: string): string[] {
  return Object.keys(lockfile.packages).filter(
    (key) => key === `node_modules/${pkg}` || key.endsWith(`/node_modules/${pkg}`)
  );
}

// Scoped to `onnxruntime-node` on purpose. `onnxruntime-common` is types/interfaces
// only and `onnxruntime-web` is WASM — neither dlopen()s anything, so their nested
// duplicates (onnxruntime-web carries its own onnxruntime-common) are harmless.
// `onnxruntime-node` is the sole package shipping the native libonnxruntime.so.1.
test("package-lock.json resolves exactly one copy of onnxruntime-node", () => {
  assert.deepEqual(
    copiesOf("onnxruntime-node"),
    ["node_modules/onnxruntime-node"],
    "onnxruntime-node must resolve to a single hoisted copy — a nested duplicate ships a " +
      "second libonnxruntime.so.1 under the same SONAME and breaks the standalone/Docker build"
  );
});

test("root onnxruntime-node matches the exact version @huggingface/transformers pins", () => {
  const transformers = lockfile.packages["node_modules/@huggingface/transformers"];
  assert.ok(transformers, "@huggingface/transformers must be present in the lockfile");

  const pinned = transformers.dependencies?.["onnxruntime-node"];
  assert.ok(pinned, "@huggingface/transformers must declare an onnxruntime-node dependency");

  const resolved = lockfile.packages["node_modules/onnxruntime-node"]?.version;
  assert.equal(
    resolved,
    pinned,
    `the hoisted onnxruntime-node (${resolved}) must equal the version ` +
      `@huggingface/transformers pins (${pinned}); otherwise npm nests a second, ` +
      `ABI-incompatible native copy`
  );
});
