#!/usr/bin/env node
import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

/** Verify actual native operations, not just package-directory existence. */
export function verifyCiInstall(root = process.cwd()) {
  const requireFromRoot = createRequire(resolve(root, "package.json"));
  const Database = requireFromRoot("better-sqlite3");
  const database = new Database(":memory:");
  try {
    const row = database.prepare("SELECT 42 AS value").get();
    assert.equal(row?.value, 42, "SQLite native query returned an unexpected result");
  } finally {
    database.close();
  }
  const esbuild = requireFromRoot("esbuild");
  const transformed = esbuild.transformSync("const value: number = 1;", { loader: "ts" });
  assert.ok(
    typeof transformed.code === "string" && transformed.code.length > 0,
    "esbuild native transform produced no output"
  );
  return { sqlite: "PASS", esbuild: "PASS", node: process.version, abi: process.versions.modules };
}

if (import.meta.url === pathToFileURL(process.argv[1] || "").href) {
  try {
    console.log(`[verify-ci-install] ${JSON.stringify(verifyCiInstall())}`);
  } catch (error) {
    console.error(`[verify-ci-install] unusable dependency installation: ${error.message}`);
    process.exitCode = 1;
  }
}
