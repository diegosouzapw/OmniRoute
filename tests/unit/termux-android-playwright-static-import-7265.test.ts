import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

// Regression guard for #7265: on Termux/Android, `process.platform === "android"`.
// `playwright-core`'s serverRegistry.js throws `Unsupported platform: android` from a
// top-level IIFE at *require time* — merely importing the `playwright` package crashes,
// no browser needs to be launched. `claudeTurnstileSolver.ts` used to `import { chromium }
// from "playwright"` statically, and that module is unconditionally reachable from the
// Next.js instrumentation hook used to reach it on every boot via open-sse/executors/index.ts,
// so any unsupported platform crashed the whole server regardless of configured provider.
const HERE = dirname(fileURLToPath(import.meta.url));
const SOLVER = join(HERE, "../../open-sse/services/claudeTurnstileSolver.ts");

test("claudeTurnstileSolver.ts does not statically import the playwright runtime", () => {
  const src = readFileSync(SOLVER, "utf8");
  // Only a type-only import of playwright is allowed at module top level.
  assert.doesNotMatch(src, /^import\s*\{\s*chromium[^}]*\}\s*from\s*"playwright"/m);
  assert.match(src, /^import type \{ Browser, Page \} from "playwright";/m);
  // The real chromium binding must come from a lazy dynamic import inside a function body.
  assert.match(src, /const \{ chromium \} = await import\("playwright"\);/);
});

test("importing the real executor chain does not throw on an unsupported process.platform", async () => {
  const originalDescriptor = Object.getOwnPropertyDescriptor(process, "platform")!;
  Object.defineProperty(process, "platform", { value: "android", configurable: true });

  try {
    // Keep the executor-registry import safe for direct runtime consumers. Before the
    // original fix, this threw "Unsupported platform: android" purely from the static
    // playwright import; instrumentation no longer imports this graph at boot (#12074).
    await import("../../open-sse/executors/index.ts");
  } finally {
    Object.defineProperty(process, "platform", originalDescriptor);
  }
});
