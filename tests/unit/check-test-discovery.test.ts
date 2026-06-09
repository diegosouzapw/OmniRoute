// TDD — gate 6A.1: check-test-discovery
// Todo arquivo *.test.ts|tsx / *.spec.ts|tsx do repo deve ser COLETADO por pelo menos
// um runner declarado (node --test globs, vitest includes, playwright testDir).
// Órfão novo → fail; entrada de baseline que deixou de ser órfã → fail (stale).
import { test } from "node:test";
import assert from "node:assert";
import {
  globToRegExp,
  findOrphans,
  evaluateAgainstBaseline,
  findCollectorDrift,
} from "../../scripts/check/check-test-discovery.mjs";

test("globToRegExp: glob top-level NÃO casa subdiretório", () => {
  const re = globToRegExp("tests/unit/*.test.ts");
  assert.equal(re.test("tests/unit/foo.test.ts"), true);
  assert.equal(re.test("tests/unit/authz/routeGuard.test.ts"), false);
});

test("globToRegExp: glob recursivo ** casa subdiretórios em qualquer profundidade", () => {
  const re = globToRegExp("tests/unit/**/*.test.ts");
  assert.equal(re.test("tests/unit/authz/routeGuard.test.ts"), true);
  assert.equal(re.test("tests/unit/a/b/c.test.ts"), true);
  assert.equal(re.test("tests/e2e/foo.test.ts"), false);
});

test("globToRegExp: braces {ts,tsx} expandem alternativas", () => {
  const re = globToRegExp("src/**/*.test.{ts,tsx}");
  assert.equal(re.test("src/shared/components/Foo.test.tsx"), true);
  assert.equal(re.test("src/lib/bar.test.ts"), true);
  assert.equal(re.test("src/lib/bar.test.js"), false);
});

test("globToRegExp: * não atravessa separador de diretório", () => {
  const re = globToRegExp("tests/unit/*.test.ts");
  assert.equal(re.test("tests/unit/sub/deep.test.ts"), false);
});

test("findOrphans: arquivo em subdir é órfão sob glob top-level; coberto sob recursivo", () => {
  const files = ["tests/unit/top.test.ts", "tests/unit/authz/routeGuard.test.ts"];
  assert.deepEqual(findOrphans(files, ["tests/unit/*.test.ts"]), [
    "tests/unit/authz/routeGuard.test.ts",
  ]);
  assert.deepEqual(findOrphans(files, ["tests/unit/**/*.test.ts"]), []);
});

test("findOrphans: múltiplos collectors — basta UM casar", () => {
  const files = ["tests/unit/autoCombo/scoring.test.ts"];
  const globs = ["tests/unit/*.test.ts", "tests/unit/autoCombo/**/*.test.ts"];
  assert.deepEqual(findOrphans(files, globs), []);
});

test("evaluateAgainstBaseline: órfão novo é flagado; órfão congelado passa", () => {
  const { newOrphans, stale } = evaluateAgainstBaseline(
    ["tests/unit/novo/a.test.ts", "tests/unit/velho/b.test.ts"],
    ["tests/unit/velho/b.test.ts"]
  );
  assert.deepEqual(newOrphans, ["tests/unit/novo/a.test.ts"]);
  assert.deepEqual(stale, []);
});

test("evaluateAgainstBaseline: entrada congelada que deixou de ser órfã é STALE (remova)", () => {
  const { newOrphans, stale } = evaluateAgainstBaseline(
    [],
    ["tests/unit/religado/c.test.ts"]
  );
  assert.deepEqual(newOrphans, []);
  assert.deepEqual(stale, ["tests/unit/religado/c.test.ts"]);
});

test("findCollectorDrift: glob declarado deve aparecer textualmente em TODAS as fontes dele", () => {
  const collectors = [
    { glob: "tests/unit/*.test.ts", sources: ["package.json", ".github/workflows/ci.yml"] },
  ];
  const contents = {
    "package.json": 'scripts: "node --test tests/unit/*.test.ts"',
    ".github/workflows/ci.yml": "run: node --test --test-shard=1/8 OUTRO_GLOB",
  };
  const drift = findCollectorDrift(collectors, contents);
  assert.equal(drift.length, 1);
  assert.match(drift[0], /ci\.yml/);
  assert.match(drift[0], /tests\/unit\/\*\.test\.ts/);
});

test("findCollectorDrift: sem drift quando o glob aparece em todas as fontes", () => {
  const collectors = [{ glob: "tests/unit/*.test.ts", sources: ["package.json"] }];
  const contents = { "package.json": '"test:unit": "node --test tests/unit/*.test.ts"' };
  assert.deepEqual(findCollectorDrift(collectors, contents), []);
});
