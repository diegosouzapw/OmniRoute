import test from "node:test";
import assert from "node:assert/strict";
import path from "node:path";
import fs from "node:fs";
import os from "node:os";

import {
  runFabricatedDocsCheck,
  formatHumanReport,
} from "../../scripts/check/check-fabricated-docs.mjs";

// ── Fixture helpers ─────────────────────────────────────────────────────────
// The hardened checker accepts a `root` so we can run the full pipeline against a
// throwaway fixture repo (its own docs/, src/, .env.example) instead of the live
// tree. Each fixture is a minimal repo: a code surface to index + a single doc.

type Fixture = { docs?: Record<string, string>; files?: Record<string, string> };

function makeFixtureRoot(fx: Fixture): string {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "fab-docs-"));
  const write = (rel: string, content: string) => {
    const abs = path.join(root, rel);
    fs.mkdirSync(path.dirname(abs), { recursive: true });
    fs.writeFileSync(abs, content);
  };
  // Always provide an AGENTS.md so allScanFiles() has at least one scan target.
  write("AGENTS.md", fx.docs?.["AGENTS.md"] ?? "# Fixture\n");
  for (const [rel, content] of Object.entries(fx.docs ?? {})) {
    if (rel === "AGENTS.md") write(rel, content);
    else write(path.join("docs", rel), content);
  }
  for (const [rel, content] of Object.entries(fx.files ?? {})) write(rel, content);
  return root;
}

