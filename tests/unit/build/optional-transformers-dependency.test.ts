import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const repoRoot = process.cwd();

function readJson<T = Record<string, unknown>>(relPath: string): T {
  return JSON.parse(readFileSync(join(repoRoot, relPath), "utf8")) as T;
}

test("@huggingface/transformers is optional so onnxruntime CUDA install failures cannot abort OmniRoute install", () => {
  const pkg = readJson<{
    dependencies?: Record<string, string>;
    optionalDependencies?: Record<string, string>;
  }>("package.json");

  assert.equal(
    pkg.dependencies?.["@huggingface/transformers"],
    undefined,
    "transformers must not be a regular dependency because it pulls onnxruntime-node install scripts"
  );
  assert.equal(pkg.optionalDependencies?.["@huggingface/transformers"], "3.5.2");
});

test("package-lock marks transformers and its onnxruntime runtime as optional", () => {
  const lock = readJson<{
    packages: Record<string, { optional?: boolean; dependencies?: Record<string, string>; optionalDependencies?: Record<string, string> }>;
  }>("package-lock.json");

  assert.equal(
    lock.packages[""]?.dependencies?.["@huggingface/transformers"],
    undefined,
    "root lock dependencies must not keep transformers as mandatory"
  );
  assert.equal(lock.packages[""]?.optionalDependencies?.["@huggingface/transformers"], "3.5.2");

  for (const packagePath of [
    "node_modules/@huggingface/transformers",
    "node_modules/onnxruntime-node",
    "node_modules/onnxruntime-common",
  ]) {
    assert.equal(lock.packages[packagePath]?.optional, true, `${packagePath} should be optional`);
  }
});
