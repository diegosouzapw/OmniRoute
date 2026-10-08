/**
 * Public /docs is a fumadocs tree compiled from source.config.ts globs.
 * Operator-internal security writeups (TLS impersonation, MITM decrypt,
 * supply-chain attestation, XOR-mask recipe) must stay in git for
 * engineers and MUST NOT enter the public catalog. A Caddy blanket
 * Basic-auth on /docs is a deploy-time bandage, not the product fix.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { globSync } from "tinyglobby";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, "../..");
const CONFIG_PATH = path.join(REPO_ROOT, "source.config.ts");
const META_PATH = path.join(REPO_ROOT, "docs/security/meta.json");
const DOCKERIGNORE_PATH = path.join(REPO_ROOT, ".dockerignore");

export const SENSITIVE_PUBLIC_DOCS = [
  "docs/security/STEALTH_GUIDE.md",
  "docs/security/SOCKET_DEV_FINDINGS.md",
  "docs/security/MITM-TPROXY-DECRYPT.md",
  "docs/security/PUBLIC_CREDS.md",
] as const;

const PUBLIC_SECURITY_KEEP = [
  "docs/security/GUARDRAILS.md",
  "docs/security/ERROR_SANITIZATION.md",
  "docs/security/ROUTE_GUARD_TIERS.md",
] as const;

function readConfiguredGlobs(): string[] {
  const src = fs.readFileSync(CONFIG_PATH, "utf-8");
  const block = src.match(/files\s*:\s*\[([\s\S]*?)\]/);
  assert.ok(block, "source.config.ts must declare files: [...]");
  const globs = [...block[1].matchAll(/["'`]([^"'`]+)["'`]/g)].map((m) => m[1]);
  assert.ok(globs.length > 0, "source.config.ts must declare at least one glob");
  return globs;
}

function catalogRelPaths(): Set<string> {
  const globs = readConfiguredGlobs();
  const files = globSync(globs, { cwd: path.join(REPO_ROOT, "docs"), onlyFiles: true });
  return new Set(files.map((f) => `docs/${f.replace(/^\.\//, "")}`));
}

function parseDockerignore(text: string) {
  const excludes: string[] = [];
  const includes: string[] = [];
  const rules: Array<{ kind: "exclude" | "include"; pattern: string }> = [];
  for (const raw of text.split(/\r?\n/)) {
    const line = raw.trim();
    if (!line || line.startsWith("#")) continue;
    if (line.startsWith("!")) {
      const pattern = line.slice(1);
      includes.push(pattern);
      rules.push({ kind: "include", pattern });
    } else {
      excludes.push(line);
      rules.push({ kind: "exclude", pattern: line });
    }
  }
  return { excludes, includes, rules };
}

function patternMatches(pattern: string, file: string): boolean {
  const pSegs = pattern.split("/");
  const fSegs = file.split("/");
  return matchSegments(pSegs, 0, fSegs, 0);
}

function matchSegments(p: string[], pi: number, f: string[], fi: number): boolean {
  while (pi < p.length) {
    const seg = p[pi];
    if (seg === "**") {
      if (pi === p.length - 1) return true;
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
  const parts = pattern.split("*");
  let cursor = 0;
  const first = parts[0];
  if (first && !segment.startsWith(first)) return false;
  cursor = first.length;
  const last = parts[parts.length - 1];
  if (last && !segment.endsWith(last)) return false;
  const endLimit = segment.length - last.length;
  for (let i = 1; i < parts.length - 1; i++) {
    const idx = segment.indexOf(parts[i], cursor);
    if (idx === -1 || idx + parts[i].length > endLimit) return false;
    cursor = idx + parts[i].length;
  }
  return true;
}

function isIgnored(
  file: string,
  parsed: {
    excludes: string[];
    includes: string[];
    rules?: Array<{ kind: "exclude" | "include"; pattern: string }>;
  }
): boolean {
  if (parsed.rules && parsed.rules.length > 0) {
    let ignored = false;
    for (const rule of parsed.rules) {
      if (patternMatches(rule.pattern, file) || file === rule.pattern) {
        ignored = rule.kind === "exclude";
      }
    }
    return ignored;
  }
  let ignored = false;
  for (const ex of parsed.excludes) {
    if (patternMatches(ex, file) || file === ex) ignored = true;
  }
  for (const inc of parsed.includes) {
    if (patternMatches(inc, file) || file === inc) ignored = false;
  }
  return ignored;
}

test("dockerignore last matching rule wins", () => {
  const laterExclude = parseDockerignore(
    "!docs/security/STEALTH_GUIDE.md\ndocs/security/STEALTH_GUIDE.md\n"
  );
  assert.equal(
    isIgnored("docs/security/STEALTH_GUIDE.md", laterExclude),
    true,
    "a later exact exclude must win over an earlier include"
  );

  const laterInclude = parseDockerignore(
    "docs/security/STEALTH_GUIDE.md\n!docs/security/STEALTH_GUIDE.md\n"
  );
  assert.equal(
    isIgnored("docs/security/STEALTH_GUIDE.md", laterInclude),
    false,
    "a later exact include must win over an earlier exclude"
  );
});

test("segmentMatches anchors the last literal of a * glob", () => {
  assert.equal(segmentMatches("*.md", "STEALTH_GUIDE.md"), true);
  assert.equal(
    segmentMatches("*.md", "STEALTH_GUIDE.md.bak"),
    false,
    "*.md must not match a longer suffix"
  );
});

test("sensitive security markdown still exists in git for engineers", () => {
  for (const rel of SENSITIVE_PUBLIC_DOCS) {
    assert.ok(
      fs.existsSync(path.join(REPO_ROOT, rel)),
      `${rel} must remain in the repo (catalog exclusion is not a delete)`
    );
  }
});

test("fumadocs catalog glob does not compile sensitive security pages", () => {
  const catalog = catalogRelPaths();
  const leaked = SENSITIVE_PUBLIC_DOCS.filter((rel) => catalog.has(rel));
  assert.deepEqual(
    leaked,
    [],
    `public /docs catalog still compiles operator-internal pages:\n  ${leaked.join("\n  ")}`
  );
  for (const rel of PUBLIC_SECURITY_KEEP) {
    assert.ok(catalog.has(rel), `${rel} must stay on the public security index`);
  }
});

test("security nav meta.json does not list sensitive pages", () => {
  const meta = JSON.parse(fs.readFileSync(META_PATH, "utf-8")) as {
    pages: string[];
  };
  const forbidden = ["STEALTH_GUIDE", "SOCKET_DEV_FINDINGS", "MITM-TPROXY-DECRYPT", "PUBLIC_CREDS"];
  const listed = forbidden.filter((id) => meta.pages.includes(id));
  assert.deepEqual(
    listed,
    [],
    `docs/security/meta.json still links operator-internal pages: ${listed.join(", ")}`
  );
  assert.ok(meta.pages.includes("GUARDRAILS"));
  assert.ok(meta.pages.includes("ERROR_SANITIZATION"));
});

test("docker image does not ship sensitive security markdown", () => {
  const parsed = parseDockerignore(fs.readFileSync(DOCKERIGNORE_PATH, "utf8"));
  const shipped = SENSITIVE_PUBLIC_DOCS.filter((rel) => !isIgnored(rel, parsed));
  assert.deepEqual(
    shipped,
    [],
    `sensitive pages still in Docker context (would be readable if a glob regresses):\n  ${shipped.join("\n  ")}`
  );
});

test("compiled public docs must not markdown-link sensitive pages", () => {
  const compiledRoots = [
    "docs/architecture",
    "docs/guides",
    "docs/reference",
    "docs/frameworks",
    "docs/routing",
    "docs/security",
    "docs/compression",
    "docs/ops",
  ];
  const sensitive = new Set(SENSITIVE_PUBLIC_DOCS.map((rel) => path.basename(rel, ".md")));
  const href = /\]\((?:\.\.\/)*security\/([A-Z0-9_-]+)\.md\)|\]\(\.\/([A-Z0-9_-]+)\.md\)/g;
  const leaks: string[] = [];
  for (const root of compiledRoots) {
    const abs = path.join(REPO_ROOT, root);
    if (!fs.existsSync(abs)) continue;
    const stack = [abs];
    while (stack.length > 0) {
      const dir = stack.pop() as string;
      for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) {
          stack.push(full);
          continue;
        }
        if (!entry.name.endsWith(".md")) continue;
        const rel = path.relative(REPO_ROOT, full).replaceAll("\\", "/");
        if (SENSITIVE_PUBLIC_DOCS.includes(rel as (typeof SENSITIVE_PUBLIC_DOCS)[number])) {
          continue;
        }
        const text = fs.readFileSync(full, "utf8");
        for (const match of text.matchAll(href)) {
          const id = match[1] ?? match[2];
          if (id && sensitive.has(id)) {
            leaks.push(`${rel} -> ${id}`);
          }
        }
      }
    }
  }
  assert.deepEqual(
    leaks,
    [],
    `public /docs pages still href operator-internal docs:\n  ${leaks.join("\n  ")}`
  );
});
