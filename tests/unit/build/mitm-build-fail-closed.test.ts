import assert from "node:assert/strict";
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import { buildMitmUtilities } from "../../../scripts/build/buildMitm.mjs";

function fixture(source: string) {
  const root = mkdtempSync(join(tmpdir(), "omni-mitm-build-"));
  mkdirSync(join(root, "src/mitm/_internal"), { recursive: true });
  writeFileSync(join(root, "package.json"), '{"type":"commonjs"}');
  writeFileSync(
    join(root, "tsconfig.mitm.json"),
    JSON.stringify({
      compilerOptions: {
        target: "ES2022",
        module: "esnext",
        moduleResolution: "bundler",
        noEmit: true,
        types: [],
        skipLibCheck: true,
        allowImportingTsExtensions: true,
      },
      include: ["src/mitm/**/*.ts"],
    })
  );
  writeFileSync(join(root, "src/mitm/example.ts"), source);
  writeFileSync(
    join(root, "src/mitm/server.cjs"),
    'module.exports = require("./_internal/helper.cjs");'
  );
  writeFileSync(join(root, "src/mitm/_internal/helper.cjs"), "module.exports = 42;");
  return { projectRoot: root, destination: join(root, "out/src/mitm") };
}

test("a MITM type error fails packaging without a TypeScript-source fallback", async () => {
  const input = fixture('export const value: number = "wrong";');
  try {
    await assert.rejects(buildMitmUtilities(input));
    assert.equal(existsSync(join(input.destination, "example.ts")), false);
  } finally {
    rmSync(input.projectRoot, { recursive: true, force: true });
  }
});

test("a valid MITM build emits runnable JavaScript and its CommonJS sidecars", async () => {
  const input = fixture('export { value } from "./helper";');
  try {
    writeFileSync(
      join(input.projectRoot, "src/mitm/helper.ts"),
      "export const value: number = 42;"
    );
    await buildMitmUtilities(input);
    assert.equal(existsSync(join(input.destination, "example.ts")), false);
    assert.ok(readFileSync(join(input.destination, "example.js"), "utf8").length > 0);
    const boot = spawnSync(
      process.execPath,
      [
        "--input-type=module",
        "-e",
        'import {value} from "./out/src/mitm/example.js"; import sidecar from "./out/src/mitm/server.cjs"; if (value !== 42 || sidecar !== 42) process.exit(1);',
      ],
      { cwd: input.projectRoot, encoding: "utf8" }
    );
    assert.equal(boot.status, 0, boot.stderr);
  } finally {
    rmSync(input.projectRoot, { recursive: true, force: true });
  }
});

test("prepublish awaits the required MITM builder without a non-fatal fallback", () => {
  const source = readFileSync(
    new URL("../../../scripts/build/prepublish.ts", import.meta.url),
    "utf8"
  );
  assert.match(
    source,
    /await buildMitmUtilities\(\{ projectRoot: ROOT, destination: mitmDest \}\)/
  );
  assert.doesNotMatch(source, /MITM compile warning \(non-fatal\)/);
});
