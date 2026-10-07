/**
 * ObsidianBackend - Optional backend for Obsidian Vault
 * Reads/writes memories as Markdown files with YAML frontmatter
 */

import { logger } from "../../../open-sse/utils/logger.ts";
import type {
  MemoryBackend,
  CreateMemoryInput,
  MemoryFilter,
  SearchConfig,
  HealthCheckResult,
  Memory,
} from "./backend";
import { MemoryType } from "./types";

const log = logger("OBSIDIAN_BACKEND");

/** Optional backend for Obsidian Vault */
export class ObsidianBackend implements MemoryBackend {
  readonly id = "obsidian";
  readonly displayName = "Obsidian Vault";
  // isPrimary is managed by MemoryManager, not the backend itself

  private vaultPath: string;
  private initialized = false;

  constructor(vaultPath: string) {
    this.vaultPath = vaultPath;
  }

  async initialize(): Promise<void> {
    // Verify vault path exists
    const fs = await import("fs/promises");
    try {
      await fs.access(this.vaultPath);
      this.initialized = true;
      log.info("obsidian.backend.initialized", { vaultPath: this.vaultPath });
    } catch {
      throw new Error(`Obsidian vault not found at: ${this.vaultPath}`);
    }
  }

  async shutdown(): Promise<void> {
    this.initialized = false;
    log.info("obsidian.backend.shutdown");
  }

  async create(input: CreateMemoryInput): Promise<Memory> {
    if (!this.initialized) await this.initialize();

    const fs = await import("fs/promises");
    const path = await import("path");

    const id = crypto.randomUUID();
    const fileName = `${input.key}.md`;
    const filePath = path.join(this.vaultPath, fileName);

    const frontmatter = [
      "---",
      `id: ${id}`,
      `apiKeyId: ${input.apiKeyId}`,
      `sessionId: ${input.sessionId}`,
      `type: ${input.type}`,
      `createdAt: ${new Date().toISOString()}`,
      `updatedAt: ${new Date().toISOString()}`,
      `expiresAt: ${input.expiresAt?.toISOString() || "null"}`,
      "---",
      "",
    ].join("\n");

    const content = frontmatter + input.content;

    await fs.writeFile(filePath, content, "utf-8");

    return {
      id,
      apiKeyId: input.apiKeyId,
      sessionId: input.sessionId,
      type: input.type,
      key: input.key,
      content: input.content,
      metadata: input.metadata || {},
      createdAt: new Date(),
      updatedAt: new Date(),
      expiresAt: input.expiresAt || null,
      accessCount: 0,
      lastAccessedAt: null,
    };
  }

  async get(id: string): Promise<Memory | null> {
    if (!this.initialized) await this.initialize();

    const fs = await import("fs/promises");
    const path = await import("path");

    // Find file by id in frontmatter
    const files = await fs.readdir(this.vaultPath);

    for (const file of files) {
      if (!file.endsWith(".md")) continue;

      const filePath = path.join(this.vaultPath, file);
      const content = await fs.readFile(filePath, "utf-8");

      const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
      if (!frontmatterMatch) continue;

      const frontmatter = frontmatterMatch[1];
      const idMatch = frontmatter.match(/^id:\s*(.+)$/m);
      if (idMatch && idMatch[1].trim() === id) {
        const body = content.replace(/^---\n[\s\S]*?\n---\n/, "");
        return this.parseMemory(frontmatter, body, id);
      }
    }

    return null;
  }

  async update(id: string, updates: Partial<Omit<Memory, "id" | "createdAt">>): Promise<boolean> {
    if (!this.initialized) await this.initialize();

    const fs = await import("fs/promises");
    const path = await import("path");

    const files = await fs.readdir(this.vaultPath);

    for (const file of files) {
      if (!file.endsWith(".md")) continue;

      const filePath = path.join(this.vaultPath, file);
      const content = await fs.readFile(filePath, "utf-8");

      const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
      if (!frontmatterMatch) continue;

      const frontmatter = frontmatterMatch[1];
      const idMatch = frontmatter.match(/^id:\s*(.+)$/m);
      if (idMatch && idMatch[1].trim() === id) {
        let newFrontmatter = frontmatter;
        let newBody = content.replace(/^---\n[\s\S]*?\n---\n/, "");

        if (updates.content !== undefined) {
          newBody = updates.content;
        }

        // Update frontmatter fields
        const lines = newFrontmatter.split("\n").map((line) => {
          if (updates.type !== undefined && line.startsWith("type:"))
            return `type: ${updates.type}`;
          if (updates.key !== undefined && line.startsWith("key:")) return `key: ${updates.key}`;
          if (updates.metadata !== undefined && line.startsWith("metadata:"))
            return `metadata: ${JSON.stringify(updates.metadata)}`;
          if (updates.expiresAt !== undefined && line.startsWith("expiresAt:"))
            return `expiresAt: ${updates.expiresAt?.toISOString() || "null"}`;
          return line;
        });

        newFrontmatter = lines.join("\n");
        newFrontmatter = newFrontmatter.replace(
          /^updatedAt:.*$/m,
          `updatedAt: ${new Date().toISOString()}`
        );

        const newContent = `---\n${newFrontmatter}\n---\n\n${newBody}`;
        await fs.writeFile(filePath, newContent, "utf-8");
        return true;
      }
    }

    return false;
  }

