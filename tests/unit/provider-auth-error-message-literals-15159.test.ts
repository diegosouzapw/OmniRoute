// #15159 — the invariant that makes 8 provider-auth routes safe, pinned.
//
// `src/app/api/providers/{agy,claude,codex}-auth/**` forward a TYPED error straight to
// the client:
//
//   if (error instanceof AgyAuthFileError) {
//     return NextResponse.json({ error: error.message, code: error.code }, { status: error.status });
//   }
//   return NextResponse.json({ error: sanitizeErrorMessage(error) || "…" }, …);
//
// The generic branch sanitizes; the typed branch does not. That is safe ONLY because
// every message those classes are constructed with is a static app-authored literal —
// none interpolates an upstream body, a token, or a filesystem path. Verified across
// all 34 throw sites in `src/lib/oauth/utils/{agy,claude,codex}Auth*.ts`.
//
// So the risk here is not today's code, it is the NEXT throw site. Someone adding
// `throw new CodexAuthFileError(\`refresh failed: ${upstream.body}\`)` would silently
// start leaking through eight routes that all read as safe on inspection — and
// `check:error-helper` cannot see it, because these files DO import
// `sanitizeErrorMessage` (that is the G-03 blind spot, fixed in #15376).
//
// This test fails the moment a message stops being a literal. The correct fix then is at
// the THROW SITE (keep upstream text out of the message), not to sanitize in eight routes.
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";

const ERROR_CLASS = /\bnew (Agy|Claude|Codex)AuthFileError\(/;

const MODULES = [
  "src/lib/oauth/utils/agyAuthImport.ts",
  "src/lib/oauth/utils/claudeAuthImport.ts",
  "src/lib/oauth/utils/claudeAuthFile.ts",
  "src/lib/oauth/utils/codexAuthImport.ts",
  "src/lib/oauth/utils/codexAuthFile.ts",
];

function source(path: string): string {
  return readFileSync(new URL(`../../${path}`, import.meta.url), "utf8");
}

type Site = { file: string; line: number; call: string };

/** Every `new XAuthFileError(...)` call site, with its full argument text. */
function throwSites(): Site[] {
  const sites: Site[] = [];
  for (const file of MODULES) {
    const lines = source(file).split("\n");
    for (let i = 0; i < lines.length; i++) {
      if (!ERROR_CLASS.test(lines[i])) continue;
      let call = lines[i];
      let j = i;
      // The call may span lines; stop at the `);` that closes it, bounded so a
      // malformed file cannot make this scan run away.
      while (!/\);\s*$/.test(call.trim()) && j + 1 < lines.length && j - i < 14) {
        j++;
        call += `\n${lines[j]}`;
      }
      sites.push({ file, line: i + 1, call });
    }
  }
  return sites;
}

test("the throw-site scan actually finds the throw sites", () => {
  // Without this the meaningful test below could pass on an empty set. 34 is the count
  // measured across the five modules; a lower bound is used so an intentional edit that
  // adds or removes a site does not need the number bumped.
  const sites = throwSites();
  assert.ok(
    sites.length >= 25,
    `expected at least 25 AuthFileError throw sites, found ${sites.length} — the scanner itself is broken`
  );
});

test("every AuthFileError message is a static literal, never interpolated", () => {
  const offenders = throwSites()
    .filter(({ call }) => {
      // A backtick anywhere in the argument list means a template literal; a `+` glued
      // to an identifier means concatenation. Both can smuggle upstream text into a
      // message that eight routes forward to the client un-sanitized.
      return /`|\$\{|\+\s*[A-Za-z_$]/.test(call);
    })
    .map(({ file, line, call }) => `${file}:${line} :: ${call.replace(/\s+/g, " ").trim()}`);

  assert.deepEqual(
    offenders,
    [],
    `these AuthFileError messages are not literals — sanitize at the throw site or drop the raw text:\n${offenders.join("\n")}`
  );
});

test("the detector used above would catch an interpolating message", () => {
  // SHAPE-SANITY. The scan above is a regex heuristic; prove it is not vacuous by
  // running the same predicate over a known-bad construction.
  const bad = [
    "throw new CodexAuthFileError(`refresh failed: ${upstream.body}`);",
    'throw new ClaudeAuthFileError("bad " + reason);',
    "throw new AgyAuthFileError(\n  `token ${token} rejected`,\n  401\n);",
  ];
  const isDynamic = (call: string) => /`|\$\{|\+\s*[A-Za-z_$]/.test(call);

  for (const call of bad) {
    assert.equal(isDynamic(call), true, `detector missed a dynamic message: ${call}`);
  }
  for (const good of ['throw new CodexAuthFileError("Connection not found", 404, "not_found");']) {
    assert.equal(isDynamic(good), false, `detector flagged a static message: ${good}`);
  }
});

test("the three error classes carry a status and a stable code", () => {
  // The routes rely on `error.status` and `error.code` for the HTTP response, so a
  // missing field would surface as `undefined` in a client-facing body.
  for (const [file, className] of [
    ["src/lib/oauth/utils/agyAuthImport.ts", "AgyAuthFileError"],
    ["src/lib/oauth/utils/claudeAuthFile.ts", "ClaudeAuthFileError"],
    ["src/lib/oauth/utils/codexAuthFile.ts", "CodexAuthFileError"],
  ] as const) {
    const text = source(file);
    const start = text.indexOf(`export class ${className}`);
    assert.notEqual(start, -1, `${className} must be exported from ${file}`);
    const body = text.slice(start, start + 500);

    assert.match(body, /status:\s*number/, `${className} must declare a numeric status`);
    assert.match(body, /code:\s*string/, `${className} must declare a code`);
    assert.match(
      body,
      /constructor\([^)]*status\s*=\s*\d+[^)]*code\s*=\s*"[a-z_]+"/s,
      `${className} must default both status and code so a throw site cannot omit them`
    );
  }
});

test("all 8 provider-auth routes sanitize their GENERIC branch", () => {
  // The other half of the invariant: the typed branch is safe because of the literal
  // test above, and the generic branch is safe because it sanitizes. Both halves are
  // required — if someone deletes the sanitize call here, the routes start leaking
  // arbitrary errors.
  const ROUTES = [
    "src/app/api/providers/agy-auth/apply-local/route.ts",
    "src/app/api/providers/agy-auth/import/route.ts",
    "src/app/api/providers/claude-auth/import/route.ts",
    "src/app/api/providers/codex-auth/import/route.ts",
    "src/app/api/providers/[id]/claude-auth/apply-local/route.ts",
    "src/app/api/providers/[id]/claude-auth/export/route.ts",
    "src/app/api/providers/[id]/codex-auth/apply-local/route.ts",
    "src/app/api/providers/[id]/codex-auth/export/route.ts",
  ];

  const missing: string[] = [];
  for (const route of ROUTES) {
    const text = source(route);
    if (!/sanitizeErrorMessage\(/.test(text)) missing.push(`${route} (no sanitizeErrorMessage)`);
    if (!/AuthFileError/.test(text)) missing.push(`${route} (no typed branch — shape changed?)`);
  }

  assert.deepEqual(missing, [], `these routes lost part of the guarantee:\n${missing.join("\n")}`);
});
