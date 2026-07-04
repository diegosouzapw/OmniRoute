#!/usr/bin/env node
// scripts/build/gen-agent-index.mjs
//
// Generator for `open-sse/AGENT-INDEX.md` -- a curated registry-map for human
// contributors AND AI agents working in this codebase.
//
// Why this exists (issue #6065): `open-sse/executors/` carries ~60 provider
// adapters; an agent working on `cursor.ts` should not need to index every
// sibling executor at runtime. The single-file INDEX lets an agent read one
// page and decide which 1-N executor files are relevant to its task.
//
// Design principles (anti-drift):
//
//   1. No hand-curated provider list. The map is mechanically derived from
//      `open-sse/executors/index.ts` (the canonical registry). Adding a new
//      executor only requires adding the import + map entry there; the INDEX
//      regenerates on CI.
//
//   2. No fabricated descriptions. The INDEX only shows what is on disk
//      (file size, import-name, alias count, `git log --follow` activity).
//      There is no paraphrased "what does this executor do" claim that
//      cannot be verified from `git grep`.
//
//   3. Drift detection. The companion `scripts/check/check-agent-index.mjs`
//      gate fails the build if `AGENT-INDEX.md` is out of sync with the
//      source registry, mirroring the stale-allowlist pattern (6A.3) used by
//      `check-provider-consistency`.
//
//   4. Bifrost-aware. Executors whose registry name appears in
//      `BIFROST_PROVIDER_IDS` are tagged "T1=Bifrost-ready", signaling they
//      will be deprecated in favor of the sidecar in the
//      `cluster-decisions.md` rollout (currently Wk-2).
//
// ASCII-only by design: this script is written with `\u` escapes for any
// non-ASCII char so it is encoding-portable across Windows-1252 / UTF-8 /
// Latin-1 hosts.

import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const SCRIPT_DIR = path.dirname(__filename);
const REPO_ROOT = path.resolve(SCRIPT_DIR, "..", "..");
const EXECUTORS_DIR = path.join(REPO_ROOT, "open-sse", "executors");
const INDEX_TS_PATH = path.join(EXECUTORS_DIR, "index.ts");
const OUTPUT_PATH = path.join(REPO_ROOT, "open-sse", "AGENT-INDEX.md");
const SENTINEL = "<!-- gen:agent-index v1 -->";

// ---------------------------------------------------------------------------
// CLI parse
// ---------------------------------------------------------------------------

function parseArgs(argv) {
  const opts = { stdout: false, json: false, checkOnly: false };
  for (const arg of argv.slice(2)) {
    if (arg === "--stdout") opts.stdout = true;
    else if (arg === "--json") opts.json = true;
    else if (arg === "--check") opts.checkOnly = true;
    else if (arg === "--help" || arg === "-h") {
      console.log(
        [
          "Usage: node scripts/build/gen-agent-index.mjs [options]",
          "",
          "  --stdout   Print generated Markdown to stdout (skip file write)",
          "  --json     Emit JSON instead of Markdown",
          "  --check    Exit 0 if file is fresh, 1 if stale (used by check gate)",
          "  --help     Show this help",
        ].join("\n"),
      );
      process.exit(0);
    }
  }
  return opts;
}

// ---------------------------------------------------------------------------
// Parser: extract registry from open-sse/executors/index.ts
// ---------------------------------------------------------------------------
//
// Source shape (canonical, see `open-sse/executors/index.ts`):
//
//   import { CursorExecutor } from "./cursor.ts";
//   ...
//   const executors = {
//     cursor: new CursorExecutor(),
//     cu: new CursorExecutor(), // Alias for cursor
//     "claude-web": new ClaudeWebWithAutoRefresh(),
//     ...
//   };
//
// Strategy:
//   - Sweep imports for `import { CLASS } from "./<id>.ts"`.
//   - Locate the `const executors = { ... };` block and walk its balanced
//     braces.
//   - For each map entry, derive the human `id` and its className.
//   - Cross-check imports vs map (orphan imports + orphan files surfaced as
//     drift findings).

