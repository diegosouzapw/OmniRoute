import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import {
  extractImportSpecifiers,
  measureBoundary,
  renderMarkdown,
  subsystemOf,
} from "../../scripts/quality/measure-boundary.mjs";

// Rail 3.8.55 / Task 13 — reproducible measurement of the src <-> open-sse coupling that
// the v4 core/module split has to break. These tests pin the classification rules on a
// synthetic tree so a regex or resolver regression shows up as a wrong count here, not as
// a silently wrong remediation list.

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const SCRIPT = path.join(ROOT, "scripts/quality/measure-boundary.mjs");

type Subsystem = {
  name: string;
  files: number;
  importsOpenSse: number;
  importedByOpenSse: number;
  importsSrc: number;
  importedBySrc: number;
  topTargets: Array<{ target: string; count: number }>;
};
type BoundaryResult = {
  generatedAt: string;
  files: { src: number; openSse: number };
  edges: { srcToOpenSse: number; openSseToSrc: number };
  openSseToSrcEdges: Array<{ from: string; to: string }>;
  bySubsystem: Subsystem[];
};

function writeTree(root: string, files: Record<string, string>) {
  for (const [rel, content] of Object.entries(files)) {
    const abs = path.join(root, rel);
    fs.mkdirSync(path.dirname(abs), { recursive: true });
    fs.writeFileSync(abs, content);
  }
}

const FIXTURE: Record<string, string> = {
  // --- open-sse (engine) ---
  "open-sse/utils/logger.ts": "export const log = () => {};\n",
  "open-sse/utils/error.ts": "export const err = 1;\n",
  "open-sse/index.ts": "export * from './utils/logger';\n",
  // engine -> app via alias (the violation the v4 split must remove)
  "open-sse/handlers/chat.ts": [
    'import { store } from "@/lib/memory/store";',
    'import type { Skill } from "@/lib/skills/types";',
    'import { log } from "../utils/logger";',
    "export const x = store;",
  ].join("\n"),
  // engine -> app via a RELATIVE path that climbs out of open-sse
  "open-sse/services/combo.ts":
    'import { db } from "../../src/lib/db/core";\nexport const y = db;\n',
  // engine -> app via a dynamic import
  "open-sse/services/lazy.ts":
    'export async function f() { return import("@/lib/memory/store"); }\n',
  // engine test files must be ignored
  "open-sse/services/combo.test.ts": 'import { a } from "@/lib/memory/store";\n',
  "open-sse/services/__tests__/x.ts": 'import { a } from "@/lib/memory/store";\n',
  // --- src (app) ---
  "src/lib/memory/store.ts": [
    'import { log } from "@omniroute/open-sse/utils/logger";',
    'import { err } from "@omniroute/open-sse/utils/error.ts";',
    '// import { nope } from "@omniroute/open-sse/utils/commented";',
    "/* require('@omniroute/open-sse/utils/blockcomment') */",
    "export const store = log;",
  ].join("\n"),
  "src/lib/memory/index.ts": 'export * from "./store";\n',
  "src/lib/skills/types.ts": "export type Skill = { id: string };\n",
  "src/lib/skills/registry.ts":
    'const { log } = require("@omniroute/open-sse/utils/logger");\nexport const r = log;\n',
  // a file directly under src/lib counts as its own subsystem
  "src/lib/localDb.ts": 'import x from "@omniroute/open-sse";\nexport default x;\n',
  "src/lib/db/core.ts": "export const db = 1;\n",
  // API route: relative import into open-sse + duplicate import of the same module (deduped)
  "src/app/api/v1/chat/route.ts": [
    'import { log } from "../../../../../open-sse/utils/logger";',
    'import { log as again } from "@omniroute/open-sse/utils/logger";',
    "export const GET = () => (log ?? again);",
  ].join("\n"),
  "src/app/api/memory/route.tsx": 'import { log } from "@omniroute/open-sse/utils/logger";\n',
  // tests under src/ are excluded
  "src/lib/memory/store.test.ts": 'import { log } from "@omniroute/open-sse/utils/logger";\n',
  "src/lib/skills/__tests__/a.test.ts": 'import { log } from "@omniroute/open-sse/utils/logger";\n',
  // excluded directories
  "src/node_modules/pkg/index.ts": 'import { log } from "@omniroute/open-sse/utils/logger";\n',
  "src/.next/server/a.ts": 'import { log } from "@omniroute/open-sse/utils/logger";\n',
  // top-level tests/ is never scanned
  "tests/unit/foo.test.ts": 'import { log } from "@omniroute/open-sse/utils/logger";\n',
};

