// #6499 — a fresh API-key connection defaults its name to "main". The backend
// upserts connections by (provider, name), so opening the modal a second time for
// the same provider with the same "main" name silently OVERWRITES the first
// connection. Deriving a unique default from the existing connection count keeps
// the first connection ("main") backward-compatible while giving each subsequent
// one a distinct name ("main-2", "main-3", …).
export function computeConnectionDefaultName(existingConnectionCount?: number): string {
  const count = existingConnectionCount ?? 0;
  return count <= 0 ? "main" : `main-${count + 1}`;
}
