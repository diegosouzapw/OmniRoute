import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, resolve, extname } from "node:path";
import { fileURLToPath } from "node:url";

const REPO_ROOT = resolve(fileURLToPath(import.meta.url), "../../../");

function listSourceFiles(dir: string, exts: string[]): string[] {
  const out: string[] = [];
  let entries: string[];
  try {
    entries = readdirSync(dir);
  } catch {
    return out;
  }
  for (const entry of entries) {
    if (entry === "node_modules" || entry === ".git" || entry === ".source") continue;
    const full = join(dir, entry);
    const st = statSync(full);
    if (st.isDirectory()) out.push(...listSourceFiles(full, exts));
    else if (exts.includes(extname(entry))) out.push(full);
  }
  return out;
}

test("#7661 — fumadocs-mdx must not be a runtime dependency (npm install -g ETARGET exposure)", () => {
  const pkg = JSON.parse(readFileSync(join(REPO_ROOT, "package.json"), "utf8"));
  const deps: Record<string, string> = pkg.dependencies || {};
  const devDeps: Record<string, string> = pkg.devDependencies || {};

  assert.ok(
    !("fumadocs-mdx" in deps),
    'fumadocs-mdx is declared under "dependencies" — npm install -g omniroute fetches it ' +
      "and its transitive yuku-analyzer/yuku-ast native-binding tree even though nothing at " +
      'runtime imports it. Move it to "devDependencies".'
  );

  assert.ok(
    "fumadocs-mdx" in devDeps || "fumadocs-mdx" in deps,
    "fumadocs-mdx must remain declared somewhere"
  );

  const runtimeDirs = ["src", "open-sse", "bin"].map((d) => join(REPO_ROOT, d));
  const runtimeFiles = runtimeDirs.flatMap((d) =>
    listSourceFiles(d, [".ts", ".tsx", ".js", ".mjs", ".cjs"])
  );
  assert.ok(runtimeFiles.length > 100, "sanity: scanner should find the runtime source tree");

  const offenders = runtimeFiles.filter((f) => {
    const src = readFileSync(f, "utf8");
    return /from\s+["']fumadocs-mdx(\/|["'])|require\(\s*["']fumadocs-mdx(\/|["'])/.test(src);
  });
  assert.deepEqual(
    offenders,
    [],
    `fumadocs-mdx is imported at runtime by: ${offenders.join(", ")}`
  );
});
