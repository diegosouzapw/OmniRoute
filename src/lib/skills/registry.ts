import { Skill, SkillSchema } from "./types";
import { SkillCreateInputSchema } from "./schemas";
import { getDbInstance } from "../db/core";
import { randomUUID } from "crypto";

class SkillRegistry {
  private static instance: SkillRegistry;
  private registeredSkills: Map<string, Skill> = new Map();
  private versionCache: Map<string, Map<string, Skill>> = new Map();

  private constructor() {}

  static getInstance(): SkillRegistry {
    if (!SkillRegistry.instance) {
      SkillRegistry.instance = new SkillRegistry();
    }
    return SkillRegistry.instance;
  }

  async register(skillData: {
    name: string;
    version?: string;
    description?: string;
    schema: SkillSchema;
    handler: string;
    enabled?: boolean;
    apiKeyId: string;
  }): Promise<Skill> {
    const parsed = SkillCreateInputSchema.parse(skillData);
    const db = getDbInstance();
    const id = randomUUID();
    const now = new Date();

    db.prepare(
      `INSERT INTO skills (id, api_key_id, name, version, description, schema, handler, enabled, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    ).run(
      id,
      skillData.apiKeyId,
      parsed.name,
      parsed.version,
      parsed.description || null,
      JSON.stringify(parsed.schema),
      parsed.handler,
      parsed.enabled ? 1 : 0,
      now.toISOString(),
      now.toISOString()
    );

    const skill: Skill = {
      id,
      apiKeyId: skillData.apiKeyId,
      name: parsed.name,
      version: parsed.version,
      description: parsed.description || "",
      schema: parsed.schema,
      handler: parsed.handler,
      enabled: parsed.enabled,
      createdAt: now,
      updatedAt: now,
    };

    this.registeredSkills.set(`${parsed.name}@${parsed.version}`, skill);
    this.updateVersionCache(skill);

    return skill;
  }

  async unregister(name: string, version?: string, apiKeyId?: string): Promise<boolean> {
    const db = getDbInstance();

    if (version) {
      const key = `${name}@${version}`;
      const skill = this.registeredSkills.get(key);
      if (skill && (!apiKeyId || skill.apiKeyId === apiKeyId)) {
        db.prepare("DELETE FROM skills WHERE id = ?").run(skill.id);
        this.registeredSkills.delete(key);
        this.clearVersionCache(name);
        return true;
      }
    } else {
      const deleted = db
        .prepare("DELETE FROM skills WHERE name = ? AND (? IS NULL OR api_key_id = ?)")
        .run(name, apiKeyId || null, apiKeyId || null);

      if (deleted.changes > 0) {
        const keysToDelete = Array.from(this.registeredSkills.keys()).filter((k) =>
          k.startsWith(`${name}@`)
        );
        keysToDelete.forEach((k) => this.registeredSkills.delete(k));
        this.clearVersionCache(name);
        return true;
      }
    }

    return false;
  }

  list(apiKeyId?: string): Skill[] {
    if (apiKeyId) {
      return Array.from(this.registeredSkills.values()).filter((s) => s.apiKeyId === apiKeyId);
    }
    return Array.from(this.registeredSkills.values());
  }

  getSkill(name: string, apiKeyId?: string): Skill | undefined {
    return this.registeredSkills.get(name);
  }

  getSkillVersions(name: string): Skill[] {
    const cached = this.versionCache.get(name);
    if (!cached) return [];
    return Array.from(cached.values()).sort((a, b) => this.compareVersions(b.version, a.version));
  }

  resolveVersion(name: string, constraint: string, apiKeyId?: string): Skill | undefined {
    const versions = this.getSkillVersions(name);
    if (versions.length === 0) return undefined;

    const operator = constraint.charAt(0);
    const version = constraint.slice(1);

    switch (operator) {
      case "^":
        return versions.find((s) => this.satisfies(s.version, version, "^"));
      case "~":
        return versions.find((s) => this.satisfies(s.version, version, "~"));
      case ">":
      case ">=":
      case "<":
      case "<=":
      case "==":
        return versions.find((s) => this.satisfies(s.version, version, operator));
      default:
        return versions.find((s) => s.version === constraint);
    }
  }

  private satisfies(version: string, base: string, operator: string): boolean {
    const [baseMajor, baseMinor, basePatch] = base.split(".").map(Number);
    const [verMajor, verMinor, verPatch] = version.split(".").map(Number);

    switch (operator) {
      case "^":
        return (
          verMajor === baseMajor &&
          (verMinor > baseMinor || (verMinor === baseMinor && verPatch >= basePatch))
        );
      case "~":
        return verMajor === baseMajor && verMinor === baseMinor && verPatch >= basePatch;
      case ">":
        return this.compareVersions(version, base) > 0;
      case ">=":
        return this.compareVersions(version, base) >= 0;
      case "<":
        return this.compareVersions(version, base) < 0;
      case "<=":
        return this.compareVersions(version, base) <= 0;
      case "==":
        return version === base;
      default:
        return version === base;
    }
  }

  private compareVersions(a: string, b: string): number {
    const [aMajor, aMinor, aPatch] = a.split(".").map(Number);
    const [bMajor, bMinor, bPatch] = b.split(".").map(Number);

    if (aMajor !== bMajor) return aMajor - bMajor;
    if (aMinor !== bMinor) return aMinor - bMinor;
    return aPatch - bPatch;
  }

  private updateVersionCache(skill: Skill): void {
    if (!this.versionCache.has(skill.name)) {
      this.versionCache.set(skill.name, new Map());
    }
    this.versionCache.get(skill.name)!.set(skill.version, skill);
  }

  private clearVersionCache(name: string): void {
    this.versionCache.delete(name);
  }

  async loadFromDatabase(apiKeyId?: string): Promise<void> {
    const db = getDbInstance();
    const rows = apiKeyId
      ? db.prepare("SELECT * FROM skills WHERE api_key_id = ?").all(apiKeyId)
      : db.prepare("SELECT * FROM skills").all();

    for (const row of rows as any[]) {
      const skill: Skill = {
        id: row.id,
        apiKeyId: row.api_key_id,
        name: row.name,
        version: row.version,
        description: row.description || "",
        schema: JSON.parse(row.schema),
        handler: row.handler,
        enabled: row.enabled === 1,
        createdAt: new Date(row.created_at),
        updatedAt: new Date(row.updated_at),
      };
      this.registeredSkills.set(`${skill.name}@${skill.version}`, skill);
      this.updateVersionCache(skill);
    }
  }
}

export const skillRegistry = SkillRegistry.getInstance();
