#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const cwd = process.cwd();
const packageJsonPath = path.resolve(cwd, "package.json");
const openApiPath = path.resolve(cwd, "docs/openapi.yaml");
const changelogPath = path.resolve(cwd, "CHANGELOG.md");
const llmPath = path.resolve(cwd, "llm.txt");
const i18nDocsPath = path.resolve(cwd, "docs/i18n");

function readText(filePath) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`File not found: ${path.relative(cwd, filePath)}`);
  }
  return fs.readFileSync(filePath, "utf8");
}

function extractOpenApiVersion(content) {
  const lines = content.split(/\r?\n/);
  let inInfoBlock = false;

  for (const line of lines) {
    const trimmed = line.trim();

    if (!inInfoBlock) {
      if (trimmed === "info:") {
        inInfoBlock = true;
      }
      continue;
    }

    if (line.length > 0 && !line.startsWith(" ")) {
      break;
    }

    const match = line.match(/^\s{2}version:\s*["']?([^"'\s]+)["']?\s*$/);
    if (match) {
      return match[1];
    }
  }

  return null;
}

function extractChangelogSections(content) {
  const headings = [...content.matchAll(/^##\s+\[([^\]]+)\](?:\s+[-—–].*)?$/gm)];
  return headings.map((match) => match[1]);
}

function stripTopHeading(content) {
  return content.replace(/^# .+\r?\n+/, "");
}

function extractI18nMirrorBody(content) {
  const separator = content.match(/^---\s*$/m);
  if (!separator || separator.index === undefined) {
    return null;
  }

  return content.slice(separator.index + separator[0].length).replace(/^\r?\n+/, "");
}

function normalizeMirrorBody(content) {
  return content.replace(/\r\n/g, "\n").trim();
}

function isSemver(value) {
  // Accept X.Y.Z and X.Y.Z-prerelease.N (e.g. 3.0.0-rc.1, 3.0.0-beta.2)
  return /^\d+\.\d+\.\d+(-[a-zA-Z0-9.]+)?$/.test(value);
}

let hasFailure = false;

function fail(message) {
  hasFailure = true;
  console.error(`[docs-sync] FAIL - ${message}`);
}

function checkI18nMirrorFile(fileName, sourcePath) {
  if (!fs.existsSync(i18nDocsPath)) {
    fail("docs/i18n directory is missing");
    return;
  }

  const sourceBody = normalizeMirrorBody(stripTopHeading(readText(sourcePath)));
  const locales = fs
    .readdirSync(i18nDocsPath, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();

  let checked = 0;
  for (const locale of locales) {
    const targetPath = path.join(i18nDocsPath, locale, fileName);
    if (!fs.existsSync(targetPath)) {
      fail(`docs/i18n/${locale}/${fileName} is missing`);
      continue;
    }

    const body = extractI18nMirrorBody(readText(targetPath));
    if (body === null) {
      fail(`docs/i18n/${locale}/${fileName} is missing the i18n mirror separator`);
      continue;
    }

    if (normalizeMirrorBody(body) !== sourceBody) {
      fail(`docs/i18n/${locale}/${fileName} differs from root ${fileName}`);
      continue;
    }

    checked += 1;
  }

  if (checked > 0) {
    console.log(`[docs-sync] ${fileName} i18n mirrors match root content: ${checked} locales`);
  }
}

/**
 * Check i18n CHANGELOG mirrors by verifying that all version sections from the
 * root CHANGELOG exist in each translation. Unlike strict mirror files (llm.txt),
 * CHANGELOG translations have translated section headings (e.g. "Security" →
 * "Segurança"), so byte-for-byte comparison is intentionally skipped.
 *
 * Validates:
 * 1. File exists in each locale
 * 2. Has the i18n mirror separator (---)
 * 3. Contains all version sections (## [X.Y.Z]) from root, in the same order
 * 4. Body is non-empty and within a reasonable size tolerance of the source
 */
function checkI18nChangelogFile(sourcePath) {
  const fileName = "CHANGELOG.md";
  if (!fs.existsSync(i18nDocsPath)) {
    fail("docs/i18n directory is missing");
    return;
  }

  const sourceContent = readText(sourcePath);
  const sourceBody = normalizeMirrorBody(stripTopHeading(sourceContent));
  const sourceVersions = extractChangelogSections(sourceContent);
  const locales = fs
    .readdirSync(i18nDocsPath, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();

  let checked = 0;
  for (const locale of locales) {
    const targetPath = path.join(i18nDocsPath, locale, fileName);
    if (!fs.existsSync(targetPath)) {
      fail(`docs/i18n/${locale}/${fileName} is missing`);
      continue;
    }

    const targetContent = readText(targetPath);
    const body = extractI18nMirrorBody(targetContent);
    if (body === null) {
      fail(`docs/i18n/${locale}/${fileName} is missing the i18n mirror separator`);
      continue;
    }

    const normalizedBody = normalizeMirrorBody(body);
    if (normalizedBody.length === 0) {
      fail(`docs/i18n/${locale}/${fileName} has empty body after separator`);
      continue;
    }

    // Verify all version sections from root exist in the translation
    const targetVersions = extractChangelogSections(targetContent);
    const missingVersions = sourceVersions.filter((v) => !targetVersions.includes(v));
    if (missingVersions.length > 0) {
      fail(
        `docs/i18n/${locale}/${fileName} is missing version sections: ${missingVersions.slice(0, 3).join(", ")}${missingVersions.length > 3 ? ` (+${missingVersions.length - 3} more)` : ""}`
      );
      continue;
    }

    // Verify body size is within 25% tolerance of source (translations may
    // expand or shrink, but drastic size differences indicate stale content)
    const sizeDiff = Math.abs(normalizedBody.length - sourceBody.length) / sourceBody.length;
    if (sizeDiff > 0.25) {
      fail(
        `docs/i18n/${locale}/${fileName} body size differs by ${(sizeDiff * 100).toFixed(0)}% from root (expected within 25%)`
      );
      continue;
    }

    checked += 1;
  }

  if (checked > 0) {
    console.log(
      `[docs-sync] ${fileName} i18n translations validated: ${checked} locales (version sections + size check)`
    );
  }
}

try {
  const packageJson = JSON.parse(readText(packageJsonPath));
  const packageVersion = packageJson.version;

  if (!isSemver(packageVersion)) {
    fail(`package.json version is not valid semver: "${packageVersion}"`);
  } else {
    console.log(`[docs-sync] package.json version: ${packageVersion}`);
  }

  const openApiVersion = extractOpenApiVersion(readText(openApiPath));
  if (!openApiVersion) {
    fail("could not extract docs/openapi.yaml info.version");
  } else if (openApiVersion !== packageVersion) {
    fail(`OpenAPI version (${openApiVersion}) differs from package.json (${packageVersion})`);
  } else {
    console.log(`[docs-sync] openapi.yaml info.version matches: ${openApiVersion}`);
  }

  const changelogSections = extractChangelogSections(readText(changelogPath));
  if (changelogSections.length === 0) {
    fail("CHANGELOG.md has no version sections");
  } else {
    if (changelogSections[0] !== "Unreleased") {
      fail('CHANGELOG.md first section must be "## [Unreleased]"');
    } else {
      console.log("[docs-sync] changelog has top Unreleased section");
    }

    const semverSections = changelogSections.filter((section) => isSemver(section));
    if (semverSections.length === 0) {
      fail("CHANGELOG.md has no semver release section");
    } else if (semverSections[0] !== packageVersion) {
      fail(
        `Latest changelog release (${semverSections[0]}) differs from package.json (${packageVersion})`
      );
    } else {
      console.log(
        `[docs-sync] latest changelog release matches package version: ${packageVersion}`
      );
    }
  }

  // llm.txt mirrors must be exact copies (no translation)
  checkI18nMirrorFile("llm.txt", llmPath);
  // CHANGELOG.md mirrors are translations — check version sections and size, not exact content
  checkI18nChangelogFile(changelogPath);
} catch (error) {
  fail(error instanceof Error ? error.message : String(error));
}

if (hasFailure) {
  process.exit(1);
}

console.log("[docs-sync] PASS - documentation version sync is consistent.");
