// #6499 — a fresh API-key connection defaults its name to "main". The backend
// upserts connections by (provider, name), so opening the modal a second time for
// the same provider with the same "main" name silently OVERWRITES the first
// connection. Deriving a unique default from the existing connection count keeps
// the first connection ("main") backward-compatible while giving each subsequent
// one a distinct name ("main-2", "main-3", …).
export function computeConnectionDefaultName(
  existingConnectionCountOrConnections?: number | string[] | { name?: string }[]
): string {
  if (Array.isArray(existingConnectionCountOrConnections)) {
    const names = new Set(
      existingConnectionCountOrConnections
        .map((item) => (typeof item === "string" ? item : item?.name ?? ""))
        .filter(Boolean)
    );
    if (!names.has("main")) return "main";
    let index = 2;
    while (names.has(`main-${index}`)) {
      index++;
    }
    return `main-${index}`;
  }

  const count = existingConnectionCountOrConnections ?? 0;
  return count <= 0 ? "main" : `main-${count + 1}`;
}
