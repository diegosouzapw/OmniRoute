import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import ts from "typescript";
import { BaseExecutor } from "@omniroute/open-sse/executors/base.ts";
import { DefaultExecutor } from "@omniroute/open-sse/executors/default.ts";
import { getDefaultExecutor } from "@omniroute/open-sse/executors/defaultResolver.ts";

const ROOT = path.resolve(import.meta.dirname, "../..");
const EXTENSIONS = [".ts", ".tsx", ".mts", ".cts", ".js", ".mjs", ".jsx", ".cjs"];

test("BaseExecutor is a valid constructor and can be subclassed by DefaultExecutor", () => {
  assert.equal(
    typeof BaseExecutor,
    "function",
    "BaseExecutor must be an exported class constructor"
  );
  assert.equal(
    typeof DefaultExecutor,
    "function",
    "DefaultExecutor must be an exported class constructor"
  );

  const defaultExec = new DefaultExecutor("openai");
  assert.ok(
    defaultExec instanceof BaseExecutor,
    "DefaultExecutor must be an instance of BaseExecutor"
  );

  const resolved = getDefaultExecutor("openai");
  assert.ok(
    resolved instanceof BaseExecutor,
    "getDefaultExecutor must return an instance of BaseExecutor"
  );
});

/**
 * Static value-import edges only. `import type` / `export type` are erased and
 * cannot make `BaseExecutor` undefined while a subclass evaluates. Dynamic
 * `import()` is not an init-cycle edge.
 */
function valueSpecifier(stmt: ts.Statement): string | null {
  if (ts.isImportDeclaration(stmt) && ts.isStringLiteral(stmt.moduleSpecifier)) {
    const clause = stmt.importClause;
    if (!clause) return stmt.moduleSpecifier.text;
    if (clause.isTypeOnly) return null;
    if (clause.name || !clause.namedBindings) return stmt.moduleSpecifier.text;
    if (ts.isNamespaceImport(clause.namedBindings)) return stmt.moduleSpecifier.text;
    return clause.namedBindings.elements.some((el) => !el.isTypeOnly)
      ? stmt.moduleSpecifier.text
      : null;
  }
  if (
    ts.isExportDeclaration(stmt) &&
    stmt.moduleSpecifier &&
    ts.isStringLiteral(stmt.moduleSpecifier) &&
    !stmt.isTypeOnly
  ) {
    if (stmt.exportClause && ts.isNamedExports(stmt.exportClause)) {
      return stmt.exportClause.elements.some((el) => !el.isTypeOnly)
        ? stmt.moduleSpecifier.text
        : null;
    }
    return stmt.moduleSpecifier.text;
  }
  return null;
}

function isInternal(spec: string): boolean {
  return (
    spec.startsWith(".") ||
    spec.startsWith("@/") ||
    spec.startsWith("@omniroute/open-sse") ||
    spec.startsWith("@omniroute/browser-pool")
  );
}

function resolveFile(abs: string): string | null {
  const candidates: string[] = [];
  const ext = path.extname(abs);
  const mapped: Record<string, string[]> = {
    ".js": [".ts", ".tsx", ".mts"],
    ".mjs": [".mts", ".ts"],
    ".cjs": [".cts", ".ts"],
    ".jsx": [".tsx"],
  };
  if (ext) {
    candidates.push(abs);
    for (const alt of mapped[ext] ?? []) candidates.push(abs.slice(0, -ext.length) + alt);
  } else {
    for (const extension of EXTENSIONS) candidates.push(abs + extension);
    for (const extension of EXTENSIONS) candidates.push(path.join(abs, `index${extension}`));
  }
  for (const candidate of candidates) {
    if (fs.existsSync(candidate) && fs.statSync(candidate).isFile()) return path.resolve(candidate);
  }
  return null;
}

function resolveSpecifier(fromFile: string, spec: string): string | null {
  if (spec.startsWith(".")) return resolveFile(path.resolve(path.dirname(fromFile), spec));
  if (spec === "@omniroute/open-sse") return resolveFile(path.resolve(ROOT, "open-sse", "index"));
  if (spec === "@omniroute/browser-pool") {
    return resolveFile(path.resolve(ROOT, "packages/browser-pool/src/index"));
  }
  if (spec.startsWith("@omniroute/open-sse/")) {
    return resolveFile(path.resolve(ROOT, "open-sse", spec.slice("@omniroute/open-sse/".length)));
  }
  if (spec.startsWith("@/")) return resolveFile(path.resolve(ROOT, "src", spec.slice(2)));
  return null;
}

function scriptKind(file: string): ts.ScriptKind {
  if (file.endsWith(".tsx")) return ts.ScriptKind.TSX;
  if (file.endsWith(".jsx")) return ts.ScriptKind.JSX;
  if (file.endsWith(".js") || file.endsWith(".mjs") || file.endsWith(".cjs"))
    return ts.ScriptKind.JS;
  return ts.ScriptKind.TS;
}

