import { join } from "path";
import { getDbInstance } from "@/lib/db/core";
import { logger } from "../../../open-sse/utils/logger";
import { TurbovecIdMapIndex } from "../../../packages/turbovec-node";
import { getSettings } from "@/lib/db/settings";
import { fs } from "fs";

const log = logger("VECTOR_STORE_TURBOVEC");

const TURBOVEC_FILE_PATH = join(process.env.DATA_DIR || process.env.HOME + "/.omniroute", "turbovec.tvim");

let turbovecIndex: TurbovecIdMapIndex | null = null;
let currentDim = 1536;

export function getTurbovecIndex(dim: number): TurbovecIdMapIndex {
  if (turbovecIndex && currentDim !== dim) {
    // dimension changed, we might need to recreate, but let's assume it doesn't change on the fly easily
    turbovecIndex = null;
  }
  if (!turbovecIndex) {
    try {
      turbovecIndex = new TurbovecIdMapIndex().load(TURBOVEC_FILE_PATH);
      currentDim = dim;
    } catch {
      turbovecIndex = new TurbovecIdMapIndex(dim, 4);
      currentDim = dim;
    }
  }
  return turbovecIndex;
}

export async function upsertTurbovecPoint(id: string, vector: Float32Array): Promise<void> {
  const db = getDbInstance();
  const row = db.prepare("SELECT rowid FROM memories WHERE id = ?").get(id) as { rowid: bigint } | undefined;
  if (!row) {
    log.warn("memory.turbovec.upsert.norow", { id });
    return;
  }
  const index = getTurbovecIndex(vector.length);
  const idsIn = new BigInt64Array(1);
  idsIn[0] = typeof row.rowid === 'bigint' ? row.rowid : BigInt(row.rowid);
  const vecsIn = new Float32Array(vector.length);
  vecsIn.set(vector);
  index.addWithIds(vecsIn, idsIn);
  index.sync(TURBOVEC_FILE_PATH);
}

export async function deleteTurbovecPoint(id: string): Promise<void> {
  const db = getDbInstance();
  const row = db.prepare("SELECT rowid FROM memories WHERE id = ?").get(id) as { rowid: bigint } | undefined;
  if (!row) return;
  
  if (turbovecIndex) {
    turbovecIndex.remove(Number(row.rowid));
    turbovecIndex.sync(TURBOVEC_FILE_PATH);
  }
}

export async function searchTurbovecMemory(vector: Float32Array, limit: number): Promise<{ memoryId: string; distance: number; score: number }[]> {
  const index = getTurbovecIndex(vector.length);
  const { scores, ids } = index.search(vector, limit);
  
  const db = getDbInstance();
  const results = [];
  for (let i = 0; i < ids.length; i++) {
    const row = db.prepare("SELECT id FROM memories WHERE rowid = ?").get(ids[i]) as { id: string } | undefined;
    if (row) {
      results.push({
         memoryId: row.id,
         distance: 1 - scores[i], // approximation
         score: scores[i]
      });
    }
  }
  return results;
}
