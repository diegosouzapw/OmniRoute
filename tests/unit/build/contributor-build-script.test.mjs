import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import {
  isContributorBuild,
  shouldBuildStandalone,
  stubContributorInstrumentation,
} from "../../../scripts/build/backendOnlyPages.mjs";

const nextConfigSource = fs.readFileSync(path.join(process.cwd(), "next.config.mjs"), "utf8");

const packageJson = JSON.parse(fs.readFileSync(path.join(process.cwd(), "package.json"), "utf8"));

test("contributor build profile selects the webpack fallback", () => {
  assert.match(packageJson.scripts["build:contributor"], /OMNIROUTE_USE_TURBOPACK=0/);
});

test("contributor build profile skips standalone packaging", () => {
  assert.equal(isContributorBuild({ OMNIROUTE_BUILD_PROFILE: "contributor" }), true);
  assert.equal(isContributorBuild({ OMNIROUTE_BUILD_PROFILE: "backend" }), false);
});

test("contributor instrumentation stubs are reversible", async () => {
  const fs = await import("node:fs/promises");
  const os = await import("node:os");
  const tempRoot = await fs.mkdtemp(path.join(os.tmpdir(), "omniroute-contributor-"));
  const instrumentationDir = path.join(tempRoot, "src");
  await fs.mkdir(instrumentationDir, { recursive: true });
  const files = ["instrumentation.ts", "instrumentation-node.ts"];
  const originals = new Map();
  for (const file of files) {
    const target = path.join(instrumentationDir, file);
    const source = `export async function ${file === "instrumentation.ts" ? "register" : "registerNodejs"}() { return "original"; }`;
    originals.set(target, source);
    await fs.writeFile(target, source);
  }
  const stubbed = stubContributorInstrumentation(tempRoot, { warn() {} });
  assert.equal(stubbed.length, 2);
  // Each stub must declare the symbol its own file really exports — instrumentation.ts
  // owns Next's register(), instrumentation-node.ts owns registerNodejs().
  assert.match(
    await fs.readFile(path.join(instrumentationDir, "instrumentation.ts"), "utf8"),
    /export async function register\(\) \{\}/
  );
  assert.match(
    await fs.readFile(path.join(instrumentationDir, "instrumentation-node.ts"), "utf8"),
    /export async function registerNodejs\(\) \{\}/
  );
  for (const entry of stubbed) await fs.writeFile(entry.file, entry.original);
  for (const [target, source] of originals) assert.equal(await fs.readFile(target, "utf8"), source);
  await fs.rm(tempRoot, { recursive: true, force: true });
});

test("shouldBuildStandalone disables standalone output for contributor and fast build while default keeps it", () => {
  assert.equal(shouldBuildStandalone({}), true);
  assert.equal(shouldBuildStandalone({ OMNIROUTE_BUILD_PROFILE: "backend" }), true);
  assert.equal(shouldBuildStandalone({ OMNIROUTE_BUILD_PROFILE: "minimal" }), true);
  assert.equal(shouldBuildStandalone({ OMNIROUTE_BUILD_PROFILE: "contributor" }), false);
  assert.equal(shouldBuildStandalone({ OMNIROUTE_SKIP_STANDALONE: "1" }), false);
  assert.match(packageJson.scripts["build:fast"], /OMNIROUTE_SKIP_STANDALONE=1/);
  assert.match(packageJson.scripts["prebuild:fast"], /check:native-deps/);
  assert.match(nextConfigSource, /shouldBuildStandalone/);
  assert.match(
    nextConfigSource,
    /\.\.\.\(shouldBuildStandalone\(process\.env\) \? \{ output: "standalone" \} : \{\}\)/
  );
});
