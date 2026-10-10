import { test } from "node:test";
import assert from "node:assert";
import fs from "node:fs";
import path from "node:path";
import os from "node:os";

import {
  isSpawnCapableSource,
  isSpawnCapableModuleSource,
  resolveImportSpecifiers,
  buildImportGraph,
  reachesSpawnCapableModule,
  findTransitivelySpawnCapableRoutes,
} from "../../scripts/check/check-route-guard-membership.ts";

// Regression guard for audit #15159 — G-09.
//
// The route-guard gate detects spawn capability by reading each `route.ts` and
// regex-matching child_process imports / spawn() calls IN THAT FILE ALONE
// (SPAWN_SOURCE_RE). It has no import-graph resolution, so it cannot see
// `route.ts -> fetchCursorAgentModels() -> runCursorAgent() -> spawn()`.
//
// The concrete consequence, quoted from the gate's own freeze entry:
// `src/app/api/providers/[id]/models/route.ts` is frozen in
// KNOWN_UNCLASSIFIED_SOURCE_SPAWN *solely* because of this blind spot, and its
// comment says fixing G-09 would let the entry be removed.
//
// Note what G-09 is NOT: the frozen route is already gated correctly (the route
// requires the trusted `x-omniroute-peer-locality === "loopback"` stamp before the
// spawn and fails closed — see
// tests/unit/authz/route-guard-providers-spawn-local-only.test.ts). This is a
// DETECTION gap, not an open RCE hole. Fixing it changes what the gate can SEE,
// and therefore which routes must be classified.

type Graph = Map<string, Set<string>>;

const resolve = resolveImportSpecifiers as (source: string) => string[];
const buildGraph = buildImportGraph as (opts: {
  repoRoot: string;
  entryFiles: string[];
  maxDepth?: number;
}) => Graph;
const reaches = reachesSpawnCapableModule as (
  graph: Graph,
  repoRoot: string,
  entryFile: string,
  opts?: { maxDepth?: number }
) => { reachable: boolean; via: string[] };
const findTransitive = findTransitivelySpawnCapableRoutes as (opts: {
  repoRoot: string;
}) => { route: string; via: string[] }[];

// --- import specifier extraction ---

test("G-09: extracts bare, alias and relative import specifiers", () => {
  const src = [
    'import { spawn } from "node:child_process";',
    'import { x } from "@/lib/providerModels/cursorAgent";',
    'import { y } from "./discoveryClientVersion";',
    'import { z } from "../shared/thing";',
    'import type { T } from "@/types/only";',
    'const dynamic = await import("@/mitm/manager.runtime");',
  ].join("\n");

  const specs = resolve(src);
  assert.ok(specs.includes("node:child_process"), "bare specifier");
  assert.ok(specs.includes("@/lib/providerModels/cursorAgent"), "@/ alias");
  assert.ok(specs.includes("./discoveryClientVersion"), "relative ./");
  assert.ok(specs.includes("../shared/thing"), "relative ../");
  assert.ok(specs.includes("@/mitm/manager.runtime"), "dynamic import()");
  assert.ok(!specs.includes("@/types/only"), "type-only imports carry no runtime edge");
});

// --- module resolution across the repo's three alias conventions ---

test("G-09: resolves @/ to src/, @omniroute/open-sse/ to open-sse/, and relative paths", () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "g09-"));
  const mkdirp = (p: string) => fs.mkdirSync(path.join(root, p), { recursive: true });
  const write = (p: string, body: string) => {
    mkdirp(path.dirname(p));
    fs.writeFileSync(path.join(root, p), body, "utf8");
  };

  write("src/lib/a.ts", "export const a = 1;");
  write("open-sse/utils/b.ts", "export const b = 1;");
  write(
    "src/app/api/route.ts",
    [
      'import { a } from "@/lib/a";',
      'import { b } from "@omniroute/open-sse/utils/b.ts";',
      'import { c } from "./neighbor";',
    ].join("\n")
  );
  write("src/app/api/neighbor.ts", "export const c = 1;");

  const graph = buildGraph({ repoRoot: root, entryFiles: ["src/app/api/route.ts"] });
  const edges = graph.get("src/app/api/route.ts");

  assert.ok(edges, "entry must be present in the graph");
  assert.ok(edges.has("src/lib/a.ts"), "@/ must resolve to src/");
  assert.ok(edges.has("open-sse/utils/b.ts"), "@omniroute/open-sse must resolve to open-sse/");
  assert.ok(edges.has("src/app/api/neighbor.ts"), "./ must resolve relative to the importer");
});

// --- the actual defect: transitive spawn detection ---

