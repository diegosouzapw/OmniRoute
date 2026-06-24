export function snapshotEnv(names: string[]) {
  return Object.fromEntries(names.map((name) => [name, process.env[name]]));
}

export function restoreEnv(
  snapshot: Record<string, string | undefined>,
  names = Object.keys(snapshot)
) {
  for (const name of names) {
    const value = snapshot[name];
    if (value === undefined) {
      delete process.env[name];
    } else {
      process.env[name] = value;
    }
  }
}
