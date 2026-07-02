#!/usr/bin/env node
// scripts/docs/sync-wiki.mjs
// Full GitHub wiki content + cover-count sync.
//
// WHY: the wiki has no generator and historically drifts (it sat at "212+ providers /
// 14 strategies / 37 MCP tools" while code was at 226 / 15 / 87, and new docs like
// SUPPLY_CHAIN never appeared). This closes the loop: content + counts, automated per
// release by .github/workflows/wiki-sync.yml.
//
// DESIGN — update-in-place, never duplicates:
//   1. The wiki page names are hand-curated and NOT deterministically reproducible
//      (e.g. "API-Reference" vs "Fly-io-Deployment-Guide"). So we iterate the EXISTING
//      wiki pages and fuzzy-match each to a docs/ source by normalized key
//      (lowercase, strip non-alphanumeric). When a source exists we rewrite that exact
//      page → zero risk of creating a parallel/duplicate page.
//   2. A curated allowlist (NEW_PAGE_EXCLUDE) keeps internal docs (audit reports, plans,
//      the docs index) off the public wiki; every other unmatched docs page is ADDED
//      with a deterministic acronym-aware name.
//   3. Hand-curated pages with no docs source (Home, _Sidebar, Header, _Footer,
//      Languages) are left untouched — except the four cover counts on Home.md.
//   4. EN by default. Localized mirrors (<locale>‐Page) are pure update-in-place and
//      only touched with --include-i18n (the i18n source lags and is validated
//      separately).
//
// Content transform: strip the YAML frontmatter, prepend the wiki language banner.
//
// Usage:
//   node scripts/docs/sync-wiki.mjs --wiki-dir <path>                 # write
//   node scripts/docs/sync-wiki.mjs --wiki-dir <path> --dry-run       # report only
//   node scripts/docs/sync-wiki.mjs --wiki-dir <path> --check         # exit 1 on drift
//   node scripts/docs/sync-wiki.mjs --wiki-dir <path> --include-i18n  # also localized

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..", "..");

// U+2010 HYPHEN separates the locale prefix in localized wiki page names.
const LOCALE_SEP = "‐";
export const WIKI_BANNER = "> 🌍 [View in other languages](Languages)\n\n\n";

// Docs that must never become public wiki pages (internal reports/plans/index).
export const NEW_PAGE_EXCLUDE = new Set([
  "README", // docs index, not a page
  "DOCUMENTATION_AUDIT_REPORT",
  "DOCUMENTATION_OVERHAUL_PLAN",
  "E2E_DASHBOARD_SHAKEDOWN_v3.8.0",
  "SUBMIT_PR",
  "fix-opencode-context",
  "plugins", // docs/dev/plugins.md — internal dev note
  "SOCKET_DEV_FINDINGS",
]);

// Acronyms kept upper-case when minting a NEW page name (existing pages keep their
// curated name via fuzzy match, so this only affects brand-new pages).
const ACRONYMS = new Set([
  "api",
  "mcp",
  "a2a",
  "acp",
  "cli",
  "sse",
  "i18n",
  "pii",
  "oauth",
  "vm",
  "ai",
  "llm",
  "sdk",
  "ide",
  "ui",
  "ux",
  "tls",
  "mitm",
  "ws",
  "cors",
  "jwt",
  "db",
  "vps",
]);

/** Normalized matching key: lowercase, drop extension + every non-alphanumeric char. */
export function normKey(s) {
  return s
    .toLowerCase()
    .replace(/\.md$/, "")
    .replace(/[^a-z0-9]/g, "");
}

/** Deterministic wiki page name for a brand-new page (acronym-aware Title-Case-dashed). */
export function toWikiName(basename) {
  return basename
    .replace(/\.md$/, "")
    .split(/[_\-\s]+/)
    .filter(Boolean)
    .map((t) =>
      ACRONYMS.has(t.toLowerCase())
        ? t.toUpperCase()
        : t[0].toUpperCase() + t.slice(1).toLowerCase()
    )
    .join("-");
}

/** Strip YAML frontmatter and prepend the wiki language banner. Pure; exported for tests. */
export function toWikiContent(docMarkdown) {
  const body = docMarkdown.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, "").replace(/^\s+/, "");
  return WIKI_BANNER + body.replace(/\s*$/, "") + "\n";
}

