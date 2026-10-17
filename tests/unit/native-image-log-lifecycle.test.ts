import assert from "node:assert/strict";
import test from "node:test";

await import("../_setup/imageCallLogLifecycle.ts");
const core = await import("../../src/lib/db/core.ts");
const { saveCallLog, getCallLogById } = await import("../../src/lib/usage/callLogs.ts");

let previousId: string | undefined;

test.beforeEach(async () => {
  if (previousId) {
    const row = await getCallLogById(previousId);
    assert.ok(row, "The previous save must commit before a fixture resets SQLite");
    assert.deepEqual(row.requestBody, { prompt_chars: 4 });
  }
  core.resetDbInstance();
});

test.after(async () => {
  const row = await getCallLogById(previousId!);
  assert.ok(row, "The final save must commit before final database cleanup");
  core.resetDbInstance();
});

for (const id of ["image-lifecycle-first", "image-lifecycle-second"]) {
  test(`image fixture drains fire-and-forget save ${id}`, { timeout: 5_000 }, () => {
    previousId = id;
    void saveCallLog({
      id, timestamp: "2026-10-04T00:00:00.000Z", status: 200,
      provider: "fixture", model: "fixture-image", requestType: "image",
      requestBody: { prompt_chars: 4 },
    });
  });
}
