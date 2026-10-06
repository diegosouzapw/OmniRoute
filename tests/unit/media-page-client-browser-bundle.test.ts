import assert from "node:assert/strict";
import test from "node:test";
import { fileURLToPath } from "node:url";

import { build } from "esbuild";

const REPO_ROOT = fileURLToPath(new URL("../..", import.meta.url));

async function assertBrowserBundleSafe(relativePath: string) {
  await assert.doesNotReject(
    build({
      absWorkingDir: REPO_ROOT,
      entryPoints: [fileURLToPath(new URL(relativePath, import.meta.url))],
      bundle: true,
      format: "esm",
      logLevel: "silent",
      platform: "browser",
      tsconfig: "tsconfig.json",
      write: false,
    })
  );
}

test("media page client entry stays browser-bundle safe", async () => {
  await assertBrowserBundleSafe(
    "../../src/app/(dashboard)/dashboard/cache/media/MediaPageClient.tsx"
  );
});

test("provider detail client entry stays browser-bundle safe", async () => {
  await assertBrowserBundleSafe(
    "../../src/app/(dashboard)/dashboard/providers/[id]/ProviderDetailPageClient.tsx"
  );
});