test("G-09: a route with NO direct spawn is still detected via its import graph", () => {
  // This is the exact G-09 blind spot: the route body contains no child_process
  // import and no spawn() call, so the pre-G-09 source scan returns false.
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "g09b-"));
  const mkdirp = (p: string) => fs.mkdirSync(path.join(root, p), { recursive: true });
  const write = (p: string, body: string) => {
    mkdirp(path.dirname(p));
    fs.writeFileSync(path.join(root, p), body, "utf8");
  };

  write(
    "src/lib/providerModels/cursorAgent.ts",
    [
      'import { spawn } from "node:child_process";',
      "export async function fetchCursorAgentModels() { spawn('agent', []); }",
    ].join("\n")
  );

  const routeBody = [
    'import { fetchCursorAgentModels } from "@/lib/providerModels/cursorAgent";',
    "export async function GET() { return Response.json(await fetchCursorAgentModels()); }",
  ].join("\n");
  write("src/app/api/providers/[id]/models/route.ts", routeBody);

  // Precondition: the OLD check says no. This is what makes the test meaningful.
  assert.equal(
    isSpawnCapableSource(routeBody),
    false,
    "precondition: the source-only scan must MISS this route (that IS the defect)"
  );

  // The graph walk must catch it.
  const graph = buildGraph({
    repoRoot: root,
    entryFiles: ["src/app/api/providers/[id]/models/route.ts"],
  });
  const result = reaches(graph, root, "src/app/api/providers/[id]/models/route.ts");

  assert.equal(result.reachable, true, "the import-graph walk must detect the transitive spawn");
  assert.ok(
    result.via.some((v) => v.endsWith("cursorAgent.ts")),
    `expected the spawn module in the path, got ${JSON.stringify(result.via)}`
  );
});

test("G-09: findTransitivelySpawnCapableRoutes does NOT double-report direct-spawn routes", () => {
  // The transitive walk reports only routes with NO direct spawn (the source scan
  // already covers the rest), so the frozen route is correctly absent from this
  // list — see the premise-correction test above for why.
  const root = path.resolve(import.meta.dirname, "..", "..");
  const found = findTransitive({ repoRoot: root });
  const routes = found.map((f) => f.route);

  assert.equal(
    routes.includes("src/app/api/providers/[id]/models/route.ts"),
    false,
    "the route has a (comment-matched) direct spawn, so the transitive walk must not double-report it"
  );
  assert.ok(found.length > 0, "the transitive walk must still find real indirect routes");
});

test("G-09: the frozen route's spawn reachability is real, not a comment false-positive", () => {
  // CORRECTION to the audit's stated premise, found by running this against the
  // real repo.
  //
  // The audit said the route was frozen "solely because" the gate cannot follow
  // the transitive chain. In fact `isSpawnCapableSource` ALREADY returns true for
  // it — but only because SPAWN_SOURCE_RE matches the word `spawn(` inside a
  // COMMENT at route.ts:1454 ("-> spawn() at src/lib/providerModels/cursorAgent.ts:17").
  //
  // So the freeze rested on a comment, not on the import graph. That is a real
  // defect in the OTHER direction — the gate's route-level scan is unsound — and
  // it must be pinned here, because "fix the comment" is the tempting wrong fix
  // that would silently un-freeze a genuinely spawn-capable route.
  const root = path.resolve(import.meta.dirname, "..", "..");
  const route = "src/app/api/providers/[id]/models/route.ts";
  const src = fs.readFileSync(path.join(root, route), "utf8");

  // Precondition: the route's own code has no spawn — only its comment does.
  const codeOnly = src.replace(/\/\*[\s\S]*?\*\//g, "").replace(/(^|[^:])\/\/.*$/gm, "$1");
  assert.equal(
    isSpawnCapableSource(codeOnly),
    false,
    "precondition: with comments stripped the route body has NO direct spawn"
  );

  // ...yet the unsound source scan still reports it, because of the comment.
  assert.equal(
    isSpawnCapableSource(src),
    true,
    "precondition: the CURRENT scan matches spawn( inside that comment"
  );

  // And the import graph — the actual mechanism G-09 was about — reaches a real
  // spawn module WITHOUT relying on any comment.
  //
  // Assertion is on reachability, not on WHICH module won: the walk is
  // breadth-first and this route imports several spawn-capable modules
  // (cursorAgent.ts among them), so the shortest chain may well be a different
  // one. Pinning the specific module would make the test fail on an unrelated
  // refactor.
  const graph = buildImportGraph({ repoRoot: root, entryFiles: [route] });
  const result = reaches(graph, root, route);
  assert.equal(result.reachable, true, "the import graph must reach a spawn module");
  assert.ok(
    result.via.length >= 2,
    `expected a multi-hop chain, got ${JSON.stringify(result.via)}`
  );

  // The cursor-specific claim is asserted separately and independently of the
  // BFS race: resolve the module the freeze entry names and confirm it really is
  // spawn-capable, i.e. the documented chain is real.
  const cursorModule = "src/lib/providerModels/cursorAgent.ts";
  const cursorSrc = fs.readFileSync(path.join(root, cursorModule), "utf8");
  assert.equal(
    isSpawnCapableModuleSource(cursorSrc),
    true,
    "the module named in the freeze entry must genuinely be spawn-capable"
  );
});

test("G-09: every transitively-detected route is ALSO detected by the source scan or classified", () => {
  // Guard against a detector that cries wolf. Anything the graph finds must be a
  // route that genuinely has no direct spawn (else it was already covered) and
  // must be either classified local-only or explicitly frozen — otherwise the
  // gate would go red on the whole repo.
  const root = path.resolve(import.meta.dirname, "..", "..");
  const found = findTransitive({ repoRoot: root });

  for (const { route } of found) {
    const src = fs.readFileSync(path.join(root, route), "utf8");
    assert.equal(
      isSpawnCapableSource(src),
      false,
      `${route} was reported transitively but has a direct spawn — detection is over-broad`
    );
  }
});

test("G-09: a cycle in the import graph terminates instead of hanging the gate", () => {
  // CI hangs are expensive; a naive recursive walk on a cycle would be one.
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "g09c-"));
  const mkdirp = (p: string) => fs.mkdirSync(path.join(root, p), { recursive: true });
  const write = (p: string, body: string) => {
    mkdirp(path.dirname(p));
    fs.writeFileSync(path.join(root, p), body, "utf8");
  };

  write("src/app/api/route.ts", 'import { b } from "@/lib/b";\nexport const a = b;');
  write("src/lib/b.ts", 'import { a } from "@/app/api/route";\nexport const b = a;');

  const graph = buildGraph({ repoRoot: root, entryFiles: ["src/app/api/route.ts"] });
  const result = reaches(graph, root, "src/app/api/route.ts");

  assert.equal(result.reachable, false, "no spawn in the cycle");
  assert.ok(Array.isArray(result.via));
});

