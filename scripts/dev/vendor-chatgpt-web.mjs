#!/usr/bin/env node
// scripts/dev/vendor-chatgpt-web.mjs
//
// Drift-visibility tooling for the vendored `codex-chatgpt-web` bridge
// (open-sse/vendor/codex-chatgpt-web/), requested in #14194. Reads the pinned
// upstream commit from vendor.json, asks GitHub how far the pin is behind
// upstream's latest release, and reports it. It does NOT merge, patch, or
// touch any vendored file — a version refresh is its own large, manually
// validated PR (see #14194's acceptance criteria: it needs a live smoke test
// against a real ChatGPT Web session, which no script here can perform).
//
// Usage:
//   node scripts/dev/vendor-chatgpt-web.mjs status   # npm run vendor:chatgpt-web:status
//   node scripts/dev/vendor-chatgpt-web.mjs diff      # npm run vendor:chatgpt-web:diff
//
// `status` prints the pin vs. latest release and how many commits/files separate them.
// `diff` prints the same, plus the full changed-file list (path + additions/deletions)
// from GitHub's compare API — enough to scope a future refresh without cloning anything.

import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const VENDOR_JSON_PATH = join(__dirname, "../../open-sse/vendor/codex-chatgpt-web/vendor.json");

function gh(args) {
  try {
    return execFileSync("gh", args, { encoding: "utf8", maxBuffer: 16 * 1024 * 1024 }).trim();
  } catch (err) {
    throw new Error(`gh ${args.join(" ")} failed: ${err.stderr || err.message}`);
  }
}

export function readVendorMeta(path = VENDOR_JSON_PATH) {
  return JSON.parse(readFileSync(path, "utf8"));
}

/**
 * Pure: turn the pinned metadata + GitHub's latest-release and compare responses into the
 * status report. Split out from network I/O so it's unit-testable with fixture data.
 */
export function formatStatusReport(vendorMeta, latest, compare) {
  const upToDate = vendorMeta.tag === latest.tag;
  const lines = [
    `Vendored: ${vendorMeta.repository} @ ${vendorMeta.tag} (${vendorMeta.commit.slice(0, 12)})`,
    `Latest release: ${latest.tag} (published ${latest.publishedAt})`,
  ];
  if (upToDate) {
    lines.push("Status: up to date.");
  } else {
    lines.push(
      `Status: ${compare.aheadBy} commit(s) / ${compare.totalFiles} file(s) behind.`,
      `Compare: ${compare.htmlUrl}`
    );
  }
  return lines.join("\n");
}

/** Pure: same as above but also renders the per-file change list (for `diff` mode). */
export function formatDiffReport(vendorMeta, latest, compare) {
  const header = formatStatusReport(vendorMeta, latest, compare);
  if (vendorMeta.tag === latest.tag) return header;

  const fileLines = compare.files
    .slice()
    .sort((a, b) => b.additions + b.deletions - (a.additions + a.deletions))
    .map((f) => `  ${f.status.padEnd(8)} +${f.additions}/-${f.deletions}  ${f.filename}`);

  return [header, "", `Changed files (${compare.files.length}):`, ...fileLines].join("\n");
}

async function fetchLatestRelease(repo) {
  try {
    const raw = gh(["api", `repos/${repo}/releases/latest`]);
    const parsed = JSON.parse(raw);
    return { tag: parsed.tag_name, publishedAt: parsed.published_at };
  } catch {
    // No GitHub Releases published for this repo — fall back to the newest tag.
    const tags = JSON.parse(gh(["api", `repos/${repo}/tags`]));
    if (!tags.length) throw new Error(`${repo} has no tags or releases to compare against`);
    return { tag: tags[0].name, publishedAt: null };
  }
}

function fetchCompare(repo, base, head) {
  // --jq strips the per-file `patch` text server-side — codex-chatgpt-web's full compare
  // payload runs several MB with patches included, and this script never reads them.
  const jq = "{ahead_by, html_url, files: [.files[] | {filename, status, additions, deletions}]}";
  const raw = gh(["api", `repos/${repo}/compare/${base}...${head}`, "--jq", jq]);
  const parsed = JSON.parse(raw);
  return {
    aheadBy: parsed.ahead_by,
    totalFiles: parsed.files?.length ?? 0,
    htmlUrl: parsed.html_url,
    files: parsed.files ?? [],
  };
}

async function main(argv) {
  const mode = argv[0] ?? "status";
  if (mode !== "status" && mode !== "diff") {
    console.error(`Usage: vendor-chatgpt-web.mjs <status|diff>`);
    process.exit(1);
  }

  const vendorMeta = readVendorMeta();
  const latest = await fetchLatestRelease(vendorMeta.repository);
  const compare =
    vendorMeta.tag === latest.tag
      ? { aheadBy: 0, totalFiles: 0, htmlUrl: null, files: [] }
      : fetchCompare(vendorMeta.repository, vendorMeta.commit, latest.tag);

  console.log(
    mode === "diff"
      ? formatDiffReport(vendorMeta, latest, compare)
      : formatStatusReport(vendorMeta, latest, compare)
  );
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  main(process.argv.slice(2)).catch((err) => {
    console.error(err.message);
    process.exit(1);
  });
}
