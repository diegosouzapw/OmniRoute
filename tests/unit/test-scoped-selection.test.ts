/**
 * test:scoped — verifies the TIA selection logic used by `npm run test:scoped`.
 *
 * The shell script (`scripts/quality/test-scoped.sh`) delegates to
 * `select-impacted-tests.mjs` for the actual test selection. This test
 * exercises that selection logic with synthetic inputs so the gate stays
 * correct without running the full shell pipeline.
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import { selectImpacted } from "../../scripts/quality/select-impacted-tests.mjs";

// Minimal impact map for testing.
const MAP = {
  sources: {
    "src/app/api/v1/chat/route.ts": [
      "tests/unit/api/chat-route.test.ts",
      "tests/unit/api/cors.test.ts",
    ],
    "open-sse/handlers/chatCore.ts": [
      "tests/unit/api/chat-route.test.ts",
      "tests/unit/combo/combo-strategy.test.ts",
    ],
    "src/shared/constants/routingStrategies.ts": ["tests/unit/combo/combo-strategy.test.ts"],
  },
};

test("selectImpacted: returns impacted tests for changed source files", () => {
  const sel = selectImpacted({
    changed: ["src/app/api/v1/chat/route.ts"],
    map: MAP,
  });
  assert.deepEqual(sel, ["tests/unit/api/chat-route.test.ts", "tests/unit/api/cors.test.ts"]);
});

test("selectImpacted: deduplicates tests impacted by multiple changed files", () => {
  const sel = selectImpacted({
    changed: ["src/app/api/v1/chat/route.ts", "open-sse/handlers/chatCore.ts"],
    map: MAP,
  });
  // chat-route.test.ts is impacted by both — must appear once
  assert.deepEqual(sel, [
    "tests/unit/api/chat-route.test.ts",
    "tests/unit/api/cors.test.ts",
    "tests/unit/combo/combo-strategy.test.ts",
  ]);
});

test("selectImpacted: returns __RUN_ALL__ when a hub file changes", () => {
  const sel = selectImpacted({
    changed: ["tsconfig.json", "src/app/api/v1/chat/route.ts"],
    map: MAP,
  });
  assert.deepEqual(sel, ["__RUN_ALL__"]);
});

test("selectImpacted: returns __RUN_ALL__ when a source file has no map entry", () => {
  const sel = selectImpacted({
    changed: ["src/lib/new-module.ts"],
    map: MAP,
  });
  assert.deepEqual(sel, ["__RUN_ALL__"]);
});

test("selectImpacted: includes changed test files directly", () => {
  const sel = selectImpacted({
    changed: ["tests/unit/api/chat-route.test.ts"],
    map: MAP,
  });
  assert.deepEqual(sel, ["tests/unit/api/chat-route.test.ts"]);
});

test("selectImpacted: returns empty array when no files impact tests", () => {
  // A non-source, non-test file that isn't a hub
  const sel = selectImpacted({
    changed: ["docs/architecture/ARCHITECTURE.md"],
    map: MAP,
  });
  assert.deepEqual(sel, []);
});

test("selectImpacted: non-source files are ignored (no __RUN_ALL__)", () => {
  const sel = selectImpacted({
    changed: ["README.md", ".gitignore"],
    map: MAP,
  });
  assert.deepEqual(sel, []);
});

// ── #8084 D1 completion: stdin mode + loader parity ─────────────────────────
import fs from "node:fs";
import path from "node:path";
import { changedFilesFromStdin } from "../../scripts/quality/select-impacted-tests.mjs";

test("changedFilesFromStdin: one path per line, trimmed, blanks dropped", () => {
  assert.deepEqual(changedFilesFromStdin("  src/a.ts \n\nopen-sse/b.ts\r\n\n"), [
    "src/a.ts",
    "open-sse/b.ts",
  ]);
  assert.deepEqual(changedFilesFromStdin(""), []);
  assert.deepEqual(changedFilesFromStdin(undefined), []);
});

const SCRIPT = fs.readFileSync(
  path.resolve(import.meta.dirname, "../../scripts/quality/test-scoped.sh"),
  "utf8"
);

test("test-scoped.sh feeds the selector via --stdin (staged mode must not read git commits)", () => {
  assert.match(SCRIPT, /select-impacted-tests\.mjs" --stdin/);
});

test("test-scoped.sh mirrors the CI loader split (#6787): dashboard→tsx, serial→concurrency=1, rest→tsx/esm", () => {
  assert.match(SCRIPT, /tests\/unit\/dashboard\/\*\) DASH\+=/);
  assert.match(SCRIPT, /tests\/unit\/serial\/\*\) SERIAL\+=/);
  assert.match(
    SCRIPT,
    /node --import tsx "\$\{NODE_COMMON\[@\]\}" --test-concurrency=4 "\$\{DASH\[@\]\}"/
  );
  assert.match(
    SCRIPT,
    /node --import tsx\/esm "\$\{NODE_COMMON\[@\]\}" --test-concurrency=1 "\$\{SERIAL\[@\]\}"/
  );
  assert.match(
    SCRIPT,
    /node --import tsx\/esm "\$\{NODE_COMMON\[@\]\}" --test-concurrency=4 "\$\{REST\[@\]\}"/
  );
});

test("package.json exposes every mode the script header documents", () => {
  const pkg = JSON.parse(
    fs.readFileSync(path.resolve(import.meta.dirname, "../../package.json"), "utf8")
  );
  for (const name of ["test:scoped", "test:scoped:staged", "test:scoped:full"]) {
    assert.ok(pkg.scripts[name], `missing script ${name}`);
    assert.match(pkg.scripts[name], /scripts\/quality\/test-scoped\.sh/);
  }
  assert.match(pkg.scripts["test:scoped:full"], /--full/);
});
