import { randomUUID } from "node:crypto";
import { getDbInstance } from "./core";

export interface OmniContextTeam {
  id: string;
  name: string;
  slug: string;
  orgId: string | null;
  departmentId: string | null;
  createdAt: string;
  updatedAt: string;
}

interface TeamRow {
  id: string;
  name: string;
  slug: string;
  org_id: string | null;
  department_id: string | null;
  created_at: string;
  updated_at: string;
}

function rowToTeam(row: TeamRow): OmniContextTeam {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    orgId: row.org_id,
    departmentId: row.department_id,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export function createTeam(input: {
  name: string;
  slug: string;
  orgId?: string | null;
  departmentId?: string | null;
  id?: string;
}): OmniContextTeam {
  const db = getDbInstance();
  const id = input.id ?? randomUUID();
  const now = new Date().toISOString();
  db.prepare(
    `INSERT INTO omnicontext_teams (id, name, slug, org_id, department_id, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, ?)`
  ).run(id, input.name, input.slug, input.orgId ?? null, input.departmentId ?? null, now, now);
  return getTeamById(id)!;
}

export function getTeamById(id: string): OmniContextTeam | null {
  const db = getDbInstance();
  const row = db.prepare(`SELECT * FROM omnicontext_teams WHERE id = ?`).get(id) as
    TeamRow | undefined;
  return row ? rowToTeam(row) : null;
}

export function getTeamBySlug(slug: string): OmniContextTeam | null {
  const db = getDbInstance();
  const row = db.prepare(`SELECT * FROM omnicontext_teams WHERE slug = ?`).get(slug) as
    TeamRow | undefined;
  return row ? rowToTeam(row) : null;
}

export function listTeams(
  params: { orgId?: string; departmentId?: string } = {}
): OmniContextTeam[] {
  const db = getDbInstance();
  let sql = `SELECT * FROM omnicontext_teams WHERE 1=1`;
  const args: unknown[] = [];
  if (params.orgId) {
    sql += ` AND org_id = ?`;
    args.push(params.orgId);
  }
  if (params.departmentId) {
    sql += ` AND department_id = ?`;
    args.push(params.departmentId);
  }
  sql += ` ORDER BY name ASC`;
  return (db.prepare(sql).all(...args) as TeamRow[]).map(rowToTeam);
}

export function assignProjectToTeam(projectId: string, teamId: string | null): void {
  const db = getDbInstance();
  db.prepare(`UPDATE omnicontext_projects SET team_id = ?, updated_at = ? WHERE id = ?`).run(
    teamId,
    new Date().toISOString(),
    projectId
  );
}

export function listProjectsByTeam(
  teamId: string
): Array<{ id: string; name: string; slug: string }> {
  const db = getDbInstance();
  return db
    .prepare(`SELECT id, name, slug FROM omnicontext_projects WHERE team_id = ? ORDER BY name ASC`)
    .all(teamId) as Array<{ id: string; name: string; slug: string }>;
}