function read(rel) {
  const p = path.join(ROOT, rel);
  return fs.existsSync(p) ? fs.readFileSync(p, "utf8") : "";
}

// ---- cover-page counts (source of truth) ----
function providerCount() {
  const m = read("docs/reference/PROVIDER_REFERENCE.md").match(/Total providers:\s*\*\*(\d+)\*\*/);
  return m ? Number(m[1]) : null;
}
function strategyCount() {
  const m = read("src/shared/constants/routingStrategies.ts").match(
    /ROUTING_STRATEGY_VALUES\s*=\s*\[([^\]]*)\]/
  );
  return m ? (m[1].match(/"[^"]+"/g) || []).length : null;
}
function localeCount() {
  try {
    const c = JSON.parse(read("config/i18n.json"));
    return Array.isArray(c.locales) ? c.locales.length : null;
  } catch {
    return null;
  }
}
function mcpToolCount() {
  // Prefer a literal; the constant is computed at runtime so best-effort only.
  const m = read("open-sse/mcp-server/server.ts").match(/TOTAL_MCP_TOOL_COUNT\s*=\s*(\d+)\b/);
  return m ? Number(m[1]) : null;
}
export function readCounts() {
  return {
    providers: providerCount(),
    strategies: strategyCount(),
    mcpTools: mcpToolCount(),
    locales: localeCount(),
  };
}

/** Apply cover-page count substitutions to Home.md text. Pure; exported for tests. */
export function syncHomeCounts(home, counts) {
  let out = home;
  if (counts.providers) {
    out = out
      .replace(
        /Connect every AI tool to \d+ providers/g,
        `Connect every AI tool to ${counts.providers} providers`
      )
      .replace(/\*\*\d+ AI Providers\*\*/g, `**${counts.providers} AI Providers**`)
      .replace(/All \d+ supported providers/g, `All ${counts.providers} supported providers`)
      .replace(/\b\d+ providers\b/g, `${counts.providers} providers`);
  }
  if (counts.strategies) {
    out = out.replace(
      /\*\*\d+ Routing Strategies\*\*/g,
      `**${counts.strategies} Routing Strategies**`
    );
  }
  if (counts.mcpTools) {
    out = out.replace(/(\|\s*\*\*MCP Server\*\*\s*\|\s*)\d+( tools)/g, `$1${counts.mcpTools}$2`);
  }
  return out;
}

// ---- docs discovery ----
function walkMarkdown(dir, acc = []) {
  if (!fs.existsSync(dir)) return acc;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walkMarkdown(p, acc);
    else if (e.name.endsWith(".md")) acc.push(p);
  }
  return acc;
}

/** Build normKey → docs absolute path for English docs (docs/ minus docs/i18n). */
function indexEnglishDocs() {
  const docsRoot = path.join(ROOT, "docs");
  const files = walkMarkdown(docsRoot).filter((f) => !f.includes(`${path.sep}i18n${path.sep}`));
  const byKey = new Map();
  for (const f of files) {
    const base = path.basename(f, ".md");
    const k = normKey(base);
    // First-writer-wins keeps a deterministic pick for basename collisions.
    if (!byKey.has(k)) byKey.set(k, { file: f, base });
  }
  return byKey;
}

/** Build normKey → docs path for a given locale's i18n tree. */
function indexLocaleDocs(locale) {
  const root = path.join(ROOT, "docs", "i18n", locale);
  const byKey = new Map();
  for (const f of walkMarkdown(root)) {
    const k = normKey(path.basename(f, ".md"));
    if (!byKey.has(k)) byKey.set(k, f);
  }
  return byKey;
}

function listWikiPages(wikiDir) {
  return fs
    .readdirSync(wikiDir)
    .filter((n) => n.endsWith(".md"))
    .map((n) => n.slice(0, -3));
}

/** Split a wiki page name into { locale, name }. EN pages have locale = null. */
export function parseWikiPage(page) {
  const idx = page.indexOf(LOCALE_SEP);
  if (idx === -1) return { locale: null, name: page };
  return { locale: page.slice(0, idx), name: page.slice(idx + 1) };
}

