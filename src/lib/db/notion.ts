import { getDbInstance } from "./core";

const NOTION_NAMESPACE = "notion";
const NOTION_TOKEN_KEY = "integration_token";

type KeyValueRow = {
  value?: string;
};

export function getNotionToken(): string | null {
  try {
    const db = getDbInstance();
    const row = db
      .prepare("SELECT value FROM key_value WHERE namespace = ? AND key = ?")
      .get(NOTION_NAMESPACE, NOTION_TOKEN_KEY) as KeyValueRow | undefined;
    return typeof row?.value === "string" ? JSON.parse(row.value) : null;
  } catch {
    return null;
  }
}

export function setNotionToken(token: string): void {
  try {
    const db = getDbInstance();
    db.prepare(
      "INSERT OR IGNORE INTO key_value (namespace, key, value) VALUES (?, ?, ?)"
    ).run(NOTION_NAMESPACE, NOTION_TOKEN_KEY, JSON.stringify(token));
  } catch {
    // Non-fatal — token still works in-memory if persistence fails.
  }
}

export function clearNotionToken(): void {
  try {
    const db = getDbInstance();
    db.prepare("DELETE FROM key_value WHERE namespace = ? AND key = ?").run(
      NOTION_NAMESPACE,
      NOTION_TOKEN_KEY
    );
  } catch {
    // Non-fatal.
  }
}

export function getNotionConfig(): { token: string | null; connected: boolean } {
  const token = getNotionToken();
  return { token, connected: token !== null && token.length > 0 };
}
