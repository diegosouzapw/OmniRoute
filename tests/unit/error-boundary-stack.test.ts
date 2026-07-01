import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

const repoRoot = join(import.meta.dirname, "../..");

test("app error boundary does not render stack traces", async () => {
  const source = await readFile(join(repoRoot, "src/app/error.tsx"), "utf8");

  assert.doesNotMatch(source, /error\.stack/);
});