function main() {
  const args = process.argv.slice(2);
  const wikiDir = args.includes("--wiki-dir") ? args[args.indexOf("--wiki-dir") + 1] : null;
  const dryRun = args.includes("--dry-run");
  const check = args.includes("--check");
  const includeI18n = args.includes("--include-i18n");
  const updateExisting = args.includes("--update-existing");
  if (!wikiDir || !fs.existsSync(wikiDir)) {
    console.error("usage: sync-wiki.mjs --wiki-dir <path> [--dry-run|--check] [--include-i18n]");
    process.exit(2);
  }

  const enDocs = indexEnglishDocs();
  const wikiPages = listWikiPages(wikiDir);
  const enWikiKeys = new Set();
  const localeIndexes = new Map();

  const plan = { update: [], add: [], untouched: [], countsChanged: false };

  // 1. Update existing wiki pages from their docs source.
  for (const page of wikiPages) {
    if (page === "Home") continue; // handled by counts below
    const { locale, name } = parseWikiPage(page);
    const key = normKey(name);
    let srcFile = null;
    if (!locale) {
      enWikiKeys.add(key);
      srcFile = enDocs.get(key)?.file ?? null;
    } else if (includeI18n) {
      if (!localeIndexes.has(locale)) localeIndexes.set(locale, indexLocaleDocs(locale));
      srcFile = localeIndexes.get(locale).get(key) ?? null;
    }
    if (!srcFile) {
      plan.untouched.push(page);
      continue;
    }
    const next = toWikiContent(fs.readFileSync(srcFile, "utf8"));
    const cur = fs.readFileSync(path.join(wikiDir, `${page}.md`), "utf8");
    if (next !== cur) plan.update.push({ page, srcFile });
  }

  // 2. Add curated new English pages (unmatched docs, minus the exclude list).
  for (const [key, { file, base }] of enDocs) {
    if (enWikiKeys.has(key)) continue;
    if (NEW_PAGE_EXCLUDE.has(base)) continue;
    plan.add.push({ page: toWikiName(base), srcFile: file, base });
  }

  // 3. Home cover counts.
  const counts = readCounts();
  const homePath = path.join(wikiDir, "Home.md");
  let homeAfter = null;
  if (fs.existsSync(homePath)) {
    const before = fs.readFileSync(homePath, "utf8");
    homeAfter = syncHomeCounts(before, counts);
    plan.countsChanged = homeAfter !== before;
  }

  // ---- report ----
  // Updating existing pages is opt-in: several docs SOURCES carry stale counts (e.g.
  // ARCHITECTURE.md still says "177 providers / 37 MCP tools" while the wiki cover was
  // hand-patched to 226/87). Overwriting from a staler source would REGRESS the wiki, so
  // by default we only ADD missing pages and sync Home counts. Pass --update-existing
  // once the docs sources are regenerated.
  const updates = updateExisting ? plan.update : [];
  const total = updates.length + plan.add.length + (plan.countsChanged ? 1 : 0);
  console.log(`[wiki-sync] counts: ${JSON.stringify(counts)}`);
  console.log(
    `[wiki-sync] add: ${plan.add.length} | Home counts: ${plan.countsChanged ? "drift" : "in-sync"} | ` +
      `existing-page updates: ${plan.update.length} (${updateExisting ? "ENABLED" : "skipped — needs --update-existing"}) | untouched: ${plan.untouched.length}`
  );
  if (dryRun || check) {
    if (plan.add.length) console.log(`  add → ${plan.add.map((a) => a.page).join(", ")}`);
    if (plan.update.length)
      console.log(
        `  ${updateExisting ? "update" : "would-update (skipped)"} → ${plan.update
          .map((u) => u.page)
          .slice(0, 60)
          .join(", ")}${plan.update.length > 60 ? " …" : ""}`
      );
    if (check) {
      if (total > 0) {
        console.error(`✗ wiki out of sync (${total} change(s) pending)`);
        process.exit(1);
      }
      console.log("✓ wiki in sync");
    }
    return;
  }

  // ---- write ----
  for (const { page, srcFile } of [...updates, ...plan.add]) {
    fs.writeFileSync(
      path.join(wikiDir, `${page}.md`),
      toWikiContent(fs.readFileSync(srcFile, "utf8"))
    );
  }
  if (plan.countsChanged && homeAfter != null) fs.writeFileSync(homePath, homeAfter);
  console.log(
    `[wiki-sync] wrote ${total} page(s) (add: ${plan.add.length}, updates: ${updates.length}, counts: ${plan.countsChanged ? 1 : 0}).`
  );
}

const invokedDirectly =
  process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (invokedDirectly) main();
