// Stubbed functions for session account affinity (PR 1887 pending)

export function getSessionAccountAffinity(sessionKey: string, provider: string): any {
  return null;
}

export function upsertSessionAccountAffinity(
  sessionKey: string,
  provider: string,
  connectionId: string,
  now: number = Date.now()
): void {}

export function touchSessionAccountAffinity(
  sessionKey: string,
  provider: string,
  now: number = Date.now()
): void {}

export function deleteSessionAccountAffinity(sessionKey: string, provider: string): void {}

export function cleanupStaleSessionAccountAffinities(
  ttlMs: number = 30 * 60 * 1000,
  now: number = Date.now()
): number {
  return 0;
}

export function startSessionAccountAffinityCleanup(): void {}

export function stopSessionAccountAffinityCleanupForTests(): void {}
