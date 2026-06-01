import { Skill, SkillSchema } from "./types";
import { SkillCreateInputSchema } from "./schemas";
import { getDbInstance } from "../db/core";
import { randomUUID } from "crypto";
import { logger } from "../../../open-sse/utils/logger.ts";

const log = logger("SKILLS");

class SkillRegistry {
  private static instance: SkillRegistry;
  private registeredSkills: Map<string, Skill> = new Map();
  private versionCache: Map<string, Map<string, Skill>> = new Map();
  private lastLoaded: number = 0;
  private loadedAll: boolean = false;
  private loadedApiKeyIds: Set<string> = new Set();
  private readonly cacheTTL: number = 60_000; // 60 seconds
  private pendingLoad: Promise<void> | null = null; // dedupes concurrent cache fills

  private constructor() {}

  static getInstance(): SkillRegistry {
    if (!SkillRegistry.instance) {
      SkillRegistry.instance = new SkillRegistry();
    }
    return SkillRegistry.instance;
  }

  private isCacheStale(): boolean {
    return Date.now() - this.lastLoaded > this.cacheTTL;
  }

  invalidateCache(): void {
    this.lastLoaded = 0;
    this.loadedAll = false;
    this.loadedApiKeyIds.clear();
  }

  private cacheKey(skill: Pick<Skill, "apiKeyId" | "name" | "version">): string {
    return `${skill.apiKeyId}:${skill.name}@${skill.version}`;
  }

  private cacheSkill(skill: Skill): void {
    this.registeredSkills.set(this.cacheKey(skill), skill);
    this.updateVersionCache(skill);
  }

  private removeCachedSkills(predicate: (skill: Skill) => boolean): void {
    const affectedNames = new Set<string>();
    for (const [key, skill] of this.registeredSkills.entries()) {
      if (predicate(skill)) {
        affectedNames.add(skill.name);
        this.registeredSkills.delete(key);
      }
    }
    affectedNames.forEach((name) => this.rebuildVersionCache(name));
  }

