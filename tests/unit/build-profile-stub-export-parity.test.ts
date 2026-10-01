/**
 * Regression test for #12806 / #12807: `OMNIROUTE_BUILD_PROFILE=minimal`
 * build stubs must export every name that real consumer code imports from
 * the aliased module. A missing export only surfaces as a real Turbopack
 * "Export X doesn't exist in target module" compile failure during a full
 * `docker build --build-arg OMNIROUTE_BUILD_PROFILE=minimal` -- this test
 * catches the drift statically so the next export added to a consumer route
 * (without a matching stub export) fails fast in CI instead of silently
 * breaking the minimal build again.
 */
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("../..", import.meta.url));

function walk(dir: string, out: string[] = []): string[] {
  for (const entry of readdirSync(dir)) {
    if (entry === "node_modules" || entry.startsWith(".")) continue;
    const full = path.join(dir, entry);
    if (statSync(full).isDirectory()) {
      walk(full, out);
    } else if (/\.tsx?$/.test(entry) && !entry.endsWith(".stub.ts")) {
      out.push(full);
    }
  }
  return out;
}

function importedNames(specifier: string): Set<string> {
  const names = new Set<string>();
  const re = new RegExp(`import\\s*\\{([^}]+)\\}\\s*from\\s*["']${specifier}["']`, "g");
  for (const dir of ["src", "open-sse"]) {
    for (const file of walk(path.join(ROOT, dir))) {
      const source = readFileSync(file, "utf8");
      let match;
      while ((match = re.exec(source))) {
        for (const raw of match[1].split(",")) {
          const name = raw
            .trim()
            .split(/\s+as\s+/)[0]
            .trim();
          if (name) names.add(name);
        }
      }
    }
  }
  return names;
}

async function assertStubCoversRealConsumerImports(specifier: string, stubRelPath: string) {
  const names = importedNames(specifier);
  assert.ok(names.size > 0, `expected at least one real consumer import from ${specifier}`);
  const stub = await import(stubRelPath);
  for (const name of names) {
    assert.strictEqual(
      typeof (stub as Record<string, unknown>)[name],
      "function",
      `stub ${stubRelPath} is missing export "${name}" imported by a real consumer of ${specifier}`
    );
  }
}

describe("build-profile stub export parity (#12806, #12807)", () => {
  it("ninerouter.stub.ts exports everything real consumers import from @/lib/services/installers/ninerouter", async () => {
    await assertStubCoversRealConsumerImports(
      "@/lib/services/installers/ninerouter",
      "../../src/lib/services/installers/ninerouter.stub.ts"
    );
  });

  it("mitm/cert/install.stub.ts exports everything real consumers import from @/mitm/cert/install", async () => {
    await assertStubCoversRealConsumerImports(
      "@/mitm/cert/install",
      "../../src/mitm/cert/install.stub.ts"
    );
  });
});