/** Returns the set of distinct `${kind}::${value}` findings for a fixture. */
function findingsFor(fx: Fixture): Set<string> {
  const root = makeFixtureRoot(fx);
  try {
    const result = runFabricatedDocsCheck({ root });
    const out = new Set<string>();
    for (const f of result.files) {
      for (const finding of f.findings) out.add(`${finding.kind}::${finding.value}`);
    }
    return out;
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
}

// We can't easily mock the buildCodebaseIndex() which walks src/app/api etc.
// Instead, we test the report-formatting logic and the no-findings path on
// the real repo, which acts as a smoke test that the script runs end-to-end.

test("runFabricatedDocsCheck: runs without throwing on the real repo", () => {
  const result = runFabricatedDocsCheck();
  assert.ok(result);
  assert.ok(typeof result.totalFindings === "number");
  assert.ok(result.fileCount > 0, "should scan at least AGENTS.md");
  assert.ok(result.index);
  assert.ok(result.index.apiRoutes instanceof Set);
  assert.ok(result.index.envVars instanceof Set);
  assert.ok(result.index.cliCommands instanceof Set);
});

test("runFabricatedDocsCheck: index contains real OmniRoute routes", () => {
  const result = runFabricatedDocsCheck();
  // The real repo has /api/v1/chat/completions — a known truth
  assert.ok(result.index.apiRoutes.has("/api/v1/chat/completions"));
  // The real repo has /api/monitoring/health
  assert.ok(result.index.apiRoutes.has("/api/monitoring/health"));
  // The real repo reads PORT via process.env
  assert.ok(result.index.envVars.has("PORT"));
});

test("formatHumanReport: no-drift case produces a checkmark", () => {
  const result = {
    totalFindings: 0,
    files: [],
    fileCount: 10,
    index: {
      apiRoutes: new Set(),
      envVars: new Set(),
      cliCommands: new Set(),
    },
  };
  const out = formatHumanReport(result);
  assert.match(out, /No fabricated API\/env\/CLI\/hook\/file references found/);
});

test("formatHumanReport: groups findings by kind", () => {
  const result = {
    totalFindings: 3,
    files: [
      {
        rel: "docs/test.md",
        findings: [
          { kind: "api-path", value: "/api/fake/1", line: 1, msg: "fake" },
          { kind: "env-var", value: "FAKE_VAR_X", line: 2, msg: "fake" },
          { kind: "hook", value: "onFake", line: 3, msg: "fake" },
        ],
      },
    ],
    fileCount: 1,
    index: { apiRoutes: new Set(), envVars: new Set(), cliCommands: new Set() },
  };
  const out = formatHumanReport(result);
  assert.match(out, /API endpoint paths/);
  assert.match(out, /Env vars never read/);
  assert.match(out, /Hook names/);
  assert.match(out, /\/api\/fake\/1/);
  assert.match(out, /FAKE_VAR_X/);
  assert.match(out, /onFake/);
});

// ─── Hardening: precision fixes (QG v2 Fase 9 T9) ───────────────────────────
//
// Each test runs the FULL pipeline (index + scan) over a fixture repo so it
// exercises the real heuristic, not a stubbed index.

test("env-var: an `export const` UPPER_SNAKE identifier in backticks is NOT flagged", () => {
  const found = findingsFor({
    files: {
      "src/server/authz/routeGuard.ts":
        "export const LOCAL_ONLY_API_PREFIXES: ReadonlyArray<string> = [];\n",
    },
    docs: {
      "guide.md": "We expose `LOCAL_ONLY_API_PREFIXES` to gate loopback routes.\n",
    },
  });
  assert.ok(
    !found.has("env-var::LOCAL_ONLY_API_PREFIXES"),
    "export const identifier must not be flagged as a fabricated env var"
  );
});

test("env-var: an enum / object-literal member (HALF_OPEN) in backticks is NOT flagged", () => {
  const found = findingsFor({
    files: {
      "src/shared/utils/circuitBreaker.ts":
        'export const STATE = {\n  CLOSED: "CLOSED",\n  HALF_OPEN: "HALF_OPEN",\n} as const;\n',
    },
    docs: { "resilience.md": "After the reset window the breaker enters `HALF_OPEN`.\n" },
  });
  assert.ok(!found.has("env-var::HALF_OPEN"), "object-literal/enum key must not be flagged");
});

test('env-var: a var read via bracket notation process.env["X"] is NOT flagged', () => {
  const found = findingsFor({
    files: {
      "src/lib/memory/vectorStore.ts": 'const k = Number(process.env["MEMORY_RRF_K"] ?? 60);\n',
    },
    docs: { "memory.md": "Tune ranking with `MEMORY_RRF_K`.\n" },
  });
  assert.ok(!found.has("env-var::MEMORY_RRF_K"), 'process.env["X"] read must be indexed');
});

test('env-var: a var read via an env helper (envInt("X")) is NOT flagged', () => {
  const found = findingsFor({
    files: {
      "open-sse/config/constants.ts":
        'const t = envInt("OMNIROUTE_CIRCUIT_BREAKER_OAUTH_THRESHOLD", 8);\n',
    },
    docs: { "cfg.md": "Override with `OMNIROUTE_CIRCUIT_BREAKER_OAUTH_THRESHOLD`.\n" },
  });
  assert.ok(
    !found.has("env-var::OMNIROUTE_CIRCUIT_BREAKER_OAUTH_THRESHOLD"),
    'envInt("X", …) helper read must be indexed'
  );
});

test("env-var: a var read ONLY in tests/ (RUN_CHAOS_INT) is NOT flagged", () => {
  const found = findingsFor({
    files: {
      "tests/integration/resilience-chaos.test.ts":
        'const RUN = process.env.RUN_CHAOS_INT === "1";\n',
    },
    docs: { "testing.md": "Set `RUN_CHAOS_INT` to enable the chaos suite.\n" },
  });
  assert.ok(
    !found.has("env-var::RUN_CHAOS_INT"),
    "env vars read only in tests/ must be indexed, not flagged"
  );
});

test("env-var: a var present only in .env.example is NOT flagged", () => {
  const found = findingsFor({
    files: { ".env.example": "# Contract\nSOME_DOCUMENTED_CONTRACT_VAR=value\n" },
    docs: { "env.md": "Configure `SOME_DOCUMENTED_CONTRACT_VAR` in your environment.\n" },
  });
  assert.ok(
    !found.has("env-var::SOME_DOCUMENTED_CONTRACT_VAR"),
    ".env.example is the env contract — its vars are documented, not fabricated"
  );
});

test("api-path: a documented prefix with sub-routes (/api/cloud/) is NOT flagged", () => {
  const found = findingsFor({
    files: {
      "src/app/api/cloud/auth/route.ts": "export async function GET() {}\n",
    },
    docs: { "cloud.md": "All cloud endpoints live under `/api/cloud/`.\n" },
  });
  assert.ok(
    !found.has("api-path::/api/cloud/"),
    "a prefix that is an ancestor of a real route.ts must resolve"
  );
});

test("api-path: a dynamic-segment prefix (/api/services/{name}/) is NOT flagged", () => {
  const found = findingsFor({
    files: {
      "src/app/api/services/[name]/status/route.ts": "export async function GET() {}\n",
    },
    docs: { "services.md": "Hit `/api/services/{name}/status` for health.\n" },
  });
  assert.ok(
    !found.has("api-path::/api/services/{name}/status"),
    "[name] dynamic segments must match the documented {name} convention"
  );
});

test("hook: a real callback now in KNOWN_HOOKS (onChunk) is NOT flagged", () => {
  const found = findingsFor({
    docs: { "playground.md": "The stream invokes `onChunk` for each delta.\n" },
  });
  assert.ok(!found.has("hook::onChunk"), "onChunk is a real callback and must not be flagged");
});

test("file-ref: a tutorial placeholder (src/app/api/your-route/route.ts) is NOT flagged", () => {
  const found = findingsFor({
    docs: {
      "scenario.md": "Create `src/app/api/your-route/route.ts` with GET/POST handlers.\n",
    },
  });
  assert.ok(
    !found.has("file-ref::src/app/api/your-route/route.ts"),
    "your-* / my* placeholders in how-to scenarios must not be flagged"
  );
});

// ─── ANTI-OVER-SUPPRESSION GUARD (the most important test) ──────────────────
//
// The hardening eliminates false positives by adding PRECISION, never by blinding
// the checker. A reference to something that genuinely does not exist MUST still be
// flagged — otherwise the gate is worthless.

test("ANTI-OVER-SUPPRESSION: a reference to a genuinely missing file IS still flagged", () => {
  const found = findingsFor({
    docs: { "bad.md": "See the handler in `src/nao/existe.ts` for details.\n" },
  });
  assert.ok(
    found.has("file-ref::src/nao/existe.ts"),
    "a non-existent file reference must remain flagged — precision must not blind detection"
  );
});

test("ANTI-OVER-SUPPRESSION: a truly fabricated env var IS still flagged", () => {
  const found = findingsFor({
    // No code reads it, not a code identifier, not in .env.example.
    docs: { "bad.md": "Set `TOTALLY_FABRICATED_ENV_VAR_XYZ` to enable nothing.\n" },
  });
  assert.ok(
    found.has("env-var::TOTALLY_FABRICATED_ENV_VAR_XYZ"),
    "a fabricated env var must remain flagged"
  );
});

test("ANTI-OVER-SUPPRESSION: a fabricated API path with no backing route.ts IS still flagged", () => {
  const found = findingsFor({
    files: { "src/app/api/cloud/auth/route.ts": "export async function GET() {}\n" },
    // /api/imaginary/* has no route.ts anywhere and is not an ancestor of one.
    docs: { "bad.md": "Call `/api/imaginary/widget` to do magic.\n" },
  });
  assert.ok(
    found.has("api-path::/api/imaginary/widget"),
    "an API path with no backing route must remain flagged"
  );
});

test("env-var: a doc explicitly stating a var does NOT exist is NOT flagged (documents absence)", () => {
  const found = findingsFor({
    docs: {
      "memory.md":
        "There are no env vars to tune weights (`MEMORY_RRF_VECTOR_WEIGHT` does not exist).\n",
    },
  });
  assert.ok(
    !found.has("env-var::MEMORY_RRF_VECTOR_WEIGHT"),
    "documenting a var's absence is not fabricating it"
  );
});

test("env-var: a doc saying an override is 'not yet implemented' is NOT flagged", () => {
  const found = findingsFor({
    docs: {
      "zed.md": "A `ZED_CONFIG_PATH` environment variable override is not yet implemented.\n",
    },
  });
  assert.ok(!found.has("env-var::ZED_CONFIG_PATH"), "not-yet-implemented is an absence statement");
});

test("ANTI-OVER-SUPPRESSION: a fabricated env var on a normal (non-negated) line IS still flagged", () => {
  // Same shape as the negation cases above, but WITHOUT an absence statement —
  // proves the negation skip is scoped to lines that disclaim the var, not a blanket
  // suppression of every memory/config-looking name.
  const found = findingsFor({
    docs: { "bad.md": "Set `MADE_UP_TUNING_KNOB_FOR_NOTHING` to change behavior.\n" },
  });
  assert.ok(
    found.has("env-var::MADE_UP_TUNING_KNOB_FOR_NOTHING"),
    "a fabricated env var on a plain line must still be flagged"
  );
});

test("cli-cmd: an arg-bearing `.command('connect <host>')` registration is NOT flagged", () => {
  // The old extraction regex required the subcommand name to be immediately followed
  // by the closing quote, so commander's arg-bearing forms (`connect <host>`,
  // `chat [msg]`) were never indexed → a doc that referenced them was wrongly flagged.
  const found = findingsFor({
    files: {
      "bin/cli/commands/connect.mjs":
        'export function registerConnect(p) {\n  p.command("connect <host>").action(() => {});\n}\n',
    },
    docs: { "guides/remote.md": "You log in once with `omniroute connect <host>`.\n" },
  });
  assert.ok(
    !found.has("cli-cmd::omniroute connect"),
    "a registered arg-bearing subcommand must be recognized and not flagged"
  );
});

test("ANTI-OVER-SUPPRESSION: an unregistered subcommand IS still flagged", () => {
  // Broadening the regex must add precision, not blind detection: a doc that invokes
  // a subcommand with no `.command()` registration anywhere in bin/ must remain flagged.
  const found = findingsFor({
    files: {
      "bin/cli/commands/connect.mjs":
        'export function registerConnect(p) {\n  p.command("connect <host>").action(() => {});\n}\n',
    },
    docs: { "guides/remote.md": "Then run `omniroute teleport <host>` to finish.\n" },
  });
  assert.ok(
    found.has("cli-cmd::omniroute teleport"),
    "an unregistered subcommand must remain flagged — precision must not blind detection"
  );
});
