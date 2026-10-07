import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";

import ts from "typescript";

import {
  isNativeExecutable,
  resolveLocalBinEntry,
} from "../../../scripts/build/buildToolRunner.mjs";

const ROOT = fileURLToPath(new URL("../../..", import.meta.url));
const PREPUBLISH = join(ROOT, "scripts", "build", "prepublish.ts");

function readMcpBundleArgs(): string[] {
  const sourceText = readFileSync(PREPUBLISH, "utf8");
  const sourceFile = ts.createSourceFile(
    PREPUBLISH,
    sourceText,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TS
  );
  let args: string[] | null = null;

  function visit(node: ts.Node): void {
    if (
      ts.isCallExpression(node) &&
      ts.isIdentifier(node.expression) &&
      node.expression.text === "runBuildTool" &&
      node.arguments[0] &&
      ts.isStringLiteral(node.arguments[0]) &&
      node.arguments[0].text === "esbuild" &&
      node.arguments[2] &&
      ts.isArrayLiteralExpression(node.arguments[2]) &&
      node.arguments[2].elements.some(
        (element) => ts.isStringLiteral(element) && element.text === "open-sse/mcp-server/server.ts"
      )
    ) {
      args = node.arguments[2].elements.map((element) => {
        assert.ok(ts.isStringLiteral(element), "MCP esbuild args must stay static string literals");
        return element.text;
      });
    }
    ts.forEachChild(node, visit);
  }

  visit(sourceFile);
  assert.ok(args, "expected MCP esbuild invocation in scripts/build/prepublish.ts");
  return args;
}

function containsDirectAwait(node: ts.Node): boolean {
  let found = false;

  function visit(child: ts.Node): void {
    if (found) return;
    if (ts.isAwaitExpression(child)) {
      found = true;
      return;
    }
    if (
      ts.isArrowFunction(child) ||
      ts.isFunctionDeclaration(child) ||
      ts.isFunctionExpression(child) ||
      ts.isMethodDeclaration(child)
    ) {
      return;
    }
    ts.forEachChild(child, visit);
  }

  ts.forEachChild(node, visit);
  return found;
}

function runEsbuild(args: string[], cwd: string): void {
  const esbuildEntry = resolveLocalBinEntry("esbuild", "esbuild", ROOT);
  assert.ok(esbuildEntry, "expected local esbuild binary");
  const native = isNativeExecutable(esbuildEntry);
  execFileSync(native ? esbuildEntry : process.execPath, native ? args : [esbuildEntry, ...args], {
    cwd,
    stdio: "pipe",
  });
}

function findSyncEsmAwaitViolations(outputFile: string): {
  initializerCount: number;
  asyncInitializerCount: number;
  violations: string[];
} {
  const sourceText = readFileSync(outputFile, "utf8");
  const sourceFile = ts.createSourceFile(
    outputFile,
    sourceText,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.JS
  );
  const violations: string[] = [];
  let initializerCount = 0;
  let asyncInitializerCount = 0;

  function visit(node: ts.Node): void {
    if (
      ts.isCallExpression(node) &&
      ts.isIdentifier(node.expression) &&
      node.expression.text === "__esm" &&
      ts.isObjectLiteralExpression(node.arguments[0])
    ) {
      for (const property of node.arguments[0].properties) {
        if (!ts.isMethodDeclaration(property) || !property.body) continue;
        initializerCount += 1;
        const isAsync = property.modifiers?.some(
          (modifier) => modifier.kind === ts.SyntaxKind.AsyncKeyword
        );
        if (isAsync) asyncInitializerCount += 1;
        if (!isAsync && containsDirectAwait(property.body)) {
          violations.push(property.name.getText(sourceFile));
        }
      }
    }
    ts.forEachChild(node, visit);
  }

  visit(sourceFile);
  return { initializerCount, asyncInitializerCount, violations };
}

function assertNoSyncEsmAwait(outputFile: string): void {
  const { initializerCount, asyncInitializerCount, violations } =
    findSyncEsmAwaitViolations(outputFile);

  assert.ok(initializerCount > 0, "expected bundle to contain __esm initializers");
  assert.ok(asyncInitializerCount > 0, "expected bundle to exercise async initialization");
  assert.deepEqual(
    violations,
    [],
    `sync __esm initializers contain await: ${violations.join(", ")}`
  );
}

test("MCP bundle never emits await inside a synchronous __esm initializer", () => {
  const outputDir = mkdtempSync(join(tmpdir(), "omniroute-mcp-bundle-"));
  const outputFile = join(outputDir, "server.mjs");

  try {
    const bundleArgs = readMcpBundleArgs().map((arg) =>
      arg.startsWith("--outfile=") ? `--outfile=${outputFile}` : arg
    );
    runEsbuild(bundleArgs, ROOT);
    assertNoSyncEsmAwait(outputFile);
  } finally {
    rmSync(outputDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  }
});

test("esbuild propagates async initialization through wrapped import cycles", () => {
  const fixtureDir = mkdtempSync(join(tmpdir(), "omniroute-esbuild-async-cycle-"));
  const outputFile = join(fixtureDir, "out.mjs");

  try {
    writeFileSync(join(fixtureDir, "dep.mjs"), 'export const tla = await Promise.resolve("x");\n');
    writeFileSync(
      join(fixtureDir, "a.mjs"),
      'import { b } from "./b.mjs";\nimport { tla } from "./dep.mjs";\n' +
        "export function a() { return b() + tla; }\n"
    );
    writeFileSync(
      join(fixtureDir, "b.mjs"),
      'import { a } from "./a.mjs";\nexport function b() { return typeof a; }\n'
    );
    writeFileSync(
      join(fixtureDir, "main.mjs"),
      'import { a } from "./a.mjs";\nconsole.log(a());\n'
    );
    writeFileSync(join(fixtureDir, "entry.mjs"), 'await import("./main.mjs");\n');

    runEsbuild(
      ["entry.mjs", "--bundle", "--platform=node", "--format=esm", `--outfile=${outputFile}`],
      fixtureDir
    );
    assertNoSyncEsmAwait(outputFile);
  } finally {
    rmSync(fixtureDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  }
});
