import type { OmniContextPermission, ProjectRole } from "./types";

const ROLE_PERMISSIONS: Record<ProjectRole, ReadonlyArray<OmniContextPermission>> = {
  member: ["VIEW", "PUBLISH", "HANDOFF"],
  lead: ["VIEW", "PUBLISH", "HANDOFF", "MANAGE_MEMBERS", "APPROVE"],
  admin: ["VIEW", "PUBLISH", "HANDOFF", "MANAGE_MEMBERS", "APPROVE", "MANAGE_PROJECT"],
};

export function permissionsForRole(role: ProjectRole): ReadonlyArray<OmniContextPermission> {
  return ROLE_PERMISSIONS[role] ?? ROLE_PERMISSIONS.member;
}

export function roleHasPermission(role: ProjectRole, permission: OmniContextPermission): boolean {
  return permissionsForRole(role).includes(permission);
}

export function isValidProjectRole(value: unknown): value is ProjectRole {
  return value === "member" || value === "lead" || value === "admin";
}