function withFixture(fn: (root: string) => void) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "measure-boundary-"));
  try {
    writeTree(root, FIXTURE);
    fn(root);
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
}

function sub(result: BoundaryResult, name: string): Subsystem {
  const found = result.bySubsystem.find((s) => s.name === name);
  assert.ok(
    found,
    `subsystem ${name} missing: ${result.bySubsystem.map((s) => s.name).join(", ")}`
  );
  return found as Subsystem;
}

test("extractImportSpecifiers finds static, type, re-export, side-effect, dynamic and require forms", () => {
  const source = [
    'import a from "a";',
    'import type { B } from "b";',
    "import {\n  c,\n  d,\n} from 'c';",
    'export * from "e";',
    'export { f } from "f";',
    'import "side";',
    'const g = await import("g");',
    "const h = require('h');",
    "const notALiteral = import(someVar);",
    '// import x from "commented";',
    '/* import y from "block"; */',
    'const s = "import z from \\"in-string\\"";',
  ].join("\n");
  assert.deepEqual(extractImportSpecifiers(source).sort(), [
    "a",
    "b",
    "c",
    "e",
    "f",
    "g",
    "h",
    "side",
  ]);
});

test("subsystemOf groups by src/lib/<name>, src/app/api/<route>, open-sse/<dir>", () => {
  assert.equal(subsystemOf("src/lib/memory/store.ts"), "src/lib/memory");
  assert.equal(subsystemOf("src/lib/memory/embedding/index.ts"), "src/lib/memory");
  assert.equal(subsystemOf("src/lib/localDb.ts"), "src/lib/localDb");
  assert.equal(subsystemOf("src/app/api/v1/chat/route.ts"), "src/app/api/v1");
  assert.equal(subsystemOf("src/app/api/memory/route.tsx"), "src/app/api/memory");
  assert.equal(subsystemOf("src/app/(dashboard)/page.tsx"), "src/app");
  assert.equal(subsystemOf("src/shared/utils/x.ts"), "src/shared");
  assert.equal(subsystemOf("src/instrumentation-node.ts"), "src/(root)");
  assert.equal(subsystemOf("open-sse/handlers/chat.ts"), "open-sse/handlers");
  assert.equal(subsystemOf("open-sse/index.ts"), "open-sse/(root)");
});

test("measureBoundary counts deduped cross-boundary edges in both directions", () => {
  withFixture((root) => {
    const result = measureBoundary({
      root,
      now: new Date("2026-10-10T00:00:00Z"),
    }) as BoundaryResult;
    assert.equal(result.generatedAt, "2026-10-10T00:00:00.000Z");

    // src files: memory/store, memory/index, skills/types, skills/registry, localDb, db/core,
    // api/v1/chat/route, api/memory/route = 8 (tests, node_modules, .next excluded)
    // open-sse files: utils/logger, utils/error, index, handlers/chat, services/combo,
    // services/lazy = 6 (combo.test.ts and __tests__ excluded)
    assert.deepEqual(result.files, { src: 8, openSse: 6 });

    // src -> open-sse: store->logger, store->error, registry->logger (require),
    // localDb->open-sse/index (bare package alias), v1/chat->logger (relative + alias deduped),
    // api/memory->logger. The commented imports do not count.
    assert.equal(result.edges.srcToOpenSse, 6);

    // open-sse -> src: chat->memory/store, chat->skills/types (type-only still couples),
    // combo->db/core (relative escape), lazy->memory/store (dynamic).
    assert.equal(result.edges.openSseToSrc, 4);
    assert.deepEqual(result.openSseToSrcEdges, [
      { from: "open-sse/handlers/chat.ts", to: "src/lib/memory/store.ts" },
      { from: "open-sse/handlers/chat.ts", to: "src/lib/skills/types.ts" },
      { from: "open-sse/services/combo.ts", to: "src/lib/db/core.ts" },
      { from: "open-sse/services/lazy.ts", to: "src/lib/memory/store.ts" },
    ]);
  });
});

