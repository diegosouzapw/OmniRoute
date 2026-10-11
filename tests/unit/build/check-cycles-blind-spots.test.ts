// tests/unit/build/check-cycles-blind-spots.test.ts
// TDD regression coverage for G-01 (#15159): `check-cycles.mjs` printed a false
// green — "no cycles detected across 450 files" — while three independent blinds
// made it structurally unable to see real cycles:
//
//   1. `defaultRoots` was five directories, not the repo, so anything outside
//      them (src/lib/config, src/app, …) was never scanned at all.
//   2. the specifier regex matched `import|export … from` only, so every dynamic
//      `import("…")` was missed.
//   3. `if (!specifier.startsWith(".")) continue` dropped every `@/` and
//      `@omniroute/open-sse/` alias edge.
//
// The live casualty is src/lib/db/settings.ts:359, which does
// `await import("@/lib/config/runtimeSettings")` — invisible to this gate, but
// reported as a real cycle by check-circular-deps.mjs (dpdm), which resolves
// tsconfig paths.
//
// These tests drive the gate as a subprocess against synthetic fixture trees,
// because the defect is in the *whole pipeline* (roots → extract → resolve → SCC),
// not in one pure function. `analyzeCycles` is exercised directly where possible.
import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync, rmSync, existsSync } from "node:fs";
import fs from "node:fs";
import { join, resolve } from "node:path";
import { tmpdir } from "node:os";
import { execFileSync } from "node:child_process";
import { pathToFileURL } from "node:url";

const SCRIPT = resolve(process.cwd(), "scripts/check/check-cycles.mjs");

type RunResult = { status: number; stdout: string; stderr: string };

/** Run the gate as a subprocess with `root` as cwd and `roots` as argv. */
function runGate(root: string, roots: string[] = []): RunResult {
  try {
    const stdout = execFileSync(process.execPath, [SCRIPT, ...roots], {
      cwd: root,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
    });
    return { status: 0, stdout, stderr: "" };
  } catch (err) {
    const e = err as { status?: number; stdout?: string; stderr?: string };
    return { status: e.status ?? 1, stdout: e.stdout ?? "", stderr: e.stderr ?? "" };
  }
}

/** Minimal tsconfig so the alias resolution has something to read. */
const TSCONFIG = JSON.stringify({
  compilerOptions: {
    baseUrl: ".",
    paths: {
      "@/*": ["./src/*"],
      "@omniroute/open-sse": ["./open-sse"],
      "@omniroute/open-sse/*": ["./open-sse/*"],
    },
  },
});

function writeFile(root: string, rel: string, contents: string): void {
  const abs = join(root, rel);
  mkdirSync(join(abs, ".."), { recursive: true });
  writeFileSync(abs, contents);
}

