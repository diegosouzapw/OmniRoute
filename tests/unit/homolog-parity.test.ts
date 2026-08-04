import { test } from "node:test";
import assert from "node:assert/strict";
import { evaluateParity } from "../../scripts/homolog/lib/parity.mjs";

test("parity OK quando health bate com a versão esperada", () => {
  const r = evaluateParity(
    { status: "healthy", version: "3.8.49" },
    { expectedVersion: "3.8.49", httpStatus: 200 }
  );
  assert.equal(r.ok, true);
  assert.deepEqual(r.failures, []);
});

test("parity falha listando cada divergência", () => {
  const r = evaluateParity(
    { status: "degraded", version: "3.8.47" },
    { expectedVersion: "3.8.49", httpStatus: 200 }
  );
  assert.equal(r.ok, false);
  assert.equal(r.failures.length, 2); // status!=healthy, version mismatch
});

test("parity falha em HTTP não-200 mesmo com body bom", () => {
  const r = evaluateParity(
    { status: "healthy", version: "3.8.49" },
    { expectedVersion: "3.8.49", httpStatus: 503 }
  );
  assert.equal(r.ok, false);
});
