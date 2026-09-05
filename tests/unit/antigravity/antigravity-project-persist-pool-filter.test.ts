import test from "node:test";
import assert from "node:assert/strict";
import { preferAntigravityConnectionsWithStoredProject } from "@omniroute/open-sse/services/antigravityProjectPersist.ts";

test("keeps connections with a projectId on the column or in providerSpecificData", () => {
  const kept = preferAntigravityConnectionsWithStoredProject([
    { id: "a", projectId: "projects/a" },
    { id: "b", providerSpecificData: { projectId: "projects/b" } },
  ]);

  assert.deepEqual(
    kept.map((c) => c.id),
    ["a", "b"]
  );
});

test("drops connections whose projectId is missing, blank or not a string", () => {
  const kept = preferAntigravityConnectionsWithStoredProject([
    { id: "missing" },
    { id: "blank", projectId: "   " },
    { id: "null", projectId: null },
    { id: "numeric", projectId: 42 },
    { id: "blank-psd", providerSpecificData: { projectId: "" } },
    { id: "null-psd", providerSpecificData: null },
    { id: "valid", projectId: "projects/valid" },
  ]);

  assert.deepEqual(kept, [{ id: "valid", projectId: "projects/valid" }]);
});

test("returns an empty pool for an empty input instead of throwing", () => {
  assert.deepEqual(preferAntigravityConnectionsWithStoredProject([]), []);
});