  async delete(id: string): Promise<boolean> {
    if (!this.initialized) await this.initialize();

    const fs = await import("fs/promises");
    const path = await import("path");

    const files = await fs.readdir(this.vaultPath);

    for (const file of files) {
      if (!file.endsWith(".md")) continue;

      const filePath = path.join(this.vaultPath, file);
      const content = await fs.readFile(filePath, "utf-8");

      const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
      if (!frontmatterMatch) continue;

      const frontmatter = frontmatterMatch[1];
      const idMatch = frontmatter.match(/^id:\s*(.+)$/m);
      if (idMatch && idMatch[1].trim() === id) {
        await fs.unlink(filePath);
        return true;
      }
    }

    return false;
  }

  async list(
    filter: MemoryFilter
  ): Promise<{ data: Memory[]; total: number; byType: Record<string, number> }> {
    if (!this.initialized) await this.initialize();

    const fs = await import("fs/promises");
    const path = await import("path");

    const files = await fs.readdir(this.vaultPath);
    const memories: Memory[] = [];
    const byType: Record<string, number> = {};

    for (const file of files) {
      if (!file.endsWith(".md")) continue;

      const filePath = path.join(this.vaultPath, file);
      const content = await fs.readFile(filePath, "utf-8");

      const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
      if (!frontmatterMatch) continue;

      const memory = this.parseMemory(
        frontmatterMatch[1],
        content.replace(/^---\n[\s\S]*?\n---\n/, ""),
        ""
      );
      if (memory) {
        // Apply filters
        if (filter.apiKeyId && memory.apiKeyId !== filter.apiKeyId) continue;
        if (filter.type && memory.type !== filter.type) continue;
        if (filter.sessionId && memory.sessionId !== filter.sessionId) continue;
        if (filter.category && memory.metadata.category !== filter.category) continue;

        memories.push(memory);
        byType[memory.type] = (byType[memory.type] || 0) + 1;
      }
    }

    // Sort by createdAt desc
    memories.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

    // Apply pagination
    const offset = filter.offset || 0;
    const limit = filter.limit || 100;
    const paginated = memories.slice(offset, offset + limit);

    return { data: paginated, total: memories.length, byType };
  }

  async search(config: SearchConfig): Promise<Memory[]> {
    if (!this.initialized) await this.initialize();

    const fs = await import("fs/promises");
    const path = await import("path");

    const files = await fs.readdir(this.vaultPath);
    const memories: Memory[] = [];

    for (const file of files) {
      if (!file.endsWith(".md")) continue;

      const filePath = path.join(this.vaultPath, file);
      const content = await fs.readFile(filePath, "utf-8");

      const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
      if (!frontmatterMatch) continue;

      const body = content.replace(/^---\n[\s\S]*?\n---\n/, "");

      // Simple text search
      if (
        body.toLowerCase().includes(config.query.toLowerCase()) ||
        file.toLowerCase().includes(config.query.toLowerCase())
      ) {
        const memory = this.parseMemory(frontmatterMatch[1], body, "");
        if (memory) {
          if (config.apiKeyId && memory.apiKeyId !== config.apiKeyId) continue;
          memories.push(memory);
        }
      }
    }

    return memories.slice(0, config.limit || 50);
  }

  async health(): Promise<HealthCheckResult> {
    const start = Date.now();
    try {
      const fs = await import("fs/promises");
      await fs.access(this.vaultPath);
      return { ok: true, latencyMs: Date.now() - start };
    } catch (e) {
      return { ok: false, latencyMs: Date.now() - start, error: String(e) };
    }
  }

  private parseMemory(frontmatter: string, body: string, fallbackId: string): Memory | null {
    const getField = (key: string): string | null => {
      const match = frontmatter.match(new RegExp(`^${key}:\\s*(.+)$`, "m"));
      return match ? match[1].trim() : null;
    };

    const id = getField("id") || fallbackId || crypto.randomUUID();
    const apiKeyId = getField("apiKeyId") || "";
    const sessionId = getField("sessionId") || "";
    const type = (getField("type") as MemoryType) || MemoryType.FACTUAL;
    const key = getField("key") || "";
    const createdAt = getField("createdAt") ? new Date(getField("createdAt")!) : new Date();
    const updatedAt = getField("updatedAt") ? new Date(getField("updatedAt")!) : new Date();
    const expiresAt =
      getField("expiresAt") && getField("expiresAt") !== "null"
        ? new Date(getField("expiresAt")!)
        : null;
    const accessCount = parseInt(getField("accessCount") || "0", 10);
    const lastAccessedAt =
      getField("lastAccessedAt") && getField("lastAccessedAt") !== "null"
        ? new Date(getField("lastAccessedAt")!)
        : null;

    let metadata: Record<string, unknown> = {};
    const metadataStr = getField("metadata");
    if (metadataStr) {
      try {
        metadata = JSON.parse(metadataStr);
      } catch {}
    }

    return {
      id,
      apiKeyId,
      sessionId,
      type,
      key,
      content: body,
      metadata,
      createdAt,
      updatedAt,
      expiresAt,
      accessCount,
      lastAccessedAt,
    };
  }
}

export const createObsidianBackend = (vaultPath: string) => new ObsidianBackend(vaultPath);
