import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Regression guard for issue #6584: webpack (OMNIROUTE_USE_TURBOPACK=0) build breaks on
// case-insensitive filesystems (macOS APFS default, Windows) because two source
// files in the same directory differ only by casing:
//   src/app/(dashboard)/dashboard/playground/components/ReasoningControls.tsx
//   src/app/(dashboard)/dashboard/playground/components/reasoningControls.ts
// On a case-sensitive FS (Linux, this sandbox) both files resolve fine, so this
// test does not literally reproduce the webpack warning/build error. Instead it
// encodes the same-directory case-collision root cause as a filesystem-level
// invariant check that fails deterministically on ANY OS: two distinct files
// whose relative path is identical after lower-casing (stem, ignoring extension,
// since extensionless imports are what collide) must not coexist in the same
// directory tree.

const ROOT = path.resolve(__dirname, "..", "..");
const SCAN_DIRS = ["src", "open-sse"];
const EXTENSIONS = new Set([".ts", ".tsx", ".js", ".jsx"]);
const IGNORE_DIR_NAMES = new Set(["node_modules", ".next", "dist", "build", ".git"]);

function walk(dir: string, out: string[]): void {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (IGNORE_DIR_NAMES.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full, out);
    } else if (EXTENSIONS.has(path.extname(entry.name))) {
      out.push(full);
    }
  }
}

test("#6584: no two source files in the same directory differ only by casing", () => {
  const files: string[] = [];
  for (const d of SCAN_DIRS) {
    const abs = path.join(ROOT, d);
    if (fs.existsSync(abs)) walk(abs, files);
  }

  // Group by (directory, lower-cased basename WITHOUT extension). Extensionless
  // imports (e.g. `from "./reasoningControls"`) are resolved by webpack/Node's
  // module resolver trying several extensions; on a case-insensitive filesystem
  // that resolution collapses "ReasoningControls.tsx" and "reasoningControls.ts"
  // into the same candidate, so the stem — not the full filename — is what must
  // stay unique per directory regardless of extension.
  const byDirLowerStem = new Map<string, string[]>();
  for (const f of files) {
    const dir = path.dirname(f);
    const ext = path.extname(f);
    const stem = path.basename(f, ext);
    const lowerStem = stem.toLowerCase();
    const key = `${dir}::${lowerStem}`;
    const arr = byDirLowerStem.get(key) ?? [];
    arr.push(f);
    byDirLowerStem.set(key, arr);
  }

  const collisions: string[][] = [];
  for (const arr of byDirLowerStem.values()) {
    const distinctStems = new Set(arr.map((f) => path.basename(f, path.extname(f))));
    if (distinctStems.size > 1) {
      collisions.push(arr);
    }
  }

  assert.deepEqual(
    collisions,
    [],
    `Found case-only filename collisions (breaks webpack builds on case-insensitive filesystems): ${JSON.stringify(collisions, null, 2)}`
  );
});
