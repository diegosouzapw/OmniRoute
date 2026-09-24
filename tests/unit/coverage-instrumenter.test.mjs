import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { Script } from "node:vm";
import test from "node:test";
import { transform } from "esbuild";
import { instrumentCoverageSource } from "../../scripts/quality/coverage-instrumenter.mjs";

async function execute(source, filename, loader) {
  const result = instrumentCoverageSource(source, filename);
  const compiled = await transform(result.code, { loader, format: "cjs", target: "es2022" });
  const module = { exports: {} };
  const context = { module, exports: module.exports, require: createRequire(import.meta.url) };
  new Script(compiled.code).runInNewContext(context, {
    contextCodeGeneration: { strings: false, wasm: false },
    timeout: 1000,
  });
  return { ...result, exports: module.exports, observed: context.__coverage__ };
}

test("TypeScript angle assertions remain valid before transforms and retain original coverage", async () => {
  const source =
    "const seed = <number>41; export function read(value: number = seed) { return value + 1; }";
  const result = await execute(source, "src/fixture.ts", "ts");
  assert.equal(result.exports.read(), 42);
  assert.equal(result.coverage.path, "src/fixture.ts");
  assert.ok(Object.keys(result.coverage.statementMap).length > 0);
  assert.ok(Object.values(result.coverage.s).every((count) => count === 0));
  assert.ok(Object.values(result.observed["src/fixture.ts"].s).some((count) => count > 0));
  assert.deepEqual(result.map.sourcesContent, [source]);
});

test("noncanonical paths and non-runtime sources cannot enter the coverage denominator", () => {
  for (const filename of [
    "../src/a.ts",
    "/checkout/src/a.ts",
    "C:\\src\\a.ts",
    "src/../a.ts",
    "./src/a.ts",
    "src/a.ts?raw",
    "src/types.d.ts",
    "src/types.d.mts",
    "src/a.json",
    "src\\a.ts",
  ]) {
    assert.throws(
      () => instrumentCoverageSource("export const value = 1;", filename),
      /canonical runtime source/
    );
  }
});

test("coverage identity binds the exact original source and instrumentation version", () => {
  const source = "export const read = () => 42;";
  const result = instrumentCoverageSource(source, "src/fixture.js");
  assert.equal(result.identity.sourceHash, createHash("sha256").update(source).digest("hex"));
  assert.equal(result.identity.instrumenter, "istanbul-lib-instrument@6.0.3");
  assert.equal(result.identity.schemaVersion, 1);
  assert.deepEqual(instrumentCoverageSource(source, "src/fixture.js").identity, result.identity);
  assert.notEqual(
    instrumentCoverageSource(`${source}\n`, "src/fixture.js").identity.sourceHash,
    result.identity.sourceHash
  );
});

test("imports, async defaults and private class fields execute with untouched functions still zero", async () => {
  const source = `
import { basename } from "node:path";
import type { MissingType } from "./type-only-not-loaded";
export class Counter {
  #value: number = 40;
  async read(delta: number = 2): Promise<string> {
    return basename("/fixture/" + (this.#value + delta));
  }
}
export function neverCalled(): MissingType { throw new Error("unreachable"); }
`;
  const result = await execute(source, "open-sse/counter.ts", "ts");
  assert.equal(await new result.exports.Counter().read(), "42");
  const observed = result.observed["open-sse/counter.ts"];
  assert.deepEqual(JSON.parse(JSON.stringify(observed.fnMap)), result.coverage.fnMap);
  assert.ok(Object.values(observed.f).some((count) => count > 0));
  assert.ok(Object.values(observed.f).some((count) => count === 0));
  assert.deepEqual(result.map.sourcesContent, [source]);
});

for (const extension of ["tsx", "jsx"]) {
  test(`${extension} keeps JSX execution and source maps without generated-code functions`, async () => {
    const source = `
const React = { createElement: (tag, props, ...children) => ({ tag, props, children }) };
export function View({ enabled }${extension === "tsx" ? ": { enabled: boolean }" : ""}) {
  return <section>{enabled ? "enabled" : "disabled"}</section>;
}
`;
    const result = await execute(source, `src/View.${extension}`, extension);
    assert.equal(result.exports.View({ enabled: true }).children[0], "enabled");
    assert.equal(result.exports.View({ enabled: false }).children[0], "disabled");
    const observed = result.observed[`src/View.${extension}`];
    assert.deepEqual(JSON.parse(JSON.stringify(observed.branchMap)), result.coverage.branchMap);
    assert.deepEqual(JSON.parse(JSON.stringify(observed.fnMap)), result.coverage.fnMap);
    assert.ok(
      Object.values(observed.b)
        .flat()
        .every((count) => count > 0)
    );
    assert.deepEqual(result.map.sourcesContent, [source]);
  });
}

test("invalid source throws rather than becoming an empty successful map", () => {
  assert.throws(
    () => instrumentCoverageSource("export function broken( {", "src/broken.ts"),
    SyntaxError
  );
});

test("real Node and Vitest transforms report identical original-source maps with complementary hits", async () => {
  const root = fileURLToPath(new URL("../../", import.meta.url));
  const source = readFileSync(
    join(root, "tests/fixtures/quality-coverage/parity-source.tsx"),
    "utf8"
  );
  const nodeResult = await execute(source, "src/coverageParityFixture.tsx", "tsx");
  assert.equal((await new nodeResult.exports.Example().render()).props.children, "coverage");
  const require = createRequire(import.meta.url);
  const cli = join(dirname(require.resolve("vitest/package.json")), "vitest.mjs");
  const child = spawnSync(
    process.execPath,
    [cli, "run", "--config", "tests/fixtures/quality-coverage/vitest.config.mjs"],
    {
      cwd: root,
      encoding: "utf8",
      timeout: 60_000,
      maxBuffer: 5 * 1024 * 1024,
      env: { ...process.env, NO_COLOR: "1" },
    }
  );
  assert.equal(child.error, undefined, child.error?.message);
  assert.equal(child.status, 0, child.stdout + child.stderr);
  const match = child.stdout.match(/OMNI_COVERAGE_PARITY:(\{[^\n]+\})/);
  assert.ok(match, "the Vitest worker must produce coverage evidence");
  const vitestCoverage = JSON.parse(match[1]);
  const nodeCoverage = JSON.parse(
    JSON.stringify(nodeResult.observed["src/coverageParityFixture.tsx"])
  );
  for (const key of ["statementMap", "fnMap", "branchMap"]) {
    assert.deepEqual(vitestCoverage[key], nodeCoverage[key], key);
  }
  const conditional = Object.entries(nodeCoverage.branchMap).find(
    ([, item]) => item.type === "cond-expr"
  );
  assert.ok(conditional);
  assert.deepEqual(nodeCoverage.b[conditional[0]], [1, 0]);
  assert.deepEqual(vitestCoverage.b[conditional[0]], [0, 1]);
  const untouched = Object.entries(nodeCoverage.fnMap).find(
    ([, item]) => item.name === "neverCalled"
  );
  assert.ok(untouched);
  assert.equal(nodeCoverage.f[untouched[0]], 0);
  assert.equal(vitestCoverage.f[untouched[0]], 0);
});