  async register(skillData: {
    name: string;
    version?: string;
    description?: string;
    schema: SkillSchema;
    handler: string;
    enabled?: boolean;
    apiKeyId: string;
    mode?: "on" | "off" | "auto";
    sourceProvider?: "skillsmp" | "skillssh" | "local";
    tags?: string[];
    installCount?: number;
  }): Promise<Skill> {
    const {
      apiKeyId: _apiKeyId,
      mode: _mode,
      sourceProvider: _sourceProvider,
      tags: _tags,
      installCount: _installCount,
      ...parseableData
    } = skillData;
    const parsed = SkillCreateInputSchema.parse(parseableData);
    const db = getDbInstance();
    const id = randomUUID();
    const now = new Date();

    db.prepare(
      `INSERT INTO skills (id, api_key_id, name, version, description, schema, handler, enabled, mode, source_provider, tags, install_count, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    ).run(
      id,
      skillData.apiKeyId,
      parsed.name,
      parsed.version,
      parsed.description || null,
      JSON.stringify(parsed.schema),
      parsed.handler,
      parsed.enabled ? 1 : 0,
      skillData.mode || (parsed.enabled ? "on" : "off"),
      skillData.sourceProvider || null,
      JSON.stringify(skillData.tags || []),
      typeof skillData.installCount === "number" ? Math.max(0, skillData.installCount) : 0,
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
      mode: skillData.mode || (parsed.enabled ? "on" : "off"),
      sourceProvider: skillData.sourceProvider,
      tags: skillData.tags || [],
      installCount:
        typeof skillData.installCount === "number" ? Math.max(0, skillData.installCount) : 0,
      createdAt: now,
      updatedAt: now,
    };

    this.cacheSkill(skill);
    this.invalidateCache();

    return skill;
  }

  async unregister(name: string, version?: string, apiKeyId?: string): Promise<boolean> {
    const db = getDbInstance();

    if (version) {
      const skill = Array.from(this.registeredSkills.values()).find(
        (candidate) =>
          candidate.name === name &&
          candidate.version === version &&
          (!apiKeyId || candidate.apiKeyId === apiKeyId)
      );
      if (skill && (!apiKeyId || skill.apiKeyId === apiKeyId)) {
        db.prepare("DELETE FROM skills WHERE id = ?").run(skill.id);
        this.registeredSkills.delete(this.cacheKey(skill));
        this.rebuildVersionCache(name);
        this.invalidateCache();
        return true;
      }
    } else {
      const deleted = db
        .prepare("DELETE FROM skills WHERE name = ? AND (? IS NULL OR api_key_id = ?)")
        .run(name, apiKeyId || null, apiKeyId || null);

      if (deleted.changes > 0) {
        this.removeCachedSkills(
          (skill) => skill.name === name && (!apiKeyId || skill.apiKeyId === apiKeyId)
        );
        this.invalidateCache();
        return true;
      }
    }

    return false;
  }

  async unregisterById(id: string): Promise<boolean> {
    const db = getDbInstance();
    const deleted = db.prepare("DELETE FROM skills WHERE id = ?").run(id);
    if (deleted.changes > 0) {
      const affectedNames = new Set<string>();
      const keysToDelete = Array.from(this.registeredSkills.entries())
        .filter(([, skill]) => skill.id === id)
        .map(([key, skill]) => {
          affectedNames.add(skill.name);
          return key;
        });
      keysToDelete.forEach((k) => this.registeredSkills.delete(k));
      affectedNames.forEach((name) => this.rebuildVersionCache(name));
      this.invalidateCache();
      return true;
    }
    return false;
  }

  list(apiKeyId?: string): Skill[] {
    log.debug("skills.registry.list", { apiKeyId, cached: !this.isCacheStale() });
    if (apiKeyId) {
      return Array.from(this.registeredSkills.values()).filter((s) => s.apiKeyId === apiKeyId);
    }
    return Array.from(this.registeredSkills.values());
  }

  getSkill(identifier: string, apiKeyId?: string): Skill | undefined {
    const matchesScope = (skill: Skill) => !apiKeyId || skill.apiKeyId === apiKeyId;
    const skills = Array.from(this.registeredSkills.values()).filter(matchesScope);

    const byId = skills.find((skill) => skill.id === identifier);
    if (byId) return byId;

    const [name, version] = identifier.includes("@")
      ? identifier.split("@", 2)
      : [identifier, undefined];
    if (version) {
      return skills.find((skill) => skill.name === name && skill.version === version);
    }

    return skills
      .filter((skill) => skill.name === identifier)
      .sort((a, b) => this.compareVersions(b.version, a.version))[0];
  }

  getSkillVersions(name: string, apiKeyId?: string): Skill[] {
    return Array.from(this.registeredSkills.values())
      .filter((skill) => skill.name === name && (!apiKeyId || skill.apiKeyId === apiKeyId))
      .sort((a, b) => this.compareVersions(b.version, a.version));
  }

  resolveVersion(name: string, constraint: string, apiKeyId?: string): Skill | undefined {
    const versions = this.getSkillVersions(name, apiKeyId);
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

  private rebuildVersionCache(name: string): void {
    this.clearVersionCache(name);
    for (const skill of this.registeredSkills.values()) {
      if (skill.name === name) {
        this.updateVersionCache(skill);
      }
    }
  }

  async loadFromDatabase(apiKeyId?: string): Promise<void> {
    if (this.pendingLoad) {
      await this.pendingLoad;
      return;
    }
    const cacheHasScope = apiKeyId
      ? this.loadedAll || this.loadedApiKeyIds.has(apiKeyId)
      : this.loadedAll;
    if (cacheHasScope && !this.isCacheStale()) return;

    this.pendingLoad = (async () => {
      try {
        log.debug("skills.registry.loadFromDatabase", { cached: false });
        const db = getDbInstance();
        const rows = apiKeyId
          ? db.prepare("SELECT * FROM skills WHERE api_key_id = ?").all(apiKeyId)
          : db.prepare("SELECT * FROM skills").all();

        if (apiKeyId) {
          this.removeCachedSkills((skill) => skill.apiKeyId === apiKeyId);
        } else {
          this.registeredSkills.clear();
          this.versionCache.clear();
        }

        for (const row of rows as any[]) {
          const tags = (() => {
            try {
              if (typeof row.tags !== "string") return [];
              const parsed = JSON.parse(row.tags);
              return Array.isArray(parsed) ? parsed.filter((item) => typeof item === "string") : [];
            } catch {
              return [];
            }
          })();

          const skill: Skill = {
            id: row.id,
            apiKeyId: row.api_key_id,
            name: row.name,
            version: row.version,
            description: row.description || "",
            schema: JSON.parse(row.schema),
            handler: row.handler,
            enabled: row.enabled === 1,
            mode: row.mode === "off" || row.mode === "auto" ? row.mode : "on",
            sourceProvider:
              row.source_provider === "skillsmp" || row.source_provider === "skillssh"
                ? row.source_provider
                : row.source_provider
                  ? "local"
                  : undefined,
            tags,
            installCount: typeof row.install_count === "number" ? row.install_count : 0,
            createdAt: new Date(row.created_at),
            updatedAt: new Date(row.updated_at),
          };
          this.cacheSkill(skill);
        }
        if (apiKeyId) {
          this.loadedApiKeyIds.add(apiKeyId);
        } else {
          this.loadedAll = true;
          this.loadedApiKeyIds.clear();
        }
        this.lastLoaded = Date.now();
      } catch (err: any) {
        log.error("loadFromDatabase error:", err);
        throw err;
      } finally {
        this.pendingLoad = null;
      }
    })();
    try {
      await this.pendingLoad;
    } finally {
      this.pendingLoad = null;
    }
  }

  async setEnabledById(id: string, apiKeyId: string, enabled: boolean): Promise<Skill | undefined> {
    const db = getDbInstance();
    const now = new Date();
    const updated = db
      .prepare(
        "UPDATE skills SET enabled = ?, mode = ?, updated_at = ? WHERE id = ? AND api_key_id = ?"
      )
      .run(enabled ? 1 : 0, enabled ? "on" : "off", now.toISOString(), id, apiKeyId);

    if (updated.changes === 0) return undefined;

    const skill = this.getSkill(id, apiKeyId);
    if (skill) {
      const mode: Skill["mode"] = enabled ? "on" : "off";
      const updatedSkill: Skill = { ...skill, enabled, mode, updatedAt: now };
      this.cacheSkill(updatedSkill);
      return updatedSkill;
    }

    this.invalidateCache();
    await this.loadFromDatabase(apiKeyId);
    return this.getSkill(id, apiKeyId);
  }
}

export const skillRegistry = SkillRegistry.getInstance();
