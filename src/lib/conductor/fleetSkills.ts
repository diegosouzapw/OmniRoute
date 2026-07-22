/**
 * Fleet skills for the Agent Card (Conductor PRD RF2) — derives A2A skills from
 * the OmniConductor hub's runner registry (`GET /v1/runners`, OASF capabilities).
 *
 * Fail-open by design: any problem (env unset, hub offline, bad shape) yields
 * `[]` so the Agent Card stays valid, just without the fleet section. Results
 * are cached for ~60s to keep the card endpoint cheap.
 */

import { z } from "zod";

export interface FleetSkill {
  id: string;
  name: string;
  description: string;
  tags: string[];
}

/** Untrusted hub response — validate only what we read. */
const runnersSchema = z.array(
  z.object({
    online: z.boolean().optional(),
    capabilities: z.object({
      clis: z
        .array(
          z.object({
            profile: z.string(),
            models: z.array(z.object({ id: z.string() })).optional(),
          })
        )
        .optional(),
      skills: z.array(z.string()).optional(),
    }),
  })
);

const CACHE_TTL_MS = 60_000;
let cache: { at: number; skills: FleetSkill[] } | null = null;

/** Test hook: resets the module cache. */
export function clearFleetSkillsCache(): void {
  cache = null;
}

export interface FleetSkillsOptions {
  fetchImpl?: typeof fetch;
  nowMs?: () => number;
}

export async function getFleetSkills(opts: FleetSkillsOptions = {}): Promise<FleetSkill[]> {
  const hubUrl = process.env.CONDUCTOR_HUB_URL?.trim();
  if (!hubUrl) return [];
  const now = opts.nowMs ?? Date.now;
  if (cache && now() - cache.at < CACHE_TTL_MS) return cache.skills;

  const doFetch = opts.fetchImpl ?? fetch;
  let skills: FleetSkill[] = [];
  try {
    const res = await doFetch(`${hubUrl}/v1/runners`, {
      headers: { authorization: `Bearer ${process.env.CONDUCTOR_HUB_TOKEN?.trim() ?? ""}` },
    });
    if (res.ok) skills = deriveSkills(runnersSchema.parse(await res.json()));
  } catch {
    skills = []; // hub offline / shape inválido: o card omite a frota, nunca quebra
  }
  cache = { at: now(), skills };
  return skills;
}

function deriveSkills(runners: z.infer<typeof runnersSchema>): FleetSkill[] {
  const online = runners.filter((r) => r.online !== false);
  const byProfile = new Map<string, { count: number; models: Set<string> }>();
  const oasfSkills = new Set<string>();
  for (const r of online) {
    for (const cli of r.capabilities.clis ?? []) {
      const entry = byProfile.get(cli.profile) ?? { count: 0, models: new Set<string>() };
      entry.count++;
      for (const m of cli.models ?? []) entry.models.add(m.id);
      byProfile.set(cli.profile, entry);
    }
    for (const s of r.capabilities.skills ?? []) oasfSkills.add(s);
  }

  const skills: FleetSkill[] = [];
  for (const [profile, info] of [...byProfile.entries()].sort(([a], [b]) => a.localeCompare(b))) {
    const models = [...info.models].slice(0, 8);
    skills.push({
      id: `conductor-cli-${profile}`,
      name: `Conductor fleet: ${profile} CLI`,
      description:
        `Delegate coding tasks to the OmniConductor fleet's ${profile} CLI ` +
        `(${info.count} runner(s) online${models.length ? `; models: ${models.join(", ")}` : ""}). ` +
        "Tasks run in disposable git worktrees; results come back as branches with graduated manifests.",
      tags: ["conductor", "fleet", "cli", profile],
    });
  }
  for (const s of [...oasfSkills].sort()) {
    skills.push({
      id: `conductor-skill-${s}`,
      name: `Conductor fleet skill: ${s}`,
      description: `OASF skill "${s}" declared by online runners of the OmniConductor fleet.`,
      tags: ["conductor", "fleet", "skill"],
    });
  }
  return skills;
}
