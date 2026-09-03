import assert from "node:assert/strict";
import { test } from "node:test";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

/**
 * #10692: a `"use client"` page reached the SQLite driver through
 * `serviceKindIndex → mediaServiceKinds → imageRegistry → aihorde/imageModels →
 * aihordeImageCatalog → safeOutboundFetch → proxyFetch → featureFlags → db/core`, so the
 * production build tried to bundle `fs`/`net`/`tls` for the browser and failed with 28
 * `Module not found` errors (`Build App` red for 60 consecutive runs).
 *
 * `serviceKindIndex.ts` had stated the invariant in a comment — *"Client-safe:
 * `mediaServiceKinds` only pulls in the pure-data media registries (no server-only deps)"* —
 * and a comment cannot fail a build, so #10542 broke it unnoticed.
 *
 * This walks the real static-import graph, the same edges the bundler follows, from EVERY
 * `"use client"` file in the repo rather than a hand-picked pair.
 *
 * Two deliberate exclusions, both load-bearing:
 *
 *  - **`import type` is not an edge.** TypeScript erases it before the bundler sees it. A scan
 *    that counts type imports reports 26 phantom leaks against 2 real ones here — a guard that
 *    cries wolf gets switched off.
 *  - **Dynamic `import()` is not followed.** It does not actually break a bundle edge (that was
 *    tried for #10692 and failed), but it does move the module into a chunk the browser only
 *    fetches on demand, which is a legitimate boundary for a lazily-used server path.
 */
const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../..");

/** Modules that pull in Node builtins (fs/net/tls) and must never be statically reachable. */
const SERVER_ONLY = new Set([
  "src/lib/db/core.ts",
  "src/lib/db/adapters/driverFactory.ts",
  "src/lib/db/adapters/sqljsAdapter.ts",
  "src/lib/db/migrationRunner.ts",
  "open-sse/utils/proxyFetch.ts",
  "open-sse/utils/tlsClient.ts",
]);

/**
 * Non-`"use client"` entry points that still end up in a client bundle because client
 * components import them. Kept explicit so the original #10692 chain stays pinned even if the
 * page that exposed it is refactored.
 */
const EXTRA_ENTRIES = [
  "src/lib/providers/serviceKindIndex.ts",
  "open-sse/config/mediaServiceKinds.ts",
];

const EXTENSIONS = [".ts", ".tsx", ".mts", ".js"];
const SKIP_DIRS = new Set(["node_modules", ".git", ".build", "dist", ".next", ".claude"]);

/** Resolve an import specifier to a repo-relative file, or null when it leaves the repo. */
function resolveSpecifier(fromFile: string, specifier: string): string | null {
  let base: string;
  if (specifier.startsWith(".")) {
    base = path.resolve(path.dirname(path.join(REPO_ROOT, fromFile)), specifier);
  } else if (specifier.startsWith("@omniroute/open-sse")) {
    const rest = specifier.slice("@omniroute/open-sse".length).replace(/^\//, "");
    base = path.join(REPO_ROOT, "open-sse", rest);
  } else if (specifier.startsWith("@/")) {
    base = path.join(REPO_ROOT, "src", specifier.slice(2));
  } else {
    return null; // npm package — not our graph
  }

  const candidates = [
    base,
    ...EXTENSIONS.map((ext) => base + ext),
    ...EXTENSIONS.map((ext) => path.join(base, `index${ext}`)),
  ];
  // A `.js` specifier on a first-party module means the sibling `.ts` (see #10674).
  if (base.endsWith(".js")) candidates.push(base.replace(/\.js$/, ".ts"));

  for (const candidate of candidates) {
    if (fs.existsSync(candidate) && fs.statSync(candidate).isFile()) {
      return path.relative(REPO_ROOT, candidate);
    }
  }
  return null;
}

/** True when the import clause contributes no runtime binding (pure `import type`). */
function isTypeOnlyClause(clause: string): boolean {
  if (/^\s*type\s/.test(clause)) return true;
  const named = /\{([^}]*)\}/.exec(clause);
  if (!named) return false;
  // `import Default, { type A }` still emits an edge for the default binding.
  const outsideBraces = clause.replace(/\{[^}]*\}/, "").trim();
  if (/[A-Za-z_$*]/.test(outsideBraces)) return false;
  const bindings = named[1]
    .split(",")
    .map((binding) => binding.trim())
    .filter(Boolean);
  return bindings.length > 0 && bindings.every((binding) => /^type\s/.test(binding));
}

