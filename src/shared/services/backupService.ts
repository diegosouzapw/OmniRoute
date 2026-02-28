import fs from "fs/promises";
import path from "path";
import { resolveDataDir } from "@/lib/dataPaths";

const BACKUP_DIR = path.join(resolveDataDir(), "backups");
const MAX_BACKUPS_PER_TOOL = 5;

/**
 * Get backup directory for a specific tool
 */
function getToolBackupDir(toolId: string) {
  return path.join(BACKUP_DIR, toolId);
}

/**
 * Ensure backup directory exists for a tool
 */
async function ensureBackupDir(toolId: string) {
  const dir = getToolBackupDir(toolId);
  await fs.mkdir(dir, { recursive: true });
  return dir;
}

/**
 * Generate a backup filename with timestamp
 */
function makeBackupName(originalPath: string) {
  const ext = path.extname(originalPath);
  const base = path.basename(originalPath, ext);
  const ts = new Date().toISOString().replace(/[:.]/g, "-");
  return `${base}_${ts}${ext}`;
}

/**
 * Create a backup of a file before modifying it.
 * Returns the backup path, or null if the source doesn't exist.
 */
export async function createBackup(toolId: string, filePath: string) {
  try {
    await fs.access(filePath);
  } catch {
    // Source file doesn't exist — nothing to back up
    return null;
  }

  const dir = await ensureBackupDir(toolId);
  const backupName = makeBackupName(filePath);
  const backupPath = path.join(dir, backupName);

  await fs.copyFile(filePath, backupPath);

  // Save metadata alongside the backup
  const metaPath = backupPath + ".meta.json";
  await fs.writeFile(
    metaPath,
    JSON.stringify({
      originalPath: filePath,
      backupName,
      toolId,
      createdAt: new Date().toISOString(),
    })
  );

  // Enforce rotation (max backups per tool)
  await rotateBackups(toolId);

  return backupPath;
}

/**
 * Create backups for multiple files in one operation (e.g. Codex config.toml + auth.json).
 * Returns an array of backup paths.
 */
export async function createMultiBackup(toolId: string, filePaths: string[]) {
  const results: (string | null)[] = [];
  for (const filePath of filePaths) {
    const result = await createBackup(toolId, filePath);
    results.push(result);
  }
  return results;
}

/**
 * List all backups for a tool (sorted newest first).
 */
export async function listBackups(toolId: string) {
  const dir = getToolBackupDir(toolId);

  let entries;
  try {
    entries = await fs.readdir(dir);
  } catch {
    return [];
  }

  const metaFiles = entries.filter((e) => e.endsWith(".meta.json"));
  const backups: any[] = [];

  for (const metaFile of metaFiles) {
    try {
      const metaPath = path.join(dir, metaFile);
      const raw = await fs.readFile(metaPath, "utf-8");
      const meta = JSON.parse(raw);

      const backupFile = metaFile.replace(".meta.json", "");
      const backupPath = path.join(dir, backupFile);

      let size = 0;
      try {
        const stat = await fs.stat(backupPath);
        size = stat.size;
      } catch {
        // Backup file missing — skip
        continue;
      }

      backups.push({
        id: backupFile,
        toolId: meta.toolId,
        originalPath: meta.originalPath,
        createdAt: meta.createdAt,
        size,
      });
    } catch {
      // Corrupt meta — skip
    }
  }

  // Sort newest first
  backups.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  return backups;
}

/**
 * Restore a backup by its id (filename).
 */
export async function restoreBackup(toolId: string, backupId: string) {
  const dir = getToolBackupDir(toolId);
  const backupPath = path.join(dir, backupId);
  const metaPath = backupPath + ".meta.json";

  // Read metadata to find original path
  let meta;
  try {
    const raw = await fs.readFile(metaPath, "utf-8");
    meta = JSON.parse(raw);
  } catch {
    throw new Error(`Backup metadata not found: ${backupId}`);
  }

  // Verify actual backup file exists
  try {
    await fs.access(backupPath);
  } catch {
    throw new Error(`Backup file not found: ${backupId}`);
  }

  // Before restoring, back up the current file (so restore is reversible)
  await createBackup(toolId, meta.originalPath);

  // Copy backup over the original
  const targetDir = path.dirname(meta.originalPath);
  await fs.mkdir(targetDir, { recursive: true });
  await fs.copyFile(backupPath, meta.originalPath);

  return {
    restored: true,
    backupId,
    originalPath: meta.originalPath,
  };
}

/**
 * Delete a specific backup by its id.
 */
export async function deleteBackup(toolId: string, backupId: string) {
  const dir = getToolBackupDir(toolId);
  const backupPath = path.join(dir, backupId);
  const metaPath = backupPath + ".meta.json";

  try {
    await fs.unlink(backupPath);
  } catch {
    // Already gone
  }
  try {
    await fs.unlink(metaPath);
  } catch {
    // Already gone
  }

  return { deleted: true, backupId };
}

/**
 * Enforce max backups per tool — removes oldest when limit exceeded.
 * Groups by original file basename so each config file gets its own rotation.
 */
async function rotateBackups(toolId: string) {
  const all = await listBackups(toolId);

  // Group by original file basename
  const groups: Record<string, any[]> = {};
  for (const b of all) {
    const key = path.basename(b.originalPath);
    if (!groups[key]) groups[key] = [];
    groups[key].push(b);
  }

  for (const [, group] of Object.entries(groups) as [string, any[]][]) {
    // Already sorted newest first
    if (group.length > MAX_BACKUPS_PER_TOOL) {
      const toDelete = group.slice(MAX_BACKUPS_PER_TOOL);
      for (const old of toDelete) {
        await deleteBackup(toolId, old.id);
      }
    }
  }
}
