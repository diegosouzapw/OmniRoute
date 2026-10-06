/**
 * Regression test — onnxruntime-node's native libonnxruntime.so.1 was never
 * registered in NATIVE_ASSET_ENTRIES, so the standalone bundle shipped
 * dist/binding.js (traced by Next.js as a normal JS require) without its
 * sibling native bin/ directory (loaded via a dynamic dlopen() Next's static
 * file trace can't see — the same blind-spot class as the LLMLingua closure,
 * for a .so instead of a JS import). The bundle then failed at runtime with
 * "Error: libonnxruntime.so.1: cannot open shared object file: No such file
 * or directory" the first time transformers/llmlingua tried to run ONNX
 * inference — reproduced live via the Dockerfile's post-build verification
 * step once the separate llmlingua-2 stub bug (#9653-adjacent fix) was
 * resolved and the build progressed far enough to reach this package.
 */
import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, mkdirSync, writeFileSync, existsSync, rmSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";

import {
  NATIVE_ASSET_ENTRIES,
  syncStandaloneNativeAssets,
} from "../../scripts/build/assembleStandalone.mjs";

test("NATIVE_ASSET_ENTRIES registers onnxruntime-node's native bin/ directory", () => {
  const entry = NATIVE_ASSET_ENTRIES.find(
    (e) => e.src.join("/") === "node_modules/onnxruntime-node/bin"
  );
  assert.ok(entry, "onnxruntime-node/bin must be a registered native asset entry");
  assert.deepEqual(entry.dest, ["node_modules", "onnxruntime-node", "bin"]);
});

test("syncStandaloneNativeAssets copies onnxruntime-node's libonnxruntime.so.1 into the standalone bundle", async () => {
  const root = mkdtempSync(join(tmpdir(), "omniroute-assemble-onnx-"));
  try {
    // Mirror the real package's shape: dist/binding.js (traced fine by Next)
    // plus the platform-specific native .so under bin/napi-v3/<platform>/<arch>/.
    const pkgDir = join(root, "node_modules", "onnxruntime-node");
    mkdirSync(join(pkgDir, "dist"), { recursive: true });
    writeFileSync(join(pkgDir, "dist", "binding.js"), "// native binding loader\n");
    const soDir = join(pkgDir, "bin", "napi-v3", "linux", "x64");
    mkdirSync(soDir, { recursive: true });
    writeFileSync(join(soDir, "libonnxruntime.so.1"), "fake-shared-library-bytes");

    const outDir = join(root, ".build", "next", "standalone");
    mkdirSync(outDir, { recursive: true });

    const changed = await syncStandaloneNativeAssets(root, undefined, { log: () => {} }, outDir);
    assert.equal(changed, true);

    const destSo = join(
      outDir,
      "node_modules",
      "onnxruntime-node",
      "bin",
      "napi-v3",
      "linux",
      "x64",
      "libonnxruntime.so.1"
    );
    assert.ok(existsSync(destSo), "libonnxruntime.so.1 must be copied into the standalone bundle");
  } finally {
    rmSync(root, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  }
});
