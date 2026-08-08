import { describe, it } from "node:test";
import { strict as assert } from "node:assert";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const INSTRUMENTATION_NODE_PATH = resolve(
  __dirname,
  "../../src/instrumentation-node.ts"
);

describe("repro-9624: startCleanupScheduler wired in Next.js startup path", () => {
  it("should import startCleanupScheduler from cleanup", () => {
    const source = readFileSync(INSTRUMENTATION_NODE_PATH, "utf-8");

    // instrumentation-node.ts loads all startup modules via dynamic imports in a
    // Promise.all destructure, e.g.:
    //   const [{ startCleanupScheduler }, ...] = await Promise.all([
    //     import("@/lib/db/cleanup"), ...
    //   ]);
    // So the binding and the module import appear separately in the file.
    const cleanupModuleImported = /import\(\s*["']@\/lib\/db\/cleanup["']\s*\)/.test(
      source
    );
    const schedulerBound = /\bstartCleanupScheduler\b/.test(source);

    assert.ok(
      cleanupModuleImported,
      "@/lib/db/cleanup should be imported (dynamic import) in instrumentation-node.ts"
    );
    assert.ok(
      schedulerBound,
      "startCleanupScheduler should be bound in instrumentation-node.ts"
    );
  });

  it("should call startCleanupScheduler() during startup", () => {
    const source = readFileSync(INSTRUMENTATION_NODE_PATH, "utf-8");

    // Check that startCleanupScheduler is called (as a function call).
    // It can be called directly or as part of a conditional.
    const hasCall = /\bstartCleanupScheduler\s*\(/.test(source);

    assert.ok(
      hasCall,
      "startCleanupScheduler() should be called in instrumentation-node.ts"
    );
  });
});