import { randomUUID } from "node:crypto";
import { getDbInstance } from "./core";
import type { ProjectRole } from "@/lib/omnicontext/types";

export interface OmniContextProject {
  id: string;
  name: string;
  slug: string;
  orgId: string | null;
  teamId: string | null;
  retentionDays: number;
  injectEnabled: boolean;
  publishPolicyDefault: string;
  createdAt: string;
  updatedAt: string;
}

export interface OmniContextProjectMember {
  projectId: string;
  apiKeyId: string;
  role: ProjectRole;
  createdAt: string;
}

interface ProjectRow {
  id: string;
  name: string;
  slug: string;
  org_id: string | null;
  team_id: string | null;
  retention_days: number;
  inject_enabled: number;
  publish_policy_default: string;
  created_at: string;
  updated_at: string;
}

interface MemberRow {
  project_id: string;
  api_key_id: string;
  role: string;
  created_at: string;
}

function rowToProject(row: ProjectRow): OmniContextProject {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    orgId: row.org_id,
    teamId: row.team_id,
    retentionDays: row.retention_days,
    injectEnabled: row.inject_enabled === 1,
    publishPolicyDefault: row.publish_policy_default,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function rowToMember(row: MemberRow): OmniContextProjectMember {
  return {
    projectId: row.project_id,
    apiKeyId: row.api_key_id,
    role: (row.role as ProjectRole) || "member",
    createdAt: row.created_at,
  };
}

export interface CreateProjectInput {
  name: string;
  slug: string;
  orgId?: string | null;
  teamId?: string | null;
  retentionDays?: number;
  injectEnabled?: boolean;
  publishPolicyDefault?: string;
  id?: string;
}

export function createProject(input: CreateProjectInput): OmniContextProject {
  const db = getDbInstance();
  const id = input.id?.trim() || randomUUID();
  const now = new Date().toISOString();
  db.prepare(
    `INSERT INTO omnicontext_projects
      (id, name, slug, org_id, team_id, retention_days, inject_enabled, publish_policy_default, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  ).run(
    id,
    input.name.trim(),
    input.slug.trim(),
    input.orgId ?? null,
    input.teamId ?? null,
    input.retentionDays ?? 90,
    input.injectEnabled === false ? 0 : 1,
    input.publishPolicyDefault ?? "auto",
    now,
    now
  );
  const project = getProjectById(id);
  if (!project) throw new Error("Failed to create omnicontext project");
  return project;
}

export function getProjectById(id: string): OmniContextProject | null {
  const db = getDbInstance();
  const row = db.prepare("SELECT * FROM omnicontext_projects WHERE id = ?").get(id) as
    ProjectRow | undefined;
  return row ? rowToProject(row) : null;
}

export function getProjectBySlug(slug: string): OmniContextProject | null {
  const db = getDbInstance();
  const row = db.prepare("SELECT * FROM omnicontext_projects WHERE slug = ?").get(slug) as
    ProjectRow | undefined;
  return row ? rowToProject(row) : null;
}

export function listProjects(): OmniContextProject[] {
  const db = getDbInstance();
  const rows = db
    .prepare("SELECT * FROM omnicontext_projects ORDER BY name COLLATE NOCASE ASC")
    .all() as ProjectRow[];
  return rows.map(rowToProject);
}

export function updateProject(
  id: string,
  patch: Partial<Omit<CreateProjectInput, "id" | "slug">> & { slug?: string }
): OmniContextProject | null {
  const existing = getProjectById(id);
  if (!existing) return null;
  const db = getDbInstance();
  const now = new Date().toISOString();
  db.prepare(
    `UPDATE omnicontext_projects SET
      name = ?,
      slug = ?,
      org_id = ?,
      team_id = ?,
      retention_days = ?,
      inject_enabled = ?,
      publish_policy_default = ?,
      updated_at = ?
     WHERE id = ?`
  ).run(
    patch.name?.trim() ?? existing.name,
    patch.slug?.trim() ?? existing.slug,
    patch.orgId !== undefined ? patch.orgId : existing.orgId,
    patch.teamId !== undefined ? patch.teamId : existing.teamId,
    patch.retentionDays ?? existing.retentionDays,
    patch.injectEnabled !== undefined
      ? patch.injectEnabled
        ? 1
        : 0
      : existing.injectEnabled
        ? 1
        : 0,
    patch.publishPolicyDefault ?? existing.publishPolicyDefault,
    now,
    id
  );
  return getProjectById(id);
}

export function deleteProject(id: string): boolean {
  const db = getDbInstance();
  const result = db.prepare("DELETE FROM omnicontext_projects WHERE id = ?").run(id);
  return result.changes > 0;
}

export function addProjectMember(
  projectId: string,
  apiKeyId: string,
  role: ProjectRole = "member"
): OmniContextProjectMember {
  const db = getDbInstance();
  const now = new Date().toISOString();
  db.prepare(
    `INSERT INTO omnicontext_project_members (project_id, api_key_id, role, created_at)
     VALUES (?, ?, ?, ?)
     ON CONFLICT(project_id, api_key_id) DO UPDATE SET role = excluded.role`
  ).run(projectId, apiKeyId, role, now);
  const member = getMembership(projectId, apiKeyId);
  if (!member) throw new Error("Failed to add omnicontext project member");
  return member;
}

export function removeProjectMember(projectId: string, apiKeyId: string): boolean {
  const db = getDbInstance();
  const result = db
    .prepare("DELETE FROM omnicontext_project_members WHERE project_id = ? AND api_key_id = ?")
    .run(projectId, apiKeyId);
  return result.changes > 0;
}

export function listProjectMembers(projectId: string): OmniContextProjectMember[] {
  const db = getDbInstance();
  const rows = db
    .prepare(
      "SELECT * FROM omnicontext_project_members WHERE project_id = ? ORDER BY created_at ASC"
    )
    .all(projectId) as MemberRow[];
  return rows.map(rowToMember);
}

export function getMembership(
  projectId: string,
  apiKeyId: string
): OmniContextProjectMember | null {
  const db = getDbInstance();
  const row = db
    .prepare("SELECT * FROM omnicontext_project_members WHERE project_id = ? AND api_key_id = ?")
    .get(projectId, apiKeyId) as MemberRow | undefined;
  return row ? rowToMember(row) : null;
}

export function listProjectsForApiKey(apiKeyId: string): OmniContextProject[] {
  const db = getDbInstance();
  const rows = db
    .prepare(
      `SELECT p.* FROM omnicontext_projects p
       INNER JOIN omnicontext_project_members m ON m.project_id = p.id
       WHERE m.api_key_id = ?
       ORDER BY p.name COLLATE NOCASE ASC`
    )
    .all(apiKeyId) as ProjectRow[];
  return rows.map(rowToProject);
}
