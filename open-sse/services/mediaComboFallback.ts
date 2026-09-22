/** Shared classification for image, video, and TTS combo fallback. */

export interface MediaComboFallbackTarget {
  connectionId?: string | null;
}

export interface ResolvedMediaComboFallbackTarget {
  target: MediaComboFallbackTarget;
  provider: string | null;
}

export function pinnedConnectionIds(target: {
  connectionId?: string | null;
  allowedConnectionIds?: string[] | null;
}): string[] | null {
  if (typeof target.connectionId === "string" && target.connectionId.trim()) {
    return [target.connectionId.trim()];
  }
  const allowed = Array.isArray(target.allowedConnectionIds)
    ? target.allowedConnectionIds.filter(
        (id): id is string => typeof id === "string" && id.trim().length > 0
      )
    : [];
  return allowed.length > 0 ? allowed : null;
}

/**
 * 400/401/403 from an upstream media dispatch is target-local when a later
 * target can move the request onto a different provider or an explicitly
 * different provider account. An unpinned target on the same provider is not
 * enough: credential selection could simply choose the account that just
 * failed, turning fallback into a duplicate paid/slow request.
 *
 * Client schema validation and API-key policy errors never reach this helper;
 * routes reject those before combo dispatch.
 */
export function hasDistinctMediaFallback({
  currentProvider,
  currentConnectionId,
  remaining,
}: {
  currentProvider: string;
  currentConnectionId?: string | null;
  remaining: ResolvedMediaComboFallbackTarget[];
}): boolean {
  for (const candidate of remaining) {
    if (!candidate.provider) continue;
    if (candidate.provider !== currentProvider) return true;

    const candidateConnectionId = candidate.target.connectionId?.trim();
    if (
      currentConnectionId &&
      candidateConnectionId &&
      candidateConnectionId !== currentConnectionId
    ) {
      return true;
    }
  }
  return false;
}

export function isTargetLocalMediaStatus(status: number): boolean {
  return status === 400 || status === 401 || status === 403;
}
