export function getWarmupBackoffUntil(streak: number): string {
  const baseMs = 5 * 60 * 1000;
  const capMs = 240 * 60 * 1000;
  const backoffMs = Math.min(baseMs * Math.pow(2, streak - 1), capMs);
  return new Date(Date.now() + backoffMs).toISOString();
}
