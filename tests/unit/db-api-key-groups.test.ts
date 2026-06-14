import { describe, it } from "node:test";
import assert from "node:assert/strict";

import {
  createKeyGroup,
  getKeyGroup,
  getAllKeyGroups,
  updateKeyGroup,
  deleteKeyGroup,
  addGroupPermission,
  getGroupPermissions,
  removeGroupPermission,
  addKeyToGroup,
  removeKeyFromGroup,
  getGroupMembers,
  getKeyGroupWithPermissions,
} from "../../src/lib/db/apiKeyGroups.ts";

describe("apiKeyGroups", () => {
  const groupName = `test-group-${Date.now()}`;

  it("createKeyGroup creates a group", () => {
    const group = createKeyGroup(groupName, "Test description");
    assert.ok(group.id, "should have id");
    assert.equal(group.name, groupName);
    assert.equal(group.description, "Test description");
  });

  it("getKeyGroup retrieves by id", () => {
    const created = createKeyGroup(`get-${Date.now()}`);
    const found = getKeyGroup(created.id);
    assert.ok(found);
    assert.equal(found!.id, created.id);
  });

  it("getAllKeyGroups returns all groups", () => {
    const all = getAllKeyGroups();
    assert.ok(Array.isArray(all));
    assert.ok(all.length >= 1);
  });

  it("updateKeyGroup updates name and description", () => {
    const group = createKeyGroup(`update-${Date.now()}`);
    updateKeyGroup(group.id, { name: "updated-name", description: "updated-desc" });
    const found = getKeyGroup(group.id);
    assert.equal(found!.name, "updated-name");
    assert.equal(found!.description, "updated-desc");
  });

  it("deleteKeyGroup removes group", () => {
    const group = createKeyGroup(`delete-${Date.now()}`);
    deleteKeyGroup(group.id);
    assert.equal(getKeyGroup(group.id), undefined);
  });

  it("addGroupPermission adds permission", () => {
    const group = createKeyGroup(`perm-${Date.now()}`);
    addGroupPermission(group.id, "gpt-*", "allow");
    const perms = getGroupPermissions(group.id);
    assert.ok(perms.length >= 1);
    assert.equal(perms[0].modelPattern, "gpt-*");
    assert.equal(perms[0].accessType, "allow");
  });

  it("removeGroupPermission removes permission", () => {
    const group = createKeyGroup(`rmperm-${Date.now()}`);
    addGroupPermission(group.id, "claude-*", "allow");
    const perms = getGroupPermissions(group.id);
    removeGroupPermission(perms[0].id);
    assert.equal(getGroupPermissions(group.id).length, 0);
  });

  it("addKeyToGroup returns boolean (INSERT OR IGNORE)", () => {
    const group = createKeyGroup(`member-${Date.now()}`);
    const result = addKeyToGroup("fake-key-id", group.id);
    assert.equal(typeof result, "boolean");
  });

  it("getGroupMembers returns array", () => {
    const group = createKeyGroup(`members-${Date.now()}`);
    const members = getGroupMembers(group.id);
    assert.ok(Array.isArray(members));
  });

  it("removeKeyFromGroup returns boolean", () => {
    const group = createKeyGroup(`rmmember-${Date.now()}`);
    const result = removeKeyFromGroup("nonexistent-key", group.id);
    assert.equal(typeof result, "boolean");
  });

  it("getKeyGroupWithPermissions returns group with permissions", () => {
    const group = createKeyGroup(`full-${Date.now()}`);
    addGroupPermission(group.id, "test-*", "allow");
    const full = getKeyGroupWithPermissions(group.id);
    assert.ok(full);
    assert.equal(full!.permissions.length, 1);
    assert.equal(typeof full!.memberCount, "number");
  });
});