test("measureBoundary aggregates per subsystem with sorted topTargets", () => {
  withFixture((root) => {
    const result = measureBoundary({ root }) as BoundaryResult;

    const memory = sub(result, "src/lib/memory");
    assert.equal(memory.files, 2);
    assert.equal(memory.importsOpenSse, 2);
    assert.equal(memory.importedByOpenSse, 2); // handlers/chat + services/lazy
    assert.deepEqual(memory.topTargets, [
      { target: "open-sse/utils/error.ts", count: 1 },
      { target: "open-sse/utils/logger.ts", count: 1 },
    ]);

    const skills = sub(result, "src/lib/skills");
    assert.equal(skills.importsOpenSse, 1);
    assert.equal(skills.importedByOpenSse, 1);

    const api = sub(result, "src/app/api/v1");
    assert.equal(api.importsOpenSse, 1);

    const services = sub(result, "open-sse/services");
    assert.equal(services.files, 2);
    assert.equal(services.importsSrc, 2);
    assert.equal(services.importsOpenSse, 0);
    assert.deepEqual(services.topTargets, [
      { target: "src/lib/db/core.ts", count: 1 },
      { target: "src/lib/memory/store.ts", count: 1 },
    ]);

    const utils = sub(result, "open-sse/utils");
    assert.equal(utils.importedBySrc, 5); // store x2, registry, v1/chat, api/memory

    // Deterministic order: most coupled first, then by name.
    const weights = result.bySubsystem.map(
      (s) => s.importsOpenSse + s.importedByOpenSse + s.importsSrc + s.importedBySrc
    );
    for (let i = 1; i < weights.length; i++) {
      assert.ok(weights[i - 1] >= weights[i], "bySubsystem must be sorted by coupling desc");
    }
  });
});

test("measureBoundary is deterministic across runs", () => {
  withFixture((root) => {
    const now = new Date("2026-10-10T00:00:00Z");
    const a = JSON.stringify(measureBoundary({ root, now }));
    const b = JSON.stringify(measureBoundary({ root, now }));
    assert.equal(a, b);
  });
});

test("renderMarkdown emits the totals and a subsystem table", () => {
  withFixture((root) => {
    const md = renderMarkdown(measureBoundary({ root }));
    assert.match(md, /src → open-sse edges \| 6/);
    assert.match(md, /open-sse → src edges \| 4/);
    assert.match(md, /\| `src\/lib\/memory` \| 2 \| 2 \| 2 \|/);
    assert.match(md, /`open-sse\/handlers\/chat\.ts` → `src\/lib\/memory\/store\.ts`/);
  });
});

test("CLI prints JSON with --json and Markdown with --md for --root", () => {
  withFixture((root) => {
    const json = spawnSync(process.execPath, [SCRIPT, "--json", "--root", root], {
      encoding: "utf8",
    });
    assert.equal(json.status, 0, json.stderr);
    const parsed = JSON.parse(json.stdout) as BoundaryResult;
    assert.equal(parsed.edges.srcToOpenSse, 6);
    assert.equal(parsed.edges.openSseToSrc, 4);

    const md = spawnSync(process.execPath, [SCRIPT, "--md", "--root", root], { encoding: "utf8" });
    assert.equal(md.status, 0, md.stderr);
    assert.match(md.stdout, /^# /);
  });
});
