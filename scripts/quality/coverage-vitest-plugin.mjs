import { createHash } from "node:crypto";
import { relative, resolve } from "node:path";
import { instrumentCoverageSource } from "./coverage-instrumenter.mjs";

/** Must precede TS/JSX transforms; transformed sources are rejected, not remapped heuristically. */
export function createCoverageCapturePlugin({ root, scope }) {
  const expected = new Map(scope.files.map((file) => [file.path, file.sourceHash]));
  return {
    name: "omni-common-original-source-coverage",
    enforce: "pre",
    transform(code, id) {
      const filename = id.split("?")[0];
      const path = relative(resolve(root), filename).replaceAll("\\", "/");
      if (!expected.has(path)) return;
      const sourceHash = createHash("sha256").update(code).digest("hex");
      if (sourceHash !== expected.get(path))
        throw new Error(`coverage source hash mismatch before Vitest transform: ${path}`);
      const result = instrumentCoverageSource(code, path);
      return { code: result.code, map: result.map };
    },
  };
}
