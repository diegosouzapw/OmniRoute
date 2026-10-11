import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "../..");

function staticImports(file: string): string[] {
  const text = fs.readFileSync(file, "utf8");
  const specs: string[] = [];
  for (const line of text.split("\n")) {
    const match = line.match(/^import\s+(type\s+)?.*\sfrom\s+["']([^"']+)["']/);
    if (!match || match[1]) continue;
    specs.push(match[2]);
  }
  return specs;
}

function resolveSpec(fromFile: string, spec: string): string | null {
  if (spec === "playwright-core" || spec === "playwright") return spec;
  let base: string | null = null;
  if (spec.startsWith("@omniroute/open-sse/")) {
    base = path.join(ROOT, "open-sse", spec.slice("@omniroute/open-sse/".length));
  } else if (spec.startsWith("@/")) {
    base = path.join(ROOT, "src", spec.slice(2));
  } else if (spec.startsWith(".")) {
    base = path.resolve(path.dirname(fromFile), spec);
  }
  if (!base) return null;
  if (fs.existsSync(base) && fs.statSync(base).isFile()) return base;
  for (const suffix of [".ts", ".tsx", ".js"]) {
    if (fs.existsSync(base + suffix)) return base + suffix;
  }
  return null;
}

test("the provider validation barrel does not statically reach playwright-core", () => {
  const start = path.join(ROOT, "src/lib/providers/validation.ts");
  const seen = new Set<string>();
  const pending = [start];
  const hits: string[] = [];
  while (pending.length > 0) {
    const file = pending.pop() as string;
    if (seen.has(file)) continue;
    seen.add(file);
    if (!fs.existsSync(file)) continue;
    for (const spec of staticImports(file)) {
      const resolved = resolveSpec(file, spec);
      if (resolved === "playwright-core" || resolved === "playwright") {
        hits.push(`${path.relative(ROOT, file)} -> ${spec}`);
      } else if (resolved) {
        pending.push(resolved);
      }
    }
  }
  assert.deepEqual(hits, []);
});
