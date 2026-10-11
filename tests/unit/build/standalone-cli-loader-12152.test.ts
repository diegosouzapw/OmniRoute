import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import fsp from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import {
  assembleStandalone,
  syncStandaloneExtraModules,
} from "../../../scripts/build/assembleStandalone.mjs";

const repository = fileURLToPath(new URL("../../../", import.meta.url));

// Exercise the actual installed loader + native compiler from an assembled tree
// outside this checkout. A resolver-only assertion would miss a missing binary.
for (const mode of ["assemble", "sync"] as const) {
  test(`#12152 ${mode} output executes the CLI's tsx loader and TypeScript helper`, async () => {
    const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-cli-12152-"));
    const project = path.join(tmp, "project");
    const distDir = path.join(project, ".build", "next");
    const outDir = path.join(tmp, "runtime");
    try {
      for (const name of ["tsx", "esbuild", "@esbuild"]) {
        const target = path.join(project, "node_modules", name);
        fs.mkdirSync(path.dirname(target), { recursive: true });
        fs.cpSync(path.join(repository, "node_modules", name), target, {
          recursive: true,
          dereference: true,
        });
      }
      fs.mkdirSync(path.join(distDir, "standalone"), { recursive: true });
      fs.writeFileSync(path.join(distDir, "standalone", "server.js"), "// fixture\n");
      if (mode === "assemble") {
        assembleStandalone({ projectRoot: project, distDir, outDir });
      } else {
        await syncStandaloneExtraModules(project, fsp, { log() {} }, outDir);
      }
      fs.mkdirSync(outDir, { recursive: true });
      fs.writeFileSync(
        path.join(outDir, "helper.ts"),
        "export enum CommandResult { Ready = 42 }; export const answer = CommandResult.Ready;\n"
      );
      fs.writeFileSync(
        path.join(outDir, "probe.mjs"),
        [
          'import assert from "node:assert/strict";',
          'import { fileURLToPath } from "node:url";',
          'import path from "node:path";',
          "const root = path.dirname(fileURLToPath(import.meta.url));",
          'assert.equal(process.env.DATA_DIR, path.join(root, "isolated-data"));',
          'for (const name of ["tsx/esm", "esbuild"]) {',
          "  const resolved = fileURLToPath(import.meta.resolve(name));",
          "  assert.ok(resolved.startsWith(root + path.sep), resolved);",
          "}",
          'await import("tsx/esm");',
          'const helper = await import("./helper.ts");',
          "assert.equal(helper.answer ?? helper.default?.answer, 42);",
          'console.log("standalone CLI loader and compiler passed");',
          "process.exit(0);",
        ].join("\n")
      );
      const env: NodeJS.ProcessEnv = {
        ...process.env,
        DATA_DIR: path.join(outDir, "isolated-data"),
        NODE_PATH: "",
        NODE_OPTIONS: "",
      };
      delete env.ESBUILD_BINARY_PATH;
      delete env.TSX_TSCONFIG_PATH;
      const child = spawnSync(process.execPath, [path.join(outDir, "probe.mjs")], {
        cwd: outDir,
        env,
        encoding: "utf8",
        timeout: 60_000,
      });
      assert.equal(child.status, 0, `${child.stdout}\n${child.stderr}\n${child.error ?? ""}`);
      assert.match(child.stdout, /standalone CLI loader and compiler passed/);
    } finally {
      fs.rmSync(tmp, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
    }
  });
}
