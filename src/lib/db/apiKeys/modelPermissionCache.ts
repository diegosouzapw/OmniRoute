const MODEL_PERMISSION_CACHE_TTL = 60 * 1000;

interface ModelPermissionCacheValue {
  allowed: boolean;
  timestamp: number;
  generation: number;
}

const _modelPermissionCache = new Map<string, ModelPermissionCacheValue>();

function isFresh(
  entry: ModelPermissionCacheValue,
  now: number,
  currentGeneration: number,
): boolean {
  if (entry.generation !== currentGeneration) return false;
  if (now - entry.timestamp >= MODEL_PERMISSION_CACHE_TTL) return false;
  return true;
}

export function getCachedModelPermission(
  cacheKey: string,
  now: number,
  catalogGeneration: number,
): boolean | undefined {
  const entry = _modelPermissionCache.get(cacheKey);
  if (!entry) return undefined;

  if (!isFresh(entry, now, catalogGeneration)) {
    _modelPermissionCache.delete(cacheKey);
    return undefined;
  }

  return entry.allowed;
}

export function setCachedModelPermission(
  cacheKey: string,
  allowed: boolean,
  now: number,
  catalogGeneration: number,
): void {
  _modelPermissionCache.set(cacheKey, {
    allowed,
    timestamp: now,
    generation: catalogGeneration,
  });
}

export function evictModelPermissionCache(): void {
  if (_modelPermissionCache.size <= 1000) return;
  const entriesToRemove = Math.floor(1000 * 0.2);
  let i = 0;
  for (const key of _modelPermissionCache.keys()) {
    if (i++ >= entriesToRemove) break;
    _modelPermissionCache.delete(key);
  }
}

export function clearModelPermissionCache(): void {
  _modelPermissionCache.clear();
}
