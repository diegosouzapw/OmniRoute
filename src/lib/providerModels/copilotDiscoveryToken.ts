function nonEmpty(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed ? trimmed : null;
}

export function resolveCopilotDiscoveryToken(input: {
  accessToken?: unknown;
  copilotToken?: unknown;
}): string | null {
  return nonEmpty(input.accessToken) || nonEmpty(input.copilotToken);
}
