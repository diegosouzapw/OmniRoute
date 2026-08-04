import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(__dirname, "../..");

function readEnvFile(name: string): string {
  try {
    return readFileSync(join(repoRoot, name), "utf8");
  } catch {
    return "";
  }
}

test("#8093: .env.example documents INPUT_SANITIZER_ENABLED as enabled by default", () => {
  const envExample = readEnvFile(".env.example");
  assert.ok(envExample.length > 0, ".env.example should exist");

  // The commented-out example should show how to DISABLE (false), not enable (true)
  // since the default is enabled
  const sanitizerSection = envExample
    .split("INPUT_SANITIZER_ENABLED")
    .slice(0, 2)
    .join("INPUT_SANITIZER_ENABLED");
  assert.ok(
    /INPUT_SANITIZER_ENABLED=false/.test(sanitizerSection),
    ".env.example should show INPUT_SANITIZER_ENABLED=false as the way to disable"
  );
});

test("#8093: main ENVIRONMENT.md lists default as true", () => {
  const envDoc = readFileSync(join(repoRoot, "docs/reference/ENVIRONMENT.md"), "utf8");
  const line = envDoc.split("\n").find((l) => l.includes("INPUT_SANITIZER_ENABLED"));
  assert.ok(line, "ENVIRONMENT.md should have INPUT_SANITIZER_ENABLED entry");
  assert.ok(line.includes("`true`"), "ENVIRONMENT.md should list default as `true`");
  assert.ok(!line.includes("`false`"), "ENVIRONMENT.md should NOT list default as `false`");
});

test("#8093: all i18n ENVIRONMENT.md translations list default as true", () => {
  const i18nDir = join(repoRoot, "docs/i18n");
  const locales = readdirSync(i18nDir);

  const mismatches: string[] = [];
  for (const locale of locales) {
    const envMd = join(i18nDir, locale, "docs/reference/ENVIRONMENT.md");
    try {
      const content = readFileSync(envMd, "utf8");
      const line = content.split("\n").find((l) => l.includes("INPUT_SANITIZER_ENABLED"));
      if (line && line.includes("`false`")) {
        mismatches.push(locale);
      }
    } catch {
      // File doesn't exist for this locale — skip
    }
  }

  assert.deepEqual(
    mismatches,
    [],
    `i18n locales still listing INPUT_SANITIZER_ENABLED as false: ${mismatches.join(", ")}`
  );
});
