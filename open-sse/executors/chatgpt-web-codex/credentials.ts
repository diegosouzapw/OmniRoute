export type ChatGptWebCodexSecrets = {
  cookie?: string;
  storageState?: Record<string, unknown>;
  runtimeKey?: string;
};

const VERSION = 2;

function normalizedCookie(value: string): string {
  return value.trim().replace(/^cookie\s*:\s*/i, "");
}

export function encodeChatGptWebCodexSecrets(secrets: ChatGptWebCodexSecrets): string {
  const cookie = secrets.cookie ? normalizedCookie(secrets.cookie) : "";
  const storageState = secrets.storageState;
  if (!cookie && (!storageState || typeof storageState !== "object")) {
    throw new Error("ChatGPT Cookie or verified browser storage state is required");
  }
  return JSON.stringify({
    version: VERSION,
    ...(storageState ? { storageState } : { cookie }),
    ...(secrets.runtimeKey?.trim() ? { runtimeKey: secrets.runtimeKey.trim() } : {}),
  });
}

export function decodeChatGptWebCodexSecrets(value: string): ChatGptWebCodexSecrets {
  const trimmed = value.trim();
  if (!trimmed) throw new Error("ChatGPT Web (Codex) credentials are missing");
  try {
    const parsed = JSON.parse(trimmed) as Record<string, unknown>;
    if (
      parsed.version === VERSION &&
      parsed.storageState &&
      typeof parsed.storageState === "object"
    ) {
      return {
        storageState: parsed.storageState as Record<string, unknown>,
        ...(typeof parsed.runtimeKey === "string" && parsed.runtimeKey.trim()
          ? { runtimeKey: parsed.runtimeKey.trim() }
          : {}),
      };
    }
    if ((parsed.version === VERSION || parsed.version === 1) && typeof parsed.cookie === "string") {
      const cookie = normalizedCookie(parsed.cookie);
      if (!cookie) throw new Error("ChatGPT Cookie is missing");
      return {
        cookie,
        ...(typeof parsed.runtimeKey === "string" && parsed.runtimeKey.trim()
          ? { runtimeKey: parsed.runtimeKey.trim() }
          : {}),
      };
    }
  } catch (error) {
    if (error instanceof SyntaxError) return { cookie: normalizedCookie(trimmed) };
    throw error;
  }
  return { cookie: normalizedCookie(trimmed) };
}
