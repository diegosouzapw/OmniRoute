import { getDbInstance } from "./core";

const LOCAL_CORPUS_NAMESPACE = "local_corpus";
const LOCAL_CORPUS_ROOT_KEY = "root_path";

type KeyValueRow = {
  value?: string;
};

export interface LocalCorpusConfig {
  rootPath: string | null;
  configured: boolean;
}

export function getLocalCorpusRoot(): string | null {
  try {
    const row = getDbInstance()
      .prepare("SELECT value FROM key_value WHERE namespace = ? AND key = ?")
      .get(LOCAL_CORPUS_NAMESPACE, LOCAL_CORPUS_ROOT_KEY) as KeyValueRow | undefined;
    if (typeof row?.value !== "string") return null;
    const parsed = JSON.parse(row.value);
    return typeof parsed === "string" && parsed.trim() ? parsed : null;
  } catch {
    return null;
  }
}

export function setLocalCorpusRoot(rootPath: string): void {
  getDbInstance()
    .prepare("INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES (?, ?, ?)")
    .run(LOCAL_CORPUS_NAMESPACE, LOCAL_CORPUS_ROOT_KEY, JSON.stringify(rootPath));
}

export function clearLocalCorpusRoot(): void {
  getDbInstance()
    .prepare("DELETE FROM key_value WHERE namespace = ? AND key = ?")
    .run(LOCAL_CORPUS_NAMESPACE, LOCAL_CORPUS_ROOT_KEY);
}

export function getLocalCorpusConfig(): LocalCorpusConfig {
  const rootPath = getLocalCorpusRoot();
  return { rootPath, configured: rootPath !== null };
}
