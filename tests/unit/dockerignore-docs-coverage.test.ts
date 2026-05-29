/**
 * Issue #2348 — Regression guard for the Docker image documentation bundle.
 *
 * The Dashboard Docs viewer at `src/app/docs/[slug]/page.tsx` reads markdown
 * from `process.cwd()/docs/<file>` at runtime. The previous `.dockerignore`
 * shipped only `docs/openapi.yaml` to the container, so every help screen
 * threw ENOENT.
 *
 * This test parses `.dockerignore`, applies it against the working tree,
 * and asserts that the critical English markdown files are still in the
 * Docker build context.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, "../..");
const DOCKERIGNORE = path.resolve(REPO_ROOT, ".dockerignore");

// Subset of the docs viewer's catalog that MUST survive the docker filter.
// Sourced from src/app/docs/lib/docs-auto-generated.ts.
const REQUIRED_DOCS = [
  "docs/README.md",
  "docs/PROVIDERS.md",
  "docs/routing/AUTO-COMBO.md",
  "docs/guides/SETUP_GUIDE.md",
  "docs/guides/TROUBLESHOOTING.md",
  "docs/reference/API_REFERENCE.md",
  "docs/reference/PROVIDER_REFERENCE.md",
  "docs/reference/ENVIRONMENT.md",
];

// Referenced from docs/**/*.md — fumadocs-mdx webpack build fails if missing.
const REQUIRED_DOC_DIAGRAMS = [
  "docs/diagrams/exported/request-pipeline.svg",
  "docs/diagrams/exported/resilience-3layers.svg",
  "docs/diagrams/exported/authz-pipeline.svg",
  "docs/diagrams/exported/db-schema-overview.svg",
];

const REQUIRED_DOC_SCREENSHOTS = [
  "docs/screenshots/01-providers.png",
  "docs/screenshots/05-translator.png",
];

// Compile .dockerignore patterns into a simple matcher.
// We only need to support the directives we actually use: glob `**`, plain
// path prefixes, and negations starting with `!`.
function parseDockerignore(text: string): { excludes: string[]; includes: string[] } {
  const excludes: string[] = [];
  const includes: string[] = [];
  for (const raw of text.split(/\r?\n/)) {
    const line = raw.trim();
    if (!line || line.startsWith("#")) continue;
    if (line.startsWith("!")) {
      includes.push(line.slice(1));
    } else {
      excludes.push(line);
    }
  }
  return { excludes, includes };
}

/**
 * Match a Docker glob pattern against a file path without building a dynamic
 * RegExp (avoid ReDoS risk on patterns sourced from .dockerignore). We walk
 * the pattern token-by-token. Supported syntax (the subset our .dockerignore
 * actually uses): literal segments, `*` (no slash), `**` (any depth incl. 0),
 * and trailing `**`.
 */
function patternMatches(pattern: string, file: string): boolean {
  const pSegs = pattern.split("/");
  const fSegs = file.split("/");
  return matchSegments(pSegs, 0, fSegs, 0);
}

function matchSegments(p: string[], pi: number, f: string[], fi: number): boolean {
  while (pi < p.length) {
    const seg = p[pi];
    if (seg === "**") {
      // Try consuming 0..N file segments.
      if (pi === p.length - 1) return true; // trailing ** consumes everything
      for (let k = fi; k <= f.length; k++) {
        if (matchSegments(p, pi + 1, f, k)) return true;
      }
      return false;
    }
    if (fi >= f.length) return false;
    if (!segmentMatches(seg, f[fi])) return false;
    pi++;
    fi++;
  }
  return fi === f.length;
}

function segmentMatches(pattern: string, segment: string): boolean {
  if (pattern === "*") return true;
  if (!pattern.includes("*")) return pattern === segment;
  // Single-segment glob with one or more `*` wildcards. Walk literal chunks.
  const parts = pattern.split("*");
  let cursor = 0;
  // Anchor first chunk to start.
  const first = parts[0];
  if (first && !segment.startsWith(first)) return false;
  cursor = first.length;
  // Anchor last chunk to end.
  const last = parts[parts.length - 1];
  if (last && !segment.endsWith(last)) return false;
  // Each middle chunk must appear in order between cursor and end-last.
  const endLimit = segment.length - last.length;
  for (let i = 1; i < parts.length - 1; i++) {
    const idx = segment.indexOf(parts[i], cursor);
    if (idx === -1 || idx + parts[i].length > endLimit) return false;
    cursor = idx + parts[i].length;
  }
  return true;
}

function isIgnored(file: string, parsed: { excludes: string[]; includes: string[] }): boolean {
  let ignored = false;
  for (const ex of parsed.excludes) if (patternMatches(ex, file)) ignored = true;
  if (ignored) {
    for (const inc of parsed.includes) if (patternMatches(inc, file)) ignored = false;
  }
  return ignored;
}

test("#2348 .dockerignore keeps every doc the in-product viewer needs", () => {
  const parsed = parseDockerignore(fs.readFileSync(DOCKERIGNORE, "utf8"));
  const missing: string[] = [];
  const ignored: string[] = [];

  for (const docPath of [...REQUIRED_DOCS, ...REQUIRED_DOC_DIAGRAMS, ...REQUIRED_DOC_SCREENSHOTS]) {
    const absPath = path.resolve(REPO_ROOT, docPath);
    if (!fs.existsSync(absPath)) {
      missing.push(docPath);
      continue;
    }
    if (isIgnored(docPath, parsed)) {
      ignored.push(docPath);
    }
  }

  assert.deepEqual(missing, [], `Required docs missing from repo: ${missing.join(", ")}`);
  assert.deepEqual(
    ignored,
    [],
    `Files excluded from Docker context — Dashboard Docs viewer will 404 on these:\n  ${ignored.join("\n  ")}`
  );
});

test("#2348 .dockerignore still excludes the heavy i18n tree", () => {
  const parsed = parseDockerignore(fs.readFileSync(DOCKERIGNORE, "utf8"));
  const heavy = "docs/i18n/pt-BR/docs/routing/AUTO-COMBO.md";
  assert.ok(
    isIgnored(heavy, parsed),
    `${heavy} should be excluded from Docker context but is not — image size will balloon`
  );
});
