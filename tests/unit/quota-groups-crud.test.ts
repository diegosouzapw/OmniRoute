/**
 * tests/unit/quota-groups-crud.test.ts
 *
 * Task B2 — quotaGroups DB module CRUD.
 *
 * Coverage:
 * - createGroup → getGroup returns it; getGroupName returns the name.
 * - listGroups includes the seeded 'group-demo' + the newly created one.
 * - renameGroup changes the name (getGroup + getGroupName reflect the new name).
 * - deleteGroup with NO pools → returns true.
 * - deleteGroup of a group WITH a pool → throws /pools/i.
 * - deleteGroup('group-demo') → throws (protected seed group).
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// ── DB harness (mirrors quota-groups-migration.test.ts) ──────────────────────
const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-quota-groups-crud-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const groupsDb = await import("../../src/lib/db/quotaGroups.ts");
const poolsDb = await import("../../src/lib/db/quotaPools.ts");

async function resetStorage() {
  core.resetDbInstance();
  for (let attempt = 0; attempt < 10; attempt++) {
    try {
      if (fs.existsSync(TEST_DATA_DIR)) {
        fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
      }
      break;
    } catch (err: any) {
      if ((err?.code === "EBUSY" || err?.code === "EPERM") && attempt < 9) {
        await new Promise((resolve) => setTimeout(resolve, 50 * (attempt + 1)));
      } else {
        throw err;
      }
    }
  }
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(async () => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

// ── B2.1: createGroup / getGroup / getGroupName ───────────────────────────────

test("createGroup returns a QuotaGroup with id, name, createdAt", () => {
  const group = groupsDb.createGroup("My Test Group");

  assert.ok(group.id, "id should be set");
  assert.equal(group.name, "My Test Group");
  assert.ok(group.createdAt, "createdAt should be set");
});

test("getGroup returns the group after creation", () => {
  const created = groupsDb.createGroup("Findable Group");
  const found = groupsDb.getGroup(created.id);

  assert.ok(found, "getGroup should find the group");
  assert.equal(found!.id, created.id);
  assert.equal(found!.name, "Findable Group");
  assert.ok(found!.createdAt);
});

test("getGroup returns null for unknown id", () => {
  const result = groupsDb.getGroup("nonexistent-id");
  assert.equal(result, null);
});

test("getGroupName returns the name for a known group", () => {
  const group = groupsDb.createGroup("Name Test Group");
  const name = groupsDb.getGroupName(group.id);
  assert.equal(name, "Name Test Group");
});

test("getGroupName returns null for unknown id", () => {
  const result = groupsDb.getGroupName("does-not-exist");
  assert.equal(result, null);
});

// ── B2.2: listGroups ──────────────────────────────────────────────────────────

test("listGroups includes the seeded group-demo row", () => {
  // Trigger migrations by getting a DB handle.
  const groups = groupsDb.listGroups();

  const demo = groups.find((g) => g.id === "group-demo");
  assert.ok(demo, "group-demo should appear in listGroups");
  assert.equal(demo!.name, "GroupDemo");
});

test("listGroups includes both seeded group-demo and a newly created group", () => {
  const created = groupsDb.createGroup("New List Group");
  const groups = groupsDb.listGroups();

  const ids = groups.map((g) => g.id);
  assert.ok(ids.includes("group-demo"), "group-demo should be in the list");
  assert.ok(ids.includes(created.id), "newly created group should be in the list");
  assert.ok(groups.length >= 2, "list should have at least 2 entries");
});

test("listGroups is ordered by created_at ascending", () => {
  // group-demo was seeded first; any new group comes after.
  groupsDb.createGroup("After Demo");
  const groups = groupsDb.listGroups();

  const demoIdx = groups.findIndex((g) => g.id === "group-demo");
  assert.ok(demoIdx >= 0, "group-demo should be in the list");
  // The seeded group-demo should appear at some position; newer groups after.
  const afterIdx = groups.findIndex((g) => g.name === "After Demo");
  assert.ok(afterIdx > demoIdx, "newly created group should appear after group-demo");
});

// ── B2.3: renameGroup ─────────────────────────────────────────────────────────

test("renameGroup changes the group name", () => {
  const group = groupsDb.createGroup("Original Name");
  const result = groupsDb.renameGroup(group.id, "Renamed Name");

  assert.equal(result, true, "renameGroup should return true on success");

  const updated = groupsDb.getGroup(group.id);
  assert.ok(updated, "group should still exist after rename");
  assert.equal(updated!.name, "Renamed Name");
});

test("renameGroup returns false for non-existent id", () => {
  const result = groupsDb.renameGroup("ghost-id", "New Name");
  assert.equal(result, false);
});

test("getGroupName returns updated name after renameGroup", () => {
  const group = groupsDb.createGroup("Before Rename");
  groupsDb.renameGroup(group.id, "After Rename");
  assert.equal(groupsDb.getGroupName(group.id), "After Rename");
});

// ── B2.4: deleteGroup ─────────────────────────────────────────────────────────

test("deleteGroup with no pools returns true and removes the group", () => {
  const group = groupsDb.createGroup("Empty Group");
  const result = groupsDb.deleteGroup(group.id);

  assert.equal(result, true, "deleteGroup should return true");
  assert.equal(groupsDb.getGroup(group.id), null, "group should no longer exist");
});

test("deleteGroup returns false for non-existent id", () => {
  const result = groupsDb.deleteGroup("ghost-group");
  assert.equal(result, false);
});

test("deleteGroup throws when a pool still references the group", () => {
  const group = groupsDb.createGroup("Group With Pool");

  // Create a pool referencing this group.
  poolsDb.createPool({
    connectionId: "conn-in-group",
    name: "Blocking Pool",
    groupId: group.id,
  });

  assert.throws(
    () => groupsDb.deleteGroup(group.id),
    /pools/i,
    "deleteGroup should throw a message mentioning pools"
  );

  // Group should still exist.
  const stillThere = groupsDb.getGroup(group.id);
  assert.ok(stillThere, "group should still exist after failed delete");
});

test("deleteGroup('group-demo') throws (protected seed group)", () => {
  assert.throws(
    () => groupsDb.deleteGroup("group-demo"),
    /group-demo/i,
    "deleteGroup should throw for the protected group-demo id"
  );
});
