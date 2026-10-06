import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-combo-patch-verb-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const combosDb = await import("../../src/lib/db/combos.ts");
const comboRoute = await import("../../src/app/api/combos/[id]/route.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

function patch(id: string, body: Record<string, unknown>) {
  return new Request(`http://localhost/api/combos/${id}`, {
    method: "PATCH",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
}

test("PATCH changes one field and leaves the rest of the combo alone", async () => {
  const combo = await combosDb.createCombo({
    name: "patchable",
    strategy: "priority",
    models: [{ provider: "openai", model: "gpt-4o" }],
    system_message: "keep me",
  });

  const response = await comboRoute.PATCH(patch(combo.id, { strategy: "round-robin" }), {
    params: Promise.resolve({ id: combo.id }),
  });
  assert.equal(response.status, 200);

  const stored = (await combosDb.getComboById(combo.id)) as {
    strategy?: string;
    system_message?: string;
    models?: unknown[];
  };
  assert.equal(stored.strategy, "round-robin");
  assert.equal(stored.system_message, "keep me");
  assert.equal(stored.models?.length, 1);
});

test("PATCH on an unknown combo answers 404, like PUT", async () => {
  const response = await comboRoute.PATCH(patch("does-not-exist", { strategy: "priority" }), {
    params: Promise.resolve({ id: "does-not-exist" }),
  });
  assert.equal(response.status, 404);

  const body = (await response.json()) as { error?: { code?: string } };
  assert.equal(body.error?.code, "COMBO_007");
});