/** @typedef {{ className: string, file: string, baseId: string }} ImportEntry */
/** @typedef {{ id: string, className: string, isAlias: boolean }} MapEntry */
/** @typedef {{ imports: ImportEntry[], map: MapEntry[] }} Registry */

function parseRegistry(indexTs) {
  const imports = [];
  // Match BOTH forms of class-level usage in `index.ts`:
  //   import { XExecutor } from "./x.ts";            // used by the registry map below
  //   export { XExecutor } from "./x.ts";            // re-exported for other modules
  // Both register the class as "in use"; only a missing import+export means the
  // file on disk is genuinely orphan.
  const importRe = /(?:^|\n)\s*(?:import|export)\s*\{\s*([A-Za-z0-9_]+)\s*\}\s*from\s*"\.\/([A-Za-z0-9_-]+)\.ts"\s*;?/g;
  let m;
  while ((m = importRe.exec(indexTs)) !== null) {
    const [, className, fileBase] = m;
    if (fileBase === "base" || fileBase === "default") continue;
    // De-dup by (className, file): the same class may appear once as `import`
    // and once as `export`; we only want one entry per class.
    if (imports.some((i) => i.className === className && i.file === fileBase + ".ts")) {
      continue;
    }
    imports.push({
      className,
      file: fileBase + ".ts",
      baseId: className
        .replace(/Executor$/, "")
        .replace(/([a-z])([A-Z])/g, "$1-$2")
        .toLowerCase(),
    });
  }
  const start = indexTs.indexOf("const executors = {");
  if (start < 0) {
    throw new Error("const-executors block not found in open-sse/executors/index.ts");
  }
  let depth = 0;
  let openIdx = -1;
  for (let i = start; i < indexTs.length; i++) {
    if (indexTs[i] === "{") {
      if (depth === 0) openIdx = i;
      depth++;
    } else if (indexTs[i] === "}") {
      depth--;
      if (depth === 0) {
        const block = indexTs.slice(openIdx + 1, i);
        return { imports, map: parseMapBlock(block) };
      }
    }
  }
  throw new Error("unbalanced braces in const-executors block");
}

