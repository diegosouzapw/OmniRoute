/**
 * API Key Groups DB — CRUD operations for team/enterprise key grouping
 *
 * Tables: key_groups, group_model_permissions, key_group_members
 * Migration: 065_api_key_groups.sql
 *
 * Enables team-level API key management with model-level access control.
 */

import { getDbInstance } from "@/lib/db/core";
import { randomUUID } from "crypto";

// ── Types ────────────────────────────────────────────────────────────────

export interface KeyGroup {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface GroupModelPermission {
  id: string;
  groupId: string;
  modelPattern: string;
  provider: string | null;
  accessType: "allow" | "deny";
  createdAt: string;
}

export interface KeyGroupMember {
  keyId: string;
  groupId: string;
  createdAt: string;
}

export interface KeyGroupWithPermissions extends KeyGroup {
  permissions: GroupModelPermission[];
  memberCount: number;
}

// ── Key Groups CRUD ──────────────────────────────────────────────────────

export function getAllKeyGroups(): KeyGroup[] {
  const db = getDbInstance() as any;
  const rows = db.prepare("SELECT * FROM key_groups ORDER BY name ASC").all() as any[];
  return rows.map(rowToGroup);
}

export function getKeyGroup(id: string): KeyGroup | undefined {
  const db = getDbInstance() as any;
  const row = db.prepare("SELECT * FROM key_groups WHERE id = ?").get(id) as any;
  return row ? rowToGroup(row) : undefined;
}

export function getKeyGroupWithPermissions(id: string): KeyGroupWithPermissions | undefined {
  const group = getKeyGroup(id);
  if (!group) return undefined;

  const permissions = getGroupPermissions(id);
  const memberCount = getGroupMemberCount(id);

  return { ...group, permissions, memberCount };
}

export function createKeyGroup(name: string, description = ""): KeyGroup {
  const db = getDbInstance() as any;
  const id = randomUUID();
  const now = new Date().toISOString();

  db.prepare(
    "INSERT INTO key_groups (id, name, description, created_at, updated_at) VALUES (?, ?, ?, ?, ?)"
  ).run(id, name, description, now, now);

  return getKeyGroup(id)!;
}

export function updateKeyGroup(
  id: string,
  updates: { name?: string; description?: string; isActive?: boolean }
): KeyGroup | undefined {
  const existing = getKeyGroup(id);
  if (!existing) return undefined;

  const db = getDbInstance() as any;
  const sets: string[] = [];
  const params: Record<string, unknown> = { id };

  if (updates.name !== undefined) {
    sets.push("name = @name");
    params.name = updates.name;
  }
  if (updates.description !== undefined) {
    sets.push("description = @description");
    params.description = updates.description;
  }
  if (updates.isActive !== undefined) {
    sets.push("is_active = @isActive");
    params.isActive = updates.isActive ? 1 : 0;
  }

  if (sets.length === 0) return existing;
  sets.push("updated_at = datetime('now')");

  db.prepare(`UPDATE key_groups SET ${sets.join(", ")} WHERE id = @id`).run(params);
  return getKeyGroup(id);
}

export function deleteKeyGroup(id: string): boolean {
  const db = getDbInstance() as any;
  // CASCADE deletes permissions and members
  const result = db.prepare("DELETE FROM key_groups WHERE id = ?").run(id);
  return result.changes > 0;
}

// ── Group Permissions ────────────────────────────────────────────────────

export function getGroupPermissions(groupId: string): GroupModelPermission[] {
  const db = getDbInstance() as any;
  const rows = db
    .prepare(
      "SELECT * FROM group_model_permissions WHERE group_id = ? ORDER BY access_type ASC, model_pattern ASC"
    )
    .all(groupId) as any[];
  return rows.map(rowToPermission);
}

export function addGroupPermission(
  groupId: string,
  modelPattern: string,
  accessType: "allow" | "deny",
  provider?: string
): GroupModelPermission {
  const db = getDbInstance() as any;
  const id = randomUUID();
  const now = new Date().toISOString();

  db.prepare(
    "INSERT INTO group_model_permissions (id, group_id, model_pattern, provider, access_type, created_at) VALUES (?, ?, ?, ?, ?, ?)"
  ).run(id, groupId, modelPattern, provider || null, accessType, now);

  return getGroupPermissions(groupId).find((p) => p.id === id)!;
}

export function removeGroupPermission(permissionId: string): boolean {
  const db = getDbInstance() as any;
  const result = db.prepare("DELETE FROM group_model_permissions WHERE id = ?").run(permissionId);
  return result.changes > 0;
}

export function clearGroupPermissions(groupId: string): void {
  const db = getDbInstance() as any;
  db.prepare("DELETE FROM group_model_permissions WHERE group_id = ?").run(groupId);
}

// ── Key Group Members ────────────────────────────────────────────────────

export function getGroupMembers(groupId: string): KeyGroupMember[] {
  const db = getDbInstance() as any;
  const rows = db
    .prepare("SELECT * FROM key_group_members WHERE group_id = ? ORDER BY created_at ASC")
    .all(groupId) as any[];
  return rows.map(rowToMember);
}

export function getKeyGroupsForApiKey(keyId: string): KeyGroup[] {
  const db = getDbInstance() as any;
  const rows = db
    .prepare(
      `
    SELECT g.* FROM key_groups g
    INNER JOIN key_group_members m ON g.id = m.group_id
    WHERE m.key_id = ? AND g.is_active = 1
    ORDER BY g.name ASC
  `
    )
    .all(keyId) as any[];
  return rows.map(rowToGroup);
}

export function addKeyToGroup(keyId: string, groupId: string): boolean {
  const db = getDbInstance() as any;
  try {
    db.prepare("INSERT OR IGNORE INTO key_group_members (key_id, group_id) VALUES (?, ?)").run(
      keyId,
      groupId
    );
    return true;
  } catch {
    return false;
  }
}

export function removeKeyFromGroup(keyId: string, groupId: string): boolean {
  const db = getDbInstance() as any;
  const result = db
    .prepare("DELETE FROM key_group_members WHERE key_id = ? AND group_id = ?")
    .run(keyId, groupId);
  return result.changes > 0;
}

function getGroupMemberCount(groupId: string): number {
  const db = getDbInstance() as any;
  const row = db
    .prepare("SELECT COUNT(*) as count FROM key_group_members WHERE group_id = ?")
    .get(groupId) as any;
  return row?.count || 0;
}

// ── Authorization Helper ────────────────────────────────────────────────

export interface ModelAccessCheck {
  allowed: boolean;
  matchedRules: GroupModelPermission[];
  deniedBy: GroupModelPermission | null;
}

/**
 * Check if an API key has access to a specific model.
 * Deny rules override allow rules. If no rules match, access is allowed by default.
 */
export function checkKeyModelAccess(
  keyId: string,
  model: string,
  provider?: string
): ModelAccessCheck {
  const groups = getKeyGroupsForApiKey(keyId);
  if (groups.length === 0) {
    // No groups = no restrictions
    return { allowed: true, matchedRules: [], deniedBy: null };
  }

  const db = getDbInstance() as any;
  const groupIds = groups.map((g) => g.id);
  const placeholders = groupIds.map(() => "?").join(",");

  const rules = db
    .prepare(
      `
    SELECT * FROM group_model_permissions
    WHERE group_id IN (${placeholders})
    ORDER BY access_type ASC
  `
    )
    .all(...groupIds) as any[];

  const permissions = rules.map(rowToPermission);

  // Check deny rules first (they take precedence)
  const denyRules = permissions.filter(
    (p) =>
      p.accessType === "deny" &&
      matchesModelPattern(p.modelPattern, model) &&
      (!p.provider || p.provider === provider)
  );

  if (denyRules.length > 0) {
    return { allowed: false, matchedRules: permissions, deniedBy: denyRules[0] };
  }

  // Check allow rules
  const allowRules = permissions.filter(
    (p) =>
      p.accessType === "allow" &&
      matchesModelPattern(p.modelPattern, model) &&
      (!p.provider || p.provider === provider)
  );

  if (allowRules.length > 0) {
    return { allowed: true, matchedRules: permissions, deniedBy: null };
  }

  // No matching rules = restricted by group membership but no explicit allow
  return { allowed: false, matchedRules: permissions, deniedBy: null };
}

/**
 * Batch access check for multiple (keyId, model) pairs in a single pass.
 * For each keyId, fetches its groups once and evaluates all models in-memory
 * using the identical logic as checkKeyModelAccess — result[keyId][model]
 * deep-equals checkKeyModelAccess(keyId, model, provider).
 * Empty keyIds or empty models → nested empty maps, no throw.
 */
export function checkMultipleKeyModelAccess(
  keyIds: string[],
  models: string[],
  provider?: string
): Map<string, Map<string, ModelAccessCheck>> {
  const outer = new Map<string, Map<string, ModelAccessCheck>>();
  if (keyIds.length === 0 || models.length === 0) {
    for (const keyId of keyIds) {
      outer.set(keyId, new Map());
    }
    return outer;
  }

  const db = getDbInstance() as any;

  for (const keyId of keyIds) {
    const inner = new Map<string, ModelAccessCheck>();
    outer.set(keyId, inner);

    const groups = getKeyGroupsForApiKey(keyId);

    if (groups.length === 0) {
      // No groups → no restrictions; all models allowed
      for (const model of models) {
        inner.set(model, { allowed: true, matchedRules: [], deniedBy: null });
      }
      continue;
    }

    // Fetch all permissions for this key's groups in one query
    const groupIds = groups.map((g) => g.id);
    const placeholders = groupIds.map(() => "?").join(",");
    const rules = db
      .prepare(
        `SELECT * FROM group_model_permissions WHERE group_id IN (${placeholders}) ORDER BY access_type ASC`
      )
      .all(...groupIds) as any[];
    const permissions = rules.map(rowToPermission);

    for (const model of models) {
      // Deny rules first (take precedence)
      const denyRules = permissions.filter(
        (p) =>
          p.accessType === "deny" &&
          matchesModelPattern(p.modelPattern, model) &&
          (!p.provider || p.provider === provider)
      );

      if (denyRules.length > 0) {
        inner.set(model, { allowed: false, matchedRules: permissions, deniedBy: denyRules[0] });
        continue;
      }

      // Allow rules
      const allowRules = permissions.filter(
        (p) =>
          p.accessType === "allow" &&
          matchesModelPattern(p.modelPattern, model) &&
          (!p.provider || p.provider === provider)
      );

      if (allowRules.length > 0) {
        inner.set(model, { allowed: true, matchedRules: permissions, deniedBy: null });
        continue;
      }

      // No matching rules → restricted by group membership but no explicit allow
      inner.set(model, { allowed: false, matchedRules: permissions, deniedBy: null });
    }
  }

  return outer;
}

function matchesModelPattern(pattern: string, model: string): boolean {
  if (pattern === "*") return true;
  if (pattern.includes("*")) {
    const regex = new RegExp("^" + pattern.replace(/\*/g, ".*") + "$");
    return regex.test(model);
  }
  return pattern === model;
}

// ── Row Mappers ──────────────────────────────────────────────────────────

function rowToGroup(row: any): KeyGroup {
  return {
    id: row.id,
    name: row.name,
    description: row.description || "",
    isActive: row.is_active === 1,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function rowToPermission(row: any): GroupModelPermission {
  return {
    id: row.id,
    groupId: row.group_id,
    modelPattern: row.model_pattern,
    provider: row.provider || null,
    accessType: row.access_type,
    createdAt: row.created_at,
  };
}

function rowToMember(row: any): KeyGroupMember {
  return {
    keyId: row.key_id,
    groupId: row.group_id,
    createdAt: row.created_at,
  };
}