const depsCache = new Map<string, { deps: string[]; unresolved: string[] }>();

function valueDeps(file: string): { deps: string[]; unresolved: string[] } {
  const cached = depsCache.get(file);
  if (cached) return cached;
  const source = ts.createSourceFile(
    file,
    fs.readFileSync(file, "utf8"),
    ts.ScriptTarget.Latest,
    true,
    scriptKind(file)
  );
  const deps: string[] = [];
  const unresolved: string[] = [];
  for (const stmt of source.statements) {
    const spec = valueSpecifier(stmt);
    if (!spec || !isInternal(spec)) continue;
    const resolved = resolveSpecifier(file, spec);
    if (!resolved) unresolved.push(`${path.relative(ROOT, file)} -> ${spec}`);
    else deps.push(resolved);
  }
  const result = { deps: [...new Set(deps)], unresolved };
  depsCache.set(file, result);
  return result;
}

function rel(file: string): string {
  return path.relative(ROOT, file).split(path.sep).join("/");
}

/** Shortest value-import path from `start` to `goal`, including both ends. */
function pathTo(start: string, goal: string): string[] | null {
  const parent = new Map<string, string | null>([[start, null]]);
  const queue = [start];
  let head = 0;
  while (head < queue.length) {
    const node = queue[head];
    head += 1;
    const { deps, unresolved } = valueDeps(node);
    assert.deepEqual(
      unresolved,
      [],
      `unresolved internal import while walking ${rel(node)}: ${unresolved.join(", ")}`
    );
    for (const dep of deps) {
      if (dep === goal) {
        const trail = [dep];
        let cursor: string | null = node;
        while (cursor) {
          trail.push(cursor);
          cursor = parent.get(cursor) ?? null;
        }
        return trail.reverse();
      }
      if (parent.has(dep)) continue;
      parent.set(dep, node);
      queue.push(dep);
    }
  }
  return null;
}

/** One back-edge cycle in the value-import graph rooted at `start`, if any. */
function cycleThrough(start: string): string[] | null {
  const state = new Map<string, "stack" | "done">();
  const parent = new Map<string, string>();

  function walk(node: string): string[] | null {
    state.set(node, "stack");
    const { deps, unresolved } = valueDeps(node);
    assert.deepEqual(
      unresolved,
      [],
      `unresolved internal import while walking ${rel(node)}: ${unresolved.join(", ")}`
    );
    for (const dep of deps) {
      if (state.get(dep) === "stack") {
        const trail = [dep];
        let cursor = node;
        while (cursor !== dep) {
          trail.push(cursor);
          const previous = parent.get(cursor);
          if (!previous) break;
          cursor = previous;
        }
        trail.push(dep);
        const cycle = trail.reverse();
        // Dependency-only loops (db/core ↔ feature flags) do not evaluate BaseExecutor.
        if (cycle.includes(start)) return cycle;
        continue;
      }
      if (state.has(dep)) continue;
      parent.set(dep, node);
      const found = walk(dep);
      if (found) return found;
    }
    state.set(node, "done");
    return null;
  }

  return walk(start);
}

function mustResolve(relPath: string): string {
  const resolved = resolveFile(path.resolve(ROOT, relPath));
  assert.ok(resolved, `missing source file ${relPath}`);
  return resolved;
}

test("BaseExecutor value-import graph has no cycle, including through paramFilters", () => {
  const base = mustResolve("open-sse/executors/base.ts");
  const paramFilters = mustResolve("src/lib/db/paramFilters.ts");
  const codex = mustResolve("open-sse/executors/codex.ts");

  // Positive control: a broken resolver must not turn the cycle assert into a vacuous pass.
  const known = pathTo(codex, base);
  assert.deepEqual(
    known?.map(rel),
    ["open-sse/executors/codex.ts", "open-sse/executors/base.ts"],
    "walker must see the real codex.ts → base.ts value import"
  );

  const viaParamFilters = pathTo(paramFilters, base);
  assert.equal(
    viaParamFilters,
    null,
    `paramFilters still reaches BaseExecutor:\n${viaParamFilters?.map(rel).join("\n") ?? ""}`
  );

  const direct = valueDeps(base);
  assert.deepEqual(
    direct.unresolved,
    [],
    `unresolved imports in base.ts: ${direct.unresolved.join(", ")}`
  );
  const forbidden = direct.deps
    .map(rel)
    .filter(
      (file) => file === "open-sse/utils/providerRequestLogging.ts" || file === "src/lib/db/core.ts"
    );
  assert.deepEqual(
    forbidden,
    [],
    `base.ts value-imports a module on the old usage/DB cycle edge: ${forbidden.join(", ")}`
  );

  const cycle = cycleThrough(base);
  assert.equal(
    cycle,
    null,
    `static value-import cycle through BaseExecutor:\n${cycle?.map(rel).join("\n") ?? ""}`
  );
});