function withTree(fn: (root: string) => void): void {
  const root = mkdtempSync(join(tmpdir(), "check-cycles-"));
  try {
    writeFile(root, "tsconfig.json", TSCONFIG);
    fn(root);
  } finally {
    rmSync(root, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  }
}

test("GATE-SANITY: the fixture harness itself works — a relative cycle is detected", () => {
  withTree((root) => {
    // Blind spot 1/2/3 are all absent here: same root, static import, relative path.
    writeFile(root, "src/a.ts", 'import { b } from "./b";\nexport const a = () => b();\n');
    writeFile(root, "src/b.ts", 'import { a } from "./a";\nexport const b = () => a();\n');

    const result = runGate(root, ["src"]);

    assert.equal(
      result.status,
      1,
      `harness must detect a plain relative cycle; got status=${result.status} out=${result.stdout} err=${result.stderr}`
    );
    assert.match(result.stderr, /FAIL/, "must print FAIL, not OK");
  });
});

// ---------------------------------------------------------------------------
// Blind spot 2 — dynamic import() has no regex branch
// ---------------------------------------------------------------------------

test("blind spot 2: a cycle closed by a dynamic import() is detected", () => {
  withTree((root) => {
    // Static edge a -> b is visible today; b -> a is the dynamic one.
    writeFile(root, "src/a.ts", 'import { b } from "./b";\nexport const a = () => b();\n');
    writeFile(root, "src/b.ts", 'export const b = async () => (await import("./a")).a();\n');

    const result = runGate(root, ["src"]);

    assert.equal(
      result.status,
      1,
      `dynamic import() must create a graph edge; got status=${result.status} out=${result.stdout}`
    );
    assert.match(result.stderr, /src[\\/]b\.ts/, "must name the dynamic-import file");
  });
});

test("blind spot 2: await import() inside a function body closes the cycle", () => {
  withTree((root) => {
    writeFile(root, "src/a.ts", 'export const a = async () => (await import("./b")).b();\n');
    writeFile(
      root,
      "src/b.ts",
      'export async function b() {\n  const { a } = await import("./a");\n  return a;\n}\n'
    );

    const result = runGate(root, ["src"]);

    assert.equal(result.status, 1, `got status=${result.status} out=${result.stdout}`);
  });
});

// ---------------------------------------------------------------------------
// Blind spot 3 — @/ and @omniroute/open-sse/ alias specifiers are dropped
// ---------------------------------------------------------------------------

test("blind spot 3: a cycle closed through the @/ alias is detected", () => {
  withTree((root) => {
    // This is the shape of the live settings.ts <-> runtimeSettings cycle.
    writeFile(root, "src/a.ts", 'export const a = async () => (await import("@/b")).b();\n');
    writeFile(root, "src/b.ts", 'import { a } from "@/a";\nexport const b = () => a;\n');

    const result = runGate(root, ["src"]);

    assert.equal(
      result.status,
      1,
      `@/ alias edge must not be dropped; got status=${result.status} out=${result.stdout}`
    );
  });
});

test("blind spot 3: a cycle crossing trees through both alias forms is detected", () => {
  withTree((root) => {
    // src → open-sse via `@omniroute/open-sse/*`, and back via `@/`. Both edges
    // are invisible to the old `startsWith(".")` filter, so this cycle was
    // undetectable in exactly the shape the real repo uses (settings.ts ↔
    // runtimeSettings sit on opposite sides of the two trees).
    writeFile(
      root,
      "src/a.ts",
      'import { b } from "@omniroute/open-sse/b";\nexport const a = () => b;\n'
    );
    writeFile(root, "open-sse/b.ts", 'import { a } from "@/a";\nexport const b = () => a;\n');

    // Roots span both trees, which is the real-world layout.
    const result = runGate(root, ["src", "open-sse"]);

    assert.equal(result.status, 1, `got status=${result.status} out=${result.stdout}`);
    assert.match(
      result.stderr,
      /open-sse[\\/]b\.ts/,
      "must report the open-sse member of the cross-tree cycle"
    );
  });
});

test("blind spot 3: alias resolution honours the .ts extension and index files", () => {
  withTree((root) => {
    // `@/pkg` must resolve to src/pkg/index.ts, matching tsconfig + NodeNext.
    writeFile(root, "src/a.ts", 'import { b } from "@/pkg";\nexport const a = () => b;\n');
    writeFile(root, "src/pkg/index.ts", 'import { a } from "@/a";\nexport const b = () => a;\n');

    const result = runGate(root, ["src"]);

    assert.equal(result.status, 1, `got status=${result.status} out=${result.stdout}`);
  });
});

// ---------------------------------------------------------------------------
// Blind spot 1 — defaultRoots covers five directories, not the repo
// ---------------------------------------------------------------------------

test("blind spot 1: the default roots cover src and open-sse, not five subdirectories", () => {
  withTree((root) => {
    // A cycle in src/lib/config — outside all five historical default roots.
    writeFile(
      root,
      "src/lib/config/a.ts",
      'import { b } from "@/lib/config/b";\nexport const a = () => b;\n'
    );
    writeFile(
      root,
      "src/lib/config/b.ts",
      'import { a } from "@/lib/config/a";\nexport const b = () => a;\n'
    );

    // No argv: this is `npm run check:cycles` exactly as CI invokes it.
    const result = runGate(root);

    assert.equal(
      result.status,
      1,
      `bare "check:cycles" must scan src by default; got status=${result.status} out=${result.stdout}`
    );
    assert.match(
      result.stdout + result.stderr,
      /lib[\\/]config/,
      "must report the files it scanned"
    );
  });
});

test("blind spot 1: the default roots include open-sse too", () => {
  withTree((root) => {
    writeFile(
      root,
      "open-sse/x.ts",
      'import { y } from "@omniroute/open-sse/y";\nexport const x = () => y;\n'
    );
    writeFile(
      root,
      "open-sse/y.ts",
      'import { x } from "@omniroute/open-sse/x";\nexport const y = () => x;\n'
    );

    const result = runGate(root);

    assert.equal(result.status, 1, `got status=${result.status} out=${result.stdout}`);
  });
});

// ---------------------------------------------------------------------------
// The gate must not report a false green when it scanned nothing
// ---------------------------------------------------------------------------

test("a bare run reports the roots it scanned, so a narrow scope is visible", () => {
  withTree((root) => {
    writeFile(root, "src/a.ts", "export const a = 1;\n");

    const result = runGate(root);

    assert.equal(result.status, 0, "acyclic fixture must pass");
    assert.match(result.stdout, /\[cycles\] OK/, "must print the OK line");
    // The OK line must name the scanned roots — that is how a reader tells a
    // repo-wide pass from a five-directory pass.
    assert.match(
      result.stdout,
      /\bsrc\b/,
      `OK line must name the scanned roots; got: ${result.stdout.trim()}`
    );
  });
});

// ---------------------------------------------------------------------------
// analyzeCycles — pure exported surface (skipped when not yet exported)
// ---------------------------------------------------------------------------

test("analyzeCycles is exported and reports {files, cycles} for a fixture tree", async () => {
  const mod = (await import(pathToFileURL(SCRIPT).href)) as {
    analyzeCycles?: (roots: string[], cwd: string) => { fileCount: number; cycles: string[][] };
  };
  assert.equal(
    typeof mod.analyzeCycles,
    "function",
    "check-cycles.mjs must export analyzeCycles so the graph walk is unit-testable"
  );

  withTree((root) => {
    writeFile(root, "src/a.ts", 'import { b } from "./b";\nexport const a = () => b;\n');
    writeFile(root, "src/b.ts", 'import { a } from "./a";\nexport const b = () => a;\n');
    writeFile(root, "src/solo.ts", "export const solo = 1;\n");

    const result = mod.analyzeCycles!(["src"], root);

    assert.equal(result.fileCount, 3, "counts every scanned file, not just cyclic ones");
    assert.equal(result.cycles.length, 1, "exactly one strongly connected component");
    assert.deepEqual([...result.cycles[0]].sort(), ["src/a.ts", "src/b.ts"]);
  });
});

test("analyzeCycles returns empty cycles for an acyclic tree", async () => {
  const mod = (await import(pathToFileURL(SCRIPT).href)) as {
    analyzeCycles?: (roots: string[], cwd: string) => { fileCount: number; cycles: string[][] };
  };
  if (typeof mod.analyzeCycles !== "function") return; // covered by the export test

  withTree((root) => {
    writeFile(root, "src/a.ts", 'import { b } from "./b";\nexport const a = () => b;\n');
    writeFile(root, "src/b.ts", "export const b = 1;\n");

    const result = mod.analyzeCycles!(["src"], root);

    assert.equal(result.fileCount, 2);
    assert.deepEqual(result.cycles, []);
  });
});

test("analyzeCycles counts a self-import as a cycle", async () => {
  const mod = (await import(pathToFileURL(SCRIPT).href)) as {
    analyzeCycles?: (roots: string[], cwd: string) => { fileCount: number; cycles: string[][] };
  };
  if (typeof mod.analyzeCycles !== "function") return;

  withTree((root) => {
    writeFile(root, "src/self.ts", 'import "./self";\nexport const s = 1;\n');

    const result = mod.analyzeCycles!(["src"], root);

    assert.equal(result.cycles.length, 1, "a file importing itself is a 1-node SCC");
    assert.deepEqual(result.cycles[0], ["src/self.ts"]);
  });
});

test("GATE-SANITY: node_modules and _private roots never appear in a scan", async () => {
  const mod = (await import(pathToFileURL(SCRIPT).href)) as {
    analyzeCycles?: (roots: string[], cwd: string) => { fileCount: number; cycles: string[][] };
  };
  if (typeof mod.analyzeCycles !== "function") return;

  withTree((root) => {
    writeFile(
      root,
      "src/a.ts",
      'import { x } from "../node_modules/pkg/index.js";\nexport const a = x;\n'
    );
    writeFile(root, "node_modules/pkg/index.ts", "export const x = 1;\n");
    writeFile(root, "node_modules/pkg/index.js", "export const x = 1;\n");

    const result = mod.analyzeCycles!(["src"], root);

    assert.equal(result.fileCount, 1, "only src/a.ts is scanned");
  });
});

test("analyzeCycles tolerates a missing root directory instead of throwing", async () => {
  const mod = (await import(pathToFileURL(SCRIPT).href)) as {
    analyzeCycles?: (roots: string[], cwd: string) => { fileCount: number; cycles: string[][] };
  };
  if (typeof mod.analyzeCycles !== "function") return;

  withTree((root) => {
    writeFile(root, "src/a.ts", "export const a = 1;\n");
    const result = mod.analyzeCycles!(["src", "does/not/exist"], root);
    assert.equal(result.fileCount, 1);
  });
});

test("the gate script exists at the path the package.json script invokes", () => {
  assert.ok(existsSync(SCRIPT), `expected the gate at ${SCRIPT}`);
});

// ---------------------------------------------------------------------------
// G-02 — the cycles metric must be a ratchet (can only fall), never a false green
// ---------------------------------------------------------------------------

test("readBaselineCyclesValue reads metrics.cycles.value", async () => {
  const mod = (await import(pathToFileURL(SCRIPT).href)) as {
    readBaselineCyclesValue?: (p?: string) => number | null;
  };
  assert.equal(typeof mod.readBaselineCyclesValue, "function");

  withTree((root) => {
    const p = join(root, "quality-baseline.json");
    fs.writeFileSync(p, JSON.stringify({ metrics: { cycles: { value: 14 } } }));
    assert.equal(mod.readBaselineCyclesValue!(p), 14);
  });
});

test("readBaselineCyclesValue returns null for a missing/malformed baseline", async () => {
  const mod = (await import(pathToFileURL(SCRIPT).href)) as {
    readBaselineCyclesValue?: (p?: string) => number | null;
  };
  assert.equal(mod.readBaselineCyclesValue!(join(tmpdir(), "nope-88881.json")), null);
  withTree((root) => {
    fs.writeFileSync(join(root, "quality-baseline.json"), "{not json");
    assert.equal(mod.readBaselineCyclesValue!(join(root, "quality-baseline.json")), null);
  });
});

test("DEFAULT_ROOTS is the two source trees, not five subdirectories", async () => {
  const mod = (await import(pathToFileURL(SCRIPT).href)) as { DEFAULT_ROOTS?: string[] };
  assert.deepEqual(mod.DEFAULT_ROOTS, ["src", "open-sse"]);
});

test("G-02: the shipped quality-baseline.json declares a cycles ceiling", async () => {
  // The repo must always carry a ceiling. Without one, `--ratchet` degrades to
  // advisory and the metric can silently drift upward — the exact lie G-02 fixes.
  const mod = (await import(pathToFileURL(SCRIPT).href)) as {
    defaultBaselinePath?: () => string;
    readBaselineCyclesValue?: (p?: string) => number | null;
  };
  assert.equal(typeof mod.defaultBaselinePath, "function");

  const ceiling = mod.readBaselineCyclesValue!(mod.defaultBaselinePath!());
  assert.equal(
    typeof ceiling,
    "number",
    "config/quality/quality-baseline.json must declare metrics.cycles.value"
  );
  assert.ok(ceiling! >= 0, "the ceiling cannot be negative");

  const raw = JSON.parse(fs.readFileSync(mod.defaultBaselinePath!(), "utf8"));
  assert.equal(
    raw.metrics.cycles.direction,
    "down",
    "direction must be `down` — the cycle count may only fall"
  );
});

test("G-02: the real ratchet CLI rejects a new cycle but admits the frozen ceiling", () => {
  const baseline = JSON.parse(readFileSync("config/quality/quality-baseline.json", "utf8"));
  const ceiling = baseline.metrics.cycles.value;
  withTree((root) => {
    for (let i = 0; i <= ceiling; i++) {
      writeFile(root, `src/cycle${i}.ts`, `import "./cycle${i}";\nexport const value = ${i};\n`);
    }
    const regression = runGate(root, ["--ratchet", "src"]);
    assert.equal(regression.status, 1, regression.stdout);
    assert.match(regression.stderr, /RATCHET FAIL/);
    fs.rmSync(join(root, `src/cycle${ceiling}.ts`));
    const unchanged = runGate(root, ["--ratchet", "src"]);
    assert.equal(unchanged.status, 0, unchanged.stderr);
    assert.match(unchanged.stdout, /RATCHET OK/);
  });
});

test("G-02: CI runs the ratcheting variant of check:cycles", () => {
  // The invariant is that CI enforces the ceiling, not that it spells a flag a
  // particular way. Accept either the npm alias or a literal `--ratchet`, and
  // reject a bare `check:cycles`, which would silently revert to advisory.
  const ci = fs.readFileSync(join(process.cwd(), ".github/workflows/ci.yml"), "utf8");
  const lines = ci
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l.includes("check:cycles"));

  assert.ok(lines.length > 0, "ci.yml must still run check:cycles");
  assert.ok(
    lines.every((l) => l.includes("check:cycles:ratchet") || l.includes("--ratchet")),
    `every ci.yml check:cycles step must enforce the ceiling; found: ${lines.join(" | ")}`
  );

  // And the npm alias it depends on must exist and forward the flag.
  const pkg = JSON.parse(readFileSync(join(process.cwd(), "package.json"), "utf8"));
  assert.match(
    pkg.scripts["check:cycles:ratchet"] ?? "",
    /check-cycles\.mjs\s+--ratchet$/,
    "check:cycles:ratchet must forward --ratchet to the gate"
  );
});

test("G-02: the cycles ceiling is not above the cycles the gate actually finds", async () => {
  const mod = (await import(pathToFileURL(SCRIPT).href)) as {
    analyzeCycles?: (roots: string[], cwd: string) => { fileCount: number; cycles: string[][] };
    defaultBaselinePath?: () => string;
    readBaselineCyclesValue?: (p?: string) => number | null;
  };
  if (typeof mod.analyzeCycles !== "function") return;

  const ceiling = mod.readBaselineCyclesValue!(mod.defaultBaselinePath!());
  if (ceiling === null) return; // covered by the declaration test above

  const { fileCount, cycles } = mod.analyzeCycles!(mod.DEFAULT_ROOTS!, process.cwd());

  assert.ok(fileCount > 450, `scan must cover the repo, got ${fileCount} files`);
  assert.ok(
    cycles.length <= ceiling!,
    `found ${cycles.length} cycles but the ceiling is ${ceiling} — the gate would block the whole queue`
  );
});
