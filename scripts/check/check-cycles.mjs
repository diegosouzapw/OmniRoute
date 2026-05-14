#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const cwd = process.cwd();
const defaultRoots = ["src/shared/components", "src/lib/db", "open-sse/translator"];
const roots = process.argv.slice(2).length > 0 ? process.argv.slice(2) : defaultRoots;
const sourceExtensions = [".ts", ".tsx", ".js", ".mjs", ".jsx", ".mts", ".cts"];

function toPosix(filePath) {
  return filePath.split(path.sep).join("/");
}

function listSourceFiles(rootDir) {
  const absRoot = path.resolve(cwd, rootDir);
  if (!fs.existsSync(absRoot)) {
    return [];
  }

  const stack = [absRoot];
  const files = [];

  while (stack.length > 0) {
    const current = stack.pop();
    const entries = fs.readdirSync(current, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(current, entry.name);
      if (entry.isDirectory()) {
        stack.push(fullPath);
        continue;
      }

      if (sourceExtensions.includes(path.extname(entry.name))) {
        files.push(path.resolve(fullPath));
      }
    }
  }

  return files;
}

function resolveRelativeImport(fromFile, specifier) {
  const base = path.resolve(path.dirname(fromFile), specifier);
  const ext = path.extname(base);

  if (ext && fs.existsSync(base) && fs.statSync(base).isFile()) {
    return path.resolve(base);
  }

  for (const extension of sourceExtensions) {
    const candidate = `${base}${extension}`;
    if (fs.existsSync(candidate) && fs.statSync(candidate).isFile()) {
      return path.resolve(candidate);
    }
  }

  for (const extension of sourceExtensions) {
    const candidate = path.join(base, `index${extension}`);
    if (fs.existsSync(candidate) && fs.statSync(candidate).isFile()) {
      return path.resolve(candidate);
    }
  }

  return null;
}

function extractImportSpecifiers(fileContents) {
  const specs = [];
  const regex = /\b(?:import|export)\s+(?:[^"'`]*?\sfrom\s*)?["'`]([^"'`]+)["'`]/g;
  let match = regex.exec(fileContents);
  while (match) {
    specs.push(match[1]);
    match = regex.exec(fileContents);
  }
  return specs;
}

function buildGraph(files) {
  const fileSet = new Set(files);
  const graph = new Map();

  for (const filePath of files) {
    const code = fs.readFileSync(filePath, "utf8");
    const dependencies = new Set();
    const importSpecifiers = extractImportSpecifiers(code);

    for (const specifier of importSpecifiers) {
      if (!specifier.startsWith(".")) continue;
      const resolved = resolveRelativeImport(filePath, specifier);
      if (!resolved) continue;
      if (!fileSet.has(resolved)) continue;
      dependencies.add(resolved);
    }

    graph.set(filePath, dependencies);
  }

  return graph;
}

function stronglyConnectedComponents(graph) {
  const indexMap = new Map();
  const lowLinkMap = new Map();
  const onStack = new Set();
  const stack = [];
  const components = [];
  let indexCounter = 0;

  function strongConnect(node) {
    indexMap.set(node, indexCounter);
    lowLinkMap.set(node, indexCounter);
    indexCounter += 1;
    stack.push(node);
    onStack.add(node);

    for (const neighbor of graph.get(node) || []) {
      if (!indexMap.has(neighbor)) {
        strongConnect(neighbor);
        lowLinkMap.set(node, Math.min(lowLinkMap.get(node), lowLinkMap.get(neighbor)));
      } else if (onStack.has(neighbor)) {
        lowLinkMap.set(node, Math.min(lowLinkMap.get(node), indexMap.get(neighbor)));
      }
    }

    if (lowLinkMap.get(node) === indexMap.get(node)) {
      const component = [];
      while (stack.length > 0) {
        const candidate = stack.pop();
        onStack.delete(candidate);
        component.push(candidate);
        if (candidate === node) break;
      }
      components.push(component);
    }
  }

  for (const node of graph.keys()) {
    if (!indexMap.has(node)) {
      strongConnect(node);
    }
  }

  return components;
}

function isSelfCycle(component, graph) {
  if (component.length !== 1) return false;
  const [file] = component;
  return (graph.get(file) || new Set()).has(file);
}

const files = roots.flatMap((root) => listSourceFiles(root));
const graph = buildGraph(files);
const components = stronglyConnectedComponents(graph);
const cycles = components.filter(
  (component) => component.length > 1 || isSelfCycle(component, graph)
);

if (cycles.length === 0) {
  console.log(
    `[cycles] OK - no cycles detected across ${graph.size} files in: ${roots.join(", ")}`
  );
  process.exit(0);
}

console.error(`[cycles] FAIL - detected ${cycles.length} strongly connected component(s):`);
for (const component of cycles) {
  const sorted = [...component].sort((a, b) => a.localeCompare(b));
  console.error(`\n- SCC (${sorted.length} files)`);
  for (const filePath of sorted) {
    console.error(`  - ${toPosix(path.relative(cwd, filePath))}`);
  }
}

process.exit(1);
