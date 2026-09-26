export interface ModelTestTarget {
  providerId: string;
  modelId: string;
}

export interface ComboTestTarget {
  comboName: string;
}

export interface ModelTestBatch {
  providerId: string;
  modelIds: string[];
}

/** `/api/models/test-all` accepts at most this many model ids per call. */
export const MAX_MODELS_PER_BATCH = 100;
/** Provider batches (or combo tests) allowed in flight at once. */
export const BULK_CONCURRENCY = 2;
/** Bulk runs above these sizes ask for confirmation first. */
export const BULK_CONFIRM_MODEL_THRESHOLD = 50;
export const BULK_CONFIRM_COMBO_THRESHOLD = 20;

export function dedupeModelTargets(targets: ModelTestTarget[]): ModelTestTarget[] {
  const seen = new Set<string>();
  return targets.filter((target) => {
    // NUL cannot appear in either id, so the joined key is unambiguous.
    const key = `${target.providerId}\u0000${target.modelId}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export function dedupeComboTargets(targets: ComboTestTarget[]): ComboTestTarget[] {
  const seen = new Set<string>();
  return targets.filter((target) => {
    if (seen.has(target.comboName)) return false;
    seen.add(target.comboName);
    return true;
  });
}

/** Group targets per provider (first-seen order) and split each group into capped batches. */
export function buildModelBatches(
  targets: ModelTestTarget[],
  maxPerBatch = MAX_MODELS_PER_BATCH
): ModelTestBatch[] {
  const size = Number.isInteger(maxPerBatch) && maxPerBatch > 0 ? maxPerBatch : 1;
  const byProvider = new Map<string, string[]>();
  for (const target of targets) {
    const modelIds = byProvider.get(target.providerId) ?? [];
    modelIds.push(target.modelId);
    byProvider.set(target.providerId, modelIds);
  }

  const batches: ModelTestBatch[] = [];
  for (const [providerId, modelIds] of byProvider) {
    for (let index = 0; index < modelIds.length; index += size) {
      batches.push({ providerId, modelIds: modelIds.slice(index, index + size) });
    }
  }
  return batches;
}

export async function runModelBatches(
  batches: ModelTestBatch[],
  signal: AbortSignal,
  worker: (batch: ModelTestBatch) => Promise<void>
): Promise<void> {
  const providerGroups = new Map<string, ModelTestBatch[]>();
  for (const batch of batches) {
    const group = providerGroups.get(batch.providerId) ?? [];
    group.push(batch);
    providerGroups.set(batch.providerId, group);
  }
  await runWithConcurrency(
    [...providerGroups.values()],
    BULK_CONCURRENCY,
    signal,
    async (group) => {
      for (const batch of group) {
        if (signal.aborted) return;
        await worker(batch);
      }
    }
  );
}

/** Run `worker` over `items` with at most `limit` in flight; stop scheduling once `signal` aborts. */
export async function runWithConcurrency<T>(
  items: T[],
  limit: number,
  signal: AbortSignal,
  worker: (item: T) => Promise<void>
): Promise<void> {
  let index = 0;
  const executing = new Set<Promise<void>>();

  while (index < items.length && !signal.aborted) {
    while (executing.size < limit && index < items.length && !signal.aborted) {
      const item = items[index++];
      const task: Promise<void> = worker(item).finally(() => {
        executing.delete(task);
      });
      executing.add(task);
    }
    if (executing.size > 0) {
      await Promise.race(executing);
    }
  }
  await Promise.all(executing);
}