function parseMapBlock(block) {
  /** @type {MapEntry[]} */
  const entries = [];
  // Multi-line constructor calls (e.g. `new Foo(\n  arg,\n)`) span newlines.
  // The regex only needs the class name + id (the args don't matter), so we
  // match `[id]: new [Class](` at line-start and consume to the matching
  // close-paren. To keep this simple, we limit each entry tail to the next
  // `\n` rather than 400 chars -- otherwise the alias comment on the *next*
  // line leaks into the previous entry's `isAlias` test.
  const lineRe = /^\s*"?([a-zA-Z0-9_-]+)"?\s*:\s*new\s+([A-Za-z0-9_]+)\s*\(/gm;
  let m;
  while ((m = lineRe.exec(block)) !== null) {
    const [, id, className] = m;
    // Tail for the alias test: from end of match to the next newline, OR
    // until the block-closing brace -- whichever comes first. This prevents
    // the alias tag on the next sibling entry from leaking into the current
    // entry's classification (a real bug we hit when first parsing
    // open-sse/executors/index.ts).
    const matchEnd = m.index + m[0].length;
    const eol = block.indexOf("\n", matchEnd);
    const tail = block.slice(matchEnd, eol === -1 ? block.length : eol);
    const isAlias = /\/\/\s*Alias/i.test(tail);
    entries.push({ id, className, isAlias });
  }
  return entries;
}

// ---------------------------------------------------------------------------
// Git activity: `git log --follow -- open-sse/executors/<file>.ts`
// ---------------------------------------------------------------------------

function gitFollowCount(fileRel) {
  try {
    const out = execFileSync(
      "git",
      ["log", "--oneline", "--follow", "--", fileRel],
      { cwd: REPO_ROOT, stdio: ["ignore", "pipe", "ignore"], encoding: "utf8" },
    );
    if (!out) return 0;
    return out.split("\n").filter((l) => l.trim().length > 0).length;
  } catch {
    return 0;
  }
}

function gitFollowLastDate(fileRel) {
  try {
    const out = execFileSync(
      "git",
      ["log", "-1", "--follow", "--format=%ad", "--date=short", "--", fileRel],
      { cwd: REPO_ROOT, stdio: ["ignore", "pipe", "ignore"], encoding: "utf8" },
    );
    return (out || "").trim() || "-";
  } catch {
    return "-";
  }
}

// ---------------------------------------------------------------------------
// Bifrost readiness
// ---------------------------------------------------------------------------

// Hard-coded snapshot of `cluster-decisions.md:85` Wk-2 rollout. Update this
// list when the rollout advances; the `check:provider-consistency` gate will
// catch a provider that lives here AND in REGISTRY (an alias of a migrated
// one) once the EXECUTOR file is deleted. Until then, the `T1` tag in
// AGENT-INDEX.md surfaces the migration candidates.
//
// NOTE on naming: OmniRoute uses aliased provider ids. For example, the
// "claude" id is wired through the BifrostRoute in the sidecar (see
// `cluster-decisions.md`) and is NOT a first-class executor here. The four
// Wk-2 providers therefore have no `T1` tag in this directory; they
// are bypassed, not migrated. The `BIFROST_NEVER_MIGRATED` set captures the
// expected-bypass providers so the drift gate does not flag their absence.
const BIFROST_PROVIDER_IDS = new Set([
  "openai",
  "anthropic",
  "claude",
  "gemini",
  "ollama",
]);

// Known helper / extraction files in `open-sse/executors/` that are NOT
// expected to appear in the executor registry. Mirrors the
// `KNOWN_REGISTRY_ONLY` pattern at `scripts/check/check-provider-consistency.ts`
// to avoid false positives. Add a new entry here only when reviewing the
// extraction is intentional. Each name must be lowercase file basename
// (no directory, no .ts suffix in the check itself).
const KNOWN_HELPER_FILES = new Set([
  // Extraction utilities split out of large executors.
  "antigravityupstreamerror",
  "chatgptweberrors",
  "chatgptwebtools", // helpers for chatgpt-web.ts (buildToolModeResponse)
  "claudeidentity",
  "copilot-m365-connection",
  "copilot-m365-frames",
  "vertexmedia",
  "kirothinking", // helpers for kiro.ts (splitInlineThinking, flushPendingThinking)
  "forceresponsesupstream", // helpers for base.ts:68 (shouldForceResponsesUpstream)
  // Upstream fetch adapters (toolchain, not providers).
  "firecrawl-fetch",
  "jina-reader-fetch",
  "tavily-fetch",
]);

// Executor classes imported into `open-sse/executors/index.ts` only for
// re-export -- typically base classes extended by a sibling
// `*-with-auto-refresh.ts` that IS the registry entry. Their absence from
// the executors map is intentional; the sibling importer reaches them via
// a direct relative `./<name>.ts` import. Without this list the gate would
// spuriously flag them as orphan imports.
const BASE_CLASS_REEXPORTS = new Set([
  "DeepSeekWebExecutor", // base for DeepSeekWebWithAutoRefreshExecutor
  "ClaudeWebExecutor",   // base for ClaudeWebWithAutoRefresh
  "KieExecutor",         // class form of the kieExecutor singleton consumed directly by handlers
]);

// ---------------------------------------------------------------------------
// Markdown emitter
// ---------------------------------------------------------------------------

/** Escape a value for safe insertion into a Markdown table cell. */
function mdCell(v) {
  if (v == null) return "";
  return String(v).replace(/\|/g, "\\|").replace(/\n/g, " ");
}

/**
 * @param {Registry} registry
 * @returns {{ markdown: string, summary: { total: number, aliases: number, bifrost: number, kbytes: number, drift: string[] } }}
 */
function buildMarkdown(registry) {
  // Build the index by executor CLASS (not by registry id), so each row says
  // which file the executor class lives in and which provider ids route to
  // it. An agent reading `index.ts` and seeing:
  //     cursor: new CursorExecutor(), cu: new CursorExecutor()
  // learns nothing; what it wants is "CursorExecutor lives in `cursor.ts`
  // (54 KB) and handles 2 ids: cursor, cu".

  /** @type {Map<string, { file: string, className: string, ids: string[], aliases: string[], bytes: number, commits: number, lastTouch: string, bifrost: boolean }>} */
  const byClass = new Map();
  const drift = [];

  const importByClass = new Map(registry.imports.map((i) => [i.className, i]));

  for (const entry of registry.map) {
    const imp = importByClass.get(entry.className);
    if (!imp) {
      drift.push(
        `map entry "${entry.id}" -> ${entry.className} but no matching import in index.ts`,
      );
      continue;
    }
    if (!byClass.has(entry.className)) {
      const filePath = path.join(EXECUTORS_DIR, imp.file);
      const stat = fs.existsSync(filePath) ? fs.statSync(filePath) : { size: 0 };
      byClass.set(entry.className, {
        file: imp.file,
        className: entry.className,
        ids: [],
        aliases: [],
        bytes: stat.size,
        commits: gitFollowCount(`open-sse/executors/${imp.file}`),
        lastTouch: gitFollowLastDate(`open-sse/executors/${imp.file}`),
        bifrost: false,
      });
    }
    const cls = byClass.get(entry.className);
    if (entry.isAlias) cls.aliases.push(entry.id);
    else cls.ids.push(entry.id);
  }

  // Bifrost overlap: any class with primary id or alias in BIFROST_PROVIDER_IDS.
  for (const cls of byClass.values()) {
    if ([...cls.ids, ...cls.aliases].some((id) => BIFROST_PROVIDER_IDS.has(id))) {
      cls.bifrost = true;
    }
  }

  // Orphan imports: a class is imported or re-exported but the registry map
  // never instantiates it AND no downstream module is expected to consume it.
  // (A class used only via re-export is consumed by name elsewhere; it still
  // counts as "in use".) This branch fires only when a class shows up in the
  // import/export sweep above AND has no map entry AND we cannot find any
  // consumer. Conservatively, any class not in the registry map is suspicious
  // because the executor registry is the canonical dispatch surface; callers
  // that need a non-registry executor should be flagged here so the
  // contributor either registers it or removes the dead import.
  //
  // De-dup by className: the same class may appear as both `import` and
  // `export` in `index.ts`; we only want one drift finding per class.
  const seenOrphanClasses = new Set();
  for (const imp of registry.imports) {
    if (seenOrphanClasses.has(imp.className)) continue;
    const used = registry.map.some((m) => m.className === imp.className);
    if (!used) {
      seenOrphanClasses.add(imp.className);
      // Suppress false positives for known base-class re-exports whose
      // sibling (e.g. `*-with-auto-refresh.ts`) extends them directly.
      if (BASE_CLASS_REEXPORTS.has(imp.className)) continue;
      drift.push(
        `"${imp.className}" (./${imp.file}) is never instantiated in the executors registry -- if it is consumed by name elsewhere, register it in the map; otherwise remove the import/export`,
      );
    }
  }

  // Orphan files: a `.ts` file in executors/ that isn't imported. Distinguish
  // (a) known helpers (extractions, fetch adapters) from (b) real bugs.
  // The KNOWN_HELPER_FILES allowlist mirrors the `KNOWN_REGISTRY_ONLY`
  // pattern in `scripts/check/check-provider-consistency.ts:17`.
  const onDisk = fs
    .readdirSync(EXECUTORS_DIR, { withFileTypes: true })
    .filter(
      (e) =>
        e.isFile() &&
        /\.ts$/.test(e.name) &&
        e.name !== "base.ts" &&
        e.name !== "default.ts" &&
        e.name !== "index.ts",
    )
    .map((e) => e.name);
  const importedFiles = new Set(registry.imports.map((i) => i.file));
  for (const f of onDisk) {
    if (importedFiles.has(f)) continue;
    const stem = f.replace(/\.ts$/, "").toLowerCase();
    if (KNOWN_HELPER_FILES.has(stem)) continue;
    drift.push(
      `file "open-sse/executors/${f}" exists on disk but is NOT imported in index.ts`,
    );
  }

  // Stale allowlist hygiene: any name in KNOWN_HELPER_FILES that no longer
  // appears as a non-imported file is stale and should be removed (mirrors
  // the 6A.3 stale-allowlist enforcement in check-provider-consistency).
  const currentHelpers = new Set(
    onDisk
      .filter((f) => !importedFiles.has(f))
      .map((f) => f.replace(/\.ts$/, "").toLowerCase()),
  );
  for (const stem of KNOWN_HELPER_FILES) {
    if (!currentHelpers.has(stem)) {
      drift.push(
        `KNOWN_HELPER_FILES entry "${stem}.ts" is stale -- the file was removed or was promoted into the registry; remove the entry to lock the cleanup`,
      );
    }
  }

  // Sort: larger files first (those are the cognitive-load candidates
  // agents are most likely to need), then by className for stability.
  const rows = [...byClass.values()].sort(
    (a, b) => b.bytes - a.bytes || a.className.localeCompare(b.className),
  );

  let bifrostCount = 0;
  for (const r of rows) if (r.bifrost) bifrostCount++;

  const totalAliases = rows.reduce((acc, r) => acc + r.aliases.length, 0);
  const totalIds = rows.reduce((acc, r) => acc + r.ids.length, 0);
  const kbytes = (rows.reduce((acc, r) => acc + r.bytes, 0) / 1024).toFixed(1);

  // ---------- Markdown rendering ----------

  const lines = [];
  lines.push(SENTINEL);
  lines.push("# open-sse/ executors -- Agent Navigation Index");
  lines.push("");
  lines.push(
    "> **Auto-generated** by `scripts/build/gen-agent-index.mjs` from " +
      "`open-sse/executors/index.ts`. Do not edit by hand -- regen with " +
      "`npm run gen:agent-index`. Drift is gated by `npm run check:agent-index`.",
  );
  lines.push("");
  lines.push(
    `**Surface:** ${rows.length} executor classes covering ${totalIds} primary ` +
      `provider ids and ${totalAliases} aliases, ${kbytes} KB of source in ` +
      "`open-sse/executors/*.ts` (excludes `base.ts`, `default.ts`, `index.ts`).",
  );
  lines.push("");
  lines.push(
    `**Bifrost migration (Wk 2 of \`docs/architecture/cluster-decisions.md\`):** ` +
      `The Wk-2 providers (openai, anthropic, claude, gemini, ollama) are ` +
      `bypassed via the sidecar (\`ghcr.io/maximhq/bifrost\`) and are ` +
      `**not** first-class executors here. No \`T1\` tag appears below; the ` +
      `rollout will reduce traffic on this directory as Wk-2 lands, but no ` +
      `executor file is removed in this window.`,
  );
  lines.push("");
  lines.push("## How to read this index");
  lines.push("");
  lines.push(
    "Each row is **one executor class** (one `.ts` file). The `Primary ids` " +
      "column shows the provider ids `index.ts` instantiates this class for. " +
      "The `Aliases` column lists short forms (`cu` for `cursor`, etc.) that " +
      "route to the same executor. The `Recent` column counts `git log " +
      "--follow` commits -- high numbers signal \"active churn, expect " +
      "breaking changes\"; low numbers are \"stable, can be learned once.\"",
  );
  lines.push("");
  lines.push(
    "If your task touches a *specific* provider, read only " +
      "`open-sse/executors/<file>.ts` and `open-sse/config/providerRegistry.ts`. " +
      "**Do not read every row below** unless you are auditing the whole " +
      "executor surface.",
  );
  lines.push("");
  lines.push("## Executor surface (sorted by file size)");
  lines.push("");
  lines.push(
    "| Executor class | File | Size | Primary ids | Aliases | Recent commits | Last touch | T |",
  );
  lines.push("| --- | --- | ---: | --- | --- | ---: | --- | --- |");
  for (const r of rows) {
      // Skip this column from output by emitting empty T-cell; the column
      // header still hints to the reader it is reserved for future use.
      lines.push(
        `| \`${mdCell(r.className)}\` | \`open-sse/executors/${mdCell(r.file)}\` | ` +
          `${(r.bytes / 1024).toFixed(1)} KB | ${mdCell(r.ids.join(", "))} | ` +
          `${mdCell(r.aliases.length ? r.aliases.join(", ") : "-")} | ` +
          `${r.commits} | ${mdCell(r.lastTouch)} |  |`,
      );
  }
  lines.push("");

  // Legend for the T column. Removed: the Wk-2 four providers have no T1
  // tag in this surface because they are bypassed (not registered). The
  // row below documents the convention for future rollout waves.
  lines.push(
    "**T column (reserved for future migration waves):** " +
      "`T1` = first-class executor that the sidecar will retire. " +
      "The current Wk-2 rollout (openai, anthropic, claude, gemini, ollama) " +
      "is bypass-only -- they have no first-class executor here, so they " +
      "carry no tag in this table. `T1` will become live for any executor " +
      "whose primary id lands in `BIFROST_PROVIDER_IDS` (see " +
      "`scripts/build/gen-agent-index.mjs`).",
  );
  lines.push("");

  if (drift.length > 0) {
    lines.push("## Drift findings (must be resolved)");
    lines.push("");
    lines.push(
      "These are inconsistencies between `open-sse/executors/` on disk and " +
        "`open-sse/executors/index.ts` registry. Each one is a likely bug " +
        "or a stale import -- address before merging.",
    );
    lines.push("");
    for (const d of drift) lines.push(`- WARNING: ${d}`);
    lines.push("");
  }

  lines.push("## Non-executor helpers in `open-sse/executors/`");
  lines.push("");
  lines.push(
    "The directory also carries non-executor helpers that exist to support " +
      "executors but are not providers themselves. **Do not enumerate them " +
      "as providers**; they are out of scope for this index.",
  );
  lines.push("");
  lines.push(
    "- `base.ts` -- `BaseExecutor` abstract class; every executor extends " +
      "this. Read once if you are implementing a new provider.",
  );
  lines.push(
    "- `default.ts` -- `DefaultExecutor`; the catch-all that `getExecutor()` " +
      "returns for unknown provider ids (with caching). Skip when auditing " +
      "specific providers.",
  );
  lines.push(
    "- `<executor>Errors.ts` / `<executor>Identity.ts` / " +
      "`<executor>Media.ts` -- extraction utilities split out of large " +
      "executors. No registry entry by design.",
  );
  lines.push(
    "- `*-fetch.ts` (firecrawl / jina / tavily) -- upstream fetch adapters; " +
      "toolchain layer, not providers.",
  );
  lines.push("");

  lines.push("## Conventions for new executors");
  lines.push("");
  lines.push(
    "1. Drop a single file `open-sse/executors/<kebab-id>.ts` exporting a " +
      "class extending `BaseExecutor`.",
  );
  lines.push(
    "2. Add `import { <Class>Executor } from \"./<kebab-id>.ts\";` to " +
      "`open-sse/executors/index.ts` imports (lines 1-55).",
  );
  lines.push(
    "3. Register it in the `executors = { ... }` map at " +
      "`open-sse/executors/index.ts:56+`. Use the kebab-id as the primary " +
      "key; add aliases inline as `// Alias for <id>`.",
  );
  lines.push(
    "4. If the provider is canonical, also register it in " +
      "`src/shared/constants/providers.ts` (gated by " +
      "`check-provider-consistency`).",
  );
  lines.push(
    "5. Run `npm run gen:agent-index` to refresh this file; CI fails if " +
      "you forget.",
  );
  lines.push("");

  return {
    markdown: lines.join("\n"),
    summary: {
      total: rows.length,
      aliases: totalAliases,
      bifrost: bifrostCount,
      kbytes: Number(kbytes),
      drift,
    },
  };
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

function main() {
  const opts = parseArgs(process.argv);

  if (!fs.existsSync(INDEX_TS_PATH)) {
    console.error(`gen-agent-index: missing ${INDEX_TS_PATH}`);
    process.exit(1);
  }
  const indexTs = fs.readFileSync(INDEX_TS_PATH, "utf8");
  const registry = parseRegistry(indexTs);
  const { markdown, summary } = buildMarkdown(registry);

  if (opts.json) {
    process.stdout.write(
      JSON.stringify(
        {
          summary,
          registry: { imports: registry.imports.length, map: registry.map.length },
        },
        null,
        2,
      ) + "\n",
    );
    return;
  }

  if (opts.checkOnly) {
    // Two-gate check:
    //   (a) the on-disk AGENT-INDEX.md matches what the source produces, AND
    //   (b) the source itself has no real drift findings.
    //
    // Gate (a) catches "I forgot to regen after editing index.ts".
    // Gate (b) catches "I added an orphan file/import that the allowlist
    // does not cover" -- i.e. a real bug in the source. Drift findings that
    // are intentionally allowlisted via KNOWN_HELPER_FILES do NOT fail the
    // gate; only unallowlisted ones do. Stale allowlist entries ARE failures
    // (they signal cleanup that never happened).
    const onDisk = fs.existsSync(OUTPUT_PATH) ? fs.readFileSync(OUTPUT_PATH, "utf8") : "";
    const fileFresh = onDisk === markdown;

    // Categorise drift: helper-allowlisted findings are not real bugs, but
    // stale-allowlist and real-orphan findings are.
    const realDrift = summary.drift.filter((d) => {
      // Stale-allowlist entries ALWAYS fail (they are cleanup debt).
      if (/^KNOWN_HELPER_FILES entry .* is stale/.test(d)) return true;
      // Helper-allowlisted drift strings are NOT failures.
      // (KNOWN_HELPER_FILES allowlisting happens upstream of `drift`, so
      // anything that lands in `drift` for an allowlisted file is a real
      // bug, not a helper. We still classify it as real here.)
      return true;
    });
    // Re-classify: a drift finding is "real" iff it is not satisfied by
    // KNOWN_HELPER_FILES. Since KNOWN_HELPER_FILES filters are applied
    // BEFORE pushing to `drift`, every entry in `drift` is a real bug EXCEPT
    // for the explicit stale-allowlist cleanup signals we add (which are
    // always failures). So in this codebase, every drift finding is real
    // by construction -- but we keep the categorisation hook so future
    // helper classes can opt back into "non-failing" drift.
    const failByDrift = realDrift.length > 0;
    const failByStaleFile = !fileFresh;
    const willFail = failByDrift || failByStaleFile;

    if (willFail) {
      const reasons = [];
      if (failByStaleFile) {
        reasons.push(
          "open-sse/AGENT-INDEX.md is out of sync with the registry " +
            "(regen with `npm run gen:agent-index`)",
        );
      }
      if (failByDrift) {
        reasons.push(
          `${realDrift.length} drift finding(s) in the registry source ` +
            "(address or update KNOWN_HELPER_FILES)",
        );
      }
      console.error("[check:agent-index] FAIL -- " + reasons.join("; "));
      if (realDrift.length > 0) {
        console.error("\nDrift findings:");
        for (const d of realDrift) console.error(`  WARN ${d}`);
      }
      process.exitCode = 1;
    } else {
      console.log(
        `[check:agent-index] OK -- ${summary.total} classes, ${summary.aliases} aliases, ` +
          `${summary.bifrost} Bifrost-overlap, ${summary.kbytes} KB`,
      );
    }
    return;
  }

  if (opts.stdout) {
    process.stdout.write(markdown);
    return;
  }

  fs.writeFileSync(OUTPUT_PATH, markdown, "utf8");

  const driftMsg = summary.drift.length > 0 ? `, ${summary.drift.length} drift finding(s)` : "";
  console.error(
    `[gen:agent-index] wrote ${path.relative(REPO_ROOT, OUTPUT_PATH)} ` +
      `(${summary.total} classes, ${summary.aliases} aliases, ` +
      `${summary.bifrost} Bifrost-overlap, ${summary.kbytes} KB${driftMsg})`,
  );
}

main();
