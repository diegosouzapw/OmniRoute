import { existsSync, lstatSync, readdirSync, rmSync } from "node:fs";
import { join, relative, resolve, sep } from "node:path";

// The packaged app reads exactly one slice of the translated mirrors:
// `docs/i18n/<locale>/docs/**`, through the in-app docs route (the path is
// pinned by src/lib/docsI18nPath.ts). Everything at a locale's root — the
// README, llm.txt and the agent/contributor guides — is authoring material
// mirrored for GitHub readers and never opened by the runtime, so it leaves
// the bundle together with the translated CHANGELOG (~115 MB across 51
// locales, 103 MB of it CHANGELOG). The translated `docs/**` tree stays.
export const ELECTRON_RUNTIME_DOC_PRUNE_RULES = Object.freeze({
  localeRootFiles: Object.freeze([
    "CHANGELOG.md",
    "CLAUDE.md",
    "CODE_OF_CONDUCT.md",
    "CONTRIBUTING.md",
    "GEMINI.md",
    "README.md",
    "SECURITY.md",
    "llm.txt",
  ]),
  authoringDirectories: Object.freeze(["docs/research", "docs/superpowers"]),
});

function payloadSize(targetPath) {
  const stat = lstatSync(targetPath);
  if (!stat.isDirectory()) {
    return { files: 1, bytes: stat.size };
  }

  return readdirSync(targetPath).reduce(
    (total, entry) => {
      const payload = payloadSize(join(targetPath, entry));
      total.files += payload.files;
      total.bytes += payload.bytes;
      return total;
    },
    { files: 0, bytes: 0 }
  );
}

function removePayload(bundleRoot, relativePath, summary) {
  const root = resolve(bundleRoot);
  const targetPath = resolve(root, relativePath);
  if (targetPath !== root && !targetPath.startsWith(`${root}${sep}`)) {
    throw new Error(`[electron-docs] refusing to prune outside bundle root: ${relativePath}`);
  }
  if (!existsSync(targetPath)) return;

  const payload = payloadSize(targetPath);
  rmSync(targetPath, { recursive: true, force: true });
  summary.removedFiles += payload.files;
  summary.removedBytes += payload.bytes;
  summary.removedPaths.push(relative(root, targetPath).split(sep).join("/"));
}

/**
 * Remove docs that are useful while authoring OmniRoute but are never read by
 * the packaged desktop runtime. Canonical docs remain untouched; bundleRoot is
 * the disposable Electron staging directory.
 */
export function pruneElectronRuntimeDocs(bundleRoot) {
  const summary = { removedFiles: 0, removedBytes: 0, removedPaths: [] };
  const localesRoot = join(bundleRoot, "docs", "i18n");

  if (existsSync(localesRoot)) {
    for (const locale of readdirSync(localesRoot, { withFileTypes: true })) {
      if (!locale.isDirectory()) continue;
      for (const fileName of ELECTRON_RUNTIME_DOC_PRUNE_RULES.localeRootFiles) {
        removePayload(bundleRoot, join("docs", "i18n", locale.name, fileName), summary);
      }
    }
  }

  for (const relativePath of ELECTRON_RUNTIME_DOC_PRUNE_RULES.authoringDirectories) {
    removePayload(bundleRoot, relativePath, summary);
  }

  summary.removedPaths.sort();
  return summary;
}
