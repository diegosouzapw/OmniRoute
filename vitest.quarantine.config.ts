import { defineConfig } from "vitest/config";
import base from "./vitest.config";
import inventory from "./config/quality/vitest-exclusions.json";

// Same transforms, aliases and setup as the UI rail; only the inventory is selected.
// Failure remains visible in its dedicated workflow, never relabeled as a green test.
export default defineConfig({
  ...base,
  test: {
    ...base.test,
    include: inventory.excluded.map((entry) => entry.file),
    exclude: [],
    passWithNoTests: false,
    maxWorkers: 2,
    fileParallelism: false,
  },
});
