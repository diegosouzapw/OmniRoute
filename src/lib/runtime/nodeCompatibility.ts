import { createRequire } from "node:module";

const require = createRequire(import.meta.url);

function loadBetterSqlite3() {
  require("better-sqlite3");
}

export function getNodeCompatibility(
  loadNativeModule: () => void = loadBetterSqlite3,
  nodeVersion = process.version
) {
  try {
    loadNativeModule();
    return { nodeVersion, nodeCompatible: true };
  } catch {
    return { nodeVersion, nodeCompatible: false };
  }
}
