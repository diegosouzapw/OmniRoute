import { getLocalCorpusRoot } from "../db/localCorpus";
import { getDefaultLocalCorpusStatus, LocalCorpusIndex } from "./index";

let sharedRoot: string | null = null;
let sharedIndex: LocalCorpusIndex | null = null;

export function resetLocalCorpusIndex(): void {
  sharedRoot = null;
  sharedIndex = null;
}

function getConfiguredIndex(): LocalCorpusIndex {
  const rootPath = getLocalCorpusRoot();
  if (!rootPath) {
    throw new Error("Local corpus is not configured. Set a root in Settings > Context Sources");
  }
  if (!sharedIndex || sharedRoot !== rootPath) {
    sharedRoot = rootPath;
    sharedIndex = new LocalCorpusIndex(rootPath);
  }
  return sharedIndex;
}

export function getConfiguredLocalCorpusStatus() {
  return getLocalCorpusRoot() ? getConfiguredIndex().getStatus() : getDefaultLocalCorpusStatus();
}

export async function searchConfiguredLocalCorpus(
  query: string,
  options: { limit?: number; refresh?: boolean } = {}
) {
  return getConfiguredIndex().search(query, options);
}

export async function readConfiguredLocalCorpus(
  relativePath: string,
  options: { startLine?: number; endLine?: number } = {}
) {
  return getConfiguredIndex().read(relativePath, options);
}
