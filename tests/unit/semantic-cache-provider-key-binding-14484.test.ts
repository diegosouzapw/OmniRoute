import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

process.env.DATA_DIR = mkdtempSync(join(tmpdir(), "omni-cache-binding-14484-"));
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
const { updateDatabaseSettings, getUserDatabaseSettings } =
  await import("../../src/lib/db/databaseSettings.ts");
const { PUT } = await import("../../src/app/api/settings/cache-config/route.ts");
const { resetDbInstance } = await import("../../src/lib/db/core.ts");
test.after(() => resetDbInstance());

for (const key of [undefined, "********"]) {
  test(`changing provider cannot transfer the previous explicit key (${key ?? "omitted"})`, async () => {
    updateDatabaseSettings({
      cache: {
        semanticCacheEmbeddingProvider: "fixture-provider-a",
        semanticCacheEmbeddingBaseUrl: "",
        semanticCacheEmbeddingApiKey: "fixture-only-key-a",
      },
    });
    const response = await PUT(
      new Request("http://localhost/api/settings/cache-config", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          semanticCacheEmbeddingProvider: "fixture-provider-b",
          semanticCacheEmbeddingApiKey: key,
        }),
      }) as never
    );
    assert.equal(response.status, 400);
    assert.equal(
      getUserDatabaseSettings().cache.semanticCacheEmbeddingProvider,
      "fixture-provider-a"
    );
  });
}