/** Value-carrying static specifiers only. */
function staticSpecifiers(source: string): string[] {
  const withoutDynamic = source.replace(/\bimport\s*\(/g, "__dynamic_import__(");
  const out: string[] = [];
  for (const pattern of [
    /(?:^|\n)\s*import\s+([^;'"]*)from\s*["']([^"']+)["']/g,
    /(?:^|\n)\s*export\s+([^;'"]*)from\s*["']([^"']+)["']/g,
  ]) {
    for (const match of withoutDynamic.matchAll(pattern)) {
      if (isTypeOnlyClause(match[1])) continue;
      out.push(match[2]);
    }
  }
  // Side-effect imports (`import "./x"`) always emit an edge.
  for (const match of withoutDynamic.matchAll(/(?:^|\n)\s*import\s*["']([^"']+)["']/g)) {
    out.push(match[1]);
  }
  return out;
}

const specifierCache = new Map<string, string[]>();
function edgesOf(file: string): string[] {
  const cached = specifierCache.get(file);
  if (cached) return cached;
  const absolute = path.join(REPO_ROOT, file);
  let edges: string[] = [];
  if (fs.existsSync(absolute)) {
    edges = staticSpecifiers(fs.readFileSync(absolute, "utf8"))
      .map((specifier) => resolveSpecifier(file, specifier))
      .filter((resolved): resolved is string => resolved !== null);
  }
  specifierCache.set(file, edges);
  return edges;
}

/** BFS over static imports; returns the first path reaching a server-only module. */
function findServerOnlyPath(entry: string): string[] | null {
  const seen = new Set<string>([entry]);
  const queue: Array<string[]> = [[entry]];
  while (queue.length > 0) {
    const trail = queue.shift()!;
    for (const resolved of edgesOf(trail[trail.length - 1])) {
      if (seen.has(resolved)) continue;
      if (SERVER_ONLY.has(resolved)) return [...trail, resolved];
      seen.add(resolved);
      queue.push([...trail, resolved]);
    }
  }
  return null;
}

function walk(dir: string, acc: string[] = []): string[] {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (SKIP_DIRS.has(entry.name)) continue;
      walk(full, acc);
    } else if (/\.tsx?$/.test(entry.name)) {
      acc.push(path.relative(REPO_ROOT, full));
    }
  }
  return acc;
}

function clientEntryPoints(): string[] {
  return walk(path.join(REPO_ROOT, "src")).filter((file) =>
    /^\s*["']use client["']/m.test(fs.readFileSync(path.join(REPO_ROOT, file), "utf8").slice(0, 200))
  );
}

test("no client entry point statically reaches server-only code", () => {
  const entries = [...clientEntryPoints(), ...EXTRA_ENTRIES];
  assert.ok(entries.length > 100, `expected the repo's client components, found ${entries.length}`);

  const offenders = entries
    .map((entry) => ({ entry, trail: findServerOnlyPath(entry) }))
    .filter((row): row is { entry: string; trail: string[] } => row.trail !== null);

  assert.deepEqual(
    offenders.map((o) => o.entry),
    [],
    "A client bundle would have to include server-only modules:\n" +
      offenders.map((o) => `  ${o.trail.join("\n    → ")}`).join("\n\n") +
      "\nBreak the chain — or, when the binding is only a type, mark it `import type` so it " +
      "carries no runtime edge."
  );
});
