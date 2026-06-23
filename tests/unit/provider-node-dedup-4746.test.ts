// #4746 — the compatible-provider "add" modals appended provider nodes with
// `setProviderNodes((prev) => [...prev, node])`, so the same provider id could land in the
// array more than once (refresh-then-add, double-click, retry, StrictMode double-invocation),
// producing duplicate cards and invalidating the compatibleProviderGroups memo on no-op adds.
// upsertProviderNodeById dedups by id and keeps array identity stable for no-op adds.
import { test } from "node:test";
import assert from "node:assert/strict";
import { upsertProviderNodeById } from "../../src/app/(dashboard)/dashboard/providers/providerPageUtils.ts";

test("appends a node with a new id (#4746)", () => {
  const prev = [{ id: "a", name: "A" }];
  const next = upsertProviderNodeById(prev, { id: "b", name: "B" });
  assert.deepEqual(next.map((n) => n.id), ["a", "b"]);
});

test("does not append a duplicate id — same identical payload returns prev unchanged (#4746)", () => {
  const prev = [{ id: "a", name: "A" }];
  const next = upsertProviderNodeById(prev, { id: "a", name: "A" });
  assert.equal(next.length, 1);
  assert.equal(next, prev, "no-op add must keep the same array reference (memo stability)");
});

test("replaces an existing id when the payload changed (#4746)", () => {
  const prev = [{ id: "a", name: "A" }, { id: "b", name: "B" }];
  const next = upsertProviderNodeById(prev, { id: "a", name: "A2" });
  assert.equal(next.length, 2);
  assert.equal(next.find((n) => n.id === "a")?.name, "A2");
  assert.notEqual(next, prev);
});

test("appends when id is missing/null (cannot dedup) (#4746)", () => {
  const prev = [{ id: "a" }];
  const next = upsertProviderNodeById(prev, { id: null } as { id: string | null });
  assert.equal(next.length, 2);
});
