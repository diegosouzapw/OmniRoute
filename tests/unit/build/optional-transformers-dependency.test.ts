import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const repoRoot = process.cwd();

function readJson<T = Record<string, unknown>>(relPath: string): T {
  return JSON.parse(readFileSync(join(repoRoot, relPath), "utf8")) as T;
}

test("ONNX chain (@huggingface/transformers + onnxruntime-node) stays optional so Termux/Android installs succeed", () => {
  // #11095: onnxruntime-node declares os ["win32","darwin","linux"], so while
  // these lived in `dependencies` every npm install on Android/Termux aborted
  // with a fatal EBADPLATFORM. As optionalDependencies npm skips only the
  // unsupported-platform subtree (with a warning) and installs normally
  // everywhere else. This deliberately reverses the MECHANISM of #9962 while
  // keeping its goal: #9962's skip happened because the old onnxruntime-node@
  // 1.21.0 pin built from source (NAN) and failed to compile on Node 24/26;
  // the current 1.30.0 pin ships napi prebuilds, so on supported platforms the
  // chain always installs and `npm ci`/`next build` keep resolving it. On
  // platforms where it IS skipped, both consumers degrade gracefully via lazy/
  // dynamic imports (asserted below).
  const pkg = readJson<{
    dependencies?: Record<string, string>;
    optionalDependencies?: Record<string, string>;
    overrides?: Record<string, string>;
  }>("package.json");

  assert.equal(
    pkg.dependencies?.["@huggingface/transformers"],
    undefined,
    "transformers must NOT be a hard dependency (fatal EBADPLATFORM on Android)"
  );
  assert.equal(
    pkg.optionalDependencies?.["@huggingface/transformers"],
    "^4.2.0",
    "transformers must be an optionalDependency"
  );
  assert.equal(
    pkg.dependencies?.["onnxruntime-node"],
    undefined,
    "onnxruntime-node must NOT be a hard dependency (fatal EBADPLATFORM on Android)"
  );
  assert.equal(
    pkg.optionalDependencies?.["onnxruntime-node"],
    "1.30.0",
    "onnxruntime-node must be an optionalDependency pinned in lockstep with the overrides pin"
  );
  assert.equal(
    pkg.overrides?.["onnxruntime-node"],
    "1.30.0",
    "the overrides pin must stay aligned with @huggingface/transformers' own pin (single-copy invariant)"
  );
});

test("lockfile marks the whole ONNX chain optional", () => {
  const lock = readJson<{
    packages: Record<
      string,
      {
        optional?: boolean;
        dependencies?: Record<string, string>;
        optionalDependencies?: Record<string, string>;
      }
    >;
  }>("package-lock.json");

  assert.equal(
    lock.packages[""]?.optionalDependencies?.["@huggingface/transformers"],
    "^4.2.0",
    "root lock optionalDependencies must hold transformers"
  );
  assert.equal(
    lock.packages[""]?.optionalDependencies?.["onnxruntime-node"],
    "1.30.0",
    "root lock optionalDependencies must hold onnxruntime-node"
  );
  assert.ok(
    lock.packages["node_modules/@huggingface/transformers"]?.optional,
    "transformers must be marked optional in the lockfile"
  );
  assert.ok(
    lock.packages["node_modules/onnxruntime-node"]?.optional,
    "onnxruntime-node must be marked optional in the lockfile"
  );
  assert.ok(
    lock.packages["node_modules/onnxruntime-common"]?.optional,
    "onnxruntime-common must be marked optional in the lockfile"
  );
});

test("every @huggingface/transformers consumer loads it lazily so absent installs degrade gracefully", () => {
  // If any module ever switches to a STATIC import of the optional chain,
  // startup crashes on platforms where npm skipped it (Android/Termux).
  // transformersLocal.ts must keep its lazy await import() (D8/D25);
  // onnxWorker.ts must keep its runtime-variable dynamicImport indirection.

  const embeddingSrc = readFileSync(
    join(repoRoot, "src/lib/memory/embedding/transformersLocal.ts"),
    "utf8"
  );
  assert.doesNotMatch(
    embeddingSrc,
    /^\s*import\s+(?:[^'"]*?\s+from\s+)?["']@huggingface\/transformers["']/m,
    "transformersLocal.ts must not statically import @huggingface/transformers"
  );
  assert.match(
    embeddingSrc,
    /await import\(["']@huggingface\/transformers["']\)/,
    "transformersLocal.ts must load @huggingface/transformers via await import()"
  );

  const workerSrc = readFileSync(
    join(repoRoot, "open-sse/services/compression/engines/llmlingua/onnxWorker.ts"),
    "utf8"
  );
  assert.doesNotMatch(
    workerSrc,
    /^\s*import\s+(?:[^'"]*?\s+from\s+)?["']@huggingface\/transformers["']/m,
    "onnxWorker.ts must not statically import @huggingface/transformers"
  );
  // Positive anchor (required by source-scanner-guards.test.ts): prove the read
  // resolved to the real, non-empty onnxWorker.ts. Without this, renaming or
  // gutting the worker would leave the negative guard above passing while
  // protecting nothing. The worker loads the optional transformer deps lazily
  // via a dynamicImport() helper, so anchor on that stable call.
  assert.match(
    workerSrc,
    /dynamicImport\(["']@huggingface\/transformers["']\)/,
    "onnxWorker.ts must load @huggingface/transformers via a deferred dynamicImport()"
  );
});
