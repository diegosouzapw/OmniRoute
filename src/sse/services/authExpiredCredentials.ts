export function buildAllExpiredCredentials(connections: Array<{ testStatus: string | null }>) {
  const statusCounts = new Map<string, number>();
  for (const connection of connections) {
    const key = (connection.testStatus || "expired").trim().toLowerCase() || "expired";
    statusCounts.set(key, (statusCounts.get(key) || 0) + 1);
  }
  const expiredStatus =
    [...statusCounts.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] || "expired";
  return {
    allExpired: true as const,
    expiredCount: connections.length,
    expiredStatus,
  };
}
