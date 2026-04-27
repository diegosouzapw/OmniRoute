import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const TEST_DATA_DIR = mkdtempSync(join(tmpdir(), "omniroute-sse-shim-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const repoRoot = join(import.meta.dirname, "../..");

function readProjectFile(relativePath: string): string {
  return readFileSync(join(repoRoot, relativePath), "utf8");
}

function listProjectFiles(relativePath: string): string[] {
  const fullPath = join(repoRoot, relativePath);
  if (!existsSync(fullPath)) return [];

  return readdirSync(fullPath, { withFileTypes: true }).flatMap((entry) => {
    const childPath = `${relativePath}/${entry.name}`;
    if (entry.isDirectory()) return listProjectFiles(childPath);
    return childPath;
  });
}

test.after(() => {
  rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("src/sse model shim keeps parseModel behavior aligned with open-sse core", async () => {
  const srcModel = await import("../../src/sse/services/model.ts");
  const coreModel = await import("../../open-sse/services/model.ts");
  const samples = [
    "openai/gpt-4o-mini",
    "claude-sonnet-4-6[1m]",
    "gemini-3-pro-preview",
    "anthropic/claude-opus-4.5",
    "gpt-oss:120b",
    "../bad-model",
  ];

  for (const sample of samples) {
    assert.deepEqual(srcModel.parseModel(sample), coreModel.parseModel(sample));
  }
});

test("src/sse service wrappers delegate to open-sse and shared infrastructure", () => {
  const tokenRefreshSource = readProjectFile("src/sse/services/tokenRefresh.ts");
  const modelSource = readProjectFile("src/sse/services/model.ts");
  const loggerSource = readProjectFile("src/sse/utils/logger.ts");

  assert.match(tokenRefreshSource, /@omniroute\/open-sse\/services\/tokenRefresh\.ts/);
  assert.match(modelSource, /@omniroute\/open-sse\/services\/model\.ts/);
  assert.match(loggerSource, /@\/shared\/utils\/logger/);
  assert.doesNotMatch(loggerSource, /console\.(log|warn|error|info|debug)/);
});

test("src/sse does not contain tracked backup artifacts", () => {
  const artifacts = listProjectFiles("src/sse").filter((file) =>
    /\.(orig|bak|backup)$/i.test(file)
  );

  assert.deepEqual(artifacts, []);
});