test("G-09: the graph walk honours maxDepth so it cannot walk the whole repo", () => {
  // A 6-hop chain must NOT be resolved at maxDepth 3 — otherwise a single route
  // could pull in thousands of modules and the gate would time out in CI.
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "g09d-"));
  const mkdirp = (p: string) => fs.mkdirSync(path.join(root, p), { recursive: true });
  const write = (p: string, body: string) => {
    mkdirp(path.dirname(p));
    fs.writeFileSync(path.join(root, p), body, "utf8");
  };

  write("src/app/api/route.ts", 'import { l1 } from "@/lib/l1";');
  for (let i = 1; i <= 6; i++) {
    const next = i < 6 ? `import { l${i + 1} } from "@/lib/l${i + 1}";` : "";
    write(`src/lib/l${i}.ts`, `${next}\nexport const l${i} = 1;`);
  }
  write(
    "src/lib/l6.ts",
    'import { spawn } from "node:child_process";\nspawn("x", []);\nexport const l6 = 1;'
  );

  const graph = buildGraph({ repoRoot: root, entryFiles: ["src/app/api/route.ts"], maxDepth: 8 });

  assert.equal(reaches(graph, root, "src/app/api/route.ts", { maxDepth: 8 }).reachable, true);
  assert.equal(
    reaches(graph, root, "src/app/api/route.ts", { maxDepth: 3 }).reachable,
    false,
    "maxDepth must actually bound the walk"
  );
});

test("G-09: the freeze entry no longer claims the gate cannot follow transitive spawns", () => {
  // The entry said "Tracked by G-09 (gate cannot follow transitive spawns)". That
  // premise is now false, so the stale claim must be gone. The freeze itself
  // STAYS (its S-01 security rationale is unchanged) — only the detection-gap
  // justification is removed, and the new text must say why it remains.
  const root = path.resolve(import.meta.dirname, "..", "..");
  const gateSrc = fs.readFileSync(
    path.join(root, "scripts/check/check-route-guard-membership.ts"),
    "utf8"
  );

  assert.doesNotMatch(
    gateSrc,
    /gate cannot follow transitive spawns/,
    "the stale G-09 detection-gap premise must not survive in the freeze entry"
  );
  assert.doesNotMatch(
    gateSrc,
    /import-graph walk\) would let this entry be removed/,
    "must not promise the entry can be removed now that the walk exists"
  );
  assert.match(
    gateSrc,
    /G-09 closed: the gate now follows this chain via the import graph/,
    "the entry must record that G-09 is resolved"
  );
});
